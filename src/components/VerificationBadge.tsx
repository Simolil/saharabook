import React from 'react';
import { ShieldCheck, ShieldAlert, Award } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { VerificationTier } from '@/src/types';

export default function VerificationBadge({ tier, compact = false }: { tier: VerificationTier; compact?: boolean }) {
  const configs = {
    listed: {
      label: 'Listed',
      shortLabel: 'Listed',
      icon: ShieldAlert,
      color: 'bg-gray-100/90 text-gray-600 border-gray-200',
      tooltip: 'Basic information and photos have been reviewed by our team.'
    },
    verified: {
      label: 'Dunecamps Verified',
      shortLabel: 'Verified',
      icon: ShieldCheck,
      color: 'bg-green-50/90 text-green-700 border-green-200',
      tooltip: 'We have physically visited this camp and verified its facilities and management.'
    },
    elite: {
      label: 'Elite Choice',
      shortLabel: 'Elite',
      icon: Award,
      color: 'bg-[#BA7517]/15 text-[#BA7517] border-[#BA7517]/30',
      tooltip: 'Top-tier performance, 50+ 5-star reviews, and verified private bathrooms.'
    }
  };

  const config = configs[tier] || configs.listed;
  const Icon = config.icon;

  return (
    <div className="relative group pointer-events-auto">
      <div className={cn(
        "inline-flex items-center rounded-md border font-bold uppercase tracking-wider backdrop-blur-xs",
        compact ? "px-1.5 py-0.5 text-[8px] sm:text-[9px] space-x-1" : "px-2 py-1 text-[10px] space-x-1.5",
        config.color
      )}>
        <Icon size={compact ? 10 : 12} />
        <span>{compact ? config.shortLabel : config.label}</span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#0B132B] text-white text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {config.tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0B132B]" />
      </div>
    </div>
  );
}
