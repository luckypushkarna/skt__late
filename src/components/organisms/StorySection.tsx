"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";
import Image from "next/image";
import { JSX } from "react";

// ─── Safety Pillars Data ──────────────────────────────────────────────────────

const SAFETY_PILLARS = [
  {
    id: "zero-harm",
    number: "01",
    title: "Safety First. Always.",
    tagline: "Our core value, not a priority.",
    description:
      "We establish rigorous safety systems, robust compliance frameworks, and departmental standards designed to protect our people, assets, and operations, ensuring every employee returns home safely each day.",
    metric: "Zero",
    metricLabel: "Fatality rate across all sites",
    metricUnit: "",
    tag: "Strict Compliance",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Underground miner with helmet lamp in a tunnel",
    accent: "SAFETY SYSTEMS",
  },
  {
    id: "technology",
    number: "02",
    title: "Pioneering Innovation.",
    tagline: "Continuous improvement via Kaizen.",
    description:
      "Deploying a world-class mechanised mining fleet with down-the-hole drills, boomers, and rescue chambers, alongside continuous improvement Kaizen principles to make mining safer and more efficient.",
    metric: "225",
    metricLabel: "Active underground machines",
    metricUnit: "",
    tag: "Mechanised Mining",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Control room with multiple monitoring screens",
    accent: "MINING TECHNOLOGY",
  },
  {
    id: "people",
    number: "03",
    title: "Empowering Local Talent.",
    tagline: "The Ubuntu Mentorship Programme.",
    description:
      "Fostering localization by pairing each expatriate employee with at least two Zambian professionals, creating sustainable skills transfer and long-term career growth for local talent.",
    metric: "1500+",
    metricLabel: "Trained local professionals",
    metricUnit: "",
    tag: "Ubuntu Mentorship",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Worker team briefing session",
    accent: "WORKFORCE DEVELOPMENT",
  },
  {
    id: "planet",
    number: "04",
    title: "Investing in Communities.",
    tagline: "20% net profit allocation.",
    description:
      "Allocating 20% of net profits to Corporate Social Responsibility initiatives, strengthening local communities, enhancing livelihoods, and building enduring partnerships in Zambia.",
    metric: "20%",
    metricLabel: "Profit allocated to CSR",
    metricUnit: "",
    tag: "Social Impact",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=85&auto=format&fit=crop",
    imageAlt: "Landscape rehabilitation and environmental restoration",
    accent: "COMMUNITY IMPACT",
  },
] as const;

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedMetric({ value, isActive }: { value: string; isActive: boolean }) {
  const [displayed, setDisplayed] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;

    const isNumeric = /^\d/.test(value);
    if (!isNumeric) {
      setDisplayed(value);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/^[\d.]+/, "");
    const duration = 1200;
    const startTime = performance.now();

    function easeOut(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(t) * numericPart);
      setDisplayed(String(current) + suffix);
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isActive, value]);

  return <>{displayed}</>;
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function StorySection(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── GSAP scroll-driven card activation ───────────────────────────────────
  useEffect(() => {
    let ctx: { revert?: () => void } = {};

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx.revert = () => ScrollTrigger.getAll().forEach((t) => t.kill());

      // ── Observe which card is in the "active zone" ──────────────────────
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      // ── Progress line driven by scroll within section ───────────────────
      if (sectionRef.current && progressLineRef.current) {
        gsap.to(progressLineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
      }
    })();

    return () => ctx.revert?.();
  }, []);

  const activePillar = SAFETY_PILLARS[activeIndex]!;

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="relative bg-neutral-50"
      style={{ minHeight: "100vh" }}
    >
      {/* ─── Section Header (Mobile Only) ────────────────────────────────── */}
      <div className="lg:hidden max-w-screen-xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="dot" className="mb-6">
            Our Pillars
          </Badge>
        </motion.div>

        <motion.h2
          id="story-heading-mobile"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-black text-neutral-900 tracking-tight leading-none"
        >
          What Makes Us
          <br />
          <span className="text-neutral-300">Different</span>
        </motion.h2>
      </div>

      {/* ─── Sticky Two-Column Layout ────────────────────────────────────── */}
      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-12 pt-0 lg:pt-24">
        <div className="flex gap-8 lg:gap-16 items-start">

          {/* ── LEFT: Sticky Column (Header + Image Panel) ────────────────── */}
          <div
            ref={stickyRef}
            className="hidden lg:flex flex-col justify-between w-[38%] flex-shrink-0"
            style={{ position: "sticky", top: "12vh", height: "76vh" }}
          >
            {/* Sticky Header Portion */}
            <div className="mb-6 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="dot" className="mb-4">
                  Our Pillars
                </Badge>
              </motion.div>

              <motion.h2
                id="story-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-display-md font-black text-neutral-900 tracking-tight leading-none"
              >
                What Makes Us
                <br />
                <span className="text-neutral-300">Different</span>
              </motion.h2>
            </div>

            {/* Sticky Image Panel (takes the rest of the height) */}
            <div className="relative flex-grow h-0 w-full">
              {/* Progress line - left edge */}
              <div
                className="absolute -left-8 top-0 bottom-0 flex flex-col items-center gap-0"
                style={{ zIndex: 10 }}
              >
                {/* Track */}
                <div
                  className="relative w-px flex-1 bg-neutral-200"
                  style={{ overflow: "visible" }}
                >
                  {/* Active fill */}
                  <div
                    ref={progressLineRef}
                    className="absolute top-0 left-0 right-0 bg-neutral-900 origin-top"
                    style={{ bottom: 0, transform: "scaleY(0)" }}
                  />
                  {/* Active indicator dot */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neutral-900 border-2 border-neutral-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      top: `calc(${(activeIndex / (SAFETY_PILLARS.length - 1)) * 100}% - 5px)`,
                    }}
                  />
                </div>
              </div>

              {/* Pillar step dots */}
              <div
                className="absolute -left-14 top-0 bottom-0 flex flex-col justify-between py-2"
                style={{ zIndex: 10 }}
              >
                {SAFETY_PILLARS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="flex items-center gap-2 group"
                    aria-label={`Go to ${p.title}`}
                  >
                    <span
                      className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${activeIndex === i ? "text-neutral-900" : "text-neutral-300"
                        }`}
                    >
                      {p.number}
                    </span>
                  </button>
                ))}
              </div>

              {/* Image container */}
              <div
                ref={imageRef}
                className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-100"
                style={{
                  boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
                }}
              >
                {/* Images — all stacked, active one on top */}
                {SAFETY_PILLARS.map((pillar, i) => (
                  <div
                    key={pillar.id}
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform: activeIndex === i ? "scale(1.02)" : "scale(1.06)",
                      transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 38vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                    {/* Cinematic gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                  </div>
                ))}

                {/* Floating info card at bottom of image */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ zIndex: 10 }}
                >
                  {/* Active pillar badge */}
                  <div
                    className="inline-flex items-center gap-2 mb-3"
                    style={{
                      opacity: 1,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <span
                      className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/60"
                    >
                      {activePillar.accent}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <span
                      className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/60"
                    >
                      {activePillar.tag}
                    </span>
                  </div>

                  {/* Metric display */}
                  <div className="flex items-end gap-3">
                    <div>
                      <div
                        className="text-4xl font-black text-white leading-none tracking-tight"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
                      >
                        <AnimatedMetric
                          value={activePillar.metric}
                          isActive={true}
                          key={activePillar.id}
                        />
                      </div>
                      <div className="text-[10px] font-medium text-white/50 mt-1 tracking-wide uppercase">
                        {activePillar.metricLabel}
                      </div>
                    </div>

                    {/* Pulse indicator for zero harm */}
                    {activeIndex === 0 && (
                      <div className="mb-1 ml-2 relative flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/80" />
                        <div
                          className="absolute w-6 h-6 rounded-full border border-white/40 animate-ping"
                          style={{ animationDuration: "2s" }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Corner accent — industrial detail */}
                <div
                  className="absolute top-5 right-5 flex items-center gap-1.5"
                  style={{ zIndex: 10 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase">
                    {activePillar.number} / {SAFETY_PILLARS.length.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Scrolling Cards ────────────────────────────────────── */}
          <div className="flex-1 space-y-0 pb-20 lg:pb-[45vh] pt-4 lg:pt-[160px]">
            {SAFETY_PILLARS.map((pillar, index) => (
              <SafetyCard
                key={pillar.id}
                pillar={pillar}
                index={index}
                isActive={activeIndex === index}
                ref={(el) => { cardRefs.current[index] = el; }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Safety Card Component ────────────────────────────────────────────────────

interface SafetyCardProps {
  readonly pillar: (typeof SAFETY_PILLARS)[number];
  readonly index: number;
  readonly isActive: boolean;
}

import { forwardRef } from "react";

const SafetyCard = forwardRef<HTMLDivElement, SafetyCardProps>(
  ({ pillar, index, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className="relative py-16 border-t border-neutral-200 transition-all duration-700"
        style={{
          borderColor: isActive ? "rgba(0,0,0,0.18)" : undefined,
        }}
      >
        {/* Mobile image (shows on small screens, hidden on lg) */}
        <div
          className="lg:hidden relative w-full mb-8 rounded-xl overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={pillar.image}
            alt={pillar.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 10vw"
            className="object-cover"
            priority={index === 0}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>

        {/* Card content */}
        <div
          className="relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isActive ? 1 : 0.45,
            transform: isActive ? "translateX(0)" : "translateX(-6px)",
          }}
        >
          {/* Active state top bar */}
          <div
            className="absolute -left-6 top-0 bottom-0 w-[2px] bg-neutral-900 transition-all duration-500 origin-top"
            style={{
              transform: isActive ? "scaleY(1)" : "scaleY(0)",
              opacity: isActive ? 1 : 0,
            }}
          />

          {/* Number & Tag row */}
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-xs font-bold tracking-widest transition-colors duration-500"
              style={{ color: isActive ? "#171717" : "#d4d4d4" }}
            >
              {pillar.number}
            </span>
            <div
              className="flex items-center gap-1.5 transition-opacity duration-500"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              {/* Status dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-neutral-400">
                {pillar.tag}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3 transition-colors duration-500"
            style={{ color: isActive ? "#0a0a0a" : "#a3a3a3" }}
          >
            {pillar.title}
          </h3>

          {/* Tagline */}
          <p
            className="text-sm font-semibold text-neutral-400 mb-6 tracking-wide transition-opacity duration-500"
            style={{ opacity: isActive ? 1 : 0.6 }}
          >
            {pillar.tagline}
          </p>

          {/* Description — expands on active */}
          <div
            className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              maxHeight: isActive ? "200px" : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <p className="text-sm text-neutral-500 leading-[1.85] max-w-lg pb-8">
              {pillar.description}
            </p>
          </div>

          {/* Metric row — mobile only (desktop shows in image) */}
          <div
            className="lg:hidden flex items-center gap-6 transition-all duration-500"
            style={{ opacity: isActive ? 1 : 0.4 }}
          >
            <div>
              <div className="text-3xl font-black text-neutral-900 leading-none">
                {pillar.metric}
              </div>
              <div className="text-[10px] text-neutral-400 tracking-wide mt-1 uppercase">
                {pillar.metricLabel}
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
);

SafetyCard.displayName = "SafetyCard";
