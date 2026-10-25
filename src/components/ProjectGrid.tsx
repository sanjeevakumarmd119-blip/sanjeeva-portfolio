"use client";

import React from "react";
import { ADDITIONAL_PROJECTS, PERSONAL_INFO } from "@/data/portfolioData";
import { Github, ArrowUpRight, Cpu, Eye, BarChart3, Wifi, Layers } from "lucide-react";

export default function ProjectGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-[#171717] tracking-tight">
            More Technical Projects &amp; Prototypes
          </h4>
          <p className="text-xs text-[#646464] mt-0.5">
            Practical applications built across computer vision, algorithmic optimization, and hardware
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ADDITIONAL_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group bg-[#FFFFFF] border border-border rounded-xl p-5 shadow-card hover:shadow-hover hover:border-[#F04444]/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Category & Visual Identifier */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-[11px] font-mono uppercase font-semibold text-[#646464] tracking-wider">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-[#F04444] bg-[#FFF0EE] px-2 py-0.5 rounded">
                  {project.status}
                </span>
              </div>

              {/* Graphical Visual Preview Box */}
              <div className="my-4 p-3 rounded-lg bg-[#FAFAFA] border border-border">
                {project.id === "hand-gesture-ai" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#646464]">
                      <span className="flex items-center gap-1.5 font-semibold text-[#171717]">
                        <Eye className="w-3.5 h-3.5 text-[#F04444]" />
                        Vision Landmark Tracker
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        30+ FPS
                      </span>
                    </div>
                    {/* Hand landmark miniature diagram */}
                    <div className="h-16 rounded bg-[#FFFFFF] border border-border/80 flex items-center justify-center relative overflow-hidden">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#F04444] animate-pulse" />
                        <div className="w-8 h-[1px] bg-dashed border-t border-[#F04444]/60" />
                        <div className="w-2 h-2 rounded-full bg-[#171717]" />
                        <div className="w-8 h-[1px] bg-dashed border-t border-[#171717]/40" />
                        <div className="w-2 h-2 rounded-full bg-[#646464]" />
                      </div>
                      <div className="absolute bottom-1 right-2 text-[9px] font-mono text-[#8A8A8A]">
                        21 Points · MediaPipe
                      </div>
                    </div>
                  </div>
                )}

                {project.id === "production-scheduling-system" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#646464]">
                      <span className="flex items-center gap-1.5 font-semibold text-[#171717]">
                        <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                        Machine Dispatch Gantt
                      </span>
                      <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        SPT / FIFO
                      </span>
                    </div>
                    {/* Gantt miniature bar diagram */}
                    <div className="h-16 rounded bg-[#FFFFFF] border border-border/80 p-2 flex flex-col justify-center gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono w-4 text-[#8A8A8A]">M1</span>
                        <div className="h-2.5 rounded bg-blue-500/80 w-3/5" />
                        <div className="h-2.5 rounded bg-blue-200 w-1/4" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono w-4 text-[#8A8A8A]">M2</span>
                        <div className="h-2.5 rounded bg-[#F04444]/80 w-2/5" />
                        <div className="h-2.5 rounded bg-emerald-400 w-1/3" />
                      </div>
                    </div>
                  </div>
                )}

                {project.id === "iot-interactive-projects" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#646464]">
                      <span className="flex items-center gap-1.5 font-semibold text-[#171717]">
                        <Wifi className="w-3.5 h-3.5 text-amber-600" />
                        ESP32 / Arduino Telemetry
                      </span>
                      <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        I2C / SPI
                      </span>
                    </div>
                    {/* Microcontroller pinout miniature flow */}
                    <div className="h-16 rounded bg-[#FFFFFF] border border-border/80 p-2 flex items-center justify-around text-center">
                      <div className="text-[10px] font-mono">
                        <div className="font-bold text-[#171717]">ESP32</div>
                        <div className="text-[8px] text-[#8A8A8A]">Wi-Fi Node</div>
                      </div>
                      <span className="text-[#F04444] font-mono text-xs">→</span>
                      <div className="text-[10px] font-mono">
                        <div className="font-bold text-[#171717]">Sensors</div>
                        <div className="text-[8px] text-[#8A8A8A]">BMP/DHT/HC</div>
                      </div>
                      <span className="text-[#F04444] font-mono text-xs">→</span>
                      <div className="text-[10px] font-mono">
                        <div className="font-bold text-[#171717]">Stream</div>
                        <div className="text-[8px] text-[#8A8A8A]">JSON Telemetry</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h5 className="text-base font-bold text-[#171717] tracking-tight group-hover:text-[#F04444] transition-colors">
                {project.title}
              </h5>
              <p className="text-xs text-[#646464] mt-2 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights Bullet List */}
              <ul className="mt-3 space-y-1.5">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-[11px] text-[#646464] flex items-start gap-1.5"
                  >
                    <span className="text-[#F04444] font-bold">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Footer: Tech Tags & Link */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAFAFA] text-[#646464] border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl || PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#F04444] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444] rounded"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

