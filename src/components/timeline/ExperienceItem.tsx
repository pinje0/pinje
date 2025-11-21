import TimelineItem from "./TimelineItem";

export interface Role {
  title: string;
  start: string;
  end: string;
  locationType: string;
  description: string;
}

export interface ExperienceItemProps {
  company: string;
  employmentType: string;
  duration: string;
  location: string;
  roles: Role[];
  skills?: string[];
}

export default function ExperienceItem({
  company,
  employmentType,
  duration,
  location,
  roles,
  skills,
}: ExperienceItemProps) {
  const multi = roles.length > 1;

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

      {/* Single role */}
      {!multi && (
        <div className="space-y-1">
          <h4 className="font-medium text-[15px]">{roles[0].title}</h4>
          <p className="text-[14px] text-muted-foreground">
            {roles[0].start} – {roles[0].end} • {roles[0].locationType}
          </p>
          <p className="text-[14px]">{roles[0].description}</p>
        </div>
      )}

      {/* Multi role */}
      {multi && (
        <div className="space-y-4">
          {roles.map((r, i) => (
            <div key={i} className="border-l pl-4">
              <h4 className="font-medium text-[15px]">{r.title}</h4>
              <p className="text-[14px] text-muted-foreground">
                {r.start} – {r.end} • {r.locationType}
              </p>
              <p className="text-[14px]">{r.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((s, idx) => (
            <span key={idx} className="px-2 py-[2px] text-[12px] bg-secondary rounded">
              {s}
            </span>
          ))}
        </div>
      )}
    </TimelineItem>
  );
}
