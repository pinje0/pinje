"use client";

interface FooterProps {
  t: {
    footer: {
      copyright: string;
    };
  };
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="border-t border-border/50 mt-12">
      <div className="mx-auto max-w-5xl px-6 md:px-20 py-6">
        <p className="text-sm text-muted-foreground text-center">
          {t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
}
