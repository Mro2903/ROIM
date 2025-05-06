"use client";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { generateUploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ElementRef, useRef, useState, useTransition} from "react";
import {updateStream} from "@/actions/stream";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Hint} from "@/components/hint";
import {Trash} from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
};

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
}: InfoModalProps) => {
    const router = useRouter()
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onRemove = () => {
        startTransition(() => {
            updateStream({thumbnailUrl: null})
                .then(() => {
                    toast.success("Thumbnail removed successfully")
                    setThumbnailUrl("");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error(`Failed to remove thumbnail`))
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({name: name})
                .then(() => {
                    toast.success("Stream updated successfully")
                    closeRef?.current?.click();
                })
                .catch(() => toast.error(`Failed to update stream`))
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition duration-200 ease-in-out">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder="Stream Name"
                            onChange={onChange}
                            value={name}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove thumbnail" position="left">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image src={thumbnailUrl} alt="Thumbnail" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-mute">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: "white"
                                        },
                                        allowedContent: {
                                            color: "white",
                                        }
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res[0]?.url);
                                        router.refresh();
                                        closeRef?.current?.click();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" className="w-full lg:w-auto h-auto p-2 text-sm font-semibold text-gray-500 bg-white/5 hover:bg-white/10 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition duration-200 ease-in-out">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="w-full lg:w-auto h-auto p-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition duration-200 ease-in-out" disabled={isPending}>
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}