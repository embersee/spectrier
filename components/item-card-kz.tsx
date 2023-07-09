import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Products } from "@/types/products";
import { useCartStore } from "@/lib/store";
import { Badge } from "./ui/badge";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

export function ItemCardKZ({
  className,
  product,
}: {
  className?: CardProps;
  product: Products;
}) {
  const [effect, setEffect] = useState(false);

  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <Card className={cn("w-full relative", className)}>
      <CardContent
        className="grid gap-4 p-2"
        onClick={() => router.push(`/kz/webapp/preview/${product.id}`)}
      >
        {cartItem && (
          <Badge
            className={`${
              effect && "animate-in zoom-in-110"
            } absolute top-0 right-0 z-50 text-lg shadow-2xl`}
            onAnimationEnd={() => setEffect(false)}
          >
            {cartItem.quantity}
          </Badge>
        )}
        <AspectRatio ratio={3 / 4}>
          <Image
            src={
              product.imageOne.length > 0
                ? product.imageOne
                : `https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=80&dpr=2&q=20`
            }
            alt={product.name}
            fill
            className="rounded-md object-cover"
            priority
          />
        </AspectRatio>
      </CardContent>
      <CardHeader className="p-2 pb-0 flex">
        <CardTitle>{product.name}</CardTitle>
        <h3>{product.price} ₸</h3>
      </CardHeader>
      <CardFooter className="p-2 space-x-2">
        {cart.some((value) => value.id == product.id) ? (
          <>
            <Button
              className="w-full"
              onClick={() => {
                setEffect(true);
                removeFromCart(product);
              }}
            >
              <MinusIcon />
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setEffect(true);
                addToCart(product);
              }}
            >
              <PlusIcon />
            </Button>
          </>
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              addToCart(product);
            }}
          >
            Сатып алу
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
