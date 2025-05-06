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