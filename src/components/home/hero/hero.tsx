"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { linkSource } from "@/data/links";
import Cookies from "js-cookie";
import fetchData from "@/components/analytics/fetch-data";
import confetti from "canvas-confetti";

export const Hero = () => {
  // Calculate countdown

  const [isCelebrating, setIsCelebrating] = useState(
    Cookies.get("start") === "true"
  );

  useEffect(() => {
    isCelebrating && launchConfetti();
  }, [isCelebrating]);

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
    });
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="/home/hero2.jpg"
          alt="Pirates Ship"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14]/70 via-[#0a0d14]/50 to-[#0a0d14]"></div>
      </motion.div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeIn} className="mt-20 inline-block">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 mb-6">
              March 28, 2025
            </Badge>
          </motion.div>

          <motion.div variants={fadeIn}>
            <PirateHeroText text="Excel 4.0" />
          </motion.div>

          <motion.div variants={fadeIn} className="mb-8 relative">
            <span className="absolute -inset-1 blur-3xl opacity-20 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg"></span>
            <p className="relative text-xl md:text-xl mb-2 text-amber-300">
              {"{ Reaching Heights }"}
            </p>
          </motion.div>

          <div className="relative flex flex-col items-center ">
            <p className="text-xl md:text-2xl mb-2 text-amber-500">
              National level IT Fest for Under Graduates
            </p>
          </div>

          {/* Countdown Timer or Celebration Message */}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              duration: 0.8,
            }}
            className="mb-10 mt-4 flex flex-col items-center"
          >
            <div className="relative py-3s  px-10 overflow-hidden">
              <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-2 relative z-10  celebration-text">
                The Fest is Live!
              </h2>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group "
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500 group-hover:duration-200"></div>
              <Link
                onClick={() => {
                  fetchData(
                    "join-crew",
                    Cookies.get("ref") || "search",
                    `hero-Excel`,
                    ""
                  );
                }}
                href={linkSource.googleForm}
                target="_blank"
                rel="noreferrer"
              >
                <button className="relative  px-8 py-3 rounded-md text-lg  overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-amber-700 transition-all duration-300 group-hover:scale-105"></span>

                  <span className="relative flex items-center  text-white">
                    Join the Crew
                    <ArrowRight size={16} className=" ml-2" />
                  </span>
                </button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group sm:block hidden"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500 group-hover:duration-200"></div>
              <Link href={"#events"}>
                <button className="relative border-amber-900/50 bg-[#0a0d14] px-8 py-3 rounded-md text-lg">
                  <span className="relative flex items-center text-amber-400">
                    Explore Events
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-500 group-hover:duration-200"></div>
              <Link
                onClick={() => {
                  fetchData(
                    "download-brochure",
                    Cookies.get("ref") || "search",
                    `hero-Excel`,
                    ""
                  );
                }}
                href={"/brochure/Excel_4.0.pdf"}
                target="_blank"
                download={true}
                rel="noreferrer"
              >
                <button className="relative border-amber-900/50 bg-[#0a0d14] px-8 py-3 rounded-md text-lg">
                  <span className="relative flex items-center text-amber-400">
                    Download Brochure
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Terminal decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 max-w-lg mx-auto"
          >
            {/* <InteractiveTerminal /> */}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <Link href="#about">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-500"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .shine-effect {
          overflow: hidden;
          position: relative;
        }
        .shine-effect::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          animation: shine 6s infinite;
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(30deg);
          }
          20%,
          100% {
            transform: translateX(100%) rotate(30deg);
          }
        }

        .celebration-text {
          animation: celebrationPulse 2s infinite;
          text-shadow: 0 0 2px #ff4500, 0 0 20px #ff6a3d;
        }

        .celebration-badge {
          animation: bounce 1s infinite alternate;
        }

        @keyframes celebrationPulse {
          0% {
            text-shadow: 0 0 2px #ff4500, 0 0 2px #ff6a3d;
          }
          50% {
            text-shadow: 0 0 5px #ff4500, 0 0 5px #ff6a3d, 0 0 10px #ff4500;
          }
          100% {
            text-shadow: 0 0 2px #ff4500, 0 0 2px #ff6a3d;
          }
        }

        @keyframes bounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <h1 className="text-6xl md:text-8xl font-bold mb-2 relative">
        <span className="absolute -inset-1 blur-3xl opacity-30 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg"></span>
        <span className="relative bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent glitch-text">
          {text}
        </span>
      </h1>
      <style jsx global>{`
        .glitch-text {
          position: relative;
          animation: glitch-skew 2s infinite cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .glitch-text::before,
        .glitch-text::after {
          content: "${text}";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, #f59e0b, #d97706);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .glitch-text::before {
          animation: glitch-anim-1 3s infinite cubic-bezier(0.25, 0.8, 0.25, 1);
          left: 2px;
          text-shadow: -2px 0 #d4af37, 2px 0 #ff4500, -1px 2px #ff6a3d; /* gold, fiery orange, and burnt orange */
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .glitch-text::after {
          animation: glitch-anim-2 3s infinite cubic-bezier(0.25, 0.8, 0.25, 1);
          left: -2px;
          text-shadow: -2px 0 #d4af37, 2px 0 #ff4500, -1px 2px #ff6a3d; /* gold, fiery orange, and burnt orange */
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        @keyframes glitch-anim-1 {
          0% {
            transform: translate(0);
          }
          25% {
            transform: translate(-3px, 3px);
          }
          50% {
            transform: translate(3px, -3px);
          }
          75% {
            transform: translate(-2px, 2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-anim-2 {
          0% {
            transform: translate(0);
          }
          25% {
            transform: translate(2px, -2px);
          }
          50% {
            transform: translate(-3px, 3px);
          }
          75% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          25% {
            transform: skew(1deg);
          }
          50% {
            transform: skew(0deg);
          }
          75% {
            transform: skew(-1deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export const PirateHeroText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <h1 className="text-6xl md:text-8xl font-bold mb-2 relative">
        <span className="absolute -inset-1 blur-3xl opacity-30 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg"></span>

        {/* Fire Smoke Effect */}
        <span className="relative pirate-fire-text">{text}</span>
      </h1>

      <style jsx global>{`
        /* General Styles */
        .pirate-fire-text {
          position: relative;
          animation: fire-smoke 5s ease-in-out infinite;
          text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff6a3d;
        }

        /* Fire and Smoke Animation */
        @keyframes fire-smoke {
          0% {
            text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff6a3d;
          }
          30% {
            text-shadow: 0 0 10px #ff4500, 0 0 20px #ff6a3d, 0 0 30px #ff4500;
          }
          60% {
            text-shadow: 0 0 15px #ff4500, 0 0 30px #ff6a3d, 0 0 40px #ff4500;
          }
          100% {
            text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500, 0 0 15px #ff6a3d;
          }
        }
      `}</style>
    </div>
  );
};
