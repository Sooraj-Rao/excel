"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const One = ({ text }: { text: string }) => {
  const [colorCycle, setColorCycle] = useState(0);
  const characters = text.split("");

  // Auto-cycle colors
  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle((prev) => (prev + 1) % 6);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Parrot color palettes
  const colorPalettes = [
    // Ocean/Sea Inspired (Vibrant Pirate Ship on the Ocean)
    ["#0d5f7f", "#1086a6", "#1a9bc1", "#21aad7", "#39c1e1", "#58c9f3"], // Deep and bright ocean blues

    // Treasure (Golden Treasure)
    ["#fbbd04", "#f8c45b", "#f9d167", "#f7e184", "#f7eb9f", "#fbbd04"], // Bright, radiant golds

    // Pirate Flag (Lighter Skull and Crossbones)
    ["#d8d8d8", "#b5b5b5", "#8c8c8c", "#6d6d6d", "#f1f1f1", "#d8d8d8"], // Lighter greys and off-whites

    // Sand and Desert (Golden Beach)
    ["#f4d062", "#f8c94f", "#e4b845", "#d8a740", "#b88b2b", "#f4d062"], // Warm and golden sandy tones

    // Wood and Rum (Pirate Ship and Barrel)
    ["#b9734f", "#d27f56", "#a8633d", "#9a542f", "#805631", "#b9734f"], // Bright browns and rum-inspired tones

    // Blood Red (Pirate Battles)
    ["#e63946", "#f1a7a1", "#f4c6c6", "#f9d0d0", "#ffd3d3", "#e63946"], // Bold and vibrant red tones
  ];

  const currentPalette = colorPalettes[colorCycle];

  return (
    <div className="relative inline-block">
      <h1 className="text-6xl md:text-8xl font-bold mb-2 relative">
        <span className="absolute -inset-1 blur-3xl opacity-30 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg"></span>

        {/* Text with parrot colors */}
        <div className="relative flex">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              className="relative inline-block"
              style={{
                color: currentPalette[index % currentPalette.length],
                textShadow: `0 0 8px ${
                  currentPalette[index % currentPalette.length]
                }80`,
              }}
              animate={{
                y: [0, -5, 0, 5, 0],
                scale: [1, 1.1, 1, 0.9, 1],
              }}
              transition={{
                duration: 4+ (index % 3),
                repeat: Infinity,
                repeatType: "loop",
              }}
              whileHover={{ scale: 1.3, rotate: [0, 5, -5, 0] }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </h1>

      {/* Feather particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-4 rounded-full"
            style={{
              background: currentPalette[i % currentPalette.length],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50],
              x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 60],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Parrot silhouette */}
      <motion.div
        className="absolute -top-10 -right-10 w-20 h-20 opacity-20"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M30,30 C20,20 10,20 10,30 C10,40 20,50 30,60 L50,80 C60,90 80,90 90,80 C100,70 90,50 80,40 L60,20 C50,10 30,20 30,30 Z"
            fill={currentPalette[0]}
          />
          <circle cx="25" cy="35" r="3" fill="#000" />
          <path
            d="M40,40 C50,45 60,55 70,60"
            fill="none"
            stroke="#000"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
};
