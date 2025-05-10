import {redirect} from "next/navigation";
import {Results, ResultsSkeleton} from "@/app/(browse)/search/_components/results";
import {Suspense} from "react";

const SearchPage = async ({
                              searchParams,
                          }: {
    searchParams: Promise<{ [term: string]: string | string[] | undefined }>
}) => {
    const {term} = await searchParams;
    if(!term || Array.isArray(term) || term.length === 0) {
        redirect("/");
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results term={term}/>
            </Suspense>
        </div>
    )
}

export default SearchPage;