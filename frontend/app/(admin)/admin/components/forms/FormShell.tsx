"use client";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/AdminStore";
import { ReactNode } from "react";

export function FormShell({ children }: { children: ReactNode }) {
  const closeForm = useAdminStore((state) => state.closeForm);
  return (
    <div className="fixed bg-card/80 z-10 inset-0 w-full h-screen flex justify-center items-center">
      <Button
        variant={null}
        className="fixed right-0 top-0 cursor-pointer font-accent text-2xl my-2"
        onClick={() => closeForm()}
      >
        ✕
      </Button>
      {children}
    </div>
  );
}
