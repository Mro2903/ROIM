"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/token";
import { sendEmail } from "@/lib/mail";

/**
 * Registers a new user with the provided data.
 *
 * This function performs the following steps:
 * 1. Validates the input data against the `RegisterSchema`.
 * 2. Checks if the passwords match.
 * 3. Hashes the password using bcrypt and a secret.
 * 4. Checks if the email or name is already in use.
 * 5. Creates a new user in the database.
 * 6. Generates and sends an email verification token.
 *
 * @param data - The registration data conforming to `RegisterSchema`.
 * @returns An object containing either a success message or an error message.
 *
 * @throws Will return an error object if validation fails, the user already exists, 
 *         passwords do not match, or if there is a database/service error.
 */
export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    // Validate the input data
    const validatedData = RegisterSchema.parse(data);

    //  If the data is invalid, return an error
    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    //  Destructure the validated data
    const { email, name, password, passwordConfirmation } = validatedData;

    // Check if passwords match
    if (password !== passwordConfirmation) {
      return { error: "Passwords do not match" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password + process.env.AUTH_SECRET, 10);

    // Check to see if user already exists
    const EmailExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    // If the user exists, return an error
    if (EmailExists) {
      return { error: "Email already is in use. Please try another one." };
    }

    const NameExists = await db.user.findUnique({
      where: {
        name,
      },
    });

    if (NameExists) {
      return { error: "Name already is in use. Please try another one." };
    }

    const lowerCaseEmail = email.toLowerCase();

    // Create the user
    await db.user.create({
      data: {
        email: lowerCaseEmail,
        name,
        password: hashedPassword,
      },
    });

    // Generate Verification Token
    const verificationToken = await generateVerificationToken(email);

    await sendEmail(lowerCaseEmail, verificationToken.token, 'verify-email');

    return { success: "Email Verification was sent" };
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
