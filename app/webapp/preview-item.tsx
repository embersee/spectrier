"use client";

import { Product } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";

export default function PreviewItem({
  product,
}: {
  product: Product | undefined;
}) {
  const router = useRouter();

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(() => router.back());

    Telegram.WebApp.MainButton.hide();
  }, []);

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  if (product === undefined) return <p>error</p>;

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px] mx-10">
        <div className="grid gap-2 py-4">
          <AspectRatio ratio={3 / 4} className="bg-muted">
            <Image
              src={product.imageOne}
              alt={product.name}
              fill
              className="rounded-md object-cover"
              blurDataURL="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=80&dpr=2&q=20"
            />
          </AspectRatio>
        </div>
        <DialogHeader>
          <DialogTitle className="flex justify-between text-2xl">
            <p>{product?.name}</p>
            <p>₽{product?.price}</p>
          </DialogTitle>
          <DialogDescription className=" text-left">
            {product?.description}
          </DialogDescription>
          <p className=" text-left">Осталось на складе: {product.stock}</p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
