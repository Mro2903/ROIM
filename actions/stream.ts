"use server";

import {Stream, User} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {auth} from "@/auth";

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