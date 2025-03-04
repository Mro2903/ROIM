import React from 'react';
import Tooltip from "@/components/ui/tooltip";

interface  HintProps {
    label: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

export const Hint = ({ label, children, position }: HintProps) => {
    return (
        <Tooltip content={label} position={position}>
            {children}
        </Tooltip>
    );
}