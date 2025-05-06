import {UrlCard} from "@/app/(dashboard)/u/[username]/keys/_components/url-card";
import {getStreamById} from "@/lib/stream-service";
import {User} from "@prisma/client";
import {KeyCard} from "@/app/(dashboard)/u/[username]/keys/_components/key-card";
import {ConnectModal} from "@/app/(dashboard)/u/[username]/keys/_components/connect-modal";
import {auth} from "@/auth";

const KeysPage = async () => {
    const session =  await auth();
    const user = session?.user as User
    const stream = await getStreamById(user.id)

    if (!stream) {
        throw new Error("Stream not found")
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-center mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.severUrl} />
                <KeyCard value={stream.streamKey} />
            </div>
        </div>
    );
}

export default KeysPage;