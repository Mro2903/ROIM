"use server";

import {blockUser, unblockUser} from "@/lib/block-service";
import {revalidatePath} from "next/cache";
import {RoomServiceClient} from "livekit-server-sdk";
import {auth} from "@/auth";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
    const session = await auth();
    const sessionUser = session?.user;
    if (!sessionUser || !sessionUser.id) {
        return null;
    }

    let blockedUser;
    try {
        blockedUser = await blockUser(id);
    } catch {
        // user is guest
    }

    try {
        await roomService.removeParticipant(sessionUser?.id, id);
    } catch {
        // user is not in the room
    }

    revalidatePath(`/u/${sessionUser.id}/community`);

    if (blockedUser) {
        revalidatePath(`/u/${blockedUser.blocked.name}`);
    }

    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
        revalidatePath(`/u/${unblockedUser.blocked.name}`);
    }

    return unblockedUser;
}