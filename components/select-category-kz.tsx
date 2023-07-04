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

export function SelectCategoryKZ({
  categories,
  setSelected,
}: {
  categories: Category[];
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Select onValueChange={setSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Санатты таңдаңыз" defaultValue="" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>таңдаңыз</SelectLabel>
          <Separator />
          <SelectItem value="">Барлық тауарлар</SelectItem>
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
