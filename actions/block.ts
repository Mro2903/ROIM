"use server";

import {blockUser, unblockUser} from "@/lib/block-service";
import {revalidatePath} from "next/cache";
import {RoomServiceClient} from "livekit-server-sdk";
import {auth} from "@/auth";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

/**
 * Handles the process of blocking a user by their ID.
 *
 * This function performs the following actions:
 * 1. Authenticates the current session and retrieves the user.
 * 2. Attempts to block the user with the given ID.
 *    - If the user is a guest, the operation is silently ignored.
 * 3. Attempts to remove the blocked user from the current user's room.
 *    - If the user is not in the room, the operation is silently ignored.
 * 4. Revalidates the community path for the current user.
 * 5. If a user was successfully blocked, revalidates the blocked user's path.
 *
 * @param id - The ID of the user to block.
 * @returns The blocked user object if blocking was successful, otherwise `null`.
 */
export const onBlock = async (id: string) => {
    const session = await auth();
    const sessionUser = session?.user;
    if (!sessionUser || !sessionUser.id) {
        return null;
    }

    let blockedUser;
    try {
        blockedUser = await blockUser(id);
    } catch {
        // user is guest
    }

    try {
        await roomService.removeParticipant(sessionUser?.id, id);
    } catch {
        // user is not in the room
    }

    revalidatePath(`/u/${sessionUser.id}/community`);

    if (blockedUser) {
        revalidatePath(`/u/${blockedUser.blocked.name}`);
    }

    return blockedUser;
}

/**
 * Unblocks a user by their ID, revalidates relevant paths, and returns the unblocked user.
 *
 * @param id - The unique identifier of the user to unblock.
 * @returns A promise that resolves to the unblocked user object, or undefined if the operation fails.
 *
 * @remarks
 * - Revalidates the root path (`/`) after unblocking.
 * - If a user is successfully unblocked, also revalidates the user's profile path (`/u/{username}`).
 */
export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
        revalidatePath(`/u/${unblockedUser.blocked.name}`);
    }

    return unblockedUser;
}