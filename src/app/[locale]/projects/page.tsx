import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import dynamic from "next/dynamic";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  pinned: boolean;
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
    title: t.meta.pages.projects,
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const validLocales = ["en", "id", "jp"];
  if (!validLocales.includes(locale)) notFound();

  const t = await getDictionary(locale);
  const projects = t.projectsPage.items as ProjectItem[];
  const projectDetails = t.projectDetailPage?.details || {};
  const labels = t.projectsPage?.labels || {};

  const ProjectsGrid = dynamic(() => import("@/components/ProjectsGrid"), {
    loading: () => null,
  });

  return (
    <ProjectsGrid
      projects={projects}
      projectDetails={projectDetails}
      title={t.projectsPage.title}
      labels={{
        viewDetails: (labels as Record<string, string>).viewDetails || "View Details",
        noProjects: (labels as Record<string, string>).noProjects || "No projects to display yet.",
        search: (labels as Record<string, string>).search || "Search projects...",
        filterBy: (labels as Record<string, string>).filterBy || "Filter by",
        sortBy: (labels as Record<string, string>).sortBy || "Sort by",
        allTech: (labels as Record<string, string>).allTech || "All Technologies",
        newestFirst: (labels as Record<string, string>).newestFirst || "Newest first",
        oldestFirst: (labels as Record<string, string>).oldestFirst || "Oldest first",
        pinned: (labels as Record<string, string>).pinned || "Pinned",
      }}
      locale={locale}
    />
  );
}
