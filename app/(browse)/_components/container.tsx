'use client';

import React, {useEffect} from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useSidebar } from "@/store/use-sidebar";
import {cn} from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
}

/**
 * A responsive container component that adjusts its left margin based on the sidebar's collapsed state
 * and the current viewport width. It listens for viewport changes using a media query and automatically
 * collapses or expands the sidebar accordingly.
 *
 * @param children - The content to be rendered inside the container.
 *
 * @remarks
 * - Uses `useMediaQuery` to detect if the viewport width is less than or equal to 1024px.
 * - Uses `useSidebar` state to control the sidebar's collapsed/expanded state.
 * - Applies different left margin classes based on the sidebar state and viewport size.
 */
export const Container = ({ children }: ContainerProps) => {
    const matches = useMediaQuery('(max-width: 1024px)');
    const { collapsed, onCollapse, onExpand } = useSidebar(state => state);
    useEffect(() => {
        if (matches) {
            onCollapse();
        } else {
            onExpand();
        }
    } , [matches, onCollapse, onExpand]);

    
    return (
        <div className={cn("flex-1 ml-[70px]", collapsed ? "lg:ml-[70px]" : "lg:ml-60")}>
            {children}
        </div>
    );
}