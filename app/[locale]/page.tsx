import { HomeHero } from "@/components/blocks/HomeHero";
import { getTranslations } from "next-intl/server";

type PageParams = {
  params: Promise<{ locale: string }>;
};

// This runs on the server before rendering the page.
// It sets <title> and <meta name="description"> for SEO.
export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("seo.home.title"),
    description: t("seo.home.description"),
    alternates: {
      languages: {
        en: "/en",
        fa: "/fa",
      },
      canonical: `/${locale}`,
    },
  };
}

export default function HomePage() {
  return <HomeHero />;
}
