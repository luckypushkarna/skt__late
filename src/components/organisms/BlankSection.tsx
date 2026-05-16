"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { JSX } from "react";

/**
 * Cinematic GSAP scroll-driven expanding circle transition.
 *
 * Color journey (directly tied to scroll):
 *   0%  – 30% : Deep red     (#9F1239)
 *   30% – 60% : Light purple (#A78BFA)
 *   60% – 100%: Light blue   (#60A5FA)
 *
 * The revealed section background seamlessly matches the final blue state.
 */
export function BlankSection(): JSX.Element {
  // ─── Refs ────────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // ─── GSAP ScrollTrigger Setup ─────────────────────────────────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Full animation (no reduced-motion preference) ───────────────────
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /**
           * Single scrubbed timeline.
           * Total duration = 10 units → maps linearly to scroll 0% → 100%.
           *
           * Time → Scroll mapping:
           *   0  → 0%
           *   1  → 10%
           *   3  → 30%
           *   6  → 60%
           *   10 → 100%
           */
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,   // snappy scrub
            },
            defaults: { ease: "none" }, // linear by default; eases specified per tween
          });

          // ── 0 → 0.8  : Section fades in (no y-shift — keeps image pinned)
          tl.fromTo(contentRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" },
            0,
          );

          // ── 0.8 → 1.6 : Content fades out (no y-shift — dot stays put)
          tl.to(contentRef.current,
            { opacity: 0, duration: 0.8, ease: "power2.in" },
            0.8,
          );

          // ── 0.8 → 2  : Core dot & glow disappear ─────────────────────────
          tl.to([coreRef.current, glowRef.current],
            { opacity: 0, scale: 0, duration: 0.6, ease: "power3.in" },
            0.4,
          );

          // ── 0 → 1.5  : Scroll hint fades ─────────────────────────────────
          tl.to(hintRef.current,
            { opacity: 0, duration: 0.6 },
            0,
          );

          // ── 1.5 → 10 : Circle expands (scale 1 → 170) ────────────────────
          //   170 × 20px = 3400px — safely covers any screen from corner position
          tl.fromTo(circleRef.current,
            { scale: 1, opacity: 1 },
            { scale: 170, duration: 5, ease: "power3.out", force3D: true },
            0.8,
          );

          // ── 1.5 → 4.5 : COLOR: deep red → light purple ───────────────────
          tl.to(circleRef.current,
            {
              backgroundColor: "#A78BFA",
              duration: 1.8,
            },
            0.8,
          );

          // ── 4.5 → 10  : COLOR: light purple → light blue ─────────────────
          tl.to(circleRef.current,
            {
              backgroundColor: "#60A5FA",
              duration: 3,
            },
            2.6,
          );

          // ── 7 → 10   : Reveal content rises in ───────────────────────────
          tl.fromTo(revealRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
            4.2,
          );

          return () => tl.scrollTrigger?.kill();
        });

        // ── Reduced motion: show static content, skip animation ─────────────
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(contentRef.current, { opacity: 1 });
          gsap.set(revealRef.current, { opacity: 0 });
          gsap.set(circleRef.current, { opacity: 0 });
        });
      }, containerRef);
    };

    init();

    return () => ctx?.revert();
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    /**
     * 500vh tall container — the extra height gives the scroll-linked
     * animation plenty of room to play out at a relaxed, cinematic pace.
     */
    <div
      ref={containerRef}
      id="operations-map"
      className="relative"
      style={{ height: "250vh" }}
    >
      {/* ── Sticky viewport (pinned 100vh) ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white">

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 1 — Initial editorial content
            (fades in on enter, fades out as circle begins expanding)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center opacity-0"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: Copy */}
              <div>
                <h3 className="text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase mb-5">
                  Operational Presence
                </h3>
                <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[1.05] mb-8">
                  Zambia <br />
                  <span className="text-neutral-300">Operations.</span>
                </h2>
                <p className="text-neutral-500 max-w-lg text-base leading-relaxed">
                  Our strategic operations in Zambia are built on a foundation of
                  technical precision and engineering excellence, driving regional
                  growth and industrial stability.
                </p>
              </div>

              {/* Right: Operations image */}
              <div className="relative w-full" style={{ aspectRatio: "1" }}>
                <Image
                  src="/zambia-operations-nobgs.png"
                  alt="SKT Global mining operations in Zambia"
                  fill
                  className="object-contain object-right"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 2 — The expanding circle portal
            Origin: positioned over the operational marker on the image.
            Expands via GSAP scale to fill the entire viewport.
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "37%",
            right: "19%",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Soft ambient glow ring — vanishes as circle grows */}
          <div
            ref={glowRef}
            className="absolute rounded-full"
            style={{
              width: "56px",
              height: "56px",
              inset: "-18px",
              background: "radial-gradient(circle, rgba(159,18,57,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Core indicator dot — springs in on mount, fades on scroll start */}
          <div
            ref={coreRef}
            className="relative rounded-full border-2 border-white"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#9F1239",
              zIndex: 1,
            }}
          />

          {/* ── THE PORTAL CIRCLE ──
              This single element scales from 20px → 3400px.
              backgroundColor interpolates: red → purple → blue.
              GPU-accelerated via will-change: transform. ── */}
          <div
            ref={circleRef}
            className="absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#9F1239",
              transformOrigin: "center center",
              willChange: "transform, background-color",
            }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 3 — Revealed content
            Sits above the expanding circle (z-50), fades in during last 30%
            of scroll. Background matches final blue circle state.
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={revealRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0"
          style={{ zIndex: 50 }}
        >
          <div className="text-center px-6 max-w-5xl mx-auto">

            <p className="text-[11px] font-extrabold tracking-[0.55em] uppercase mb-10"
              style={{ color: "rgba(255,255,255,0.5)" }}>
              SKT Global Mining · Zambia
            </p>

            <h2 className="font-black tracking-tight leading-[0.92] mb-10 text-white"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>
              Operational<br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>Excellence.</span>
            </h2>

            <p className="max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-20"
              style={{ color: "rgba(255,255,255,0.55)" }}>
              Engineering precision at the heart of Africa&apos;s Copperbelt.
              Transforming resources into regional progress.
            </p>

            {/* Stats row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-16">
              {[
                { value: "15+", label: "Years Active" },
                { value: "3", label: "Active Mines" },
                { value: "2,400+", label: "Workforce" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-black text-white mb-2 tracking-tight"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-extrabold tracking-[0.35em] uppercase"
                    style={{ color: "rgba(255,255,255,0.38)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SCROLL HINT — fades as user begins scrolling
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ zIndex: 60 }}
        >
          <span className="text-[10px] font-bold tracking-[0.45em] text-neutral-400 uppercase">
            Scroll to Enter
          </span>
          <div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, #a3a3a3, transparent)" }}
          />
        </div>

      </div>
    </div>
  );
}
