"use client";

import { useTranslations } from "next-intl";
import {
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaEnvelope
} from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footerSection}>
      {/* Floating CV Badge */}
      <a href="/cv.pdf" className={styles.cvBadge} target="_blank" rel="noopener noreferrer">
        <MdDownload size={35} />
        <span className={styles.cvText}>{t("cv")}</span>
      </a>

      {/* Main Title */}
      <h1 className={styles.footerTitle}>FATEME AHMADI</h1>

      {/* Navigation Pills */}
      <nav className={styles.footerNav}>
        <a href="#portfolio" className={styles.pillBtn}>{t("myPortfolio")}</a>
        <a href="#collaborate" className={styles.pillBtn}>{t("collaborate")}</a>
        <a href="#about" className={styles.pillBtn}>{t("aboutMe")}</a>
        <a href="mailto:hello@fatemeahmadi.com" className={styles.pillBtn}>{t("emailMe")}</a>
      </nav>

      {/* Social Icons */}
      <div className={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/fatemeahmadi" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaLinkedin />
        </a>
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaWhatsapp />
        </a>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaTelegram />
        </a>
        <a href="https://www.instagram.com/fatemeahmadi" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaInstagram />
        </a>
        <a href="mailto:hello@fatemeahmadi.com" className={styles.socialIcon}>
          <FaEnvelope />
        </a>
      </div>

      {/* Copyright */}
      <p className={styles.copyright}>{t("copyright")}</p>
    </footer>
  );
}
