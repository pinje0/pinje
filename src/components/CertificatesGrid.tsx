"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import CertificateModal from "@/components/CertificateModal";

interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  thumbnail: string;
  credentialUrl?: string;
}

interface CertificatesGridProps {
  certificates: CertificateItem[];
  title: string;
  labels?: {
    noCertificates?: string;
  };
}

export default function CertificatesGrid({ certificates, title, labels }: CertificatesGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      <main className="pt-32 pb-20 mx-auto px-6 md:px-20 max-w-6xl w-full">
        <h1 className="text-xl font-semibold mb-8">{title}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert: CertificateItem, index: number) => (
            <Card
              key={cert.id}
              className="group cursor-pointer overflow-hidden"
              onClick={() => openModal(index)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cert.thumbnail}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5">{cert.organization}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{cert.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{labels?.noCertificates || "No certificates to display yet."}</p>
          </div>
        )}
      </main>

      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificates={certificates}
        initialIndex={selectedIndex}
      />
    </>
  );
}
