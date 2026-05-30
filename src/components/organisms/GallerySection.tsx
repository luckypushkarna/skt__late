"use client";

import { JSX, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ZoomIn, X, Play } from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryItem {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  previewUrl?: string;
  thumbUrl?: string;
  /** Explicit CSS grid placement */
  gridColumn: string;
  gridRow: string;
}

// ─── 7 Items — exact reference layout ─────────────────────────────────────────
//
//  Layout (3 columns: 1fr  2fr  1fr — 6 row units of 110px each):
//
//  ┌──────────┬──────────────────────┬──────────┐
//  │  img 1   │    video-mining      │  img 5   │
//  │ (col 1   │    (col 2, rows 1-2) │ (col 3   │
//  │  rows    │──────────────────────│  rows    │
//  │  1-3)    │    video-hero        │  1-3)    │
//  │          │    (col 2, rows 3-4) │          │
//  ├──────────┤──────────────────────├──────────┤
//  │  img 2   │    video-sustain     │  img 6   │
//  │ (col 1   │    (col 2, rows 5-6) │ (col 3   │
//  │  rows    │                      │  rows    │
//  │  4-6)    │                      │  4-6)    │
//  └──────────┴──────────────────────┴──────────┘

const GALLERY_ITEMS: GalleryItem[] = [
  // ── Left column ─────────────────────────────────────────────────
  {
    id: 1,
    type: "image",
    title: "Underground Mechanised Drilling",
    desc: "Copperbelt Operations",
    url: "/Production Development.webp",
    gridColumn: "1",
    gridRow: "1 / 4",
  },
  {
    id: 2,
    type: "image",
    title: "Workforce Safety Briefing",
    desc: "Ubuntu Mentorship",
    url: "/Safety & Compliance.webp",
    gridColumn: "1",
    gridRow: "4 / 7",
  },

  // ── Centre column (3 wide landscape cards) ───────────────────────
  {
    id: 3,
    type: "video",
    title: "Mining Operations — Live Footage",
    desc: "Underground Fleet",
    url: "/videos/gallery-mining-optimized.mp4",
    previewUrl: "/videos/gallery-mining-preview.mp4",
    thumbUrl: "/videos/gallery-mining-thumb.webp",
    gridColumn: "2",
    gridRow: "1 / 3",
  },
  {
    id: 4,
    type: "video",
    title: "Site Hero Reel",
    desc: "Surface Operations",
    url: "/videos/gallery-hero-optimized.mp4",
    previewUrl: "/videos/gallery-hero-preview.mp4",
    thumbUrl: "/videos/gallery-hero-thumb.webp",
    gridColumn: "2",
    gridRow: "3 / 5",
  },
  {
    id: 5,
    type: "video",
    title: "Sustainability in Practice",
    desc: "Environmental Stewardship",
    url: "/videos/gallery-sustainability-optimized.mp4",
    previewUrl: "/videos/gallery-sustainability-preview.mp4",
    thumbUrl: "/videos/gallery-sustainability-thumb.webp",
    gridColumn: "2",
    gridRow: "5 / 7",
  },

  // ── Right column ─────────────────────────────────────────────────
  {
    id: 6,
    type: "image",
    title: "Control Room Monitoring",
    desc: "Real-Time Operations",
    url: "/Operational Command.webp",
    gridColumn: "3",
    gridRow: "1 / 4",
  },
  {
    id: 7,
    type: "video",
    title: "Community & Landscape",
    desc: "CSR Commitment",
    url: "/videos/gallery-sustainability2-optimized.mp4",
    previewUrl: "/videos/gallery-sustainability2-preview.mp4",
    thumbUrl: "/videos/gallery-sustainability2-thumb.webp",
    gridColumn: "3",
    gridRow: "4 / 7",
  },
];

// ─── Responsive Screen Hook ───────────────────────────────────────────────────

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLarge(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isLarge;
}

// ─── Individual Gallery Card ──────────────────────────────────────────────────

function GalleryCard({
  item,
  index,
  isLargeScreen,
}: {
  item: GalleryItem;
  index: number;
  isLargeScreen: boolean;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Viewport checking: triggers when even 10% of the card is visible
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Play/pause based on viewport intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.type !== "video") return;

    if (isInView) {
      video.play().catch(() => {
        // Autoplay policies might block play temporarily, which is fine
        // console.log("Autoplay blocked or interrupted: ");
      });
    } else {
      video.pause();
    }
  }, [isInView, item.type]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{
          duration: 0.55,
          delay: index * 0.07,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={
          isLargeScreen
            ? {
                gridColumn: item.gridColumn,
                gridRow: item.gridRow,
              }
            : {}
        }
        className="relative overflow-hidden rounded-2xl cursor-pointer aspect-video lg:aspect-auto w-full h-full min-h-[240px] lg:min-h-0 bg-neutral-100"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setLightboxOpen(true)}
      >
        {/* ── Media ── */}
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.previewUrl || item.url}
            poster={item.thumbUrl}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            style={{
              transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <Image
            src={item.url}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
            priority={index < 2}
          />
        )}

        {/* ── Gradient scrim ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72) 100%)",
            opacity: hovered ? 1 : 0.55,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* ── Video "Live" pill ── */}
        {item.type === "video" && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15"
            style={{
              opacity: hovered ? 1 : 0.75,
              transition: "opacity 0.3s ease",
            }}
          >
            <Play size={8} className="text-white fill-white" />
            <span className="text-[9px] font-bold tracking-widest text-white uppercase">
              Live
            </span>
          </div>
        )}

        {/* ── Zoom icon ── */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.75)",
            transition:
              "opacity 0.28s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <ZoomIn size={13} className="text-white" />
        </div>

        {/* ── Caption ── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 z-10"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/50 mb-0.5">
            {item.desc}
          </p>
          <h3 className="text-sm font-bold text-white leading-snug">
            {item.title}
          </h3>
        </div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <X size={17} className="text-white" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl max-h-[88vh] w-[90vw] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "82vh" }}
                  autoPlay
                  controls
                  loop
                  playsInline
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: "82vh" }}
                />
              )}

              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/45 mb-1">
                  {item.desc}
                </p>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function GallerySection(): JSX.Element {
  const isLargeScreen = useIsLargeScreen();

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-section-heading"
      className="py-24 bg-neutral-50 border-t border-neutral-100"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
              Operations Gallery
            </span>
          </motion.div>

          <motion.h2
            id="gallery-section-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95] mb-5"
          >
            Inside Our
            <br />
            <span className="text-neutral-300">Operations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-500 max-w-xl text-base leading-relaxed"
          >
            From underground tunnels to surface processing plants — images and
            live footage of the people, machines, and precision that power SKT
            Global across Zambia.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-3 h-auto lg:h-[690px]"
          style={
            isLargeScreen
              ? {
                  gridTemplateRows: "repeat(6, 115px)",
                }
              : {}
          }
        >
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              isLargeScreen={isLargeScreen}
            />
          ))}
        </div>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center gap-6 mt-8 pt-8 border-t border-neutral-200"
        >
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
            <ZoomIn size={10} />
            <span>Click any card to expand</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
