import { getDictionary } from "@/lib/i18n";
import Logo from "@/components/Logo";
import LastUpdate from "@/components/LastUpdate";
import AnimatedLink from "@/components/AnimatedLink";
import { notFound } from "next/navigation";
import { socialIcons } from "@/components/icons/socialIcons";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return {
    title: `${t.meta.title} | ${t.meta.pages.home}`,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Allow en, id, jp
  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = await getDictionary(locale);

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-[820px] w-full">
      <LastUpdate
        message={t.common.lastUpdate.message}
        label={t.common.lastUpdate.label}
        date={t.common.lastUpdate.date}
      />
      {/* Logo */}
      <div className="mb-8 mt-8">
        <Logo className="w-60 h-60" />
      </div>

      {/* About Section */}
      <div className="space-y-5 text-[15px] leading-[1.55] max-w-[75ch]">
        {/* Header Section - Experience highlights */}
        <div className="space-y-1">
          <p>
            {t.homePage.experience.items.map((item, index) => (
              <span key={index}>
                {index > 0 && t.homePage.experience.labels.separator}
                {locale === "jp" ? (
                  <>
                    <AnimatedLink href={item.orgUrl} mode="text">
                      {item.organization}
                    </AnimatedLink>
                    {t.homePage.experience.labels.at}
                    {item.role}
                  </>
                ) : (
                  <>
                    {item.status === "past" && t.homePage.experience.labels.prefix}
                    {item.role} {t.homePage.experience.labels.at}{" "}
                    <AnimatedLink href={item.orgUrl} mode="text">
                      {item.organization}
                    </AnimatedLink>
                  </>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* About text */}
        <div className="space-y-3">
          <p>{t.homePage.about.text}</p>

          {/* Current position */}
          <div className="border-l-2 border-foreground/20 pl-4 py-2">
            <p className="text-[15px]">
              {t.homePage.current.status} {t.homePage.current.role} {t.homePage.current.preposition}{" "}
              <AnimatedLink href={t.homePage.current.companyUrl} mode="text">
                {t.homePage.current.company}
              </AnimatedLink>
            </p>
            <p className="text-[13px] text-muted-foreground mt-1">
              {t.homePage.current.startDate}
              {t.homePage.current.labels.dateSeparator}
              {t.homePage.current.endDate}
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-4 space-y-2 text-[15px] max-w-[70ch] ">
        {t.homePage.socials.links.map((social) => (
          <AnimatedLink
            key={social.name}
            href={social.url}
            block
            mode="text"
            className="flex items-center gap-2 pl-1"
          >
            <span className="text-[18px] pr-1 pt-0.5">{socialIcons[social.name]}</span>
            <span>{social.label}</span>
          </AnimatedLink>
        ))}
      </div>

      {/* Footer */}
      <div className="footer mt-24 text-sm">
        {t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}
      </div>
    </main>
  );
}
