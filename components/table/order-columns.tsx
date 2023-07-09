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

export const orderColumns: ColumnDef<Orders>[] = [
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
          <span className=" truncate font-medium">{row.original.order.id}</span>
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
            {new Date(
              row.original.order.createdAt as string
            ).toLocaleDateString("ru-RU")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Пользователь" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            @{row.original.user.username}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комментарий" />
    ),
    cell: ({ row }) => {
      const comment = row.original.order.comment as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {comment || "Без комментарий"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      const orderStatus = row.original.order.orderStatus;

      function switchResult(a: typeof orderStatus) {
        switch (a) {
          case "created":
            return "bg-green-300";
          case "cancelled":
            return "bg-red-500";

          case "failed":
            return "bg-red-500";

          case "complete":
            return "bg-green-500";

          case "delivery":
            return "bg-orange-500";

          case "successful":
            return "bg-green-500";

          default:
            return "";
        }
      }

      const badgeColour = switchResult(orderStatus);

      return (
        <div className="flex space-x-2">
          <Badge className={badgeColour}>{orderStatus}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.order.paymentType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const paymentStatus = row.original.order.paymentStatus;

      function switchResult(a: typeof paymentStatus) {
        switch (a) {
          case "incomplete":
            return "bg-orange-300";
          case "refunded":
            return "bg-red-500";
          case "failed":
            return "bg-red-500";
          case "complete":
            return "bg-green-500";
          default:
            return "";
        }
      }

      const badgeColour = switchResult(paymentStatus);
      return (
        <div className="flex space-x-2">
          <Badge className={badgeColour}>{paymentStatus}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Адрес" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.original.order.address}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Заказ" />
    ),
    cell: ({ row }) => {
      return (
        <div className=" whitespace-nowrap w-56 ">
          <Accordion type="single" collapsible className="p-0 m-0 w-56">
            <AccordionItem value="item-1">
              <AccordionTrigger>Товары заказа</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="flex justify-between px-1">
                  <p className=" truncate font-medium">Название</p>
                  <p className=" truncate font-medium">Кол.</p>
                </div>
                {row.original.product.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col p-1 border rounded-lg mb-1"
                  >
                    <div className=" truncate font-medium flex justify-between">
                      <p>{item.name}</p>
                      <p>{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalSum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сумма" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            ₸{row.original.order.totalSum}
          </span>
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions id={row.original.order.id} />,
  // },
];
