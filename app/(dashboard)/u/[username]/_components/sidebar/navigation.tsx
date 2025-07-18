"use client";

import {usePathname} from "next/navigation";
import {Fullscreen, KeyRound, MessageSquare, Users} from "lucide-react";
import {useSession} from "next-auth/react";
import {NavItem, NavItemSkeleton} from "@/app/(dashboard)/u/[username]/_components/sidebar/nav-item";

/**
 * Renders the navigation sidebar for the user dashboard.
 *
 * - Displays navigation links (Stream, Keys, Chat, Community) based on the authenticated user's name.
 * - Shows skeleton placeholders if the user session is not yet loaded or the username is unavailable.
 * - Highlights the active navigation item based on the current pathname.
 *
 * @returns {JSX.Element} The navigation sidebar component.
 */
export const Navigation = () => {
    const pathname = usePathname();
    const {data: session} = useSession();
    const user = session?.user;

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.name}`,
            icon: Fullscreen,
        },
        {
            label: "Keys",
            href: `/u/${user?.name}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user?.name}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user?.name}/community`,
            icon: Users ,
        }]

    if(!user?.name) {
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }

    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
                <NavItem key={route.href}
                         label={route.label}
                         href={route.href}
                         icon={route.icon}
                            isActive={pathname === route.href}/>
            ))}
        </ul>
    )
}