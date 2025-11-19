"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export default function AnimatedLink({
  href,
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Link> & { className?: string }) {
  // struktur: wrapper relative, overlay absolute, text z-10
  return (
    <Link href={href} {...props} className={cn("relative inline-block", className)}>
      <span
        aria-hidden
        className="absolute inset-0 transform scale-y-0 origin-bottom transition-transform duration-300 bg-foreground dark:bg-background/90"
        style={{ zIndex: 0 }}
      />
      <span className="relative z-10 inline-block transition-colors duration-300 text-foreground dark:text-popover-foreground">
        {children}
      </span>
      <style jsx>{`
        /* Hover effect: overlay scale up and invert text color */
        a:hover span[aria-hidden] {
          transform: scaleY(1);
        }
        a:hover span.z-10 {
          color: var(--color-background);
        }
        /* For dark mode we invert background color via CSS variables:
           ensure --color-background / --color-foreground set in your :root/.dark */
      `}</style>
    </Link>
  );
}
