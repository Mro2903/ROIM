"use client";

import {Maximize, Minimize} from "lucide-react";
import {Hint} from "@/components/hint";

interface FullScreenControlProps {
    isFullscreen: boolean;
    action: () => void;
}

export const FullScreenControl = ({ isFullscreen, action }: FullScreenControlProps) => {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit full screen" : "Enter full screen";
    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label}>
                <button
                    onClick={action}
                    className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-5 w-5"/>
                </button>
            </Hint>
        </div>
    )
}