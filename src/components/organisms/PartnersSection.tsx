"use client";

import { type JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { containerVariants, itemVariants } from "@/lib/animations";

const PARTNERS = [
  {
    id: "mopani",
    name: "Ali Rashed Al Rashdi",
    role: "CEO of International Resources Holding (IRH)",
    image: "/patner-img.jpeg",
    overlayTitle: "Focusing on Operations & Scale",
    bio: "Mopani Copper Mines is a world-class integrated copper producer in Zambia, operating deep underground shafts, concentrators, and smelters.",
    action: "Operational Alignment",
  },
  {
    id: "irh",
    name: "Charles Sakanya",
    role: "CEO of Mopani Copper Mines(MCM)",
    image: "/irh-partner-new.jpeg",
    overlayTitle: "Focusing on Growth & Capital",
    bio: "International Resources Holding (IRH) drives strategic investments in key mineral resources globally, accelerating technological modernization and infrastructure expansion.",
    action: "Capital & Technology Integration",
  },
  {
    id: "ttipl",
    name: "Ravi Sharma",
    role: "CEO Of MCM And IRH ",
    image: "/ttipl-partner-new.jpeg",
    overlayTitle: "Focusing on Technical Infrastructure",
    bio: "TTIPL Group provides core engineering solutions, high-capacity machinery, tensioning systems, and industrial infrastructure to accelerate large-scale mining operations.",
    action: "Technical & Machinery Support",
  },
];

export function PartnersSection(): JSX.Element {
  return (
    <section
      id="partners"
      className="py-24 bg-neutral-50 border-t border-neutral-100"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header: Symmetrical Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge variant="dot">Strategic Alignment</Badge>
            </motion.div>
            <motion.h2
              id="partners-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95]"
            >
              Strategic Partnership <br />
              <span className="text-neutral-300"> Ecosystem</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-lg text-neutral-500 leading-relaxed max-w-xl">
              SKT Global operates as a key mining contractor supporting International Resources Holding (IRH) and Mopani Copper Mines through underground mechanisation, operational infrastructure, and production support systems.
              <br />
              <br />
              IRH currently holds a 51% stake in Mopani Copper Mines.
            </p>
          </motion.div>
        </div>

        {/* Partners Grid: High-Impact 3-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {PARTNERS.map((partner) => {
            return (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                className="group flex flex-col cursor-pointer"
              >
                {/* Image Container Area */}
                <div className="relative aspect-[0.95/1.1] overflow-hidden rounded-xl bg-neutral-100 mb-5 border border-neutral-100/70">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                    sizes="(max-w-768px) 100vw, 33vw"
                    priority
                  />

                  {/* ── HOVER OVERLAY: Slides up from the bottom ── */}
                  <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-sm flex flex-col justify-between p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">

                    {/* Top: Header & Bio */}
                    <div className="space-y-3">
                      <h4 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
                        {partner.overlayTitle}
                      </h4>
                      <p className="text-xs text-white/80 leading-relaxed font-medium">
                        {partner.bio}
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
                          {partner.action}
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
                    {partner.role}
                  </p>
                  <h3 className="text-lg font-bold text-neutral-900 tracking-tight leading-none">
                    {partner.name}
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
