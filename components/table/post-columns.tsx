"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/column-header";

import { DataTableRowActions } from "./row-action";
import { Badge } from "../ui/badge";
import { Orders } from "@/types/orders";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Post } from "@/lib/db/schema";
import { PostRowActions } from "./post-row-action";

export const postColumns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className=" truncate font-medium">{row.original.id}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Создан" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {new Date(row.original.createdAt as string).toLocaleDateString(
              "ru-RU"
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "postText",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Текст" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.postText}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "postImageURL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Картинка" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            <a
              href={row.original.postImageURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть
            </a>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "sent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Отправилено?" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.sent ? (
              <Badge className="bg-green-500">Да</Badge>
            ) : (
              <Badge className="bg-red-500">Нет</Badge>
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Активность" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.active ? (
              <Badge className="bg-green-500">Да</Badge>
            ) : (
              <Badge className="bg-red-500">Нет</Badge>
            )}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <PostRowActions
        id={row.original.id}
        active={row.original.active as boolean}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
