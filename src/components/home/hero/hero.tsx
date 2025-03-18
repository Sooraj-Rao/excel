"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { linkSource } from "@/data/links";
import { One } from "./1";
import Cookies from "js-cookie";
import fetchData from "@/components/analytics/fetch-data";

// 3D Flip Counter Component
const FlipCounter = ({ value, label }: { value: string; label: string }) => {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    setPrevValue(value);
  }, [value]);

  return (
    <div className="relative group perspective">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-[#0a0d14]/80 backdrop-blur-md border border-amber-900/50 rounded-lg p-4 w-16 md:w-32 flex flex-col items-center">
        <div className="relative sm:h-12 h-8 w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={value}
              initial={{ rotateX: -90, position: "absolute", width: "100%" }}
              animate={{ rotateX: 0, position: "absolute", width: "100%" }}
              exit={{ rotateX: 90, position: "absolute", width: "100%" }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "bottom center" }}
              className="flex justify-center"
            >
              <span className="text-xl md:text-4xl font-bold text-amber-400">
                {value}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="text-xs md:text-sm text-amber-200/80 mt-2">
          {label}
        </span>
      </div>
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

// Interactive Terminal Component
const InteractiveTerminal = () => {
  const [commands, setCommands] = useState<string[]>([
    "$ sail excel-fest",
    "> excel-fest@4.0.0 start",
    "> next start",
    "info - Ship ready to sail on 28th",
  ]);

  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const possibleCommands = [
    "event - Treasure map coordinates received",
    "warn - Enemy ships approaching from the east",
    "info - Scanning for hidden treasures",
    "event - New crew member joined the expedition",
    "warn - Stormy seas ahead, secure all cargo",
    "info - Calibrating navigation systems",
    "event - Found ancient artifact in the depths",
    "warn - Low supplies, need to dock soon",
    "info - Decoding secret message from allies",
  ];

  useEffect(() => {
    const typeNextCommand = () => {
      if (!isTyping) return;

      const nextCommand =
        possibleCommands[Math.floor(Math.random() * possibleCommands.length)];
      let index = 0;

      const typingInterval = setInterval(() => {
        if (index <= nextCommand.length) {
          setCurrentCommand(nextCommand.substring(0, index));
          index++;
        } else {
          clearInterval(typingInterval);

          // Add the completed command to the list
          setTimeout(() => {
            setCommands((prev) => [...prev, nextCommand]);
            setCurrentCommand("");

            // Keep only the last 6 commands
            if (commands.length > 5) {
              setCommands((prev) => prev.slice(prev.length - 5));
            }

            // Pause before typing the next command
            setIsTyping(false);
            setTimeout(() => setIsTyping(true), 1000);
          }, 500);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    };

    if (isTyping) {
      const timeout = setTimeout(typeNextCommand, 1000);
      return () => clearTimeout(timeout);
    }
  }, [commands, isTyping, possibleCommands]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands, currentCommand]);

  return (
    <div className="bg-amber-900/10 backdrop-blur-sm rounded-lg border border-amber-900/30 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-amber-900/20 border-b border-amber-900/30">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-amber-400/80">excel-fest@4.0.0</div>
        <div className="text-xs text-amber-400/80">ship's log</div>
      </div>
      <div
        ref={terminalRef}
        className="p-4 font-mono text-xs text-amber-100 overflow-hidden h-40 overflow-y-auto"
      >
        {commands.map((command, index) => (
          <div key={index} className="flex">
            {command.startsWith("$") ? (
              <>
                <span className="text-amber-500 mr-2">$</span>
                <span>{command.substring(2)}</span>
              </>
            ) : command.startsWith(">") ? (
              <span className="text-amber-400">{command}</span>
            ) : command.startsWith("info") ? (
              <>
                <span className="text-amber-400">info</span>
                <span className="ml-2">- {command.substring(7)}</span>
              </>
            ) : command.startsWith("event") ? (
              <>
                <span className="text-amber-400">event</span>
                <span className="ml-2">- {command.substring(8)}</span>
              </>
            ) : command.startsWith("warn") ? (
              <>
                <span className="text-yellow-400">warn</span>
                <span className="ml-2">- {command.substring(7)}</span>
              </>
            ) : (
              <span>{command}</span>
            )}
          </div>
        ))}

        {currentCommand && (
          <div className="flex">
            {currentCommand.startsWith("info") ? (
              <>
                <span className="text-amber-400">info</span>
                <span className="ml-2 typing-cursor">
                  - {currentCommand.substring(7)}
                </span>
              </>
            ) : currentCommand.startsWith("event") ? (
              <>
                <span className="text-amber-400">event</span>
                <span className="ml-2 typing-cursor">
                  - {currentCommand.substring(8)}
                </span>
              </>
            ) : currentCommand.startsWith("warn") ? (
              <>
                <span className="text-yellow-400">warn</span>
                <span className="ml-2 typing-cursor">
                  - {currentCommand.substring(7)}
                </span>
              </>
            ) : (
              <span className="typing-cursor">{currentCommand}</span>
            )}
          </div>
        )}
      </div>
      <style jsx global>{`
        .typing-cursor::after {
          content: "|";
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from,
          to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const Hero = () => {
  // Calculate countdown
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("March 28, 2025").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

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

          <div className="relative flex flex-col items-center mb-3">
            <p className="text-xl md:text-2xl mb-2 text-amber-500">
              National level IT Fest for Under Graduates
            </p>
            <div className="flex items-center gap-2 text-amber-400/80">
              <Clock className="w-5 h-5" />
              <p className="text-lg">Prepare to set sail in:</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <motion.div
            variants={fadeIn}
            className="mb-10 flex flex-wrap justify-center gap-4"
          >
            <FlipCounter value={countdown.days} label="Days" />
            <FlipCounter value={countdown.hours} label="Hours" />
            <FlipCounter value={countdown.minutes} label="Minutes" />
            <FlipCounter value={countdown.seconds} label="Seconds" />
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
