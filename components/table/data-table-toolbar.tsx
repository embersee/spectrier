"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { api } from "@/utils/api";
// import { Checkbox } from "./ui/checkbox";
// import { Label } from "./ui/label";
// import { Separator } from "./ui/separator";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  // const { data: eduNames } = api.form.getEduNames.useQuery();

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

        {/* <Select
          value={
            (table.getColumn("eduName")?.getFilterValue() as string) ??
            "Выберете учереждение"
          }
          onValueChange={(name) =>
            table.getColumn("eduName")?.setFilterValue(name)
          }
        >
          <SelectTrigger className="h-8 w-[250px] text-black lg:w-[350px]">
            <SelectValue
              placeholder="Фильтрация по учереждению..."
              defaultValue="Выберете учереждение"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Выберете учереждение" disabled>
                Выберете учереждение
              </SelectItem>
              <Separator />
              <SelectLabel>Учебные учереждения</SelectLabel>

              {eduNames?.map((item) => (
                <SelectItem key={item.id} value={item.name as string}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}

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
