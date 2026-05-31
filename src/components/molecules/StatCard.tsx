"use client";

import { useEffect, useRef, JSX, memo } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

interface StatCardProps {
  readonly stat: Stat;
  readonly index: number;
  readonly className?: string;
}

/**
 * Detect decimal places from the original string, e.g. "2.5" → 1, "47" → 0
 */
function getDecimalPlaces(raw: string): number {
  const cleaned = raw.replace(/,/g, "");
  const dot = cleaned.indexOf(".");
  return dot === -1 ? 0 : cleaned.length - dot - 1;
}

/**
 * Format a live-counter number to match the original value's decimal places.
 * Adds comma-separators for integers ≥ 1000.
 */
function fmt(value: number, dp: number): string {
  if (dp > 0) return value.toFixed(dp);
  return Math.round(value).toLocaleString("en-US");
}

export const StatCard = memo(function StatCard({ stat, index, className }: StatCardProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const hasAnimated = useRef(false);

  // Parse numeric target from value string (handles "4200", "47", "2.5", etc.)
  const rawNumeric = parseFloat(stat.value.replace(/,/g, ""));
  const isText = isNaN(rawNumeric); // e.g. "Zero"
  const dp = getDecimalPlaces(stat.value);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !valueRef.current) return;
    hasAnimated.current = true;

    const el = valueRef.current;
    let timer1: NodeJS.Timeout | null = null;
    let timer2: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;
    let gsapTween: any = null;
    let mounted = true;

    // ── Typewriter for text values (e.g. "Zero") ──────────────────────────
    if (isText) {
      const chars = stat.value.split("");
      const cursor = cursorRef.current;
      el.textContent = "";
      let i = 0;

      // Initial delay matches the card's stagger so it fires after the fade-up
      const startDelay = index * 120 + 300; // ms

      timer1 = setTimeout(() => {
        interval = setInterval(() => {
          if (!mounted || !el) return;
          el.textContent += chars[i] || "";
          i++;
          if (i >= chars.length) {
            if (interval) clearInterval(interval);
            // Blink cursor briefly then hide it
            if (cursor) {
              timer2 = setTimeout(() => {
                if (mounted && cursor) cursor.style.opacity = "0";
              }, 800);
            }
          }
        }, 90); // ~90ms per character — crisp, premium pacing
      }, startDelay);

      return () => {
        mounted = false;
        if (timer1) clearTimeout(timer1);
        if (timer2) clearTimeout(timer2);
        if (interval) clearInterval(interval);
      };
    }

    // ── Count-up for numeric values ───────────────────────────────────────
    const target = rawNumeric;
    const counter = { val: 0 };

    import("gsap").then(({ default: gsap }) => {
      if (!mounted) return;

      gsapTween = gsap.to(counter, {
        val: target,
        duration: 1.8,
        delay: index * 0.12,
        ease: "power4.out",
        onUpdate() {
          if (mounted && el) el.textContent = fmt(counter.val, dp);
        },
        onComplete() {
          if (mounted && el) el.textContent = fmt(target, dp);
        },
      });
    }).catch(() => {});

    return () => {
      mounted = false;
      if (gsapTween) gsapTween.kill();
    };
  }, [isInView, isText, stat.value, rawNumeric, dp, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group p-8 border-t border-neutral-200",
        "hover:border-neutral-900 transition-colors duration-300",
        className
      )}
    >
      {/* ── Value row ─────────────────────────────── */}
      <div className="flex items-baseline gap-1 mb-2">
        {stat.prefix && (
          <span className="text-2xl font-medium text-neutral-400">
            {stat.prefix}
          </span>
        )}

        <motion.span
          className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-none"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1 + 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {isText ? (
            // Text values: typewriter fills characters into valueRef
            <>
              <span ref={valueRef} />
              {/* Blinking cursor — fades out after typing completes */}
              <span
                ref={cursorRef}
                aria-hidden="true"
                className="inline-block w-[3px] h-[0.85em] bg-neutral-900 ml-[2px] align-middle"
                style={{
                  animation: "tw-blink 0.75s step-end infinite",
                }}
              />
              <style>{`
                @keyframes tw-blink {
                  0%, 100% { opacity: 1; }
                  50%       { opacity: 0; }
                }
              `}</style>
            </>
          ) : (
            // Numeric values: GSAP counts up via ref
            <span ref={valueRef}>0</span>
          )}
        </motion.span>

        {stat.suffix && (
          <span className="text-2xl font-bold text-neutral-400">
            {stat.suffix}
          </span>
        )}
      </div>

      {/* ── Label ─────────────────────────────────── */}
      <h3 className="text-sm font-semibold text-neutral-900 tracking-widest uppercase mb-1">
        {stat.label}
      </h3>

      {/* ── Description ───────────────────────────── */}
      {stat.description && (
        <p className="text-xs text-neutral-400 leading-relaxed">
          {stat.description}
        </p>
      )}
    </motion.div>
  );
});

StatCard.displayName = "StatCard";
