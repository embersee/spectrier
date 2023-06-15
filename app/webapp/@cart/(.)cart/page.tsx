"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItem from "@/app/webapp/cart-item";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { sendInvoiceToSupport } from "../../actions";
import { NewUser } from "@/lib/db/schema";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const [comment, setComment] = useState("");
  const [address, setAddress] = useState("");

  const totalSum = cart
    .map((p) => p.price * (p.quantity as number))
    .reduce((next, prev) => next + prev);

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

  const submitInvoiceToSupport = () => {
    const user: NewUser = {
      name: Telegram.WebApp.initDataUnsafe.user?.first_name as string,
      telegramId: Telegram.WebApp.initDataUnsafe.user?.id.toString() as string,
      username: Telegram.WebApp.initDataUnsafe.user?.username as string,
    };

    sendInvoiceToSupport({ cart, totalSum, comment, address, user }).then(() =>
      Telegram.WebApp.close()
    );
  };

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px] mt-10 mx-10">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            To make changes to your cart click back to the store!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <p className="text-lg font-bold">YOUR ORDER</p>
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <Separator />
          <div className="p-2 h-10 rounded-md flex items-center justify-between">
            <p className=" text-lg">Total: </p>
            <p>${totalSum}</p>
          </div>
          <Separator />
          <Input
            placeholder="Add comment..."
            value={comment}
            onChange={(value) => setComment(value.currentTarget.value)}
          />
          <p className="text-sm text-muted-foreground">
            Any special requests, details etc.
          </p>
          <Input
            placeholder="Address"
            value={address}
            onChange={(value) => setAddress(value.currentTarget.value)}
          />
          <p className="text-sm text-muted-foreground">
            Введите адрес доставки...
          </p>
        </div>
        <div className="space-y-2">
          <h2>Выбирете метод отплаты: </h2>
          <div className="flex space-x-2 w-full">
            <Button onClick={submitInvoiceToSupport}>Через сотрудника</Button>
            <Button disabled>Через телеграмм</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Через сотрудника: наш сотрудник свяжеся с вами насчет оплаты заказа.
          </p>
          <p className="text-sm text-muted-foreground">
            Через телеграмм: вам бот отправит запрос на платеж.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
