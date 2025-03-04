import {db} from "@/lib/db";

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

export const getUserByName = async (name: string) => {
    try {
        return db.user.findUnique({
            where: {
                name,
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}