"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import DotLottieReact with SSR disabled
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export function MobileWarningOverlay(): React.JSX.Element | null {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(5);

  useEffect(() => {
    let cleanup = () => {};
    setHasMounted(true);

    // Only render overlay on screens under 1024px
    if (window.innerWidth < 1024) {
      setShouldRender(true);

      // Prevent scroll while visible
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Hide after exactly 5 seconds
      const timer = setTimeout(() => {
        setIsHidden(true);
        document.body.style.overflow = originalOverflow;
      }, 5000);

      // Completely remove from DOM after the 0.8s CSS fade-out transition completes
      const removeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 5800);

      // Countdown interval
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);

      cleanup = () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
        clearInterval(interval);
        document.body.style.overflow = originalOverflow;
      };
    }

    return cleanup;
  }, []);

  // Guarantee matching SSR and initial hydration outputs by returning null initially,
  // preventing all hydration mismatch warnings completely.
  if (!hasMounted || !shouldRender) return null;

  return (
    <div
      id="mobile-warning-overlay"
      className={isHidden ? "hidden-overlay" : ""}
      aria-hidden="true"
      suppressHydrationWarning
    >
      <div className="mobile-warning-content font-sans" suppressHydrationWarning>
        <div className="mobile-warning-lottie-container" suppressHydrationWarning>
          <DotLottieReact
            src="/line-animation.lottie"
            autoplay
            loop
          />
        </div>
        <h2>Desktop Experience Recommended</h2>
        <p>
          This website contains advanced interactive visuals best experienced on a larger screen.
        </p>
        
        <div className="mobile-warning-progress-container" suppressHydrationWarning>
          <div className="mobile-warning-progress-bar" suppressHydrationWarning></div>
        </div>
        <p className="mobile-warning-timer-text" suppressHydrationWarning>
          Entering in {timeLeft}s
        </p>
      </div>
    </div>
  );
}


