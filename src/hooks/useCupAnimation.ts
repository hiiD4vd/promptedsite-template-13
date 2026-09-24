"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

class CameraParallax {
  private modelElement: any;
  private interactionElements: HTMLElement[];
  private options: {
    cameraPitch: number;
    cameraYaw: number;
    duration: number;
    ease: string;
    maxRotation: number;
  };
  private rotation = { x: 0, y: 0 };
  private rotateXTo?: (val: number) => void;
  private rotateYTo?: (val: number) => void;
  private reduceMotionMedia: MediaQueryList;
  private pointerMedia: MediaQueryList;

  constructor(modelElement: any, interactionElements: HTMLElement[], options = {}) {
    this.modelElement = modelElement;
    this.interactionElements = interactionElements;
    this.options = {
      cameraPitch: 75,
      cameraYaw: -20,
      duration: 0.8,
      ease: "power3.out",
      maxRotation: 15,
      ...options,
    };
    this.reduceMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.pointerMedia = window.matchMedia("(pointer: fine)");

    if (!this.pointerMedia.matches || this.reduceMotionMedia.matches) return;

    const { duration, ease } = this.options;
    this.rotateXTo = gsap.quickTo(this.rotation, "x", {
      duration,
      ease,
      onUpdate: this.onRotationUpdate,
    });
    this.rotateYTo = gsap.quickTo(this.rotation, "y", {
      duration,
      ease,
      onUpdate: this.onRotationUpdate,
    });

    this.bindEvents();
  }

  private onRotationUpdate = () => {
    const { cameraYaw, cameraPitch } = this.options;
    this.modelElement?.setAttribute(
      "camera-orbit",
      `${(cameraYaw + this.rotation.y).toFixed(2)}deg ${(cameraPitch + this.rotation.x).toFixed(2)}deg auto`
    );
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.modelElement?.loaded || e.pointerType !== "mouse" || this.reduceMotionMedia.matches) return;
    const target = (e.currentTarget as HTMLElement) || document.body;
    if (!target || typeof target.getBoundingClientRect !== "function") return;
    const rect = target.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const r = gsap.utils.clamp(-1, 1, ((e.clientX - rect.left) / rect.width) * 2 - 1);
    const i = gsap.utils.clamp(-1, 1, ((e.clientY - rect.top) / rect.height) * 2 - 1);
    const { maxRotation } = this.options;

    this.rotateXTo?.(-i * maxRotation);
    this.rotateYTo?.(r * maxRotation);
  };

  private onPointerLeave = () => {
    if (this.modelElement?.loaded) {
      this.rotateXTo?.(0);
      this.rotateYTo?.(0);
    }
  };

  private bindEvents() {
    this.interactionElements.forEach((el) => {
      el.addEventListener("pointermove", this.onPointerMove as EventListener);
      el.addEventListener("pointerleave", this.onPointerLeave as EventListener);
    });
  }

  public destroy() {
    this.interactionElements.forEach((el) => {
      el.removeEventListener("pointermove", this.onPointerMove as EventListener);
      el.removeEventListener("pointerleave", this.onPointerLeave as EventListener);
    });
  }
}

class HeroModel {
  private rootElement: HTMLElement;
  private modelElement: any;
  private featuresElement: HTMLElement | null;
  private formatsElement: HTMLElement | null;
  private interactionElements: HTMLElement[];
  private isModelLoaded = false;
  private cupMaterials: any[] = [];
  private frontLogoMaterial: any = null;
  private backLogoMaterial: any = null;
  private frontLogoColor: number[] = [1, 1, 1, 1];
  private backLogoColor: number[] = [1, 1, 1, 1];
  private lastExitOffsetY: number | null = null;
  private lastModelUpdateTime = 0;
  private modelUpdateTimer: number | null = null;
  private pendingModelState: any = null;
  private lastModelState = {
    backLogoOpacity: null as number | null,
    color: null as string | null,
    frontLogoOpacity: null as number | null,
    rotation: null as number | null,
  };
  private scrollAnimation = {
    backLogoOpacity: 0,
    color: "",
    exitOffsetY: 0,
    exitRotation: 0,
    frontLogoOpacity: 1,
    rotation: 0,
  };
  private scrollTimeline?: gsap.core.Timeline;
  private exitScrollTimeline?: gsap.core.Timeline;
  private exitScrollMedia?: gsap.MatchMedia;
  private cameraParallax?: CameraParallax;

