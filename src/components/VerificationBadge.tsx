import React from 'react';
import { ShieldCheck, ShieldAlert, Award } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { VerificationTier } from '@/src/types';

export default function VerificationBadge({ tier }: { tier: VerificationTier }) {
  const configs = {
    listed: {
      label: 'Listed',
      icon: ShieldAlert,
      color: 'bg-gray-100 text-gray-500 border-gray-200',
      tooltip: 'Basic information and photos have been reviewed by our team.'
    },
    verified: {
      label: 'Dunecamps Verified',
      icon: ShieldCheck,
      color: 'bg-green-50 text-green-700 border-green-200',
      tooltip: 'We have physically visited this camp and verified its facilities and management.'
    },
    elite: {
      label: 'Elite Choice',
      icon: Award,
      color: 'bg-[#BA7517]/10 text-[#BA7517] border-[#BA7517]/20',
      tooltip: 'Top-tier performance, 50+ 5-star reviews, and verified private bathrooms.'
    }
  };

  const config = configs[tier] || configs.listed;
  const Icon = config.icon;

  return (
    <div className="relative group pointer-events-auto">
      <div className={cn(
        "inline-flex items-center space-x-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider",
        config.color
      )}>
        <Icon size={12} />
        <span>{config.label}</span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#26215C] text-white text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {config.tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#26215C]" />
      </div>
    </div>
  );
}
