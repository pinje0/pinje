import { ReactNode } from "react";
import "../globals.css";
import ClientThemeProvider from "@/components/ClientThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return {
    title: {
      default: `${t.meta.title} | ${t.meta.pages.home}`,
      template: `${t.meta.title} | %s`,
    },
    description: t.meta.description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  };
}

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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ClientThemeProvider>
          <Navbar locale={locale} t={t} />
          <main className="flex-1">{children}</main>
          <Footer t={t} />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
