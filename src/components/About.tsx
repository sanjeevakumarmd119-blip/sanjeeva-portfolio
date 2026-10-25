"use client";

import React from "react";
import { GraduationCap, Film, Sparkles, BookOpen, MapPin, ArrowRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-border bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F04444] bg-[#FFF0EE] px-3 py-1 rounded-full border border-[#F04444]/20">
            {PERSONAL_INFO.about.label}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717] mt-3">
            {PERSONAL_INFO.about.headline}
          </h2>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Authentic Personal Narrative */}
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#646464] leading-relaxed">
            {PERSONAL_INFO.about.paragraphs.map((p, idx) => (
              <p key={idx} className="font-normal">
                {p}
              </p>
            ))}

            {/* Integrated Creative Video Note */}
            <div className="mt-6 p-4 rounded-xl bg-[#FFFFFF] border border-border flex items-start gap-3.5 shadow-subtle">
              <div className="p-2 rounded-lg bg-[#FFF0EE] text-[#F04444] shrink-0 mt-0.5">
                <Film className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm text-[#646464] leading-relaxed">
                <span className="font-bold text-[#171717] block mb-1">
                  Creative Work &amp; Video Editing
                </span>
                {PERSONAL_INFO.about.videoEditingNote}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Academic & Background Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Education Card */}
            <div className="bg-[#FFFFFF] border border-border rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="p-2 rounded-lg bg-[#FAFAFA] border border-border text-[#F04444]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#8A8A8A]">
                    Academic Background
                  </div>
                  <h3 className="text-sm font-bold text-[#171717]">
                    {PERSONAL_INFO.education.institution}
                  </h3>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="text-sm font-semibold text-[#171717]">
                  {PERSONAL_INFO.education.degree}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#646464]">
                  <MapPin className="w-3.5 h-3.5 text-[#F04444]" />
                  <span>{PERSONAL_INFO.education.location}</span>
                </div>
                <p className="text-xs text-[#646464] pt-2 border-t border-border/60 leading-relaxed">
                  Focusing on software systems, web engineering, interactive graphics, and applied computing.
                </p>
              </div>
            </div>

            {/* Professional Principles Card */}
            <div className="bg-[#FFFFFF] border border-border rounded-xl p-5 shadow-card">
              <div className="text-xs font-mono uppercase font-bold tracking-wider text-[#171717] mb-3">
                Working Principles
              </div>

              <div className="space-y-2 text-xs text-[#646464]">
                <div className="flex items-start gap-2">
                  <span className="text-[#F04444] font-bold">01</span>
                  <span><strong>Build practical solutions:</strong> Prioritize functional, tested code over unnecessary complexity.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#F04444] font-bold">02</span>
                  <span><strong>Honest representation:</strong> Stand behind what has actually been created, tested, and understood.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#F04444] font-bold">03</span>
                  <span><strong>Continuous curiosity:</strong> Apply newly acquired concepts directly into tangible software and hardware prototypes.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

