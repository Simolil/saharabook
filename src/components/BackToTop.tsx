import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/src/lib/LanguageContext';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show button after 320px scroll
      setIsVisible(scrollY > 320);

      // Calculate 0-100% progress
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG circular progress calculation
  // Radius = 20, Circumference = 2 * PI * 20 ≈ 125.66
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const tooltipText = t('common.back_to_top') || 'Back to top';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Subtle Desktop Tooltip on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B132B]/95 text-[#FAF7F2] text-xs font-medium border border-[#BA7517]/30 shadow-lg backdrop-blur-md pointer-events-none select-none"
              >
                <span>{tooltipText}</span>
                <span className="text-[#EF9F27] font-mono text-[11px] font-bold">
                  {Math.round(scrollProgress)}%
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to Top Floating Button */}
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label={tooltipText}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="group relative w-12 h-12 rounded-full bg-[#0B132B] text-[#FAF7F2] border border-[#BA7517]/35 shadow-[0_4px_22px_rgba(11,19,43,0.45)] hover:shadow-[0_6px_28px_rgba(186,117,23,0.35)] hover:border-[#EF9F27]/80 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF9F27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B]"
          >
            {/* Circular Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 44 44"
            >
              {/* Background Track */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#BA7517"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              {/* Active Gold Progress Stroke */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="#EF9F27"
                strokeWidth="2.2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Moroccan Arch & Star Micro-Pattern Accent */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-t from-black/40 via-transparent to-white/5 pointer-events-none" />

            {/* Central Arrow with Hover Floating Micro-Animation */}
            <motion.div
              animate={isHovered ? { y: -2.5 } : { y: 0 }}
              transition={{ repeat: isHovered ? Infinity : 0, repeatType: 'reverse', duration: 0.6 }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Moroccan pointed arch apex indicator */}
              <span className="w-1.5 h-1.5 rotate-45 border-t border-l border-[#EF9F27] mb-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
              <ArrowUp 
                size={17} 
                className="text-[#EF9F27] group-hover:text-amber-300 transition-colors stroke-[2.4]" 
              />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
