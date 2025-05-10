"use client";

import React from "react";
import { useIsClient } from "usehooks-ts";
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import {ToggleSkeleton} from "@/app/(browse)/_components/sidebar/toggle";
import {RecommendedSkeleton} from "@/app/(browse)/_components/sidebar/recommended";
import {FollowingSkeleton} from "@/app/(browse)/_components/sidebar/following";

interface  WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    const isClient = useIsClient();
    const  { collapsed } = useSidebar((state) => state);

    if (!isClient) {
        return (
            <aside className={cn("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full dark:bg-[#353741] bg-white border-r border-[#2D2E35] z-50",)}
            >
                <ToggleSkeleton />
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        )
    }

    return (
        <aside
        className={cn("fixed left-0 flex flex-col w-60 h-full dark:bg-[#353741] bg-white border-r border-[#2D2E35] z-50",
            collapsed && "w-[70px]"
        )}
        >
            {children}
        </aside>
    )
}