import {getSearch} from "@/lib/search-service";
import {ResultCard, ResultCardSkeleton} from "@/app/(browse)/search/_components/result-card";
import {Skeleton} from "@/components/ui/skeleton";

interface ResultsProps {
    term?: string;
}

/**
 * Asynchronously fetches and displays search results for a given term.
 *
 * @param term - The search term to query results for.
 * @returns A React component that renders a list of results or a message if no results are found.
 */
export const Results = async ({ term }: ResultsProps) => {
    const data = await getSearch(term);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for term: &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-gray-500 text-sm">
                    No results found. Try searching for something else.
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard data={result} key={result.id} />
                ))}
            </div>
        </div>
    );
}

export const ResultsSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="felx flex-col gap-y-4">
                {[...Array(4)].map((_, index) => (
                    <ResultCardSkeleton key={index} />
                ))}
            </div>
        </div>
    )
}