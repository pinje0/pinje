import { ReactNode } from "react";
import "../globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/lib/i18n";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ClientThemeProvider>
          <Navbar locale={locale} t={t} />
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
