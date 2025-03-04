"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Avatar} from "@/components/ui/avatar";
import {useSession, signOut} from "next-auth/react";
import {Skeleton} from "@/components/ui/skeleton";

export default function UserButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();



    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="relative">
            {/* User Avatar */}
            <Button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-500 focus:outline-none"
            >
                {user && user.name && user.image ? (
                    <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user?.name[0]}{user?.name[user.name.length - 1]}</AvatarFallback>
                    </Avatar>
                ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-500" />
                )}
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-400">
                    <div className="py-1">
                        <Button
                            onClick={() => router.push(user?.name ? `/${user.name}` : "/")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </Button>
                        <Button
                            onClick={() => router.push("/settings")}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Settings
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export const UserButtonSkeleton = () => {
    return (
        <div className="relative">
            <Skeleton className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-500 focus:outline-none" />
        </div>
    );
}