import React from "react";

export default function TimelineItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-8 md:pl-12 py-4">
      {/* line */}
      <div className="absolute left-2 top-0 h-full w-px bg-border" />

      {/* dot */}
      <div className="absolute left-[7px] mt-2 w-3 h-3 rounded-full bg-primary border border-primary" />

      {/* content */}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
