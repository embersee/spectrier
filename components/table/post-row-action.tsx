"use client";

import { MoreHorizontal, Pen, PlaneTakeoff, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deletePost, returnPost } from "@/app/dashboard/posts/actions";
import { usePostModal } from "@/lib/store";
import { Post } from "@/lib/db/schema";

export function PostRowActions({
  id,
  active,
  postData,
}: {
  id: number;
  active: boolean;
  postData: Post;
}) {
  const openModal = usePostModal((state) => state.OpenPostModal);
  const setPostData = usePostModal((state) => state.setPostData);

  const sendModal = () => {
    setPostData(postData);
    openModal();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {active ? (
          <>
            {/* <Link href={`/dashboard/posts/send/${id}`}> */}
            <DropdownMenuItem onClick={sendModal}>
              <PlaneTakeoff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Отправить...
            </DropdownMenuItem>
            {/* </Link> */}
            {/* <Link href={`/dashboard/posts/edit/${id}`}>
              <DropdownMenuItem>
                <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Редактировать
              </DropdownMenuItem>
            </Link> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deletePost(id)}>
              <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Спрятать
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => returnPost(id)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Вернуть
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
