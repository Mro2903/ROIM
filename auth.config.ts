
import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import {db} from "@/lib/db";
import {LoginSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {getUserByName} from "@/data/user";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            async profile(profile) {
                let username = profile.email.split('@')[0];
                while (await getUserByName(username)) {
                    username = "User" + Math.floor(Math.random() * 100000);
                }

                return {
                    id: profile.id,
                    name: username,
                    email: profile.email,
                    image: profile.picture
                }
            }
        }),
        Credentials({
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                const  validateData = LoginSchema.safeParse(credentials);
                if (!validateData.success) {
                    return null;
                }

                const { name, password } = validateData.data;
                const user = await db.user.findUnique({
                    where: {
                        name
                    }
                });

                if (!user || !user.password || !user.email) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(password + process.env.AUTH_SECRET!, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id + '',
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        newUser: '/register',
        verifyRequest: '/verify-request',
    }
} satisfies NextAuthConfig