  private animation = {
    scrollRotation: 180,
    exitScrollRotation: 360,
    scrollScrub: true,
    exitOffsetStart: 0.35,
    offscreenGap: 20,
    flatMaxWidth: 768,
    modelFrameDuration: 1000 / 30,
  };

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.modelElement = this.rootElement.querySelector("[data-js-hero-model-view]");
    this.featuresElement = this.rootElement.querySelector("[data-js-hero-model-features]");
    this.formatsElement = document.querySelector("[data-js-hero-model-formats]");
    this.interactionElements = Array.from(
      this.rootElement.querySelectorAll("[data-js-hero-model-interaction]")
    );

    if (this.interactionElements.length === 0) {
      const hero = this.rootElement.querySelector<HTMLElement>(".hero");
      const features = this.rootElement.querySelector<HTMLElement>(".features");
      this.interactionElements = [hero, features, this.rootElement].filter(Boolean) as HTMLElement[];
    }

    this.init();
  }

  private onModelLoad = () => {
    if (this.isModelLoaded) return;
    this.isModelLoaded = true;
    this.initLogoMaterials();
    this.setInitialCupColor();
    this.initScrollAnimation();
    this.initExitScrollAnimation();
  };

  private onScrollAnimationUpdate = () => {
    const exitY = Math.round(this.scrollAnimation.exitOffsetY * 100) / 100;
    if (exitY !== this.lastExitOffsetY) {
      this.lastExitOffsetY = exitY;
      this.modelElement?.style.setProperty("--hero-model-exit-y", `${exitY}px`);
    }

    this.pendingModelState = {
      backLogoOpacity: Math.round(this.scrollAnimation.backLogoOpacity * 1000) / 1000,
      color: this.scrollAnimation.color,
      frontLogoOpacity: Math.round(this.scrollAnimation.frontLogoOpacity * 1000) / 1000,
      rotation: Math.round((this.scrollAnimation.rotation + this.scrollAnimation.exitRotation) * 100) / 100,
    };
    this.requestModelUpdate();
  };

  private requestModelUpdate() {
    const elapsed = performance.now() - this.lastModelUpdateTime;
    const remaining = this.animation.modelFrameDuration - elapsed;
    if (remaining <= 0) {
      this.applyModelState();
      return;
    }
    if (!this.modelUpdateTimer) {
      this.modelUpdateTimer = window.setTimeout(() => {
        this.modelUpdateTimer = null;
        this.applyModelState();
      }, remaining);
    }
  }

  private applyModelState() {
    if (!this.pendingModelState || !this.modelElement) return;
    const { backLogoOpacity, color, frontLogoOpacity, rotation } = this.pendingModelState;
    this.lastModelUpdateTime = performance.now();

    if (rotation !== this.lastModelState.rotation) {
      this.lastModelState.rotation = rotation;
      this.modelElement.setAttribute("orientation", `0deg 0deg ${rotation}deg`);
    }

    if (color && color !== this.lastModelState.color) {
      this.lastModelState.color = color;
      this.setCupColor(color);
    }

    if (frontLogoOpacity !== this.lastModelState.frontLogoOpacity) {
      this.lastModelState.frontLogoOpacity = frontLogoOpacity;
      this.setLogoOpacity(this.frontLogoMaterial, this.frontLogoColor, frontLogoOpacity);
    }

    if (backLogoOpacity !== this.lastModelState.backLogoOpacity) {
      this.lastModelState.backLogoOpacity = backLogoOpacity;
      this.setLogoOpacity(this.backLogoMaterial, this.backLogoColor, backLogoOpacity);
    }
  }

  private getOffscreenOffset() {
    const height = this.modelElement?.getBoundingClientRect?.().height || 500;
    return (window.innerHeight + height) / 2 + this.animation.offscreenGap;
  }

  private getColor(varName: string) {
    const c = getComputedStyle(this.rootElement).getPropertyValue(varName).trim();
    if (c) return c;
    if (varName === "--color-white") return "#faf8f5";
    if (varName === "--color-green") return "#afab8e";
    return "";
  }

  private setCupColor(color: string) {
    if (color && this.cupMaterials) {
      this.cupMaterials.forEach((mat) => {
        try {
          mat?.pbrMetallicRoughness?.setBaseColorFactor(color);
        } catch {}
      });
    }
  }

  private setLogoOpacity(material: any, baseColor: number[], opacity: number) {
    if (!material || !baseColor) return;
    try {
      const rgba = [baseColor[0] ?? 1, baseColor[1] ?? 1, baseColor[2] ?? 1, opacity];
      material.pbrMetallicRoughness?.setBaseColorFactor(rgba);
    } catch {}
  }

  private setInitialCupColor() {
    const white = this.getColor("--color-white") || "#faf8f5";
    this.scrollAnimation.color = white;
    this.lastModelState.color = white;
    this.setCupColor(white);
  }

  private initLogoMaterials() {
    const model = this.modelElement?.model;
    if (!model) return;

    try {
      this.cupMaterials = ["Paper", "Cup Edge"]
        .map((name) => model.getMaterialByName(name))
        .filter(Boolean);

      this.frontLogoMaterial = model.getMaterialByName("Cup Logo Material");
      this.backLogoMaterial = model.getMaterialByName("Cup Back Logo Material");

      if (this.frontLogoMaterial) {
        const factor = this.frontLogoMaterial.pbrMetallicRoughness?.baseColorFactor;
        if (factor && Array.isArray(factor)) this.frontLogoColor = [...factor];
        this.frontLogoMaterial.setAlphaMode?.("BLEND");
      }

      if (this.backLogoMaterial) {
        const factor = this.backLogoMaterial.pbrMetallicRoughness?.baseColorFactor;
        if (factor && Array.isArray(factor)) this.backLogoColor = [...factor];
        this.backLogoMaterial.setAlphaMode?.("BLEND");
      }

      this.setLogoOpacity(this.frontLogoMaterial, this.frontLogoColor, 1);
      this.setLogoOpacity(this.backLogoMaterial, this.backLogoColor, 0);

      this.lastModelState.frontLogoOpacity = 1;
      this.lastModelState.backLogoOpacity = 0;
    } catch (err) {
      console.warn("Failed to init logo materials:", err);
    }
  }

  private initScrollAnimation() {
    if (!this.featuresElement || this.scrollTimeline) return;
    const white = this.getColor("--color-white") || "#faf8f5";
    const green = this.getColor("--color-green") || "#afab8e";

    this.scrollTimeline = gsap.timeline({
      onUpdate: this.onScrollAnimationUpdate,
      scrollTrigger: {
        trigger: this.featuresElement,
        start: "top bottom",
        end: "top top",
        scrub: this.animation.scrollScrub,
        invalidateOnRefresh: true,
      },
    });

    this.scrollTimeline
      .fromTo(
        this.scrollAnimation,
        { color: white, rotation: 0 },
        { color: green, duration: 1, ease: "none", rotation: this.animation.scrollRotation },
        0
      )
      .fromTo(
        this.scrollAnimation,
        { frontLogoOpacity: 1 },
        { duration: 0.5, ease: "none", frontLogoOpacity: 0 },
        0
      )
      .fromTo(
        this.scrollAnimation,
        { backLogoOpacity: 0 },
        { backLogoOpacity: 1, duration: 0.5, ease: "none" },
        0.5
      );

    ScrollTrigger.refresh();
  }

  private initExitScrollAnimation() {
    if (!this.formatsElement || this.exitScrollMedia) return;
    this.exitScrollMedia = gsap.matchMedia();
    this.exitScrollMedia.add("(min-width: 768px)", () => {
      this.exitScrollTimeline = gsap.timeline({
        onUpdate: this.onScrollAnimationUpdate,
        scrollTrigger: {
          trigger: this.featuresElement,
          start: "top top",
          endTrigger: this.formatsElement,
          end: "top top",
          scrub: this.animation.scrollScrub,
          invalidateOnRefresh: true,
        },
      });

      this.exitScrollTimeline
        .fromTo(
          this.scrollAnimation,
          { exitRotation: 0 },
          {
            duration: 1,
            ease: "none",
            exitRotation: this.animation.exitScrollRotation - this.animation.scrollRotation,
            immediateRender: false,
          },
          0
        )
        .fromTo(
          this.scrollAnimation,
          { exitOffsetY: 0 },
          {
            duration: 1 - this.animation.exitOffsetStart,
            ease: "none",
            exitOffsetY: () => this.getOffscreenOffset(),
            immediateRender: false,
          },
          this.animation.exitOffsetStart
        );

      ScrollTrigger.refresh();

      return () => {
        this.exitScrollTimeline?.scrollTrigger?.kill();
        this.exitScrollTimeline?.kill();
        this.exitScrollTimeline = undefined;
        this.scrollAnimation.exitOffsetY = 0;
        this.scrollAnimation.exitRotation = 0;
        this.modelElement?.style.removeProperty("--hero-model-exit-y");
      };
    });
  }

  private isFlat() {
    return window.innerWidth < this.animation.flatMaxWidth;
  }

  public async init() {
    if (!this.modelElement || this.isFlat()) return;

    if (typeof customElements !== "undefined") {
      await customElements.whenDefined("model-viewer");
    }

    if (this.modelElement.loaded) {
      this.onModelLoad();
    } else {
      this.modelElement.addEventListener("load", this.onModelLoad);
    }

    this.cameraParallax = new CameraParallax(this.modelElement, this.interactionElements);
  }

  public destroy() {
    if (this.modelUpdateTimer) {
      window.clearTimeout(this.modelUpdateTimer);
    }
    this.cameraParallax?.destroy();
    this.modelElement?.removeEventListener("load", this.onModelLoad);
    this.scrollTimeline?.scrollTrigger?.kill();
    this.scrollTimeline?.kill();
    this.exitScrollTimeline?.scrollTrigger?.kill();
    this.exitScrollTimeline?.kill();
    this.exitScrollMedia?.revert();
    this.modelElement?.style.removeProperty("--hero-model-exit-y");
  }
}

