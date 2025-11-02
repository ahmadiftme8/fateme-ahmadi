import nextIntlConfig, { AppLocale, locales } from "@/next-intl.config";

export { locales };
export type Locale = AppLocale;

export const defaultLocale: Locale = nextIntlConfig.defaultLocale as Locale;

export function getDirection(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr";
}

