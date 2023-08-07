"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/view-options";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Поиск по названию..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <Select
          value={
            table.getColumn("active")?.getFilterValue() == true
              ? "active"
              : table.getColumn("active")?.getFilterValue() == false
              ? "inactive"
              : "none"
          }
          onValueChange={(name) =>
            table
              .getColumn("active")
              ?.setFilterValue(name == "active" ? true : false)
          }
        >
          <SelectTrigger className="h-8 lg:w-[150px]">
            <SelectValue placeholder="Активность" defaultValue="none" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"none"} disabled>
              Без фильтра
            </SelectItem>
            <SelectGroup>
              <SelectItem value={"active"}>Активные</SelectItem>
              <SelectItem value={"inactive"}>Не активные</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Очистить
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
