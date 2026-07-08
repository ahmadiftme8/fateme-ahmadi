"use client";

import { FadeIn, getStaggerDelay } from "@/components/ui/FadeIn";
import styles from "./Hero.module.css";

export default function BlogHero() {
  return (
    <div className={styles["herocontainer"]}>
      <FadeIn className={styles["textsContainer"]} delay={getStaggerDelay(0)}>
        <h1 className={styles["herotitle"]}>Blogate</h1>
        <p className={styles["herosubtitle"]}>A Place To Write My Thoughts</p>
      </FadeIn>
    </div>
  );
}
