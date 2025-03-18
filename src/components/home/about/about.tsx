import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Anchor, Compass } from "lucide-react";
import Image from "next/image";

export const About = ({
  fadeIn,
  cardVariants,
}: {
  fadeIn: any;
  cardVariants: any;
}) => {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-amber-900/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-4">
            The Digital Pirate Adventure
          </Badge>
          <h2 className=" text-2xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            About Us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-700 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-700/50 to-amber-800/50 rounded-lg blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-amber-900/10 backdrop-blur-sm p-8 rounded-lg border border-amber-900/30">
                <div className="absolute top-0 sm:-left-5 sm:-top-5 scale-90 sm:scale-100  left-0 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                  <Image
                    height={100}
                    width={100}
                    alt="SIT logo"
                    className=" h-full w-full rounded-full object-cover "
                    src={"/logo/sit.jpg"}
                  ></Image>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 pl-10 text-amber-400">
                  The Institution
                </h3>
                <div className="space-y-1 text-xs sm:text-base text-justify">
                  <p className="text-amber-100 ">
                    Srinivas Institute of Technology (SIT) is one of the premier
                    Engineering colleges of the Mangaluru region aiming towards
                    high standards of education with a holistic approach. SIT is
                    recognized by AICTE, affiliated to VTU and accredited by
                    NAAC. The Institute started in the year 2006 which is a unit
                    of A Shama Rao Foundation, Mangaluru.
                  </p>
                  <p className="text-amber-100">
                    The college is located at the Srinivas Campus, spread over
                    15 acres of land at Valachil, Arkula Village, about 10kms
                    from Mangaluru city, towards BC Road, adjacent to NH66. The
                    institute hosts 3000 plus students studying under 13 UG
                    programs, 5 PG programs and 6 Research Centres.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-700/50 to-amber-800/50 rounded-lg blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-amber-900/10 backdrop-blur-sm p-8 rounded-lg border border-amber-900/30">
                <div className="absolute top-0 sm:-left-5 sm:-top-5 scale-90 sm:scale-100  left-0 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                  <Image
                    height={100}
                    width={100}
                    alt="Excel 4.0 logo"
                    className=" h-full w-full rounded-full object-cover  "
                    src={"/logo/main.jpg"}
                  ></Image>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 pl-10 text-amber-400">
                  Excel 4.0
                </h3>
                <div className="space-y-1 text-xs lg:text-base text-justify ">
                  <p className="text-amber-100 ">
                    The MCA department of Srinivas Institute of Technology
                    proudly presents EXCEL 4.0, a dynamic IT fest where
                    technology meets creativity in an extraordinary fusion of
                    innovation and artistry. EXCEL 4.0 has served as a platform
                    for tech enthusiasts to showcase their skills, compete,
                    learn, and network with like-minded individuals.
                  </p>
                  <p className="text-amber-100">
                    This year, EXCEL 4.0 promises to be bigger and better,
                    offering a range of exciting events including coding
                    challenges, tech talks, gaming competitions and cultural
                    performances.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
