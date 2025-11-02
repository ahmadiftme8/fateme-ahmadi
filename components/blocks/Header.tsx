"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";

const NAV_ITEMS = [
  { key: "home", segment: "" },
  { key: "about", segment: "about" },
  { key: "portfolio", segment: "portfolio" },
  { key: "blog", segment: "blog" },
] as const;

const DROPDOWN_ID = "header-mobile-menu";

const getLocalizedPath = (pathname: string, locale: string) => {
  const safe = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return safe.replace(/^\/(en|fa)(?=/|$)/, `/${locale}`) || `/${locale}`;
};

export function Header() {
  const locale = useLocale();
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");
  const pathname = usePathname() ?? `/${locale}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = NAV_ITEMS.map(({ key, segment }) => {
    const href = segment ? `/${locale}/${segment}` : `/${locale}`;
    return {
      key,
      label: tNav(key),
      href,
      isActive:
        segment === ""
          ? pathname === href
          : pathname.startsWith(`/${locale}/${segment}`),
    };
  });

  const nextLocale = locale === "fa" ? "en" : "fa";
  const localeHref = getLocalizedPath(pathname, nextLocale);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
      aria-label={tHeader("title")}
    >
      <div className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ""}`}>
        <div className={styles.avatar}>
          <Image
            src="/fateme-pic.png"
            alt="Fateme Ahmadi portrait"
            width={74}
            height={74}
            priority
          />
        </div>

        <div
          className={`${styles.links} ${isMenuOpen ? styles.linksOpen : ""}`}
          id={DROPDOWN_ID}
        >
          {navLinks.map(({ key, label, href, isActive }) => (
            <Link
              key={key}
              href={href}
              onClick={handleCloseMenu}
              className={`${styles.link} ${
                key === "home" ? styles.linkHome : ""
              } ${isActive && key !== "home" ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          ))}

          <Link
            href={localeHref}
            lang={nextLocale}
            onClick={handleCloseMenu}
            className={`${styles.link} ${styles.linkActive} ${styles.localeLink}`}
          >
            <span className={styles.localeText}>
              
              <span>{nextLocale === "fa" ? "U?OO?O3UO" : "EN"}</span>
            </span>
          </Link>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? tHeader("closeMenu") : tHeader("openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls={DROPDOWN_ID}
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menuIcon}
            >
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menuIcon}
            >
              <path
                d="M4 9H20M4 15H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div
          className={`${styles.actions} ${isMenuOpen ? styles.actionsMenu : ""}`}
        >
          <Link
            href={`/${locale}/quote`}
            className={styles.contactBtn}
            onClick={handleCloseMenu}
            aria-label={`${tHeader("contact")} / Available For Work`}
          >
            <span className={styles.contactLabelDesktop}>
              {tHeader("contact")}
            </span>
            <span className={styles.contactLabelMobile} aria-hidden="true">
              Available&nbsp;For&nbsp;Work&nbsp; &nbsp; &nbsp; &nbsp; |
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
