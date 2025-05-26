"use client";

import { useIsClient } from "usehooks-ts";
import { cn } from '@/lib/utils';
import {LogoSkeleton} from "@/app/(browse)/_components/navbar/logo";
import {ActionSkeleton} from "@/app/(browse)/_components/navbar/action";

interface  WrapperProps {
    children: React.ReactNode;
}

/**
 * Wrapper component for the navigation bar.
 *
 * Renders a fixed navigation bar at the top of the page. If the component is rendered on the server
 * (i.e., not on the client), it displays skeleton placeholders for the logo and actions.
 * Once on the client, it renders the provided children inside the navigation bar.
 *
 * @param {WrapperProps} props - The props for the Wrapper component.
 * @param {React.ReactNode} props.children - The content to render inside the navigation bar when on the client.
 * @returns {JSX.Element} The navigation bar element with either skeletons or children.
 */
export const Wrapper = ({ children }: WrapperProps) => {
    const isClient = useIsClient();

    if (!isClient) {
        return (
            <nav className={cn("fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:4 flex justify-between items-center shadow-sm")}>
                <LogoSkeleton />
                <ActionSkeleton />
            </nav>
        )
    }

    return (
        <nav className={cn("fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:4 flex justify-between items-center shadow-sm")}>
            {children}
        </nav>
    )
}