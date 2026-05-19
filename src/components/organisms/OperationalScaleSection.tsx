"use client";

import { JSX, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { STATS } from "@/lib/constants";

export function OperationalScaleSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteHighlightRef = useRef<HTMLSpanElement>(null);

  // Premium GSAP scroll-synchronized word-reveal animation
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const highlightEl = quoteHighlightRef.current;
        if (highlightEl) {
          const text = highlightEl.innerText;
          const words = text.split(/\s+/);

          // Split the text into separate span words for animation
          highlightEl.innerHTML = words
            .map(
              (w) =>
                `<span class="quote-reveal-word text-neutral-200 inline-block mr-1.5 transition-colors duration-200">${w}</span>`
            )
            .join("");

          const wordEls = highlightEl.querySelectorAll(".quote-reveal-word");

          // Sync word color fade with scrollbar progression
          gsap.to(wordEls, {
            scrollTrigger: {
              trigger: highlightEl,
              start: "top 95%", // starts as it enters viewport
              end: "bottom 70%", // ends near middle of viewport
              scrub: 0.5,
            },
            color: "#171717", // premium charcoal black
            stagger: 0.08,
            ease: "none",
          });
        }
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* ── Header block ── */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-transparent text-neutral-600 pl-0 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
              OPERATIONAL SCALE
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.h2
              id="stats-heading"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-none"
            >
              Scale That
              <br />
              <span className="text-neutral-300">Speaks Volumes</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-base text-neutral-500 leading-relaxed self-end max-w-lg"
            >
              Behind every metric is our dedicated team of professionals, an unwavering commitment to safe operations, and strategic alignment with IRH to accelerate development and increase production at Mopani Copper Mines.
            </motion.p>
          </div>
        </div>

        {/* ── 6 Stats Grid with Symmetrical Border Dividers ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {STATS.map((stat, index) => {
            const hasPrefix = !!stat.prefix;
            const hasSuffix = !!stat.suffix;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group p-8 border-t border-neutral-200 hover:border-neutral-900 transition-colors duration-300"
              >
                <div className="flex items-baseline gap-1 mb-2">
                  {hasPrefix && (
                    <span className="text-2xl font-medium text-neutral-400">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-none">
                    <span>{stat.value}</span>
                  </span>
                  {hasSuffix && (
                    <span className="text-2xl font-bold text-neutral-400">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 tracking-widest uppercase mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Quote Strip (Chairman Portrait & Scroll Reveal Quote) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 pt-20 border-t border-neutral-100 grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 lg:gap-24 items-center"
        >
          {/* Executive portrait of S.K. Thakur */}
          <div className="relative aspect-[4/5] lg:aspect-[0.85/1] overflow-hidden rounded-2xl bg-neutral-50 shadow-2xl">
            <Image
              alt="Raj Talreja - Chairman & Managing Director"
              src="/raj-portrait.jpeg"
              fill
              className="object-cover object-top"
              sizes="(max-w-1024px) 100vw, 40vw"
              priority
            />
          </div>

          {/* Quote & Brand Anchor */}
          <div className="relative">
            <span className="absolute -top-16 -left-8 text-[14rem] font-serif text-neutral-50 leading-none select-none pointer-events-none -z-10 opacity-60">
              “
            </span>
            <blockquote className="relative z-10">
              <p className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 leading-[1.1] tracking-tight mb-12">
                “We don’t just extract minerals.{" "}
                <span ref={quoteHighlightRef} className="quote-highlight text-neutral-200">
                  We extract potential from the earth, and from our people.
                </span>
                ”
              </p>
              <footer className="flex items-center gap-6">
                <div>
                  <cite className="not-italic text-lg font-bold text-neutral-900 block mb-0.5">
                  Raj Talreja
                  </cite>
                  <p className="text-xs md:text-sm text-neutral-400 font-medium tracking-wide uppercase">
                    Chairman &amp; SKT Global Mining &amp; Services Limited
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
