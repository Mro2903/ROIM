import { create } from 'zustand';

export enum ChatVeriant {
    CHAT = 'CHAT',
    COMMUNITY = 'COMMUNITY',
}

interface ChatSidebarStore {
    collapsed: boolean;
    variant: ChatVeriant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: ChatVeriant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVeriant.CHAT,
    onExpand: () => set({ collapsed: false }),
    onCollapse: () => set({ collapsed: true }),
    onChangeVariant: (variant: ChatVeriant) => set(() => ({ variant })),
}));