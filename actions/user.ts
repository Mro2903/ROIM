"use server";

import {User} from "@prisma/client";
import {auth} from "@/auth";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

/**
 * Updates the authenticated user's information in the database.
 *
 * @param values - A partial object containing the user fields to update (e.g., `bio`).
 * @returns A promise that resolves to the updated user object.
 *
 * @remarks
 * - Requires an authenticated session.
 * - Revalidates the user's profile and user ID paths after update.
 */
export const updateUser = async (values: Partial<User>) => {
    const session = await auth();
    const sessionUser = session?.user;

    const validData = {
        bio: values.bio,
    };

    const user = await db.user.update({
        where: {
            id: sessionUser?.id,
        },
        data: {...validData},
    });

    revalidatePath(`/${user.name}`);
    revalidatePath(`/u/${sessionUser?.id}`);

    return user;
}