import {getStreams} from "@/lib/stream-service";
import {ResultCard, ResultCardSkeleton} from "@/app/(browse)/(home)/_components/result-card";
import {Skeleton} from "@/components/ui/skeleton";

/**
 * Asynchronously fetches and displays a list of recommended streams.
 *
 * Renders a heading, a message if no streams are found, and a responsive grid of `ResultCard` components
 * for each stream in the fetched data.
 *
 * @returns {Promise<JSX.Element>} A React component displaying recommended streams or a message if none are found.
 */
export const Results = async () => {

    const data = await getStreams();

    return (
        <div className="h-full">
            <h2 className="text-lg font-semibold mb-4">
                Streams we think you will like
            </h2>
            {data.length === 0 && (
                <div className="text-gray-500 text-sm">
                    No streams found
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {data.map((result) => (
                    <ResultCard
                        key={result.id}
                        data={result}
                    />
                ))}
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div className="h-full">
            <Skeleton className="h-8 w-[290px mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {[...Array(4)].map((_, index) => (
                    <ResultCardSkeleton key={index}/>
                ))}
            </div>
        </div>
    )
}