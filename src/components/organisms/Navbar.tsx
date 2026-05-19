"use client";

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { NavLink } from "@/components/molecules/NavLink";
import { Button } from "@/components/atoms/Button";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

export function Navbar(): JSX.Element {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScrollProgress();

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isScrolled = scrollY > 20;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              aria-label={`${SITE_CONFIG.name} - Home`}
            >
              <div className="flex flex-col">
                <span className={cn(
                  "text-xl font-black tracking-tight leading-none transition-colors duration-500",
                  isScrolled ? "text-neutral-900" : "text-white"
                )}>
                  SKT
                </span>
                <span className={cn(
                  "text-[9px] font-semibold tracking-[0.2em] uppercase leading-none transition-colors duration-500",
                  isScrolled ? "text-neutral-500" : "text-white/60"
                )}>
                  Global Mining
                </span>
              </div>
              <div className={cn(
                "w-px h-8 hidden sm:block transition-colors duration-500",
                isScrolled ? "bg-neutral-300" : "bg-white/20"
              )} />
              <span className={cn(
                "text-[9px] font-medium tracking-[0.15em] uppercase hidden sm:block leading-tight max-w-[120px] transition-colors duration-500",
                isScrolled ? "text-neutral-400" : "text-white/40"
              )}>
                & Services Limited
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href}
                  light={!isScrolled}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA replaced by TTIPL Logo */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex flex-col">
                <span className={cn(
                  "text-xl font-black tracking-tight leading-none transition-colors duration-500",
                  isScrolled ? "text-neutral-900" : "text-white"
                )}>
                  TTIPL
                </span>
                <span className={cn(
                  "text-[9px] font-semibold tracking-[0.2em] uppercase leading-none transition-colors duration-500",
                  isScrolled ? "text-neutral-500" : "text-white/60"
                )}>
                  TYRE TECHNOCRATS
                </span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900",
                isScrolled || isMobileOpen ? "text-neutral-900" : "text-white"
              )}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-neutral-900"
          style={{ scaleX: scrollY > 100 ? scrollY / 5000 : 0, originX: 0 }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-100">
              <span className="text-xl font-black tracking-tight">SKT</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-between py-4 text-xl font-semibold text-neutral-900 border-b border-neutral-100"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className="text-neutral-400 -rotate-90"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-8 pt-4">
              <Button variant="primary" size="lg" fullWidth>
                <Link href="/contact" onClick={() => setIsMobileOpen(false)}>
                  Get In Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
