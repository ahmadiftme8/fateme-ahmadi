import { getRequestConfig } from "next-intl/server";

import nextIntlConfig, { AppLocale, locales } from "@/next-intl.config";

const fallbackLocale = nextIntlConfig.defaultLocale as AppLocale;

export default getRequestConfig(async ({ locale }) => {
  const normalizedLocale = locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : fallbackLocale;

  const messages = (await import(`@/messages/${normalizedLocale}.json`))
    .default;

  return {
    locale: normalizedLocale,
    messages,
  };
});
