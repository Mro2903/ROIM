/**
 * Thumbnail component for displaying user content previews.
 * Supports both image thumbnails and fallback avatar displays.
 * Includes live streaming indicator and hover effects.
 */

import {UserAvatar} from "@/components/ui/user-avatar";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import {LiveBadge} from "@/components/ui/live-badge";

/**
 * Props for the Thumbnail component
 * @interface ThumbnailProps
 * @property {string|null} src - URL of the thumbnail image, null if using fallback
 * @property {string} fallback - URL of the fallback avatar image
 * @property {boolean} isLive - Whether the content is currently live streaming
 * @property {string} username - Username of the content creator
 */
interface ThumbnailProps {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
}

/**
 * Thumbnail component that displays either an image or a fallback avatar
 * with live streaming indicator and hover effects
 * @param {ThumbnailProps} props - Component props
 * @returns {JSX.Element} Rendered thumbnail component
 */
export const Thumbnail = ({src, fallback, isLive, username}: ThumbnailProps) => {
    let content;

    if (!src) {
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
                <UserAvatar
                    size="lg"
                    showBadge
                    username={username}
                    image={fallback}
                    isLive={isLive}
                />
            </div>
        )
    } else {
        content = (
            <Image src={src} alt="Thumbnail" fill className="rounded-md object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
        )
    }

    return (
        <div className="group aspect-video relative rounded-md cursor-pointer">
            <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                {content}
            {isLive && src && (
                <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}

/**
 * Loading skeleton component for the thumbnail
 * @returns {JSX.Element} Rendered skeleton component
 */
export const ThumbnailSkeleton = () => {
    return (
        <div className="group aspect-video relative rounded-xl cursor-pointer">
            <Skeleton className="w-full h-full" />
        </div>
    )
}