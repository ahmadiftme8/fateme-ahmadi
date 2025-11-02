// app/robots.ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// This runs on the server and returns a typed robots config.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // You can disallow draft routes later (e.g., "/admin")
    },
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  };
}
