'use client';

import React, {useEffect} from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useSidebar } from "@/store/use-sidebar";
import {cn} from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
}

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