import {db} from '@/lib/db'
import {auth} from "@/auth";

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