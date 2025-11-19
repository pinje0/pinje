import { Info } from "lucide-react";

export default function LastUpdate() {
  return (
    <div
      className="
        mt-6 inline-flex items-center gap-2
        border border-border/50
        bg-zinc-200/60 dark:bg-zinc-800/60
        px-3 py-2 rounded-lg
      "
    >
      <Info className="h-4 w-4 text-foreground/70" />

      <p className="text-[13px] text-foreground/80 leading-none whitespace-nowrap">
        Site is still under reconstruction
        <span className="font-medium text-foreground ml-1">(Last Update — November 2025)</span>
      </p>
    </div>
  );
}
