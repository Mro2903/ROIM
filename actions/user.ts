"use server";

import {User} from "@prisma/client";
import {auth} from "@/auth";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

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