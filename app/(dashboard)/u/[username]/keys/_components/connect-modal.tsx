"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {AlertTriangle} from "lucide-react";
import {useRef, useState, useTransition, ComponentRef} from "react";
import {createIngress} from "@/actions/ingress";
import {toast} from "sonner";
import {IngressInput} from "livekit-server-sdk";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

/**
 * ConnectModal component provides a dialog interface for generating a new streaming connection.
 *
 * This modal allows users to select an ingress type (RTMP or WHIP) and initiate the creation of a new ingress.
 * Upon submission, it triggers the `createIngress` function and displays success or error toasts based on the result.
 * The modal also warns users that generating a new connection will reset all active streams using the current connection.
 *
 * @component
 * @returns {JSX.Element} The rendered ConnectModal dialog component.
 *
 * @example
 * <ConnectModal />
 *
 * @remarks
 * - Uses `useTransition` for handling async submission state.
 * - Uses `useRef` to programmatically close the dialog after successful submission.
 * - Disables controls while the submission is pending.
 */
export const ConnectModal = () => {
    const closeRef = useRef<ComponentRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType)).then(() => {
                toast.success("Ingress created");
                closeRef.current?.click();
            }).catch(() => {
                toast.error("Failed to create ingress");
            });
        });
    }
    return (
        <Dialog modal={false}>
            <DialogTrigger asChild>
                <Button className="dark:bg-[#2D2E32] bg-white">
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Generate Connection
                    </DialogTitle>
                    <DialogDescription>
                        To connect to OBS, you need to enter the server URL and stream key.
                    </DialogDescription>
                </DialogHeader>
                <Select
                    disabled={isPending}
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)} >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#2D2E32]">
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>
                        Warning!
                    </AlertTitle>
                    <AlertDescription>
                        This Action will reset all active streams using the current connection.
                    </AlertDescription>
                </Alert>
                <div className=" flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button className="bg-[#2D2E32] text-white" onClick={onSubmit} disabled={isPending}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}