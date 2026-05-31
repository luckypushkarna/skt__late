"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getCapabilityBySlug, getAdjacentCapabilities, getCapabilityGallery } from "@/data/capabilities";

interface CapabilityDetailClientProps {
  slug: string;
}

export function CapabilityDetailClient({ slug }: CapabilityDetailClientProps) {
  const capability = getCapabilityBySlug(slug);
  if (!capability) return null;

  const { prev, next } = getAdjacentCapabilities(slug);
  const Icon = capability.icon;
  const gallery = getCapabilityGallery(slug);

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO SECTION ───────────────────────────────────── */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">

        {/* Background Image */}
        <Image
          src={capability.bgImage}
          alt={capability.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" style={{ zIndex: 1 }} />

        {/* Content */}
        <div className="relative z-10 h-full max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-12">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-4"
          >
            {/* Icon Badge */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Icon size={20} className="text-white" strokeWidth={1.75} />
            </div>

            {/* Number */}
            <span className="text-xs font-semibold tracking-[0.3em] text-white/77 uppercase">
              Capability {capability.num} / 12
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-4"
          >
            {capability.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-white/85 max-w-2xl font-light"
          >
            {capability.tagline}
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT SECTION ────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT: Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] text-neutral-400 uppercase mb-6">
              Overview
            </p>

            <p className="text-lg md:text-xl leading-[1.7] text-neutral-700 font-light max-w-2xl">
              {capability.overview}
            </p>
          </motion.div>

          {/* RIGHT: Side cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-5"
          >

            {/* Key Tags Card */}
            <div className="border border-neutral-200 rounded-2xl p-7 bg-neutral-50/40">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-neutral-400 uppercase mb-5">
                Key Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {capability.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3.5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Capability Counter Card */}
            <div className="border border-neutral-200 rounded-2xl p-7 bg-neutral-50/40">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-neutral-400 uppercase mb-5">
                Capability
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight">
                  {capability.num}
                </span>
                <span className="text-2xl font-light text-neutral-300">/ 12</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMAGE GALLERY SECTION ───────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-24 md:pb-32">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-neutral-400 uppercase mb-8">
          Systems &amp; Environments Gallery
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
          {gallery.map((img, i) => {
            // Staggered Asymmetrical column spans matching the exact layouts from the screenshot
            const colSpan =
              i === 0 ? "col-span-1 md:col-span-3" :
                i === 1 ? "col-span-1 md:col-span-5" :
                  i === 2 ? "col-span-1 md:col-span-4" :
                    i === 3 ? "col-span-1 md:col-span-5" :
                      i === 4 ? "col-span-1 md:col-span-4" :
                        "col-span-1 md:col-span-3";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpan} relative h-[260px] md:h-[320px] rounded-2xl overflow-hidden group shadow-sm bg-neutral-100 cursor-pointer`}
              >
                {/* Image */}
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  draggable={false}
                  loading="lazy"
                />

                {/* Bottom dark radial shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 select-none" style={{ zIndex: 1 }} />

                {/* Caption Text Box */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
                  <p className="text-sm font-bold text-white tracking-wide drop-shadow-sm group-hover:translate-x-1.5 transition-transform duration-300">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── NAVIGATION FOOTER ──────────────────────────────── */}
      <section className="border-t border-neutral-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-3 items-center gap-6">

            {/* Previous */}
            {prev ? (
              <Link
                href={`/capabilities/${prev.slug}`}
                className="group flex items-center gap-3 justify-start"
              >
                <ArrowLeft
                  size={16}
                  className="text-neutral-400 group-hover:text-neutral-900 group-hover:-translate-x-1 transition-all duration-300"
                />
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-1">
                    Previous
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : <div />}

            {/* All Capabilities (Center) */}
            <div className="flex justify-center">
              <Link
                href="/#services"
                className="text-[11px] font-semibold tracking-[0.3em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                All Capabilities
              </Link>
            </div>

            {/* Next */}
            {next ? (
              <Link
                href={`/capabilities/${next.slug}`}
                className="group flex items-center gap-3 justify-end text-right"
              >
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-1">
                    Next
                  </p>
                  <p className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {next.title}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all duration-300"
                />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </main>
  );
}
