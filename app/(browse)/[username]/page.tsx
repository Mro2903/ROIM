import {getUserByName} from "@/data/user"
import {notFound} from "next/navigation";
import {isFollowingUser} from "@/lib/follow-service";
import {Actions} from "@/app/(browse)/[username]/_components/actions";
import {isBlockedByUser, isBlockingUser} from "@/lib/block-service";

interface UserPageProps {
    params : { username : string }
}

const UserPage = async ({params}: UserPageProps) => {
    const {username} = await params
    const user = await getUserByName(username)

    if (!user) {
        notFound()
    }

    const isBlocked = await isBlockedByUser(user.id)

    if (isBlocked) {
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)

    const isBlocking = await isBlockingUser(user.id)




    return (
        <div className="flex flex-col gap-y-4">
            <p>
                username: {user.name}
            </p>
            <p>
                user ID: {user.id}
            </p>
            <p>
                is following: {JSON.stringify(isFollowing)}
            </p>
            <p>
                is blocked by this user: {JSON.stringify(isBlocked)}
            </p>
            <Actions isFollowing={isFollowing} isBlocking={isBlocking} userId={user.id}/>
        </div>
    )
}

export default UserPage