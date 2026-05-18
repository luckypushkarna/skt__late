"use client";

import { type JSX } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";
import { StatCard } from "@/components/molecules/StatCard";
import { STATS } from "@/lib/constants";

export function OperationalScaleSection(): JSX.Element {
  return (
    <div
      id="scale"
      className="py-24 bg-white border-b border-neutral-100"
      aria-labelledby="scale-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header Block: Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.6fr] gap-12 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge variant="dot">• OPERATIONAL SCALE</Badge>
            </motion.div>
            
            <motion.h2
              id="scale-heading"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95]"
            >
              Scale That <br />
              <span className="text-neutral-300">Speaks Volumes</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-lg text-neutral-500 leading-relaxed max-w-xl">
              Behind every metric is our dedicated team of professionals, an unwavering commitment to safe operations, and strategic alignment with IRH to accelerate development and increase production at Mopani Copper Mines.
            </p>
          </motion.div>
        </div>

        {/* 6 Stats Grid with Precise Border Dividers to match mock-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-neutral-200">
          {STATS.map((stat, index) => {
            // Determine custom grid borders to replicate the screenshot
            const borderClasses = "border-t-0 " + 
              // Right border divider on desktop cols 1 and 2
              ((index % 3 !== 2) ? "lg:border-r lg:border-neutral-200 " : "") + 
              // Right border divider on tablet col 1
              ((index % 2 === 0) ? "md:border-r md:border-neutral-200 " : "") +
              // Bottom border separating Row 1 and Row 2
              (index < 3 ? "border-b border-neutral-200 " : "border-b border-neutral-200 lg:border-b-0 ");

            return (
              <div key={stat.label} className="relative">
                <StatCard
                  stat={stat}
                  index={index}
                  className={borderClasses}
                />
                {/* Custom Highlighted Accent Line under middle card (index 1: Zambian Workforce) to match screenshot */}
                {index === 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
