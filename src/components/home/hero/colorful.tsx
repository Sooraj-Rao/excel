"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const One = ({ text }: { text: string }) => {
  const [colorCycle, setColorCycle] = useState(0);
  const characters = text.split('');
  
  // Auto-cycle colors
  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle(prev => (prev + 1) % 6);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Parrot color palettes
  const colorPalettes = [
    ['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4', '#8b5cf6'], // Rainbow
    ['#f97316', '#eab308', '#facc15', '#fbbf24', '#f59e0b', '#d97706'], // Gold/Yellow
    ['#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#ef4444'], // Red
    ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#06b6d4'], // Blue
    ['#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#84cc16'], // Green
    ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#8b5cf6'], // Purple
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
                textShadow: `0 0 8px ${currentPalette[index % currentPalette.length]}80`
              }}
              animate={{ 
                y: [0, -5, 0, 5, 0],
                scale: [1, 1.1, 1, 0.9, 1],
              }}
              transition={{ 
                duration: 1 + (index % 3), 
                repeat: Infinity,
                repeatType: "loop"
              }}
              whileHover={{ scale: 1.3, rotate: [0, 5, -5, 0] }}
            >
              {char === ' ' ? '\u00A0' : char}
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
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Parrot silhouette */}
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 opacity-20"
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M30,30 C20,20 10,20 10,30 C10,40 20,50 30,60 L50,80 C60,90 80,90 90,80 C100,70 90,50 80,40 L60,20 C50,10 30,20 30,30 Z" fill={currentPalette[0]} />
          <circle cx="25" cy="35" r="3" fill="#000" />
          <path d="M40,40 C50,45 60,55 70,60" fill="none" stroke="#000" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};
