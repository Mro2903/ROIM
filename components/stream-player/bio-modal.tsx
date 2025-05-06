"use client";

import {ElementRef, useRef, useState, useTransition} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {updateUser} from "@/actions/user";
import {toast} from "sonner";
import {generateUploadDropzone} from "@uploadthing/react";
import type {OurFileRouter} from "@/app/api/uploadthing/core";
import {useRouter} from "next/navigation";

interface BioModalProps {
    initialValue: string | null;
}

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const BioModal = ({ initialValue }: BioModalProps) => {
    const router = useRouter()
    const closeRef = useRef<ElementRef<'button'>>(null);

    const [isPending, startTransition] = useTransition();
    const [bio, setBio] = useState(initialValue || "");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: bio })
                .then(() => {
                    toast.success("Bio updated successfully");
                    closeRef.current?.click();
                })
                .catch((error) => {
                    toast.error(`Failed to update bio: ${error.message}`);
                });
        })

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition duration-200 ease-in-out">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit User Bio
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Enter your bio here..."
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <div className="rounded-xl border outline-dashed outline-mute">
                        <UploadDropzone
                            endpoint="profileImageUploader"
                            appearance={{
                                label: {
                                    color: "white"
                                },
                                allowedContent: {
                                    color: "white",
                                }
                            }}
                            onClientUploadComplete={() => {
                                router.refresh();
                                closeRef?.current?.click();
                            }}
                        />
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" className="border border-gray-300 bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 rounded-lg shadow-md transition duration-200 ease-in-out">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending}
                                type="submit"
                                className="border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg shadow-md transition duration-200 ease-in-out">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}