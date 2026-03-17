"use client";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.9 },
  },
};

export default function HeroRight() {
  return (
    <motion.div
      className="relative w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-10 xl:px-14 py-10 lg:py-16"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ambient glow behind card */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#6EE53B] opacity-[0.07] rounded-full blur-[80px]" />
      </div>

      {/* Main card */}
      <div className="relative w-full max-w-[520px] rounded-[28px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.14)] border border-white/60 bg-white">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80"
            alt="Aerial view of agricultural land"
            className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a08]/80 via-[#0c1a08]/10 to-transparent" />

          {/* Floating verified badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#0e0e0e] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#6EE53B]" />
            Gov. Verified
          </div>
        </div>

        {/* Info bar */}
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          className="relative bg-[#111] px-6 py-5 flex items-end justify-between"
        >
          {/* Left */}
          <div>
            <p className="text-[#6EE53B] text-[10px] font-bold tracking-[0.16em] uppercase mb-1">
              Featured Plot
            </p>
            <h3 className="text-white font-black text-xl leading-tight">
              Silicon Valley Expansion
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[#999] text-xs">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Santa Clara, CA
              </span>
              <span className="flex items-center gap-1 text-[#999] text-xs">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                42.6 Acres
              </span>
            </div>
          </div>

          {/* Right — price */}
          <div className="text-right">
            <p className="text-[#777] text-[10px] font-semibold tracking-widest uppercase mb-0.5">
              Est. Value
            </p>
            <p className="text-white font-black text-2xl leading-none">$2.5M</p>
            <span className="inline-block mt-1 bg-[#6EE53B]/15 text-[#6EE53B] text-[10px] font-bold px-2 py-0.5 rounded-full">
              +18% YoY
            </span>
          </div>
        </motion.div>

        {/* Bottom action strip */}
        <div className="bg-[#0e0e0e] px-6 py-3 flex items-center justify-between border-t border-white/5">
          <div className="flex -space-x-2">
            {["#e879f9", "#38bdf8", "#fb923c"].map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#0e0e0e]"
                style={{ background: c }}
              />
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-[#0e0e0e] bg-[#222] flex items-center justify-center text-[9px] text-white font-bold">
              +9
            </div>
          </div>
          <span className="text-[#666] text-xs">12 investors watching</span>
          <a
            href="#"
            className="text-[#6EE53B] text-xs font-bold hover:underline underline-offset-2"
          >
            View Plot →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
