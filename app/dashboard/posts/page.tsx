import SendPostModal from "@/components/send-post-modal";
import { DataTable } from "@/components/table/data-table";
import { postColumns } from "@/components/table/post-columns";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function ViewPosts() {
  const posts = await db.query.post.findMany();
  return (
    <>
      <div className="flex space-x-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Все посты
        </h1>
        <Link href={"/dashboard/posts/create"}>
          <Button variant="secondary">Создать</Button>
        </Link>
      </div>
      <DataTable data={posts} columns={postColumns} />
      <SendPostModal />
    </>
  );
}
