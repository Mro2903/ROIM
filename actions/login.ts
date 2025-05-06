'use server';

import * as z from "zod";
import {LoginSchema} from "@/schemas";
import {signIn} from "@/auth";
import {db} from "@/lib/db";
import {AuthError} from "next-auth";
import {isRedirectError} from "next/dist/client/components/redirect";

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
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    console.log(error)
                    return { error: "Please confirm your email address" };
            }
        }
        if (isRedirectError(error)) {
            return { error: "Redirect error" };
        }
        console.error(error);
        return { error: "An error occurred" };
    }

    return { success: "User logged in successfully" };
}