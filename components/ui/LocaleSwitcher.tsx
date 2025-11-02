"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Locale = "en" | "fa";

type LocaleSwitcherProps = {
  variant?: "default" | "compact" | "nav";
};

const SUPPORTED_LOCALES: Locale[] = ["en", "fa"];

const swapLocaleInPath = (pathname: string, locale: Locale) => {
  const safePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const stripped = safePath.replace(/^\/(en|fa)(?=\/|$)/, "");
  return `/${locale}${stripped || ""}`.replace(/\/+$/, "") || `/${locale}`;
};

export function LocaleSwitcher({ variant = "default" }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const t = useTranslations("localeSwitcher");
  const [isPending, startTransition] = useTransition();

  const handleCompactToggle = useCallback(() => {
    const nextLocale = locale === "fa" ? "en" : "fa";
    const nextHref = swapLocaleInPath(pathname, nextLocale);

    startTransition(() => {
      router.push(nextHref);
    });
  }, [locale, pathname, router, startTransition]);

  if (variant === "nav") {
    const nextLocale = locale === "fa" ? "en" : "fa";
    const label = nextLocale === "en" ? t("en") : t("fa");
    return (
      <motion.button
        type="button"
        onClick={handleCompactToggle}
        disabled={isPending}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 rounded-full border border-[#1F67F1]/40 bg-white/90 px-3.5 py-1.5 text-sm font-medium text-[#1F67F1] shadow-[0_6px_16px_rgba(31,103,241,0.2)] transition hover:shadow-[0_10px_22px_rgba(31,103,241,0.28)] disabled:opacity-70 dark:border-[#6B96FF]/40 dark:bg-[#1b1f2a] dark:text-[#6B96FF]"
        aria-label={t("switch")}
      >
        <span className="text-base">🌐</span>
        <span>{label}</span>
      </motion.button>
    );
  }

  if (variant === "compact") {
    return (
      <motion.button
        type="button"
        onClick={handleCompactToggle}
        disabled={isPending}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-semibold uppercase tracking-[0.24em] transition hover:border-neutral-300 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:opacity-70 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:text-neutral-50 dark:focus-visible:outline-neutral-100"
        aria-label={t("switch")}
        whileTap={{ scale: 0.96 }}
        animate={{ opacity: isPending ? 0.6 : 1 }}
      >
        {locale === "fa" ? "FA" : "EN"}
      </motion.button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/80 p-1 text-xs uppercase tracking-[0.24em] shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
      <AnimatePresence initial={false}>
        {SUPPORTED_LOCALES.map((itemLocale) => {
          const href = swapLocaleInPath(pathname, itemLocale);
          const isActive = itemLocale === locale;
          return (
            <motion.div
              key={itemLocale}
              className="relative"
              layout
              initial={false}
            >
              {isActive && (
                <motion.span
                  layoutId="locale-pill"
                  className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              )}
              <Link
                href={href}
                hrefLang={itemLocale}
                className={`relative inline-flex min-w-[3rem] items-center justify-center rounded-full px-3 py-2 transition-colors ${
                  isActive
                    ? "text-white dark:text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {itemLocale === "en" ? t("en") : t("fa")}
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
