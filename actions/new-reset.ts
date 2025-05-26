"use server"

import { db } from "@/lib/db"
import {getUserByEmail} from "@/data/user"
import {getResetTokenByToken} from "@/data/token"
import {NewPasswordSchema} from "@/schemas"
import * as z from "zod";
import bcrypt from "bcryptjs";

/**
 * Resets a user's password using a provided reset token and new password data.
 *
 * This function performs the following steps:
 * 1. Validates the input data against the `NewPasswordSchema`.
 * 2. Checks if the provided passwords match.
 * 3. Hashes the new password.
 * 4. Verifies the validity and expiration of the reset token.
 * 5. Ensures the user associated with the token exists.
 * 6. Updates the user's password in the database.
 * 7. Deletes the used reset token.
 *
 * Returns an object indicating success or an error message.
 *
 * @param token - The password reset token provided to the user.
 * @param data - The new password data, validated against `NewPasswordSchema`.
 * @returns An object containing either a `success` message or an `error` message.
 */
export const newReset = async (token: string, data: z.infer<typeof NewPasswordSchema>) => {
    try {
        // Validate the input data
        const validatedData = NewPasswordSchema.parse(data);

        //  If the data is invalid, return an error
        if (!validatedData) {
            return { error: "Invalid input data" };
        }

        //  Destructure the validated data
        const { password, passwordConfirmation } = validatedData;

        // Check if passwords match
        if (password !== passwordConfirmation) {
            return { error: "Passwords do not match" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingToken = await getResetTokenByToken(token)

        if(!existingToken) {
            return { error: "Invalid token" }
        }

        const hasExpired = new Date(existingToken.expires) < new Date()

        if(hasExpired) {
            return { error: "Token has expired" }
        }

        const existingUser = await getUserByEmail(existingToken.email)


        if(!existingUser) {
            return { error: "User not found" }
        }

        await db.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                password: hashedPassword
            }
        })

        await db.resetToken.delete({
            where: {
                id: existingToken.id
            }
        })

        return { success: "Password reset successfully" }
    } catch (error) {
        // Handle the error, specifically check for a 503 error
        console.error("Database error:", error);

        if ((error as { code: string }).code === "ETIMEDOUT") {
            return {
                error: "Unable to connect to the database. Please try again later.",
            };
        } else if ((error as { code: string }).code === "503") {
            return {
                error: "Service temporarily unavailable. Please try again later.",
            };
        } else {
            return { error: "An unexpected error occurred. Please try again later." };
        }
    }
}