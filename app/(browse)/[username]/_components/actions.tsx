"use client";

import {Button} from "@/components/ui/button";
import {onFollow, onUnfollow} from "@/actions/follow";
import {useTransition} from "react";
import {toast} from "sonner";
import {onBlock, onUnblock} from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    isBlocking: boolean;
    userId: string;
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        onFollow(userId).then((data) => {
            toast.success("You have followed " + data.following.name);
        }).catch(() => {
            toast.error("Failed to follow user");
        });
    }

    const handleUnfollow = () => {
        onUnfollow(userId).then((data) => {
            toast.success("You have unfollowed " + data.following.name);
        }).catch(() => {
            toast.error("Failed to unfollow user");
        });
    }
    const onFollowClick = () => {
        startTransition(() => {
            if (isFollowing) {
                handleUnfollow();
            } else {
                handleFollow();
            }
        });
    }

    const handleBlock = () => {
        onBlock(userId).then((data) => {
            toast.success("You have blocked " + data.blocked.name);
        }).catch(() => {
            toast.error("Failed to block user");
        });
    }

    const handleUnblock = () => {
        onUnblock(userId).then((data) => {
            toast.success("You have unblocked " + data.blocked.name);
        }).catch(() => {
            toast.error("Failed to unblock user");
        });
    }

    const onBlockClick = () => {
        startTransition(() => {
            if (isBlocking) {
                handleUnblock();
            } else {
                handleBlock();
            }
        });
    }



    return (
        <>
            <Button  onClick={onFollowClick} disabled={isPending}
                     className="hover:bg-accent hover:text-accent-foreground text-foreground hover:opacity-75 transition border-gray-500 border">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={(onBlockClick)} disabled={isPending}
                    className="hover:bg-accent hover:text-accent-foreground text-foreground hover:opacity-75 transition border-gray-500 border">
                {isBlocking ? "Unblock" : "Block"}
            </Button>
        </>);

};