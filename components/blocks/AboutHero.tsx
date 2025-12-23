"use client";

import { useTranslations } from "next-intl";
import styles from "./AboutHero.module.css";
import Image from "next/image";
import { FaLinkedin, FaWhatsapp, FaTelegram, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className={styles.aboutSection} data-page="about">
      {/* Hero Card Container */}
      <div className={styles.heroCard}>
        {/* Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.titleGroup}>
            <h1>
              {t("hero.subtitle")}
              <br />
              <span>{t("hero.title")}</span>
            </h1>
          </div>

          <button className={styles.btnPrimary}>
            {t("hero.cta")}
            <span className={styles.iconArrow}>→</span>
          </button>
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a href="https://www.linkedin.com/in/fatemeh-ahmadi8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/message/D3NPOSXZLBYAA1?src=qr" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://t.me/AhmadiFtme" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegram />
          </a>
          <a href="https://instagram.com/ahmadiftme" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="mailto:devftme@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Main Content Container */}
      <div className={styles.mainContainer}>
        {/* Header Pill */}
        <div className={`${styles.pillBox} ${styles.headerPill}`}>
          <h2 className={styles.headline}>
            {t("intro.title")
              .split("!")
              .filter((phrase) => phrase.trim())
              .map((phrase, index, array) => (
                <span key={index}>
                  {phrase.replace(/\.$/, ".")}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
          </h2>
          <p className={styles.subhead}>{t("intro.subtitle")}</p>
        </div>

        {/* First Content Row */}
        <div className={styles.contentRow}>
          <div className={styles.textContent}>
            <h3>{t("philosophy.title")}</h3>
            <p>{t("philosophy.description")}</p>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="/images/about/ftmestory-01.png"
              alt={t("images.workspace1")}
              width={240}
              height={340}
              className={styles.imgBack}
            />
            <Image
              src="/images/about/ftmestory-02.png"
              alt={t("images.workspace2")}
              width={240}
              height={340}
              className={styles.imgFront}
            />
          </div>
        </div>

        {/* Second Content Row (Reversed) */}
        <div className={`${styles.contentRow} ${styles.reverse}`}>
          <div className={styles.textContent}>
            <h3>{t("journey.title")}</h3>
            <p>{t("journey.description")}</p>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="/images/about/ftmestory-03.png"
              alt={t("images.journey1")}
              width={240}
              height={340}
              className={styles.imgBack}
            />
            <Image
              src="/images/about/ftmestory-04.png"
              alt={t("images.journey2")}
              width={240}
              height={340}
              className={styles.imgFront}
            />
          </div>
        </div>

        {/* Third Content Row */}
        <div className={styles.contentRow}>
          <div className={styles.textContent}>
            <h3>{t("current.title")}</h3>
            <p>{t("current.description")}</p>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="/images/about/ftmestory-05.png"
              alt={t("images.current1")}
              width={240}
              height={340}
              className={styles.imgBack}
            />
            <Image
              src="/images/about/ftmestory-06.png"
              alt={t("images.current2")}
              width={240}
              height={340}
              className={styles.imgFront}
            />
          </div>
        </div>

        {/* Toolkit Section */}
        <div className={styles.toolkitSection}>
          <h2 className={styles.sectionTitle}>{t("toolkit.title")}</h2>
          <p className={styles.skillsList}>{t("toolkit.skills")}</p>
        </div>

        {/* CTA Pill */}
        <div className={`${styles.pillBox} ${styles.ctaPill}`}>
          <p className={styles.ctaText}>
            I am currently <strong className={styles.ctaHighlight}>open to collaborating</strong> with teams who value this multidisciplinary mindset.
          </p>
          <div className={styles.ctaArrow}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
