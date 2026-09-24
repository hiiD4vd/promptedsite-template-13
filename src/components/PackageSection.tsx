"use client";

import React, { useState, useEffect } from "react";

export const PackageSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Signature menu & digital operating standards",
      desc: "A ready-to-use digital process base with seasonal drink updates, partner guides, and cost-control matrices for PromptedSite locations.",
      img: "/assets/images/p1.BGvPzmJP_1f8bfy.webp",
      imgH: 382,
    },
    {
      num: "02",
      title: "Location analytics & turnkey space design",
      desc: "We analyze foot-traffic heatmaps, negotiate favorable leases, and provide architectural & ergonomic drawings tailored to the PromptedSite aesthetic.",
      img: "/assets/images/p2.DSvxVly-_ZvikMv.webp",
      imgH: 376,
    },
    {
      num: "03",
      title: "Team certification & executive training",
      desc: "A comprehensive certification program training baristas, shift supervisors, and managers with PromptedSite standard operating procedures.",
      img: "/assets/images/p3.DAwJGjd__1LzWHM.webp",
      imgH: 380,
    },
    {
      num: "04",
      title: "Commercial hardware & opening inventory",
      desc: "Direct supplier delivery of commercial espresso machinery, digital point-of-sale setups, refrigeration, and opening supplies.",
      img: "/assets/images/p4.Q3uqD1G2_1qXb8Q.webp",
      imgH: 380,
    },
    {
      num: "05",
      title: "Centralized supply chain & procurement",
      desc: "Substantial volume discounts on specialty beans, eco-packaging, cups, and branded supplies negotiated across the PromptedSite partner network.",
      img: "/assets/images/p5.D-IcMiFg_Z245GdO.webp",
      imgH: 380,
    },
  ];

  return (
    <div
      className="cup-section cup-section--flat-to-768"
      data-cup-color="--color-ivory"
      data-cup-flat-max-width="768"
      data-cup-logo="/models/logo-cup-3.webp"
      data-js-cup-section=""
    >
      <div className="cup-section__layer">
        <div className="cup-section__sticky">
          {isMounted && (
            <model-viewer
              className="cup-section__model"
              data-js-cup-view=""
              src="/models/cup.glb"
              alt="3D model of a branded PromptedSite coffee cup"
              camera-orbit="-20deg 75deg auto"
              field-of-view="30deg"
              interaction-prompt="none"
              orientation="0deg 0deg 170deg"
              shadow-intensity="0"
              loading="eager"
              suppressHydrationWarning
            />
          )}
        </div>
      </div>

      <section className="package" data-header-theme="dark">
        <div className="package__inner container">
          <div className="package__header">
            <h2 className="package__title h4">
              We set the whole thing up
            </h2>
            <p className="package__description txt-md">
              We provide proven tools, standards and years of team experience for a confident launch.
            </p>
          </div>

          <img
            alt="PromptedSite Turnkey Package Cup"
            className="cup-still package__cup"
            decoding="async"
            height={275}
            loading="lazy"
            src="/assets/images/cup-package.DQXG5dM6_1nxeUW.webp"
            width={220}
          />

          <div className="package__content">
            <ul className="package__list">
              {steps.map((item) => (
                <li key={item.num} className="package__item">
                  <div className="package-item">
                    <div className="package-item__content">
                      <span className="package-item__counter descriptor">
                        {item.num}
                      </span>
                      <div className="package-item__text">
                        <h3 className="package-item__title txt-bold">
                          {item.title}
                        </h3>
                        <p className="package-item__description">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <img
                      alt={item.title}
                      className="package-item__image"
                      data-js-package-image="true"
                      decoding="async"
                      height={item.imgH}
                      loading="lazy"
                      src={item.img}
                      width={740}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
