import { skillIcons } from "@/components/icons/skillIcons";
import TimelineItem from "./TimelineItem";

export interface CategorizedDescription {
  frontend?: string[];
  backend?: string[];
}

export type DescriptionContent = string | string[] | CategorizedDescription;

export interface Role {
  title: string;
  start: string;
  end: string;
  duration?: string;
  locationType: string;
  context?: string;
  description: DescriptionContent;
  skills?: string[];
}

export interface ExperienceItemProps {
  company: string;
  employmentType: string;
  duration: string;
  location: string;
  roles: Role[];
}

export default function ExperienceItem({
  company,
  employmentType,
  duration,
  location,
  roles,
}: ExperienceItemProps) {
  const multi = roles.length > 1;

  const renderSkills = (skills?: string[]) => {
    if (!skills) return null;

    return (
      <div className="flex flex-wrap gap-2 pt-6">
        {skills.map((s, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 px-2 py-0.5 text-[12px] bg-secondary rounded"
          >
            {skillIcons[s] && <span className="text-[14px]">{skillIcons[s]}</span>}
            {s}
          </span>
        ))}
      </div>
    );
  };

  const renderList = (items: string[], label?: string) => (
    <div className={label ? "mt-3 first:mt-0" : ""}>
      {label && <p className="font-semibold text-[14px] text-foreground mb-1">{label}</p>}
      <ul className="list-disc list-outside ml-5 space-y-1.5 text-[14px]">
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderCategorizedDescription = (desc: CategorizedDescription) => {
    return (
      <div className="space-y-2">
        {desc.frontend && renderList(desc.frontend, "Frontend:")}
        {desc.backend && renderList(desc.backend, "Backend:")}
      </div>
    );
  };

  const renderDescription = (description: DescriptionContent, context?: string) => {
    if (description && typeof description === "object" && !Array.isArray(description)) {
      return (
        <div className="space-y-2">
          {context && <p className="text-[14px] text-muted-foreground italic">{context}</p>}
          {renderCategorizedDescription(description)}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {context && <p className="text-[14px] text-muted-foreground italic">{context}</p>}
        {Array.isArray(description) ? (
          <ul className="list-disc list-outside ml-5 space-y-1.5 text-[14px]">
            {description.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[14px] whitespace-pre-line">{description}</p>
        )}
      </div>
    );
  };

  return (
    <TimelineItem>
      {/* Header */}
      <div>
        <h3 className="font-semibold text-[16px]">{company}</h3>
        <p className="text-[14px] text-muted-foreground">
          {employmentType} • {duration}
        </p>
        <p className="text-[14px] text-muted-foreground">{location}</p>
      </div>

      {/* Single Role */}
      {!multi && (
        <div className="space-y-2 mt-2">
          <h4 className="font-bold text-[15px]">{roles[0].title}</h4>

          <p className="text-[14px] text-muted-foreground">
            {roles[0].start} – {roles[0].end}
            {roles[0].duration && ` • ${roles[0].duration}`}
            {roles[0].locationType && ` • ${roles[0].locationType}`}
          </p>

          {renderDescription(roles[0].description, roles[0].context)}

          {renderSkills(roles[0].skills)}
        </div>
      )}

      {/* Multi Role */}
      {multi && (
        <div className="space-y-6 mt-3">
          {roles.map((r, i) => (
            <div key={i} className="border-l pl-4 space-y-2">
              <h4 className="font-bold text-[15px]">{r.title}</h4>

              <p className="text-[14px] text-muted-foreground">
                {r.start} – {r.end}
                {r.duration && ` • ${r.duration}`}
                {r.locationType && ` • ${r.locationType}`}
              </p>

              {renderDescription(r.description, r.context)}

              {renderSkills(r.skills)}
            </div>
          ))}
        </div>
      )}
    </TimelineItem>
  );
}
