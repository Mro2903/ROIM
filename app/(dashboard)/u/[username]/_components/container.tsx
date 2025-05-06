'use client';

import React, {useEffect} from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import {cn} from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
}

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