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