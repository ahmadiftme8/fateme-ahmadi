"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SOCIAL_LINKS = [
  { key: "instagram", href: "https://www.instagram.com/fatemeahmadi" },
  { key: "behance", href: "https://www.behance.net/fatemeahmadi" },
  { key: "dribbble", href: "https://dribbble.com/fatemeahmadi" },
  { key: "linkedin", href: "https://www.linkedin.com/in/fatemeahmadi" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="mt-auto border-t border-neutral-200 bg-neutral-50/70 text-sm text-neutral-600 transition-colors dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-300"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
            {t("tagline")}
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            {t("headline")}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {t("description")}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/${locale}/quote`}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:outline-neutral-100"
            >
              {t("cta")}
            </Link>
            <a
              href="mailto:hello@fatemeahmadi.com"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-400 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-600 dark:hover:text-white dark:focus-visible:outline-neutral-100"
            >
              {t("email")}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <nav className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
            {SOCIAL_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-transparent px-3 py-2 transition hover:border-neutral-300 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:hover:border-neutral-600 dark:hover:text-neutral-50 dark:focus-visible:outline-neutral-100"
              >
                {t(`social.${key}`)}
              </a>
            ))}
          </nav>

          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            {t("copyright")}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
