import { getDictionary } from "@/lib/i18n";
import Logo from "@/components/Logo";
import LastUpdate from "@/components/LastUpdate";
import AnimatedLink from "@/components/AnimatedLink";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (locale !== "en") notFound();

  const t = await getDictionary(locale);

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-[820px] w-full">
      <LastUpdate />

      {/* Logo */}
      <div className="mb-8 mt-8">
        <Logo className="w-60 h-60" />
      </div>

      {/* About Section */}
      <div className="space-y-5 text-[15px] leading-[1.55] max-w-[70ch]">
        {/* Header Section */}
        <div className="space-y-1">
          <p>
            {t.home.header["head-1"].prevRole} @{" "}
            <AnimatedLink href={t.home.header["head-1"].orgUrl} mode="text">
              {t.home.header["head-1"].orgName}
            </AnimatedLink>
            {" | "}
            {t.home.header["head-2"].prevRole} @{" "}
            <AnimatedLink href={t.home.header["head-2"].orgUrl} mode="text">
              {t.home.header["head-2"].orgName}
            </AnimatedLink>
            {" | "}
            {t.home.header["head-3"].prevRole} @{" "}
            <AnimatedLink href={t.home.header["head-3"].orgUrl} mode="text">
              {t.home.header["head-3"].orgName}
            </AnimatedLink>
          </p>
        </div>

        <p>{t.home.about}</p>

        <p>
          {t.home.current}{" "}
          <AnimatedLink href="https://linkedin.com/company/katadata" mode="text">
            Katadata
          </AnimatedLink>
          .
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-4 space-y-2 text-[15px] max-w-[70ch]">
        <AnimatedLink
          href="https://www.linkedin.com/in/melvin-austin/"
          block
          mode="text"
          className="inline-link"
        >
          {t.home.socials.linkedin}
        </AnimatedLink>

        <AnimatedLink href="https://github.com/pinje0" block mode="text" className="inline-link">
          {t.home.socials.github}
        </AnimatedLink>

        <AnimatedLink
          href="https://steamcommunity.com/id/kyotorainn"
          block
          mode="text"
          className="inline-link"
        >
          {t.home.socials.steam}
        </AnimatedLink>

        <AnimatedLink
          href="https://open.spotify.com/user/21mxjp3gplpyos5ef7ung3iwq"
          block
          mode="text"
          className="inline-link"
        >
          {t.home.socials.spotify}
        </AnimatedLink>
      </div>

      {/* Footer */}
      <div className="footer mt-24 text-sm">
        © {new Date().getFullYear()} pinje. {t.footer.rights}
      </div>
    </main>
  );
}
