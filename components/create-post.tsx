"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import UploadPost from "./upload-post";
import Image from "next/image";
import { Button } from "./ui/button";

export default function CreatePost() {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const [postText, setPostText] = useState("");

  const textLengthLimit = postText.length > 4096;

  return (
    <div className="flex gap-4 ">
      <div className=" w-1/2 bg-slate-800 rounded-xl">
        <h1> Preview post</h1>
        {images.map((img, i) => (
          <Image
            key={i}
            src={img.fileUrl || ""}
            alt={""}
            height={100}
            width={100}
            className="rounded-md object-cover select-none h-[200px]"
            priority
            data-testid={`carousel-item-${i + 1}`}
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

        <Button>Сохранить Пост</Button>
      </div>
    </div>
  );
}
