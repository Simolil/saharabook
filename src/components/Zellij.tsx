import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const StarZellij = ({ className, color1 = "#BA7517", color2 = "#26215C" }: { className?: string, color1?: string, color2?: string }) => (
  <svg viewBox="0 0 100 100" className={cn("w-full h-full", className)}>
    <path d="M50 0l10 30h30l-25 20 10 30-25-20-25 20 10-30-25-20h30z" fill={color1} />
    <path d="M50 20l5 15h15l-12 10 5 15-13-10-13 10 5-15-12-10h15z" fill={color2} />
  </svg>
);

export const ZellijCorner = ({ className, light = false }: { className?: string, light?: boolean }) => (
  <div className={cn("pointer-events-none select-none", className)}>
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <StarZellij className="w-24 h-24 opacity-20 rotate-12" color1={light ? "#FFF" : "#BA7517"} color2={light ? "#BA7517" : "#26215C"} />
      <StarZellij className="w-16 h-16 absolute -top-4 -left-8 opacity-15 -rotate-12" color1={light ? "#FAF7F2" : "#26215C"} />
      <StarZellij className="w-12 h-12 absolute -bottom-6 -right-4 opacity-10 rotate-45" color1="#BA7517" />
    </motion.div>
  </div>
);
