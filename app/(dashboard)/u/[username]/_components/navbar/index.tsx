import {Logo, LogoSkeleton} from "./logo"
import {Action, ActionSkeleton} from "./action"
import {Wrapper} from "./wrapper";


/**
 * Renders the main navigation bar for the dashboard.
 *
 * The `Navbar` component displays a fixed navigation bar at the top of the page,
 * containing the application logo and action buttons. It uses a wrapper for layout
 * and applies responsive and theme-based styles.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export const Navbar = () => {
    return (
        <Wrapper>
            <nav className="fixed top-0 w-full h-20 z-[49] dark:bg-[#252731] bg-white  px-2 lg:4 flex justify-between items-center shadow-sm">
                <Logo />
                <Action />
            </nav>
        </Wrapper>
    );
}

export const NavbarSkeleton = () => {
    return (
        <aside className="fixed top-0 w-full h-20 z-[49] bg-[#252731]
        px-2 lg:4 flex justify-between items-center shadow-sm">
            <LogoSkeleton />
            <ActionSkeleton />
        </aside>
    )
}