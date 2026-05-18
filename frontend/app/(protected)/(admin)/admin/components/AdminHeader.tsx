"use client";
import { ProfileBlock } from "@/app/(protected)/(features)/courses/components/ProfileBlock";
import { LogoTitle } from "@/app/components/LogoTitle";
import { ADMIN_URL } from "@/urls/admin";
import Link from "next/link";
import { ReactNode } from "react";
import { SearchField } from "./SearchField";

export function AdminHeader(): ReactNode {
  return (
    <header className="flex w-full flex-col items-center justify-between border-b border-gray-700/50 px-4 py-4 backdrop-blur-md lg:flex-row">
      <div className="flex flex-row items-center gap-8">
        <Link
          href={ADMIN_URL.adminPage}
          className="hidden items-center gap-2 py-4 lg:flex"
        >
          <LogoTitle />
        </Link>
        <div className="flex flex-col">
          <h1 className="font-heading text-3xl">Панель керування</h1>
          <p className="font-body text-md text-gray-400">
            Створюйте, редагуйте та видаляйте курси
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <SearchField />
        <div className="flex w-70 flex-col items-center justify-center">
          <ProfileBlock className="border-none" />
        </div>
      </div>
    </header>
  );
}
