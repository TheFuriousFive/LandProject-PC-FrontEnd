"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroLeft() {
  return (
    <motion.div
      className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Tag */}
      <motion.div variants={itemVariants} className="mb-5">
        <span className="inline-flex items-center gap-2 bg-[#111] text-[#6EE53B] text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-full border border-[#6EE53B]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6EE53B] animate-pulse" />
          The Future of Real Estate
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] leading-[1.05] font-black text-[#0e0e0e] mb-3"
      >
        Invest in the Earth.
      </motion.h1>
      <motion.h1
        variants={itemVariants}
        className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] leading-[1.05] font-black text-[#6EE53B] mb-6"
        style={{ WebkitTextStroke: "0px" }}
      >
        Grow Your Wealth.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={itemVariants}
        className="text-[#555] text-base sm:text-lg leading-relaxed max-w-md mb-10"
      >
        The modern platform connecting visionary investors with premium land
        opportunities. Secure, transparent, and government-verified.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#"
          className="group relative inline-flex items-center justify-center gap-2 bg-[#6EE53B] hover:bg-[#5acc2e] text-[#0e0e0e] font-bold text-sm tracking-wide px-7 py-4 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(110,229,59,0.35)] hover:shadow-[0_6px_28px_rgba(110,229,59,0.55)] hover:-translate-y-0.5 active:translate-y-0"
        >
          Start Investing
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>

        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] text-white font-bold text-sm tracking-wide px-7 py-4 rounded-xl transition-all duration-200 border border-[#2e2e2e] hover:border-[#444] hover:-translate-y-0.5 active:translate-y-0"
        >
          List Your Land
        </a>
      </motion.div>

      {/* Trust badges */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-[#e5e5e5]"
      >
        {[
          { value: "12K+", label: "Active Investors" },
          { value: "$480M", label: "Assets Listed" },
          { value: "99.8%", label: "Verified Plots" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-[#0e0e0e] font-black text-lg leading-none">
              {stat.value}
            </span>
            <span className="text-[#999] text-xs mt-0.5">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
