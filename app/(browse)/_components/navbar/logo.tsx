import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";

/**
 * Renders the ROIM logo component with an avatar and branding text.
 *
 * The logo is wrapped in a Next.js `Link` that navigates to the home page.
 * On large screens, it displays both the logo and the platform description.
 * On smaller screens, only the logo avatar is shown.
 *
 * @returns {JSX.Element} The logo component for the navigation bar.
 */
export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white rounded-full p-1 mr-12 lg:mr-0">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="/logo.svg" alt="ROIM" />
                        <AvatarFallback>ROIM</AvatarFallback>
                    </Avatar>
                </div>
                <div className="hidden lg:block items-center">
                    <p className="text-lg font-semibold">ROIM</p>
                    <p className="text-xs text-foreground">Streaming Platform for Gamers</p>
                </div>
            </div>
        </Link>
    );
};

export const LogoSkeleton = () => {
    return (
        <div className="flex items-center gap-x-4">
            <Skeleton className="w-12 h-12 rounded-full p-1 mr-12 lg:mr-0" />
            <div className="hidden lg:block items-center">
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-12 h-3" />
            </div>
        </div>
    );
};