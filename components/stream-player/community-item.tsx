"use client";

import {toast} from "sonner";
import  {useTransition} from "react";
import {MinusCircle} from "lucide-react";

import {Hint} from "@/components/hint";
import {onBlock} from "@/actions/block";
import {cn, stringToColor} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
}

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}: CommunityItemProps) => {
    const [isPending, startTransition] = useTransition();

    const color = stringToColor(participantName || "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;
        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => {
                    toast.success(`Blocked ${participantName}`);
                })
                .catch((error) => {
                    toast.error(`Failed to block ${participantName}: ${error.message}`);
                });
        });
    };
    return (
        <div className={cn("group flex items-center justify-between w-full p-2 rounded-md hover:bg-white/5 text-sm",
            isPending && "opacity-50 pointer-events-none")}>
            <p style={{ color: color }} className="text-sm font-semibold">
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block" position="left">
                    <Button
                        disabled={isPending}
                        onClick={handleBlock}
                        className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                        <MinusCircle />
                    </Button>
                </Hint>)}
        </div>
    )
}