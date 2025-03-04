"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {OAuthAccountNotLinked} from "@auth/core/errors";

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