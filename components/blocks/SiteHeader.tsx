// Server Component by default (no "use client")
// Can render client components inside.
import Link from "next/link";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <Link href="/en" className="font-semibold">
        Fateme Ahmadi
      </Link>
      <LanguageSwitch />
    </header>
  );
}
