import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoundTimeDisplayProps {
  time: string;
  roundNumber: number;
  compact?: boolean;
}

export function RoundTimeDisplay({
  time,
  roundNumber,
  compact = false,
}: RoundTimeDisplayProps) {
  // Check if time contains venue information in parentheses
  const hasVenue = time.includes("(") && time.includes(")");

  // Split time and venue
  const timeOnly = hasVenue ? time.split("(")[0].trim() : time;
  const venue = hasVenue ? time.split("(")[1].replace(")", "").trim() : null;

  return (
    <div
      className={`flex ${
        compact ? "flex-col gap-1" : "flex-row gap-2 items-center"
      }`}
    >
      <div className="flex items-center gap-1">
        {!compact && <Clock className="h-3 w-3 text-amber-400" />}
        <span className="text-amber-200">{timeOnly}</span>
      </div>

      {venue && (
        <Badge
          variant="outline"
          className="bg-amber-950/40 border-amber-800/30 text-amber-400 text-xs px-1.5 py-0.5"
        >
          {venue}
        </Badge>
      )}
    </div>
  );
}
