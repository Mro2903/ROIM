import React from 'react';
import { Logo } from "@/app/(auth)/_components/logo";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-4">
            <Logo />
            <div className="w-[350px]">{children}</div>
        </div>
    );
}