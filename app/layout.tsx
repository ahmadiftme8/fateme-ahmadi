import "./globals.css";

import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Big_Shoulders, Anton_SC, Inter, Poppins, Antonio } from "next/font/google";
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
  variable: "--font-big-shoulders",
  display: "swap",
});

const antonSC = Anton_SC({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton-sc",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-antonio",
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
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await detectLocale();
  const dir = getDirection(locale);
  const bodyFontClass = locale === "fa" ? "font-vazirmatn" : "font-poppins";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${bigShoulders.variable} ${antonio.variable} ${antonSC.variable} ${inter.variable} min-h-dvh antialiased ${bodyFontClass}`}
        data-theme="light"
        data-locale={locale}
        data-dir={dir}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
