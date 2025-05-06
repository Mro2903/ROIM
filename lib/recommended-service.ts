import type {User} from "@prisma/client";
import {db} from "@/lib/db";
import {auth} from "@/auth";

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