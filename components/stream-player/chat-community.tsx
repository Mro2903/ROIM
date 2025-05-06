"use client";

import {useParticipants} from "@livekit/components-react";
import {useMemo, useState} from "react";
import {useDebounceValue} from "usehooks-ts";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CommunityItem} from "@/components/stream-player/community-item";
import {LocalParticipant, RemoteParticipant} from "livekit-client";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export const ChatCommunity = ({
    hostName,
    viewerName,
    isHidden
}: ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    }

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);
        return deduped.filter((p) => {
            return p.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        });
    }, [participants, debouncedValue]);


    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-gray-500 text-sm">
                    Community is disabled
                </p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input
                onChange={event => onChange(event.target.value)}
                placeholder={"Search Community..."}
                className="border-white/10"
            />
            <ScrollArea className="gap-y-4 mt-4">
                <p className="text-center text-sm text-gray-500 hidden last:block p-2">
                    No results
                </p>
                {filteredParticipants.map((p) => (
                    <CommunityItem
                        key={p.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={p.name}
                        participantIdentity={p.identity} />
                ))}
            </ScrollArea>
        </div>
    )
}