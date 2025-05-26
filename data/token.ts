import {db} from "@/lib/db";

/**
 * Retrieves the first verification token associated with the specified email address.
 *
 * @param email - The email address to search for a verification token.
 * @returns A promise that resolves to the verification token object if found, or `undefined` if not found or an error occurs.
 */
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

/**
 * Retrieves a verification token record from the database by its token value.
 *
 * @param token - The verification token string to search for.
 * @returns A promise that resolves to the verification token record if found, or `undefined` if not found or an error occurs.
 */
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

/**
 * Retrieves the first reset token associated with the specified email address from the database.
 *
 * @param email - The email address to search for a reset token.
 * @returns A promise that resolves to the reset token object if found, or `undefined` if not found or an error occurs.
 */
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

/**
 * Retrieves a reset token record from the database by its token string.
 *
 * @param token - The reset token string to search for.
 * @returns A promise that resolves to the reset token record if found, or `undefined` if not found or an error occurs.
 */
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