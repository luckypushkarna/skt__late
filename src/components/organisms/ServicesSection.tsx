"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Package, Truck, Shield, Network, Monitor, Users, Settings, TrendingUp, ShieldCheck, Building2, Globe } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { OperationalScaleSection } from "./OperationalScaleSection";

// ─── Card data ────────────────────────────────────────────────────────────────

const CARDS = [
  {
    num: "01",
    icon: Wrench,
    title: "Underground Workshop",
    desc: "A fully integrated underground maintenance ecosystem engineered to support uninterrupted mining operations, with 24/7 repair systems and rapid-response servicing.",
    tags: ["24/7 Repair", "Technical Support", "Rapid Response"],
    bgImage: "/Underground Workshop.png",
  },
  {
    num: "02",
    icon: Package,
    title: "Strategic Warehousing",
    desc: "Centralised warehousing and inventory systems designed to maintain continuous operational readiness backed by a spare parts inventory valued at over US$3M.",
    tags: ["US$3M+ Inventory", "Spare Parts", "minimum downtime"],
    bgImage: "/Strategic Warehousing.png",
  },
  {
    num: "03",
    icon: Truck,
    title: "Mechanised Fleet",
    desc: "A world-class mechanised underground mining fleet including loaders, mine trucks, drill rigs, boomers, bolters, and advanced support equipment.",
    tags: ["Drill Rigs", "Mine Trucks", "Loaders & Bolters"],
    bgImage: "/Mechanised Fleet.png",
  },
  {
    num: "04",
    icon: Shield,
    title: "Rescue Systems",
    desc: "Advanced underground safety and emergency response infrastructure with integrated rescue chambers, monitoring systems, and preparedness protocols.",
    tags: ["Rescue Chambers", "Emergency Protocol", "Live Monitoring"],
    bgImage: "/Rescue Systems.png",
  },
  {
    num: "05",
    icon: Network,
    title: "Logistics Network",
    desc: "An interconnected logistics ecosystem enabling continuous workforce mobility, equipment deployment, material handling, and uninterrupted production flow.",
    tags: ["Material Handling", "Fleet Dispatch", "Workforce Mobility"],
    bgImage: "/Logistics Network.png",
  },
  {
    num: "06",
    icon: Monitor,
    title: "Operational Command",
    desc: "A unified operational management system integrating engineering, mining, maintenance, logistics, and oversight into one coordinated command infrastructure.",
    tags: ["Unified Control", "Production Planning", "Workforce Allocation"],
    bgImage: "/Operational Command.png",
  },
  {
    num: "07",
    icon: Users,
    title: "Workforce Facilities",
    desc: "Purpose-built workforce infrastructure for local and international teams, including accommodation, transportation, welfare support, and 24-hour catering.",
    tags: ["Accommodation", "Catering 24/7", "Welfare Support"],
    bgImage: "/Workforce Facilities.png",
  },
  {
    num: "08",
    icon: Settings,
    title: "Engineering & Maintenance",
    desc: "Dedicated engineering systems ensuring equipment reliability and continuous underground performance through preventive maintenance and rapid intervention.",
    tags: ["Preventive Maint.", "Max Availability", "Specialised Teams"],
    bgImage: "/Engineering & Maintenance.png",
  },
  {
    num: "09",
    icon: TrendingUp,
    title: "Production Development",
    desc: "Accelerated underground mine development focused on long-term production growth and sustainability through mechanisation and modern mining methodologies.",
    tags: ["Mechanisation", "Growth Strategy", "Sustainability"],
    bgImage: "/Production Development.png",
  },
  {
    num: "10",
    icon: ShieldCheck,
    title: "Safety & Compliance",
    desc: "A safety-first operational framework embedded across every aspect of underground mining with rigorous compliance, training, and workforce protection protocols.",
    tags: ["Zero Harm", "Compliance Systems", "Continuous Training"],
    bgImage: "/Safety & Compliance.png",
  },
  {
    num: "11",
    icon: Building2,
    title: "Infrastructure Systems",
    desc: "A large-scale operational ecosystem including workshops, offices, warehousing, utility systems, transportation networks, and integrated support infrastructure.",
    tags: ["Utility Systems", "Workshops", "Support Infra"],
    bgImage: "/Infrastructure Systems.png",
  },
  {
    num: "12",
    icon: Globe,
    title: "Future Expansion",
    desc: "SKT Global is positioning for regional expansion through modernisation, operational scale, and strategic investment across multiple mining regions in Africa.",
    tags: ["Africa Expansion", "Scale-Up", "New Regions"],
    bgImage: "/Future Expansion.png",
  },
];

