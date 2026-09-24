"use client";

import React from "react";

export const TermsSection: React.FC = () => {
  const terms = [
    {
      num: "01.",
      label: "Investment",
      value: "$21,600 and up",
      desc: "Starting capital for a complete launch, equipment procurement, and interior renovation.",
    },
    {
      num: "02.",
      label: "Upfront fee",
      value: "$4,700",
      desc: "The one-time entry fee giving you direct PromptedSite brand rights, systems, and dedicated launch mentorship.",
    },
    {
      num: "03.",
      label: "Royalty",
      value: "4% a month",
      desc: "A monthly fee charged only from the sixth month after opening, giving you time to become profitable.",
    },
    {
      num: "04.",
      label: "Payback",
      value: "10 months and up",
      desc: "The projected period for fully recovering your initial investment and reaching net positive cash flow.",
    },
    {
      num: "05.",
      label: "Net profit",
      value: "$12,000 a year and up",
      desc: "A partner's real net income from one location after all operational and network expenses.",
    },
  ];

  return (
    <section className="key-terms" data-header-theme="none" id="conditions">
      <div className="key-terms__inner">
        <div className="key-terms__media" data-header-theme-mobile="light">
          <img
            alt="PromptedSite Partnership Atmosphere"
            className="key-terms__image"
            decoding="async"
            height={860}
            loading="lazy"
            src="/assets/images/big-image.D0hFE7tv_mXrFO.webp"
            width={1600}
          />
          <div className="key-terms__intro">
            <p className="key-terms__caption txt-md">
              WE DON&apos;T JUST BUILD SITES. WE SET TRENDS.
            </p>
            <h2 className="key-terms__title">
              Partnership
            </h2>
          </div>
        </div>

        <div className="key-terms__panel" data-header-theme-mobile="dark">
          <div className="key-terms__panel-content">
            <div className="key-terms__header">
              <span className="key-terms__badge descriptor">
                TERMS &amp; FIGURES
              </span>
              <p className="key-terms__description txt-big">
                Our financial model is fully transparent, contains no hidden fees and is designed to help you recoup your investment as quickly as possible.
              </p>
            </div>

            <div className="key-terms__highlights">
              <div className="highlights__content">
                <ul className="highlights__list">
                  <li className="highlights__item descriptor">
                    open economics
                  </li>
                  <li className="highlights__item descriptor">
                    honest figures
                  </li>
                </ul>
                <div className="highlights__link descriptor">
                  @promptedsite
                </div>
              </div>
              <img
                alt="PromptedSite Coffee Detail"
                className="highlights__image"
                decoding="async"
                height={220}
                loading="lazy"
                src="/assets/images/min-image.Dtu61Gss_2eWWGO.webp"
                width={370}
              />
            </div>

            <ul className="key-terms__list">
              {terms.map((t) => (
                <li key={t.num} className="key-terms__item">
                  <div className="terms-item">
                    <div className="terms-item__header">
                      <span className="terms-item__caption descriptor">
                        {t.label}
                      </span>
                      <span className="terms-item__counter descriptor">
                        {t.num}
                      </span>
                    </div>
                    <div className="terms-item__body">
                      <h3 className="terms-item__title h4">
                        {t.value}
                      </h3>
                      <p className="terms-item__description">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
