import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {auth} from "@/auth";

/**
 * Retrieves the list of users that the currently authenticated user is following,
 * excluding those who have blocked the current user. Each followed user includes
 * their stream information, specifically whether they are currently live.
 *
 * @returns {Promise<Array<any>>} A promise that resolves to an array of followed user objects,
 * each including their stream's live status. Returns an empty array if an error occurs or if the user is not authenticated.
 */
export const getFollowedUsers = async () => {
    try {
        const session = await auth();
        const user = session?.user as User;

        return await db.follow.findMany({
            where: {
                followerId: user.id,
                following: {
                    blocking : {
                        none : {
                            blockedId : user.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true,
                            },
                        },
                    },
                },
            },
        });
    } catch {
        return [];
    }
}

/**
 * Determines whether the currently authenticated user is following the user with the specified ID.
 *
 * @param userId - The ID of the user to check if the current user is following.
 * @returns A promise that resolves to `true` if the current user is following the specified user,
 *          `false` otherwise. Returns `true` if the user checks against themselves.
 *          Returns `false` if the user is not authenticated, the target user does not exist,
 *          or if an error occurs during the process.
 */
export const isFollowingUser = async (userId: string) => {
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
            return true;
        }

        const following = await db.follow.findFirst({
            where: {
                followerId: user.id,
                followingId: otherUser.id,
            },
        });

        return !!following;
    } catch {
        return false;
    }
}

/**
 * Follows a user by creating a follow relationship between the current authenticated user and the specified user.
 *
 * @param userId - The ID of the user to follow.
 * @returns A promise that resolves to the created follow relationship, including the follower and following user details.
 * @throws {Error} If the current user or the target user is not found.
 * @throws {Error} If the user attempts to follow themselves.
 * @throws {Error} If the current user is already following the target user.
 */
export const followUser = async (userId: string) => {
    const session = await auth();
    const user = session?.user as User;

    const otherUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (!user || !otherUser) {
        throw new Error("User not found");
    }

    if (user.id === otherUser.id) {
        throw new Error("Cannot follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: user.id,
            followingId: otherUser.id,
        },
    });

    if (existingFollow) {
        throw new Error("Already following user");
    }

    return db.follow.create({
        data: {
            followerId: user.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true,
        }
    });
}

/**
 * Unfollows a user with the specified user ID.
 *
 * This function performs the following steps:
 * 1. Authenticates the current session and retrieves the current user.
 * 2. Finds the user to be unfollowed by their ID.
 * 3. Validates that both users exist and that the current user is not trying to unfollow themselves.
 * 4. Checks if a follow relationship exists between the current user and the target user.
 * 5. If the follow relationship exists, deletes it and returns the deleted follow record (including the followed user).
 *
 * @param userId - The ID of the user to unfollow.
 * @returns A promise that resolves to the deleted follow record, including the followed user.
 * @throws Will throw an error if the user or target user is not found, if the user tries to unfollow themselves, or if the follow relationship does not exist.
 */
export const unfollowUser = async (userId: string) => {
    const session = await auth();
    const user = session?.user as User;

    const otherUser = await db.user.findUnique({
        where: { id: userId },
    });

    if (!user || !otherUser) {
        throw new Error("User not found");
    }

    if (user.id === otherUser.id) {
        throw new Error("Cannot unfollow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: user.id,
            followingId: otherUser.id,
        },
    });

    if (!existingFollow) {
        throw new Error("Not following user");
    }

    return db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        }
    });
}