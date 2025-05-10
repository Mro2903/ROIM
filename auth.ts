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
    callbacks: {
        async signIn({ user, account}) {
            if (account?.provider !== "credentials") {
                return true;
            }
            const existingUser = await getUserById(user.id ?? "");
            return !!existingUser?.emailVerified;

        },
        async session({ token, session }) {

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub
                }
            }
        },
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
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});