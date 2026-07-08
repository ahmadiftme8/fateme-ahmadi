"use client";

import React from "react";
import Image from "next/image";
import styles from "./TrustedBy.module.css";
import { trustedBrands } from "@/data/trustedByData";
import { FadeIn, getStaggerDelay } from "@/components/ui/FadeIn";

export default function TrustedBy() {
  // Split brands for Desktop (2 rows)
  // Total 14 brands: 7 and 7
  const desktopRow1 = trustedBrands.slice(0, 7);
  const desktopRow2 = trustedBrands.slice(7, 14);

  // Split brands for Mobile (3 rows)
  // Total 14 brands: 5, 5, 4
  const mobileRow1 = trustedBrands.slice(0, 5);
  const mobileRow2 = trustedBrands.slice(5, 10);
  const mobileRow3 = trustedBrands.slice(10, 14);

  const desktopRows = [
    { brands: desktopRow1, direction: "left" as const },
    { brands: desktopRow2, direction: "right" as const },
  ];

  const mobileRows = [
    { brands: mobileRow1, direction: "left" as const },
    { brands: mobileRow2, direction: "right" as const },
    { brands: mobileRow3, direction: "left" as const },
  ];

  return (
    <section className={styles.logoSection}>
      <FadeIn as="h2" className="sectionTitle" delay={getStaggerDelay(0)}>
        {/* <ShieldIcon className={styles.shieldIcon} /> */}
        TRUSTED BY
      </FadeIn>

      {/* Desktop View: 2 Rows */}
      <div className={styles.desktopView}>
        {desktopRows.map((row, index) => (
          <FadeIn
            key={`desktop-${row.direction}-${index}`}
            className={styles.logoRowWrapper}
            delay={getStaggerDelay(index + 1)}
          >
            <CarouselRow brands={row.brands} direction={row.direction} />
          </FadeIn>
        ))}
      </div>

      {/* Mobile View: 3 Rows */}
      <div className={styles.mobileView}>
        {mobileRows.map((row, index) => (
          <FadeIn
            key={`mobile-${row.direction}-${index}`}
            className={styles.logoRowWrapper}
            delay={getStaggerDelay(index + 1)}
          >
            <CarouselRow brands={row.brands} direction={row.direction} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function CarouselRow({ brands, direction }: { brands: typeof trustedBrands, direction: "left" | "right" }) {
  // Duplicate brands sufficient times to ensure smooth infinite scroll.
  // 4 sets ensures we can scroll -50% seamlessly even on wide screens.
  const seamlessBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className={`${styles.logoRow} ${direction === "left" ? styles.animateLeft : styles.animateRight}`}>
      {seamlessBrands.map((brand, i) => (
        <div key={`${brand.id}-${i}`} className={styles.brandCard}>
          {brand.svgCode ? (
            <div
              className={styles.svgWrapper}
              // Inject explicit width/height and inline styles for Safari compatibility
              dangerouslySetInnerHTML={{
                __html: brand.svgCode
                  .replace(/id\s*=\s*["']Layer_1["']/g, "")
                  .replace(/<svg/, '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                  .replace(/class\s*=\s*["']cls-1["']/g, 'style="fill: var(--color-foreground); stroke-width: 0px;"'),
              }}
            />
          ) : brand.logoSrc ? (
            <Image
              src={brand.logoSrc}
              alt={`${brand.name} Logo`}
              width={120}
              height={40}
              sizes="(max-width: 768px) 100px, 120px"
              quality={75}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', marginBottom: '4px' }}
    >
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
    </svg>
  );
}
