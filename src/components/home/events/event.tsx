import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { events } from "@/data/events";
import Image from "next/image";
import { ArrowRight, Clock, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Event = ({
  fadeIn,
  setSelectedEvent,
}: {
  fadeIn: any;
  setSelectedEvent: any;
}) => {
  return (
    <section id="events" className="py-16 bg-orange-400/10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14] via-amber-900/5 to-[#0a0d14]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4">
            Digital Adventures Await
          </Badge>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Treasure Map of Events
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative  rounded-lg shadow-lg overflow-hidden  backdrop-blur-md"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg?height=400&width=600"}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/50 to-transparent"></div>
              </div>

              <div className="absolute backdrop-blur-sm group-hover:opacity-0 bottom-0 left-0 right-0 bg-yellow-900/60 p-4 transition-all duration-500">
                <h3 className="text-lg font-bold text-white group-hover:translate-y-[-50%] group-hover:opacity-100 transition-all duration-500">
                  {event.name}
                </h3>
              </div>

              <div className="absolute bottom-[-10%] left-0 right-0 flex flex-col justify-end p-5 bg-yellow-950/60 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-[-15%]">
                <h3 className="text-base font-bold text-white group-hover:translate-y-[-50%] group-hover:opacity-100 transition-all duration-500">
                  {event.name}
                </h3>
                <p className="text-amber-400 text-sm mb-3">{event.slogan}</p>

                <Button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Event;
