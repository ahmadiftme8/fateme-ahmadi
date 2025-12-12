"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./HomeHero.module.css";

export function HomeHero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const isFa = locale === "fa";

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
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            initial="initial"
            animate="animate"
            className={styles.heroWrap}
          >
            <motion.div
              variants={textVariants(0.1)}
              className={styles.heroLeft}
            >
              <span className={styles.heroName}>{t("name")}</span>
              {isFa ? (
                <span className={styles.heroRoleCombined}>
                  {t("designerDeveloper")}
                </span>
              ) : (
                <>
                  <span className={styles.heroRoleDesigner}>{t("designer")}</span>
                  <span className={styles.heroRolesMobile} aria-hidden="true">
                    <span>{t("designer")}</span>
                    <span className={styles.heroAmpersand}>&</span>
                    <span>{t("developer")}</span>
                  </span>
                </>
              )}
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
              <div className={styles.badge} aria-hidden="true">
                <span className={styles.badgeText}>Hi</span>
                <div className={styles.badgeIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 77.75 92.4"
                  >
                    <path
                      fill="#fcfcfe"
                      d="m45.24,90.89c-15.94,4.59-33.94-.71-37.56-23.9-.1-.65-.21-1.31-.22-1.97-.11-12.48-2.66-24.48-6.96-36.17-1.18-3.2-.26-5.42,2.32-6.66,3.19-1.54,6.1-.4,7.22,2.97,1.9,5.72,3.65,11.49,5.59,17.2.52,1.53,1.27,4.24,2.62,3.84,1.85-.56.92-3.16.63-4.8-1.67-9.27-3.47-18.52-5.28-27.76-.48-2.47-.06-4.52,2.16-5.9,3.36-2.1,7.08-.38,7.88,3.69,1.72,8.88,3.32,17.77,5.03,26.66.34,1.78.38,4.8,2.2,4.63,1.96-.18,1.23-3.13,1.25-4.89.14-10.83.17-21.66.27-32.49.04-3.78,2.45-5.81,6.02-5.25,2.7.42,4.05,2.22,4.02,5.53-.1,10.93-.25,21.85-.33,32.77-.02,1.5.18,3,.36,4.49.06.53.22,1.19.91,1.27.72.1.95-.56,1.1-1.06.34-1.07.62-2.18.82-3.28,1.62-9.17,3.19-18.36,4.83-27.54.72-4.06,3.82-5.67,7.51-4.02,2.61,1.18,3.08,3.24,2.62,5.85-1.81,9.91-3.48,19.84-5.35,29.75-.54,2.86-.03,5.82-1.01,8.61-4.26.19-8.15,1.66-11.58,4.03-7.55,5.21-11.21,12.5-10.74,21.73.04.98-.02,2.53,1.15,2.57,1.31.05,1.1-1.51,1.19-2.45.3-3.41,1.04-6.7,2.46-9.82,3.72-8.19,10.39-12.37,18.99-13.92,2.01.59,3.27-.42,4.12-2.06.83-1.58,1.53-3.24,2.3-4.85,1.5-3.14,3.66-5.7,6.81-7.31,2.09-1.07,4.29-1.44,6.52-.38,2.72,1.28,3.43,3.81,1.71,6.27-1.14,1.61-2.39,3.16-3.59,4.72-3.3,4.29-5.57,8.87-6.7,14.37-2.48,12.11-8.65,21.91-21.27,25.54Z"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={textVariants(0.18)}
              className={styles.heroRight}
            >
              {!isFa && (
                <span className={styles.heroRoleDeveloper}>
                  {t("developer")}
                </span>
              )}
              <div className={styles.heroDesc}>
                <p>{t("descriptionPrimary")}</p>
                <p>{t("descriptionSecondary")}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className={styles.scrollIndicator} aria-hidden="true">
            <div className={styles.scrollTrack}>
              <div className={styles.scrollThumb} />
            </div>
            <span className={styles.scrollLabel}>SCROLL</span>
          </div>

          <motion.div
            className={styles.star}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeOutCurve, delay: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 200 200"
              className="coolshapes star-8"
            >
              <g clipPath="url(#cs_clip_1_star-8)">
                <mask
                  id="cs_mask_1_star-8"
                  style={{ maskType: "alpha" }}
                  width="200"
                  height="200"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <path
                    fill="#fff"
                    d="M100 0c12.424 62.382 37.256 87.456 100 100-62.759 12.544-87.591 37.618-100 100-12.424-62.382-37.256-87.471-100-100C62.758 87.456 87.591 62.382 100 0z"
                  />
                </mask>
                <g mask="url(#cs_mask_1_star-8)">
                  <path fill="#fff" d="M200 0H0v200h200V0z" />
                  <path
                    fill="#EA5039"
                    d="M200 0H0v200h200V0z"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="cs_clip_1_star-8">
                  <path fill="#fff" d="M0 0H200V200H0z" />
                </clipPath>
                <filter
                  id="cs_noise_1_star-8"
                  width="100%"
                  height="100%"
                  x="0%"
                  y="0%"
                  filterUnits="objectBoundingBox"
                >
                  <feTurbulence
                    baseFrequency="0.6"
                    numOctaves="5"
                    result="out1"
                    seed="4"
                  />
                  <feComposite
                    in="out1"
                    in2="SourceGraphic"
                    operator="in"
                    result="out2"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="out2"
                    mode="overlay"
                    result="out3"
                  />
                </filter>
              </defs>
              <g
                style={{ mixBlendMode: "overlay" }}
                mask="url(#cs_mask_1_star-8)"
              >
                <path
                  fill="gray"
                  stroke="transparent"
                  d="M200 0H0v200h200V0z"
                  filter="url(#cs_noise_1_star-8)"
                />
              </g>
            </svg>
          </motion.div>
        </div>

        <div className={styles.postHero}>
          <p className={styles.postHeroText}>{`I'm Fatemeh, a multidisciplinary designer and front-end developer
            creating impactful digital experiences, visuals, and products for
            brands and businesses for over 7 years.`}

          </p>
        </div>
      </section>
    </>
  );
}
