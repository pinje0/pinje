import TimelineItem from "./TimelineItem";

export interface EducationItemProps {
  school: string;
  degree: string;
  major: string;
  gpa?: string;
  start: string;
  end: string;
}

export default function EducationItem({
  school,
  degree,
  major,
  gpa,
  start,
  end,
}: EducationItemProps) {
  return (
    <TimelineItem>
      <h3 className="font-semibold text-[16px]">{school}</h3>

      <p className="text-[14px] text-muted-foreground">
        {degree} — {major}
      </p>

      <p className="text-[14px] text-muted-foreground">
        {start} – {end}
      </p>

      {gpa && <p className="text-[14px]">GPA: {gpa}</p>}
    </TimelineItem>
  );
}
