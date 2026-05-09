"use client";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/AdminStore";
import { ReactNode } from "react";

export function FormShell({ children }: { children: ReactNode }) {
  const closeForm = useAdminStore((state) => state.closeForm);
  return (
    <div className="bg-card/80 fixed inset-0 z-10 flex h-screen w-full items-center justify-center">
      <Button
        variant={null}
        className="font-accent fixed top-0 right-0 my-2 cursor-pointer text-2xl"
        onClick={() => closeForm()}
      >
        ✕
      </Button>
      {children}
    </div>
  );
}
