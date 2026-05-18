"use client";

import { type JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { TEAM_MEMBERS } from "@/lib/constants";
import { containerVariants, itemVariants } from "@/lib/animations";

export function TeamSection(): JSX.Element {
  return (
    <section
      id="team"
      className="py-24 bg-white"
      aria-labelledby="team-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header: Refined Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge variant="dot">Our Leadership</Badge>
            </motion.div>
            <motion.h2
              id="team-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95]"
            >
              The People Behind <br />
              <span className="text-neutral-300">the Mission</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-lg text-neutral-500 leading-relaxed max-w-xl">
              Our success is driven by a highly capable team of professionals across Human Resources, Finance, Commercial, Engineering, and Mining, advancing our vision of sustainable, profitable, and safe mining operations.
            </p>
          </motion.div>
        </div>

        {/* Team Grid: High-Impact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {TEAM_MEMBERS.map((member) => {
            // Mapping placeholder images for members
            const images: Record<string, string> = {
              "sk-thakur": "/sk-thakur.png",
              "rajesh-kumar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
              "priya-sharma": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
              "michael-osei": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
              "sipho-dlamini": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800",
              "kabwe-mwansa": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
              "elizabeth-zulu": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
              "amit-patel": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800",
            };

            // Custom editorial headings & focus actions modeled on the reference image
            const overlayDetails: Record<string, { title: string; action: string }> = {
              "sk-thakur": { title: "Focusing on Vision & Trust", action: "Board Governance" },
              "rajesh-kumar": { title: "Focusing on Global Growth", action: "Strategic Scale" },
              "priya-sharma": { title: "Focusing on Safety First", action: "Site Safety Standards" },
              "michael-osei": { title: "Focusing on Communities", action: "African Operations" },
              "sipho-dlamini": { title: "Focusing on Stewardship", action: "Financial Capital" },
              "kabwe-mwansa": { title: "Focusing on Zero Harm", action: "HSE Framework" },
              "elizabeth-zulu": { title: "Focusing on People", action: "Human Resources" },
              "amit-patel": { title: "Focusing on Precision", action: "Technical Services" },
            };

            const details = overlayDetails[member.id] || {
              title: "Focusing on Excellence",
              action: "Operations"
            };

            return (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="group flex flex-col cursor-pointer"
              >
                {/* Portrait Area */}
                <div className="relative aspect-[0.95/1.1] overflow-hidden rounded-xl bg-neutral-50 mb-5 border border-neutral-100">
                  <Image
                    src={images[member.id] || "/gaadi-jcb.png"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                  />

                  {/* ── HOVER OVERLAY: Slides up from the bottom (Reference Match) ── */}
                  <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm flex flex-col justify-between p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                    
                    {/* Top: Header & Bio */}
                    <div className="space-y-3">
                      <h4 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                        {details.title}
                      </h4>
                      <p className="text-xs text-white/80 leading-relaxed font-medium">
                        {member.bio}
                      </p>
                    </div>

                    {/* Bottom: Interactive Gray Action Bar */}
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex items-center gap-3">
                        {/* Gray square button with arrow */}
                        <div className="w-8 h-8 bg-neutral-200 text-neutral-900 flex items-center justify-center rounded-[6px] shadow-sm select-none">
                          <span className="text-base font-bold">→</span>
                        </div>
                        <span className="text-xs font-bold tracking-tight text-white">
                          {details.action}
                        </span>
                      </div>
                      
                      {/* Gray square button with minus */}
                      <div className="w-8 h-8 bg-neutral-200 text-neutral-900 flex items-center justify-center rounded-[6px] shadow-sm select-none">
                        <span className="text-base font-bold">—</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Info Area */}
                <div className="flex flex-col px-1">
                  <p className="text-[9px] font-extrabold tracking-[0.2em] text-neutral-400 uppercase mb-1.5 leading-relaxed">
                    {member.role}
                  </p>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight leading-none">
                    {member.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
