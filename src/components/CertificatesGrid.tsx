"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";
import dynamic from "next/dynamic";

const CertificateModal = dynamic(() => import("@/components/CertificateModal"), {
  loading: () => null,
});

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
    search?: string;
    sortBy?: string;
    newestFirst?: string;
    oldestFirst?: string;
  };
  modalLabels?: {
    close?: string;
    previousCertificate?: string;
    nextCertificate?: string;
    viewCredential?: string;
    goToCertificate?: string;
  };
}

export default function CertificatesGrid({
  certificates,
  title,
  labels = {},
  modalLabels = {},
}: CertificatesGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const filteredAndSortedCertificates = useMemo(() => {
    let result = [...certificates];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (cert) =>
          cert.title.toLowerCase().includes(query) ||
          cert.organization.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const dateA = parseInt(a.date);
      const dateB = parseInt(b.date);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [certificates, searchQuery, sortBy]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      <main className="pt-32 pb-20 mx-auto px-6 md:px-20 max-w-6xl w-full">
        <h1 className="text-xl font-semibold mb-8">{title}</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={labels.search || "Search certificates..."}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={sortBy}
            onValueChange={(value: string) => setSortBy(value as "newest" | "oldest")}
            className="w-full md:w-[180px]"
          >
            <SelectItem value="newest">{labels.newestFirst || "Newest first"}</SelectItem>
            <SelectItem value="oldest">{labels.oldestFirst || "Oldest first"}</SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCertificates.map((cert: CertificateItem, index: number) => (
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

        {filteredAndSortedCertificates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{labels.noCertificates || "No certificates to display yet."}</p>
          </div>
        )}
      </main>

      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificates={filteredAndSortedCertificates}
        initialIndex={selectedIndex}
        labels={modalLabels}
      />
    </>
  );
}
