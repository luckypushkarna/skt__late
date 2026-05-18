"use client";

import { useEffect, useRef, type JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { StatCard } from "@/components/molecules/StatCard";
import { STATS } from "@/lib/constants";

// The span text split into words — we render them individually
// so GSAP can animate each word's color in sync with scroll.
const SPAN_WORDS = [
  "We", "extract", "potential", "from", "the", "earth,", "and", "from", "our", "people.",
];

export function StatsSection(): JSX.Element {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let ctx: { revert?: () => void } = {};

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (!words.length || !quoteRef.current) return;

      // Initial state: Faded and slightly shifted down
      gsap.set(words, { color: "#E5E7EB", y: 10, opacity: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 85%", // Start animation when text is near bottom of viewport
          end: "top 35%",   // Finish when it reaches upper-middle
          scrub: 0.8,       // Slightly smoother scrub
        },
      });

      tl.to(words, {
        color: "#000000",
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
      });

      ctx = { revert: () => { ScrollTrigger.getAll().forEach((t) => t.kill()); } };
    })();

    return () => ctx.revert?.();
  }, []);

  return (
    <section
      id="impact"
      className="py-section bg-white"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="dot" className="mb-6">
              OPERATIONAL SCALE
            </Badge>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.h2
              id="stats-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-lg font-black text-neutral-900 tracking-tight leading-none"
            >
              Scale That
              <br />
              <span className="text-neutral-300">Speaks Volumes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-neutral-500 leading-relaxed self-end max-w-lg"
            >
              Behind every metric is our dedicated team of professionals, an unwavering
              commitment to safe operations, and strategic alignment with IRH to accelerate
              development and increase production at Mopani Copper Mines.
            </motion.p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom quote — Re-imagined as a high-impact editorial layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 pt-20 border-t border-neutral-100 grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-24 items-center"
        >
          {/* Left: Prominent Executive Portrait */}
          <div className="relative aspect-[4/5] lg:aspect-[0.85/1] overflow-hidden rounded-2xl bg-neutral-50 shadow-2xl">
            <Image
              src="/sk-thakur.png"
              alt="S.K. Thakur - Chairman & Managing Director"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>

          {/* Right: The Quote Content */}
          <div className="relative">
            {/* Large Decorative Quote Mark - Premium Editorial Style */}
            <span className="absolute -top-16 -left-8 text-[14rem] font-serif text-neutral-50 leading-none select-none pointer-events-none -z-10 opacity-60">
              &ldquo;
            </span>
            
            <blockquote className="relative z-10">
              <p 
                ref={quoteRef}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 leading-[1.1] tracking-tight mb-12"
              >
                {/* ── First sentence: fully static ── */}
                &ldquo;We don&rsquo;t just extract minerals.{" "}

                {/* ── Second sentence: scroll-animated ── */}
                {SPAN_WORDS.map((word, i) => (
                  <span
                    key={i}
                    ref={(el) => { wordRefs.current[i] = el; }}
                    style={{ color: "#D1D5DB" }}
                    className="inline-block"
                  >
                    {word}
                    {i < SPAN_WORDS.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
                &rdquo;
              </p>

              <footer className="flex items-center gap-6">
                {/* SK Brand Box - Moved to the left of the footer details */}
                <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center rounded-sm bg-white shadow-sm flex-shrink-0">
                  <span className="text-xs font-bold text-neutral-900 tracking-tighter">SK</span>
                </div>
                <div>
                  <cite className="not-italic text-lg font-bold text-neutral-900 block mb-0.5">
                    S.K. Thakur
                  </cite>
                  <p className="text-xs md:text-sm text-neutral-400 font-medium tracking-wide uppercase">
                    Chairman & Managing Director, SKT Global Mining & Services Limited
                  </p>
                </div>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
