import {db} from "@/lib/db";
import {auth} from "@/auth";

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