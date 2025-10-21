import { HomeHero } from "@/components/blocks/HomeHero";
import { getTranslations } from "next-intl/server";

// This runs on the **server** before rendering the page.
// It sets <title> and <meta name="description"> for SEO.
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale: params.locale });
  return {
    title: t("seo.home.title"),
    description: t("seo.home.description"),
    alternates: {
      // hreflang hints for search engines
      languages: {
        en: "/en",
        fa: "/fa",
      },
      canonical: `/${params.locale}`,
    },
  };
}

export default function HomePage() {
  return (
    <main>
      <HomeHero />
    </main>
  );
}
