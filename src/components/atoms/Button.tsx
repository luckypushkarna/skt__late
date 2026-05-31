"use client";

import { motion } from "framer-motion";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef, JSX, memo } from "react";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly children: ReactNode;
  readonly isLoading?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
  readonly fullWidth?: boolean;
  readonly asChild?: boolean; // Added support for asChild if needed by Link
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-neutral-900 text-white hover:bg-neutral-700 border border-neutral-900",
  secondary:
    "bg-white text-neutral-900 hover:bg-neutral-50 border border-neutral-200",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 border border-transparent",
  outline:
    "bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white border border-neutral-900",
  link: "bg-transparent text-neutral-900 underline-offset-4 hover:underline border-none p-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        variant = "primary",
        size = "md",
        children,
        isLoading = false,
        leftIcon,
        rightIcon,
        fullWidth = false,
        className,
        disabled,
        asChild,
        ...props
      },
      ref
    ) => {
      // If asChild is true, we should ideally use Slot from @radix-ui/react-slot
      // but for simplicity here, we'll just render the button.
      // Next.js Link components often work fine inside motion.button if we pass the right props.

      return (
        <motion.button
          ref={ref}
          variants={buttonHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className={cn(
            "relative inline-flex items-center justify-center gap-2",
            "font-medium tracking-wide transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "select-none cursor-pointer",
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && "w-full",
            className
          )}
          disabled={disabled ?? isLoading}
          {...(props as any)}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Loading...</span>
            </span>
          ) : (
            <>
              {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
              <span>{children}</span>
              {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </>
          )}
        </motion.button>
      );
    }
  )
);

Button.displayName = "Button";

function LoadingSpinner(): JSX.Element {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
