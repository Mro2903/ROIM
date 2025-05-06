"use client";
import {Switch} from "@/components/ui/switch";
import {toast} from "sonner";
import {useTransition} from "react";
import {updateStream} from "@/actions/stream";
import {Skeleton} from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
    field: FieldTypes;
    label: string;
    value: boolean;
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();

    const noChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value }).then(() => {
                toast.success("Chat settings updated");
            }).catch(() => {
                toast.error("Failed to update chat settings");
            });
        });
    }

    return (
        <div className="rounded-xl p-6 bg-[#2D2E32]">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch
                        checked={value} onCheckedChange={noChange} disabled={isPending}>
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}