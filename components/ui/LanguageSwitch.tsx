"use client";
// ^ Needed because we use browser-only hooks & events.

import Link from "next/link";
import { usePathname } from "next/navigation";

// Very small helper to swap the first segment (/en or /fa)
function swapLocaleInPath(path: string, nextLocale: "en" | "fa") {
  // Ensure we always work with a leading slash
  const safe = path.startsWith("/") ? path : `/${path}`;
  // Replace leading /en or /fa with /<nextLocale>
  return safe.replace(/^\/(en|fa)(?=\/|$)/, `/${nextLocale}`);
}

export function LanguageSwitch() {
  const pathname = usePathname() || "/en"; // default if undefined
  // Decide the next locale based on the current path
  const isFa = /^\/fa(\/|$)/.test(pathname);
  const nextLocale = isFa ? "en" : "fa";
  const href = swapLocaleInPath(pathname, nextLocale);

  return (
    <Link
      href={href}
      hrefLang={nextLocale}
      className="text-sm underline underline-offset-4"
      // Keep UI minimal for now; we’ll style later
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
