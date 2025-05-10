"use client";

import {Track} from "livekit-client";
import {useEffect, useRef, useState} from "react";
import {useTracks} from "@livekit/components-react";
import {FullScreenControl} from "@/components/stream-player/full-screen-control";
import {VolumeControl} from "@/components/stream-player/volume-control";

interface LiveVideoProps {
    participantId: string;
}

export const LiveVideo = ({participantId}: LiveVideoProps) => {


    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        onVolumeChange(0);
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    }

    const toggleMute = () => {
        const  isMuted = volume === 0;
        setVolume(isMuted ? 50 : 0);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    const toggleFullscreen = () => {
        if (wrapperRef.current) {
            if (isFullscreen) {
                document.exitFullscreen();
            } else {
                wrapperRef.current.requestFullscreen();
            }
        }
    }

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter(track => track.participant.identity === participantId)
        .forEach(track => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        })
    return (
        <div ref={wrapperRef} className="relativeh-full flex">
            <video
                width="100%"
                className="w-full h-full object-cover"
                ref={videoRef}
            />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl onToggleAction={toggleMute} onChangeAction={onVolumeChange} volume={volume} />
                    <FullScreenControl isFullscreen={isFullscreen} action={toggleFullscreen} />
                </div>
            </div>
        </div>
    )
}