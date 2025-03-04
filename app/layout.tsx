import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import "./globals.css";
import {Toaster} from "sonner"
import {Providers} from "@/app/providers";


export const metadata: Metadata = {
    title: "ROIM",
    description: "A Streaming platform",
};

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
