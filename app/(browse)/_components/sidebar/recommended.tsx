'use client';

import {User} from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import {UserItem, UserItemSkeleton} from "@/app/(browse)/_components/sidebar/user-item";

interface RecommendedProps {
    data: (User & {
        stream: { isLive: boolean } | null;
    })[];
}

/**
 * Renders a recommended users section in the sidebar.
 *
 * Displays a "Recommended" label and a list of recommended users if the sidebar is expanded and there is data available.
 *
 * @param data - An array of user objects to display in the recommended list.
 * @returns A React component displaying the recommended users.
 */
export const Recommended = ({ data }: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);

    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm font-semibold text-gray-500">Recommended</p>
                </div>
            )}
            <ul className="space-y2 px-2">
                {data.map((user) => (
                    < UserItem username={user.name} image={user.image} isLive={user.stream?.isLive} key={user.id} />
                ))}
            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}