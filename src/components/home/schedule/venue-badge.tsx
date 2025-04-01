import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VenueBadgeProps {
  venue: string;
  className?: string;
}

export function VenueBadge({ venue, className = "" }: VenueBadgeProps) {
  // Check if venue is "Multiple Locations" or "Check event times"
  const isSpecialVenue =
    venue === "Multiple Locations" || venue === "Check specific event timings";

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1 px-2 py-1 bg-amber-950/40 border-amber-800/30 ${className}`}
    >
      <MapPin className="h-3 w-3 text-amber-400" />
      <span
        className={`truncate text-xs ${
          isSpecialVenue ? "text-amber-400" : "text-amber-200"
        }`}
      >
        {venue}
      </span>
    </Badge>
  );
}
