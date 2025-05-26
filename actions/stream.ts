"use server";

import {Stream, User} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {auth} from "@/auth";

/**
 * Updates the current user's stream with the provided values.
 *
 * This function retrieves the authenticated user, finds their associated stream,
 * and updates it with the given partial values. After updating, it triggers
 * revalidation for relevant user paths to ensure updated data is reflected.
 *
 * @param values - A partial object containing the fields of the Stream to update.
 * @returns A promise that resolves to the updated Stream object.
 * @throws Will throw an error if the stream is not found or if the update fails.
 */
export const updateStream = async (values: Partial<Stream>) => {
    try {
        const session = await auth()
        const user = session?.user as User;

        const userStream = await db.stream.findUnique(
            { where: { userId: user.id } }
        )

        if (!userStream) {
            throw new Error("Stream not found");
        }

        const stream = await db.stream.update({
            where: { id: userStream.id },
            data: values,
        });

        revalidatePath(`/u/${user.name}/chat`);
        revalidatePath(`/u/${user.name}/`);
        revalidatePath(`/${user.name}/`);

        return stream;
    } catch (error) {
        throw error
    }
}