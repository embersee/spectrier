import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/db/schema";
import { Dispatch, SetStateAction } from "react";

export function SelectCategory({
  categories,
  setSelected,
}: {
  categories: Category[];
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={setSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Выберете категорию" defaultValue="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Категории</SelectLabel>
          <Separator />
          <SelectItem value="">Все товары</SelectItem>
          {categories.map((c, i) => (
            <SelectItem key={i} value={c.name}>
              {c.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
