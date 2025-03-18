import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { linkSource } from "@/data/links";
import Image from "next/image";
import { span } from "framer-motion/client";
import Cookies from "js-cookie";
import fetchData from "@/components/analytics/fetch-data";

export const Navbar = ({
  isMusicPlaying,
  toggleMusic,
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMusicPlaying: any;
  toggleMusic: any;
  isMenuOpen: any;
  setIsMenuOpen: any;
}) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed w-full z-50 backdrop-blur-md border-b border-amber-900/30"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <div className="absolute inset-1 bg-[#0a0d14] rounded-full flex items-center justify-center">
                <Image
                  src={"/logo/main.jpg"}
                  alt=""
                  className=" rounded-full"
                  height={200}
                  width={200}
                />
              </div>
            </div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Excel 4.0
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Events", "Schedule", "Team", "Contact"].map(
              (item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group"
                >
                  <span className="text-amber-100 group-hover:text-amber-400 transition-colors">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            )}

            <Button
              onClick={toggleMusic}
              className={`text-amber-100   bg-gradient-to-r from-amber-500 to-amber-700 transition-colors flex items-center gap-1
                ${
                  isMusicPlaying
                    ? "bg-gradient-to-r from-amber-500 to-amber-700"
                    : "bg-amber-900/10"
                }
                `}
            >
              {isMusicPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-volume-2"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-volume-x"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" x2="17" y1="9" y2="15" />
                  <line x1="17" x2="23" y1="9" y2="15" />
                </svg>
              )}
              <span className="text-xs">Music</span>
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                onClick={() => {
                  fetchData(
                    "register-button",
                    Cookies.get("ref") || "search",
                    `nav-Excel`,
                    ""
                  );
                }}
                href={linkSource.googleForm}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="relative overflow-hidden group">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-300 group-hover:scale-105"></span>
                  <span className="relative">Register</span>
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-lg mx-2 "
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-3xl bg-yellow-950/50 text-center border-b border-amber-900/30"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
              {["Home", "About", "Events", "Schedule", "Team", "Contact"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="block py-2 text-amber-100 hover:text-amber-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}

              <a
                onClick={() => {
                  fetchData(
                    "register-button",
                    Cookies.get("ref") || "search",
                    `mobile-nav-Excel`,
                    ""
                  );
                }}
                href={linkSource.googleForm}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white">
                  Register
                </Button>
              </a>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-3 mt-4"
              >
                <span className="text-amber-100">Music</span>
                <Switch
                  checked={isMusicPlaying}
                  onCheckedChange={toggleMusic}
                  className="relative flex items-center"
                >
                  <span className="absolute left-2 text-sm">
                    {isMusicPlaying ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-volume-2"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-volume-x"
                      >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" x2="17" y1="9" y2="15" />
                        <line x1="17" x2="23" y1="9" y2="15" />
                      </svg>
                    )}
                  </span>
                </Switch>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
