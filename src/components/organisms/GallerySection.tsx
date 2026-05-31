"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const PARALLAX_IMAGES = [
  { src: "/Production Development.webp", alt: "Underground Mechanised Drilling" },
  { src: "/Safety & Compliance.webp", alt: "Workforce Safety Briefing" },
  { src: "/Underground Workshop.webp", alt: "Active Maintenance Bays" },
  { src: "/Mechanised Fleet.webp", alt: "Heavy Mining Loaders" },
  { src: "/Rescue Systems.webp", alt: "Safety Rescue Chamber" },
  { src: "/Operational Command.webp", alt: "Control Room Monitoring" },
  { src: "/Logistics Network.webp", alt: "Surface Logistics Fleet" },
];

export function GallerySection(): JSX.Element {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-section-heading"
      className="bg-neutral-50 border-t border-neutral-100"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-24 pb-12">
        {/* ── Header ── */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
              Operations Gallery
            </span>
          </motion.div>

          <motion.h2
            id="gallery-section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95] mb-5"
          >
            Inside Our
            <br />
            <span className="text-neutral-300">Operations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-500 max-w-xl text-base leading-relaxed"
          >
            From underground tunnels to surface processing plants — images and
            live footage of the people, machines, and precision that power SKT
            Global across Zambia.
          </motion.p>
        </div>
      </div>

      {/* ── Zoom Parallax Interactive Effect ── */}
      <ZoomParallax images={PARALLAX_IMAGES} />
    </section>
  );
}
