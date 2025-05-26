import {auth} from "@/auth";
import {getUserByName} from "@/data/user";
import {StreamPlayer} from "@/components/stream-player";
import {getStreamById} from "@/lib/stream-service";

/**
 * Renders the creator's dashboard page for a given username.
 * 
 * This async component fetches the user and stream data based on the provided username parameter.
 * It ensures that the user exists and that the currently authenticated user matches the requested user.
 * If the user or stream is not found, or if the authenticated user does not match, an error is thrown.
 * 
 * @param params - A promise resolving to an object containing the `username` string.
 * @returns A React element displaying the stream player for the authenticated creator.
 * @throws Error if the user is not found or if the authenticated user is not authorized.
 */
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