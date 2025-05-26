"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {CheckCheck, Copy} from "lucide-react";

interface CopyButtonProps {
    value?: string;
}

/**
 * A button component that copies a given value to the clipboard when clicked.
 * Displays a check icon for 2 seconds after copying to indicate success.
 *
 * @param value - The string value to be copied to the clipboard.
 *
 * @returns A button element that handles clipboard copy functionality and visual feedback.
 */
export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setCopied] = useState(false);

    const onCopy = () => {
        if (!value) return;

        setCopied(true);

        navigator.clipboard.writeText(value);
        setTimeout(() => setCopied(false), 2000);
    }

    const Icon = isCopied ? CheckCheck : Copy;

    return (
        <Button
            onClick={onCopy}
            disabled={!value || isCopied}
            className="flex items-center justify-center">
            <Icon className="w-4 h-4 mr-2" />
        </Button>
    );
}