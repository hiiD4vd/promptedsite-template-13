"use client";

import React, { useEffect, useRef } from "react";

interface CupSequenceCanvasProps {
  frameCount?: number;
  className?: string;
}

export const CupSequenceCanvas: React.FC<CupSequenceCanvasProps> = ({
  frameCount = 60,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (targetW > 0 && targetH > 0 && (canvas.width !== targetW || canvas.height !== targetH)) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvas.width / canvas.height;

      let drawW, drawH, drawX, drawY;
      if (imgAspect > canvasAspect) {
        drawW = canvas.width;
        drawH = canvas.width / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * imgAspect;
        drawX = (canvas.width - drawW) / 2;
        drawY = (canvas.height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/mobile_cups/${String(i).padStart(3, "0")}.webp`;
      if (i === 0) {
        img.onload = () => drawFrame(0);
      }
      images.push(img);
    }

    imagesRef.current = images;

    let rafId: number;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollMax = 1600;
      const progress = Math.min(1, Math.max(0, scrollY / scrollMax));
      const targetIndex = Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;
        rafId = requestAnimationFrame(() => drawFrame(targetIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => drawFrame(currentFrameRef.current));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [frameCount]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Instant fallback cup image */}
      <img
        src="/mobile_cups/000.webp"
        alt="PromptedSite Signature 3D Cup"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      />
      {/* Interactive scroll-scrub canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full object-contain pointer-events-none select-none"
      />
    </div>
  );
};
