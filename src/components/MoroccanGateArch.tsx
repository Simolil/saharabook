import React from 'react';
import { cn } from '../lib/utils';

interface MoroccanGateArchProps {
  fillColor?: string;
  strokeColor?: string;
  className?: string;
  heightClass?: string;
}

/**
 * Authentic Moroccan Gate (Bab) Arch overlay for cards.
 * Frames the top of the photo with a classic pointed Moorish horseshoe arch,
 * delicate gold trim, and a central keystone star motif.
 */
export const MoroccanGateArch: React.FC<MoroccanGateArchProps> = ({
  fillColor = '#0B132B',
  strokeColor = '#BA7517',
  className = '',
  heightClass = 'h-6 sm:h-7'
}) => {
  return (
    <div className={cn("absolute top-0 inset-x-0 pointer-events-none z-10 overflow-hidden", heightClass, className)}>
      <svg 
        viewBox="0 0 100 24" 
        preserveAspectRatio="none" 
        className="w-full h-full drop-shadow-xs"
      >
        {/* Left & Right Spandrels forming the pointed Moorish arch opening */}
        <path 
          d="M 0,0 L 0,22 C 8,22 18,17 28,11 C 38,5 46,2 50,0.5 C 54,2 62,5 72,11 C 82,17 92,22 100,22 L 100,0 Z" 
          fill={fillColor}
        />
        {/* Elegant Moroccan gold arch contour */}
        <path 
          d="M 0,22 C 8,22 18,17 28,11 C 38,5 46,2 50,0.5 C 54,2 62,5 72,11 C 82,17 92,22 100,22" 
          fill="none" 
          stroke={strokeColor} 
          strokeWidth="1.2" 
          opacity="0.85" 
        />
        {/* Subtle decorative keystone accent at peak */}
        <circle cx="50" cy="2.2" r="0.9" fill={strokeColor} opacity="0.9" />
      </svg>
    </div>
  );
};

export default MoroccanGateArch;
