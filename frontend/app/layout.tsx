import { GlobalErrorBlock } from "@/components/ui/global-error";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black/95">
        {children}
        <GlobalErrorBlock />
      </body>
    </html>
  );
}
