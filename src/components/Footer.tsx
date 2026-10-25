"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#FFFFFF] border-t border-border text-xs text-[#646464]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Identity & Location */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#171717] tracking-tight">
              {PERSONAL_INFO.shortName}
            </span>
            <span className="text-[#8A8A8A]">·</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F04444] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F04444] rounded"
            >
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F04444] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F04444] rounded"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[#F04444] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F04444] rounded"
            >
              Email
            </a>
          </div>

          {/* Copyright Year */}
          <div className="text-[#8A8A8A]">
            &copy; {currentYear} Sanjeeva Kumar MD. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}
