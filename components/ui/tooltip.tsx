// components/Tooltip.tsx
"use client";

import React, { useState } from "react";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, content, position = "top" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Tooltip position classes
    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
        left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
        right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    };

    return (
        <div className="relative inline-block">
            {/* Target Element */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>

            {/* Tooltip */}
            {isVisible && (
                <div
                    className={`absolute ${positionClasses[position]} bg-black text-white text-sm px-3 py-1.5 rounded-md shadow-lg z-50`}
                >
                    {content}
                    {/* Tooltip Arrow */}
                    <div
                        className={`absolute w-2 h-2 bg-black transform rotate-45 ${positionClasses[position]
                            .split(" ")
                            .map((cls) => `tooltip-arrow-${cls}`)
                            .join(" ")}`}
                    />
                </div>
            )}
        </div>
    );
}