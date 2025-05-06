'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogOut} from "lucide-react";
import UserButton, {UserButtonSkeleton} from "@/components/auth/userButton";
import {Skeleton} from "@/components/ui/skeleton";

export const Action = () => {
    return (
        <div className="flex items-center gap-x-2 justify-end ml-4 lg:ml-0">
            <div className="flex items-center gap-x-4">
                <Button className="hover:bg-accent hover:text-accent-foreground text-foreground hover:opacity-75 transition">
                    <Link href="/" >
                        <LogOut className="h-5 w-5 mr-2"/>
                    </Link>
                </Button>
                <UserButton />
            </div>
        </div>);
};

export const ActionSkeleton = () => {
    return (
        <div className="flex items-center gap-x-4 justify-end ml-4 lg:ml-0">
            <div className="flex items-center gap-x-4">
                <Skeleton className="h-5 w-5 lg:mr-2 hover:bg-accent hover:text-accent-foreground text-foreground hover:opacity-75 transition"/>
                <Skeleton className="w-16 h-4 mb-1 hidden lg:block"/>
            </div>
            <UserButtonSkeleton />
        </div>
    );
}