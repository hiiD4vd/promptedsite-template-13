"use client";

import React from "react";

export const GallerySection: React.FC = () => {
  const images = [
    { src: "/assets/images/g1.sU9tJl7F_2cde9v.webp", span: "col-span-1 md:col-span-2 row-span-2" },
    { src: "/assets/images/g2.BwKl4wlZ_2aPwO4.webp", span: "col-span-1" },
    { src: "/assets/images/g3.CtcweCTQ_1AOL7Y.webp", span: "col-span-1" },
    { src: "/assets/images/g4.BoF-ydcw_1ze09Y.webp", span: "col-span-1" },
    { src: "/assets/images/G5.D4JBSIaP_1k82PI.webp", span: "col-span-1 md:col-span-2" },
    { src: "/assets/images/G6.CPO89AvM_1XfCIi.webp", span: "col-span-1" },
  ];

  return (
    <section className="relative z-10 w-full bg-[#101010] border-t border-[#222222]">
      <div className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono-accent text-xs uppercase tracking-widest text-[#e5ff24] block mb-2">
              // ATMOSPHERE
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Designed to Stand Out
            </h2>
          </div>
          <p className="text-sm text-[#888888] max-w-sm">
            Interiors tailored for urban photography, high retention, and efficient service ergonomics with PromptedSite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden border border-[#222222] bg-[#1a1a1a] group ${item.span}`}
            >
              <img
                src={item.src}
                alt="PromptedSite Location & Space"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