class CupSection {
  private rootElement: HTMLElement;
  private modelElement: any;
  private isModelLoaded = false;
  private metrics: { enterEnd: number; exitStart: number; offscreenOffset: number } | null = null;
  private lastOffset: number | null = null;
  private lastRotation: number | null = null;
  private lastModelUpdateTime = 0;
  private pendingRotation: number;
  private modelUpdateTimer: number | null = null;
  private scrollTrigger?: ScrollTrigger;
  private cameraParallax?: CameraParallax;

  private materialNames = {
    cup: ["Paper", "Cup Edge"],
    logo: ["Cup Logo Material", "Cup Back Logo Material"],
  };

  private animation = {
    logoRotation: 350,
    spin: 360,
    offscreenGap: 20,
    flatMaxWidth: 768,
    modelFrameDuration: 1000 / 30,
  };

  get startRotation() {
    return this.animation.logoRotation - this.animation.spin / 2; // 170
  }

  get endRotation() {
    return this.animation.logoRotation + this.animation.spin / 2; // 530
  }

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    this.modelElement = rootElement.querySelector("[data-js-cup-view]");
    this.pendingRotation = this.startRotation;
    this.init();
  }

  private onModelLoad = () => {
    if (this.isModelLoaded) return;
    this.isModelLoaded = true;
    this.applyCupColor();
    this.applyLogo();
  };

  private onScrollTriggerUpdate = (self: ScrollTrigger) => {
    if (!this.metrics) this.updateMetrics();
    this.render(self.progress);
  };

  private onScrollTriggerRefresh = (self: ScrollTrigger) => {
    this.updateMetrics();
    this.onScrollTriggerUpdate(self);
  };

  private render(progress: number) {
    if (!this.metrics) return;
    const offset = Math.round(this.getOffsetAt(progress) * 100) / 100;
    if (offset !== this.lastOffset) {
      this.lastOffset = offset;
      this.modelElement?.style.setProperty("--cup-offset-y", `${offset}px`);
    }
    this.requestModelRotation(this.getRotationAt(progress));
  }

  private isFlat() {
    const maxW = Number(this.rootElement.dataset.cupFlatMaxWidth) || this.animation.flatMaxWidth;
    return window.innerWidth < maxW;
  }

  private requestModelRotation(rotation: number) {
    this.pendingRotation = Math.round(rotation * 100) / 100;
    const elapsed = performance.now() - this.lastModelUpdateTime;
    const remaining = this.animation.modelFrameDuration - elapsed;
    if (remaining <= 0) {
      this.applyModelRotation();
      return;
    }
    if (!this.modelUpdateTimer) {
      this.modelUpdateTimer = window.setTimeout(() => {
        this.modelUpdateTimer = null;
        this.applyModelRotation();
      }, remaining);
    }
  }

  private applyModelRotation() {
    if (this.pendingRotation !== this.lastRotation) {
      this.lastRotation = this.pendingRotation;
      this.lastModelUpdateTime = performance.now();
      this.modelElement?.setAttribute("orientation", `0deg 0deg ${this.lastRotation}deg`);
    }
  }

  private getMaterial(name: string) {
    return this.modelElement?.model?.getMaterialByName(name);
  }

  private applyCupColor() {
    const colorVar = this.rootElement.dataset.cupColor;
    if (!colorVar) return;
    const color = getComputedStyle(this.rootElement).getPropertyValue(colorVar).trim();
    if (color) {
      this.materialNames.cup.forEach((name) => {
        try {
          this.getMaterial(name)?.pbrMetallicRoughness?.setBaseColorFactor(color);
        } catch {}
      });
    }
  }

  private async applyLogo() {
    const logoUrl = this.rootElement.dataset.cupLogo;
    if (!logoUrl || !this.modelElement?.createTexture) return;
    try {
      const texture = await this.modelElement.createTexture(logoUrl);
      if (texture) {
        this.materialNames.logo.forEach((name) => {
          const mat = this.getMaterial(name);
          mat?.setAlphaMode?.("BLEND");
          mat?.pbrMetallicRoughness?.baseColorTexture?.setTexture(texture);
        });
      }
    } catch (err) {
      console.warn("Failed to apply logo texture:", err);
    }
  }

  private getFlightRange(n: number) {
    return {
      enterEnd: Math.min(n, 0.5),
      exitStart: Math.max(1 - n, 0.5),
    };
  }

  private getOffsetAt(progress: number) {
    if (!this.metrics) return 0;
    const { enterEnd, exitStart, offscreenOffset } = this.metrics;
    if (progress <= enterEnd) {
      return gsap.utils.interpolate(-offscreenOffset, 0, progress / enterEnd);
    }
    if (progress >= exitStart) {
      return gsap.utils.interpolate(0, offscreenOffset, (progress - exitStart) / (1 - exitStart));
    }
    return 0;
  }

  private getRotationAt(progress: number) {
    return gsap.utils.interpolate(this.startRotation, this.endRotation, progress);
  }

  private updateMetrics() {
    const innerH = window.innerHeight;
    const modelH = this.modelElement?.getBoundingClientRect?.().height || innerH * 0.7;
    const totalH = this.rootElement.offsetHeight + innerH;
    const n = innerH / totalH;
    const { enterEnd, exitStart } = this.getFlightRange(n);
    this.metrics = {
      enterEnd,
      exitStart,
      offscreenOffset: (innerH + modelH) / 2 + this.animation.offscreenGap,
    };
  }

  private initScrollAnimation() {
    if (this.scrollTrigger) return;
    this.updateMetrics();
    this.render(0);
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.rootElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: this.onScrollTriggerUpdate,
      onRefresh: this.onScrollTriggerRefresh,
      onLeave: this.onScrollTriggerUpdate,
      onLeaveBack: this.onScrollTriggerUpdate,
    });
  }

  public async init() {
    if (!this.modelElement || this.isFlat()) return;

    if (typeof customElements !== "undefined") {
      await customElements.whenDefined("model-viewer");
    }

    this.initScrollAnimation();

    if (this.modelElement.loaded) {
      this.onModelLoad();
    } else {
      this.modelElement.addEventListener("load", this.onModelLoad);
    }

    this.cameraParallax = new CameraParallax(this.modelElement, [this.rootElement]);
  }

  public destroy() {
    this.modelElement?.removeEventListener("load", this.onModelLoad);
    if (this.modelUpdateTimer) window.clearTimeout(this.modelUpdateTimer);
    this.cameraParallax?.destroy();
    this.scrollTrigger?.kill();
  }
}

