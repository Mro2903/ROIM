import {db} from "@/lib/db";

/**
 * Retrieves a user by their unique identifier.
 *
 * @param id - The unique identifier of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or `null` if not found or an error occurs.
 */
export const getUserById = async (id: string) => {
    try {
        return db.user.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Retrieves a user from the database by their email address.
 *
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or `null` if not found or an error occurs.
 */
export const getUserByEmail = async (email: string) => {
    try {
        return db.user.findUnique({
            where: {
                email,
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Retrieves a user by their name from the database, including selected user fields,
 * stream details, and follower count.
 *
 * @param name - The name of the user to retrieve.
 * @returns A Promise resolving to the user object with selected fields if found, or null if not found or on error.
 */
export const getUserByName = async (name: string) => {
    try {
        return db.user.findUnique({
            where: {
                name,
            },
            select: {
                id: true,
                name: true,
                bio: true,
                image: true,
                stream: {
                    select: {
                        id: true,
                        name: true,
                        isLive: true,
                        isChatDelayed: true,
                        isChatEnabled: true,
                        isChatFollowersOnly: true,
                        thumbnailUrl: true,
                    },
                },
                _count: {
                    select: {
                        followedBy: true,
                        },
                    },
                },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}