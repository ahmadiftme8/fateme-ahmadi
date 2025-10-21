"use client"; // This component can use state, effects, event handlers

import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold">Hello, future portfolio 👋</h1>
      <p className="mt-2 text-muted-foreground">
        We’re wiring up a clean, modular Next.js + TS stack.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={() => alert("Clicked!")}>Primary CTA</Button>
        <Button variant="ghost">Secondary</Button>
      </div>
    </section>
  );
}
