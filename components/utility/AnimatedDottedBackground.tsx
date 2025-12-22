"use client";

import { useEffect, useRef } from "react";
import styles from "./AnimatedDottedBackground.module.css";

export function AnimatedDottedBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateOffset = () => {
      if (bgRef.current) {
        const bodyPadding = window.getComputedStyle(document.body).paddingTop;
        bgRef.current.style.setProperty('--header-offset', bodyPadding);
      }
    };

    // Initial update
    updateOffset();

    // Update on resize
    window.addEventListener('resize', updateOffset);
    
    // Use MutationObserver to detect body style changes
    const observer = new MutationObserver(updateOffset);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });

    return () => {
      window.removeEventListener('resize', updateOffset);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={bgRef} className={styles.dottedBackground} aria-hidden="true" />
  );
}

