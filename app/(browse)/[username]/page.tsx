import {getUserByName} from "@/data/user"
import {notFound} from "next/navigation";
import {isFollowingUser} from "@/lib/follow-service";
import {isBlockedByUser} from "@/lib/block-service";
import {StreamPlayer} from "@/components/stream-player";
import {getStreamById} from "@/lib/stream-service";

/**
 * Async React component for displaying a user's stream page.
 *
 * Fetches user data by username, retrieves the associated stream,
 * and checks if the current user is following or blocked by the user.
 * If the user or stream is not found, or if the current user is blocked,
 * the page will render a 404 (not found).
 *
 * @param params - A promise resolving to an object containing the `username` parameter from the route.
 * @returns The user's stream player component if found and accessible.
 */
const UserPage = async ({ params,}: { params: Promise<{ username: string }>}) => {
    const {username} =  await params;
    const user = await getUserByName(username);
    if (!user) {
        notFound();
    }
    const stream = await getStreamById(user.id);

    if (!user || !stream) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

    return (
        <StreamPlayer user={user} stream={stream} isFollowing={isFollowing} />
    )
}

export default UserPage