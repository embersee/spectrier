import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  ProductImages: f({ image: { maxFileSize: "2MB", maxFileCount: 5 } })
    // .middleware((req) => auth(req))

    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata);
      console.log("file url", file.url);
    }),
  PostImages: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    // .middleware((req) => auth(req))

    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
