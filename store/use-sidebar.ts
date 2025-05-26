import { create } from 'zustand';

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

/**
 * Zustand store hook for managing the sidebar's collapsed state.
 *
 * @returns An object containing:
 * - `collapsed`: A boolean indicating whether the sidebar is collapsed.
 * - `onExpand`: A function to expand the sidebar (sets `collapsed` to `false`).
 * - `onCollapse`: A function to collapse the sidebar (sets `collapsed` to `true`).
 *
 * @example
 * const { collapsed, onExpand, onCollapse } = useSidebar();
 */
export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set({ collapsed: false }),
    onCollapse: () => set({ collapsed: true }),
}));