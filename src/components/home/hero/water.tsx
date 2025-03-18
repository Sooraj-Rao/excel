"use client";

import { useEffect, useRef } from "react";

export const One = ({ text }: { text: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    let time = 0;
    const waveHeight = 10;
    const waveLength = 0.01;
    const waveSpeed = 0.05;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, width, height);
      
      // Draw waves
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        
        if (i === 0) {
          gradient.addColorStop(0, 'rgba(0, 48, 73, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 95, 115, 0.8)');
        } else if (i === 1) {
          gradient.addColorStop(0, 'rgba(0, 95, 115, 0.6)');
          gradient.addColorStop(1, 'rgba(0, 140, 158, 0.6)');
        } else {
          gradient.addColorStop(0, 'rgba(0, 140, 158, 0.4)');
          gradient.addColorStop(1, 'rgba(144, 224, 239, 0.4)');
        }
        
        ctx.beginPath();
        
        for (let x = 0; x < width; x++) {
          const y = Math.sin(x * waveLength + time + i) * waveHeight + 
                   (height / 2) + (i * 15);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw text
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Create gold gradient for text
      const textGradient = ctx.createLinearGradient(0, 0, width, 0);
      textGradient.addColorStop(0, '#ffd700');
      textGradient.addColorStop(0.5, '#f5cb42');
      textGradient.addColorStop(1, '#daa520');
      
      ctx.fillStyle = textGradient;
      ctx.fillText(text, width / 2, height / 2);
      
      // Add shimmer effect
      const shimmerPos = (time * 100) % (width * 1.5) - width * 0.25;
      
      const shimmerGradient = ctx.createLinearGradient(
        shimmerPos - 50, 0, 
        shimmerPos + 50, 0
      );
      
      shimmerGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shimmerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      shimmerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = shimmerGradient;
      ctx.fillText(text, width / 2, height / 2);
      
      time += waveSpeed;
      requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      // Cleanup
    };
  }, [text]);
  
  return (
    <div className="relative inline-block w-full max-w-3xl mx-auto h-32 md:h-40">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-lg"
      />
    </div>
  );
};
