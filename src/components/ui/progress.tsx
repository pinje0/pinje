import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-full h-2 overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }