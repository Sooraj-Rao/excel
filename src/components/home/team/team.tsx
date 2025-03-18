"use client";

import { useState, memo } from "react"; // Use memo to optimize rendering
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/data/events";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Phone, X } from "lucide-react";

// Memoize the TeamMemberCards to prevent re-rendering if the data doesn't change
const TeamMemberCards = memo(
  ({
    members,
    startIndex,
  }: {
    members: typeof teamMembers;
    startIndex: number;
  }) => (
    <div
      className={`grid grid-cols-2 ${
        members.length == 5 ? "md:grid-cols-5" : "md:grid-cols-4"
      } gap-2 md:gap-6 w-full`}
    >
      {members.map((member, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="w-full"
        >
          <Card className="relative bg-gradient-to-b from-amber-900/20 to-amber-950/40 backdrop-blur-sm border-amber-800/30 overflow-hidden w-full h-full group">
            <div className="relative h-72 overflow-hidden">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4 text-center relative flex flex-col h-[140px]">
              <h3 className="text-sm lg:text-xl font-bold text-white mb-1">
                {member.name}
              </h3>
              <div className="  flex items-center justify-center">
                <p className="text-xs  lg:text-sm text-amber-400 mb-2 px-2 py-1 rounded inline-block">
                  {member.designation}
                </p>
              </div>
              <p className="text-amber-200 mb-2 text-xs lg:text-sm flex-grow">
                {member.role}
              </p>
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="text-xs underline underline-offset-2 lg:text-sm text-amber-500 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 mt-auto"
                >
                  <Phone size={14} />
                  {member.phone}
                </a>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
);

export const Team = ({ fadeIn, route }: { fadeIn: any; route: boolean }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section id="team" className="py-16 relative ">

      {/* Decorative elements */}
      {route && (
        <a href={"/"}>
          <Button
            variant="outline"
            className=" border-none bg-yellow-700 hover:bg-yellow-500 hover:text-white text-white mx-4"
          >
            Back
          </Button>
        </a>
      )}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4 px-3 py-1.5">
            Digital Pirates
          </Badge>
          <h2 className="text-2xl lg:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Meet the The Crew
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Staff Section */}
        <div className="mb-16">
          <TeamMemberCards members={teamMembers.slice(0, 4)} startIndex={0} />
        </div>

        {/* More Members Button */}
        <div className=" flex justify-center">
          <Button
            onClick={() => setDialogOpen(true)}
            className="w-fit bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white"
          >
            More Members
          </Button>
        </div>

        {/* Full Team Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-full w-full h-[100dvh] p-0 bg-black border-amber-800/30 overflow-auto">
            <div className="relative py-16 bg-black min-h-full">
              {/* Decorative elements */}
              <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl"></div>

              {/* Close button */}
              <div className="fixed top-4 left-4 z-50">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="bg-black/50 backdrop-blur-md border-amber-800/30 text-white hover:text-white hover:bg-amber-900/20"
                >
                  <X className="mr-2 h-4 w-4" /> Back
                </Button>
              </div>

              <div className="container mx-auto px-4 relative z-10 flex flex-col items-center pt-10">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4 px-3 py-1.5">
                    The Complete Crew
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    All Digital Pirates
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-6 rounded-full"></div>
                </motion.div>

                {/* Staff Section */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
                    Core Team
                  </h3>
                  <TeamMemberCards
                    members={teamMembers.slice(0, 4)}
                    startIndex={0}
                  />
                </div>
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
                    Team Members
                  </h3>
                  <TeamMemberCards
                    members={teamMembers.slice(4, 9)}
                    startIndex={0}
                  />
                </div>
                {/* Students Section */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
                    Event Teams
                  </h3>
                  <TeamMemberCards
                    members={teamMembers.slice(9)}
                    startIndex={9}
                  />
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={() => setDialogOpen(false)}
                      className="w-fit bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white"
                    >
                      Go Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
