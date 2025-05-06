"use client";

import { Volume1, Volume2, VolumeX} from "lucide-react";

import {Hint} from "@/components/hint";

import {Slider} from "@/components/ui/slider";

interface VolumeControlProps {
    onToggleAction: () => void;
    onChangeAction: (value: number) => void;
    volume: number;
}

export const VolumeControl = ({ onToggleAction, onChangeAction, volume }: VolumeControlProps) => {
    const isMuted = volume === 0;
    const isAboveHalf = volume > 50;

    let Icon = Volume1;
    if (isMuted) {
        Icon = VolumeX;
    } else if (isAboveHalf) {
        Icon = Volume2;
    }

    const label = isMuted ? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChangeAction(value[0]);
    }

    return (
        <div className="flex items-center gap-2">
            <Hint label={label}>
                <button
                    onClick={onToggleAction}
                    className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                >
                    <Icon className="h-6 w-6"/>
                </button>
            </Hint>
            <Slider className="w-[8rem] cursor-pointer"
                    onValueChange={handleChange}
                    value={[volume]}
                    max={100}
                    step={1} />
        </div>
    )
}