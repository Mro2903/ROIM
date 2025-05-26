import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {auth} from "@/auth";

/**
 * Determines whether the currently authenticated user is blocking the specified user.
 *
 * @param userId - The ID of the user to check if they are being blocked by the current user.
 * @returns A promise that resolves to `true` if the current user is blocking the specified user, or `false` otherwise.
 *
 * The function returns `false` if:
 * - The current user is not authenticated.
 * - The specified user does not exist.
 * - The current user is checking against themselves.
 * - An error occurs during the process.
 */
export const isBlockingUser = async (userId: string) => {
    try {
        const session = await auth();
        const user = session?.user as User;
        const otherUser = await db.user.findUnique({
            where: { id: userId },
        });

        if (!user || !otherUser) {
            return false;
        }

        if (user.id === otherUser.id) {
            return false;
        }

        const blocking = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: user.id,
                    blockedId: otherUser.id,
                }
            },
        });

        return !!blocking;
    } catch {
        return false;
    }
}

/**
 * Checks if the currently authenticated user is blocked by the user with the given `userId`.
 *
 * This function retrieves the current session and the user associated with the session,
 * then checks if the user with the provided `userId` has blocked the current user.
 *
 * @param userId - The ID of the user to check if they have blocked the current user.
 * @returns A promise that resolves to `true` if the current user is blocked by the specified user, otherwise `false`.
 */
export const isBlockedByUser = async (userId: string) => {
    try {
        const session = await auth();
        const user = session?.user as User;
        const otherUser = await db.user.findUnique({
            where: { id: userId },
        });

        if (!user || !otherUser) {
            return false;
        }

        if (user.id === otherUser.id) {
            return false;
        }

        const blocked = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: user.id,
                }
            },
        });

        return !!blocked;
    } catch {
        return false;
    }
}

/**
 * Blocks a user by their user ID.
 *
 * This function checks if the current authenticated user is attempting to block themselves,
 * verifies that both the current user and the target user exist, and ensures that the target
 * user is not already blocked. If all checks pass, it creates a new block record in the database.
 *
 * @param userId - The ID of the user to be blocked.
 * @throws {Error} If the user tries to block themselves.
 * @throws {Error} If either the current user or the target user does not exist.
 * @throws {Error} If the target user is already blocked.
 * @returns A promise that resolves to the newly created block record, including the blocked user.
 */
export const blockUser = async (userId: string) => {
    const session = await auth();
    const user = session?.user as User;

    if (user.id === userId) {
        throw new Error("You cannot block yourself");
    }

    const otherUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (!user || !otherUser) {
        throw new Error("User not found");
    }

    const blocked = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: user.id,
                blockedId: otherUser.id,
            }
        },
    });

    if (blocked) {
        throw new Error("User already blocked");
    }

    return db.block.create({
        data: {
            blockerId: user.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true,
        }
    });
}

/**
 * Unblocks a user by their user ID.
 *
 * @param userId - The ID of the user to unblock.
 * @returns A promise that resolves to the deleted block record, including the unblocked user.
 * @throws Will throw an error if the current user tries to unblock themselves.
 * @throws Will throw an error if either the current user or the target user is not found.
 * @throws Will throw an error if the target user is not currently blocked by the current user.
 */
export const unblockUser = async (userId: string) => {
    const session = await auth();
    const user = session?.user as User;

    if (user.id === userId) {
        throw new Error("You cannot unblock yourself");
    }

    const otherUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (!user || !otherUser) {
        throw new Error("User not found");
    }

    const blocked = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: user.id,
                blockedId: otherUser.id,
            }
        },
    });

    if (!blocked) {
        throw new Error("User not blocked");
    }

    return db.block.delete({
        where: {
            blockerId_blockedId: {
                blockerId: user.id,
                blockedId: otherUser.id,
            }
        },
        include: {
            blocked: true,
        }
    });
}

/**
 * Retrieves a list of users that the currently authenticated user has blocked.
 *
 * This function fetches the current session, extracts the user, and queries the database
 * for all block records where the authenticated user is the blocker. The returned list
 * includes detailed information about each blocked user.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of blocked user records.
 * If the user is not authenticated, an empty array is returned.
 */
export const getBlockedUsers = async () => {
    const session = await auth();
    const user = session?.user as User;

    if (!user) {
        return [];
    }

    return db.block.findMany({
        where: {
            blockerId: user.id,
        },
        include: {
            blocked: true,
        }
    });
}