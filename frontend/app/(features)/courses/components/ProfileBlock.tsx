"use client";
import { useAuthStore } from "@/store/AuthStore";
import { AUTH_URLS } from "@/urls/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function ProfileBlock() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full text-md font-bold flex flex-row py-2 px-4 gap-3 border border-white/8 rounded-xl">
      <div className="flex rounded-full text-purple-500 border border-purple-500/25 p-3  text-center justify-center items-center text-lg">
        <User />
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col">
          <h3>{user?.name}</h3>
          <p>
            {
              <b className={`text-purple-400 font-semibold uppercase`}>
                {user?.role === "admin" ? "ADMIN" : "FREE"}
              </b>
            }
          </p>
        </div>
        <Link
          href={AUTH_URLS.logout}
          className="border border-white/10 group/logout hover:bg-purple-500/10 p-2 rounded-xl cursor-pointer"
        >
          <span className="text-white group-hover/logout:text-purple-500 duration-300">
            <LogOut />
          </span>
        </Link>
      </div>
    </div>
  );
}
