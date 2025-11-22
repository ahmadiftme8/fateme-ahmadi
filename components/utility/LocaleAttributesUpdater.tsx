"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

import { getDirection } from "@/lib/i18n";
import type { AppLocale } from "@/next-intl.config";

export function LocaleAttributesUpdater() {
  const locale = useLocale() as AppLocale;

  useEffect(() => {
    const dir = getDirection(locale);
    const html = document.documentElement;
    const body = document.body;

    html.setAttribute("lang", locale);
    html.setAttribute("dir", dir);

    body.setAttribute("dir", dir);
    body.dataset.locale = locale;
    body.dataset.dir = dir;
    body.classList.toggle("font-vazirmatn", locale === "fa");
    body.classList.toggle("font-poppins", locale !== "fa");
  }, [locale]);

  return null;
}
