"use client";
import { useAdminStore } from "@/store/AdminStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function GlobalErrorBlock() {
  const errorMessage = useAdminStore((state) => state.errorMessage);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!errorMessage) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [errorMessage]);

  if (!errorMessage) return null;
  return (
    <div
      role="alert"
      className={`fixed top-2 right-2 z-50 w-sm ${isVisible ? "translate-y-0" : "-translate-y-[120%]"} rounded-xl border border-red-400 bg-red-400/20 p-4 transition-transform duration-300 ease-in-out`}
    >
      <div className="relative flex h-full w-full flex-col justify-between">
        <h1 className="font-accent text-xl font-bold text-red-400">Помилка!</h1>
        <p className="font-body text-red-400">{errorMessage}</p>
        <div className="absolute top-0 right-0">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            <X className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
