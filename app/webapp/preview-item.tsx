"use client";

import { Product } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

  function filterNullValues<T>(array: (T | null)[]): T[] {
    return array.filter((item) => item !== null) as T[];
  }

  const images = filterNullValues([
    product.imageOne,
    product.imageTwo,
    product.imageThree,
  ]);
  const [next, setNext] = useState(0);

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[300px] p-2 pt-4 gap-4">
        <div
          className="pt-6 relative"
          onClick={() => setNext((n) => (n < images.length - 1 ? n + 1 : 0))}
        >
          <AspectRatio ratio={3 / 4} className="bg-muted relative ">
            <Image
              src={images.at(next) || ""}
              alt={product.name}
              fill
              className="rounded-md object-cover select-none"
              blurDataURL="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=80&dpr=2&q=20"
            />
            {/* <Badge className="absolute bottom-0 z-50 text-lg shadow-2xl">
              Изображение {next + 1}
            </Badge> */}
            <div className="absolute bottom-0 z-50 w-full pt-10 mx-4 bg-gradient-to-t from-black">
              <div className="flex flex-col justify-end mt-10 bg-gradient-to-t p-4 from-black">
                <div className="flex justify-between text-2xl">
                  <p>{product?.name}</p>
                  <p>₽{product?.price}</p>
                </div>
                <DialogDescription className=" text-left">
                  {product?.description}
                </DialogDescription>
                <p className=" text-left">
                  Осталось на складе: {product.stock}
                </p>

                <p className="text-sm text-muted-foreground text-left">
                  Всего изображений: {images.length}
                </p>
                <p className="text-sm text-muted-foreground text-left">
                  Нажмите на изображение чтобы листать их
                </p>
              </div>
            </div>
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
}