// Duplicate for seamless infinite loop
const ROW_A = [...CARDS, ...CARDS];

// ─── Single Card ─────────────────────────────────────────────────────────────

function SliderCard({ card, verticalOffset = 0 }: { card: typeof CARDS[0]; verticalOffset?: number }) {
  const Icon = card.icon;
  const hasBg = !!card.bgImage;

  return (
    <div
      className={`group relative flex-shrink-0 w-[350px] h-[520px] mx-3 rounded-none p-7 cursor-default select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[#E5E5E5] ${
        hasBg 
          ? "text-white bg-neutral-950" 
          : "bg-white text-neutral-900"
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
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = `translateY(${verticalOffset}px)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = hasBg 
          ? "0 10px 40px rgba(0,0,0,0.3)" 
          : "0 4px 24px rgba(0,0,0,0.03)";
      }}
    >
      {/* Background Image & Overlay */}
      {hasBg && (
        <>
          {/* Full Cover Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            style={{ backgroundImage: `url("${encodeURI(card.bgImage)}")` }}
          />
          {/* Full Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          {/* Frosted Glass Overlay for Text Area */}
          <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-transparent backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none pt-[10px]" />
        </>
      )}

      {/* Ghost Number / Top Right Layout */}
      {!hasBg && (
        <span className="absolute top-6 right-7 text-6xl font-black text-neutral-100/60 select-none pointer-events-none transition-colors duration-300">
          {card.num}
        </span>
      )}

      {/* Top Left Layout - Large elegant Icon container for Light Cards */}
      {!hasBg && (
        <div className="absolute top-6 left-7 w-12 h-12 flex items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-100 text-neutral-800 transition-all duration-300 group-hover:scale-105">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      )}

      {/* Align Content to the bottom */}
      <div className="relative z-10 flex flex-col justify-end h-full">
        {/* Dynamic Icon above Title for Dark Cards */}
        {hasBg && (
          <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-3.5 bg-white/10 border border-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
            <Icon size={18} className="text-white" strokeWidth={1.5} />
          </div>
        )}

        {/* Text Area */}
        <h3 
          className={`text-xl md:text-2xl font-bold tracking-tight mb-2 transition-colors duration-300 ${
            hasBg ? "text-white" : "text-neutral-900"
          }`}
        >
          {card.title}
        </h3>

        {/* Expanding Content Wrapper on Hover */}
        <div className="max-h-0 opacity-0 group-hover:max-h-[350px] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden group-hover:pt-[10px]">
          <p 
            className={`text-xs leading-relaxed mb-4 max-w-[280px] transition-colors duration-300 ${
              hasBg ? "text-neutral-300" : "text-neutral-500"
            }`}
          >
            {card.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full uppercase transition-all duration-300 ${
                  hasBg
                    ? "text-neutral-200 bg-white/10 border border-white/5 backdrop-blur-sm group-hover:bg-white/15"
                    : "text-neutral-500 bg-neutral-50 border border-neutral-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line — appears on hover for light cards */}
      {!hasBg && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-900 rounded-b-2xl origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        />
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

    const halfA = rowA.scrollWidth / 2;

    // ── wrap helper ───────────────────────────────────────────────────────
    function wrap(pos: number, half: number, dir: 1 | -1) {
      if (dir === -1 && pos <= -half) return pos + half;
      if (dir === 1 && pos >= half) return pos - half;
      if (pos > 0) return pos - half;
      if (pos < -half) return pos + half;
      return pos;
    }

    // ── RAF tick ──────────────────────────────────────────────────────────
    function tick() {
      if (!paused && !dragging) {
        currentSpeedA += (SPEED - currentSpeedA) * RESUME_EASE;
        posA = wrap(posA - currentSpeedA, halfA, -1);
      }

      if (dragging) {
        posA = wrap(posA + velA, halfA, -1);
      } else if (paused && !dragging && Math.abs(velA) > 0.05) {
        velA *= INERTIA;
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
      velA = dx;
    }
    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      stage!.style.cursor = paused ? 'grab' : '';
      // velA now carries momentum — tick() will decay it
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
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
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
