import { HomeHero } from "@/components/blocks/HomeHero";
import FeaturedProjects from "@/components/blocks/FeaturedProjects";
// Trigger rebuild
import Services from "@/components/blocks/Services";
import TrustedBy from "@/components/blocks/TrustedBy";
import FAQ from "@/components/blocks/FAQ";
import ScopeQuiz from "@/components/estimator/ScopeQuiz";
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

import { getSheetData } from "@/lib/googleSheets";

export default async function HomePage() {
  const projects = await getSheetData();

  return (
    <>
      <HomeHero />
      <Services />
      <FeaturedProjects projects={projects} />
      <TrustedBy />
      <FAQ />
      <ScopeQuiz />
    </>
  );
}
