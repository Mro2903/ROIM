"use client";

import {Follow, User} from "@prisma/client"
import {useSidebar} from "@/store/use-sidebar";
import {UserItem, UserItemSkeleton} from "@/app/(browse)/_components/sidebar/user-item";

interface FollowingProps {
    data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
    const {collapsed} = useSidebar((state) => state);

    if (!data.length) {
        return null;
    }

    return (
        <div>
            {!collapsed &&
                <div className="pl-6 mb-4">
                    <p className="text-sm font-semibold text-gray-500">Following</p>
                </div>}

            <ul className="space-y2 px-2">
                {data.map((user) => (
                    < UserItem username={user.following.name} image={user.following.image} isLive={false} key={user.following.id} />
                ))}
            </ul>
        </div>
    );
}

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}