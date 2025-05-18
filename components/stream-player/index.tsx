"use client";

import {useEffect, useState} from "react";
import {useViewerToken} from "@/hooks/use-viewer-token";
import {useChatSidebar} from "@/store/use-chat-sidebar";
import {cn} from "@/lib/utils";
import {RoomContext} from "@livekit/components-react";
import {Video, VideoSkeleton} from "@/components/stream-player/video";
import {Room} from "livekit-client";
import {Chat, ChatSkeleton} from "@/components/stream-player/chat";
import {ChatToggle} from "@/components/stream-player/chat-toggle";
import {Header, HeaderSkeleton} from "@/components/stream-player/header";
import {InfoCard} from "@/components/stream-player/info-card";
import {AboutCard} from "@/components/stream-player/about-card";
import {toast} from "sonner";

type CustomStream = {
    id: string;
    name: string;
    isLive: boolean;
    thumbnailUrl: string | null;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

type CustomUser = {
    id: string;
    name: string;
    bio: string | null;
    image: string;
    stream: CustomStream | null;
    _count: {
        followedBy: number;
    };
}

interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean;
}

export const StreamPlayer = ({user, stream, isFollowing}: StreamPlayerProps) => {
    const {token, name, identity} = useViewerToken(user.id)
    const [isConnected, setIsConnected] = useState(false);
    const {collapsed} = useChatSidebar();
    const [room] = useState(() => new Room({}));

    useEffect(() => {
        const connectRoom = async () => {
            try {
                await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, token);
                setIsConnected(true);
                toast.success("Connected to room");
            } catch (error) {
                console.error("Failed to connect to room", error);
                toast.error("Failed to connect to room");
            }
        };
        if (token) {
            connectRoom()
        }

        return () => {
            if (room.state === "connected") {
                room.disconnect();
            }
        };
    }, [token, room]);
    if (!token || !name || !identity || !isConnected) {
        return <StreamPlayerSkeleton />
    }
    return <>
        {collapsed && (<div className="hidden lg:block fixed top-[100px] right-2 z-50">
                <ChatToggle />
            </div>
        )}
        <RoomContext.Provider value={room}>
            <div className={cn("grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                collapsed && " lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2")}>
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video hostName={user.name} hostIdentity={user.id} />
                    <Header
                        hostName={user.name}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        imageUrl={user.image}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />
                    <InfoCard
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                    />
                    <AboutCard
                        hostName={user.name}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount={user._count.followedBy}
                    />
                </div>
                <div className={cn("col-span-1",
                    collapsed && "hidden")}>
                    <Chat viewerName={name}
                          hostName={user.name}
                          hostIdentity={user.id}
                          isFollowing={isFollowing}
                          isChatEnabled={stream.isChatEnabled}
                          isChatDelayed={stream.isChatDelayed}
                          isChatFollowersOnly={stream.isChatFollowersOnly}
                    />
                </div>
            </div>
        </RoomContext.Provider>
    </>
};

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
};