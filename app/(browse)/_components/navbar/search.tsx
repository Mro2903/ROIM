'use client';

import qs from "query-string";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

/**
 * Search component that provides a search input with clear and submit functionality.
 *
 * - Allows users to enter a search term.
 * - Clears the input when the clear (X) icon is clicked.
 * - On submit, navigates to the `/search` page with the search term as a query parameter.
 *
 * @returns {JSX.Element} The rendered search form component.
 */
export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const onClear = () => {
        setValue("");
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;
        const url = qs.stringifyUrl({
            url: '/search',
            query: { term: value},
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };



    return (
        <form className="relative w-full lg:w-[400px] flex items-center"
            onSubmit={onSubmit}>
            <Input value={value} onChange={(e) => setValue(e.target.value)}
                   placeholder="Search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
            {value && <X className="absolute top-2.5 right-14 h-5 w-5 text-foreground cursor-pointer hover:opacity-75 transition-opacity"
                          onClick={onClear} />}
            <Button type="submit" className="rounded-l-none">
            <SearchIcon className="h-5 w-5 text-foreground" /></Button>
        </form>
    );
}

export const SearchSkeleton = () => {
    return (
        <div className="relative w-full lg:w-[400px] flex items-center">
            <Skeleton className="rounded-full h-10  w-full lg:w-[400px]" />
        </div>
    );
}