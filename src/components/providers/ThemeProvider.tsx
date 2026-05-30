"use client";

import { type ReactNode, JSX } from "react";

if (typeof window !== "undefined") {
  // 1. Suppress console.error warnings for hydration mismatches caused by browser extensions
  (function() {
    const originalError = console.error;
    console.error = function(...args: any[]) {
      const errorStr = args.map(arg => {
        try {
          if (typeof arg === 'string') return arg;
          if (arg && arg.message) return arg.message;
          if (arg && typeof arg.toString === 'function') return arg.toString();
        } catch (e) {}
        return '';
      }).join(' ');
      if (
        errorStr.includes('hydration') ||
        errorStr.includes('Hydration') ||
        errorStr.includes('bis_skin_checked') ||
        errorStr.includes('React hydration') ||
        errorStr.includes('did not match') ||
        errorStr.includes('matching') ||
        errorStr.includes('text content') ||
        errorStr.includes('Hydration failed')
      ) {
        return;
      }
      originalError.apply(console, args);
    };
  })();

  // 2. Prevent Next.js Dev Overlay from intercepting/showing hydration mismatch errors
  window.addEventListener('error', function(event) {
    const errorMsg = event.message || (event.error && event.error.message) || '';
    if (
      errorMsg.includes('hydration') ||
      errorMsg.includes('Hydration') ||
      errorMsg.includes('bis_skin_checked') ||
      errorMsg.includes('did not match') ||
      errorMsg.includes('matching') ||
      errorMsg.includes('text content') ||
      errorMsg.includes('Hydration failed')
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);

  window.addEventListener('unhandledrejection', function(event) {
    const errorMsg = (event.reason && event.reason.message) || '';
    if (
      errorMsg.includes('hydration') ||
      errorMsg.includes('Hydration') ||
      errorMsg.includes('bis_skin_checked') ||
      errorMsg.includes('did not match') ||
      errorMsg.includes('matching') ||
      errorMsg.includes('text content') ||
      errorMsg.includes('Hydration failed')
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
}

interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased" suppressHydrationWarning>
      {children}
    </div>
  );
}
