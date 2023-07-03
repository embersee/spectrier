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
import { sendInvoiceToBot, sendInvoiceToSupport } from "../../actions";
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

    let sanitisedComment = comment.replaceAll(".", " ");
    let sanitisedAddress = address.replaceAll(".", " ");

    startTransition(() =>
      sendInvoiceToSupport({
        cart,
        totalSum,
        comment: sanitisedComment,
        address: sanitisedAddress,
        user,
      }).then(() =>
        Telegram.WebApp.showAlert(
          "Сіздің тапсырысыңыз жасалды! Кеңесшінің байланысын күтуде.",
          () => Telegram.WebApp.close()
        )
      )
    );
  };

  const submitInvoiceToBot = () => {
    const user: NewUser = {
      name: (Telegram.WebApp.initDataUnsafe.user?.first_name as string) || "",
      telegramId: Telegram.WebApp.initDataUnsafe.user?.id.toString() as string,
      username: Telegram.WebApp.initDataUnsafe.user?.username as string,
    };

    let sanitisedComment = comment.replaceAll(".", " ");
    let sanitisedAddress = address.replaceAll(".", " ");

    startTransition(() => {
      sendInvoiceToBot({
        cart,
        totalSum,
        comment: sanitisedComment,
        address: sanitisedAddress,
        user,
      }).then(() =>
        Telegram.WebApp.showAlert("Сіздің тапсырысыңыз жасалды!", () =>
          Telegram.WebApp.close()
        )
      );
    });
  };

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px] mt-10 mx-10">
        <div className="grid gap-2 py-4">
          <p className="text-lg font-bold">СІЗДІҢ ТАПСЫРЫСЫҢЫЗ</p>
          {cart.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <Separator />
          <div className="p-2 h-10 rounded-md flex items-center justify-between">
            <p className=" text-lg">Нәтиже: </p>
            <p>{totalSum} ₸</p>
          </div>
          <Separator />
          <div className="space-y-2 pt-4">
            <Input
              placeholder="Пікір қосу..."
              value={comment}
              onChange={(value) => setComment(value.currentTarget.value)}
            />
            <p className="text-sm text-muted-foreground">
              Кез келген арнайы сұраулар, мәліметтер немесе сұрақтар.
            </p>
            <Input
              placeholder="Мекенжай"
              value={address}
              onChange={(value) => setAddress(value.currentTarget.value)}
            />
            <p className="text-sm text-muted-foreground">
              Жеткізу мекенжайын енгізіңіз...
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h2>Төлем әдісін таңдаңыз:</h2>
          <div className="flex space-x-2 w-full justify-center">
            <Button onClick={submitInvoiceToSupport} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Жүру...
                </>
              ) : (
                "кеңесші"
              )}
            </Button>
            <Button onClick={submitInvoiceToBot} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Жүру...
                </>
              ) : (
                "телеграмма арқылы"
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Кеңесші арқылы: біздің қызметкер тапсырыс үшін төлем туралы сізбен
            хабарласады.
          </p>
          <p className="text-sm text-muted-foreground">
            Telegram арқылы: бот сізге төлем сұрауын жібереді.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
