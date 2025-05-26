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

/**
 * A card component that displays a toggle switch for updating a specific chat setting.
 *
 * @param field - The key of the setting to update.
 * @param label - The label to display for the setting.
 * @param value - The current value of the setting (on/off).
 *
 * Renders a styled card with a label and a toggle switch. When the switch is toggled,
 * it triggers an asynchronous update of the setting and displays a toast notification
 * indicating success or failure. The switch is disabled while the update is pending.
 */
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
        <div className="rounded-xl p-6 dark:bg-[#2D2E32] bg-white">
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