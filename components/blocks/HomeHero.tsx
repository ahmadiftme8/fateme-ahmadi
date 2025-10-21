"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function HomeHero() {
  const t = useTranslations(); // gets messages from the nearest Provider

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">{t("hero.title")}</h1>
      <p className="mt-2 text-neutral-600">{t("hero.subtitle")}</p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => alert("Clicked!")}>CTA</Button>
        <Button variant="ghost">Secondary</Button>
      </div>
    </section>
  );
}
