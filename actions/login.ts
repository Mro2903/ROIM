'use server';

import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {db} from "@/lib/db";
import {AuthError} from "next-auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
    const validatedData = LoginSchema.parse(data);
    if (!validatedData) {
        return { error : "Invalid data" };
    }

    const { name, password } = validatedData;
    const userExists = await db.user.findUnique({
        where: {
            name
        }
    });

    if (!userExists) {
        return { error: "User not found" };
    }
    if (!userExists.password) {
        return { error: "User has no password (google account)" };
    }

    try {
        await signIn("credentials", {
            name,
            password,
            redirect: false
        });
    } catch (error) {
        if (error instanceof AuthError) {
            const authError = error as Error & { message?: string };

            // Check the error message instead of using type property
            if (authError.message?.includes("CredentialsSignin")) {
                return { error: "Invalid credentials" };
            } else {
                console.log(error);
                return { error: "Please confirm your email address" };
            }
        }
        if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
            throw error
        }
        console.error(error);
        return { error: "An error occurred" };
    }

    return { success: "User logged in successfully" };
}