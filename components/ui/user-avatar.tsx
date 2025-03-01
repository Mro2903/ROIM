import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";
import { LiveBadge } from "@/components/ui/live-badge";

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                md: "w-8 h-8",
                lg: "w-14 h-14",
            }
        },
        defaultVariants: {
            size: "md",
        }
    })

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    image: string;
    isLive?: boolean;
    showBadge?: boolean;
}



export const UserAvatar = ({ username, image, isLive, showBadge, size }: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar className={cn(isLive && "ring-2 ring-rose-500 border border-background", avatarSizes({ size }))}>
                <AvatarImage src={image} alt={username} className="object-cover"/>
                <AvatarFallback>{username[0]}{username[username.length - 1]}</AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary-500 rounded-full" />
            )}
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>)}
        </div>
    );
}

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn("min-h-[32px] min-w-[32px] rounded-full", avatarSizes({ size }))} />
    );
}