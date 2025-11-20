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

      <LastUpdate />

      {/* Logo */}
      <div className="mb-8 mt-8">
        <Logo className="w-60 h-60" />
      </div>

      {/* About Section */}
      <div className="space-y-5 text-[15px] leading-[1.55] max-w-[70ch]">
        {/* <p>{t.home.header}</p> */}

        {/* Header Section (3 baris dengan link animated) */}
        <div className="space-y-1">
          <p className="">
            {t.home.header["head-1"].prevRole} at{" "}
            <AnimatedLink href={t.home.header["head-1"].orgUrl}>
              {t.home.header["head-1"].orgName}
            </AnimatedLink>
            {" | "}
            {t.home.header["head-2"].prevRole} at{" "}
            <AnimatedLink href={t.home.header["head-2"].orgUrl}>
              {t.home.header["head-2"].orgName}
            </AnimatedLink>
            {" | "}
            {t.home.header["head-3"].prevRole} at{" "}
            <AnimatedLink href={t.home.header["head-3"].orgUrl}>
              {t.home.header["head-3"].orgName}
            </AnimatedLink>
          </p>
        </div>

        <p>{t.home.about}</p>

        <p>
          {t.home.current}{" "}
          <AnimatedLink href="https://linkedin.com/company/katadata">Katadata</AnimatedLink>.
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-4 space-y-2 text-[15px] max-w-[70ch]">
        <AnimatedLink href="https://www.linkedin.com/in/melvin-austin/" block>
          {t.home.socials.linkedin}
        </AnimatedLink>

        <AnimatedLink href="https://github.com/pinje0" block>
          {t.home.socials.github}
        </AnimatedLink>

        <AnimatedLink href="https://steamcommunity.com/id/kyotorainn" block>
          {t.home.socials.steam}
        </AnimatedLink>

        <AnimatedLink href="https://open.spotify.com/user/21mxjp3gplpyos5ef7ung3iwq" block>
          {t.home.socials.spotify}
        </AnimatedLink>
      </div>

      {/* Footer */}
      <div className="mt-24 text-sm opacity-50">
        © {new Date().getFullYear()} pinje. {t.footer.rights}
      </div>
    </main>
  );
}
