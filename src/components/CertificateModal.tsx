"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  thumbnail: string;
  credentialUrl?: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificates: Certificate[];
  initialIndex: number;
  labels?: {
    close?: string;
    previousCertificate?: string;
    nextCertificate?: string;
    viewCredential?: string;
    goToCertificate?: string;
  };
}

export default function CertificateModal({
  isOpen,
  onClose,
  certificates,
  initialIndex,
  labels = {},
}: CertificateModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(() => false);

  useEffect(() => {
    // Intentionally setting state in effect for hydration safety
    setMounted(true);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  }, [certificates.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  }, [certificates.length]);

  useEffect(() => {
    if (isOpen) {
      if (currentIndex !== initialIndex) {
        setCurrentIndex(initialIndex);
      }
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex, currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrev]);

  if (!isOpen || !mounted) return null;

  const certificate = certificates[currentIndex];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/90 transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] mx-4">
        <div className="bg-background rounded-lg overflow-hidden shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label={labels.close || "Close"}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] bg-muted/20">
            <Image
              src={certificate.thumbnail}
              alt={certificate.title}
              fill
              className="object-contain"
              priority
            />

            {certificates.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label={labels.previousCertificate || "Previous certificate"}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label={labels.nextCertificate || "Next certificate"}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold leading-snug">{certificate.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{certificate.organization}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{certificate.date}</p>
              </div>
              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shrink-0"
                >
                  {labels.viewCredential || "View Credential"}
                </a>
              )}
            </div>

            {certificates.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {certificates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentIndex
                        ? "bg-primary"
                        : "bg-muted hover:bg-muted-foreground/50"
                    )}
                    aria-label={(labels.goToCertificate || "Go to certificate {n}").replace("{n}", String(index + 1))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
