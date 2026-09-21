import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BackButtonProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function BackButton({ variant = 'light', className }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      aria-label="Go back to previous page"
      title="Back"
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group cursor-pointer select-none",
        variant === 'dark'
          ? "bg-black/35 hover:bg-black/55 text-white backdrop-blur-md border border-white/30 hover:border-white/60 shadow-lg"
          : "bg-white hover:bg-[#FAF7F2] text-[#0B132B] hover:text-[#BA7517] border border-[#BA7517]/25 hover:border-[#BA7517] shadow-sm hover:shadow-md",
        className
      )}
    >
      <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
    </button>
  );
}
