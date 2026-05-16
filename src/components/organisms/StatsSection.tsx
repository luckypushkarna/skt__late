"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";
import { StatCard } from "@/components/molecules/StatCard";
import { STATS } from "@/lib/constants";

// The span text split into words — we render them individually
// so GSAP can animate each word's color in sync with scroll.
const SPAN_WORDS = [
  "We", "extract", "potential", "from", "the", "earth,", "and", "from", "our", "people.",
];

export function StatsSection(): JSX.Element {
  const blockquoteRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let ctx: { revert?: () => void } = {};

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (!words.length || !blockquoteRef.current) return;

      // All words start in gray
      gsap.set(words, { color: "#D1D5DB" });

      // Create one timeline that drives all words
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: blockquoteRef.current,
          // Start when the top of the blockquote hits 65% from top of viewport
          start: "top 65%",
          // End after scrolling ~60% through the section height
          end: "bottom 40%",
          scrub: 1.2, // Ties animation directly to scroll; 1.2 adds a tiny lag for smoothness
          once: false, // Reversible — scrolling up reverses it
        },
      });

      // Stagger each word across the full timeline duration
      tl.to(words, {
        color: "#111111",
        duration: 0.4,
        stagger: 0.15, // Each word starts 0.15 normalized units after the previous
        ease: "none",  // Linear so color exactly tracks scroll position
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
              By the Numbers
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
              Behind every metric is a team of dedicated professionals, a
              commitment to safety, and an unwavering focus on delivering
              results that matter to our clients and the communities we serve.
            </motion.p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom quote — first sentence static, span words scroll-animated */}
        <motion.blockquote
          ref={blockquoteRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-12 border-t border-neutral-200"
        >
          <p className="text-display-md font-black text-neutral-900 leading-tight tracking-tight mb-6">
            {/* ── First sentence: fully static, never animated ── */}
            &ldquo;We don&rsquo;t just extract minerals.{" "}

            {/* ── Second sentence: each word animated by scroll scrub ── */}
            {SPAN_WORDS.map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordRefs.current[i] = el; }}
                // Inline style sets the base color; GSAP will override it
                style={{ color: "#D1D5DB" }}
              >
                {word}
                {/* Re-insert natural space between words (except after last) */}
                {i < SPAN_WORDS.length - 1 ? " " : ""}
              </span>
            ))}
            &rdquo;
          </p>

          <footer className="flex items-center gap-4">
            <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center">
              <span className="text-xs font-bold">SK</span>
            </div>
            <div>
              <cite className="not-italic text-sm font-bold text-neutral-900">
                S.K. Thakur
              </cite>
              <p className="text-xs text-neutral-400">
                Chairman &amp; Managing Director, SKT Global
              </p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
