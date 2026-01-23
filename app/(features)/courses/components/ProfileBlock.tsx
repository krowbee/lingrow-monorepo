"use client";
import { useAuthStore } from "@/store/AuthStore";

export function ProfileBlock() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="w-full text-md font-bold flex flex-col py-2 px-4 text-center">
      <h3>{user?.name}</h3>
      <p>
        Підписка: <b className="text-orange-300">FREE</b>
      </p>
    </div>
  );
}
