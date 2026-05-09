"use client";
import { useAuthStore } from "@/store/AuthStore";
import { AUTH_URLS } from "@/urls/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function ProfileBlock() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="text-md flex w-full flex-row gap-3 rounded-xl border border-white/8 px-4 py-2 font-bold">
      <div className="flex items-center justify-center rounded-full border border-purple-500/25 p-3 text-center text-lg text-purple-500">
        <User />
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col">
          <h3>{user?.name}</h3>
          <p>
            {
              <b className={`font-semibold text-purple-400 uppercase`}>
                {user?.role === "admin" ? "ADMIN" : "FREE"}
              </b>
            }
          </p>
        </div>
        <Link
          href={AUTH_URLS.logout}
          className="group/logout cursor-pointer rounded-xl border border-white/10 p-2 hover:bg-purple-500/10"
        >
          <span className="text-white duration-300 group-hover/logout:text-purple-500">
            <LogOut />
          </span>
        </Link>
      </div>
    </div>
  );
}
