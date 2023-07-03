"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default async function Locales() {
  const router = useRouter();
  return (
    <div className="flex flex-col m-auto justify-center items-center h-screen">
      <h1>Выберите язык</h1>
      <h1>Тілді таңдаңыз</h1>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/webapp")}>Русский</Button>
        <Button onClick={() => router.push("/kz/webapp")}>Қазақ</Button>
      </div>
    </div>
  );
}