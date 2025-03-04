"use server";

import {revalidatePath} from "next/cache";
import {followUser, unfollowUser} from "@/lib/follow-service";

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/")

        if (followedUser) {
            revalidatePath(`/u/${followedUser.following.name}`);
        }

        return followedUser;
    } catch {
        throw new Error("internal server error");
    }
}

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        revalidatePath("/")

        if (unfollowedUser) {
            revalidatePath(`/u/${unfollowedUser.following.name}`);
        }

        return unfollowedUser;
    } catch {
        throw new Error("internal server error");
    }
}
