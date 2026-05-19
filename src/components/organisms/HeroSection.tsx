"use client";

import { useRef, useEffect, useState, useMemo, JSX } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

function MetricCounter({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const [count, setCount] = useState(0);

  const isStatic = value.includes("/");
  const hasPrefix = value.startsWith("US$");
  const prefix = hasPrefix ? "US$" : "";
  const numericPart = value.replace(/[^0-9]/g, "");
  const target = isStatic ? 0 : parseInt(numericPart) || 0;
  const suffix = isStatic ? "" : value.replace(prefix, "").replace(/[0-9]/g, "");

  useEffect(() => {
    if (isStatic) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < delay * 1000) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const duration = 2000;
      const elapsed = progress - delay * 1000;

      if (elapsed < duration) {
        // easeOutExpo
        const currentCount = target === 0 ? 0 : target * (1 - Math.pow(2, -10 * elapsed / duration));
        setCount(Math.min(Math.ceil(currentCount), target));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, delay, isStatic]);

  return (
    <motion.div
      className="flex flex-col group relative p-4 rounded-xl transition-all duration-500 hover:bg-white/5 border border-transparent hover:border-white/10 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
      <span className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-1">
        {isStatic ? value : `${prefix}${count}${suffix}`}
      </span>
      <span className="text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export function HeroSection(): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);

  // Refs for GSAP
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const headline2Ref = useRef<HTMLHeadingElement>(null);
  const headline3Ref = useRef<HTMLHeadingElement>(null);
  const ofMiningRef = useRef<HTMLDivElement>(null);
  const ofMiningLineRef = useRef<HTMLDivElement>(null);
  const ofMiningTextRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  const animationRefs = useMemo(() => ({
    headline1Ref,
    headline2Ref,
    headline3Ref,
    ofMiningRef,
    ofMiningLineRef,
    ofMiningTextRef,
    paragraphRef,
    buttonsRef,
    metricsRef,
    logosRef,
  }), []);

  useHeroAnimation(animationRefs);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]); // slightly slower than background
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Ambient mouse light effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505]"
      aria-label="Hero section"
    >
      {/* Background Video with Parallax & Interaction Overlays */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0 origin-top">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
        >
          <source src="/videos/SKT Global FF Hero Video.mp4" type="video/mp4" />
        </video>
        {/* Dynamic vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_100%)] opacity-80" />
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] pointer-events-none mix-blend-overlay" />
      </motion.div>

      {/* Mouse reactive ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-30"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px bg-white/10"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{ originY: 0 }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8 inline-block"
        >
          <Badge variant="outline" className="text-white/80 border-white/20 backdrop-blur-md px-4 py-1.5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            MINING OPERATIONS · ZAMBIA
          </Badge>
        </motion.div>

        {/* Cinematic Typography System */}
        <div className="flex flex-col mb-12">
          {/* Line 1 */}
          <div className="overflow-hidden pb-2 -mb-2">
            <h1
              ref={headline1Ref}
              className="text-display-lg font-black text-white leading-[0.9] tracking-tighter"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0 120%)" }}
            >
              Engineering
            </h1>
          </div>

          {/* Line 2 with micro-interaction text */}
          <div className="flex items-end gap-6 flex-wrap overflow-hidden pb-2 -mb-2 mt-1">
            <h1
              ref={headline2Ref}
              className="text-display-lg font-black text-white leading-[0.9] tracking-tighter"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0 120%)" }}
            >
              The Future
            </h1>

            <div
              ref={ofMiningRef}
              className="hidden md:flex items-center gap-4 mb-4 ml-2"
            >
              <div
                ref={ofMiningLineRef}
                className="w-16 h-[2px] bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.3)] origin-left"
                style={{ transformOrigin: "0% 50%" }}
              />
              <span
                ref={ofMiningTextRef}
                className="text-xs font-bold tracking-[0.15em] text-white/60 uppercase"
              >
                of Mining
              </span>
            </div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden pb-2 -mb-2 mt-1">
            <h1
              ref={headline3Ref}
              className="text-display-lg font-black text-white/30 leading-[0.9] tracking-tighter mix-blend-plus-lighter"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0 120%)" }}
            >
              Underground
            </h1>
          </div>
        </div>

        {/* Description & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-4">
          <div className="flex flex-col gap-6">
            <p
              ref={paragraphRef}
              className="text-sm md:text-base text-white/70 leading-relaxed max-w-lg font-medium"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 120%, 0 120%)" }}
            >
              Supporting large-scale underground mining operations at Mopani Copper Mines through mechanisation, infrastructure, workforce development, and operational excellence.
            </p>
            <div ref={logosRef} className="flex items-center gap-6 mt-2">
              <img 
                src="/mopani-logo.png" 
                alt="Mopani Copper Mines Logo" 
                className="h-10 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-90 transition-opacity duration-300"
              />
              <div className="h-6 w-px bg-white/10" />
              <img 
                src="/irh-logo.png" 
                alt="IRH Logo" 
                className="h-10 w-auto object-contain brightness-0 invert opacity-60 hover:opacity-90 transition-opacity duration-300"
              />
            </div>
          </div>

          <div ref={buttonsRef} className="hidden" />
        </div>

        {/* Bottom stats strip */}
        <div
          ref={metricsRef}
          className="mt-24 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "225+", label: "Underground Machines", delay: 1.4 },
            { value: "1500+", label: "Workforce", delay: 1.5 },
            { value: "US$50M+", label: "Initial Investment", delay: 1.6 },
            { value: "24/7", label: "Operations", delay: 1.7 },
          ].map((item, i) => (
            <MetricCounter key={i} value={item.value} label={item.label} delay={item.delay} />
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-screen"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-white/50" />
        </motion.div>
        <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase font-bold">
          Scroll
        </span>
      </motion.div>

      {/* Cinematic Top/Bottom Gradients for deep black fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-0 opacity-80" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#050505] to-transparent z-0 opacity-90" />
    </section>
  );
}
