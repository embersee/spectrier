"use client";

import { useState, useTransition } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import UploadPost from "./upload-post";
import Image from "next/image";
import { Button } from "./ui/button";
import { savePost } from "@/app/dashboard/posts/actions";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [postText, setPostText] = useState("");

  const textLengthLimit = postText.length > 4096;

  const handleSavePost = () => {
    if (textLengthLimit) {
      alert("Текст длинее чем 4096 символов");
      return;
    }

    if (images.length == 0) {
      alert("не подгрузилась картинка, подожди пока загрузиться");
      return;
    }

    startTransition(() => {
      savePost({
        postText,
        postImageURL: images.at(0)?.fileUrl as string,
      }).then(() => router.back());
    });
  };

  return (
    <div className="flex gap-4 ">
      <div className=" w-1/2 bg-slate-800 rounded-xl p-2">
        <h1>Preview post</h1>
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.fileUrl || ""}
            alt={""}
            height={200}
            width={200}
            className="rounded-md object-cover select-none h-full aspect-square"
            priority
          />
        ))}
        {images.length <= 0 && <p>Нету картинки</p>}
        <p>{postText || "Напиши текст"}</p>
      </div>
      <div className="flex flex-col w-full gap-1.5 items-start">
        <Label htmlFor="message">Выложить картинку поста</Label>
        {images.length <= 0 && <UploadPost setImages={setImages} />}
        <Label
          htmlFor="message"
          className={textLengthLimit ? "text-red-500" : ""}
        >
          Текст поста ({postText.length} / 4096)
        </Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          onChange={(e) => setPostText(e.target.value)}
        />

        <Button onClick={handleSavePost} disabled={isPending}>
          {isPending ? "Pending" : "Отправить"}
        </Button>
      </div>
    </div>
  );
}
