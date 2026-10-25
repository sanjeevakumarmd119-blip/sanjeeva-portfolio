"use client";

import React, { useState } from "react";
import { Mail, Phone, Github, Linkedin, Download, FileText, Check, Copy, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAFAFA] border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card */}
        <div className="bg-[#FFFFFF] border border-border rounded-2xl p-8 sm:p-12 lg:p-14 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline, Supporting Text, and Primary Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F04444] bg-[#FFF0EE] px-3 py-1 rounded-full border border-[#F04444]/20">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171717] mt-3 leading-tight">
                  Have an idea? Let&apos;s connect.
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#646464] leading-relaxed max-w-xl">
                I&apos;m always interested in learning, building useful things, and connecting with people who enjoy exploring technology and creative ideas.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                {/* Email Action */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#F04444] hover:bg-[#DC2626] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>

                {/* Resume Download Action */}
                <a
                  href={PERSONAL_INFO.resumePath}
                  download="Sanjeeva_Kumar_MD_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#171717] bg-[#FAFAFA] hover:bg-[#FFF0EE] hover:text-[#F04444] border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444]"
                >
                  <Download className="w-4 h-4 text-[#646464]" />
                  <span>Download Resume (PDF)</span>
                </a>

                {/* Copy email icon button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-3 rounded-lg text-[#646464] hover:text-[#171717] hover:bg-[#FAFAFA] border border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F04444]"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-xs font-mono text-emerald-600">
                  Email copied to clipboard!
                </p>
              )}

              {/* Download DOCX note */}
              <div className="pt-2 text-xs text-[#8A8A8A] flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>
                  Looking for an editable version?{" "}
                  <a
                    href="/assets/resume/Sanjeeva_Kumar_MD_Resume.docx"
                    download="Sanjeeva_Kumar_MD_Resume.docx"
                    className="text-[#F04444] underline hover:text-[#DC2626] font-medium"
                  >
                    Download DOCX Resume
                  </a>
                </span>
              </div>
            </div>

            {/* Right Column: Contact Channels Grid */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#8A8A8A] mb-2">
                Direct Channels
              </div>

              {/* Email Card */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group p-4 rounded-xl bg-[#FAFAFA] border border-border hover:border-[#F04444]/40 hover:bg-[#FFFFFF] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-border text-[#F04444] group-hover:bg-[#FFF0EE] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase text-[#8A8A8A]">
                      Email
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#171717] truncate">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#F04444] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`}
                className="group p-4 rounded-xl bg-[#FAFAFA] border border-border hover:border-[#F04444]/40 hover:bg-[#FFFFFF] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-border text-[#171717] group-hover:text-[#F04444] group-hover:bg-[#FFF0EE] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-[#8A8A8A]">
                      Phone / Mobile
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#171717]">
                      {PERSONAL_INFO.phoneDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#F04444] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              {/* LinkedIn Card */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-[#FAFAFA] border border-border hover:border-[#F04444]/40 hover:bg-[#FFFFFF] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-border text-[#0A66C2] group-hover:bg-[#FFF0EE] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-[#8A8A8A]">
                      LinkedIn
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#171717]">
                      sanjeeva-kumar-m-d
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#F04444] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              {/* GitHub Card */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-[#FAFAFA] border border-border hover:border-[#F04444]/40 hover:bg-[#FFFFFF] transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-border text-[#171717] group-hover:text-[#F04444] group-hover:bg-[#FFF0EE] transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-[#8A8A8A]">
                      GitHub
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-[#171717]">
                      sanjeevakumarmd119-blip
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8A8A8A] group-hover:text-[#F04444] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
