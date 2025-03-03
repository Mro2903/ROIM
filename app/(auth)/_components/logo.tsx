import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";

export function Logo() {
    return (
            <Avatar className="w-20 h-20">
                <Link href="/">
                <AvatarImage src="/logo.svg" alt="ROIM" />
                </Link>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
    )
}