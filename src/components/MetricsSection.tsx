"use client";

import React from "react";

interface Metric {
  label: string;
  value: string;
  desc: string;
}

interface MetricsSectionProps {
  metrics?: Metric[];
}

export const MetricsSection: React.FC<MetricsSectionProps> = ({
  metrics = [
    {
      label: "revenue",
      value: "$ 683K",
      desc: "The network's revenue last year.",
    },
    {
      label: "payback",
      value: "6 months",
      desc: "how long it takes the average partner to make their money back.",
    },
    {
      label: "geography",
      value: "12+",
      desc: "Locations open, with a steady stream of regulars.",
    },
    {
      label: "profit",
      value: "31%",
      desc: "Net margin — 7 points above the market average.",
    },
  ],
}) => {
  const leftMetrics = metrics.slice(0, 2);
  const rightMetrics = metrics.slice(2, 4);

  return (
    <section
      id="about"
      className="features"
      data-js-hero-model-features="true"
      data-js-hero-model-interaction="true"
      data-header-theme="dark"
    >
      <div className="features__inner container">
        <h2 className="features__title h4">
          Business in exact figures
        </h2>

        <div className="features__content">
          {/* Left Column Cards */}
          <ul className="features__list--left">
            {leftMetrics.map((item) => (
              <li key={item.label} className="features__item">
                <div className="features-card">
                  <div className="features-card__header">
                    <h3 className="features-card__caption descriptor">
                      {item.label}
                    </h3>
                  </div>
                  <div className="features-card__body">
                    <span className="features-card__number h5">
                      {item.value}
                    </span>
                    <p className="features-card__descri body-txt">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Right Column Cards */}
          <ul className="features__list--right">
            {rightMetrics.map((item) => (
              <li key={item.label} className="features__item">
                <div className="features-card">
                  <div className="features-card__header">
                    <h3 className="features-card__caption descriptor">
                      {item.label}
                    </h3>
                  </div>
                  <div className="features-card__body">
                    <span className="features-card__number h5">
                      {item.value}
                    </span>
                    <p className="features-card__descri body-txt">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
