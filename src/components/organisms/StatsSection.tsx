"use client";

import { JSX, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Safety Principles (3 cards that float on the right) ────────────────────
const SAFETY_CARDS = [
  {
    tag: "Zero Harm",
    headline: "Every Worker\nReturns Home",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&auto=format&fit=crop&q=80",
    floatClass: "floating-safety-1",
  },
  {
    tag: "PPE & Monitoring",
    headline: "Protected\nAt Every Depth",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&auto=format&fit=crop&q=80",
    floatClass: "floating-safety-2",
  },
  {
    tag: "Training & Culture",
    headline: "Safety Is\nOur Language",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&auto=format&fit=crop&q=80",
    floatClass: "floating-safety-3",
  },
] as const;

// ─── Glassmorphic metric pills ───────────────────────────────────────────────
const SAFETY_METRICS = [
  { value: "Zero", label: "Fatal Incidents" },
  { value: "99.8%", label: "Safety Compliance" },
] as const;

// ─── Safety pillars (scroll-reveal list on the left) ────────────────────────
const PILLARS = [
  {
    num: "01",
    title: "Hazard Elimination",
    body: "Every task begins with a structured risk assessment and live environmental monitoring to eliminate hazards before they form.",
  },
  {
    num: "02",
    title: "Worker Protection Systems",
    body: "State-of-the-art PPE, atmospheric sensors, and automated ventilation guard every underground crew, 24 hours a day.",
  },
  {
    num: "03",
    title: "Continuous Training",
    body: "Over 5,000 hours of structured safety education per year ensure every SKT professional knows exactly what to do.",
  },
  {
    num: "04",
    title: "Emergency Readiness",
    body: "Dedicated rescue teams, sub-5-minute response protocols, and on-site medical infrastructure keep our people covered.",
  },
] as const;

export function StatsSection(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // ── GSAP: floating cards + word-by-word headline reveal ───────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Continuous floating for the three image cards
        gsap.to(".floating-safety-1", {
          y: -16,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-safety-2", {
          y: 14,
          duration: 4.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-safety-3", {
          y: -10,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Glassmorphic pills gentle float
        gsap.to(".floating-pill-1", {
          y: -12,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-pill-2", {
          y: 12,
          duration: 3.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Word-by-word headline reveal on scroll
        if (headlineRef.current) {
          // Split into word spans dynamically
          const rawText = headlineRef.current.innerHTML;
          const words = rawText.split(" ");
          headlineRef.current.innerHTML = words
            .map(
              (w) =>
                `<span class="safety-word inline-block" style="opacity:0;transform:translateY(40px) rotate(-2deg);filter:blur(6px)">${w}</span>`
            )
            .join(" ");

          const wordEls =
            headlineRef.current.querySelectorAll<HTMLSpanElement>(
              ".safety-word"
            );

          gsap.to(wordEls, {
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.6,
            },
            opacity: 1,
            y: 0,
            rotate: 0,
            filter: "blur(0px)",
            stagger: 0.07,
            ease: "power3.out",
          });
        }

        // Pillar rows slide in from left
        gsap.from(".safety-pillar", {
          scrollTrigger: {
            trigger: ".safety-pillars",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: -40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative py-24 md:py-32 bg-[#F5F5F3] overflow-hidden"
      aria-labelledby="safety-heading"
    >
      {/* ── Industrial background grid ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.025)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-neutral-200/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-neutral-200/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        {/* ══════════════════════════════════════════════════════════════════
            12-COL EDITORIAL GRID — same rhythm as CareersHero
        ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Editorial Copy ──────────────────────────────────────── */}
          <div className="lg:col-span-6 space-y-10">

            {/* Label pill */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase border border-neutral-300 bg-white"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
              Safety First · SKT Global
            </motion.span>

            {/* Main editorial headline — GSAP word reveal */}
            <h2
              ref={headlineRef}
              id="safety-heading"
              className="text-display-md md:text-display-lg font-black text-neutral-900 leading-none tracking-tight"
            >
              Every Worker Returns Home Safe.
            </h2>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base text-neutral-500 leading-relaxed max-w-xl"
            >
              Safety is the prime motto of SKT Global Mining. Every decision,
              every shift, every system is designed around one non-negotiable
              principle: zero harm to our people, our communities, and our
              environment.
            </motion.p>

            {/* Pillar list */}
            <div className="safety-pillars space-y-6 pt-2">
              {PILLARS.map((p) => (
                <div
                  key={p.num}
                  className="safety-pillar group flex gap-5 items-start border-b border-neutral-200 pb-6 last:border-0 last:pb-0"
                >
                  {/* Number tag */}
                  <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-sm border border-neutral-300 bg-white flex items-center justify-center text-[10px] font-black text-neutral-400 tracking-wider group-hover:border-neutral-900 group-hover:text-neutral-900 transition-colors duration-300">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 tracking-wide mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Layered floating image cards ───────────────────────── */}
          <div className="lg:col-span-6 relative h-[540px] md:h-[620px] flex items-center justify-center">

            {/* Blueprint rings (decorative depth) */}
            <div className="absolute w-[80%] aspect-square border border-neutral-300/40 rounded-full pointer-events-none" />
            <div className="absolute w-[58%] aspect-square border border-neutral-300/25 rounded-full pointer-events-none" />

            {/* Card 1 — top-left */}
            <div
              className={`${SAFETY_CARDS[0].floatClass} absolute top-[8%] left-[4%] w-[46%] aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl z-20 group cursor-default`}
            >
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SAFETY_CARDS[0].img}
                  alt={SAFETY_CARDS[0].tag}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase mb-1">
                    {SAFETY_CARDS[0].tag}
                  </p>
                  <h4 className="text-sm font-black tracking-tight leading-snug whitespace-pre-line">
                    {SAFETY_CARDS[0].headline}
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 2 — center-right */}
            <div
              className={`${SAFETY_CARDS[1].floatClass} absolute top-[18%] right-[4%] w-[43%] aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl z-10 group cursor-default`}
            >
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SAFETY_CARDS[1].img}
                  alt={SAFETY_CARDS[1].tag}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase mb-1">
                    {SAFETY_CARDS[1].tag}
                  </p>
                  <h4 className="text-sm font-black tracking-tight leading-snug whitespace-pre-line">
                    {SAFETY_CARDS[1].headline}
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 3 — bottom-center */}
            <div
              className={`${SAFETY_CARDS[2].floatClass} absolute bottom-[8%] left-[22%] w-[40%] aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl z-20 group cursor-default`}
            >
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SAFETY_CARDS[2].img}
                  alt={SAFETY_CARDS[2].tag}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase mb-1">
                    {SAFETY_CARDS[2].tag}
                  </p>
                  <h4 className="text-sm font-black tracking-tight leading-snug whitespace-pre-line">
                    {SAFETY_CARDS[2].headline}
                  </h4>
                </div>
              </div>
            </div>

            {/* Glassmorphic metric pill 1 — top-right */}
            <div className="floating-pill-1 absolute top-[6%] right-[8%] z-30 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-3 rounded-xl shadow-xl select-none">
              <span className="block text-2xl font-black text-neutral-900 leading-none">
                {SAFETY_METRICS[0].value}
              </span>
              <span className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase mt-1 block">
                {SAFETY_METRICS[0].label}
              </span>
            </div>

            {/* Glassmorphic metric pill 2 — bottom-left */}
            <div className="floating-pill-2 absolute bottom-[22%] right-[10%] z-30 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-3 rounded-xl shadow-xl select-none">
              <span className="block text-2xl font-black text-neutral-900 leading-none">
                {SAFETY_METRICS[1].value}
              </span>
              <span className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase mt-1 block">
                {SAFETY_METRICS[1].label}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            BOTTOM QUOTE STRIP — Chairman's commitment statement
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 pt-12 border-t border-neutral-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center">
            {/* SK brand monogram */}
            <div className="flex-shrink-0 w-14 h-14 border border-neutral-300 flex items-center justify-center rounded-sm bg-white shadow-sm">
              <span className="text-sm font-black text-neutral-900 tracking-tighter">SK</span>
            </div>

            {/* Quote text */}
            <blockquote>
              <p className="text-xl md:text-2xl lg:text-3xl font-black text-neutral-900 leading-[1.15] tracking-tight mb-5">
                &ldquo;We do not simply extract minerals from the earth. We
                extract{" "}
                <span className="text-neutral-300">
                  the promise of a safer tomorrow
                </span>{" "}
                from the dedication of our people.&rdquo;
              </p>
              <footer>
                <cite className="not-italic text-sm font-bold text-neutral-900 block">
                  S.K. Thakur
                </cite>
                <p className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
                  Chairman &amp; Managing Director, SKT Global
                </p>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
