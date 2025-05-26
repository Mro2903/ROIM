"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {OAuthAccountNotLinked} from "@auth/core/errors";

/**
 * Authenticates a user using Google OAuth.
 *
 * Attempts to sign in the user with Google as the provider. If successful, redirects to the dashboard.
 * Handles specific authentication errors:
 * - If the user's email is not linked to a Google account, returns a descriptive message.
 * - If a general authentication error occurs, returns a generic error message.
 * Any other errors are re-thrown.
 *
 * @returns {Promise<string | void>} A message describing the error, or nothing if successful.
 * @throws Rethrows any unexpected errors encountered during authentication.
 */
export async function googleAuthenticate() {
    try {
      await signIn('google', {
          redirectTo: '/dashboard',
      });
    } catch (error) {
      if (error instanceof OAuthAccountNotLinked) {
        return 'this email\'s user does not have a google account linked';
      }
      if (error instanceof AuthError) {
        return 'An error occurred while trying to sign in';
        }
      throw error;
    }
  }