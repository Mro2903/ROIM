import {Check} from "lucide-react";

export const VerifiedMark = () => {
    return (
        <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 p-0.5">
            <Check className="w-[10px] h-[10px] text-pretty stroke-4" />
        </div>
    )
}