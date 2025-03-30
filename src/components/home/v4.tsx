"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Stars, Volume2 } from "lucide-react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navbar } from "./nav/navbar";
import { Hero } from "./hero/hero";
import { About } from "./about/about";
import { Event } from "./events/event";
import { Schedule } from "./schedule/schedule";
import { Team } from "./team/team";
import Contact from "./contact/contact";
import Footer from "./footer/footer";
import GeneralRules from "./rules/rule";
import type { I_Event } from "@/types/type";
import { linkSource } from "@/data/links";
import { Loader } from "./loader/loader";
import Analytics from "../analytics/main";
import Banner from "./nav/banner";

export default function ExcelFestPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | I_Event>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const [isStart, setIsStart] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    interface CursorPosition {
      x: number;
      y: number;
    }

    interface MouseMoveEvent extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseMoveEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    const storedValue = Boolean(Cookies.get("start"));
    setIsStart(storedValue);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Audio control function
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Auto-play music when component loads
  useEffect(() => {
    if (isLoaded && audioRef.current) {
      setIsMusicPlaying(true);
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });
    }
  }, [isLoaded]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  if (!isLoaded) return <Loader />;

  return (
    <div className={`${!isStart && "overflow-hidden h-screen"}`}>
      <Analytics />
      {!isStart && (
        <div className="fixed inset-0 bg-[#0a0d14] flex flex-col items-center justify-center z-50 start-container transition-all duration-1000">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 overflow-hidden"
          >
            {/* Animated background particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-amber-500/30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>

          <div className="text-center z-10 max-w-2xl px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative w-40 h-40 mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-700"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <div className="absolute overflow-hidden inset-3 bg-[#0a0d14] rounded-full flex items-center justify-center">
                  <Image
                    src={"/logo/main.jpg"}
                    alt=""
                    className="-mt-3 -ml-[6px] scale-[1.2]"
                    height={200}
                    width={200}
                  />
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-pirate mb-4"
            >
              Excel 4.0
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-amber-300 mb-6 max-w-md mx-auto"
            >
              {"{ Reaching Heights }"}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-amber-300 mb-6 max-w-md mx-auto"
            >
              {" "}
              National level IT Fest for Under Graduates
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex flex-col text-yellow-400  items-center justify-center gap-4"
            >
              <Button
                onClick={async () => {
                  setIsMusicPlaying(true);
                  if (audioRef.current) {
                    audioRef.current.play().catch((err) => {
                      console.error("Failed to play audio:", err);
                      setIsMusicPlaying(false);
                    });
                  }

                  await Cookies.set("start", "true");

                  // Animate out before redirecting
                  const startContainer =
                    document.querySelector(".start-container");
                  if (startContainer) {
                    startContainer.classList.add("animate-out");

                    // Wait for animation to complete before redirecting
                    setTimeout(() => {
                      window.location.href = "/";
                    }, 1000);
                  } else {
                    window.location.href = "/";
                  }
                }}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white px-8 py-6 text-lg relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
                <span className="relative flex items-center gap-2">
                  <span>Start Experience</span>
                  <Stars className="w-5 h-5" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      )}
      <div
        className={`${
          !isStart ? "opacity-0" : isLoaded && "opacity-100"
        } min-h-screen bg-[#0a0d14] text-white overflow-hidden font-pirate transition-opacity duration-1000`}
      >
        {/* Background music */}
        <audio ref={audioRef} loop src="/home/music.mp3" className="hidden" />
        {/* Cursor follower - reduced opacity */}
        <div
          className="fixed w-40 h-40 rounded-full bg-orange-600/20 blur-3xl pointer-events-none z-20"
          style={{
            left: `${cursorPosition.x - 80}px`,
            top: `${cursorPosition.y - 80}px`,
          }}
        />

        {/* Background texture */}
        <div className="fixed inset-0 z-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23b45309' fillOpacity='0.2' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <Banner />
        {/* Navbar */}
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleMusic={toggleMusic}
          isMusicPlaying={isMusicPlaying}
        />

        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About fadeIn={fadeIn} cardVariants={cardVariants} />

        {/* Events Section */}
        <Event fadeIn={fadeIn} setSelectedEvent={setSelectedEvent} />

        {/* Rules */}
        <GeneralRules />

        {/* Schedule Section */}
        <Schedule />

        {/* Event Modal */}
        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent className="bg-[#0a0d14]/95 backdrop-blur-md max-h-[calc(100vh-100px)] overflow-y-auto border-amber-900/30 text-white max-w-4xl">
            {selectedEvent && (
              <div>
                <DialogHeader className="mt-4">
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      {selectedEvent.name}
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-amber-400 font-mono">
                    {selectedEvent.slogan}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden group">
                      <Image
                        src={
                          selectedEvent.image ||
                          "/placeholder.svg?height=400&width=600" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={selectedEvent.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/50 to-transparent"></div>
                    </div>
                    <div className="mt-6 p-4 bg-amber-900/10 rounded-lg border border-amber-900/30">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg
                          className="mr-2 w-5 h-5 text-amber-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                        Coordinators
                      </h4>
                      {selectedEvent.coordinator.map((coord, index) => (
                        <div
                          key={index}
                          className="mb-2 flex items-center  justify-between"
                        >
                          <p className="text-white font-medium">{coord.name}</p>
                          <p className="text-amber-200/80 flex items-center mt-1">
                            <svg
                              className="mr-2 w-4 h-4 text-amber-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              ></path>
                            </svg>
                            <a
                              href={`tel:+91 ${coord.contact}`}
                              className="underline underline-offset-2"
                            >
                              {coord.contact}
                            </a>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="p-4 bg-amber-900/10 rounded-lg border border-amber-900/30 mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <svg
                          className="mr-2 w-5 h-5 text-amber-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          ></path>
                        </svg>
                        Guidelines
                      </h4>
                      <div className="space-y-3 ">
                        {selectedEvent.guidelines.map((guideline, index) => (
                          <div
                            key={index}
                            className="flex  items-start text-justify"
                          >
                            <span className="text-amber-400 mr-2 mt-1">•</span>
                            <p className="text-amber-100  ">{guideline}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex lg:justify-end justify-between">
                  <a
                    href="/#events"
                    className="lg:hidden"
                    onClick={() => setSelectedEvent(null)}
                  >
                    <Button
                      variant="outline"
                      className=" bg-transparent border-yellow-500"
                    >
                      back
                    </Button>
                  </a>
                  <a
                    href={linkSource.googleForm}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-700">
                      <span className="relative flex items-center">
                        Register for Event
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          ></path>
                        </svg>
                      </span>
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Team Section */}
        <Team route={false} fadeIn={fadeIn} />

        {/* Contact Section */}
        <Contact fadeIn={fadeIn} />

        {/* Footer */}

        <Footer />

        {/* Custom cursor */}
        <style jsx global>{`
          @font-face {
            font-family: "PirateFontFamily";
            src: url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap");
            font-weight: normal;
            font-style: normal;
          }

          body {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d97706' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='2'/></svg>")
                12 12,
              auto;
          }

          a,
          button {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d97706' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='16'/><line x1='8' y1='12' x2='16' y2='12'/></svg>")
                12 12,
              pointer;
          }

          .font-pirate {
            font-family: "PirateFontFamily", "Cinzel", serif;
          }

          .typing-text {
            overflow: hidden;
            border-right: 2px solid #d97706;
            white-space: nowrap;
            margin: 0 auto;
            animation: typing 3.5s steps(40, end),
              blink-caret 0.75s step-end infinite;
          }

          .typing-text-slow {
            overflow: hidden;
            border-right: 2px solid #d97706;
            white-space: nowrap;
            margin: 0 auto;
            animation: typing 5s steps(40, end),
              blink-caret 0.75s step-end infinite;
          }

          .typing-text-command {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            opacity: 0;
            animation: typing 3s steps(40, end) 2s forwards,
              appear 0.1s linear 2s forwards;
          }

          .typing-text-command-2 {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            opacity: 0;
            animation: typing 3s steps(40, end) 5s forwards,
              appear 0.1s linear 5s forwards;
          }

          .typing-text-command-3 {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            opacity: 0;
            animation: typing 3s steps(40, end) 8s forwards,
              appear 0.1s linear 8s forwards;
          }

          .typing-text-command-4 {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            opacity: 0;
            animation: typing 3s steps(40, end) 11s forwards,
              appear 0.1s linear 11s forwards;
          }

          .typing-text-command-5 {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            opacity: 0;
            animation: typing 3s steps(40, end) 14s forwards,
              appear 0.1s linear 14s forwards;
          }

          @keyframes appear {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes blink-caret {
            from,
            to {
              border-color: transparent;
            }
            50% {
              border-color: #d97706;
            }
          }

          .bg-gradient-radial {
            background-image: radial-gradient(var(--tw-gradient-stops));
          }

          /* Animation for floating elements */
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          /* Mobile optimizations */
          @media (max-width: 640px) {
            h1,
            h2,
            h3 {
              font-size: 90% !important;
            }

            p,
            span,
            div {
              font-size: 0.875rem !important; /* text-sm */
            }

            .text-xs {
              font-size: 0.75rem !important;
            }

            /* Adjust card widths for better image display */
            .grid-cols-2,
            .grid-cols-3 {
              grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
            }

            /* Ensure images don't stretch */
            .object-cover {
              object-fit: contain !important;
            }
          }

          .start-container.animate-out {
            transform: scale(1.5);
            opacity: 0;
            filter: brightness(2);
          }

          .start-container {
            transition: transform 1s ease-out, opacity 1s ease-out,
              filter 1s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
