import {db} from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                email: email
            }
        });
    } catch (error) {
        console.log(error);
    }

}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        return await db.verificationToken.findFirst({
            where: {
                token: token
            }
        });
    } catch (error) {
        console.log(error);
    }

}

export const getResetTokenByEmail = async (email: string) => {
    try {
        return await db.resetToken.findFirst({
            where: {
                email: email
            }
        });
    } catch (error) {
        console.log(error);
    }

}

export const getResetTokenByToken = async (token: string) => {
    try {
        return await db.resetToken.findFirst({
            where: {
                token: token
            }
        });
    } catch (error) {
        console.log(error);
    }

}