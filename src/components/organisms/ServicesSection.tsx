"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench, Package, Truck, Shield, Network, Monitor,
  Users, Settings, TrendingUp, ShieldCheck, Building2, Globe,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { OperationalScaleSection } from "./OperationalScaleSection";
import { CARDS } from "@/lib/servicesData";
export type { ServiceCard } from "@/lib/servicesData";

// ─── Icon lookup (client-side only) ──────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Wrench, Package, Truck, Shield, Network, Monitor,
  Users, Settings, TrendingUp, ShieldCheck, Building2, Globe,
};



// Duplicate for seamless infinite loop
const ROW_A = [...CARDS, ...CARDS];

// ─── Single Card ─────────────────────────────────────────────────────────────

function SliderCard({ card, verticalOffset = 0 }: { card: typeof CARDS[0]; verticalOffset?: number }) {
  const Icon = ICON_MAP[card.iconName] ?? Wrench;
  const hasBg = !!card.bgImage;

  return (
    <div
      className={`group relative flex-shrink-0 w-[350px] h-[520px] mx-3 rounded-2xl cursor-default select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hasBg
          ? "text-white bg-neutral-950 border border-white/10"
          : "bg-white text-neutral-900 border border-neutral-100/70"
      }`}
      style={{
        transform: `translateY(${verticalOffset}px)`,
        boxShadow: hasBg ? "0 10px 40px rgba(0,0,0,0.3)" : "0 4px 24px rgba(0,0,0,0.03)",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = `translateY(${verticalOffset - 8}px)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = hasBg
          ? "0 30px 60px rgba(0,0,0,0.5)"
          : "0 20px 48px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.borderColor = hasBg
          ? "rgba(255,255,255,0.2)"
          : "rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = `translateY(${verticalOffset}px)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = hasBg
          ? "0 10px 40px rgba(0,0,0,0.3)"
          : "0 4px 24px rgba(0,0,0,0.03)";
        (e.currentTarget as HTMLDivElement).style.borderColor = hasBg
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.07)";
      }}
    >
      {/* Background Image */}
      {hasBg && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{ backgroundImage: `url("${encodeURI(card.bgImage)}")` }}
        />
      )}

      {/* Bottom 65% gradient — text area only, image stays visible on top */}
      {hasBg && (
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      )}

      {/* Ghost Number — light cards only */}
      {!hasBg && (
        <span className="absolute top-6 right-7 text-6xl font-black text-neutral-100/60 select-none pointer-events-none">
          {card.num}
        </span>
      )}

      {/* Icon — light cards only, top left */}
      {!hasBg && (
        <div className="absolute top-6 left-7 w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-800 transition-all duration-300 group-hover:scale-105">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      )}

      {/* Card content pinned to bottom */}
      <div className="relative z-10 flex flex-col justify-end h-full p-7">
        {/* Icon above title — dark cards only */}
        {hasBg && (
          <div className="w-9 h-9 flex items-center justify-center rounded-xl mb-3 bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
            <Icon size={16} className="text-white" strokeWidth={1.5} />
          </div>
        )}

        {/* Title */}
        <h3
          style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "6px" }}
          className={`leading-tight transition-colors duration-300 ${
            hasBg ? "text-white" : "text-neutral-900"
          }`}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{ fontSize: "13px", opacity: 0.7, lineHeight: "1.55", marginBottom: "12px" }}
          className={`line-clamp-2 max-w-[260px] transition-colors duration-300 ${
            hasBg ? "text-neutral-100" : "text-neutral-600"
          }`}
        >
          {card.desc}
        </p>

        {/* Tags — max 2 */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {card.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
              className={`font-semibold uppercase px-2.5 py-1 rounded-full transition-all duration-300 ${
                hasBg
                  ? "text-neutral-200 bg-white/10 border border-white/10 backdrop-blur-sm group-hover:bg-white/15"
                  : "text-neutral-500 bg-neutral-50 border border-neutral-100"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider + Explore link */}
        <div
          className={`border-t pt-4 transition-colors duration-300 ${
            hasBg ? "border-white/10" : "border-neutral-100"
          }`}
        >
          <Link
            href={`/services/${card.slug}`}
            style={{ fontSize: "13px", fontWeight: 500 }}
            className={`inline-flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5 ${
              hasBg
                ? "text-white/70 group-hover:text-white"
                : "text-neutral-500 group-hover:text-neutral-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            Explore →
          </Link>
        </div>
      </div>

      {/* Bottom accent line — light cards hover */}
      {!hasBg && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-900 rounded-b-2xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      )}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function ServicesSection(): JSX.Element {
  const rowARef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const rowA = rowARef.current;
    const stage = stageRef.current;
    if (!rowA || !stage) return;

    const SPEED = 0.4125;          // base auto-scroll px/frame
    const DRAG_FACTOR = 1.2;       // how sensitive drag feels
    const INERTIA = 0.88;          // drag inertia after release (0 = stop, 1 = never stop)
    const RESUME_EASE = 0.06;      // how quickly speed recovers on resume

    let posA = 0;
    let paused = false;
    let dragging = false;
    let dragStartX = 0;
    let velA = 0;
    let currentSpeedA = SPEED;

    // Track dynamic half width
    let halfA = rowA!.scrollWidth / 2 || 2244; // Fallback to estimated 12 cards * 374px / 2 = 2244px

    const updateHalfWidth = () => {
      const w = rowA!.scrollWidth;
      if (w > 0) {
        halfA = w / 2;
      }
    };

    // Use ResizeObserver to update width on window resize, image load, etc.
    const resizeObserver = new ResizeObserver(() => {
      updateHalfWidth();
    });
    resizeObserver.observe(rowA!);

    // Initial check
    updateHalfWidth();

    // ── wrap helper ───────────────────────────────────────────────────────
    function wrap(pos: number, half: number, dir: 1 | -1) {
      if (dir === -1 && pos <= -half) return pos + half;
      if (dir === 1 && pos >= half) return pos - half;
      if (pos > 0) return pos - half;
      if (pos < -half) return pos + half;
      return pos;
    }

    // ── RAF tick ──────────────────────────────────────────────────────────
    let lastTime = performance.now();

    function tick(now: number) {
      const delta = (now - lastTime) / 16.666; // Normalize to 60fps (16.67ms)
      lastTime = now;

      // Limit delta to avoid huge jumps on tab switch/suspend
      const d = Math.min(delta, 3);

      if (!paused && !dragging) {
        currentSpeedA += (SPEED - currentSpeedA) * RESUME_EASE * d;
        posA = wrap(posA - currentSpeedA * d, halfA, -1);
      }

      if (dragging) {
        // Position updated directly in move handler; decay dragging velocity to avoid jumps
        velA *= Math.pow(0.8, d);
      } else if (paused && !dragging && Math.abs(velA) > 0.05) {
        velA *= Math.pow(INERTIA, d);
        posA = wrap(posA + velA, halfA, -1);
      }

      rowA!.style.transform = `translate3d(${posA}px,0,0)`;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    // ── Hover pause ───────────────────────────────────────────────────────
    function onEnter() {
      paused = true;
      stage!.style.cursor = 'grab';
    }
    function onLeave() {
      if (!dragging) {
        paused = false;
        currentSpeedA = 0;
        stage!.style.cursor = '';
      }
    }

    // ── Drag ──────────────────────────────────────────────────────────────
    function onMouseDown(e: MouseEvent) {
      dragging = true;
      dragStartX = e.clientX;
      velA = 0;
      stage!.style.cursor = 'grabbing';
      e.preventDefault();
    }
    function onMouseMove(e: MouseEvent) {
      if (!dragging) return;
      const dx = (e.clientX - dragStartX) * DRAG_FACTOR;
      dragStartX = e.clientX;
      posA = wrap(posA + dx, halfA, -1);
      velA = dx;
    }
    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      stage!.style.cursor = paused ? 'grab' : '';
    }

    // ── Touch ─────────────────────────────────────────────────────────────
    let touchStartX = 0;
    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      dragging = true;
      touchStartX = touch.clientX;
      velA = 0;
      paused = true;
    }
    function onTouchMove(e: TouchEvent) {
      if (!dragging) return;
      const touch = e.touches[0];
      if (!touch) return;
      const dx = (touch.clientX - touchStartX) * DRAG_FACTOR;
      touchStartX = touch.clientX;
      posA = wrap(posA + dx, halfA, -1);
      velA = dx;
    }
    function onTouchEnd() {
      dragging = false;
      paused = false;
      currentSpeedA = 0;
    }

    stage.addEventListener('mouseenter', onEnter);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: true });
    stage.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      stage.removeEventListener('mouseenter', onEnter);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Removing alternating vertical offsets to keep all cards perfectly aligned
  const vertOffsets = [0, 0, 0, 0, 0, 0];

  return (
    <>
      <section
        id="services"
      className="bg-white overflow-hidden"
      aria-labelledby="services-heading"
      style={{ paddingTop: "96px", paddingBottom: "96px" }}
    >
      {/* ── Header ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.28em] text-neutral-400 uppercase mb-5"
            >
              What We Do
            </motion.p>

            <motion.h2
              id="services-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-none"
            >
              Core
              <br />
              <span className="text-neutral-300">Capabilities</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 border border-neutral-200 rounded-full px-6 py-3 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
            >
              View Systems →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Slider Stage ── */}
      <div
        ref={stageRef}
        className="relative"
        style={{
          userSelect: "none",
        }}
      >
        {/* Single row → scrolls left */}
        <div className="overflow-hidden" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <div
            ref={rowARef}
            className="flex"
            style={{ willChange: "transform" }}
          >
            {ROW_A.map((card, i) => (
              <SliderCard key={`a-${i}`} card={card} verticalOffset={vertOffsets[i % 6] ?? 0} />
            ))}
          </div>
        </div>
      </div>


    </section>

    {/* Operational Scale Section */}
    <OperationalScaleSection />
  </>
  );
}
