import {Input} from "@/components/ui/input";
import {CopyButton} from "@/app/(dashboard)/u/[username]/keys/_components/copy-button";


interface UrlCardProps {
    value: string | null;
}

/**
 * Renders a card component displaying a server URL with a copy button.
 *
 * @param value - The server URL to display and copy.
 * @returns A styled card containing the server URL and a copy-to-clipboard button.
 */
export const UrlCard = ({ value }: UrlCardProps) => {
    return (
        <div className="dark:bg-[#2D2E32] bg-white p-6 rounded-xl">
            <div className="flex items-center gap-x-10">
                <p className="font-semibold shrink-0">
                    Server URL
                </p>
                <div className="space-y-2 w-full">
                    <div className="flex items-center gap-x-2 w-full">
                        <Input value={value || ""} disabled placeholder="Server URL"/>
                        <CopyButton value={value || ""} />
                    </div>
                </div>
            </div>
        </div>
    )
}