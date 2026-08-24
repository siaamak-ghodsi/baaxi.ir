import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/components/DemoProvider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "باکس — مدیریت صندوق",
  description: "ابزار مدیریت صندوق قرعه‌کشی و پس‌انداز/وام — baaxi.ir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
