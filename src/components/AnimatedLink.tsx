import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface AnimatedLinkProps
  extends Omit<LinkProps, "href">,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  block?: boolean;
  className?: string;
  mode?: "text" | "full";
  href: string;
}

export default function AnimatedLink({
  href,
  children,
  block = false,
  className,
  mode = "text",
  ...props
}: AnimatedLinkProps) {
  const isExternal =
    typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://"));

  return (
    <Link
      href={href}
      {...props}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(block ? "block w-fit" : "inline-block", "pointer-events-auto", className)}
    >
      <span
        className={cn(
          "link-rise-bg inline-block align-baseline",
          mode === "text" && "link-reset",
          className?.includes("flex") && "!flex" // Override inline-block if flex is needed
        )}
      >
        {children}
      </span>
    </Link>
  );
}
