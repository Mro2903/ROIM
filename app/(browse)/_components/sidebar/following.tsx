"use client";

import {Follow, User} from "@prisma/client"
import {useSidebar} from "@/store/use-sidebar";
import {UserItem, UserItemSkeleton} from "@/app/(browse)/_components/sidebar/user-item";

interface FollowingProps {
    data: (Follow & {
        following: User & {
        stream: {isLive: boolean} | null
        }
    })[];
}

/**
 * Renders a list of users that the current user is following in the sidebar.
 * Displays a section header when the sidebar is expanded and the list is not empty.
 *
 * @param data - An array of user objects representing the followed users.
 * Each user object should contain a `following` property with `name`, `image`, `id`, and optional `stream` with `isLive`.
 *
 * @returns A React component displaying the list of followed users, or null if the list is empty.
 */
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
                    < UserItem username={user.following.name} image={user.following.image} isLive={user.following.stream?.isLive} key={user.following.id} />
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