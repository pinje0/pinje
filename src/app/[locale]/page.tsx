import { getDictionary } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import LastUpdate from "@/components/LastUpdate";
import AnimatedLink from "@/components/AnimatedLink";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-[820px] w-full">
      <Navbar locale={locale} t={t} />

      {/* <div className="flex justify-center"> */}
      <LastUpdate />
      {/* </div> */}

      {/* Logo */}
      <div className="mb-8 mt-8">
        <Logo className="w-60 h-60" />
      </div>

      {/* About text */}
      <div className="space-y-5 text-[15px] leading-[1.55] max-w-[70ch]">
        <p>
          <b>{t.home.name}</b> {t.home.about1}
        </p>

        <p>{t.home.about2}</p>

        <p>
          {t.home.current}{" "}
          <a href="https://github.com/yourname" target="_blank" className="underline">
            GitHub
          </a>
          .
        </p>
      </div>

      {/* Links */}
      <div className="mt-14 space-y-2 text-[15px] max-w-[70ch]">
        <Link href={`/${locale}/projects`} className="block hover:underline">
          <b>{t.home.links.projects}</b>
        </Link>

        <Link href={`/${locale}/certifications`} className="block hover:underline">
          {t.home.links.certifications}
        </Link>

        <Link href={`/${locale}/contact`} className="block hover:underline">
          {t.home.links.contact}
        </Link>

        <AnimatedLink href="https://instagram.com/yourusername" className="hover:underline">
          Instagram
        </AnimatedLink>

        <a href="https://x.com/yourusername" target="_blank" className="block hover:underline">
          X / Twitter
        </a>
      </div>

      {/* Footer */}
      <div className="mt-24 text-sm opacity-50">
        © {new Date().getFullYear()} pinje. {t.footer.rights}
      </div>
    </main>
  );
}
