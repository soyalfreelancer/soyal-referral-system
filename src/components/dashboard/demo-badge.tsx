import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoBadgeProps {
  className?: string;
  showNote?: boolean;
}

export function DemoBadge({ className, showNote = true }: DemoBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-lg border border-amber-200/80 bg-amber-50/70 px-3 py-1.5 text-xs text-amber-900 transition-colors",
        className
      )}
    >
      <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-amber-800">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        DEMO DATA
      </span>
      {showNote && (
        <span className="flex items-center gap-1 text-slate-600">
          <Info className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
          <span>Demonstration data only. No real customer, merchant, or financial records are stored.</span>
        </span>
      )}
    </div>
  );
}
