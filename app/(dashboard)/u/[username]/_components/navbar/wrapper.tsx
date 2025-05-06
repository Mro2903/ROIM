"use client";

import { useIsClient } from "usehooks-ts";
import { cn } from '@/lib/utils';
import {LogoSkeleton} from "./logo";
import {ActionSkeleton} from "./action";
interface  WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    const isClient = useIsClient();

    if (!isClient) {
        return (
            <nav className={cn("fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:4 flex justify-between items-center shadow-sm")}>
                <LogoSkeleton />
                <ActionSkeleton />
            </nav>
        )
    }

    return (
        <nav className={cn("fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:4 flex justify-between items-center shadow-sm")}>
            {children}
        </nav>
    )
}