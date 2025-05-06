import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {auth} from "@/auth";

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