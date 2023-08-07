"use client";

import { MoreHorizontal, Pen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct, returnProduct } from "@/app/dashboard/products/actions";
import Link from "next/link";

export function DataTableRowActions({
  id,
  active,
}: {
  id: number;
  active: boolean;
}) {
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
        <Link href={`/dashboard/products/edit/${id}`}>
          <DropdownMenuItem>
            <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Редактировать
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {active ? (
          <DropdownMenuItem
            onClick={() => deleteProduct(id)}
            className="bg-red-700/70"
          >
            Спрятать
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => returnProduct(id)}>
            Вернуть
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
