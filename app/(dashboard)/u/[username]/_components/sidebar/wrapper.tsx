"use client";

import {cn} from '@/lib/utils';
import {useCreatorSidebar} from "@/store/use-creator-sidebar";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({children}: WrapperProps) => {
    const {collapsed} = useCreatorSidebar(state => state)

    return (
        <aside className={cn("fixed top-20 left-0 w-[70px] lg:w-60 h-full bg-[#1e1e1e] border-r border-[#2D2E35] z-50",
            collapsed && "lg:w-[70px]")}>
            {children}
        </aside>
    )
}