"use server";

import {revalidatePath} from "next/cache";
import {followUser, unfollowUser} from "@/lib/follow-service";

/**
 * Handles the follow action for a user by their ID.
 *
 * Attempts to follow the user with the specified ID, revalidates the homepage path,
 * and, if successful, revalidates the followed user's profile path.
 *
 * @param id - The unique identifier of the user to follow.
 * @returns A promise that resolves to the followed user object, or throws an error if the operation fails.
 * @throws {Error} Throws an "internal server error" if the follow operation fails.
 */
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

/**
 * Unfollows a user by their ID and revalidates relevant paths.
 *
 * @param id - The unique identifier of the user to unfollow.
 * @returns A promise that resolves to the unfollowed user object, or throws an error if the operation fails.
 * @throws {Error} Throws an error with the message "internal server error" if the unfollow operation fails.
 */
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
