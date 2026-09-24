"use client";

import React from "react";

export const BenefitsSection: React.FC = () => {
  const cards = [
    {
      img: "/assets/images/b1-card.BoM7ZWVn_1eJC2n.webp",
      tag: "TRAFFIC",
      title: "Prime Footfall Selection",
      desc: "Comprehensive foot-traffic scoring algorithms ensure every site opens in locations guaranteed to generate immediate sales.",
    },
    {
      img: "/assets/images/b2-card.0FRjW-LZ_Zhmotk.webp",
      tag: "SUPPLY CHAIN",
      title: "Direct Network Deliveries",
      desc: "Centralized distribution hubs ship freshly roasted beans, syrups, and PromptedSite eco packaging with zero retail markup.",
    },
    {
      img: "/assets/images/b3-card.CKrtefkC_Z1bo6rp.webp",
      tag: "LOYALTY",
      title: "High Customer Lifetime Value",
      desc: "Proprietary PromptedSite digital loyalty and seamless cashless ordering convert casual passersby into daily recurring regulars.",
    },
  ];

  return (
    <section className="relative z-10 w-full bg-[#101010] border-t border-[#222222]">
      <div className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="font-mono-accent text-xs uppercase tracking-widest text-[#e5ff24] block mb-2">
            // ADVANTAGES
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Engineered for Profit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#141414] border border-[#222222] rounded-3xl overflow-hidden hover:border-[#383838] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1e1e1e]">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-4 left-4 font-mono-accent text-[10px] tracking-widest px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[#e5ff24] uppercase border border-white/10">
                  {c.tag}
                </span>
              </div>
              <div className="p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight mb-3">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8e8e8e] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
