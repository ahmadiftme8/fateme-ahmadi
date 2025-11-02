"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./HomeHero.module.css";

export function HomeHero() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();

  const easeOutCurve = [0.22, 1, 0.36, 1] as const;

  const imageVariants = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOutCurve, delay: 0.2 },
    },
  };

  const textVariants = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOutCurve, delay },
    },
  });

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial="initial"
          animate="animate"
          className={styles.heroWrap}
        >
          <motion.div variants={textVariants(0.1)} className={styles.heroLeft}>
            <span className={styles.heroName}>{t("name")}</span>
            <span className={styles.heroRoleDesigner}>{t("designer")}</span>
            <span className={styles.heroRolesMobile} aria-hidden="true">
              <span>{t("designer")}</span>
              <span className={styles.heroAmpersand}>&</span>
              <span>{t("developer")}</span>
            </span>
          </motion.div>

          <motion.div variants={imageVariants} className={styles.heroCard}>
            <div className={styles.heroImageFrame}>
              <Image
                src="/fateme-pic.png"
                alt={t("imageAlt")}
                fill
                sizes="304px"
                priority
                className={styles.heroImage}
              />
            </div>
            <Link
              href="/fateme-pic.png"
              className={styles.cvBadge}
              download
              aria-label={t("downloadCv")}
            >
              <svg
                className={styles.cvIcon}
                viewBox="0 0 64 64"
                aria-hidden="true"
              >
                <path d="M32 6a4 4 0 0 1 4 4v22.34l6.63-6.63a4 4 0 0 1 5.66 5.66l-14 14a4 4 0 0 1-5.66 0l-14-14a4 4 0 1 1 5.66-5.66L28 32.34V10a4 4 0 0 1 4-4zM16 54a4 4 0 0 1 0-8h32a4 4 0 0 1 0 8z" />
              </svg>
              <span>{t("cvBadge")}</span>
            </Link>
          </motion.div>

          <motion.div variants={textVariants(0.18)} className={styles.heroRight}>
            <span className={styles.heroRoleDeveloper}>{t("developer")}</span>
            <div className={styles.heroDesc}>
              <p>{t("descriptionPrimary")}</p>
              <p>{t("descriptionSecondary")}</p>
            </div>
          </motion.div>
        </motion.div>

        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>SCROLL</span>
        </div>

        <motion.div
          className={styles.star}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: easeOutCurve, delay: 0.3 }}
        />
      </div>
    </section>
  );
}
