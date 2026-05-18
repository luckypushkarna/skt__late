"use client";

import { useRef, useEffect, useState } from "react";
import { JSX } from "react";
import { Layers, MapPin, Compass } from "lucide-react";

/**
 * Cinematic GSAP scroll-driven expanding circle transition.
 *
 * Color journey (directly tied to scroll):
 *   0%  – 50% : Crimson      (#E11D48)
 *   50% – 100%: Deep Navy    (#0B0F19)
 */
export function BlankSection(): JSX.Element {
  // ─── States ──────────────────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState("operations");

  const categories = [
    { id: "operations", title: "Underground Operations", subtitle: "Continuous Mechanised Mining" },
    { id: "infrastructure", title: "Infrastructure Systems", subtitle: "Engineering & Asset Support" },
    { id: "logistics", title: "Logistics Network", subtitle: "US$3M+ Parts Inventory" },
    { id: "support", title: "Operational Support", subtitle: "Workforce Housing & Welfare" },
    { id: "expansion", title: "Expansion Zones", subtitle: "Regional Growth Projects" },
  ];

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

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // ── Full desktop animation (min-width: 1024px) ───────────────────
        mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 30%",     // Starts when the top of section is 30% from the viewport top
              end: "bottom bottom",
              scrub: 0.1,           // Instant, lag-free scrub response
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

    return () => ctx?.revert();
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
                  SKT Global’s operations in Zambia are built around underground mechanisation, operational infrastructure, workforce development, and long-term mining sustainability.
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
                      href="/zambia-map-detailed.png"
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
            LAYER 3 — Revealed content
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={revealRef}
          className="relative lg:absolute inset-0 flex flex-col items-center justify-center lg:opacity-0 bg-[#0B0F19] lg:bg-transparent py-16 lg:py-0"
          style={{ zIndex: 50 }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col justify-between lg:h-[85vh] text-white gap-8 lg:gap-0">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 w-full select-none">
              <div>
                <span className="text-[10px] font-extrabold tracking-[0.4em] uppercase text-white/50">
                  UNDERGROUND ECOSYSTEM
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white mt-1">
                  SKT GLOBAL MINING HUB
                </h2>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center lg:my-auto w-full">
              
              {/* Left Menu - 4 Cols */}
              <div className="lg:col-span-4 flex flex-col gap-3 bg-black/25 backdrop-blur-md p-6 rounded-2xl border border-white/5 w-full">
                <div className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-widest mb-2 select-none">
                  <Layers size={14} className="text-rose-500" />
                  <span>OPERATIONAL SYSTEMS</span>
                </div>
                
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 group ${
                        isActive
                          ? "bg-white/10 border-white/20 shadow-lg"
                          : "bg-white/0 border-transparent hover:bg-white/5"
                      } border w-full`}
                    >
                      {/* Active vertical red bar indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/3 bottom-1/3 w-1 bg-rose-600 rounded-r" />
                      )}
                      
                      <div className="pl-3">
                        <div className={`text-sm font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                          {cat.title}
                        </div>
                        <div className={`text-[10px] uppercase font-semibold tracking-wider ${isActive ? 'text-white/40' : 'text-white/30'}`}>
                          {cat.subtitle}
                        </div>
                      </div>
                      
                      <MapPin size={14} className={`transition-all duration-300 ${isActive ? 'text-rose-500 scale-110' : 'text-white/20 group-hover:text-white/40'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Central Map - 8 Cols */}
              <div className="lg:col-span-8 relative flex items-center justify-center p-4 bg-black/10 rounded-3xl border border-white/5 h-[400px] lg:h-[50vh] overflow-hidden w-full">
                {/* Subtle tech background grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Glowing connecting routes - Using Crimson instead of Purple */}
                  <g opacity="0.6">
                    {/* Path 1: Copperbelt to Kitwe */}
                    <path
                      d="M 440 240 Q 410 210 350 180"
                      stroke="rgba(225, 29, 72, 0.5)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Path 2: Kitwe to Ndola */}
                    <path
                      d="M 350 180 Q 390 190 420 200"
                      stroke="rgba(225, 29, 72, 0.5)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Path 3: Ndola to Lusaka */}
                    <path
                      d="M 420 200 Q 450 270 460 330"
                      stroke="rgba(225, 29, 72, 0.5)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Path 4: Lusaka to Regional Exploration */}
                    <path
                      d="M 460 330 Q 520 290 580 240"
                      stroke="rgba(225, 29, 72, 0.5)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                  </g>

                  {/* Detailed map image */}
                  <image
                    href="/zambia-map-detailed.png"
                    x="0"
                    y="0"
                    width="800"
                    height="500"
                    preserveAspectRatio="xMidYMid contain"
                    opacity="0.3" /* Lower opacity for the dark ecosystem hub so glowing dots pop */
                  />

                  {/* Operational Nodes */}
                  {[
                    { id: "operations", cx: 440, cy: 240, label: "Operations" },
                    { id: "infrastructure", cx: 380, cy: 180, label: "Infrastructure" },
                    { id: "logistics", cx: 460, cy: 200, label: "Logistics" },
                    { id: "support", cx: 520, cy: 310, label: "Support" },
                    { id: "expansion", cx: 620, cy: 260, label: "Expansion" },
                  ].map((node) => {
                    const isNodeActive = activeCategory === node.id;
                    return (
                      <g
                        key={node.id}
                        onClick={() => setActiveCategory(node.id)}
                        className="cursor-pointer"
                      >
                        {/* Glow halo */}
                        {/* Glow halo / Pulsing ring */}
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isNodeActive ? 20 : 12}
                          fill={isNodeActive ? "transparent" : "rgba(255, 255, 255, 0.05)"}
                          stroke={isNodeActive ? "#E11D48" : "none"}
                          strokeWidth={isNodeActive ? 6 : 0}
                          className={`transition-all duration-500 ease-out ${isNodeActive ? "animate-pulse" : ""}`}
                        />
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isNodeActive ? 8 : 6}
                          fill={isNodeActive ? "#E11D48" : "rgba(255,255,255,0.3)"}
                          stroke={isNodeActive ? "none" : "#ffffff"}
                          strokeWidth={isNodeActive ? 0 : 1}
                          className="transition-all duration-500 ease-out"
                        />
                        {/* Label */}
                        <text
                          x={node.cx}
                          y={node.cy - (isNodeActive ? 28 : 16)}
                          textAnchor="middle"
                          fill={isNodeActive ? "#ffffff" : "rgba(255,255,255,0.4)"}
                          fontSize={isNodeActive ? "11px" : "9px"}
                          fontWeight={isNodeActive ? "bold" : "normal"}
                          letterSpacing="0.1em"
                          className="transition-all duration-500 ease-out uppercase pointer-events-none select-none"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating active info card in the map */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto lg:w-80 p-4 lg:p-5 rounded-2xl bg-slate-950/90 border border-white/10 shadow-2xl backdrop-blur-md select-none text-left">
                  <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider flex items-center gap-2">
                    <Compass size={14} className="text-rose-500" />
                    {categories.find(c => c.id === activeCategory)?.title}
                  </h4>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    {activeCategory === "operations" && "Large-scale mechanised underground mining systems supporting continuous operational development."}
                    {activeCategory === "infrastructure" && "Dedicated underground engineering systems, asset maintenance, and technical support frameworks."}
                    {activeCategory === "logistics" && "Robust supply chain network with strategic spare parts inventory valued at over US$3 million."}
                    {activeCategory === "support" && "Comprehensive workforce logistics, onsite housing, and 24-hour catering support systems."}
                    {activeCategory === "expansion" && "Long-term regional expansion and future resource exploration zones."}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 w-full select-none">
              {/* Slider representation */}
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Operational Network</span>
                <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-rose-500 rounded-full transition-all duration-500"
                    style={{
                      width: activeCategory === "operations" ? "20%" :
                             activeCategory === "infrastructure" ? "40%" :
                             activeCategory === "logistics" ? "60%" :
                             activeCategory === "support" ? "80%" : "100%"
                    }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-6 py-2.5 text-xs font-bold hover:bg-rose-600 hover:border-rose-600 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-rose-600/20"
              >
                <span>Discover Infrastructure →</span>
              </a>
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
