import TimelineItem from "./TimelineItem";

export interface Role {
  title: string;
  start: string;
  end: string;
  duration?: string;
  locationType: string;
  description: string;
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

          <p className="text-[14px] whitespace-pre-line">{roles[0].description}</p>

          {roles[0].skills && (
            <div className="flex flex-wrap gap-2 pt-6">
              {roles[0].skills.map((s, idx) => (
                <span key={idx} className="px-2 py-[2px] text-[12px] bg-secondary rounded">
                  {s}
                </span>
              ))}
            </div>
          )}
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

              <p className="text-[14px] whitespace-pre-line">{r.description}</p>

              {r.skills && (
                <div className="flex flex-wrap gap-2 pt-6">
                  {r.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-[2px] text-[12px] bg-secondary rounded">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </TimelineItem>
  );
}
