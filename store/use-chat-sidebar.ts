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

/**
 * Zustand store hook for managing the state of the chat sidebar.
 *
 * @returns An object containing the sidebar's collapsed state, current variant,
 * and handler functions to expand, collapse, or change the sidebar variant.
 *
 * @property {boolean} collapsed - Indicates whether the sidebar is collapsed.
 * @property {ChatVeriant} variant - The current variant of the chat sidebar.
 * @property {() => void} onExpand - Expands the sidebar.
 * @property {() => void} onCollapse - Collapses the sidebar.
 * @property {(variant: ChatVeriant) => void} onChangeVariant - Changes the sidebar variant.
 */
export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    collapsed: false,
    variant: ChatVeriant.CHAT,
    onExpand: () => set({ collapsed: false }),
    onCollapse: () => set({ collapsed: true }),
    onChangeVariant: (variant: ChatVeriant) => set(() => ({ variant })),
}));