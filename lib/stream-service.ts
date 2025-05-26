import {db} from '@/lib/db'
import {auth} from "@/auth";

/**
 * Retrieves the stream associated with the given user ID. If the stream does not exist,
 * it creates a new stream for the user using their username as the stream name.
 *
 * @param userId - The unique identifier of the user whose stream is to be retrieved or created.
 * @returns A promise that resolves to the stream object associated with the user.
 */
export const getStreamById = async (userId: string) => {
    const stream = await db.stream.findUnique({
        where: {
            userId
        }
    });
    if (!stream) {
        const username = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true
            }
        })
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                stream: {
                    create: {
                        name: `${username?.name}'s stream`,
                    }
                }
            }
        })
    }
    return db.stream.findUnique({
        where: {
            userId
        }
    });
}

/**
 * Retrieves a list of streams from the database, optionally filtering out streams
 * from users who have blocked the current authenticated user.
 *
 * - If a user is authenticated, streams from users who have blocked the current user are excluded.
 * - If no user is authenticated, all streams are returned.
 * - The returned streams are ordered by their live status (live streams first) and creation date (most recent first).
 *
 * @returns {Promise<Array<{ id: string; user: any; isLive: boolean; name: string; thumbnailUrl: string }>>}
 *   A promise that resolves to an array of stream objects with selected fields.
 */
export const getStreams = async () => {
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
                            some:   {
                                blockedId: userId,
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl: true,
            },
            orderBy: [
                {
                    isLive: "desc",
                },
                {
                    createdAt: "desc",
                },
            ]
        });
    } else {
        return db.stream.findMany({
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl: true,
            },
            orderBy: [
                {
                    isLive: "desc",
                },
                {
                    createdAt: "desc",
                },
            ]
        });
    }
}