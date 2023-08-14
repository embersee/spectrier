"use client";

import { Copy, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "@/lib/db/schema";
import { deleteLink, returnLink } from "@/app/dashboard/links/actions";

export function LinkRowActions({
  id,
  active,
  linkData,
}: {
  id: number;
  active: boolean;
  linkData: Link;
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
        {active ? (
          <>
            {/* https://t.me/spectrierbot?start=test #FIXME: add client-side env for botusername*/}
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://t.me/spectrierbot?start=${linkData.code}`
                );
              }}
            >
              <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Скопировать
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => deleteLink(id)}>
              <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Спрятать
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => returnLink(id)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Вернуть
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
