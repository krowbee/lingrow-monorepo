import { GlobalErrorBlock } from "@/components/ui/global-error";
import "./globals.css";
import { Inter, Montserrat, Poppins } from "next/font/google";
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${montserrat.variable} ${poppins.variable}`}
    >
      <body className="bg-black/95">
        {children}
        <GlobalErrorBlock />
      </body>
    </html>
  );
}
