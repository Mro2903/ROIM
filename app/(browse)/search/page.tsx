import {redirect} from "next/navigation";
import {Results, ResultsSkeleton} from "@/app/(browse)/search/_components/results";
import {Suspense} from "react";

interface SearchPageProps {
    searchParams: {
        term?: string;
    }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const {term} = await searchParams;
    if(!term) {
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