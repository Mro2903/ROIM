import React, {Suspense} from 'react';
import {Navbar, NavbarSkeleton} from "@/app/(browse)/_components/navbar";
import {Sidebar, SidebarSkeleton} from "@/app/(browse)/_components/sidebar";
import {Container} from "@/app/(browse)/_components/container";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
            <>
                <Suspense fallback={<NavbarSkeleton />}>
                    <Navbar />
                </Suspense>
                <div className="flex h-full pt-20">
                    <Suspense fallback={<SidebarSkeleton />}>
                        <Sidebar />
                    </Suspense>
                    <Container>
                        {children}
                    </Container>
                </div>
            </>
    );
}