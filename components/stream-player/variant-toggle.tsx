"use client";

import {MessageSquare, Users} from "lucide-react";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {ChatVeriant, useChatSidebar} from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar((state) => state);

    const isChat = variant === ChatVeriant.CHAT;

    const Icon = isChat ? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChat ? ChatVeriant.COMMUNITY : ChatVeriant.CHAT;
        onChangeVariant(newVariant);
    }

    const label = isChat ? "Community" : "Go back to chat";

    return (
        <Hint label={label} position="left">
            <Button
                className="h-auto p-2 hover:bg-white/10 hover:text-pretty bg-transparent dark:text-white text-black rounded-full"
                onClick={onToggle}
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    )
}