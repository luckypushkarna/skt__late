"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { FileUp, ArrowRight } from "lucide-react";

export function CareersCTA(): JSX.Element {
  return (
    <section className="relative py-28 bg-neutral-950 text-white overflow-hidden flex flex-col justify-center min-h-[75vh]">
      {/* Immersive industrial mining overlay background */}
      <div className="absolute inset-0 bg-neutral-900 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&auto=format&fit=crop&q=80"
          alt="Underground Industrial Operations"
          fill
          sizes="100vw"
          className="object-cover opacity-15 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(10,10,10,0.95)_90%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
      </div>

      {/* Blueprint background coordinates */}
      <div className="absolute top-8 left-8 text-neutral-800 font-mono text-[9px] tracking-widest uppercase select-none pointer-events-none">
        LAT: 12.9716° S / LON: 28.6569° E [COPPERBELT HUB]
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <Badge variant="outline" className="border-neutral-800 text-neutral-400 bg-transparent justify-center mx-auto">
            Deployment Opportunities
          </Badge>

          <h2 className="text-display-md md:text-display-lg font-black tracking-tight leading-none text-white">
            Build Your Future <br />
            <span className="text-neutral-500">Underground.</span>
          </h2>

          <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed font-light">
            Become a part of the next generation of safe, high-technology mining excellence.
            Apply directly or register for upcoming projects.
          </p>

          {/* Interactive buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={() => {
                document.getElementById("open-jobs")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-950 font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-black/30 rounded"
            >
              <span>View Open Listings</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => {
                window.location.href = "/contact?cv=upload";
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-neutral-900 text-white font-bold hover:bg-neutral-850 border border-neutral-800 transition-colors rounded"
            >
              <FileUp size={16} />
              <span>Submit General CV</span>
            </button>
          </div>
        </motion.div>

        {/* Dynamic bottom metrics summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-24 pt-16 border-t border-neutral-900/60">
          <div className="text-left space-y-1">
            <span className="block text-3xl font-black text-white leading-none tracking-tight">
              1,500+
            </span>
            <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase block">
              Active Employees
            </span>
          </div>

          <div className="text-left space-y-1">
            <span className="block text-3xl font-black text-white leading-none tracking-tight">
              92%
            </span>
            <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase block">
              Local Workforce
            </span>
          </div>

          <div className="text-left space-y-1">
            <span className="block text-3xl font-black text-white leading-none tracking-tight">
              20+
            </span>
            <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase block">
              Global Disciplines
            </span>
          </div>

          <div className="text-left space-y-1">
            <span className="block text-3xl font-black text-white leading-none tracking-tight">
              4
            </span>
            <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase block">
              Primary Countries
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
