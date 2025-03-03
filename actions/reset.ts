"use server";

import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import {generateResetPasswordToken} from "@/lib/token";
import { sendEmail } from "@/lib/mail";
import {getAccountByUserId} from "@/data/account";
import {getUserByEmail} from "@/data/user";


export const reset = async (data: z.infer<typeof ResetPasswordSchema>) => {
    try {
        // Validate the input data
        const validatedData = ResetPasswordSchema.parse(data);

        //  If the data is invalid, return an error
        if (!validatedData) {
            return { error: "Invalid input data" };
        }

        //  Destructure the validated data
        const { email } = validatedData;


        // Check to see if user already exists
        const userExists = await getUserByEmail(email);

        // If the user does not exist, return an error
        if (!userExists) {
            return { error: "User does not exist" };
        }

        // Check to see if the user has an account
        const accountExists = await getAccountByUserId(userExists.id);
        // If the user has an account, return an error
        if (accountExists) {
            return { error: "User does not have a password (google account)" };
        }

        // Check to see if the user has verified their email
        if (!userExists.emailVerified) {
            return { error: "User email is not verified" };
        }

        const lowerCaseEmail = email.toLowerCase();


        // Generate Verification Token
        const verificationToken = await generateResetPasswordToken(email);

        await sendEmail(lowerCaseEmail, verificationToken.token, 'reset-password');

        return { success: "Reset password email was sent" };
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
};
