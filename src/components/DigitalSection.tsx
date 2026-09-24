"use client";

import React from "react";
import { motion } from "framer-motion";

export const DigitalSection: React.FC = () => {
  return (
    <section className="relative z-10 w-full bg-[#101010] border-t border-[#222222] overflow-hidden">
      <div className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-[#141414] border border-[#222222] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e5ff24]/5 blur-[140px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text */}
            <div className="lg:col-span-7">
              <span className="font-mono-accent text-xs uppercase tracking-widest text-[#e5ff24] block mb-3">
                // DIGITAL ECOSYSTEM
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-[1.08] mb-6">
                We don&apos;t just build sites. We set digital trends.
              </h2>
              <p className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-8 max-w-xl">
                Proprietary PromptedSite software integrates analytics, CRM, and automated client acquisition. The system monitors performance KPIs, tracks revenue streams, and scales your territory seamlessly.
              </p>

            <div className="grid grid-cols-2 gap-6 border-t border-[#262626] pt-6 max-w-lg">
              <div>
                <div className="font-display font-bold text-2xl text-white">0%</div>
                <div className="text-xs text-[#777777] mt-1">Manual inventory errors</div>
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-[#e5ff24]">24/7</div>
                <div className="text-xs text-[#777777] mt-1">Cloud analytics & POS metrics</div>
              </div>
            </div>
          </div>

          {/* Right Phone Video Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[44px] p-3 bg-[#222222] shadow-2xl border-4 border-[#333333] overflow-hidden"
            >
              {/* Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20" />

              {/* Video Player */}
              <video
                src="/smartphone.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[34px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
