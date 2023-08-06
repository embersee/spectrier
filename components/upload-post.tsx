"use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { Dispatch, SetStateAction } from "react";

type UploadProps = {
  setImages: Dispatch<
    SetStateAction<
      {
        fileUrl: string;
        fileKey: string;
      }[]
    >
  >;
};

export default function UploadPost({ setImages }: UploadProps) {
  return (
    <UploadButton<OurFileRouter>
      endpoint="PostImages"
      onClientUploadComplete={(res) => {
        // Do something with the response
        // console.log("Files: ", res);
        // alert("Upload Completed");
        setImages(res || []);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
