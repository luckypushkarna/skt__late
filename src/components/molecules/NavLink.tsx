"use client";

import { memo, type JSX } from "react"; import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly external?: boolean;
  readonly light?: boolean;
}

export const NavLink = memo(function NavLink({
  href,
  children,
  className,
  external = false,
  light = false,
}: NavLinkProps): JSX.Element {
  const pathname = usePathname();
  const isActive = pathname === href;

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center text-sm font-medium tracking-wide transition-colors duration-200",
        light
          ? "text-white/60 hover:text-white"
          : "text-neutral-600 hover:text-neutral-900",
        isActive && (light ? "text-white" : "text-neutral-900"),
        className
      )}
      {...externalProps}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className={cn(
            "absolute -bottom-1 left-0 right-0 h-px",
            light ? "bg-white" : "bg-neutral-900"
          )}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
});

NavLink.displayName = "NavLink";
