import {auth} from "@/auth";
import {getUserByName} from "@/data/user";
import {StreamPlayer} from "@/components/stream-player";
import {getStreamById} from "@/lib/stream-service";

const CreatorPage = async ({ params,}: { params: Promise<{ username: string }>}) => {
    const {username} = await params
    const session = await auth();
    const externalUser = session?.user;
    const user = await getUserByName(username);
    if (!user) {
        throw new Error("User not found");
    }
    const stream = await getStreamById(user.id);
    if (!user || !stream || externalUser?.id !== user.id) {
        throw new Error("Unauthorized");
    }
    return (
        <div className="h-full ">
            <StreamPlayer
                user={user}
                stream={stream}
                isFollowing
            />
        </div>
    )
}

export default CreatorPage