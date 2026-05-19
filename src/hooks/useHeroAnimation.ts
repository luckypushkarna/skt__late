"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "@/lib/gsap.config";
import { ANIMATION_DELAYS, ANIMATION_DURATIONS, ANIMATION_EASINGS } from "@/lib/animation.constants";

interface HeroAnimationRefs {
  headline1Ref: React.RefObject<HTMLHeadingElement | null>;
  headline2Ref: React.RefObject<HTMLHeadingElement | null>;
  headline3Ref: React.RefObject<HTMLHeadingElement | null>;
  ofMiningRef: React.RefObject<HTMLDivElement | null>;
  ofMiningLineRef: React.RefObject<HTMLDivElement | null>;
  ofMiningTextRef: React.RefObject<HTMLSpanElement | null>;
  paragraphRef: React.RefObject<HTMLParagraphElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
  metricsRef: React.RefObject<HTMLDivElement | null>;
  logosRef: React.RefObject<HTMLDivElement | null>;
}

export const useHeroAnimation = (refs: HeroAnimationRefs) => {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Just fade in everything without complex transforms
      gsap.to([
        refs.headline1Ref.current,
        refs.headline2Ref.current,
        refs.headline3Ref.current,
        refs.ofMiningRef.current,
        refs.paragraphRef.current,
        refs.buttonsRef.current,
        refs.metricsRef.current,
        refs.logosRef.current
      ], {
        opacity: 1,
        duration: ANIMATION_DURATIONS.fast,
        stagger: 0.1,
        ease: ANIMATION_EASINGS.smooth
      });
      return;
    }

    // Initialize SplitType
    const h1 = refs.headline1Ref.current;
    const h2 = refs.headline2Ref.current;
    const h3 = refs.headline3Ref.current;
    const p = refs.paragraphRef.current;

    if (!h1 || !h2 || !h3 || !p) return;

    // Apply specific SplitType setup for cinematic characters
    const splitH1 = new SplitType(h1, { types: 'lines,words,chars' });
    const splitH2 = new SplitType(h2, { types: 'lines,words,chars' });
    const splitH3 = new SplitType(h3, { types: 'lines,words,chars' });
    const splitP = new SplitType(p, { types: 'lines' });

    // Combine characters for staggered animation
    const chars = [
      ...(splitH1.chars || []),
      ...(splitH2.chars || []),
      ...(splitH3.chars || [])
    ];

    // Initial states for everything
    gsap.set(chars, { y: '120%', opacity: 0, filter: 'blur(10px)' });
    gsap.set(splitP.lines, { y: 20, opacity: 0 });
    gsap.set(refs.ofMiningLineRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(refs.ofMiningTextRef.current, { opacity: 0, x: -10 });
    gsap.set(refs.buttonsRef.current, { opacity: 0, y: 30 });
    
    // Logos initial state
    if (refs.logosRef.current) {
      gsap.set(refs.logosRef.current.children, { opacity: 0, y: 15 });
    }
    
    // Setup metrics initial state
    const metricItems = refs.metricsRef.current?.children;
    if (metricItems) {
      gsap.set(metricItems, { opacity: 0, y: 30 });
    }

    // Build Master Timeline
    const tl = gsap.timeline({
      defaults: {
        ease: ANIMATION_EASINGS.premium,
        duration: ANIMATION_DURATIONS.cinematic
      }
    });

    tlRef.current = tl;

    tl.to(chars, {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      stagger: ANIMATION_DELAYS.headlineStagger,
      duration: 1.2, // slightly faster per character but stagger makes it long
    }, ANIMATION_DELAYS.initial)
    
    // "OF MINING" micro animation
    .to(refs.ofMiningLineRef.current, {
      scaleX: 1,
      duration: 1,
      ease: ANIMATION_EASINGS.organic,
      boxShadow: "0px 0px 8px rgba(255, 120, 80, 0.4)", // Copper glow shimmer effect
    }, "-=0.8")
    .to(refs.ofMiningTextRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      letterSpacing: "0.25em", // slight letter spacing expansion
    }, "-=0.6")

    // Paragraph reveal
    .to(splitP.lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: ANIMATION_EASINGS.premium,
    }, "-=1.0")

    // Buttons reveal
    .to(refs.buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: ANIMATION_EASINGS.premium,
    }, "-=0.8");

    // Logos stagger reveal
    if (refs.logosRef.current) {
      tl.to(refs.logosRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: ANIMATION_EASINGS.premium,
      }, "-=0.7");
    }

    // Metrics stagger reveal
    if (metricItems) {
      tl.to(metricItems, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.6");
    }

    // Cleanup on unmount
    return () => {
      tl.kill();
      splitH1.revert();
      splitH2.revert();
      splitH3.revert();
      splitP.revert();
    };
  }, [refs]);

  return tlRef;
};
