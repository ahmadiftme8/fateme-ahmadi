import React from "react";
import Image from "next/image";
import styles from "./TrustedBy.module.css";
import { trustedBrands } from "@/data/trustedByData";

export default function TrustedBy() {
  // Duplicate the brands to create the seamless loop effect
  const brands = [...trustedBrands, ...trustedBrands, ...trustedBrands];
  console.log("TrustedBy rendering, brands count:", brands.length);

  return (
    <section className={styles.logoSection}>
      <h2 className="sectionTitle">
        <ShieldIcon className={styles.shieldIcon} />
        TRUSTED BY
      </h2>

      {/* Row 1: Moves Left */}
      <div className={styles.logoRowWrapper}>
        <div className={`${styles.logoRow} ${styles.animateLeft}`}>
          {brands.map((brand, i) => (
            <div key={`row1-${brand.id}-${i}`} className={styles.brandCard}>
              <Image
                src={brand.logoSrc}
                alt={`${brand.name} Logo`}
                width={120}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves Right */}
      <div className={styles.logoRowWrapper}>
        <div className={`${styles.logoRow} ${styles.animateRight}`}>
          {brands.map((brand, i) => (
            <div key={`row2-${brand.id}-${i}`} className={styles.brandCard}>
              <Image
                src={brand.logoSrc}
                alt={`${brand.name} Logo`}
                width={120}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Moves Left (Mobile Only) */}
      <div className={`${styles.logoRowWrapper} ${styles.mobileRow}`}>
        <div className={`${styles.logoRow} ${styles.animateLeft}`}>
          {brands.map((brand, i) => (
            <div key={`row3-${brand.id}-${i}`} className={styles.brandCard}>
              <Image
                src={brand.logoSrc}
                alt={`${brand.name} Logo`}
                width={120}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
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
