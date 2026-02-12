"use client";
import { useAuthStore } from "@/store/AuthStore";
import { ReactNode } from "react";

export function AdminHeader(): ReactNode {
  const user = useAuthStore((state) => state.user);
  return (
    <header className="w-full min-h flex justify-center border-b p-2">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="font-heading text-2xl">Панель керування</h1>
        <p className="font-accent">
          <b>{user?.name}</b>
          <b className="text-red-500 uppercase">[{user?.role}]</b>
        </p>
      </div>
    </header>
  );
}
