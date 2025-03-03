
import { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import {db} from "@/lib/db";
import {LoginSchema} from "@/schemas";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const  validateData = LoginSchema.safeParse(credentials);
                if (!validateData.success) {
                    return null;
                }

                const { email, password } = validateData.data;
                const user = await db.user.findUnique({
                    where: {
                        email
                    }
                });

                if (!user || !user.password || !user.email) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);

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
    ]
} satisfies NextAuthConfig
