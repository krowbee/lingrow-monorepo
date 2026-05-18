import { ReactNode } from "react";
import { AdminHeader } from "./components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-linear-to-b from-slate-800/20 to-purple-500/20">
      <AdminHeader></AdminHeader>
      {children}
    </div>
  );
}
