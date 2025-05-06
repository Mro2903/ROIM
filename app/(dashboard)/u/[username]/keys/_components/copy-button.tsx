"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {CheckCheck, Copy} from "lucide-react";

interface CopyButtonProps {
    value?: string;
}

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