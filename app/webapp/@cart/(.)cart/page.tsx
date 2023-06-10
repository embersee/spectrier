"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CartItem from "@/app/webapp/cart-item";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.BackButton.show();
    Telegram.WebApp.BackButton.onClick(() => router.back());
  }, []);

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            To make changes to your cart click back to the store!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <p className="text-lg font-bold">YOUR ORDER</p>
          {cart.map((item) => (
            <CartItem {...item} />
          ))}
          <Separator />
          <div className="p-2 h-10 rounded-md flex items-center justify-between">
            <p className=" text-lg">Total: </p>
            <p>
              $
              {cart
                .map((p) => p.price * (p.quantity as number))
                .reduce((next, prev) => next + prev)}
            </p>
          </div>
          <Separator />
          <Input placeholder="Add comment..." />
          <p className="text-sm text-muted-foreground">
            Any special requests, details etc.
          </p>
        </div>
        <DialogFooter>
          <Button type="submit">Purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
