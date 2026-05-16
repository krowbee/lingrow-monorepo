"use client";
import { Spinner } from "@/components/ui/spinner";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoading } = useAuthGuard();

  return (
    <>
      {!isLoading ? (
        children
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}
