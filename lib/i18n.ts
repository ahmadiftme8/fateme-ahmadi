// Central i18n config so it's reusable across app + tests.
export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function getDirection(locale: Locale) {
  // RTL for Farsi, LTR otherwise
  return locale === "fa" ? "rtl" : "ltr";
}
