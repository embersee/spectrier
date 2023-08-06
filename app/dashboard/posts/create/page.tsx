import CreatePost from "@/components/create-post";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CreatePosts() {
  return (
    <>
      <Link href={"/dashboard/posts"}>
        <Button variant="secondary">Назад</Button>
      </Link>
      <CreatePost />
    </>
  );
}
