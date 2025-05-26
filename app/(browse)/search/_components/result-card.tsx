import {User} from "@prisma/client";
import Link from "next/link";
import {Thumbnail, ThumbnailSkeleton} from "@/components/thumbnail";
import {VerifiedMark} from "@/components/verified-mark";
import {formatDistanceToNow} from "date-fns";
import {Skeleton} from "@/components/ui/skeleton";

interface ResultCardProps {
    data: {
        user: User,
        id: string,
        name: string,
        isLive: boolean,
        thumbnailUrl: string | null,
        updatedAt: Date,
    }
}

/**
 * Renders a card displaying the result information for a user.
 *
 * @param data - The result data containing user and stream information.
 * @returns A React component displaying the user's thumbnail, name, verification mark, stream name, and last updated time.
 */
export const ResultCard = ({data}: ResultCardProps) => {
    return (
        <Link href={`/${data.user.name}`}>
            <div className="w-full flex gap-x-4">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail src={data.thumbnailUrl} fallback={data.user.image} isLive={data.isLive} username={data.user.name} />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                            {data.user.name}
                        </p>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm text-gray-500">{data.name}</p>
                    <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}