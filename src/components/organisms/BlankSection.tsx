"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { JSX } from "react";
import { Layers, MapPin, Compass } from "lucide-react";

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
  const circleRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const portalContainerRef = useRef<HTMLDivElement>(null);

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

          // ── 0 → 0.8  : Section slides up and fades in (does not fade out)
          tl.fromTo([contentRef.current, portalContainerRef.current],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0,
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

          // ── 1.5 → 10 : Circle expands (scale 0.05 → 15) ────────────────────
          // Base size is 400px, so 0.05 = 20px initial, 15 = 6000px final (razor-sharp edge)
          tl.fromTo(circleRef.current,
            { scale: 0.05, opacity: 1 },
            { scale: 15, duration: 5, ease: "power3.out" },
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

          // ── 4.5 → 10  : COLOR: light purple → deep dark blue ─────────────
          tl.to(circleRef.current,
            {
              backgroundColor: "#0B0F19",
              duration: 3,
            },
            2.6,
          );

          // ── 7 → 10   : Reveal content rises in (down to up) ──────────────
          tl.fromTo(revealRef.current,
            { opacity: 0, y: 40 },
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
          gsap.set(portalContainerRef.current, { opacity: 1 });
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
          ref={portalContainerRef}
          className="absolute pointer-events-none"
          style={{
            top: "63%",
            right: "31.5%",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
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
              width: "400px",
              height: "400px",
              backgroundColor: "#9F1239",
              transformOrigin: "center center",
              transform: "scale(0.05)",
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
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto opacity-0"
          style={{ zIndex: 50 }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col justify-between h-[85vh] text-white">
            
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full">
              
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
              <div className="lg:col-span-8 relative flex items-center justify-center p-4 bg-black/10 rounded-3xl border border-white/5 h-[45vh] lg:h-[50vh] overflow-hidden w-full">
                {/* Subtle tech background grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Glowing connecting routes */}
                  <g opacity="0.6">
                    {/* Path 1: Copperbelt to Kitwe */}
                    <path
                      d="M 280 140 Q 320 160 350 180"
                      stroke="rgba(167, 139, 250, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Path 2: Kitwe to Ndola */}
                    <path
                      d="M 350 180 Q 390 190 420 200"
                      stroke="rgba(167, 139, 250, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Path 3: Ndola to Lusaka */}
                    <path
                      d="M 420 200 Q 450 270 460 330"
                      stroke="rgba(167, 139, 250, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Path 4: Lusaka to Regional Exploration */}
                    <path
                      d="M 460 330 Q 520 290 580 240"
                      stroke="rgba(167, 139, 250, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                  </g>

                  {/* Stylized Zambia boundary shape */}
                  <path
                    d="M 240 100 Q 300 70 380 90 T 500 130 T 600 180 T 650 280 T 580 380 T 450 360 T 360 410 T 260 380 T 200 320 T 160 220 T 200 140 Z"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="3"
                    className="drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  />
                  <path
                    d="M 240 100 Q 300 70 380 90 T 500 130 T 600 180 T 650 280 T 580 380 T 450 360 T 360 410 T 260 380 T 200 320 T 160 220 T 200 140 Z"
                    fill="rgba(15, 23, 42, 0.45)"
                    className="backdrop-blur-sm"
                  />

                  {/* Operational Nodes */}
                  {[
                    { id: "operations", cx: 280, cy: 140, label: "Operations" },
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
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isNodeActive ? 22 : 12}
                          fill={isNodeActive ? "rgba(244, 63, 94, 0.25)" : "rgba(255, 255, 255, 0.05)"}
                          className="transition-all duration-500 ease-out"
                        />
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isNodeActive ? 12 : 6}
                          fill={isNodeActive ? "#f43f5e" : "rgba(255,255,255,0.3)"}
                          stroke="#ffffff"
                          strokeWidth={isNodeActive ? 2 : 1}
                          className="transition-all duration-300"
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
                          className="transition-all duration-300 uppercase pointer-events-none select-none"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating active info card in the map */}
                <div className="absolute bottom-6 left-6 right-6 lg:right-auto lg:w-80 p-5 rounded-2xl bg-slate-950/90 border border-white/10 shadow-2xl backdrop-blur-md select-none text-left">
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
            SCROLL HINT — fades as user begins scrolling
        ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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
