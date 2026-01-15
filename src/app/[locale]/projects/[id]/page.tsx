import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import AnimatedLink from "@/components/AnimatedLink";
import { skillIcons } from "@/components/icons/skillIcons";
import { ArrowLeft, ExternalLink, Github, Users, Calendar, Briefcase, Code, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  featured: boolean;
}

interface ProjectDetail {
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  projectStart: string;
  projectEnd?: string | null;
  deployedUrl?: string | null;
  githubUrl?: string | null;
  license?: string;
  techStack: Record<string, string[]>;
  features: string[];
  myRole?: string;
  teamMembers?: TeamMember[] | null;
  demoVideo?: string | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getDictionary(locale) as any;

  const project = t.projectDetailPage?.details?.[id];
  if (!project) return { title: "Project Not Found" };

  return {
    title: t.meta.pages.projects,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = await getDictionary(locale) as any;
  const project = t.projectDetailPage?.details?.[id] as ProjectDetail;
  const labels = t.projectDetailPage?.labels || {};

  if (!project) notFound();

  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-6xl w-full">
      {/* Back Button */}
      <AnimatedLink
        href={`/${locale}/projects`}
        block
        mode="text"
        className="inline-flex items-center gap-2 text-[14px] mb-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="text-[16px]" />
        <span>{labels.backToProjects}</span>
      </AnimatedLink>

      {/* Header */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        {project.subtitle && (
          <p className="text-[15px] text-muted-foreground">{project.subtitle}</p>
        )}
      </div>

      {/* Main Image */}
      {project.images && project.images.length > 0 && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-foreground/10 mb-8">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Links Section */}
      <div className="flex flex-wrap gap-3 mb-8">
        {project.deployedUrl && (
          <Button asChild>
            <a
              href={project.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              <span>{labels.viewProject}</span>
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              <span>{labels.viewCode}</span>
            </a>
          </Button>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <section>
            <h2 className="text-[17px] font-medium mb-3 flex items-center gap-2">
              <Code className="h-4 w-4" />
              {labels.overview}
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>
          </section>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-[17px] font-medium mb-3">{labels.features}</h2>
              <ul className="space-y-2 text-[14px] text-muted-foreground">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-foreground/40 mt-1">•</span>
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tech Stack */}
          <section>
            <h2 className="text-[17px] font-medium mb-4">{labels.techStack}</h2>
            <div className="space-y-4">
              {Object.entries(project.techStack).map(([category, techs]) => (
                <div key={category}>
                  <h3 className="text-[14px] font-medium text-muted-foreground mb-2 capitalize">
                    {labels[category] || category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(techs as string[]).map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-1.5 text-[13px] rounded-md bg-muted/50"
                      >
                        <span className="text-[15px]">{skillIcons[tech] || tech}</span>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Members */}
          {project.teamMembers && project.teamMembers.length > 0 && (
            <section>
              <h2 className="text-[17px] font-medium mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                {labels.team}
              </h2>
              <div className="space-y-2">
                {project.teamMembers.map((member: TeamMember, index: number) => (
                  <div key={index} className="text-[14px]">
                    <AnimatedLink href={member.linkedin} mode="text">
                      {member.name}
                    </AnimatedLink>
                    <span className="text-muted-foreground"> - {member.role}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Additional Images */}
          {project.images && project.images.length > 1 && (
            <section>
              <h2 className="text-[17px] font-medium mb-3">{labels.screenshots}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(1).map((image: string, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg border border-foreground/10"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} screenshot ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Demo Video */}
          {project.demoVideo && (
            <section>
              <h2 className="text-[17px] font-medium mb-3 flex items-center gap-2">
                <Play className="h-4 w-4" />
                {labels.demo}
              </h2>
              <div className="relative aspect-video overflow-hidden rounded-lg border border-foreground/10">
                <video src={project.demoVideo} controls className="w-full h-full">
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{labels.projectInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Timeline */}
              <div>
                <h3 className="text-[14px] font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {labels.timeline}
                </h3>
                <p className="text-[14px]">
                  {project.projectStart}
                </p>
              </div>

              {/* My Role */}
              {project.myRole && (
                <div>
                  <h3 className="text-[14px] font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="h-3 w-3" />
                    {labels.myRole}
                  </h3>
                  <p className="text-[14px]">{project.myRole}</p>
                </div>
              )}

              {/* License */}
              {project.license && (
                <div>
                  <h3 className="text-[14px] font-medium text-muted-foreground mb-2">License</h3>
                  <p className="text-[14px]">{project.license}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{labels.quickLinks}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.deployedUrl && (
                <Button asChild className="w-full">
                  <a
                    href={project.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors duration-200 hover:bg-primary/90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {labels.viewProject}
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild className="w-full">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors duration-200 hover:bg-accent"
                  >
                    <Github className="h-4 w-4" />
                    {labels.viewCode}
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}