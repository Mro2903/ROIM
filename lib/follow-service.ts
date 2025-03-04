import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {auth} from "@/auth";

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
                following: true,
            }
        });
    } catch {
        return [];
    }
}

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