"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
