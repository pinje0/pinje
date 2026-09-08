import { getDictionary } from "@/lib/i18n";
import ExperienceItem from "@/components/timeline/ExperienceItem";
import EducationItem from "@/components/timeline/EducationItem";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

function formatDuration(
  startMonth: string,
  endMonth: string | null,
  labels: { month: string; months: string }
) {
  const [sy, sm] = startMonth.split("-").map(Number);
  const now = new Date();
  const [ey, em] = endMonth
    ? endMonth.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  return `${months} ${months === 1 ? labels.month : labels.months}`;
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
  const t = await getDictionary(locale);

  return {
    title: t.meta.pages.experience,
  };
}

export default async function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = await getDictionary(locale);

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-[820px] w-full">
      {/* Experience Title */}
      <h1 className="text-xl font-semibold mb-8">{t.experiencePage.title}</h1>

      {/* Experience Items */}
      {t.experiencePage.items.map((item, idx) => (
        <ExperienceItem
          key={idx}
          company={item.company}
          orgUrl={item.orgUrl}
          employmentType={item.employmentType}
          duration={formatDuration(item.startMonth, item.endMonth, t.experiencePage.labels)}
          location={item.location}
          roles={item.roles}
        />
      ))}

      {/* Education Title */}
      <h1 className="text-xl font-semibold mt-16 mb-8">{t.experiencePage.educationTitle}</h1>

      {/* Education Items */}
      {t.experiencePage.education.map((item, idx) => (
        <EducationItem
          key={idx}
          school={item.school}
          degree={item.degree}
          major={item.major}
          gpa={item.gpa}
          start={item.start}
          end={item.end}
        />
      ))}
    </main>
  );
}
