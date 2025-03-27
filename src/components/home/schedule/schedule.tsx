"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Users, Search, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEffect } from "react";
import { events } from "@/data/events";
import type { I_Coordinator } from "@/types/type";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const getAllVenues = () => {
  const venues = new Set<string>();
  events.forEach((event) => venues.add(event.venue));
  return Array.from(venues);
};

export const Schedule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedCoordinator, setSelectedCoordinator] =
    useState<I_Coordinator | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const venues = getAllVenues();

  // Find the maximum number of rounds
  const maxRounds = Math.max(...events.map((event) => event.roundsTime.length));

  // Filter events based on search query and selected venues
  const filteredEvents = events.filter(
    (event) =>
      (searchQuery === "" ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.coordinator.some((coord) =>
          coord.name.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (selectedVenues.length === 0 || selectedVenues.includes(event.venue))
  );

  // Sort events by name
  const sortedEvents = [...filteredEvents].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <section
      id="schedule"
      className="py-16 relative  bg-gradient-to-b from-amber-950/5 via-amber-900/3 to-amber-950/5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-amber-900/5 to-[#0a0d14]"></div>

      <div className="container mx-auto  px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4">
            The Blueprint
          </Badge>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Event Schedule
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-4"></div>
        </motion.div>
        <div className=" flex justify-center">
          <div className="flex flex-col md:flex-row justify-center   gap-4 mb-6 items-start">
            <div className="flex-1 flex flex-col justify-center w-fit sm:flex-row gap-4">
              <div className="relative flex-1 ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500/70 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-amber-950/30 border-amber-800/50 text-amber-200 placeholder:text-amber-500/50 focus-visible:ring-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <div className="flex  text-sm flex-col sm:flex-row lg:items-center gap-4 bg-amber-950/30 p-2 rounded-lg border border-amber-800/50">
            <div className="flex  items-center gap-2 text-amber-200">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="font-medium">Report Time:</span>
              <span className="text-amber-300">8:30 AM</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-amber-500/50"></div>

            <div className="flex items-center gap-2 text-amber-200">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="font-medium">Inauguration Time:</span>
              <span className="text-amber-300">9:00 AM</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-amber-500/50"></div>
            <div className="flex items-center gap-2 text-amber-200">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="font-medium">Lunch Time:</span>
              <span className="text-amber-300">12:30 PM</span>
            </div>
          </div>
        </div>

        {selectedVenues.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedVenues.map((venue) => (
              <Badge
                key={venue}
                className="bg-amber-800/30 text-amber-200 px-3 py-1"
              >
                {venue}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 text-amber-400 hover:text-amber-200 hover:bg-transparent"
                  onClick={() =>
                    setSelectedVenues(selectedVenues.filter((v) => v !== venue))
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-400 hover:text-amber-200 hover:bg-transparent px-2 py-1 h-auto"
              onClick={() => setSelectedVenues([])}
            >
              Clear all
            </Button>
          </div>
        )}

        {isDesktop ? (
          // Desktop view with table
          <TooltipProvider>
            <div className="relative overflow-hidden rounded-lg border border-amber-900/30 bg-amber-900/5 backdrop-blur-sm">
              <div className="absolute -inset-px bg-gradient-to-r from-amber-700/10 to-amber-800/10 rounded-lg blur-sm opacity-75"></div>
              <div className="relative">
                <Table>
                  <TableHeader>
                    <TableRow className="border-amber-900/30 hover:bg-transparent bg-amber-950/80 backdrop-blur-sm">
                      <TableHead className="text-amber-400 font-bold sticky left-0 bg-amber-950/80 z-20 w-[250px]">
                        EVENT NAME
                      </TableHead>
                      <TableHead className="text-amber-400 font-bold w-[180px]">
                        VENUE
                      </TableHead>
                      <TableHead className="text-amber-400 font-bold w-[180px]">
                        EVENT HEAD
                      </TableHead>
                      {Array.from({ length: maxRounds }).map((_, index) => (
                        <TableHead
                          key={index}
                          className="text-amber-400 font-bold w-[150px]"
                        >
                          ROUND {index + 1}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedEvents.length > 0 ? (
                      sortedEvents.map((event) => (
                        <TableRow
                          key={event.id}
                          className="border-amber-900/30 hover:bg-amber-500/10 transition-colors"
                        >
                          <TableCell className="font-medium text-amber-200 sticky left-0 bg-amber-900/5 backdrop-blur-sm z-10">
                            {event.name}
                          </TableCell>
                          <TableCell className="text-amber-200/80">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center cursor-pointer gap-2 max-w-[180px]">
                                  <MapPin className="h-4 w-4 flex-shrink-0 text-amber-400" />
                                  <div className="truncate">{event.venue}</div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-amber-950 border-amber-800 text-amber-200">
                                {event.venue}
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="text-amber-200/80 font-medium">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="truncate max-w-[180px]">
                                  {event.coordinator[0].name}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-amber-950 border-amber-800 text-amber-200">
                                {event.coordinator[0].name} -{" "}
                                {event.coordinator[0].contact}
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          {event.roundsTime.map((time, idx) => (
                            <TableCell key={idx} className="text-amber-200 cursor-pointer">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="truncate max-w-[150px]">
                                    {time}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-amber-950 border-amber-800 text-amber-200">
                                  {time}
                                </TooltipContent>
                              </Tooltip>
                            </TableCell>
                          ))}
                          {/* Add empty cells for events with fewer rounds */}
                          {Array.from({
                            length: maxRounds - event.roundsTime.length,
                          }).map((_, idx) => (
                            <TableCell
                              key={`empty-${idx}`}
                              className="text-amber-200/30"
                            >
                              -
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={maxRounds + 3}
                          className="text-center py-8 text-amber-200"
                        >
                          No events found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TooltipProvider>
        ) : (
          // Mobile view with accordion - KEEPING THIS AS BEFORE
          <div className="rounded-lg border border-amber-900/30 bg-amber-900/5 backdrop-blur-sm overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-amber-700/10 to-amber-800/10 rounded-lg blur-sm opacity-75"></div>
            <div className="relative">
              <Accordion type="single" collapsible className="w-full">
                {sortedEvents.length > 0 ? (
                  sortedEvents.map((event) => (
                    <AccordionItem
                      key={event.id}
                      value={`event-${event.id}`}
                      className="border-amber-900/20"
                    >
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-amber-900/10">
                        <div className="flex flex-col items-start text-left">
                          <h3 className="font-medium text-amber-200">
                            {event.name}
                          </h3>
                          {/* <div className="flex items-center gap-1 text-amber-200/70 text-sm mt-1">
                            <MapPin className="h-3 w-3 text-amber-400" />
                            {event.venue}
                          </div> */}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-amber-300 text-sm font-medium flex items-center gap-1 mb-2">
                              <MapPin className="h-3.5 w-3.5" /> Venue
                            </h4>
                            <div className="text-amber-200">{event.venue}</div>
                          </div>

                          <div>
                            <h4 className="text-amber-300 text-sm font-medium flex items-center gap-1 mb-2">
                              <Clock className="h-3.5 w-3.5" /> Rounds
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {event.roundsTime.map((time, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Badge
                                    variant="outline"
                                    className="bg-amber-950/50 text-white border-yellow-700 text-xs whitespace-nowrap"
                                  >
                                    Round {idx + 1}
                                  </Badge>
                                  <span className="text-amber-200">{time}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-amber-300 text-sm font-medium flex items-center gap-1 mb-2">
                              <Users className="h-3.5 w-3.5" /> Event Head
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-amber-200 text-sm">
                                  {event.coordinator[0].name}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 py-0 border-amber-800/30  bg-transparent text-amber-200 hover:bg-amber-900/30 text-xs"
                                  onClick={() =>
                                    window.open(
                                      `tel:${event.coordinator[0].contact}`
                                    )
                                  }
                                >
                                  <Phone className="h-3 w-3 text-amber-400 mr-1" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-8 text-amber-200">
                    No events found. Try adjusting your search.
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
