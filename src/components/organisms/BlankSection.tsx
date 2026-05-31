"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { JSX } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { LOCATIONS, PROVINCES, type Location } from "@/data/zambiaLocations";


const FILTERS = [
  { id: "all",    label: "All Branches",    sublabel: "Full Network"   },
  { id: "hq",     label: "Head Office",     sublabel: "Lusaka HQ"      },
  { id: "major",  label: "Major Cities",   sublabel: "Provincial"     },
  { id: "mall",   label: "Mall Branches",  sublabel: "Retail"         },
  { id: "branch", label: "Local Branches", sublabel: "Community"      },
];

/**
 * Cinematic GSAP scroll-driven expanding circle transition.
 *
 * Color journey (directly tied to scroll):
 *   0%  – 50% : Crimson      (#E11D48)
 *   50% – 100%: Deep Navy    (#0B0F19)
 */
export function BlankSection(): JSX.Element {
  // ─── States ──────────────────────────────────────────────────────────────────
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  const filteredLocations = useMemo(() =>
    activeFilter === "all"
      ? LOCATIONS
      : LOCATIONS.filter((l) => l.type === activeFilter),
    [activeFilter]
  );

  // ─── Refs ────────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mapPathRef = useRef<SVGGElement>(null);

  // Using SVG elements for mathematical precision scaling
  const circleRef = useRef<SVGCircleElement>(null);
  const coreRef = useRef<SVGGElement>(null);

  const revealRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // ─── GSAP ScrollTrigger Setup ─────────────────────────────────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let mounted = true;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Full desktop animation (min-width: 1024px) ───────────────────
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          let isAnimating = false;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 30%",     // Starts when the top of section is 30% from the viewport top
              end: "bottom bottom",
              scrub: 0.1,           // Instant, lag-free scrub response
              onUpdate: (self) => {
                if (isAnimating) return;
                const progress = self.progress;
                if (progress > 0.01 && progress < 0.99) {
                  isAnimating = true;
                  const targetY = self.direction === 1 ? self.end : self.start;
                  const scrollObj = { y: window.scrollY };
                  
                  gsap.to(scrollObj, {
                    y: targetY,
                    duration: 1.0,
                    ease: "power2.inOut",
                    onUpdate: () => window.scrollTo(0, scrollObj.y),
                    onComplete: () => {
                      isAnimating = false;
                    }
                  });
                }
              }
            },
            defaults: { ease: "none" },
          });

          // ── 0.0 → 1.5 : Layer 1 slides up and fades in
          tl.fromTo(contentRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
            0,
          );

          // ── 0.0 → 1.5 : Scroll hint fades
          tl.to(hintRef.current,
            { opacity: 0, duration: 1.5 },
            0,
          );

          // ── 3.5 → 4.2 : Core dot disappears as portal opens
          tl.to(coreRef.current,
            { opacity: 0, scale: 0, transformOrigin: "center", duration: 0.7, ease: "power3.in" },
            3.5,
          );

          // ── 3.5 → 5.5 : Layer 1 Text and Base Map fades out smoothly as portal expands
          tl.to([copyRef.current, mapPathRef.current],
            { opacity: 0, duration: 2.0, ease: "power2.inOut" },
            3.5,
          );

          // ── 3.5 → 7.0 : Circle expands (r 0 -> 2500)
          tl.to(circleRef.current,
            { attr: { r: 2500 }, duration: 3.5, ease: "power2.out" },
            3.5,
          );

          // ── 3.5 → 7.0 : COLOR transition: Crimson -> Deep Navy
          tl.to(circleRef.current,
            { fill: "#0B0F19", duration: 3.5 },
            3.5,
          );

          // ── 5.2 → 7.0 : Reveal content rises and fades in
          tl.fromTo(revealRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.8, ease: "power2.out" },
            5.2,
          );

          return () => tl.scrollTrigger?.kill();
        });

        // ── Mobile / Reduced motion: stacked vertical layout fallback ─────────────
        mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
          gsap.set(contentRef.current, { opacity: 1 });
          gsap.set(revealRef.current, { opacity: 1 });
          gsap.set(circleRef.current, { opacity: 0 }); // Hide expanding circle, fallback uses CSS background
          gsap.set(hintRef.current, { opacity: 0 });
        });
      }, containerRef);
    };

    init();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      id="operations-map"
      className="relative h-auto lg:h-[130vh]"
    >
      {/* ── Viewport container ── */}
      <div className="relative lg:sticky top-0 h-auto lg:h-screen overflow-hidden bg-white flex flex-col lg:block">

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 1 — Initial editorial content
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={contentRef}
          className="relative lg:absolute inset-0 flex items-center lg:opacity-0 py-16 lg:py-0"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left: Copy */}
              <div ref={copyRef}>
                <h3 className="text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase mb-5">
                  Underground Operations
                </h3>
                <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[1.05] mb-8">
                  Zambia <br />
                  <span className="text-neutral-300">Mining Ecosystem</span>
                </h2>
                <p className="text-neutral-500 max-w-lg text-base leading-relaxed">
                  SKT Global’s operations in Zambia are built around underground mechanisation, operational infrastructure, workforce development, and long-term mining sustainability. Continuous investment in underground equipment, operational systems, and workforce expansion is strengthening long-term mining continuity.
                </p>
              </div>

              {/* Right: SVG Operations Map */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-contain overflow-visible"
                >
                  <g ref={mapPathRef}>
                    {/* Detailed map image */}
                    <image
                      href="/zambia-map-detailed.webp"
                      x="0"
                      y="0"
                      width="800"
                      height="500"
                      preserveAspectRatio="xMidYMid contain"
                    />
                  </g>

                  {/* LAYER 2 — The expanding circle portal (starts small, hidden behind dot) */}
                  <circle
                    ref={circleRef}
                    cx="440"
                    cy="240"
                    r="0"
                    fill="#E11D48" // Crimson
                  />

                  {/* The interactive dot/pin placed precisely in the SVG */}
                  <g ref={coreRef} className="map-pin" transform="translate(440, 240)" style={{ cursor: "pointer" }}>
                    {/* Pulsing Outer Ring */}
                    <circle r="20" fill="transparent" stroke="#E11D48" strokeWidth="6" className="animate-pulse" />
                    {/* Solid Inner Dot */}
                    <circle r="8" fill="#E11D48" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            LAYER 3 — Zambia Branch Network (Revealed content)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={revealRef}
          className="relative lg:absolute inset-0 flex flex-col items-center justify-center lg:opacity-0 bg-[#0B0F19] lg:bg-transparent py-16 lg:py-0 overflow-y-auto"
          style={{ zIndex: 50 }}
        >
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10 text-white">

            {/* ── Header ── */}
            <div className="flex items-start justify-between border-b border-white/10 pb-6 w-full select-none">
              <div>
                <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-white/50">
                  Zambia Operations
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white mt-1">
                  SKT Branch Network
                </h2>
              </div>
              {/* Stats inline */}
              <div className="hidden sm:flex items-center gap-8 text-right">
                <div>
                  <p className="text-2xl font-black text-white">40+</p>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-white/40">Branches</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">10</p>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-white/40">Provinces</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">24/7</p>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-white/40">Service</p>
                </div>
              </div>
            </div>

            {/* ── Map + Sidebar Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Filter Sidebar — 3 Cols */}
              <div className="lg:col-span-3 flex flex-col gap-1 bg-black/25 backdrop-blur-md p-5 rounded-2xl border border-white/5 w-full">
                <p className="text-[10px] font-extrabold tracking-[0.28em] uppercase text-white/40 mb-3">
                  Filter Branches
                </p>

                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`relative flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-300 group border ${
                        isActive
                          ? "bg-white/8 border-white/10"
                          : "bg-transparent border-transparent hover:bg-white/5"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-rose-600 rounded-r-full" />
                      )}
                      <div className="pl-3">
                        <p className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/60 group-hover:text-white"
                        }`}>
                          {filter.label}
                        </p>
                        <p className="text-[10px] text-white/30 font-medium">
                          {filter.sublabel}
                        </p>
                      </div>
                      <MapPin
                        size={12}
                        className={`transition-all duration-300 ${
                          isActive ? "text-rose-500 scale-110" : "text-white/15 group-hover:text-white/35"
                        }`}
                      />
                    </button>
                  );
                })}

                {/* Legend */}
                <div className="mt-5 pt-5 border-t border-white/10 space-y-2.5">
                  {[
                    { color: "bg-rose-500",   label: "Head Office" },
                    { color: "bg-amber-400",  label: "Major Cities" },
                    { color: "bg-blue-400",   label: "Mall Branches" },
                    { color: "bg-white/50",   label: "Local Branches" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                      <p className="text-[11px] text-white/40">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Canvas — 9 Cols */}
              <div className="lg:col-span-9 relative">
                <div className="relative w-full" style={{ paddingBottom: "70%" }}>

                  {/* Real Zambia operations map image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/zambia-operations-nobgs.webp"
                      alt="SKT Zambia Branch Network Map"
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-contain select-none pointer-events-none"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Location pins */}
                  {filteredLocations.map((location) => {
                    const isHovered = hoveredLocation?.id === location.id;
                    const isHQ = location.isMain === true;

                    const dotColor =
                      location.type === "hq"    ? "bg-rose-500" :
                      location.type === "major" ? "bg-amber-400" :
                      location.type === "mall"  ? "bg-blue-400"  :
                      "bg-white/60";

                    return (
                      <button
                        key={location.id}
                        onMouseEnter={() => setHoveredLocation(location)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        className="absolute group"
                        style={{
                          left: `${location.x}%`,
                          top: `${location.y}%`,
                          transform: "translate(-50%,-50%)",
                          zIndex: isHQ ? 20 : 10,
                        }}
                      >
                        {/* Ping for HQ */}
                        {isHQ && (
                          <>
                            <div className="absolute inset-0 -translate-x-[3px] -translate-y-[3px] w-5 h-5 rounded-full bg-rose-500/70 animate-ping" />
                            <div
                              className="absolute inset-0 -translate-x-[3px] -translate-y-[3px] w-5 h-5 rounded-full bg-rose-500/40 animate-ping"
                              style={{ animationDelay: "0.6s" }}
                            />
                          </>
                        )}

                        {/* Pin dot */}
                        <div
                          className={`relative rounded-full border-2 border-white/80 shadow-lg transition-all duration-300 ${
                            isHQ ? "w-3 h-3" : "w-2 h-2"
                          } ${dotColor} ${isHovered ? "scale-150" : "scale-100"}`}
                        />

                        {/* Hover / permanent label */}
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                            isHovered || isHQ ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <p className="text-[10px] font-semibold tracking-wide text-white drop-shadow-sm">
                            {location.name}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Hover Tooltip */}
                  {hoveredLocation && (
                    <div
                      className="absolute bottom-4 right-4 bg-[#0B1A3A]/95 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[200px] shadow-2xl pointer-events-none"
                      style={{ zIndex: 30 }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <MapPin size={12} className="text-rose-500" />
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50">
                          {PROVINCES.find((p) => p.id === hoveredLocation.province)?.name}
                        </p>
                      </div>
                      <p className="text-base font-bold text-white leading-tight mb-0.5">
                        {hoveredLocation.name}
                      </p>
                      <p className="text-[11px] text-white/40 capitalize">
                        {hoveredLocation.type === "hq"     ? "Head Office"   :
                         hoveredLocation.type === "major"  ? "Major Branch"  :
                         hoveredLocation.type === "mall"   ? "Mall Location" :
                         "Local Branch"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile stats bar */}
                <div className="flex sm:hidden items-center justify-around mt-6 border-t border-white/10 pt-5">
                  {[
                    { val: "40+", label: "Branches"  },
                    { val: "10",  label: "Provinces" },
                    { val: "24/7",label: "Service"   },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-2xl font-black text-white">{val}</p>
                      <p className="text-[9px] tracking-[0.18em] uppercase text-white/40 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SCROLL HINT — fades as user begins scrolling (Desktop Only)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={hintRef}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
          style={{ zIndex: 60 }}
        >
          <span className="text-[10px] font-bold tracking-[0.45em] text-neutral-400 uppercase">
            Explore Operations ↓
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
