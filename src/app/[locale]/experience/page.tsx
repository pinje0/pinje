import { getDictionary } from "@/lib/i18n";
import ExperienceItem from "@/components/timeline/ExperienceItem";
import EducationItem from "@/components/timeline/EducationItem";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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
          employmentType={item.employmentType}
          duration={item.duration}
          location={item.location}
          roles={item.roles}
          // skills={item.skills}
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
