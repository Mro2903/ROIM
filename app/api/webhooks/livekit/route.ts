import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

/**
 * Handles POST requests for the LiveKit webhook endpoint.
 *
 * This function processes incoming webhook events from LiveKit, verifies the authorization header,
 * and updates the stream status in the database based on the event type.
 *
 * - If the "Authorization" header is missing, responds with 401 Unauthorized.
 * - Processes the webhook event using the `receiver.receive` method.
 * - If the event is "ingress_started", sets the stream's `isLive` status to `true`.
 * - If the event is "ingress_ended", sets the stream's `isLive` status to `false`.
 * - Returns 200 OK on success, 400 on webhook processing error, or 500 on server error.
 *
 * @param req - The incoming Next.js request object.
 * @returns A `NextResponse` indicating the result of the webhook processing.
 */
export async function POST(req: NextRequest) {
    try {
        // Get the raw body as text
        const body = await req.text();
        const authorization = req.headers.get("Authorization");

        if (!authorization) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        try {
            // Process with the receiver - remove the third parameter
            const event = await receiver.receive(body, authorization);

            if (event.event === "ingress_started") {
                await db.stream.update({
                    where: {
                        ingressId: event.ingressInfo?.ingressId,
                    },
                    data: {
                        isLive: true,
                    },
                });
            }

            if (event.event === "ingress_ended") {
                await db.stream.update({
                    where: {
                        ingressId: event.ingressInfo?.ingressId,
                    },
                    data: {
                        isLive: false,
                    },
                });
            }

            return new NextResponse("OK", { status: 200 });
        } catch (error) {
            console.error("Error processing webhook:", error);
            return new NextResponse(`Webhook processing error: ${error}`, { status: 400 });
        }
    } catch (error) {
        console.error("Server error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}