import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { NewProduct, category, product, user } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export default async function IndexPage() {
  const users = await db.query.product.findMany({
    with: {
      category: true,
    },
  });

  const createUser = async () => {
    "use server";

    const insertProduct = async (p: NewProduct) => {
      return db
        .insert(product)
        .values(p)
        .then(() => revalidatePath("/"));
    };

    const NewProduct: NewProduct = {
      name: "watch 1",
      description: "some desc",
      price: 1000,
      discount: 10,
      stock: 100,
      image: "",
      categoryID: 1,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };

    await insertProduct(NewProduct);
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        {users?.map((user, i) => (
          <div key={i}>
            {JSON.stringify(user, null, 4)} {user.category?.name}
          </div>
        ))}

        <form action={createUser}>
          <Button type="submit">Add to db new user</Button>
        </form>
      </div>
    </section>
  );
}
