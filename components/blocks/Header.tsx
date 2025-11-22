"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
  const supported = ["/en", "/fa"];
  const matched = supported.find(
    (prefix) => safe === prefix || safe.startsWith(`${prefix}/`),
  );

  if (!matched) {
    return safe;
  }

  const remainder = safe.slice(matched.length);
  return remainder ? `/${locale}${remainder}` : `/${locale}`;
};

export function Header() {
  const locale = useLocale();
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");
  const pathname = usePathname() ?? `/${locale}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const collapsedOffsetRef = useRef<number>(0);
  const isMenuOpenRef = useRef(isMenuOpen);
  const previousBodyPaddingTopRef = useRef<string | null>(null);

  const computeNavOffset = useCallback(() => {
    const navElement = navRef.current;

    if (!navElement) {
      return 0;
    }

    const rect = navElement.getBoundingClientRect();
    return Math.max(0, rect.top + rect.height);
  }, []);

  const applyBodyOffset = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }

    const offset = collapsedOffsetRef.current || computeNavOffset();

    if (!offset) {
      return;
    }

    const offsetValue = Math.round(offset);
    document.body.style.paddingTop = `${offsetValue}px`;
  }, [computeNavOffset]);

  const updateCollapsedOffset = useCallback(() => {
    if (isMenuOpenRef.current) {
      return;
    }

    const offset = computeNavOffset();

    if (!offset) {
      return;
    }

    collapsedOffsetRef.current = Math.round(offset);
  }, [computeNavOffset]);

  const handleDropdownAnimationComplete = useCallback(() => {
    if (isMenuOpenRef.current) {
      return;
    }

    updateCollapsedOffset();
    applyBodyOffset();
  }, [applyBodyOffset, updateCollapsedOffset]);

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
  const localeTextClass = `${styles.localeText} ${
    nextLocale === "fa" ? "font-vazirmatn" : ""
  }`;

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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;

    if (typeof window === "undefined") {
      return;
    }

    const frame = requestAnimationFrame(() => {
      applyBodyOffset();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isMenuOpen, applyBodyOffset]);

  useEffect(() => {
    if (!hasMounted || typeof window === "undefined") {
      return;
    }

    if (typeof document !== "undefined" && previousBodyPaddingTopRef.current === null) {
      previousBodyPaddingTopRef.current = document.body.style.paddingTop;
    }

    let frame = 0;

    const scheduleUpdate = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        updateCollapsedOffset();
        applyBodyOffset();
      });
    };

    scheduleUpdate();

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("resize", scheduleUpdate);

      if (frame) {
        cancelAnimationFrame(frame);
      }

      if (typeof document === "undefined") {
        return;
      }

      const original = previousBodyPaddingTopRef.current;

      if (original === null) {
        document.body.style.removeProperty("padding-top");
      } else {
        document.body.style.paddingTop = original;
      }
    };
  }, [hasMounted, applyBodyOffset, updateCollapsedOffset]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
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
          className={styles.links}
          style={
            isMobileViewport && isMenuOpen ? { display: "none" } : undefined
          }
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
            <span className={localeTextClass}>
              <span>{nextLocale === "fa" ? "\u0641\u0627\u0631\u0633\u06cc" : "EN"}</span>
            </span>
          </Link>
        </div>

        <motion.div
          id={DROPDOWN_ID}
          className={styles.linksOpen}
          initial={false}
          onAnimationComplete={handleDropdownAnimationComplete}
          animate={
            hasMounted && isMobileViewport
              ? {
                  height: isMenuOpen ? "auto" : 0,
                  opacity: isMenuOpen ? 1 : 0,
                }
              : { height: "auto", opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          style={{
            overflow: "hidden",
            display: isMobileViewport ? undefined : "none",
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
          aria-hidden={!isMobileViewport || !isMenuOpen}
        >
          {navLinks.map(({ key, label, href, isActive }) => (
            <Link
              key={`${key}-mobile`}
              href={href}
              onClick={handleCloseMenu}
              className={`${styles.link} ${
                key === "home" ? styles.linkHome : ""
              } ${isActive && key !== "home" ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          ))}
        </motion.div>

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
              Available&nbsp;For&nbsp;Work
              <span className={styles.pulseWrapper} aria-hidden="true">
                <span className={styles.pulse} />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
