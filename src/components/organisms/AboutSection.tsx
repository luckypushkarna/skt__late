"use client";

import { useRef, JSX } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { MILESTONES } from "@/lib/constants";
import { containerVariants, itemVariants } from "@/lib/animations";

/**
 * A single timeline dot that fades + shrinks as the JCB vehicle passes over it.
 * Placed as its own component so useTransform can be called at the top level (hooks rules).
 */
function MilestoneDot({
  scrollYProgress,
  dotProgress,
}: {
  scrollYProgress: MotionValue<number>;
  /** Fractional position [0–1] at which this dot sits on the track */
  dotProgress: number;
}) {
  // Window over which the dot disappears: starts fading just before the vehicle,
  // fully gone just after. Clamped so keyframes stay within [0, 1].
  const fadeStart = Math.max(0, dotProgress - 0.07);
  const fadeMid   = Math.min(1, dotProgress + 0.01);
  const fadeEnd   = Math.min(1, dotProgress + 0.08);

  const opacity = useTransform(
    scrollYProgress,
    [fadeStart, fadeMid, fadeEnd],
    [1, 0.2, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd],
    [1, 0]
  );

  return (
    <motion.div
      className="w-3 h-3 rounded-full bg-white border-2 border-neutral-900"
      style={{ opacity, scale }}
    />
  );
}

export function AboutSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-10%" });

  // Scroll progress scoped exactly to the timeline block
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  // Y: vehicle drives from top to bottom of the track
  const vehicleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Scale: subtle depth illusion — smaller at top, natural at bottom
  const vehicleScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Opacity: fade IN at start of timeline, stay solid, fade OUT at end
  //   0.00 → 0   (invisible before timeline begins)
  //   0.06 → 1   (quick fade-in as first milestone appears)
  //   0.90 → 1   (stays visible through journey)
  //   1.00 → 0   (fade out as timeline ends)
  const vehicleOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.90, 1],
    [0,    1,    1,  0]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-section bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="dot" className="mb-6">
              THE FOUNDATION
            </Badge>
            <h2
              id="about-heading"
              className="text-display-lg font-black text-neutral-900 tracking-tight leading-none mb-8"
            >
              Built on Rock.
              <br />
              <span className="text-neutral-300">Built to Last.</span>
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end"
          >
            <p className="text-base text-neutral-500 leading-relaxed mb-8">
              SKT Global Mining & Services Limited was established as part of Tyre Technocrats India Private Limited’s long-term strategic investment into Zambia’s mining sector. From inception, the company’s growth has been defined by speed, operational discipline, infrastructure development, and underground mining excellence.
            </p>
            <Button
              variant="ghost"
              size="md"
              className="self-start"
            >
              <Link href="/about">Discover SKT →</Link>
            </Button>
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical track — faint guide line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-100 -translate-x-px md:-translate-x-1/2" />

          {/* JCB vehicle — fades in at start, drives down, fades out at end */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 z-10"
            style={{
              translateX: "-50%",
              top: vehicleY,
              scale: vehicleScale,
              opacity: vehicleOpacity,
              marginTop: "-28px",
            }}
          >
            {/* Drop shadow ring beneath vehicle */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
              style={{
                width: 40,
                height: 6,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.12)",
                filter: "blur(3px)",
              }}
            />
            <Image
              src="/gaadi-jcb.png"
              alt=""
              aria-hidden="true"
              width={52}
              height={52}
              className="object-contain w-[52px] h-auto select-none"
              priority
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isTimelineInView ? "visible" : "hidden"}
            className="space-y-0"
          >
            {MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              // Each dot's fraction along the track: evenly spaced 0 → 1
              const dotProgress = index / (MILESTONES.length - 1);

              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 py-12 ${isEven ? "" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isEven
                        ? "md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    } pl-8 md:pl-0`}
                  >
                    <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase block mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Center dot — fades out as JCB vehicle passes over it */}
                  <div className="absolute left-0 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MilestoneDot
                      scrollYProgress={scrollYProgress}
                      dotProgress={dotProgress}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
