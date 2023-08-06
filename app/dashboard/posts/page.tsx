import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ViewPosts() {
  return (
    <>
      <p>Смотреть посты</p>
      <Link href={"/dashboard/posts/create"}>
        <Button>Создать</Button>
      </Link>
    </>
  );
}
