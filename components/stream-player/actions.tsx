"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {Heart} from "lucide-react";
import {cn} from "@/lib/utils";
import {onFollow, onUnfollow} from "@/actions/follow";
import {useTransition} from "react";
import {toast} from "sonner";
import {Skeleton} from "@/components/ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const session = useSession();
    const userId = session?.data?.user?.id;

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.name}`))
                .catch(() => {
                    toast.error(`Failed to follow ${hostIdentity}`);
                });
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You have unfollowed ${data.following.name}`))
                .catch(() => {
                    toast.error(`Failed to follow ${hostIdentity}`);
                });
        })
    }

    const toggleFollow = () => {
        if (!userId) return router.push("/register");
        if (isHost) return;
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }

    return (
        <Button className="w-full lg:w-auto h-auto p-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition duration-200 ease-in-out"
                onClick={toggleFollow} disabled={isPending || isHost}>
            <Heart className={cn("h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none")}/>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    );
};