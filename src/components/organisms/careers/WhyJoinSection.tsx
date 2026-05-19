"use client";

import { JSX, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";
import { Shield, TrendingUp, Globe, Cpu, GraduationCap, Users } from "lucide-react";

const VALUES = [
  {
    icon: Shield,
    title: "Safety-First Culture",
    description: "Zero harm is not a target—it's a non-negotiable covenant. Every shift starts and ends with rigorous protective oversight.",
    stat: "Zero",
    statLabel: "Fatalities since 2018",
  },
  {
    icon: TrendingUp,
    title: "Clear Career Growth",
    description: "From trainee to senior leadership, we define strict progression pathways backed by continuous executive support.",
    stat: "85%",
    statLabel: "Internal leadership promotions",
  },
  {
    icon: Globe,
    title: "Global Scale Operations",
    description: "Collaborate across borders, exchanging technical expertise and deploying infrastructure internationally.",
    stat: "8+",
    statLabel: "Countries with active footprints",
  },
  {
    icon: Cpu,
    title: "Modern Mining Tech",
    description: "Command autonomous fleets, real-time spatial geological mapping, and state-of-the-art telemetry control rooms.",
    stat: "225+",
    statLabel: "Advanced heavy operational units",
  },
  {
    icon: GraduationCap,
    title: "Skills Development",
    description: "Continuous professional certifications, intensive technical simulations, and interactive safety training.",
    stat: "5,000+",
    statLabel: "Annual certified training hours",
  },
  {
    icon: Users,
    title: "Localization Commitment",
    description: "Deeply invested in building regional capabilities, supporting local supply chains, and driving community progress.",
    stat: "92%",
    statLabel: "Local regional workforce ratio",
  },
] as const;

export function WhyJoinSection(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section className="py-24 bg-white relative border-t border-neutral-100 overflow-hidden">
      {/* Blueprint fine crosshairs */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-neutral-200" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-neutral-200" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-neutral-200" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-neutral-200" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="dot" className="mb-5">
              Why SKT Global
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-none mb-6"
          >
            Build a Career That <br />
            Is Built to <span className="text-neutral-300">Last.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-neutral-500 leading-relaxed max-w-xl"
          >
            We don&apos;t just extract value from the earth—we cultivate potentials within our
            people. Explore the core principles that support your career journey.
          </motion.p>
        </div>

        {/* Values Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {VALUES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-neutral-50 hover:bg-white border border-neutral-200/60 hover:border-neutral-300 p-8 rounded-2xl transition-all duration-350 cursor-default"
                style={{
                  boxShadow: "0 2px 10px rgba(0,0,0,0.01)",
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.04)",
                }}
              >
                {/* Icon Container */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-neutral-200/80 mb-6 group-hover:bg-neutral-50 transition-colors duration-300">
                  <IconComponent size={20} className="text-neutral-600 group-hover:text-neutral-900 transition-colors duration-300" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2 tracking-tight group-hover:text-neutral-950">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Stat block */}
                <div className="pt-6 border-t border-neutral-200/50 flex flex-col">
                  <span className="text-2xl font-black text-neutral-950 tracking-tight leading-none">
                    {item.stat}
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide mt-1.5">
                    {item.statLabel}
                  </span>
                </div>

                {/* Dynamic corner highlight */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[4px] border-r-[4px] border-t-transparent border-r-transparent group-hover:border-t-neutral-900 group-hover:border-r-neutral-900 transition-all duration-300 rounded-tr-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
