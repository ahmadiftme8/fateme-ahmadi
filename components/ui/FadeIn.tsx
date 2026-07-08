"use client";

import {
  motion,
  useReducedMotion,
  type ViewportOptions,
} from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const motionElements = {
  div: motion.div,
  section: motion.section,
  h2: motion.h2,
  li: motion.li,
  article: motion.article,
  span: motion.span,
  header: motion.header,
} as const;

export type FadeInElement = keyof typeof motionElements;

export const STAGGER_DELAY = 0.1;

export function getStaggerDelay(
  index: number,
  staggerDelay: number = STAGGER_DELAY
): number {
  return index * staggerDelay;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

type FadeInProps = {
  as?: FadeInElement;
  children: ReactNode;
  className?: string;
  delay?: number;
  viewport?: ViewportOptions;
  id?: string;
  style?: CSSProperties;
};

export function FadeIn({
  as = "div",
  children,
  className,
  delay = 0,
  viewport,
  id,
  style,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motionElements[as];

  const resolvedViewport: ViewportOptions = {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
    ...viewport,
  };

  return (
    <MotionComponent
      id={id}
      style={style}
      className={[
        "motion-reduce:translate-y-0 motion-reduce:opacity-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      initial={
        shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={resolvedViewport}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { ...springTransition, delay }
      }
    >
      {children}
    </MotionComponent>
  );
}
