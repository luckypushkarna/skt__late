"use client";

import { useEffect, type ReactNode, JSX } from "react";
import Lenis from "lenis";

interface SmoothScrollProviderProps {
  readonly children: ReactNode;
}

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps): JSX.Element {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let gsapInstance: any = null;

    let mounted = true;

    const initScroll = async () => {
      // Dynamic imports for Next.js SSR compatibility
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;

      lenis = new Lenis({
        duration: 1.2, // Fast, modern, responsive feel
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Sync ScrollTrigger's internal position tracker on Lenis scroll event
      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      // Synchronize Lenis and GSAP RAF loops perfectly to prevent visual stuttering
      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    };

    initScroll();

    return () => {
      mounted = false;
      if (lenis) {
        lenis.destroy();
      }
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
    };
  }, []);

  return <>{children}</>;
}
