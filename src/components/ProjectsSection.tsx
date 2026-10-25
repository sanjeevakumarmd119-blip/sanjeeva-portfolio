"use client";

import React from "react";
import FeaturedProject from "./FeaturedProject";
import ProjectGrid from "./ProjectGrid";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28 border-b border-border bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F04444] bg-[#FFF0EE] px-3 py-1 rounded-full border border-[#F04444]/20">
            SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171717] mt-3">
            Things I&apos;ve been building.
          </h2>
          <p className="text-sm sm:text-base text-[#646464] mt-2">
            Projects that help me learn, experiment, and turn ideas into working applications.
          </p>
        </div>

        {/* Featured Project Showcase */}
        <FeaturedProject />

        {/* Additional Project Cards */}
        <ProjectGrid />

      </div>
    </section>
  );
}

