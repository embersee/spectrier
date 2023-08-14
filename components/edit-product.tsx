"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ProductFormUpdate, productSchema } from "@/types/form-schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/dashboard/products/actions";
import { Category, Product } from "@/lib/db/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";
import Image from "next/image";
import Carousel from "./ui/carousel";
import { AspectRatio } from "./ui/aspect-ratio";

export default function EditForm({
  defaultValues,
  categories,
}: {
  defaultValues: (Product & Category) | undefined;
  categories: Category[];
}) {
  const form = useForm<ProductFormUpdate>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...defaultValues,
      category: categories
        .find((c) => c.id == defaultValues?.categoryID)
        ?.id.toString(),
    },
    mode: "onBlur",
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = (data: ProductFormUpdate) => {
    if (!defaultValues) return;
    data.id = defaultValues.id as number;
    data.imageOne = defaultValues.imageOne;
    data.imageTwo = defaultValues.imageTwo;
    data.imageThree = defaultValues.imageThree;
    data.imageFour = defaultValues.imageFour;
    data.imageFive = defaultValues.imageFive;

    startTransition(() =>
      updateProduct(data)
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

  function filterNullValues<T>(array: (T | null)[]): T[] {
    return array.filter((item) => item !== null) as T[];
  }

  const images = filterNullValues([
    defaultValues?.imageOne,
    defaultValues?.imageTwo,
    defaultValues?.imageThree,
    defaultValues?.imageFour,
    defaultValues?.imageFive,
  ]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать товар</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="">
          <div className="flex justify-center items-center p-4">
            {/* {images.length <= 0 && <Upload setImages={setImages} />} */}

            <div>
              <Carousel show={1} infiniteLoop withIndicator>
                {images.map((img, i) => (
                  <Image
                    key={i}
                    src={img || ""}
                    alt={""}
                    height={300}
                    width={300}
                    className="rounded-md object-contain select-none h-[300px] "
                    priority
                    data-testid={`carousel-item-${i + 1}`}
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 flex-col flex"
            >
              {/* <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>id</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
                name="nameKZ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название товара KZ</FormLabel>
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
                name="descriptionKZ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание товара KZ</FormLabel>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={defaultValues?.categoryID?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберете..." />
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
                        placeholder="числовое значение, не меньше 1, без дробей"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm text-muted-foreground">
                Если кол. на складе меньше 0 то не будет отображатся в каталоге
                на продажу
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
