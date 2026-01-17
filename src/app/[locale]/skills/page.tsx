import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { skillIcons } from "@/components/icons/skillIcons";
import { Metadata } from "next";

interface Dictionary {
  meta: {
    title: string;
    pages: {
      skills: string;
    };
  };
  skillsPage: {
    title: string;
    sections: Record<string, string>;
    languages: Record<string, { name: string; level: string; locale: string }>;
    proficiency: Record<string, string>;
  };
  [key: string]: unknown;
}

const flagIcons: Record<string, string> = {
  id: "fi fi-id",
  en: "fi fi-gb",
  jp: "fi fi-jp",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }, { locale: "jp" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = (await getDictionary(locale)) as Dictionary;

  return {
    title: t.skillsPage?.title || "Skills",
  };
}

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = (await getDictionary(locale)) as Dictionary;

  const sections = t.skillsPage?.sections || {};
  const languagesData = t.skillsPage?.languages || {};
  const languages = [
    { id: "bahasa_indonesia", level: languagesData.bahasa_indonesia?.level || "Native", locale: "id" },
    { id: "english", level: languagesData.english?.level || "Limited Working", locale: "en" },
    { id: "japanese", level: languagesData.japanese?.level || "Elementary", locale: "jp" },
  ];

  const programmingLanguages = ["HTML", "CSS", "Javascript", "Typescript", "Python", "PHP"];

  const frameworks = [
    "Tailwind CSS",
    "React.js",
    "Bootstrap",
    "Express.js",
    "Next.js",
    "Node.js",
    "Laravel",
  ];

  const databases = ["MongoDB", "PostgreSQL"];

  const tools = ["Git", "Figma", "Postman", "Docker"];

  const cloud = ["Google Cloud Platform (GCP)"];

  const renderIcon = (iconKey: string) => {
    const icon = skillIcons[iconKey];
    if (!icon) return null;
    if (typeof icon === "string" || typeof icon === "number") return null;
    return icon;
  };

  const renderSkillIcon = (skill: string) => {
    const iconElement = renderIcon(skill);
    if (iconElement) {
      return (
        <div className="text-2xl text-primary group-hover:scale-110 transition-transform">
          {iconElement}
        </div>
      );
    }
    return (
      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center text-xs font-mono text-muted-foreground">
        {skill.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <main className="pt-32 pb-20 mx-auto px-6 md:px-20 max-w-6xl w-full">
      <h1 className="text-xl font-semibold mb-12">{t.skillsPage?.title || "Skills"}</h1>

      {/* Programming Languages */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">
            {sections.programmingLanguages || "Programming Languages"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {programmingLanguages.map((skill) => (
            <div key={skill} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  {renderSkillIcon(skill)}
                  <span className="text-xs font-medium break-words">{skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frameworks & Libraries */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">{sections.frameworks || "Frameworks & Libraries"}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {frameworks.map((skill) => (
            <div key={skill} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  {renderSkillIcon(skill)}
                  <span className="text-xs font-medium break-words">{skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Databases */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">{sections.databases || "Databases"}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {databases.map((skill) => (
            <div key={skill} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  {renderSkillIcon(skill)}
                  <span className="text-xs font-medium break-words">{skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">{sections.tools || "Tools"}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tools.map((skill) => (
            <div key={skill} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  {renderSkillIcon(skill)}
                  <span className="text-xs font-medium break-words">{skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cloud & DevOps */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">{sections.cloud || "Cloud & DevOps"}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {cloud.map((skill) => (
            <div key={skill} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-2">
                  {renderSkillIcon(skill)}
                  <span className="text-xs font-medium break-words">{skill}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Language Proficiency */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">
            {sections.languageProficiency || "Language Proficiency"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          {languages.map((lang) => (
            <div key={lang.id} className="group relative">
              <div className="absolute inset-0 bg-primary/10 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-2xl h-6 w-6 ${flagIcons[lang.locale]}`}></span>
                  <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                    {lang.level}
                  </div>
                </div>
                <h3 className="font-medium text-sm">{languagesData[lang.id]?.name || lang.id}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
