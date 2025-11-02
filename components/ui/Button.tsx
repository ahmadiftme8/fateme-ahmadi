// A minimal, reusable button with Tailwind classes.
// Note: props are typed so you get autocomplete + safety as you code.
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  // Keep styles token-like: base, then variant modifiers.
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-[transform,opacity,background-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60 focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.98] dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
    ghost:
      "bg-transparent text-neutral-900 hover:bg-neutral-100 active:scale-[0.98] dark:text-neutral-100 dark:hover:bg-neutral-900/60",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      // `...props` forwards things like onClick, disabled, etc.
      {...props}
    />
  );
}
