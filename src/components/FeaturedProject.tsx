"use client";

import React, { useState } from "react";
import {
  Activity,
  Calendar,
  Pill,
  Users,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Github,
  AlertCircle,
  Clock,
  MapPin,
  Check,
  ChevronRight,
  Layers,
} from "lucide-react";
import { FEATURED_UCHN, PERSONAL_INFO } from "@/data/portfolioData";

export default function FeaturedProject() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "queue" | "inventory">("pipeline");

  return (
    <div className="bg-[#FFFFFF] border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-card">
      {/* Top Header Badge & Role */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF0EE] text-[#F04444] border border-[#F04444]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F04444]" />
            {FEATURED_UCHN.badge}
          </span>
          <span className="text-xs font-mono text-[#646464] bg-[#FAFAFA] px-2.5 py-1 rounded-md border border-border">
            Full-Stack Healthcare System
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#F04444] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444] rounded px-2 py-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View Source Code</span>
          </a>
        </div>
      </div>

      {/* Main Content: Title, Tagline, Description */}
      <div className="pt-6 pb-8 space-y-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            {FEATURED_UCHN.title}
          </h3>
          <p className="text-sm sm:text-base font-medium text-[#F04444] mt-1">
            {FEATURED_UCHN.tagline}
          </p>
        </div>

        <p className="text-sm sm:text-base text-[#646464] leading-relaxed max-w-3xl">
          {FEATURED_UCHN.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="pt-2 flex flex-wrap gap-2">
          {FEATURED_UCHN.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#FAFAFA] text-[#171717] border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CSS-Based Healthcare Application Preview Console */}
      <div className="my-6 rounded-xl border border-border bg-[#FAFAFA] overflow-hidden shadow-subtle">
        {/* Console Header Bar */}
        <div className="bg-[#171717] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F04444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="font-mono text-white/80 ml-2">
              UCHN Coordination Console · Architecture Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Socket.IO Live
            </span>
            <span className="text-[11px] font-mono text-white/60 hidden sm:inline">
              PostgreSQL + Prisma
            </span>
          </div>
        </div>

        {/* Console Interactive Tabs */}
        <div className="border-b border-border bg-[#FFFFFF] px-4 flex gap-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "pipeline"
                ? "border-[#F04444] text-[#F04444] font-semibold"
                : "border-transparent text-[#646464] hover:text-[#171717]"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            5-Stage Emergency SOS Pipeline
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("queue")}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "queue"
                ? "border-[#F04444] text-[#F04444] font-semibold"
                : "border-transparent text-[#646464] hover:text-[#171717]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Live Clinic Queue
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("inventory")}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "inventory"
                ? "border-[#F04444] text-[#F04444] font-semibold"
                : "border-transparent text-[#646464] hover:text-[#171717]"
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            Pharmacy Inventory Sync
          </button>
        </div>

        {/* Tab 1: Emergency Pipeline */}
        {activeTab === "pipeline" && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#646464]">
              <span className="font-semibold text-[#171717]">
                Real-Time Incident Routing State Machine
              </span>
              <span className="text-[11px] font-mono bg-[#FFF0EE] text-[#F04444] px-2 py-0.5 rounded">
                Incident #SOS-89241 · Active Dispatch
              </span>
            </div>

            {/* Stages Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {FEATURED_UCHN.demoPreview.stages.map((stage, idx) => {
                const isCurrent = idx === 2; // Dispatched
                const isDone = idx < 2;
                return (
                  <div
                    key={stage.step}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isCurrent
                        ? "bg-[#FFFFFF] border-[#F04444] shadow-sm ring-1 ring-[#F04444]/30"
                        : isDone
                        ? "bg-[#FFFFFF] border-border text-[#171717]"
                        : "bg-[#FAFAFA] border-border/60 text-[#8A8A8A]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold">
                        {stage.step}
                      </span>
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-[#F04444] animate-ping" />
                      ) : null}
                    </div>
                    <div className="text-xs font-bold capitalize">
                      {stage.name}
                    </div>
                    <div className="text-[11px] leading-tight text-[#646464] mt-0.5">
                      {stage.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-[#FFFFFF] border border-border rounded-lg text-xs flex flex-wrap items-center justify-between gap-2 text-[#646464]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F04444]" />
                <span>
                  <strong>Nearest Facility:</strong> Apex Community Clinic · 2.4 km (ETA: 6 mins)
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#171717]">
                Telemetry: Speed 48 km/h · Triage Alert Level 1
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Live Clinic Queue */}
        {activeTab === "queue" && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#171717]">
                Dr. R. Sharma · General Medicine OPD · Room 104
              </span>
              <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Avg. Consultation: 12 mins
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#FFFFFF] border border-border rounded-lg">
                <div className="text-[10px] font-mono uppercase text-[#8A8A8A]">
                  Currently In Consultation
                </div>
                <div className="text-xl font-bold text-[#171717] mt-1">
                  Token #A-14
                </div>
                <div className="text-xs text-[#646464] mt-0.5">
                  Started 4 mins ago
                </div>
              </div>

              <div className="p-3.5 bg-[#FFFFFF] border border-border rounded-lg">
                <div className="text-[10px] font-mono uppercase text-[#8A8A8A]">
                  Next In Line
                </div>
                <div className="text-xl font-bold text-[#F04444] mt-1">
                  Token #A-15
                </div>
                <div className="text-xs text-[#646464] mt-0.5">
                  Arrived · Vitals Recorded
                </div>
              </div>

              <div className="p-3.5 bg-[#FFFFFF] border border-border rounded-lg">
                <div className="text-[10px] font-mono uppercase text-[#8A8A8A]">
                  Waiting Count
                </div>
                <div className="text-xl font-bold text-[#171717] mt-1">
                  6 Patients
                </div>
                <div className="text-xs text-[#646464] mt-0.5">
                  Estimated Queue Wait: ~45 mins
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#646464]">
              Connected patients receive push notifications when their position reaches 2 spots from consultation, avoiding crowded waiting lobbies.
            </p>
          </div>
        )}

        {/* Tab 3: Pharmacy Inventory */}
        {activeTab === "inventory" && (
          <div className="p-4 sm:p-6 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#171717]">
                Verified Local Pharmacy Stock Directory
              </span>
              <span className="text-[11px] font-mono text-[#646464]">
                ACID Transaction Bound
              </span>
            </div>

            <div className="divide-y divide-border bg-[#FFFFFF] border border-border rounded-lg text-xs">
              {[
                { name: "Amoxicillin 500mg (Antibiotic)", stock: "48 packs", status: "In Stock", type: "Prescription Req." },
                { name: "Paracetamol 650mg (Antipyretic)", stock: "124 packs", status: "In Stock", type: "OTC" },
                { name: "Cetirizine 10mg (Antihistamine)", stock: "4 packs left", status: "Low Stock Alert", type: "OTC" },
              ].map((item) => (
                <div key={item.name} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#171717]">{item.name}</div>
                    <div className="text-[11px] text-[#646464]">{item.type}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                        item.status.includes("Low")
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {item.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#646464]">
              Inventory holds are synchronized with appointment prescriptions to eliminate medicine unavailability upon patient arrival.
            </p>
          </div>
        )}
      </div>

      {/* Verified Capabilities Grid */}
      <div className="pt-4 space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#8A8A8A]">
          Key Verified Architecture &amp; Capabilities
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_UCHN.capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-4 rounded-xl border border-border bg-[#FAFAFA] hover:bg-[#FFFFFF] transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#FFF0EE] text-[#F04444] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#171717]">
                    {cap.title}
                  </h5>
                  <p className="text-xs text-[#646464] mt-1 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Footer CTAs */}
      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#646464]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Architecture, data schema, and prototype verified in Next.js &amp; Prisma</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[#171717] bg-[#FAFAFA] hover:bg-[#FFF0EE] hover:text-[#F04444] border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444]"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
