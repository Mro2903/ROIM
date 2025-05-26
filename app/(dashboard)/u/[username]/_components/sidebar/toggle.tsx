'use client';

import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { ArrowLeftFromLine , ArrowRightFromLine } from "lucide-react";
import {Button} from "@/components/ui/button";
import { Hint } from "@/components/hint";
import {Skeleton} from "@/components/ui/skeleton";

/**
 * Sidebar toggle component for expanding or collapsing the creator dashboard sidebar.
 *
 * This component displays a button that allows users to expand or collapse the sidebar.
 * When expanded, it shows a "Collapse" button with a left arrow icon and a "Dashboard" label.
 * When collapsed, it shows an "Expand" button with a right arrow icon.
 *
 * @returns {JSX.Element} The rendered toggle button for the sidebar.
 */
export const Toggle = () => {
    const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state);

    const label = collapsed ? 'Expand' : 'Collapse';
    return (
        <>
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full justify-between">
                    <p className="font-semibold text-pretty-gray-500">
                        Dashboard
                    </p>
                    <Hint label={label} position="right">
                        <Button className="h-auto p-2 ml-auto rounded-md hover:bg-[#2D2E35]" onClick={onCollapse}>
                            {<ArrowLeftFromLine className="h-4 w-4" />}
                        </Button>
                    </Hint>
                </div>
            )}
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} position="right">
                        <Button className="h-auto p-2 rounded-md hover:bg-[#2D2E35]" onClick={onExpand}>
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-6" />
        </div>
    )
}