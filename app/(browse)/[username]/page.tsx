import {getUserByName} from "@/data/user"
import {notFound} from "next/navigation";
import {isFollowingUser} from "@/lib/follow-service";
import {isBlockedByUser} from "@/lib/block-service";
import {StreamPlayer} from "@/components/stream-player";
import {getStreamById} from "@/lib/stream-service";

interface UserPageProps {
    params : { username : string }
}

const UserPage = async ({params}: UserPageProps) => {
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