import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skillIcons } from "@/components/icons/skillIcons";
import { SiTypescript, SiJavascript, SiPython, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiGit, SiAwsamplify, SiGooglecloud, SiFigma } from "react-icons/si";
import React from "react";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  category: string;
  proficiency: string;
  icon: string;
  description?: string;
}

interface Dictionary {
  meta: {
    title: string;
    description: string;
    pages: {
      home: string;
      experience: string;
      projects: string;
      skills: string;
      certificates: string;
    };
  };
  skillsPage: {
    title: string;
    categories: Record<string, string>;
    proficiency: Record<string, string>;
    languages: Record<string, { level: string; level_display: string }>;
    items: {
      name: string;
      category: string;
      proficiency: string;
      icon: string;
      description?: string;
    }[];
  };
  [key: string]: any;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale) as Dictionary;

  return {
    title: t.meta.pages.skills,
  };
}

export default async function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = await getDictionary(locale) as Dictionary;

  // Fetch GitHub repository for language detection
  const fetchGitHubData = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/pinje0/languages');
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  };

  const [githubData, setGitHubData] = React.useState<any>(null);
  
  React.useEffect(() => {
    const loadData = async () => {
      const data = await fetchGitHubData();
      setGitHubData(data);
    };
    loadData();
  }, []);

  // Get used languages from GitHub or fallback to dictionary
  const getUsedLanguages = () => {
    if (githubData) {
      const languages = githubData.languages || [];
      return languages.map((lang: any) => ({
        name: lang.language,
        proficiency: lang.proficiency || 'intermediate',
        icon: skillIcons[lang.language] || ''
      }));
    }
    return null;
  };

  const usedLanguages = getUsedLanguages();

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-6xl w-full">
      <h1 className="text-xl font-semibold mb-8">{t.skillsPage.title}</h1>

      {/* Language Proficiency Section */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          Language Proficiency
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usedLanguages ? usedLanguages.map((lang, index) => (
            <Card key={lang.name || `lang-${index}`} className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{lang.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {lang.proficiency || t.skillsPage.proficiency.intermediate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full text-center text-muted-foreground">
              <p>Language data unavailable</p>
            </div>
          )}
        </div>
      </section>

      {/* Hard Skills Section */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-6">Hard Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.skillsPage.items
            .filter(skill => skill.category === 'soft Skills')
            .map((skill, index) => {
              const Icon = skillIcons[skill.icon] || null;
              
              return (
                <Card key={skill.name} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {Icon && (
                        <div className="text-2xl text-primary">
                          <Icon />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                        {skill.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </section>

      {/* Tools Section */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-6">Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.skillsPage.items
            .filter(skill => skill.category === 'tools')
            .map((skill, index) => {
              const Icon = skillIcons[skill.icon] || null;
              
              return (
                <Card key={skill.name} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {Icon && (
                        <div className="text-2xl text-primary">
                          <Icon />
                        </div>
                      )}
                <div className="flex-1">
                    <h3 className="font-medium text-sm">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {t.skillsPage.languages?.[locale]?.level_display || t.skillsPage.proficiency.intermediate}
                    </p>
                  </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </section>

      {/* Skills Section for Frameworks & Databases */}
      <section className="mb-12">
        <h2 className="text-lg font-medium mb-6">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.skillsPage.items
            .filter(skill => skill.category === 'frameworks' || skill.category === 'databases')
            .map((skill, index) => {
              const Icon = skillIcons[skill.icon] || null;
              
              return (
                <Card key={skill.name} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {Icon && (
                        <div className="text-2xl text-primary">
                          <Icon />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{skill.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">
                          {skill.proficiency}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </section>
    </main>
  );
}