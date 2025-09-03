import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

interface HeadingProps {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const headingStyles = cva(
  "font-serif font-bold tracking-tighter text-primary",
  {
    variants: {
      level: {
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
        h4: "text-xl",
        h5: "text-lg",
        h6: "text-base",
      },
    },
    defaultVariants: {
      level: "h1",
    },
  }
);

export function Heading({
  level = "h1",
  children,
  className,
  id,
  ...props
}: HeadingProps & VariantProps<typeof headingStyles>) {
  return React.createElement(
    level,
    {
      className: cn(headingStyles({ level, className })),
      id,
      ...props,
    },
    children
  );
}
