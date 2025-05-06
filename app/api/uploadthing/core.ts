import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {auth} from "@/auth";
import {db} from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const session = await auth();
            if (!session || !session.user || !session.user.id || !session.user.name) {
                throw new UploadThingError("UNAUTHORIZED You must be logged in to upload files");
            }
            return { user: session.user };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await db.stream.update({
                where: { userId: metadata.user.id },
                data: {
                    thumbnailUrl: file.url,
                },
            })

            return { fileUrl: file.url };
        }),
    profileImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const session = await auth();
            if (!session || !session.user || !session.user.id || !session.user.name) {
                throw new UploadThingError("UNAUTHORIZED You must be logged in to upload files");
            }
            return { user: session.user };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await db.user.update({
                where: { id: metadata.user.id },
                data: {
                    image: file.url,
                },
            })

            return { fileUrl: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
