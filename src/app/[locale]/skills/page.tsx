"use client";

import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { skillIcons } from "@/components/icons/skillIcons";
import React, { useState, useEffect } from "react";


interface Dictionary {
  meta: {
    title: string;
    pages: {
      skills: string;
    };
  };
  skillsPage: {
    title: string;
  };
  [key: string]: unknown;
}

export default function SkillsPage({ params }: { params: Promise<{ locale: string }> }) {
  const [t, setT] = useState<Dictionary | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      const resolvedParams = await params;
      const currentLocale = resolvedParams.locale;
      
      const validLocales = ["en", "id", "jp"];
      if (!validLocales.includes(currentLocale)) {
        notFound();
        return;
      }
      
      const dictionary = await getDictionary(currentLocale) as Dictionary;
      setT(dictionary);
    };

    initializeData();
  }, [params]);

  if (!t) {
    return <div className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-6xl w-full">Loading...</div>;
  }

  // Helper function to safely render icons
  const renderIcon = (iconKey: string) => {
    const icon = skillIcons[iconKey];
    if (!icon) return null;
    if (typeof icon === 'string' || typeof icon === 'number') return null;
    return icon;
  };

  // Your CV data
  const languageProficiency = [
    { name: "Bahasa Indonesia", proficiency: "Native/Bilingual", flag: "🇮🇩" },
    { name: "English", proficiency: "Limited Working Proficiency", flag: "🇬🇧" },
    { name: "日本語", proficiency: "Elementary Proficiency", flag: "🇯🇵" }
  ];

  const hardSkills = [
    "HTML", "CSS", "Javascript", "Typescript", "Python", "PHP", "Laravel", 
    "Tailwind CSS", "React.js", "Bootstrap", "Express.js", "Next.js", 
    "Node.js", "MongoDB", "PostgreSQL", "NoSQL", "Git", "Cloud Computing", 
    "Google Cloud Platform (GCP)", "Figma", "Postman"
  ];

  const softSkills = [
    "Problem Solving", "Team Collaboration", "Critical Thinking", "Adaptability"
  ];

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-6xl w-full">
      <h1 className="text-xl font-semibold mb-12">{t.skillsPage.title}</h1>

      {/* Language Proficiency - Only section with proficiency levels */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">Language Proficiency</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          {languageProficiency.map((lang, index) => (
            <div key={lang.name} className="group relative">
              <div className="absolute inset-0 bg-primary/10 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
              <div className="relative bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                    {lang.proficiency}
                  </div>
                </div>
                <h3 className="font-medium text-sm">{lang.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hard Skills - Visual skill grid */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">Technical Skills</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {hardSkills.map((skill) => {
            const iconElement = renderIcon(skill);
            
            return (
              <div key={skill} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 rounded-lg scale-95 group-hover:scale-100 transition-all duration-300"></div>
                <div className="relative bg-background border border-border/50 rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-2">
                    {iconElement ? (
                      <div className="text-2xl text-primary group-hover:scale-110 transition-transform">
                        {iconElement}
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center text-xs font-mono text-muted-foreground">
                        {skill.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-medium truncate w-full">{skill}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Soft Skills - Elegant card layout */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-medium">Soft Skills</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
          {softSkills.map((skill) => {
            const iconElement = renderIcon(skill);
            
            return (
              <Card key={skill} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {iconElement ? (
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          <div className="text-xl">{iconElement}</div>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                          <span className="text-sm font-medium">{skill.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{skill}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Skills Overview - Visual representation */}
      <section className="mb-12">
        <div className="bg-muted/30 rounded-xl p-8 border border-border/50">
          <h3 className="text-base font-medium mb-6 text-center">Skills Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{hardSkills.length}+</div>
              <div className="text-sm text-muted-foreground">Technical Skills</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{softSkills.length}</div>
              <div className="text-sm text-muted-foreground">Core Competencies</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{languageProficiency.length}</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}