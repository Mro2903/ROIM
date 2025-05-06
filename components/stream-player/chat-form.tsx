"use client";

import {useState} from "react";

import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {ChatInfo} from "@/components/stream-player/chat-info";

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isFollowing: boolean;
    isDelayed: boolean;
};

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed
}: ChatFormProps) => {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);
    const isFollowerOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isFollowerOnlyAndNotFollowing || isDelayBlocked;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value || isDisabled) return;

        if (isDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    }

    if (isHidden) {
        return null;
    }

    return (
        <form className="flex flex-col items-center gap-y-4 p-3"
              onSubmit={handleSubmit}>
            <div className="w-full">
                <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
                <Input
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn("border-white/10",
                        (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0")}
                />
            </div>
            <div className="ml-auto">
                <Button
                    className="bg-[#1e1e1e] text-white border border-white/10 hover:bg-[#2D2E35] hover:text-white/80"
                    type="submit"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="h-10 w-full" />
            <div className="ml-auto flex items-center gap-x-2">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    )
}