"use client";

import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface AnimatedLinkProps extends LinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  block?: boolean; // ➜ kontrol block/inline
  className?: string;
}

export default function AnimatedLink({
  href,
  children,
  block = false,
  className,
  ...props
}: AnimatedLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(block ? "block" : "inline-block", className)}
    >
      {/* <span className="link-rise-bg inline-block align-baseline">{children}</span> */}
      <span className="link-rise-bg inline-block align-baseline leading-none">{children}</span>
    </Link>
  );
}
