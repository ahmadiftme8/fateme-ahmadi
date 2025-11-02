// app/sitemap.ts
import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

// All supported locales (keep in sync with next-intl)
const locales = ["en", "fa"] as const;

// Base pages for MVP. Later we’ll add dynamic portfolio slugs here.
const basePaths = ["", "/services", "/portfolio", "/get-a-quote", "/about", "/contact"];

// Builds localized URLs for each path, with x-default alternates for SEO.
function localizedEntries() {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of basePaths) {
    // For each locale, create one <url> with alternates to all locales
    for (const locale of locales) {
      const loc = abs(`/${locale}${path}`);
      const alternates: Record<string, string> = {};

      for (const alt of locales) {
        alternates[alt] = abs(`/${alt}${path}`);
      }

      entries.push({
        url: loc,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedEntries();
}
