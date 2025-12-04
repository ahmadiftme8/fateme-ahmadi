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
            <span className={styles.scrollLine} />
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
                    fill="url(#paint0_linear_star-8)"
                    fillOpacity="0.55"
                    d="M200 0H0v200h200V0z"
                  />
                  <g filter="url(#filter0_f_748_star-8)">
                    <path fill="#06F" d="M213 69H93v141h120V69z" />
                  </g>
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_f_748_star-8"
                  width="245"
                  height="266"
                  x="30.5"
                  y="6.5"
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    result="effect1_foregroundBlur_748_star-8"
                    stdDeviation="31.25"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_star-8"
                  x1="162"
                  x2="49.5"
                  y1="38"
                  y2="150.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF1F00" />
                  <stop offset="1" stopColor="#FF58E4" />
                </linearGradient>
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
