"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { withBasePath } from "@/lib/base-path";
import {
  ABOUT_HERO_DESKTOP,
  ABOUT_HERO_MOBILE,
  ABOUT_STORY_IMAGES,
} from "./aboutAssets";

function shouldSkipPrefetch() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  return Boolean(
    connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
  );
}

function prefetchImage(src: string, fetchPriority: "high" | "low") {
  const img = new window.Image();
  img.decoding = "async";
  img.fetchPriority = fetchPriority;
  img.src = withBasePath(src);
}

export function PrefetchAboutAssets() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const isAbout = pathname?.includes("/about") ?? false;

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let cancelled = false;

    const warmAboutCache = () => {
      if (cancelled || shouldSkipPrefetch()) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const heroSrc = isMobile ? ABOUT_HERO_MOBILE : ABOUT_HERO_DESKTOP;

      if (!isAbout) {
        router.prefetch(`/${locale}/about`);
        prefetchImage(heroSrc, "low");
        ABOUT_STORY_IMAGES.forEach((src) => prefetchImage(src, "low"));
        return;
      }

      ABOUT_STORY_IMAGES.forEach((src) => prefetchImage(src, "low"));
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(warmAboutCache, { timeout: 2500 });
        return;
      }

      timeoutId = window.setTimeout(warmAboutCache, 400);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isAbout, locale, router]);

  return null;
}
