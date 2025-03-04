"use client";

import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {UserAvatar, UserAvatarSkeleton} from "@/components/ui/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {LiveBadge} from "@/components/ui/live-badge";

interface UserItemProps {
    username: string;
    image: string;
    isLive?: boolean;
}

export const UserItem = ({ username, image, isLive }: UserItemProps) => {
    const { collapsed } = useSidebar((state) => state);
    const pathname = usePathname();
    const href = `/${username}`;
    const isActive = pathname === href;

    return (
        <Button className={cn("h-auto p-2 rounded-md hover:bg-[#2D2E35] w-full",
            collapsed ? "justify-center" : "justify-start",
            isActive && "bg-[#2D2E35] text-primary-500")}>
            <Link href={href}>
                <div className={cn("flex items-center gap-x-4 w-full",
                    collapsed && "justify-center")}>
                    <UserAvatar username={username} image={image} isLive={isLive} size="md" />
                    {!collapsed && (
                        <p className="truncate">{username}</p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge className="ml-auto" />)}
                </div>
            </Link>

        </Button>
    );
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <UserAvatarSkeleton size="md" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
}