/**
 * Hint component that wraps content with a tooltip.
 * Provides contextual information on hover.
 */

import React from 'react';
import Tooltip from "@/components/ui/tooltip";

/**
 * Props for the Hint component
 * @interface HintProps
 * @property {string} label - The text to display in the tooltip
 * @property {React.ReactNode} children - The content to wrap with the tooltip
 * @property {("top"|"bottom"|"left"|"right")} [position] - Optional position of the tooltip
 */
interface HintProps {
    label: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

/**
 * Wraps content with a tooltip that displays on hover
 * @param {HintProps} props - Component props
 * @returns {JSX.Element} Rendered hint component
 */
export const Hint = ({ label, children, position }: HintProps) => {
    return (
        <Tooltip content={label} position={position}>
            {children}
        </Tooltip>
    );
}