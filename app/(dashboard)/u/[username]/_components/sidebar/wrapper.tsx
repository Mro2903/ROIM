"use client";

import {cn} from '@/lib/utils';
import {useCreatorSidebar} from "@/store/use-creator-sidebar";

interface WrapperProps {
    children: React.ReactNode;
}

/**
 * Wrapper component for the sidebar section.
 *
 * @remarks
 * This component renders an <aside> element that serves as a container for sidebar content.
 * It applies responsive width and styling based on the `collapsed` state from the sidebar store.
 *
 * @param children - The content to be rendered inside the sidebar wrapper.
 *
 * @returns The sidebar wrapper element containing the provided children.
 */
export const Wrapper = ({children}: WrapperProps) => {
    const {collapsed} = useCreatorSidebar(state => state)

    return (
        <aside className={cn("fixed top-20 left-0 w-[70px] lg:w-60 h-full bg-white dark:bg-[#1e1e1e] border-r border-[#2D2E35] z-50",
            collapsed && "lg:w-[70px]")}>
            {children}
        </aside>
    )
}