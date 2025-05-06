import {User} from "@prisma/client";
import {getStreamById} from "@/lib/stream-service";
import {ToggleCard} from "@/app/(dashboard)/u/[username]/chat/_components/toggle-card";
import {auth} from "@/auth";

const ChatPage = async () => {
    const session = await auth();
    const user = session?.user as User
    const stream = await getStreamById(user.id)

    if (!stream) {
        throw new Error("Stream not found")
    }

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Chat Settings
                </h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable Chat"
                    value={stream.isChatEnabled}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Enable Delayed Chat"
                    value={stream.isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Followers Only Chat"
                    value={stream.isChatFollowersOnly}
                />
            </div>
        </div>
    );
}

export default ChatPage;