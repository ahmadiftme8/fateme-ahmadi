import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/blocks/Footer";
import { Header } from "@/components/blocks/Header";
import { LocaleAttributesUpdater } from "@/components/utility/LocaleAttributesUpdater";
import { ScrollProvider } from "@/components/utility/ScrollContext";
import { getDirection } from "@/lib/i18n";
import nextIntlConfig, { AppLocale, locales } from "@/next-intl.config";

import "../globals.css";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const fallbackLocale = nextIntlConfig.defaultLocale as AppLocale;

const resolveLocale = (locale: string): AppLocale =>
  locales.includes(locale as AppLocale) ? (locale as AppLocale) : fallbackLocale;

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;

  const dir = getDirection(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ScrollProvider>
        <LocaleAttributesUpdater />
        <div
          className="flex min-h-dvh flex-col"
          data-locale={locale}
          data-dir={dir}
        >
          <Header />
          <main className="flex-1 pb-20 pt-0 xs:pt-24 ">
            {children}
          </main>
          <Footer />
        </div>
      </ScrollProvider>
    </NextIntlClientProvider>
  );
}
