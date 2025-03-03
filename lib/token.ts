import {getVerificationTokenByEmail, getResetTokenByEmail} from '@/data/token';
import {v4 as uuidv4} from 'uuid';
import {db} from './db';

export const generateVerificationToken = async (email: string) => {
    // Generate a random token
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60; // 1 hour

    // Check if a token already exists for the user
    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create a new verification token
    return db.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expires)
        }
    });
}

export const generateResetPasswordToken = async (email: string) => {
    // Generate a random token
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60; // 1 hour

    // Check if a token already exists for the user
    const existingToken = await getResetTokenByEmail(email)

    if(existingToken) {
        await db.resetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create a new verification token
    return db.resetToken.create({
        data: {
            email,
            token,
            expires: new Date(expires)
        }
    });
}