import type {User} from "@prisma/client";
import {db} from "@/lib/db";
import {auth} from "@/auth";

/**
 * Retrieves a list of recommended users for the currently authenticated user.
 *
 * - If a user is authenticated, returns up to 5 users who:
 *   - Are not the current user.
 *   - Are not followed by the current user.
 *   - Have not blocked the current user.
 * - If no user is authenticated, returns up to 5 most recently created users.
 * - Each user object includes their stream's live status.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of recommended user objects, each including their stream's live status.
 */
export const getRecommended = async () => {
    let user = null;
    try {
        const session = await auth();
        user = session?.user as User;
    } catch (error) {
        console.log("Failed to get self", error);
    }

    if (user) {
        return db.user.findMany({
            where: {
                AND: [{
                    NOT: {
                        id: user.id,
                    },
                }, {
                    NOT: {
                        followedBy: {
                            some: {
                                followerId: user.id,
                            },
                        },
                    },
                }, {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: user.id,
                            },
                        },
                    },
                }]

            },
            include: {
                stream: {
                    select: {
                        isLive: true,
                    },
                },
            },
            orderBy: {createdAt: "desc"},
            take: 5,
        });
    } else {
        return db.user.findMany({
            include: {
                stream: {
                    select: {
                        isLive: true,
                    },
                },
            },
            orderBy: {createdAt: "desc"},
            take: 5,
        });
    }
}