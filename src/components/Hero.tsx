"use client";

import React from "react";
import { ArrowDown, Download, MapPin, Sparkles, Terminal, Code2, Cpu, CheckCircle2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro, Headline, Description, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Introductory Label & Location Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#FFF0EE] text-[#F04444] border border-[#F04444]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F04444] animate-pulse" />
                {PERSONAL_INFO.title}
              </span>

              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#646464] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-border">
                <MapPin className="w-3.5 h-3.5 text-[#F04444]" />
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.08]">
              I build ideas into{" "}
              <span className="relative inline-block text-[#F04444]">
                something real.
                <span
                  className="absolute bottom-1 left-0 w-full h-[3px] bg-[#F04444]/20 -z-10 rounded"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#646464] leading-relaxed max-w-xl font-normal">
              {PERSONAL_INFO.heroDescription}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#F04444] hover:bg-[#DC2626] shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444] focus-visible:ring-offset-2 active:scale-[0.99]"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumePath}
                download="Sanjeeva_Kumar_MD_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#171717] bg-[#FFFFFF] hover:bg-[#FFF0EE] hover:text-[#F04444] border border-border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444] focus-visible:ring-offset-2"
              >
                <Download className="w-4 h-4 text-[#646464] group-hover:text-[#F04444]" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Micro Highlights Pill Row */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#646464] border-t border-border/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F04444]" />
                B.Tech in IT (AR/VR) · Alliance Univ
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F04444]" />
                Full-Stack &amp; Embedded IoT
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F04444]" />
                DaVinci Resolve Editing
              </span>
            </div>

          </div>

          {/* Right Column: Distinctive Typographic & Architectural Composition */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Architectural Card */}
              <div className="bg-[#FFFFFF] border border-border rounded-xl p-6 sm:p-7 shadow-card relative overflow-hidden">
                
                {/* Background Watermark Initials */}
                <div
                  className="absolute -right-4 -bottom-6 text-[120px] font-black text-[#FAFAFA] select-none pointer-events-none tracking-tighter leading-none"
                  aria-hidden="true"
                >
                  SK
                </div>

                {/* Card Header: Identity Monogram & Status */}
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#171717] text-white flex items-center justify-center font-black text-lg tracking-wider border border-[#171717]">
                      SK
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#171717] tracking-tight leading-tight">
                        Sanjeeva Kumar MD
                      </h2>
                      <p className="text-xs font-mono text-[#646464]">
                        developer · creator
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for work
                  </span>
                </div>

                {/* Focus Areas Grid */}
                <div className="py-5 space-y-3">
                  <div className="text-[11px] font-mono tracking-wider uppercase text-[#8A8A8A]">
                    Current Building Focus
                  </div>

                  {/* Focus Item 1: UCHN */}
                  <div className="p-3 rounded-lg bg-[#FAFAFA] border border-border flex items-start gap-3 transition-colors hover:border-[#F04444]/40">
                    <div className="p-2 rounded-md bg-[#FFF0EE] text-[#F04444] mt-0.5">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-[#171717]">
                          UCHN Healthcare Platform
                        </h3>
                        <span className="text-[10px] font-mono text-[#F04444] bg-[#FFF0EE] px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      </div>
                      <p className="text-[11px] text-[#646464] mt-0.5 leading-snug">
                        Full-stack Next.js, real-time queues &amp; emergency routing
                      </p>
                    </div>
                  </div>

                  {/* Focus Item 2: IoT & Sensors */}
                  <div className="p-3 rounded-lg bg-[#FAFAFA] border border-border flex items-start gap-3 transition-colors hover:border-[#F04444]/40">
                    <div className="p-2 rounded-md bg-[#FAFAFA] text-[#171717] mt-0.5 border border-border">
                      <Cpu className="w-4 h-4 text-[#F04444]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-[#171717]">
                          Hardware &amp; IoT Prototypes
                        </h3>
                        <span className="text-[10px] font-mono text-[#646464]">
                          ESP32 / Arduino
                        </span>
                      </div>
                      <p className="text-[11px] text-[#646464] mt-0.5 leading-snug">
                        Multi-sensor telemetry, Wi-Fi streaming, interactive controls
                      </p>
                    </div>
                  </div>

                  {/* Focus Item 3: Video & Workflows */}
                  <div className="p-3 rounded-lg bg-[#FAFAFA] border border-border flex items-start gap-3 transition-colors hover:border-[#F04444]/40">
                    <div className="p-2 rounded-md bg-[#FAFAFA] text-[#171717] mt-0.5 border border-border">
                      <Terminal className="w-4 h-4 text-[#646464]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-[#171717]">
                          Creative &amp; AI Workflows
                        </h3>
                        <span className="text-[10px] font-mono text-[#646464]">
                          DaVinci Resolve
                        </span>
                      </div>
                      <p className="text-[11px] text-[#646464] mt-0.5 leading-snug">
                        Video editing fundamentals, prompt chaining, developer tooling
                      </p>
                    </div>
                  </div>

                </div>

                {/* Card Footer: Tech Stack Pills */}
                <div className="pt-4 border-t border-border flex flex-wrap gap-1.5">
                  {["Next.js", "React", "TypeScript", "PostgreSQL", "ESP32", "Python"].map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#FAFAFA] text-[#646464] border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
