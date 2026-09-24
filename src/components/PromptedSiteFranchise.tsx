"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { MetricsSection } from "./MetricsSection";
import { FormatsSection } from "./FormatsSection";
import { PackageSection } from "./PackageSection";
import { TermsSection } from "./TermsSection";
import { DigitalSection } from "./DigitalSection";
import { BenefitsSection } from "./BenefitsSection";
import { GallerySection } from "./GallerySection";
import { FaqSection } from "./FaqSection";
import { CupSequenceCanvas } from "./CupSequenceCanvas";
import { PromptedSiteProps } from "../types";
import { useCupAnimation } from "../hooks/useCupAnimation";

export const PromptedSiteFranchise: React.FC<PromptedSiteProps> = ({
  config,
  onApplySubmit,
  isSplitView = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useCupAnimation(isMounted);

  return (
    <div className={`min-h-screen text-[var(--color-ivory)] ${isSplitView ? "max-w-[440px] mx-auto border-x border-[#222222]" : ""}`}>
      {/* 1. Header Navigation */}
      <Header />

      <main id="top">
        {/* Sticky Hero Transition Container (wraps Hero, Metrics, and Formats) */}
        <div className="hero-transition" data-js-hero-model>
          {/* Centered Sticky 3D Cup Model Layer */}
          <div className="hero-transition__model-layer">
            <div className="hero-transition__model-sticky">
              {isMounted && (
                <model-viewer
                  className="hero-transition__model"
                  src="/models/cup.glb"
                  alt="3D model of a PromptedSite coffee cup"
                  camera-orbit="-20deg 75deg auto"
                  field-of-view="30deg"
                  interaction-prompt="none"
                  orientation="0deg 0deg 0deg"
                  shadow-intensity="0"
                  loading="eager"
                  data-js-hero-model-view="true"
                  suppressHydrationWarning
                />
              )}
              <div className="md:hidden">
                <CupSequenceCanvas
                  frameCount={60}
                  className="w-[280px] h-[360px]"
                />
              </div>
            </div>
          </div>

          {/* 2. Hero Section */}
          <HeroSection
            headline={config?.headline}
            netProfitHighlight={config?.netProfitHighlight}
            revenueHighlight={config?.revenueHighlight}
          />

          {/* 3. Metrics Section */}
          <MetricsSection metrics={config?.metrics} />

          {/* 4. Franchise Formats */}
          <FormatsSection />
        </div>

        {/* 5. 5-Step Turnkey Package */}
        <PackageSection />

        {/* 6. Financial Terms & Open Economics */}
        <TermsSection />

        {/* 7. Digital Trends & Video Showcase */}
        <DigitalSection />

        {/* 8. Business Benefits */}
        <BenefitsSection />

        {/* 9. Real Store Atmosphere Gallery */}
        <GallerySection />

        {/* 10. FAQs Accordion */}
        <FaqSection />
      </main>
    </div>
  );
};
