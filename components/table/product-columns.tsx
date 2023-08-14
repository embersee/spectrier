"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/column-header";
import { Category, Product } from "@/lib/db/schema";
import { DataTableRowActions } from "./row-action";
import { Badge } from "../ui/badge";
import { Products } from "@/types/products";

export const productColumns: ColumnDef<Products>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Назавние" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "nameKZ",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Назавние KZ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("nameKZ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Описание" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "descriptionKZ",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Описание KZ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("descriptionKZ")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Категория" />
    ),
    cell: ({ row }) => {
      const { id, name } = row.getValue("category") as Category;
      return (
        <div className="flex space-x-2">
          <Badge className="max-w-[200px] truncate font-medium">
            {name || "Без категории"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Цена" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("price")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "discount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Дисконт" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[200px] truncate font-medium">
  //           {row.getValue("discount")}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "stock",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="На складе" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2" hidden>
  //         <span className="truncate font-medium">{row.getValue("stock")}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Создано" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {(row.getValue("createdAt") as Date).toLocaleDateString("ru-RU")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Обновлено" />
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as Date;

      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {updatedAt
              ? updatedAt.toLocaleDateString("ru-RU")
              : "Не обновлялся"}
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
        <div className="flex space-x-2 justify-center">
          {row.original.active ? (
            <Badge className="bg-green-500">Да</Badge>
          ) : (
            <Badge className="bg-red-500">Нет</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        id={row.original.id}
        active={row.original.active as boolean}
      />
    ),
  },
];
