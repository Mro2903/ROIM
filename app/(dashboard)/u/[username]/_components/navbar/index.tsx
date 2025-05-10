import {Logo, LogoSkeleton} from "./logo"
import {Action, ActionSkeleton} from "./action"
import {Wrapper} from "./wrapper";


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