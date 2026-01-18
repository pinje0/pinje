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

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "jp" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = (await getDictionary(locale)) as any;

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

  const t = (await getDictionary(locale)) as any;
  const certificates = t.certificatesPage.items as CertificateItem[];
  const labels = t.certificatesPage?.labels || {};
  const modalLabels = labels.modal || {};

  return <CertificatesGrid certificates={certificates} title={t.certificatesPage.title} labels={labels} modalLabels={modalLabels} />;
}
