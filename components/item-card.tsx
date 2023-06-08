import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Products } from "@/types/products";
import { useCartStore } from "@/lib/store";

type CardProps = React.ComponentProps<typeof Card>;

export function ItemCard({
  className,
  product,
}: {
  className?: CardProps;
  product: Products;
}) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="grid gap-4 p-2">
        <AspectRatio ratio={3 / 4} className="bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardHeader className="p-2 pb-0 flex">
        <CardTitle>{product.name}</CardTitle>
        <h3>${product.price}</h3>
      </CardHeader>
      <CardFooter className="p-2">
        <Button
          className="w-full"
          onClick={() => {
            console.log("click");
            addToCart(product);
          }}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
