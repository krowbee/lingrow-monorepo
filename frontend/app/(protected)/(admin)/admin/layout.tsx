import { ReactNode } from "react";
import { AdminHeader } from "./components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AdminHeader></AdminHeader>
      {children}
    </>
  );
}
