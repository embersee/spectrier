"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Locales() {
  const router = useRouter();

  useEffect(() => {
    if (window == undefined) return;
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  }, []);
  return (
    <div className="flex flex-col m-auto justify-center items-center h-screen font-semibold">
      <h1>Выберите язык</h1>
      <h1>Тілді таңдаңыз</h1>
      <div className="flex gap-4 mt-5">
        <Button onClick={() => router.push("/webapp")}>Русский</Button>
        <Button onClick={() => router.push("/kz/webapp")}>Қазақ</Button>
      </div>
    </div>
  );
}
