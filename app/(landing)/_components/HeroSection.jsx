"use client";

import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

/**
 * HeroSection
 * Layout: full-bleed light bg, two-column on ≥lg, stacked on mobile/tablet.
 * Fonts: add to your Next.js layout or _app:
 *   import { Syne } from "next/font/google";
 *   const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
 *   // apply `syne.variable` to <html> or <body>
 *
 * tailwind.config.js:
 *   theme: { extend: { fontFamily: { display: ["var(--font-display)", "sans-serif"] } } }
 *
 * Dependencies: framer-motion  →  npm i framer-motion
 */
export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#f5f5f0] overflow-hidden flex items-center">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 60px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large background text watermark */}
      <span
        className="absolute -bottom-6 left-4 text-[160px] sm:text-[220px] font-black text-[#0e0e0e]/[0.025] leading-none select-none pointer-events-none hidden sm:block"
        aria-hidden
      >
        TERRA
      </span>

      {/* Inner container: two-column on lg+, stacked otherwise */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center min-h-screen lg:min-h-0 lg:py-10 xl:py-14">
        <HeroLeft />
        <HeroRight />
      </div>
    </section>
  );
}
