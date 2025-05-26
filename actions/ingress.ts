"use server";

import {
    CreateIngressOptions,
    IngressAudioEncodingPreset, IngressAudioOptions, IngressClient,
    IngressInput, IngressVideoEncodingPreset, IngressVideoOptions,
    RoomServiceClient,
    TrackSource,
} from "livekit-server-sdk"
import {User} from "@prisma/client";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";


const roomService = new RoomServiceClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_URL!);

/**
 * Resets all ingress and room resources associated with a given host ID.
 *
 * This function performs the following steps:
 * 1. Retrieves all ingress resources associated with the specified `hostId`.
 * 2. Retrieves all rooms associated with the specified `hostId`.
 * 3. Deletes each room found.
 * 4. Deletes each ingress resource found (if it has an `ingressId`).
 *
 * @param hostId - The unique identifier for the host whose ingress and rooms should be reset.
 * @returns A promise that resolves when all associated ingress and room resources have been deleted.
 */
export const createIngress = async (ingressType: IngressInput) => {
    const session = await auth();
    const user = session?.user as User;

    await resetIngress(user.id);

    const options: CreateIngressOptions = {
        name: user.name,
        roomName: user.id,
        participantName: user.name,
        participantIdentity: user.id,
        enableTranscoding: ingressType === IngressInput.WHIP_INPUT,
        video: ingressType === IngressInput.WHIP_INPUT? new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            },
        }) : undefined,
        audio: ingressType === IngressInput.WHIP_INPUT ? new IngressAudioOptions({
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
            },
        }) : undefined,
    }

    const ingress = await ingressClient.createIngress(
        ingressType, options
    );

    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed to create ingress");
    }

    await db.stream.update({
        where: { userId: user.id },
        data: {
            ingressId: ingress.ingressId,
            severUrl: ingress.url,
            streamKey: ingress.streamKey,
        }
    });

    revalidatePath(`/u/${user.name}/keys`);
    return ingress.ingressId;
}