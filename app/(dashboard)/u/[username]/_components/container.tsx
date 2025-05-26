'use client';

import React, {useEffect} from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import {cn} from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
}

/**
 * Container component that adjusts its left margin based on the sidebar's collapsed state
 * and the current viewport width.
 *
 * - Uses a media query to detect if the viewport is less than or equal to 1024px wide.
 * - Collapses or expands the sidebar accordingly by calling `onCollapse` or `onExpand`.
 * - Applies different left margin classes based on the sidebar's collapsed state.
 *
 * @param children - The content to be rendered inside the container.
 */
export const Container = ({ children }: ContainerProps) => {
    const matches = useMediaQuery('(max-width: 1024px)');
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar(state => state);
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