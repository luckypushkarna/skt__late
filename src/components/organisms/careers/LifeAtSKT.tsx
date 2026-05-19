"use client";

import { JSX, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";

interface Story {
  category: string;
  title: string;
  quote: string;
  author: string;
  role: string;
  duration: string;
  img: string;
}

const STORIES: Story[] = [
  {
    category: "Career Transformation",
    title: "From Apprentice to Lead Supervisor",
    quote: "The Ubuntu Mentorship Programme gave me the foundation to scale my knowledge, transition safely into complex underground grids, and eventually lead operations for a 45-person shift.",
    author: "James Mwansa",
    role: "Lead Underground Shift Supervisor",
    duration: "8 years with SKT Global",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Safety Stewardship",
    title: "Pioneering the Zero Harm Vision",
    quote: "Every morning starts with a meticulous safety audit. The commitment to human life isn't just printed on wall signs here—it dictates our mechanical designs and operations at all levels.",
    author: "Prisca Banda",
    role: "Senior Safety Inspector (HSE)",
    duration: "6 years with SKT Global",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
  },
  {
    category: "Technical Evolution",
    title: "Commanding Modern Heavy Machinery",
    quote: "SKT Global deploys deep technical engineering. Operating computerized telemetry setups and high-efficiency earthmovers keeps me at the leading edge of modern resource management.",
    author: "Rajesh Kumar",
    role: "Telemetry Automation Lead",
    duration: "5 years with SKT Global",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80",
  },
];

export function LifeAtSKT(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-800 rounded-full blur-[160px] opacity-40 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <Badge variant="outline" className="mb-5 border-neutral-700 text-neutral-400 bg-transparent">
            Workforce Culture
          </Badge>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-6">
            Real Stories. <br />
            Real Technical <span className="text-neutral-600">Impact.</span>
          </h2>
          
          <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
            Meet the professionals transforming the underground mining industry. Through dedication, advanced continuous education, and safety compliance, they build serious careers.
          </p>
        </div>

        {/* Stories Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
        >
          {STORIES.map((story, idx) => (
            <motion.div
              key={story.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-neutral-800/40 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.img}
                  alt={story.author}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase bg-neutral-950/80 px-2 py-0.5 border border-neutral-800">
                    {story.category}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 tracking-tight leading-snug">
                    {story.title}
                  </h3>
                  <blockquote className="text-sm text-neutral-400 leading-relaxed italic mb-8 relative pl-4 border-l border-neutral-700">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {story.author}
                    </h4>
                    <p className="text-[10px] text-neutral-500 font-semibold uppercase mt-0.5">
                      {story.role}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 bg-neutral-800/60 px-2.5 py-1 border border-neutral-700/50">
                    {story.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ubuntu Programme Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border border-neutral-800 bg-neutral-950/40 p-8 md:p-12 rounded-3xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-400 uppercase border border-neutral-800">
                Flagship Program
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                The Ubuntu Mentorship <br />
                & Trainee Initiative.
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                True growth comes from shared expertise. Ubuntu is our systematic framework
                pairing incoming engineers with highly experienced local and global experts to
                guarantee safe skills transfer, operational leadership, and community advancement.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>12-Month Structured Syllabus</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Cross-Disciplinary Exposure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Direct Executive Mentorship</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center">
                <span className="block text-3xl font-black text-white leading-none">
                  150+
                </span>
                <span className="text-[9px] font-bold tracking-wide text-neutral-500 uppercase mt-2 block">
                  Graduates Enrolled
                </span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center">
                <span className="block text-3xl font-black text-white leading-none">
                  89%
                </span>
                <span className="text-[9px] font-bold tracking-wide text-neutral-500 uppercase mt-2 block">
                  Tenure Leadership Rate
                </span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center">
                <span className="block text-3xl font-black text-white leading-none">
                  5 Yrs
                </span>
                <span className="text-[9px] font-bold tracking-wide text-neutral-500 uppercase mt-2 block">
                  Operational Milestone
                </span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center">
                <span className="block text-3xl font-black text-white leading-none">
                  98%
                </span>
                <span className="text-[9px] font-bold tracking-wide text-neutral-500 uppercase mt-2 block">
                  Safety Compliance Score
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
