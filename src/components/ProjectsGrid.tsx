"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { ExternalLink, Github, Search, Pin } from "lucide-react";
import Image from "next/image";
import AnimatedLink from "@/components/AnimatedLink";
import { skillIcons } from "@/components/icons/skillIcons";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  pinned: boolean;
}

interface ProjectDetail {
  projectStart: string;
  deployedUrl?: string;
  githubUrl?: string;
}

interface ProjectsGridProps {
  projects: ProjectItem[];
  projectDetails: Record<string, ProjectDetail>;
  title: string;
  labels: {
    viewDetails: string;
    noProjects: string;
    search: string;
    filterBy: string;
    sortBy: string;
    allTech: string;
    newestFirst: string;
    oldestFirst: string;
    pinned: string;
  };
  locale: string;
}

export default function ProjectsGrid({
  projects,
  projectDetails,
  title,
  labels,
  locale,
}: ProjectsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    if (selectedTech !== "all") {
      result = result.filter((project) =>
        project.techStack.includes(selectedTech)
      );
    }

    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      const dateA = parseInt(projectDetails[a.id]?.projectStart || "0");
      const dateB = parseInt(projectDetails[b.id]?.projectStart || "0");

      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [projects, searchQuery, selectedTech, sortBy, projectDetails]);

  return (
    <main className="pt-32 pb-20 mx-auto px-6 md:px-20 max-w-6xl w-full">
      <h1 className="text-xl font-semibold mb-8">{title}</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={labels.search}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={selectedTech}
          onValueChange={setSelectedTech}
          className="w-full md:w-[200px]"
        >
          <SelectItem value="all">{labels.allTech}</SelectItem>
          {allTechs.map((tech) => (
            <SelectItem key={tech} value={tech}>
              <span className="flex items-center gap-2">
                <span className="text-[14px]">{skillIcons[tech] || null}</span>
                {tech}
              </span>
            </SelectItem>
          ))}
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value: string) => setSortBy(value as "newest" | "oldest")}
          className="w-full md:w-[180px]"
        >
          <SelectItem value="newest">{labels.newestFirst}</SelectItem>
          <SelectItem value="oldest">{labels.oldestFirst}</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProjects.map((project) => (
          <Card
            key={project.id}
            className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden relative"
          >
            {project.pinned && (
              <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1">
                <Pin className="h-3 w-3" />
                {labels.pinned}
              </div>
            )}

            <CardHeader className="p-0">
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
              <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                <AnimatedLink
                  href={`/${locale}/projects/${project.id}`}
                  mode="text"
                  className="hover:underline w-fit"
                >
                  <span className="line-clamp-2">{project.title}</span>
                </AnimatedLink>
              </CardTitle>

              <div className="text-xs text-muted-foreground mb-3">
                {projectDetails[project.id]?.projectStart}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
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
              <Button asChild className="flex-1">
                <a
                  href={`/${locale}/projects/${project.id}`}
                  className="transition-colors duration-200 hover:bg-primary/90"
                >
                  {labels.viewDetails}
                </a>
              </Button>

              <div className="flex gap-2">
                {projectDetails[project.id]?.githubUrl && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={projectDetails[project.id]?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View GitHub repository"
                      className="transition-colors duration-200 hover:bg-accent"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {projectDetails[project.id]?.deployedUrl && (
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={projectDetails[project.id]?.deployedUrl}
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

      {filteredAndSortedProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">{labels.noProjects}</p>
        </div>
      )}
    </main>
  );
}
