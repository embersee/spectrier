"use client";

import { Product } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/lib/store";
import { storeProduct } from "@/types/products";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import { Badge } from "./ui/badge";

export default function PreviewItem({
  product,
}: {
  product: Product | undefined;
}) {
  const router = useRouter();

  const [effect, setEffect] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(() => router.back());

    Telegram.WebApp.MainButton.hide();
  }, [router]);

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  function filterNullValues<T>(array: (T | null)[]): T[] {
    return array.filter((item) => item !== null) as T[];
  }

  const images = filterNullValues([
    product?.imageOne,
    product?.imageTwo,
    product?.imageThree,
  ]);
  const [next, setNext] = useState(0);

  const cartItem = cart.find((item) => item.id === product?.id);

  // TODO: OPTIMIZE IMAGES BY PRELOADING THEM ALL

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[300px] p-2 pt-4 gap-4">
        <div className="pt-6 relative select-none">
          <AspectRatio
            ratio={3 / 4}
            className="bg-muted relative"
            onClick={() => setNext((n) => (n < images.length - 1 ? n + 1 : 0))}
          >
            {cartItem && (
              <Badge
                className={`${
                  effect && "animate-in zoom-in-110"
                } absolute top-0 right-0 z-50 text-lg shadow-2xl`}
                onAnimationEnd={() => setEffect(false)}
              >
                В корзине: {cartItem.quantity}
              </Badge>
            )}
            <Image
              src={images.at(next) || ""}
              alt={product?.name || ""}
              fill
              className="rounded-md object-cover select-none"
              priority
            />

            <div className="absolute bottom-0 z-50 w-full pt-10 bg-gradient-to-t from-black">
              <div className="flex flex-col justify-end mt-10 bg-gradient-to-t p-4 from-black">
                <div className="flex justify-between text-2xl font-semibold">
                  <p>{product?.name}</p>
                  <p>{product?.price} ₸</p>
                </div>
                <DialogDescription className=" text-left">
                  {product?.description}
                </DialogDescription>
                {/* <p className=" text-left">
                  Осталось на складе: {product?.stock}
                </p> */}

                <p className="text-sm text-muted-foreground text-left">
                  Всего изображений: {images.length}
                </p>
                <p className="text-sm text-muted-foreground text-left">
                  Нажмите на изображение чтобы листать их
                </p>
              </div>
            </div>
          </AspectRatio>
          <div className="my-2 flex justify-center space-x-2">
            <Button variant="destructive" onClick={() => router.back()}>
              <X />
            </Button>
            {cart.some((value) => value.id == product?.id) ? (
              <>
                <Button
                  className="w-full"
                  onClick={() => {
                    setEffect(true);
                    removeFromCart(product as storeProduct);
                  }}
                >
                  <MinusIcon />
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setEffect(true);
                    addToCart(product as storeProduct);
                  }}
                >
                  <PlusIcon />
                </Button>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={() => {
                  addToCart(product as storeProduct);
                }}
              >
                Добавить в корзину
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
