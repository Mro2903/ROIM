/**
 * VerifiedMark component that displays a checkmark icon in a blue circle.
 * Used to indicate verified status for users or content.
 */

import {Check} from "lucide-react";

/**
 * Renders a small circular badge with a checkmark icon
 * @returns {JSX.Element} Rendered verified mark component
 */
export const VerifiedMark = () => {
    return (
        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 p-0.5">
            <Check className="w-[10px] h-[10px] text-pretty stroke-4" />
        </div>
    )
}