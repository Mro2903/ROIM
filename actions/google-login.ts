"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {redirect} from "next/navigation";

export async function googleAuthenticate() {
    try {
      await signIn('google', {
          redirectTo: '/dashboard',
      });
      redirect('/dashboard');
    } catch (error) {
      if (error instanceof AuthError) {
        return 'google log in failed'
      }
      throw error;
    }
  }