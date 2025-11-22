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

  const services = [
    {
      id: 1,
      title: "Graphic Design",
      items: [
        "Logo and brand identity design",
        "Social media graphics and ad creatives",
        "Infographics and data visualization",
        "Custom illustrations and icons",
      ],
    },
    {
      id: 2,
      title: "Web Development",
      items: [
        "Logo and brand identity design",
        "Social media graphics and ad creatives",
        "Infographics and data visualization",
        "Custom illustrations and icons",
      ],
    },
    {
      id: 3,
      title: "UI/UX Design",
      items: [
        "Logo and brand identity design",
        "Social media graphics and ad creatives",
        "Infographics and data visualization",
        "Custom illustrations and icons",
      ],
    },
    {
      id: 4,
      title: "Video Editing",
      items: [
        "Logo and brand identity design",
        "Social media graphics and ad creatives",
        "Infographics and data visualization",
        "Custom illustrations and icons",
      ],
    },
  ];

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
          />
        </div>

        <div className={styles.postHero}>
          <p className={styles.postHeroText}>
            I'm Fatemeh, a multidisciplinary designer and front-end developer
            creating impactful digital experiences, visuals, and products for
            brands and businesses for over 7 years.
          </p>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.servicesContainer}>
          <h2 className={styles.servicesTitle}>My Services</h2>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceNumber}>{service.id}</div>
                <div className={styles.serviceDivider} aria-hidden="true" />

                <div className={styles.serviceBody}>
                  <div className={styles.serviceHeader}>
                    <h3 className={styles.serviceName}>{service.title}</h3>
                    
                  </div>
                  

                  <ul className={styles.serviceList}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <span aria-hidden className={styles.serviceArrow} />
              </div>
            ))}
          </div>
            <div className={styles.ctabtndiv}>

              <button className={styles.serviceCta} type="button">
            Get Started
            <span aria-hidden className={styles.serviceCtaArrow}>
              {"\u21AA"}
            </span>
          </button>
            </div>
          
        </div>
      </section>
    </>
  );
}
