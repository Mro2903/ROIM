"use server";

import {
    CreateIngressOptions,
    IngressAudioEncodingPreset, IngressClient,
    IngressInput, IngressVideoEncodingPreset,
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

export const resetIngress = async (hostId: string) => {
    const  ingresses = await ingressClient.listIngress({
        roomName: hostId,
    });

    const rooms = await roomService.listRooms([hostId]);
    for (const room of rooms) {
        await roomService.deleteRoom(room.sid);
    }
    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
}

export const createIngress = async (ingressType: IngressInput) => {
    const session = await auth();
    const user = session?.user as User;

    await resetIngress(user.id);

    const options: CreateIngressOptions = {
        name: user.name,
        roomName: user.id,
        participantName: user.name,
        participantIdentity: user.id,
    }

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.enableTranscoding = true;
    } else {
        options.video = {
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            }
        }
        options.audio = {
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
            },
        }
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