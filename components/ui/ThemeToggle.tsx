"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";

const STORAGE_KEY = "fateme-theme";

const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const body = document.body;

  html.setAttribute("data-theme", theme);
  body.setAttribute("data-theme", theme);
  if (theme === "dark") {
    html.classList.add("dark");
    body.classList.add("dark");
  } else {
    html.classList.remove("dark");
    body.classList.remove("dark");
  }
};

const detectInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const t = useTranslations("header.themeToggle");

  useEffect(() => {
    const initial = detectInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-black/10 bg-white px-1 transition-all duration-300 ease-out hover:border-black/20 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white/20"
      aria-label={isDark ? t("light") : t("dark")}
    >
      <span
        className={`absolute inset-y-1 inline-flex w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white transition-transform duration-300 ease-out dark:bg-blue-400 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? "☀" : "☾"}
      </span>
      <span className="sr-only">{isDark ? t("light") : t("dark")}</span>
    </button>
  );
}
