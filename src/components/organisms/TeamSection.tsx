"use client";

import { type JSX } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";
import { TEAM_MEMBERS } from "@/lib/constants";
import { containerVariants, itemVariants } from "@/lib/animations";

export function TeamSection(): JSX.Element {
  return (
    <section
      id="team"
      className="py-24 bg-white"
      aria-labelledby="team-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header: Refined Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Badge variant="dot">Our Leadership</Badge>
            </motion.div>
            <motion.h2
              id="team-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95]"
            >
              The People Behind <br />
              <span className="text-neutral-300">the Mission</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-lg text-neutral-500 leading-relaxed max-w-xl">
              Our team is a blend of visionaries, engineers, and strategists dedicated to
              responsible mining. We come together with one shared goal: to guide our 
              global operations while ensuring every detail exceeds expectations.
            </p>
          </motion.div>
        </div>

        {/* Team Grid: High-Impact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {TEAM_MEMBERS.map((member) => {
            // Mapping placeholder images for members
            const images: Record<string, string> = {
              "sk-thakur": "/sk-thakur.png",
              "rajesh-kumar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
              "priya-sharma": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
              "michael-osei": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
            };

            return (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="group flex flex-col"
              >
                {/* Main Card */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  {/* Portrait Area */}
                  <div className="relative aspect-[0.9/1] overflow-hidden bg-neutral-50">
                    <Image
                      src={images[member.id] || "/gaadi-jcb.png"}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                    />
                  </div>

                  {/* Info Area */}
                  <div className="p-8 pb-10">
                    <p className="text-[10px] font-extrabold tracking-[0.25em] text-neutral-400 uppercase mb-3">
                      {member.role}
                    </p>
                    <h3 className="text-2xl font-black text-neutral-900 tracking-tight leading-none mb-1">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
