"use client";
import { useAuthStore } from "@/store/AuthStore";
import { User } from "lucide-react";

export function ProfileBlock() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full text-md font-bold flex flex-row py-2 px-4 gap-3 border border-white/5 rounded-xl">
      <div className="flex rounded-full text-purple-500 border border-purple-500/25 p-3  text-center justify-center items-center text-lg">
        <User />
      </div>
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
    </div>
  );
}
