import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import {Toaster} from "sonner"
import {Providers} from "@/app/providers";


export const metadata: Metadata = {
    title: "ROIM",
    description: "A Streaming platform",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
};

/**
 * Root layout component for the application.
 *
 * Wraps the entire app with necessary providers and global styles.
 * - Sets the HTML language to English.
 * - Applies custom font variables and antialiasing to the body.
 * - Includes global Providers and a Toaster for notifications.
 *
 * @param children - The React node(s) to be rendered within the layout.
 * @returns The root HTML structure for the application.
 */
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        >
        <Providers>
            <Toaster theme="light" position="bottom-center" />
            {children}
        </Providers>
        </body>
        </html>
    );
}
