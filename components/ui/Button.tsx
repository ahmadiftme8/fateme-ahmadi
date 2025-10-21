// A minimal, reusable button with Tailwind classes.
// Note: props are typed so you get autocomplete + safety as you code.
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  // Keep styles token-like: base, then variant modifiers.
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-[transform,opacity] focus:outline-none focus:ring";
  const variants = {
    primary: "bg-black text-white hover:opacity-90 active:scale-[0.98]",
    ghost: "bg-transparent text-black hover:bg-black/5 active:scale-[0.98]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      // `...props` forwards things like onClick, disabled, etc.
      {...props}
    />
  );
}
