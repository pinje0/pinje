"use client";

import Link from "next/link";
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
import AnimatedLink from "@/components/AnimatedLink"; // nanti kita buat

export default function Navbar({ locale, t }: { locale: string; t: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const changeLanguage = (lang: string) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  const navItems = [
    { label: t.navbar.home, href: `/${locale}` },
    { label: t.navbar.experience ?? "Experience", href: `/${locale}#experience` },
    { label: t.navbar.projects ?? "Projects", href: `/${locale}#projects` },
    { label: t.navbar.skills ?? "Skills", href: `/${locale}#skills` },
    { label: t.navbar.certificates ?? "Certificates", href: `/${locale}#certificates` },
  ];

  const isActive = (href: string) => {
    // treat root and hash routes: active if pathname === href OR pathname startsWith href (for sections)
    if (href.includes("#")) {
      const [base, hash] = href.split("#");
      return pathname === base || pathname === `/${locale}`;
    }
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-black/10 dark:border-white/10 backdrop-blur-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 items-center h-20">
          {/* left slot for logo placeholder (keperluan alignment) */}
          <div className="flex items-center">
            {/* kosong, logo di content (kamu inginkan logo kiri di page) */}
          </div>

          {/* center nav (desktop only) */}
          <nav className="hidden md:flex justify-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative transition-opacity hover:opacity-100 cursor-pointer ${
                  isActive(item.href) ? "font-semibold text-primary" : "opacity-80"
                }`}
              >
                {/* gunakan AnimatedLink untuk efek hover (opsional), fallback plain text */}
                <span className="relative z-10">{item.label}</span>

                {/* active indicator */}
                <span
                  aria-hidden
                  className={`absolute left-0 -bottom-1 h-0.5 w-full rounded-full transition-opacity duration-300 ${
                    isActive(item.href) ? "bg-primary opacity-100" : "bg-transparent opacity-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* right controls */}
          <div className="flex justify-end items-center gap-4 text-sm">
            {/* theme */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md hover:bg-muted/10 dark:hover:bg-muted/20 transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* language dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 border rounded-md dark:text-white cursor-pointer">
                🌐 {locale.toUpperCase()}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[10rem]">
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("id")}>
                  Bahasa Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("jp")}>日本語</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
