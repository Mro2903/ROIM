import {User} from "@prisma/client";
import Link from "next/link";
import {Thumbnail, ThumbnailSkeleton} from "@/components/thumbnail";
import {UserAvatar, UserAvatarSkeleton} from "@/components/ui/user-avatar";
import {Skeleton} from "@/components/ui/skeleton";

interface ResultCardProps {
    data: {
        id: string,
        user: User,
        isLive: boolean,
        name: string,
        thumbnailUrl: string | null,
    }
}

/**
 * Renders a card displaying the result information, including a thumbnail,
 * user avatar, and user details. The card links to the user's page.
 *
 * @param data - The result data containing information about the user, thumbnail, and live status.
 * @returns A JSX element representing the result card.
 */
export const ResultCard = ({data}: ResultCardProps) => {
    return (
        <Link href={`/${data.user.name}`}>
            <div className="h-full w-full space-y-4">
                <Thumbnail
                    src={data.thumbnailUrl}
                    fallback={data.user.image}
                    isLive={data.isLive}
                    username={data.user.name}
                />
                <UserAvatar username={data.user.name} image={data.user.image} isLive={data.isLive}/>
                <div className="flex flex-col text-sm overflow-hidden">
                    <p className="truncate font-semibold hover:text-blue-600">
                        {data.name}
                    </p>
                    <p className="text-gray-500">
                        {data.user.name}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    )
}