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

    const { email, password } = validatedData;
    const userExists = await db.user.findFirst({
        where: {
            email
        }
    });

    if (!userExists || !userExists.password || !userExists.email) {
        return { error: "User not found" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/", // Redirect to home page after sign in
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Please confirm your email address" };
            }
        }
        console.error(error);
        return { error: "An error occurred" };
    }

    return { success: "User logged in successfully" };
}