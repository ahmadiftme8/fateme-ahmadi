import createMiddleware from 'next-intl/middleware';
import nextIntlConfig from './next-intl.config';

// This middleware automatically redirects users
// to the correct /en or /fa path and enables locale detection.
export default createMiddleware(nextIntlConfig);

export const config = {
  // Apply to all paths except static files or Next internals
  matcher: ['/((?!_next|.*\\..*).*)']
};
