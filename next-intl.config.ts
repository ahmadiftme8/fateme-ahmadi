export const locales = ["en", "fa"] as const;

export type AppLocale = (typeof locales)[number];

const config = {
  locales,
  defaultLocale: "en" as AppLocale,
  localeDetection: true,
};

export default config;
