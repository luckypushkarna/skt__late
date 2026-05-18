"use client";

import { useRef, JSX, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useScroll,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { MILESTONES } from "@/lib/constants";
import { containerVariants, itemVariants } from "@/lib/animations";

function MilestoneDot({ index }: { index: number }) {
  return (
    <div className="stone-marker-gsap w-12 h-12 flex items-center justify-center select-none" data-index={index}>
      <Image
        src="/stone-marker-new.png"
        alt="Stone Marker"
        width={44}
        height={44}
        className="object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
      />
    </div>
  );
}

export function AboutSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });

  const [collectedCount, setCollectedCount] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const count = MILESTONES.filter((_, index) => {
        const dotProgress = index / (MILESTONES.length - 1);
        return latest >= dotProgress - 0.02;
      }).length;
      setCollectedCount(count);
    });
  }, [scrollYProgress]);

  // Master GSAP Timeline for Vehicle AND Stones
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let tl: gsap.core.Timeline;

    const ctx = gsap.context(() => {
      const stones = gsap.utils.toArray<HTMLElement>(".stone-marker-gsap");
      const container = timelineRef.current;
      const excavator = document.querySelector(".excavator-vehicle");
      const pileTarget = document.querySelector(".rock-pile-target");

      if (!container || !excavator || !pileTarget || stones.length === 0) return;

      const buildTimeline = () => {
        if (tl) tl.kill();

        // 1. Reset everything to native coordinates
        gsap.set(stones, { clearProps: "all" });
        gsap.set(excavator, { clearProps: "all" });

        // 1.5 Re-establish the horizontal centering specifically through GSAP 
        // so it doesn't get overridden by scale tweens!
        gsap.set(excavator, { xPercent: -50 });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%", // FIXED syntax: top edge of trigger hits 80% of viewport
            end: "bottom 20%",
            scrub: true,
          },
        });

        // 2. Animate the vehicle! (This guarantees stones and vehicle use identical timelines)
        tl.to({}, { duration: 1 }); // Force duration to exactly 1.0
        tl.fromTo(excavator, { top: "0%" }, { top: "100%", ease: "none", duration: 1 }, 0);
        tl.fromTo(excavator, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 0.86, duration: 0.06, ease: "none" }, 0);
        tl.to(excavator, { scale: 0.98, ease: "none", duration: 0.84 }, 0.06);
        tl.to(excavator, { opacity: 0, scale: 1, ease: "none", duration: 0.1 }, 0.90);

        const cRect = container.getBoundingClientRect();
        const containerHeight = cRect.height;
        const pRect = pileTarget.getBoundingClientRect();

        stones.forEach((stone) => {
          const sRect = stone.getBoundingClientRect();

          // Distance from top of container to center of the stone
          const stoneCenterY = (sRect.top + sRect.height / 2) - cRect.top;

          // 3. Contact & Collect: Offset calibrated exactly to the front loader bucket bounds!
          // We use -40 to position the stone squarely in front of the bottom blade of the vehicle graphic
          const rawHitProgress = (stoneCenterY - 160) / containerHeight;

          if (rawHitProgress < 0.95) {
            let startY = 0;
            let insertTime = rawHitProgress;
            let durationDown = 0.95 - rawHitProgress;
            let y95 = durationDown * containerHeight;

            // If mathematically the vehicle's offset is already past this stone at timeline 0,
            // we calculate the exact missed distance and pre-apply it so it syncs perfectly.
            if (rawHitProgress < 0) {
              startY = -rawHitProgress * containerHeight;
              insertTime = 0;
              durationDown = 0.95;
              y95 = startY + (0.95 * containerHeight);
            }

            // Stay stationary before hitProgress, then lock onto vehicle
            tl.fromTo(stone,
              { y: startY, x: 0, rotation: 0 },
              { y: y95, ease: "none", duration: durationDown },
              insertTime
            );

            // Final Scatter Asymmetrical Drop (last 5% of timeline)
            const durationDrop = 1.0 - 0.95;
            const finalY = (1.0 - rawHitProgress) * containerHeight + gsap.utils.random(-15, 15);
            const dropX = gsap.utils.random(-35, 35);
            const dropRot = gsap.utils.random(-60, 60);

            tl.to(stone, {
              y: finalY,
              x: dropX,
              rotation: dropRot,
              scale: 0.8,
              ease: "power2.out",
              duration: durationDrop,
            }, 0.95);

            // Fade out the stone *after* the drop finishes (from 1.0 to 1.1)
            tl.to(stone, {
              opacity: 0,
              ease: "none",
              duration: 0.1,
            }, 1.0);
          }
        });
      };

      buildTimeline();
      ScrollTrigger.addEventListener("refresh", buildTimeline);
      return () => ScrollTrigger.removeEventListener("refresh", buildTimeline);
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative pt-24 pb-64 bg-white overflow-hidden"
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
          {/* Sticky Counter Badge */}
          <div className="sticky top-24 z-20 float-right mr-4 -mt-16 bg-neutral-900/90 border border-neutral-800 backdrop-blur-md px-4 py-2.5 rounded-xl hidden md:flex items-center gap-2.5 text-xs font-bold text-white shadow-xl">
            <div className="w-5 h-5 flex items-center justify-center bg-neutral-800 rounded-lg">
              <Image src="/stone-marker-new.png" alt="" width={14} height={14} />
            </div>
            <span>Stones Excavated: <span className="text-emerald-400 font-mono text-sm">{collectedCount}</span> / {MILESTONES.length}</span>
          </div>

          {/* Vertical track — faint guide line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-100 -translate-x-px md:-translate-x-1/2" />

          {/* JCB vehicle — controlled entirely by GSAP now */}
          <div
            className="excavator-vehicle absolute left-0 md:left-1/2 top-0 z-10"
            style={{
              marginTop: "-28px", // Vertical alignment adjustment
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
          </div>

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
                  // ADDED z-40 here so the row's stacking context is significantly higher than the z-10 vehicle
                  className={`relative z-40 grid grid-cols-1 md:grid-cols-2 gap-8 py-12 ${isEven ? "" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Content */}
                  <div
                    className={`${isEven
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

                  {/* Center dot — explicitly brought to z-50 to ensure it is in FRONT of the bucket */}
                  <div className="absolute left-0 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                    <MilestoneDot index={index} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* GSAP Target Coordinate Pile */}
          <div className="rock-pile-target absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 -mb-8 z-0" />
        </div>
      </div>
    </section>
  );
}
