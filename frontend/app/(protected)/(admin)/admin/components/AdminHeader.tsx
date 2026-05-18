"use client";
import { LogoTitle } from "@/app/components/LogoTitle";
import { useAuthStore } from "@/store/AuthStore";
import { ADMIN_URL } from "@/urls/admin";
import Link from "next/link";
import { ReactNode } from "react";

export function AdminHeader(): ReactNode {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="flex w-full flex-row items-center border-b bg-purple-500/10 px-4 backdrop-blur-md">
      <Link href="/admin">
        <LogoTitle />
      </Link>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="font-heading text-2xl">
          <Link href={ADMIN_URL.adminPage}>Панель керування</Link>
        </h1>
        <p className="font-accent">
          <b>{user?.name}</b>
          <b className="text-red-500 uppercase">[{user?.role}]</b>
        </p>
      </div>
    </header>
  );
}
