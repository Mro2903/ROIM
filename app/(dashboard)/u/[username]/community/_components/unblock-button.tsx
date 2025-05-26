"use client";

import {useTransition} from "react";
import {onUnblock} from "@/actions/block";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";

interface UnblockButtonProps {
    userId: string;
}

/**
 * A button component that allows unblocking a user by their user ID.
 *
 * When clicked, it triggers the `onUnblock` function for the specified user,
 * displays a success toast on success, or an error toast on failure.
 * The button is disabled while the unblock operation is pending.
 *
 * @param userId - The unique identifier of the user to be unblocked.
 */
export const UnblockButton = ({userId}: UnblockButtonProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            console.log(`Unblocking user ${userId}`);
            onUnblock(userId)
                .then((result) => {
                    toast.success(`User ${result.blocked.name} unblocked`);
                })
                .catch(() => {
                    toast.error("Failed to unblock user");
                });
        });
    }

    return (
        <Button
            disabled={isPending}
            onClick={onClick}
            className="bg-blue-600 w-full text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2 focus:ring-offset-2 rounded-md shadow-sm text-sm font-medium transition-all duration-200 ease-in-out"
        >
            Unblock
        </Button>
    );
}