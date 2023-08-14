"use client";

import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useLinkModal } from "@/lib/store";

import { useForm } from "react-hook-form";
import { LinkForm, linkSchema } from "@/types/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { onCreateLink } from "@/app/dashboard/links/actions";
import { useRouter } from "next/navigation";

export default function CreateLinkModal() {
  const router = useRouter();

  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
    // defaultValues,
    mode: "onBlur",
  });

  const [isPending, startTransition] = useTransition();
  const { isLinkOpen, OpenLinkModal, linkData } = useLinkModal();

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      OpenLinkModal();
    }
  };

  const onSubmit = (data: LinkForm) => {
    console.log(data);

    startTransition(() =>
      onCreateLink(data)
        .then(() => {
          router.refresh();
        })
        .then(() => OpenLinkModal())
    );
  };

  return (
    <Dialog open={isLinkOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сгенерировать ссылку...</DialogTitle>
          <DialogDescription>описание</DialogDescription>
        </DialogHeader>

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
                  <FormLabel>Название ссылки</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="до 256 символа" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Код ссылки</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="до 256 символа" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="self-end mt-8"
                disabled={isPending}
              >
                {isPending ? "Pending" : "Создать"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
