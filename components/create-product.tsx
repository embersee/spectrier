"use client";

import { onSubmitProduct } from "@/app/dashboard/products/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductForm, productSchema } from "@/types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import Upload from "@/components/upload";
import Image from "next/image";
import Carousel from "./ui/carousel";

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    // defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = (data: ProductForm) => {
    const NewData = {
      ...data,
      imageOne: images.at(0)?.fileUrl,
      imageTwo: images.at(1)?.fileUrl,
      imageThree: images.at(2)?.fileUrl,
      imageFour: images.at(3)?.fileUrl,
      imageFive: images.at(4)?.fileUrl,
    };
    startTransition(() =>
      onSubmitProduct(NewData)
        .then(() => {
          router.refresh();
          router.push("/dashboard/products");
        })
        .then(() => setIsOpen(false))
    );
  };

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      router.back();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить новый товар в магазин</DialogTitle>
          <DialogDescription>
            Картинки будут отображатся в соотношении 3:4
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 justify-center items-center ">
          {images.length <= 0 && <Upload setImages={setImages} />}
          <Carousel show={1} infiniteLoop withIndicator>
            {images.map((img, i) => (
              <Image
                key={i}
                src={img.fileUrl || ""}
                alt={""}
                height={100}
                width={100}
                className="rounded-md object-cover select-none h-[200px] w-[200px]"
                priority
                data-testid={`carousel-item-${i + 1}`}
              />
            ))}
          </Carousel>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 flex-col flex"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название товара</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="до 256 символа" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание товара</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="до 256 символа" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберете категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category, i) => (
                        <SelectItem key={i} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="числовое значение, не меньше 0, без дробей"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дисконт</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="числовое значение, не меньше 0, без дробей"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Кол. на складе</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="числовое значение, не меньше 0, без дробей"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              Если кол. на складе меньше 0 то не будет отображатся в каталоге на
              продажу
            </p>
            <DialogFooter>
              <Button
                type="submit"
                className="self-end mt-8"
                disabled={isPending}
              >
                {isPending ? "Pending" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
