import "../globals.css";
import { NextIntlClientProvider } from "next-intl";

// Small helper; we already used this earlier
function getDirection(locale: string) {
  return locale === "fa" ? "rtl" : "ltr";
}

// Server helper: imports the right JSON file for the locale.
// This runs on the server → no extra JS sent to the browser.
async function getMessages(locale: string) {
  try {
    // Dynamic import lets bundler split by locale
    const messages = (await import(`@/messages/${locale}.json`)).default;
    return messages;
  } catch {
    return null; // if missing, we can 404
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const dir = getDirection(locale);

  const messages = await getMessages(locale);
  if (!messages) {
    // Minimal guard: if locale file is missing, show 404
    // (You can replace with a redirect or fallback later)
    return null;
  }

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-dvh antialiased">
        {/* Makes `useTranslations()` work in any client child */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
