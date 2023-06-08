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

export default async function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

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
        <div className="grid gap-4 py-4">
          {cart.map((item, i) => (
            <div key={i} className="rounded-md border flex justify-between">
              <h2>{item.name}</h2>
              <h2>{item.quantity}</h2>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
