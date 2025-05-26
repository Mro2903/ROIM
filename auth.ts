/**
 * NextAuth configuration and setup file.
 * This file configures the authentication system with:
 * - Custom callbacks for sign-in, session, and JWT handling
 * - Prisma adapter for database integration
 * - JWT session strategy
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import {getUserById} from "@/data/user";
import {getAccountByUserId} from "@/data/account";

export const {
    handlers,
    auth,
    signIn,
    signOut
} = NextAuth({
    /**
     * Authentication callbacks for customizing the auth flow
     */
    callbacks: {
        /**
         * Custom sign-in callback
         * For credentials provider, checks if user's email is verified
         * @param {Object} params - Sign-in parameters
         * @param {Object} params.user - The user attempting to sign in
         * @param {Object} params.account - The account provider details
         * @returns {Promise<boolean>} Whether the sign-in should proceed
         */
        async signIn({ user, account}) {
            if (account?.provider !== "credentials") {
                return true;
            }
            const existingUser = await getUserById(user.id ?? "");
            return !!existingUser?.emailVerified;
        },

        /**
         * Session callback to customize the session object
         * Adds user ID to the session
         * @param {Object} params - Session parameters
         * @param {Object} params.token - The JWT token
         * @param {Object} params.session - The session object
         * @returns {Promise<Object>} Modified session object
         */
        async session({ token, session }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                }
            }
        },

        /**
         * JWT callback to customize the token
         * Adds user details and OAuth status to the token
         * @param {Object} params - JWT parameters
         * @param {Object} params.token - The JWT token
         * @returns {Promise<Object>} Modified token
         */
        async jwt({ token }) {
            if (!token.sub) return token;
            const user = await getUserById(token.sub);
            if (!user) return token;
            const account = await getAccountByUserId(user.id);
            token.isOauth = !!account;
            token.name = user.name;
            token.email = user.email;
            token.image = user.image;
            return token;
        },
    },
    /** Prisma adapter for database integration */
    adapter: PrismaAdapter(db),
    /** JWT session strategy configuration */
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});