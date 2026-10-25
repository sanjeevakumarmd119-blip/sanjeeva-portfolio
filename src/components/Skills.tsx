"use client";

import React from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { Code2, Database, Cpu, Film, Sparkles } from "lucide-react";

export default function Skills() {
  const getCategoryIcon = (title: string) => {
    switch (title) {
      case "DEVELOPMENT":
        return <Code2 className="w-4 h-4 text-[#F04444]" />;
      case "BACKEND AND DATA":
        return <Database className="w-4 h-4 text-blue-600" />;
      case "HARDWARE AND IOT":
        return <Cpu className="w-4 h-4 text-amber-600" />;
      case "CREATIVE":
        return <Film className="w-4 h-4 text-[#F04444]" />;
      case "CURRENTLY EXPLORING":
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      default:
        return <Code2 className="w-4 h-4 text-[#F04444]" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-24 border-b border-border bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F04444] bg-[#FFF0EE] px-3 py-1 rounded-full border border-[#F04444]/20">
            TECHNICAL REPERTOIRE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717] mt-3">
            Tools &amp; Technologies
          </h2>
          <p className="text-sm sm:text-base text-[#646464] mt-2">
            Practical skills verified across academic coursework, full-stack projects, embedded hardware, and digital media.
          </p>
        </div>

        {/* Compact Grid Grouped By Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="bg-[#FAFAFA] border border-border rounded-xl p-5 hover:border-[#F04444]/40 hover:bg-[#FFFFFF] transition-all shadow-subtle flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-border">
                  <div className="p-1.5 rounded-md bg-[#FFFFFF] border border-border">
                    {getCategoryIcon(category.title)}
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] text-[#8A8A8A] mt-2 mb-4">
                  {category.description}
                </p>

                {/* Skills Labels */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded-md bg-[#FFFFFF] text-[#171717] border border-border hover:border-[#F04444]/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 text-[10px] font-mono text-[#8A8A8A]">
                {category.skills.length} verified technologies
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
