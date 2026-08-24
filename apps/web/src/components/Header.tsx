"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/fund/rosca-12", label: "صندوق‌ها" },
  { href: "/ledger", label: "دفترکل" },
  { href: "/quick-buy", label: "خرید زودهنگام" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-baax-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition",
                pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href.split("/").slice(0, 2).join("/")))
                  ? "bg-baax-blue-100 font-medium text-baax-blue-800"
                  : "text-baax-blue-600 hover:bg-baax-blue-50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <DemoBadge />
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-baax-blue-50 px-4 py-2 sm:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition",
              pathname === item.href
                ? "bg-baax-purple-600 text-white"
                : "bg-baax-blue-100 text-baax-blue-700"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function DemoBadge() {
  return (
    <span className="hidden rounded-full bg-baax-blue-100 px-3 py-1 text-xs font-medium text-baax-blue-700 sm:inline">
      نسخهٔ دمو
    </span>
  );
}
