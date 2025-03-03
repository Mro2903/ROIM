import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
    return (
        <Button className="font-normal w-full">
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )

}