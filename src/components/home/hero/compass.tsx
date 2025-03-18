"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const CompassSpin = ({ text }: { text: string }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Split text into characters for individual animation
  const characters = text.split("");

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => setIsAnimating(false)}
    >
      <div className="text-6xl md:text-8xl font-bold mb-2 relative flex justify-center">
        <span className="absolute -inset-1 blur-3xl opacity-30 bg-gradient-to-r from-amber-700 to-red-900 rounded-lg"></span>

        {/* Compass background */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-amber-700/30"
          animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {/* Compass cardinal points */}
          {["N", "E", "S", "W"].map((direction, index) => (
            <div
              key={direction}
              className="absolute text-amber-600/70 text-sm font-bold"
              style={{
                top:
                  index === 0
                    ? "-10px"
                    : index === 2
                    ? "calc(100% - 10px)"
                    : "50%",
                left:
                  index === 3
                    ? "-10px"
                    : index === 1
                    ? "calc(100% - 10px)"
                    : "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {direction}
            </div>
          ))}

          {/* Compass lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-0.5 bg-amber-700/20"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* Text characters with individual animations */}
        <div className="relative flex">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              className="relative inline-block bg-gradient-to-b from-amber-500 via-yellow-600 to-amber-700 bg-clip-text text-transparent"
              initial={{ y: 0 }}
              animate={
                isAnimating
                  ? {
                      y: [0, -10, 0, 10, 0],
                      rotateY: [0, 180, 0],
                      scale: [1, 1.2, 1],
                    }
                  : { y: 0, rotateY: 0, scale: 1 }
              }
              transition={{
                duration: 2,
                delay: index * 0.1,
                repeat: isAnimating ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 0.5,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Decorative compass needle */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full origin-top"
        style={{ transformOrigin: "center 0%" }}
        animate={
          isAnimating ? { rotate: [0, 30, -30, 45, -45, 0] } : { rotate: 0 }
        }
        transition={{
          duration: 5,
          repeat: isAnimating ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};
