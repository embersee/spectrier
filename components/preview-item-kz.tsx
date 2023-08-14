"use client";

import { Product } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/lib/store";
import { storeProduct } from "@/types/products";
import { MinusIcon, PlusIcon, X } from "lucide-react";
import { Badge } from "./ui/badge";
import Carousel from "./ui/carousel";

export default function PreviewItemKZ({
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
    product?.imageFour,
    product?.imageFive,
  ]);

  const cartItem = cart.find((item) => item.id === product?.id);

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[300px] p-2 pt-4 gap-4">
        <div className="pt-6 relative select-none">
          {/* <AspectRatio
            ratio={3 / 4}
            className="bg-muted relative"
            onClick={() => setNext((n) => (n < images.length - 1 ? n + 1 : 0))}
          > */}
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

          <Carousel show={1} infiniteLoop withIndicator>
            {images.map((img, i) => (
              <Image
                key={i}
                src={img || ""}
                alt={product?.name || ""}
                height={300}
                width={300}
                className="rounded-md object-cover select-none h-[350px] w-[350px]"
                priority
                data-testid={`carousel-item-${i + 1}`}
              />
            ))}
          </Carousel>

          <div className=" w-full">
            <div className="flex flex-col p-4 ">
              <div className="flex justify-between text-2xl font-semibold">
                <p>{product?.nameKZ}</p>
                <p>{product?.price} ₸</p>
              </div>
              <DialogDescription className=" text-left">
                {product?.descriptionKZ}
              </DialogDescription>

              <p className="text-sm text-muted-foreground text-left">
                Жалпы кескіндер: {images.length}
              </p>
            </div>
          </div>
          {/* </AspectRatio> */}
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
                Сатып алу
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
