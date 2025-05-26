"use client";

import {Input} from "@/components/ui/input";
import {CopyButton} from "@/app/(dashboard)/u/[username]/keys/_components/copy-button";
import {Button} from "@/components/ui/button";
import {useState} from "react";

interface KeyCardProps {
    value: string | null
}

/**
 * Renders a card component displaying a stream key with options to show/hide and copy the key.
 *
 * @param value - The stream key to display in the input field.
 *
 * The component includes:
 * - A label for the stream key.
 * - An input field showing the stream key (masked or visible based on toggle).
 * - A button to copy the stream key.
 * - A button to toggle visibility of the stream key.
 */
export const KeyCard = ({ value }: KeyCardProps) => {
    const [show, setShow] = useState(false);

    return (
        <div className="dark:bg-[#2D2E32] bg-white p-6 rounded-xl">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">
                    Stream Key
                </p>
                <div className="space-y-2 w-full">
                    <div className="flex items-center gap-x-2 w-full">
                        <Input value={value || ""} disabled placeholder="Stream Key" type={show ? "text" : "password"} />
                        <CopyButton value={value || ""} />
                    </div>
                    <Button className="text-white hover:underline" onClick={() => setShow(!show)}>
                        {show ? "Hide" : "Show"} Key
                    </Button>
                </div>
            </div>
        </div>
    )
}