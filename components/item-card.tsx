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
import { BellRing } from "lucide-react";

import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";

type CardProps = React.ComponentProps<typeof Card>;

export function ItemCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
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
      <CardHeader className="p-2 pb-0">
        <CardTitle>Item 1</CardTitle>
        <CardDescription>desc</CardDescription>
      </CardHeader>
      <CardFooter className="p-2">
        <Button className="w-full">Add</Button>
      </CardFooter>
    </Card>
  );
}
