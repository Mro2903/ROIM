"use client";

import { ConnectionState, Track } from "livekit-client";
import { useConnectionState, useRemoteParticipant, useTracks} from "@livekit/components-react";
import {OfflineVideo} from "@/components/stream-player/offline-video";
import {LoadingVideo} from "@/components/stream-player/loading-video";
import {LiveVideo} from "@/components/stream-player/live-video";
import exp from "node:constants";
import {Skeleton} from "@/components/ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter(track => track.participant.identity === hostIdentity);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) { // TODO: fix this
        content = <OfflineVideo username={hostName} />;
    } else if (!participant || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />;
    } else {
        content = <LiveVideo participant={participant}/>;
    }
    return (
        <div className="aspect-video border-b group relative">
            {content}
        </div>
    );
}

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="w-full h-full rounded-none" />
        </div>
    )
}