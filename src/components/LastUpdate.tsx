import { Info, AlertTriangle } from "lucide-react";

interface LastUpdateProps {
  message: string;
  label: string;
  date: string;
  translationWarning?: string;
}

export default function LastUpdate({ message, label, date, translationWarning }: LastUpdateProps) {
  return (
    <div className="flex flex-col gap-2 max-w-full">
      <div
        className="
          mt-6 inline-flex items-start gap-2
          border border-border/60
          bg-neutral-200! dark:bg-white/6!
          px-3 py-2 rounded-lg
          max-w-fit md:max-w-fit
        "
      >
        <Info className="h-4 w-4 text-foreground/70 shrink-0 mt-0.5" />

        <p className="text-[13px] text-foreground/80 leading-snug whitespace-normal md:whitespace-nowrap">
          {message}
          <span className="font-medium text-foreground md:ml-1 block md:inline">
            ({label} — {date})
          </span>
        </p>
      </div>

      {translationWarning && (
        <div
          className="
            inline-flex items-start gap-2
            border border-yellow-500/30
            bg-yellow-500/10 dark:bg-yellow-500/5
            px-3 py-2 rounded-lg
            max-w-fit md:max-w-fit
          "
        >
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />

          <p className="text-[12px] text-yellow-700 dark:text-yellow-400 leading-snug whitespace-normal">
            {translationWarning}
          </p>
        </div>
      )}
    </div>
  );
}
