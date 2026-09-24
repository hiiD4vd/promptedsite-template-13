"use client";

import React, { useState, useEffect } from "react";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 600 && scrollPos < 1800) {
        setIsLight(false);
      } else {
        setIsLight(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The franchise", href: "#about" },
    { label: "Formats", href: "#formats" },
    { label: "Terms", href: "#conditions" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className={`header header--overlay ${isLight ? "header--light" : "header--dark"}`}>
      <div className="header__inner container flex items-center justify-between">
        {/* Desktop Navigation Left */}
        <nav className="header__desktop-nav" aria-label="Main navigation">
          <ul className="header__desktop-list flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.label} className="header__desktop-item">
                <a href={item.href} className="link txt-menu">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile/Tablet Menu Button */}
        <div className="main-menu lg:hidden">
          <button
            type="button"
            className="main-menu__toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="main-menu__label txt-btn">Menu</span>
            <span className="main-menu__icon">
              <span className="main-menu__dots main-menu__dots--closed">
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
                <span className="main-menu__dot"></span>
              </span>
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#f3f1e9] text-[#262626] p-6 pt-24 flex flex-col justify-between">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-2xl font-bold"
          >
            ✕
          </button>
          <nav className="space-y-6">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-bold uppercase tracking-tight text-[#262626]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
