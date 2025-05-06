import {Button} from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-gray-500">
            <h1 className="text-4xl">404</h1>
            <p>
                We couldn&apos;t find the page you were looking for.
            </p>
            <Button className="w-full max-w-sm rounded-md border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-md transition duration-200 ease-in-out">
                <Link href="/">
                    Go back to home
                </Link>
            </Button>
        </div>
    )
}

export default NotFoundPage