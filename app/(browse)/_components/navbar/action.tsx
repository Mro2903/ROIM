'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Clapperboard} from "lucide-react";
import UserButton, {UserButtonSkeleton} from "@/components/auth/userButton";
import {useSession} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";

export const Action = () => {
    const { data: session } = useSession();
    const user = session?.user;
    return (
        <div className="flex items-center gap-x-2 justify-end ml-4 lg:ml-0">
            {!user && (
                <Button
                    className="hover:bg-accent hover:text-accent-foreground text-foreground hover:opacity-75 transition">
                    <Link href="/login">Login</Link>
                </Button>
            )}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Button className="hover:bg-accent hover:text-accent-foreground text-foreground hover:opacity-75 transition">
                        <Link href={`/u/${user?.name}`} className="flex items-center">
                            <Clapperboard className="h-5 w-5 lg:mr-2"/>
                            <span className="hidden lg:block">Dashboard</span>
                        </Link>
                    </Button>
                    <UserButton />
                </div>
            )}
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