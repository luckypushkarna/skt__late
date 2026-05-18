"use client";

import { JSX, useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Safety pillars — each maps to one image card ───────────────────────────
const PILLARS = [
  {
    num: "01",
    title: "Hazard Elimination",
    body: "Every task begins with a structured risk assessment and live environmental monitoring to eliminate hazards before they form.",
    tag: "Risk Assessment",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&auto=format&fit=crop&q=85",
  },
  {
    num: "02",
    title: "Worker Protection Systems",
    body: "State-of-the-art PPE, atmospheric sensors, and automated ventilation guard every underground crew, 24 hours a day.",
    tag: "PPE & Monitoring",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&auto=format&fit=crop&q=85",
  },
  {
    num: "03",
    title: "Continuous Training",
    body: "Over 5,000 hours of structured safety education per year ensure every SKT professional knows exactly what to do.",
    tag: "Safety Training",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&auto=format&fit=crop&q=85",
  },
  {
    num: "04",
    title: "Emergency Readiness",
    body: "Dedicated rescue teams, sub-5-minute response protocols, and on-site medical infrastructure keep our people covered.",
    tag: "Emergency Response",
    img: "https://images.unsplash.com/photo-1578496480157-697fc14d2e55?w=900&auto=format&fit=crop&q=85",
  },
  {
    num: "05",
    title: "Community Safety Culture",
    body: "Beyond the mine, SKT Global extends its safety philosophy into surrounding communities through education, awareness, and active partnership programs.",
    tag: "Community Programs",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=85",
  },
] as const;

// ─── Stack layout offsets for inactive cards ─────────────────────────────────
const STACK_OFFSETS = [
  { x: 0,   y: 0,    scale: 1,    z: 50, opacity: 1    }, // active (front)
  { x: 12,  y: -12,  scale: 0.95, z: 40, opacity: 0.72 }, // 2nd
  { x: 22,  y: -22,  scale: 0.90, z: 30, opacity: 0.50 }, // 3rd
  { x: 30,  y: -30,  scale: 0.85, z: 20, opacity: 0.32 }, // 4th
  { x: 37,  y: -37,  scale: 0.80, z: 10, opacity: 0.18 }, // 5th (back)
];

export function StatsSection(): JSX.Element {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const pillarsRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Auto-cycle (Runs dynamically every 3 seconds) ─────────────────────────
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!paused) {
        setActive((p) => (p + 1) % PILLARS.length);
      }
    }, 3000); // 3 seconds transition
  }, [paused]);

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [startAuto, paused]);

  // ── Manual Click Handler (Resets the 3s interval gracefully) ──────────────
  const handlePillarClick = (index: number) => {
    setActive(index);
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!paused) {
        setActive((p) => (p + 1) % PILLARS.length);
      }
    }, 3000);
  };

  // ── GSAP: Headline word-reveal ─────────────────────────────────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Word-by-word headline reveal
        if (headlineRef.current) {
          const words = headlineRef.current.innerHTML.split(" ");
          headlineRef.current.innerHTML = words
            .map(
              (w) =>
                `<span class="safety-word inline-block" style="opacity:0;transform:translateY(40px) rotate(-2deg);filter:blur(6px)">${w}</span>`
            )
            .join(" ");

          const wordEls = headlineRef.current.querySelectorAll<HTMLSpanElement>(".safety-word");
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

        // ScrollTrigger typography highlight reveal (Word-by-Word Scroll Synchronization)
        const highlightEl = sectionRef.current?.querySelector<HTMLSpanElement>(".quote-highlight");
        if (highlightEl) {
          const words = highlightEl.innerText.split(/\s+/);
          highlightEl.innerHTML = words
            .map(
              (w) =>
                `<span class="quote-reveal-word text-neutral-300 inline-block mr-1.5" style="color: #D4D4D4">${w}</span>`
            )
            .join("");

          const wordEls = highlightEl.querySelectorAll(".quote-reveal-word");
          gsap.to(wordEls, {
            scrollTrigger: {
              trigger: highlightEl,
              start: "top 95%", // Starts right as the quote climbs into the view
              end: "bottom 70%", // Ends when it reaches 70% height
              scrub: 0.5, // Eased scrollbar scrubbing
            },
            color: "#171717", // Transition color to solid premium black (neutral-900)
            stagger: 0.08, // Word-by-word staggered reveal mapped to scrollbar!
            ease: "none",
          });
        }
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  // ── Stack position for each card given active index ─────────────────────
  const getStackStyle = (cardIndex: number) => {
    const steps = (cardIndex - active + PILLARS.length) % PILLARS.length;
    const off = STACK_OFFSETS[steps] || { x: 0, y: 0, scale: 1, z: 0, opacity: 0 };
    return {
      transform: `translate(${off.x}px, ${off.y}px) scale(${off.scale})`,
      zIndex: off.z,
      opacity: off.opacity,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative py-24 md:py-32 bg-[#F5F5F3] overflow-hidden"
      aria-labelledby="safety-heading"
    >
      {/* ── Industrial background grid ─────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.025)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-neutral-200/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-neutral-200/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ══════════════════════════════════════════════════════════════
            TOP — Editorial Header Block
        ══════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl space-y-6 mb-16">
          {/* Label */}
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

          {/* Headline — GSAP word-reveal */}
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
            principle: zero harm to our people, our communities, and our environment.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MIDDLE — 2-Column Symmetrical Workspace
        ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — Clickable pillars (Symmetrical, Stable Heights) */}
          <div className="lg:col-span-6">
            <div ref={pillarsRef} className="space-y-0 border-t border-neutral-200">
              {PILLARS.map((p, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={p.num}
                    onClick={() => handlePillarClick(i)}
                    className={`relative w-full text-left group flex gap-5 items-start pt-5 pb-6 pl-6 border-b border-neutral-200 last:border-0 transition-colors duration-300 ${
                      isActive ? "bg-white shadow-sm" : "bg-transparent hover:bg-white/40"
                    }`}
                  >
                    {/* Active Accent Left Border Indicator (Absolute to maintain stable height) */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pillar-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-900"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Badge Container */}
                    <div className="flex-shrink-0 mt-0.5 flex flex-col items-center">
                      <span
                        className={`w-8 h-8 rounded-sm border flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 ${
                          isActive
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 bg-white text-neutral-700 group-hover:border-neutral-700"
                        }`}
                      >
                        {p.num}
                      </span>
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-bold tracking-wide transition-colors duration-300 ${
                          isActive ? "text-neutral-900 font-extrabold" : "text-neutral-700"
                        }`}
                      >
                        {p.title}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                        {p.body}
                      </p>
                    </div>

                    {/* Tag badge */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-shrink-0 self-start mt-0.5 text-[9px] font-bold tracking-widest text-neutral-400 uppercase border border-neutral-200 bg-white px-2 py-1 rounded-sm hidden sm:block mr-4"
                      >
                        {p.tag}
                      </motion.span>
                    )}

                    {/* Dynamic Horizontal Autoplay Progress Line (Under Each Individual Point) */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-200">
                      {isActive && (
                        <motion.div
                          key={`${active}-${paused}`}
                          initial={{ scaleX: 0 }}
                          animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
                          transition={{
                            duration: 3, // exactly 3 seconds
                            ease: "linear",
                          }}
                          className="absolute inset-y-0 left-0 w-full bg-neutral-950 origin-left"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Premium stacked image cards (Symmetric Centered Height) */}
          <div
            className="lg:col-span-6 relative flex items-center justify-center"
            style={{ height: "480px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); startAuto(); }}
          >
            {/* Stack container — cards are absolutely stacked */}
            <div className="relative" style={{ width: "360px", height: "440px" }}>

              {/* Render all 5 cards, stacked */}
              {PILLARS.map((p, i) => {
                const stackStyle = getStackStyle(i);
                const isActive = active === i;

                return (
                  <div
                    key={p.num}
                    onClick={() => handlePillarClick(i)}
                    className="absolute inset-0 rounded-[28px] overflow-hidden cursor-pointer"
                    style={{
                      ...stackStyle,
                      transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease, box-shadow 0.45s ease",
                      boxShadow: isActive
                        ? "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)"
                        : "0 8px 24px rgba(0,0,0,0.10)",
                    }}
                  >
                    {/* Photo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.img}
                      alt={p.tag}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{
                        transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                        transform: isActive ? "scale(1.03)" : "scale(1)",
                        filter: isActive ? "brightness(1)" : "brightness(0.85)",
                      }}
                    />

                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

                    {/* Bottom label — only on active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key={`label-${i}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute bottom-0 left-0 right-0 p-7"
                        >
                          <p className="text-[9px] font-extrabold tracking-[0.3em] text-white/50 uppercase mb-2">
                            {p.tag}
                          </p>
                          <h4 className="text-xl font-black text-white tracking-tight leading-tight">
                            {p.title}
                          </h4>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Dot pagination indicator */}
              <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-2">
                {PILLARS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePillarClick(i)}
                    className={`rounded-full transition-all duration-400 ${
                      active === i
                        ? "w-6 h-1.5 bg-neutral-900"
                        : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500"
                    }`}
                    aria-label={`Go to safety pillar ${i + 1}`}
                  />
                ))}
              </div>
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
          className="mt-28 pt-12 border-t border-neutral-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center">
            {/* Chairman's premium executive portrait */}
            <div className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-2xl bg-neutral-200 border border-neutral-300/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=85"
                alt="S.K. Thakur, Chairman"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote text */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl font-black text-neutral-900 leading-[1.15] tracking-tight">
                &ldquo;We do not simply extract minerals from the earth. We extract{" "}
                <span className="quote-highlight text-neutral-300">
                  the promise of a safer tomorrow from the dedication of our people.&rdquo;
                </span>
              </p>
              <div>
                <span className="text-sm font-bold text-neutral-900 block">
                  S.K. Thakur
                </span>
                <span className="text-xs text-neutral-500 font-medium tracking-wide uppercase block mt-1">
                  Chairman &amp; Managing Director, SKT Global
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
