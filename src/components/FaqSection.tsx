"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "01. How much space do I need, and how do I pick the right spot?",
      a: "Depending on your selected format, footprint ranges from 2 m² (compact To Go island) up to 60+ m² (Specialty lounge with kitchen). Our PromptedSite location analytics team conducts foot-traffic heatmapping and competitor analysis to vet your lease before signing.",
    },
    {
      q: "02. Does all of that really fit into small modular footprints?",
      a: "Yes. Our bespoke PromptedSite stations are custom-engineered for extreme spatial efficiency. Coffee machines, under-counter cooling units, water filtration, and POS terminals are integrated modularly so your team operates at maximum speed.",
    },
    {
      q: "03. Where does a PromptedSite location generate revenue?",
      a: "High gross margins on specialty espresso drinks (up to 75-80% product margin), proprietary digital loyalty rewards, curated food cross-sells, and high-frequency recurring traffic from office and transit hubs.",
    },
    {
      q: "04. How fast does a new PromptedSite partner achieve profitability?",
      a: "On average, PromptedSite partner locations break even on operational expenses within the first 1–2 months, with capital recovery typically reached between 6 to 10 months depending on location tier.",
    },
    {
      q: "05. Can I open a PromptedSite location without prior hospitality experience?",
      a: "Over 70% of PromptedSite franchise partners had zero hospitality experience. We train you and your team on everything: recipe preparation, equipment calibration, hygiene standards, inventory ERP, and team management.",
    },
  ];

  return (
    <section id="faq" className="relative z-10 w-full bg-[#101010] border-t border-[#222222]">
      <div className="py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <span className="font-mono-accent text-xs uppercase tracking-widest text-[#e5ff24] block mb-2">
            // QUESTIONS & ANSWERS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-[#141414] border border-[#222222] rounded-2xl overflow-hidden hover:border-[#333333] transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 group"
              >
                <span className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-[#e5ff24] transition-colors">
                  {faq.q}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full bg-[#202020] flex items-center justify-center text-white text-lg font-mono-accent transition-transform duration-200">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-sm text-[#8e8e8e] leading-relaxed border-t border-[#1d1d1d]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};
