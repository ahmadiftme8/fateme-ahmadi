// i18n/request.ts
// This is the per-request loader that tells next-intl which messages to use.
// It runs on the server. Keep it small and synchronous-looking.

import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // (Optional) Validate locale; keep it simple for now.
  const supported = ['en', 'fa'] as const;
  if (!supported.includes(locale as (typeof supported)[number])) {
    // Fallback to 'en' if someone hits an unknown locale
    locale = 'en';
  }

  // Load the matching JSON messages. This is code-split per locale.
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
