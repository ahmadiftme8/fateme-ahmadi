import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(); // auto-detects i18n/request.ts

const nextConfig = {
  turbopack: {}, // good for dev with --turbo
};

export default withNextIntl(nextConfig);
