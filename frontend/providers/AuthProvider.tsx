"use client";
import { Spinner } from "@/components/ui/spinner";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAuthInit } from "@/hooks/useAuthInit";
import { useAuthStore } from "@/store/AuthStore";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  useAuthInit();
  useAuthGuard();
  const isLoading = useAuthStore((state) => state.isLoading);
  return (
    <>
      {!isLoading ? (
        children
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  );
}