function initPackageImageAnimations() {
  const images = gsap.utils.toArray<HTMLElement>("[data-js-package-image]");
  if (images.length === 0) return () => {};

  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const isDesktop = window.innerWidth >= 1024;
    const scale = isDesktop ? 370 / 240 : 240 / 135;
    const triggers: ScrollTrigger[] = [];

    images.forEach((img) => {
      const tween = gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale,
          ease: "none",
          transformOrigin: "100% 100%",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  });

  return () => {
    mm.revert();
  };
}

function initFormatsAnimations() {
  const formatsEl = document.querySelector<HTMLElement>("[data-js-formats]");
  if (!formatsEl) return () => {};

  const slides = Array.from(formatsEl.querySelectorAll<HTMLElement>("[data-js-formats-slide]"));
  if (slides.length < 2) return () => {};

  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline();
    slides.slice(1).forEach((slide, idx) => {
      const reveal = slide.querySelector<HTMLElement>("[data-js-formats-reveal]");
      if (reveal) {
        tl.fromTo(slide, { yPercent: 100 }, { duration: 1, ease: "none", yPercent: 0 }, idx)
          .fromTo(reveal, { yPercent: -100 }, { duration: 1, ease: "none", yPercent: 0 }, idx);
      }
    });

    const st = ScrollTrigger.create({
      trigger: formatsEl,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      animation: tl,
      invalidateOnRefresh: true,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  });

  return () => {
    mm.revert();
  };
}

export function useCupAnimation(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // 1. Hero Cup Model
    const heroRoots = Array.from(document.querySelectorAll<HTMLElement>("[data-js-hero-model]"));
    const heroModels = heroRoots.map((el) => new HeroModel(el));

    // 2. Package Cup Sections
    const cupSectionRoots = Array.from(document.querySelectorAll<HTMLElement>("[data-js-cup-section]"));
    const cupSections = cupSectionRoots.map((el) => new CupSection(el));

    // 3. Package images scroll zoom
    const cleanupPackageImages = initPackageImageAnimations();

    // 4. Formats Curtain Reveal
    const cleanupFormats = initFormatsAnimations();

    // Refresh ScrollTrigger after elements are mounted
    ScrollTrigger.refresh();

    return () => {
      heroModels.forEach((m) => m.destroy());
      cupSections.forEach((c) => c.destroy());
      cleanupPackageImages();
      cleanupFormats();
    };
  }, [enabled]);
}
