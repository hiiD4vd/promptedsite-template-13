"use client";

import React from "react";

interface FormatData {
  id: string;
  num: string;
  title: string;
  desc: string;
  profit: string;
  footprint: string;
  investment: string;
  mainImage: string;
  minImage: string;
  bgColor: string;
}

export const FormatsSection: React.FC = () => {
  const formats: FormatData[] = [
    {
      id: "to-go",
      num: "01",
      title: "To go",
      desc: "The fastest way in, and it barely takes up any space.",
      profit: "$1,200/mo and up*",
      footprint: "2 m² and up",
      investment: "$16,800 and up*",
      mainImage: "/assets/images/1-1.DK5cjH-1_Z2wa1wW.webp",
      minImage: "/assets/images/1-2.zIAI48cL_1whFW2.webp",
      bgColor: "var(--color-ivory)",
    },
    {
      id: "lounge",
      num: "02",
      title: "LOUNGE",
      desc: "A coffee shop with a few seats and a pastry case.",
      profit: "$1,800/mo and up*",
      footprint: "30 m² and up",
      investment: "$22,800 and up*",
      mainImage: "/assets/images/2-1.D0FViOgX_G6u00.webp",
      minImage: "/assets/images/2-2.ChbEV32G_Zv8hsO.webp",
      bgColor: "var(--color-ivory)",
    },
    {
      id: "specialty",
      num: "03",
      title: "specialty",
      desc: "A full build with a kitchen and interiors people photograph.",
      profit: "$3,200/mo and up*",
      footprint: "from 60 m²",
      investment: "$36,000 and up*",
      mainImage: "/assets/images/3-1.CzlE4MZ2_1dMT6O.webp",
      minImage: "/assets/images/3-2.DdLEVeUx_1q7pWB.webp",
      bgColor: "var(--color-brown)",
    },
  ];

  return (
    <section
      id="formats"
      className="formats"
      data-header-theme="none"
      data-header-theme-mobile="dark"
      data-js-formats=""
      data-js-hero-model-formats=""
      data-js-hero-model-interaction=""
      style={{ "--formats-count": 3 } as React.CSSProperties}
    >
      <div className="formats__inner">
        {formats.map((fmt) => (
          <article
            key={fmt.id}
            className="format-slide"
            data-js-formats-slide=""
            style={{ "--format-slide-background": fmt.bgColor } as React.CSSProperties}
          >
            <div className="format-slide__reveal" data-js-formats-reveal="">
              <img
                alt={fmt.title}
                className="format-slide__image"
                decoding="async"
                height={860}
                loading="lazy"
                src={fmt.mainImage}
                width={660}
              />
              <div className="format-slide__content">
                <div className="format-slide__header">
                  <div className="format-slide__offer">
                    <h2 className="format-slide__title h3">{fmt.title}</h2>
                    <p className="format-slide__description txt-md">{fmt.desc}</p>
                    <a
                      href="#conditions"
                      className="button"
                      type="button"
                    >
                      <span aria-hidden="true" className="icon button__icon button__icon--start">
                        <svg className="icon__svg" fill="none" height="15" viewBox="0 0 9 15" width="9" xmlns="http://www.w3.org/2000/svg">
                          <circle className="icon__shape" cx="1.5" cy="1.5" fill="currentColor" r="1.5" />
                          <circle className="icon__shape" cx="1.5" cy="7.5" fill="currentColor" r="1.5" />
                          <circle className="icon__shape" cx="1.5" cy="13.5" fill="currentColor" r="1.5" />
                          <circle className="icon__shape" cx="4.5" cy="10.5" fill="currentColor" r="1.5" />
                          <circle className="icon__shape" cx="4.5" cy="4.5" fill="currentColor" r="1.5" />
                          <circle className="icon__shape" cx="7.5" cy="7.5" fill="currentColor" r="1.5" />
                        </svg>
                      </span>
                      <span className="button__label button__label--underlined txt-btn">
                        Apply now
                      </span>
                    </a>
                    <span className="format-slide__number txt-bold">
                      {fmt.num}
                      <span className="format-slide__number--light">/03</span>
                    </span>
                  </div>
                </div>

                <div className="format-slide__body">
                  <div className="format-slide__info">
                    <ul className="format-metrics">
                      <li className="format-metrics__item format-metrics__item--full">
                        <span className="format-metrics__caption txt-btn">
                          average profit
                        </span>
                        <span className="format-metrics__point txt-bold">
                          {fmt.profit}
                        </span>
                      </li>
                      <li className="format-metrics__item">
                        <span className="format-metrics__caption txt-btn">
                          footprint
                        </span>
                        <span className="format-metrics__point txt-bold">
                          {fmt.footprint}
                        </span>
                      </li>
                      <li className="format-metrics__item">
                        <span className="format-metrics__caption txt-btn">
                          Investment
                        </span>
                        <span className="format-metrics__point txt-bold">
                          {fmt.investment}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <img
                    alt={fmt.title}
                    className="format-slide__min-image"
                    decoding="async"
                    height={250}
                    loading="lazy"
                    src={fmt.minImage}
                    width={370}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
