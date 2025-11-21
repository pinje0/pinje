import ExperienceItem from "@/components/timeline/ExperienceItem";
import EducationItem from "@/components/timeline/EducationItem";

export default function ExperiencePage() {
  return (
    <main className="pt-32 pb-20 mx-auto px-10 md:px-20 max-w-[820px] w-full">
      <h1 className="text-xl font-semibold mb-8">Experience</h1>

      <ExperienceItem
        company="Tokopedia"
        employmentType="Full-Time"
        duration="2022 – Present"
        location="Jakarta • Remote"
        roles={[
          {
            title: "Frontend Developer",
            start: "Jan 2023",
            end: "Present",
            locationType: "Remote",
            description: "Membangun UI dengan Next.js dan TypeScript.",
          },
        ]}
        skills={["Next.js", "Tailwind", "TypeScript"]}
      />

      <h1 className="text-xl font-semibold mt-16 mb-8">Education</h1>

      <EducationItem
        school="Binus University"
        degree="Bachelor"
        major="Computer Science"
        gpa="3.78"
        start="2019"
        end="2023"
      />
    </main>
  );
}
