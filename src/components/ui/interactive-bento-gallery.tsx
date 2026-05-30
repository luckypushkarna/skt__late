"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  /** Bento grid span: "small" | "large" | "wide" | "tall" */
  span: "small" | "large" | "wide" | "tall";
}

interface InteractiveBentoGalleryProps {
  mediaItems: MediaItem[];
  title?: string;
  description?: string;
}

// ─── Span → Tailwind grid classes ─────────────────────────────────────────────

const SPAN_CLASSES: Record<MediaItem["span"], string> = {
  small: "col-span-1 row-span-1",
  large: "col-span-2 row-span-2",
  wide:  "col-span-2 row-span-1",
  tall:  "col-span-1 row-span-2",
};

// ─── Individual Bento Card ────────────────────────────────────────────────────

function BentoCard({
  item,
  index,
  onClick,
}: {
  item: MediaItem;
  index: number;
  onClick: (index: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${SPAN_CLASSES[item.span]}`}
      style={{ minHeight: item.span === "small" ? 200 : item.span === "wide" ? 220 : 300 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(index)}
    >
      {/* Media */}
      {item.type === "video" ? (
        <video
          src={item.url}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading={index < 3 ? "eager" : "lazy"}
          style={{
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72) 100%)",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Zoom icon */}
      <div
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <ZoomIn size={14} className="text-white" />
      </div>

      {/* Text overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/50 mb-1">
          {item.desc}
        </p>
        <h3 className="text-sm font-bold text-white leading-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[activeIndex]!;

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.92)" }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Prev */}
        <button
          className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Next */}
        <button
          className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {/* Content */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl max-h-[85vh] w-[90vw] rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === "video" ? (
            <video
              src={item.url}
              className="w-full h-full object-contain"
              autoPlay
              controls
              playsInline
              style={{ maxHeight: "80vh" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: "80vh" }}
            />
          )}

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/50 mb-1">
              {item.desc}
            </p>
            <h3 className="text-base font-bold text-white">{item.title}</h3>
          </div>
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-bold tracking-widest text-white/40 uppercase">
          {activeIndex + 1} / {items.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InteractiveBentoGallery({
  mediaItems,
  title,
  description,
}: InteractiveBentoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + mediaItems.length) % mediaItems.length));
  }, [mediaItems.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % mediaItems.length));
  }, [mediaItems.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-24 bg-white border-t border-neutral-100"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        {(title || description) && (
          <div className="mb-14">
            {title && (
              <motion.h2
                id="gallery-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tight leading-[0.95] mb-5"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-neutral-500 max-w-xl text-base leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[220px]"
        >
          {mediaItems.map((item, index) => (
            <BentoCard
              key={item.id}
              item={item}
              index={index}
              onClick={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={mediaItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  );
}
