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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, Menu, X } from "lucide-react";
import AnimatedLink from "./AnimatedLink";

interface NavbarProps {
  locale: string;
  t: any;
}

export default function Navbar({ locale, t }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("scrollY");
    const savedScrollX = sessionStorage.getItem("scrollX");
    if (savedScrollY && savedScrollX) {
      setTimeout(() => {
        window.scrollTo(parseInt(savedScrollX), parseInt(savedScrollY));
        sessionStorage.removeItem("scrollX");
        sessionStorage.removeItem("scrollY");
      }, 100);
    }
  }, [pathname]);

  if (!mounted) return null;

  const changeLanguage = (lang: string) => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    sessionStorage.setItem("scrollX", scrollX.toString());
    sessionStorage.setItem("scrollY", scrollY.toString());
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  };

  const navItems = [
    { label: t.navbar.links.home, href: `/${locale}` },
    { label: t.navbar.links.experience, href: `/${locale}/experience` },
    { label: t.navbar.links.projects, href: `/${locale}/projects` },
    { label: t.navbar.links.skills, href: `/${locale}/skills` },
    { label: t.navbar.links.certificates, href: `/${locale}/certificates` },
  ];

  const localeLabels: Record<string, string> = {
    en: t.navbar.language.en,
    id: t.navbar.language.id,
    jp: t.navbar.language.jp,
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleThemeToggle = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(theme === "light" ? "dark" : "light");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 800);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "navbar-fixed" : ""
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="grid grid-cols-3 items-center h-16 md:h-20">
          <div className="flex items-center" />

          <nav className="hidden md:flex justify-center gap-6 lg:gap-8 text-[13px] md:text-[14px]">
            {navItems.map((item) => (
              <AnimatedLink
                key={item.href}
                href={item.href}
                mode="full"
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative whitespace-nowrap ${
                  isActive(item.href) ? "active-nav" : "text-foreground"
                }`}
              >
                {item.label}
              </AnimatedLink>
            ))}
          </nav>

          <div className="flex justify-end items-center gap-2 md:gap-4 text-sm">
            <button
              onClick={handleThemeToggle}
              className="theme-toggle p-2 rounded-md hover:bg-primary/20 dark:hover:bg-primary/30 cursor-pointer"
              aria-label={t.navbar.theme.label}
            >
              {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="px-2 py-2 md:px-3 border rounded-md dark:text-white flex items-center gap-1 md:gap-2 cursor-pointer">
                <span
                  className={`fi fi-${
                    locale === "en" ? "gb" : locale === "id" ? "id" : "jp"
                  } h-4 w-5 md:w-6`}
                />
                <span className="text-xs hidden sm:inline">{localeLabels[locale] ?? locale}</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-40 mt-4">
                <DropdownMenuItem
                  onClick={() => changeLanguage("en")}
                  className={`flex items-center gap-2 ${
                    locale === "en" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                  }`}
                >
                  <span className="fi fi-gb h-4 w-5" />
                  {t.navbar.language.en}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("id")}
                  className={`flex items-center gap-2 ${
                    locale === "id" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                  }`}
                >
                  <span className="fi fi-id h-4 w-5" />
                  {t.navbar.language.id}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => changeLanguage("jp")}
                  className={`flex items-center gap-2 ${
                    locale === "jp" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                  }`}
                >
                  <span className="fi fi-jp h-4 w-5" />
                  {t.navbar.language.jp}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <button
                  className="p-2 rounded-md hover:bg-muted/20 cursor-pointer"
                  aria-label="Menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="sr-only">{t.navbar.links.home}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <AnimatedLink
                      key={item.href}
                      href={item.href}
                      mode="full"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-md text-base ${
                        isActive(item.href)
                          ? "active-nav"
                          : "hover:bg-muted/50 text-foreground"
                      }`}
                    >
                      {item.label}
                    </AnimatedLink>
                  ))}
                </nav>
                <div className="mt-8 pt-8 border-t">
                  <p className="px-4 text-sm text-muted-foreground mb-2">
                    {t.navbar.language.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 ${
                        locale === "en" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                      }`}
                    >
                      <span className="fi fi-gb h-4 w-5" />
                      {t.navbar.language.en}
                    </button>
                    <button
                      onClick={() => changeLanguage("id")}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 ${
                        locale === "id" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                      }`}
                    >
                      <span className="fi fi-id h-4 w-5" />
                      {t.navbar.language.id}
                    </button>
                    <button
                      onClick={() => changeLanguage("jp")}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-muted/50 ${
                        locale === "jp" ? "bg-muted/40 dark:bg-muted/20 font-semibold" : ""
                      }`}
                    >
                      <span className="fi fi-jp h-4 w-5" />
                      {t.navbar.language.jp}
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
