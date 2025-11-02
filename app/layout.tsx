import "./globals.css";

import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Big_Shoulders, Poppins, Vazirmatn } from "next/font/google";
import { ReactNode } from "react";

import { getDirection } from "@/lib/i18n";
import nextIntlConfig, { AppLocale, locales } from "@/next-intl.config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-big-shoulders",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const fallbackLocale = nextIntlConfig.defaultLocale as AppLocale;

const detectLocale = async (): Promise<AppLocale> => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const headerStore = await headers();
  const headerPath =
    headerStore.get("x-invoke-path") ?? headerStore.get("next-url") ?? "/";

  const matchLocale =
    headerPath.match(/^\/(en|fa)(?=\/|$)/)?.[1] ??
    (cookieLocale ?? fallbackLocale);

  return locales.includes(matchLocale as AppLocale)
    ? (matchLocale as AppLocale)
    : fallbackLocale;
};

export const metadata: Metadata = {
  title: {
    default: "Fateme Ahmadi - Brand Identity & Web Design",
    template: "%s | Fateme Ahmadi",
  },
  description:
    "Bilingual brand identity and web design studio crafting bold digital experiences for English and Persian audiences.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await detectLocale();
  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${vazirmatn.variable} ${bigShoulders.variable} min-h-dvh antialiased font-poppins`}
        data-theme="light"
      >
        {children}
      </body>
    </html>
  );
}
