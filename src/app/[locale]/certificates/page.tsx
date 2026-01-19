import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CertificatesGrid from "@/components/CertificatesGrid";

interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  thumbnail: string;
  credentialUrl?: string;
}

interface CertificatesPageLabels {
  title: string;
  items: CertificateItem[];
  labels: {
    viewDetails: string;
    noCertificates: string;
    search: string;
    filterBy: string;
    sortBy: string;
    allTech: string;
    newestFirst: string;
    oldestFirst: string;
    pinned: string;
  };
  modal: {
    close?: string;
    previousCertificate?: string;
    nextCertificate?: string;
    viewCredential?: string;
    goToCertificate?: string;
  };
}

interface MetaPages {
  pages: {
    certificates: string;
  };
}

interface Dictionary {
  meta: MetaPages;
  certificatesPage: CertificatesPageLabels;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "jp" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale) as unknown as Dictionary;

  return {
    title: t.meta.pages.certificates,
  };
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = await getDictionary(locale) as unknown as Dictionary;
  const certificates = t.certificatesPage.items;
  const labels = t.certificatesPage?.labels || ({} as CertificatesPageLabels["labels"]);
  const modalLabels = t.certificatesPage?.modal || {};

  return <CertificatesGrid certificates={certificates} title={t.certificatesPage.title} labels={labels} modalLabels={modalLabels} />;
}
