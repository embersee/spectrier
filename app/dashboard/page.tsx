"use server";

import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(OPTIONS);

  const adminIds = process.env.ADMIN_ID as string;

  if (!adminIds.includes(session?.user?.id as string)) {
    redirect("/");
  }
  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
        {/* <Link href={"/dashboard/products/create-product"}>
          <Button variant="secondary">Создать</Button>
        </Link> */}
      </div>

      {/* <DataTable columns={columns} data={products} /> */}
    </>
  );
}
