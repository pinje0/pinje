"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
  // ThemeProvider harus di root client wrapper; kita juga mount small helper untuk transition
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ThemeTransitionProvider>{children}</ThemeTransitionProvider>
    </ThemeProvider>
  );
}

/** kecil helper untuk men-trigger kelas transisi saat theme berubah */
function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // ketika resolvedTheme berubah, tambahkan kelas sementara ke html untuk animasi
    const el = document.documentElement;
    if (!el) return;

    el.classList.add("theme-transition");
    const id = window.setTimeout(() => el.classList.remove("theme-transition"), 350); // 350ms
    return () => window.clearTimeout(id);
  }, [resolvedTheme, theme]);

  // hindari mismatch SSR: render children setelah mount
  if (!mounted) return null;
  return <>{children}</>;
}
