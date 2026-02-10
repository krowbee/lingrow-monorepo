import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
