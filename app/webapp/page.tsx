import { ItemCard } from "@/components/item-card";
import { SelectCategory } from "@/components/select-category";

export default function WebAppPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Shop
      </h1>
      <SelectCategory />
      <div className="grid gap-2 grid-cols-3 grid-rows-3">
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </section>
  );
}
