'use client';

import { useSidebar } from '@/store/use-sidebar';
import { ArrowLeftFromLine , ArrowRightFromLine } from "lucide-react";
import {Button} from "@/components/ui/button";
import { Hint } from "@/components/hint";
import {Skeleton} from "@/components/ui/skeleton";

export const Toggle = () => {
    const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

    const label = collapsed ? 'Expand' : 'Collapse';
    return (
        <>
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center justify-between">
                    <p className="font-semibold text-pretty-gray-500">
                        For you
                    </p>
                    <Hint label={label} position="right">
                        <Button className="h-auto p-2 ml-auto rounded-md hover:bg-[#2D2E35]" onClick={onCollapse}>
                            {collapsed ? <ArrowRightFromLine className="h-4 w-4" /> : <ArrowLeftFromLine className="h-4 w-4" />}
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