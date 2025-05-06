"use server"

import { db } from "@/lib/db"
import {getUserByEmail} from "@/data/user"
import { getVerificationTokenByToken} from "@/data/token"
import {generateVerificationToken} from "@/lib/token";
import {sendEmail} from "@/lib/mail";

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