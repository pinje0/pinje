import { Info } from "lucide-react";

interface LastUpdateProps {
  message: string;
  label: string;
  date: string;
}

export default function LastUpdate({ message, label, date }: LastUpdateProps) {
  return (
    <div
      className="
        mt-6 inline-flex items-center gap-2
        border border-border/60
        bg-neutral-200! dark:bg-white/6!
        px-3 py-2 rounded-lg
      "
    >
      <Info className="h-4 w-4 text-foreground/70" />

      <p className="text-[13px] text-foreground/80 leading-none whitespace-nowrap">
        {message}
        <span className="font-medium text-foreground ml-1">
          ({label} — {date})
        </span>
      </p>
    </div>
  );
}
