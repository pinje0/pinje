"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import AnimatedLink from "./AnimatedLink";

interface NavbarProps {
  locale: string;
  t: any; // Use your proper Dictionary type here
}

export default function Navbar({ locale, t }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // All hooks must be called before any conditional returns
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Now safe to return early
  if (!mounted) return null;

  const changeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  const navItems = [
    { label: t.navbar.home, href: `/${locale}` },
    { label: t.navbar.experience, href: `/${locale}/experience` },
    { label: t.navbar.projects, href: `/${locale}/projects` },
    { label: t.navbar.skills, href: `/${locale}/skills` },
    { label: t.navbar.certificates, href: `/${locale}/certificates` },
  ];

  // Fixed: Exact match for home, startsWith for other routes
  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "navbar-fixed" : ""
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Left slot (empty for alignment) */}
          <div className="flex items-center" />

          {/* Center nav (desktop only) */}
          <nav className="hidden md:flex justify-center gap-8 text-[13px] md:text-[14px]">
            {navItems.map((item) => (
              <AnimatedLink
                key={item.href}
                href={item.href}
                mode="full"
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`
    relative transition-opacity hover:opacity-100
    ${isActive(item.href) ? "active-nav" : "text-foreground opacity-100 hover:opacity-60"}

  `}
              >
                {item.label}
              </AnimatedLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex justify-end items-center gap-4 text-sm">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md hover:bg-muted/10 dark:hover:bg-muted/20 transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Language dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="px-3 py-2 border rounded-md dark:text-white flex items-center gap-2 cursor-pointer">
                <span
                  className={`fi fi-${
                    locale === "en" ? "gb" : locale === "id" ? "id" : "jp"
                  } h-4 w-6`}
                />
                <span className="text-xs">{locale.toUpperCase()}</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-[12rem] mt-4">
                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className={`flex items-center gap-2 ${
                    locale === "en" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                  }`}
                >
                  <span className="fi fi-gb h-4 w-6" />
                  English
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("id")}
                  className={`flex items-center gap-2 ${
                    locale === "id" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                  }`}
                >
                  <span className="fi fi-id h-4 w-6" />
                  Bahasa Indonesia
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("jp")}
                  className={`flex items-center gap-2 ${
                    locale === "jp" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                  }`}
                >
                  <span className="fi fi-jp h-4 w-6" />
                  日本語
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
