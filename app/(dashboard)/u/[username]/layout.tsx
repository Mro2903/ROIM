import React from 'react'
import {redirect} from "next/navigation";
import {Navbar} from "./_components/navbar";
import {Sidebar} from "./_components/sidebar";
import {Container} from "@/app/(dashboard)/u/[username]/_components/container";
import {auth} from "@/auth";

interface LayoutProps {
    params : { username : string }
    children : React.ReactNode
}

const CreateLayout = async ({params, children}: LayoutProps) => {
    const {username} = await params
    const session = await auth()

    if (!session || session.user?.name !== username) {
        redirect("/")
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default CreateLayout