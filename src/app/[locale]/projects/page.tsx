import { getDictionary } from "@/lib/i18n";
import AnimatedLink from "@/components/AnimatedLink";
import { skillIcons } from "@/components/icons/skillIcons";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  featured: boolean;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = (await getDictionary(locale)) as any;

  return {
    title: t.meta.pages.projects,
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = (await getDictionary(locale)) as any;

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-6xl w-full">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-8">{t.projectsPage.title}</h1>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.projectsPage.items.map((project: ProjectItem) => (
          <Card
            key={project.id}
            className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
          >
            <CardHeader className="p-0">
              {/* Project Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </CardHeader>

            <CardContent className="p-6 flex-1 flex flex-col">
              {/* Title */}
              <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                <AnimatedLink
                  href={`/${locale}/projects/${project.id}`}
                  mode="text"
                  className="hover:underline w-fit"
                >
                  <span className="line-clamp-2">
                    {project.title}
                  </span>
                </AnimatedLink>
              </CardTitle>

              {/* Project Start Date */}
              <div className="text-xs text-muted-foreground mb-3">
                {t.projectDetailPage?.details?.[project.id]?.projectStart}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech: string) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs"
                  >
                    <span className="text-[12px]">{skillIcons[tech] || tech}</span>
                    <span>{tech}</span>
                  </div>
                ))}
                {project.techStack.length > 4 && (
                  <div className="flex items-center px-2 py-1 bg-muted rounded-md text-xs">
                    +{project.techStack.length - 4}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex gap-2">
              {/* View Details Button */}
              <Button asChild className="flex-1">
                <a
                  href={`/${locale}/projects/${project.id}`}
                  className="transition-colors duration-200 hover:bg-primary/90"
                >
                  View Details
                </a>
              </Button>

              {/* GitHub & Deployed Links */}
              <div className="flex gap-2">
                {t.projectDetailPage?.details?.[project.id]?.githubUrl && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={t.projectDetailPage.details[project.id].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View GitHub repository"
                      className="transition-colors duration-200 hover:bg-accent"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {t.projectDetailPage?.details?.[project.id]?.deployedUrl && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={t.projectDetailPage.details[project.id].deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View deployed project"
                      className="transition-colors duration-200 hover:bg-accent"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {t.projectsPage.items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No projects to display yet.</p>
        </div>
      )}
    </main>
  );
}
