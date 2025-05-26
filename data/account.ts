import { db } from "@/lib/db";

/**
 * Retrieves the first account associated with the specified user ID.
 *
 * @param userId - The unique identifier of the user whose account is to be fetched.
 * @returns A promise that resolves to the account object if found, or `null` if no account exists for the given user ID.
 */
export const getAccountByUserId = async (userId: string) => {
    return db.account.findFirst({
        where: {
            userId
        }
    })
}