"use client";

import {LucideIcon} from "lucide-react";
import {useCreatorSidebar} from "@/store/use-creator-sidebar";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton";

interface NavItemProps {
    label: string
    href: string
    icon: LucideIcon
    isActive: boolean
}

/**
 * Renders a navigation item for the sidebar, displaying an icon and label.
 *
 * @param label - The text label for the navigation item.
 * @param href - The URL to navigate to when the item is clicked.
 * @param icon - The icon component to display alongside the label.
 * @param isActive - Indicates if the navigation item is currently active.
 *
 * The component adapts its layout based on the sidebar's collapsed state,
 * showing only the icon when collapsed and both icon and label when expanded.
 */
export const NavItem = ({label, href, icon : Icon, isActive}: NavItemProps) => {
    const { collapsed } = useCreatorSidebar(state => state);
    return (
        <Button className={cn("w-full h-12 p-2 rounded-md hover:bg-[#2D2E35]",
            collapsed ? "justify-center" : "justify-start", isActive && "bg-accent bg-opacity-10")}>
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon className={cn("h-5 w-5",
                        collapsed ? "mr-0" : "mr-2")}/>
                    {!collapsed && (
                        <span className="hidden lg:block">{label}</span>
                    )}
                </div>
            </Link>
        </Button>
    )
}


export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[48px] min-w-[48px] rounded-md"/>
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}