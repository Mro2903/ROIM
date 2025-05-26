"use server";

import { v4 } from "uuid";
import  {AccessToken} from "livekit-server-sdk";
import {getUserById} from "@/data/user";
import {auth} from "@/auth";
import {isBlockedByUser} from "@/lib/block-service";

/**
 * Generates a LiveKit access token for a viewer attempting to join a host's room.
 *
 * - If the user is authenticated, uses their session information.
 * - If not authenticated, generates a guest identity.
 * - Verifies the host exists and that the viewer is not blocked by the host.
 * - Assigns the "host" identity if the viewer is the host.
 * - Grants permission to join the room and publish data, but not to publish media.
 *
 * @param hostIdentity - The unique identifier of the host user whose room is being joined.
 * @returns A promise that resolves to a JWT access token string for LiveKit.
 * @throws If the host is not found or the viewer is blocked by the host.
 */
export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        const session = await auth()
        if (!session || !session.user || !session.user.id || !session.user.name) {
            throw new Error("Unauthorized");
        }
        self = {id: session.user.id, user: session.user.name}
    } catch {
        const id = v4();
        const user = `guest#${Math.floor(Math.random() * 100000)}`;
        self = {id, user};
    }

    const host = await getUserById(hostIdentity);
    if (!host) {
        throw new Error("Host not found");
    }

    const isBlocked = await isBlockedByUser(host.id);
    if (isBlocked) {
        throw new Error("You are blocked by this user");
    }

    const isHost = self.id === host.id;
    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.user,
        }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    });
    return await Promise.resolve(token.toJwt());
};