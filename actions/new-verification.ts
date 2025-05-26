"use server"

import { db } from "@/lib/db"
import {getUserByEmail} from "@/data/user"
import { getVerificationTokenByToken} from "@/data/token"
import {generateVerificationToken} from "@/lib/token";
import {sendEmail} from "@/lib/mail";

/**
 * Verifies a user's email address using a verification token.
 *
 * This function checks if the provided token exists and is valid. If the token has expired,
 * it generates a new verification token and sends a verification email to the user.
 * If the token is valid and the user exists, it marks the user's email as verified and deletes the used token.
 *
 * @param token - The verification token to validate and process.
 * @returns An object indicating the result of the verification process:
 *   - `{ error: string }` if the token is invalid, expired, or the user is not found.
 *   - `{ success: string }` if the email was successfully verified.
 */
export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)

    if(!existingToken) {
        return { error: "Invalid token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) {
        const verificationToken = await generateVerificationToken(existingToken.email);
        await sendEmail(existingToken.email, verificationToken.token, 'verify-email');
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
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "Email verified" }
}