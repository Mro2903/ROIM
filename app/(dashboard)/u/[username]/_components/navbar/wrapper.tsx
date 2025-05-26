"use client";

import { useIsClient } from "usehooks-ts";
import { cn } from '@/lib/utils';
import {LogoSkeleton} from "./logo";
import {ActionSkeleton} from "./action";
interface  WrapperProps {
    children: React.ReactNode;
}

/**
 * Wrapper component for the dashboard navbar.
 *
 * Renders a navigation bar with a fixed position at the top of the page.
 * If the component is not mounted on the client (`isClient` is false), it displays skeleton placeholders for the logo and actions.
 * Once on the client, it renders the provided children inside the navbar.
 *
 * @param {WrapperProps} props - The props for the Wrapper component.
 * @param {React.ReactNode} props.children - The content to render inside the navbar when on the client.
 * @returns {JSX.Element} The rendered navbar component.
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