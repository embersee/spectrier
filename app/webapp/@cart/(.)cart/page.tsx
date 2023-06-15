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
import { useEffect, useState, useTransition } from "react";
import CartItem from "@/components/cart-item";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { sendInvoiceToSupport } from "../../actions";
import { NewUser } from "@/lib/db/schema";
import { Loader2 } from "lucide-react";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
      name: (Telegram.WebApp.initDataUnsafe.user?.first_name as string) || "",
      telegramId: Telegram.WebApp.initDataUnsafe.user?.id.toString() as string,
      username: Telegram.WebApp.initDataUnsafe.user?.username as string,
    };

    startTransition(() =>
      sendInvoiceToSupport({ cart, totalSum, comment, address, user }).then(
        () =>
          Telegram.WebApp.showAlert(
            "Ваш заказ был создан! Ожидаете связи консультанта.",
            () => Telegram.WebApp.close()
          )
      )
    );
  };

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px] mt-10 mx-10">
        <div className="grid gap-2 py-4">
          <p className="text-lg font-bold">ВАШ ЗАКАЗ</p>
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <Separator />
          <div className="p-2 h-10 rounded-md flex items-center justify-between">
            <p className=" text-lg">Итог: </p>
            <p>{totalSum} ₽</p>
          </div>
          <Separator />
          <div className="space-y-2 pt-4">
            <Input
              placeholder="Добавьте комментарий..."
              value={comment}
              onChange={(value) =>
                setComment(value.currentTarget.value.replace(/[.,\s]/g, ""))
              }
            />
            <p className="text-sm text-muted-foreground">
              Любые особые пожелания, детали или вопросы.
            </p>
            <Input
              placeholder="Адрес"
              value={address}
              onChange={(value) =>
                setAddress(value.currentTarget.value.replace(/[.,\s]/g, ""))
              }
            />
            <p className="text-sm text-muted-foreground">
              Введите адрес доставки...
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h2>Выбирете метод отплаты: </h2>
          <div className="flex space-x-2 w-full justify-center">
            <Button onClick={submitInvoiceToSupport} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Отправляется...
                </>
              ) : (
                "Через консультанта"
              )}
            </Button>
            <Button disabled>Через телеграмм</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Через консультанта: наш сотрудник свяжеся с вами насчет оплаты
            заказа.
          </p>
          <p className="text-sm text-muted-foreground">
            Через телеграмм: вам бот отправит запрос на платеж.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
