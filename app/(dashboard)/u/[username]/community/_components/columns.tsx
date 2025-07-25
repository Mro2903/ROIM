"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {UserAvatar} from "@/components/ui/user-avatar";
import {ArrowUpDown} from "lucide-react";
import {UnblockButton} from "@/app/(dashboard)/u/[username]/community/_components/unblock-button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BlockedUser = {
    id: string
    userId: string
    imageUrl: string
    username: string
    createdAt: string
}

/**
 * Column definitions for the blocked users table in the community dashboard.
 *
 * - "username": Displays the blocked user's avatar and username, with sortable header.
 * - "createdAt": Shows the date the user was blocked, with sortable header.
 * - "actions": Renders an unblock button for each blocked user.
 *
 * @remarks
 * Uses custom components such as `UserAvatar`, `UnblockButton`, and `ArrowUpDown` for enhanced UI.
 *
 * @typeParam BlockedUser - The shape of the blocked user data.
 */
export const columns: ColumnDef<BlockedUser>[] = [
    {
        accessorKey: "username",
        header: ({column }) => (
            <Button className="w-full text-left gap-x-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Username
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="flex items-center gap-x-4">
                <UserAvatar username={row.original.username} image={row.original.imageUrl} />
                <span>{row.original.username}</span>
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({column }) => (
            <Button className="w-full text-left gap-x-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Date Blocked
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        id: "actions",
        cell: ({row}) => <UnblockButton userId={row.original.userId} />,
    },
]
