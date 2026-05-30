"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, Briefcase } from "lucide-react";

const CATEGORIES = [
  "Engineering",
  "Underground Mining",
  "Safety",
  "Mechanical",
  "Electrical",
  "HR",
  "Operations",
  "Finance",
];

const METRICS = [
  { value: "1,500+", label: "Employees" },
  { value: "225", label: "Modern Machines" },
  { value: "20+", label: "Disciplines" },
  { value: "4", label: "Countries" },
] as const;

const EMPLOYEE_CARDS = [
  {
    role: "Mining Engineer",
    dept: "Underground Operations",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop&q=80",
  },
  {
    role: "HSE Director",
    dept: "Safety & Compliance",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
  },
  {
    role: "Operations Supervisor",
    dept: "Logistics Hub",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&auto=format&fit=crop&q=80",
  },
] as const;

export function CareersHero(): JSX.Element {
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        // Subtle floating behavior for employee cards and metrics
        gsap.to(".floating-card-1", {
          y: -15,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-card-2", {
          y: 15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-card-3", {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-metric-1", {
          y: -12,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".floating-metric-2", {
          y: 12,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, heroRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center bg-neutral-50 overflow-hidden py-16"
    >
      {/* Background blueprint/industrial grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-neutral-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-neutral-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Content and Search */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-neutral-400 uppercase border border-neutral-200 bg-white"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                Build with SKT Global
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-display-md md:text-display-lg font-black text-neutral-900 leading-none tracking-tight"
              >
                Build the <br />
                Future of <span className="text-neutral-300">Mining.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base text-neutral-500 max-w-xl leading-relaxed"
              >
                Join a world-class team driving safer, smarter, and more sustainable
                mining operations across Zambia and beyond.
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl border border-neutral-200/80 p-3 shadow-lg shadow-neutral-100/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative flex items-center border-b md:border-b-0 md:border-r border-neutral-100 pb-3 md:pb-0 md:pr-3">
                  <Search size={18} className="absolute left-3 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Job title or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-transparent border-none focus:outline-none placeholder:text-neutral-400 text-neutral-800"
                  />
                </div>
                <div className="relative flex items-center border-b md:border-b-0 md:border-r border-neutral-100 pb-3 md:pb-0 md:pr-3 md:pl-2">
                  <Briefcase size={18} className="absolute left-3 text-neutral-400" />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-transparent border-none focus:outline-none appearance-none text-neutral-500"
                  >
                    <option value="">All Departments</option>
                    <option value="engineering">Engineering</option>
                    <option value="mining">Underground Mining</option>
                    <option value="safety">Safety & HSE</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>
                <div className="relative flex items-center md:pl-2">
                  <MapPin size={18} className="absolute left-3 text-neutral-400" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 text-sm bg-transparent border-none focus:outline-none appearance-none text-neutral-500"
                  >
                    <option value="">All Locations</option>
                    <option value="zambia">Zambia Operations</option>
                    <option value="india">India HQ</option>
                    <option value="sa">South Africa</option>
                  </select>
                  <button
                    onClick={() => {
                      document.getElementById("open-jobs")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg p-2.5 transition-colors shadow-sm"
                  >
                    <Search size={16} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                Popular Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSearchQuery(cat);
                      document.getElementById("open-jobs")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3.5 py-1.5 bg-white border border-neutral-200 text-xs font-semibold text-neutral-500 hover:text-neutral-900 hover:border-neutral-400 rounded-full transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Layered Visual Cards */}
          <div className="lg:col-span-6 relative h-[520px] md:h-[600px] flex items-center justify-center">
            
            {/* Background layered shape */}
            <div className="absolute w-[80%] aspect-square border border-neutral-200/50 rounded-full pointer-events-none" />
            <div className="absolute w-[60%] aspect-square border border-neutral-200/30 rounded-full pointer-events-none" />

            {/* Card 1: Top-Left (Underground Miner) */}
            <div
              className="floating-card-1 absolute top-[10%] left-[5%] w-[45%] aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl z-20 group cursor-default"
            >
              <div className="relative w-full h-full">
                <Image
                  src={EMPLOYEE_CARDS[0].img}
                  alt={EMPLOYEE_CARDS[0].role}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase">
                    {EMPLOYEE_CARDS[0].dept}
                  </p>
                  <h4 className="text-sm font-bold tracking-tight">
                    {EMPLOYEE_CARDS[0].role}
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 2: Center-Right (HSE Control Room) */}
            <div
              className="floating-card-2 absolute top-[20%] right-[5%] w-[42%] aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl z-10 group cursor-default"
            >
              <div className="relative w-full h-full">
                <Image
                  src={EMPLOYEE_CARDS[1].img}
                  alt={EMPLOYEE_CARDS[1].role}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase">
                    {EMPLOYEE_CARDS[1].dept}
                  </p>
                  <h4 className="text-sm font-bold tracking-tight">
                    {EMPLOYEE_CARDS[1].role}
                  </h4>
                </div>
              </div>
            </div>

            {/* Card 3: Bottom-Center (Supervisor Team) */}
            <div
              className="floating-card-3 absolute bottom-[10%] left-[20%] w-[40%] aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xl z-20 group cursor-default"
            >
              <div className="relative w-full h-full">
                <Image
                  src={EMPLOYEE_CARDS[2].img}
                  alt={EMPLOYEE_CARDS[2].role}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[9px] font-bold tracking-widest text-neutral-300 uppercase">
                    {EMPLOYEE_CARDS[2].dept}
                  </p>
                  <h4 className="text-sm font-bold tracking-tight">
                    {EMPLOYEE_CARDS[2].role}
                  </h4>
                </div>
              </div>
            </div>

            {/* Glassmorphism Metric 1: Top-Right */}
            <div
              className="floating-metric-1 absolute top-[8%] right-[10%] z-30 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-3 rounded-xl shadow-xl select-none"
            >
              <span className="block text-2xl font-black text-neutral-900 leading-none">
                {METRICS[0].value}
              </span>
              <span className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase mt-1 block">
                {METRICS[0].label}
              </span>
            </div>

            {/* Glassmorphism Metric 2: Bottom-Right */}
            <div
              className="floating-metric-2 absolute bottom-[25%] right-[12%] z-30 bg-white/70 backdrop-blur-md border border-white/80 px-4 py-3 rounded-xl shadow-xl select-none"
            >
              <span className="block text-2xl font-black text-neutral-900 leading-none">
                {METRICS[1].value}
              </span>
              <span className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase mt-1 block">
                {METRICS[1].label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
