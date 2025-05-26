import {db} from "@/lib/db";
import {auth} from "@/auth";

/**
 * Retrieves a list of streams matching the provided search term, with results filtered
 * based on the current authenticated user's blocking relationships.
 *
 * - If a user is authenticated, streams from users who have blocked the current user are excluded.
 * - If no user is authenticated, all streams matching the search term are returned.
 * - Streams are searched by their name or the associated user's name.
 * - Results are ordered by live status (live streams first) and then by creation date (most recent first).
 *
 * @param term - Optional search term to filter streams by name or user name.
 * @returns A promise that resolves to an array of stream objects with selected fields.
 */
export const getSearch = async (term?: string) => {
    let userId;

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        userId = null;
    } else {
        userId = session.user.id;
    }

    if (userId) {
        return db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId,
                            }
                        }
                    }
                },
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            name: {
                                contains: term,
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailUrl: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    createdAt: "desc"
                }
            ]
        });
    } else {
        return db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            name: {
                                contains: term,
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailUrl: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    isLive: "desc"
                },
                {
                    createdAt: "desc"
                }
            ]
        });
    }
}