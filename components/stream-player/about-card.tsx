"use client";

import {VerifiedMark} from "@/components/verified-mark";
import {BioModal} from "@/components/stream-player/bio-modal";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
}
/**
 * Renders an about card for a stream host, displaying their name, verification mark,
 * follower count, and bio. If the current viewer is the host, allows editing the bio via a modal.
 *
 * @param hostName - The display name of the host.
 * @param hostIdentity - The unique identity string of the host.
 * @param viewerIdentity - The unique identity string of the current viewer.
 * @param bio - The biography text of the host, or null if not set.
 * @param followedByCount - The number of followers the host has.
 *
 * @returns A React component displaying the host's about information.
 */
export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount,
}: AboutCardProps) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = hostAsViewer === viewerIdentity;

    const followedByLabel = followedByCount === 1 ? "follower" : "followers";

    return (
        <div className="px-4">
            <div className="rounded-xl bg-white/5 shadow-md group p-6 lg:p-10 flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                        About {hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && (
                        <BioModal initialValue={bio} />
                    )}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-semibold text-white">
                        {followedByCount}
                    </span> {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio || "This user has not set a bio yet."}
                </p>
            </div>
        </div>
    );
}