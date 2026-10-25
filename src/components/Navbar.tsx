"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/data/portfolioData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E5E5] shadow-subtle"
          : "bg-[#FAFAFA]/80 backdrop-blur-sm border-b border-[#E5E5E5]/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="#home"
          className="text-lg font-bold tracking-tight text-[#171717] hover:text-[#F04444] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444] rounded"
          aria-label="Sanjeeva Kumar MD Homepage"
        >
          {PERSONAL_INFO.shortName}
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-8 text-sm font-medium"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#646464] hover:text-[#171717] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444] rounded px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PERSONAL_INFO.resumePath}
            download="Sanjeeva_Kumar_MD_Resume.pdf"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#F04444] bg-[#FFF0EE] hover:bg-[#F04444] hover:text-white px-3.5 py-1.5 rounded-full border border-[#F04444]/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444]"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-[#171717] hover:bg-[#E5E5E5]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444]"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-[#E5E5E5] bg-[#FAFAFA] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-[#171717] hover:text-[#F04444] py-1 border-b border-[#E5E5E5]/40"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={PERSONAL_INFO.resumePath}
                download="Sanjeeva_Kumar_MD_Resume.pdf"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-[#F04444] hover:bg-[#DC2626] px-4 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                Download Resume (PDF)
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
