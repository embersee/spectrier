"use client";

import { LoginButton } from "@telegram-auth/react";
import { signIn } from "next-auth/react";

export default async function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Пройдите авторизацию чтобы получить доступ на страницу админа
        </h1>
        <LoginButton
          botUsername="SpectrierBot"
          onAuthCallback={(data) => {
            void signIn(
              "telegram-login",
              { callbackUrl: "/dashboard" },
              data as any
            );
          }}
        />
      </div>
    </section>
  );
}
