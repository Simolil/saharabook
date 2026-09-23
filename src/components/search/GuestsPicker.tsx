import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus, X, Users, BedDouble } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/lib/LanguageContext';

export interface GuestsConfig {
  adults: number;
  children: number;
  tents: number;
}

interface GuestsPickerProps {
  value: GuestsConfig;
  onChange: (value: GuestsConfig) => void;
  onClose: () => void;
  placement?: 'top' | 'bottom';
}

export default function GuestsPicker({
  value,
  onChange,
  onClose,
  placement = 'top'
}: GuestsPickerProps) {
  const { t } = useLanguage();

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUpdate = (field: keyof GuestsConfig, delta: number) => {
    const limits: Record<keyof GuestsConfig, { min: number; max: number }> = {
      adults: { min: 1, max: 16 },
      children: { min: 0, max: 10 },
      tents: { min: 1, max: 6 }
    };

    const nextVal = Math.min(limits[field].max, Math.max(limits[field].min, value[field] + delta));
    onChange({
      ...value,
      [field]: nextVal
    });
  };

  const totalGuests = value.adults + value.children;

  const guestsCard = (
    <div 
      data-search-picker="true"
      className="w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] bg-[#0B132B] border border-[#BA7517]/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-1 ring-white/10 p-5 md:p-6 text-white relative animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Users className="text-[#BA7517]" size={18} />
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            {t('search.guests') || 'Guests & Tents'}
          </h4>
        </div>
        <button 
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close guests picker"
        >
          <X size={18} />
        </button>
      </div>

      {/* Counter Rows */}
      <div className="space-y-5">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">
              {t('search.adults') || 'Adults'}
            </div>
            <div className="text-[11px] text-white/50">Age 18+</div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              disabled={value.adults <= 1}
              onClick={() => handleUpdate('adults', -1)}
              className={cn(
                "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all",
                value.adults <= 1 ? "opacity-30 cursor-not-allowed" : "hover:border-[#BA7517] hover:bg-white/10 active:scale-95 cursor-pointer"
              )}
              aria-label="Decrease adults"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-bold text-white">{value.adults}</span>
            <button
              type="button"
              disabled={value.adults >= 16}
              onClick={() => handleUpdate('adults', 1)}
              className={cn(
                "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all",
                value.adults >= 16 ? "opacity-30 cursor-not-allowed" : "hover:border-[#BA7517] hover:bg-white/10 active:scale-95 cursor-pointer"
              )}
              aria-label="Increase adults"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">
              {t('search.children') || 'Children'}
            </div>
            <div className="text-[11px] text-white/50">Ages 0 – 17</div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              disabled={value.children <= 0}
              onClick={() => handleUpdate('children', -1)}
              className={cn(
                "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all",
                value.children <= 0 ? "opacity-30 cursor-not-allowed" : "hover:border-[#BA7517] hover:bg-white/10 active:scale-95 cursor-pointer"
              )}
              aria-label="Decrease children"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-bold text-white">{value.children}</span>
            <button
              type="button"
              disabled={value.children >= 10}
              onClick={() => handleUpdate('children', 1)}
              className={cn(
                "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all",
                value.children >= 10 ? "opacity-30 cursor-not-allowed" : "hover:border-[#BA7517] hover:bg-white/10 active:scale-95 cursor-pointer"
              )}
              aria-label="Increase children"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Tents / Suites */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div>
            <div className="text-sm font-bold text-white flex items-center space-x-1.5">
              <BedDouble size={15} className="text-[#BA7517]" />
              <span>{t('search.rooms') || 'Tents / Rooms'}</span>
            </div>
            <div className="text-[11px] text-white/50">Private luxury suites</div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              disabled={value.tents <= 1}
              onClick={() => handleUpdate('tents', -1)}
              className={cn(
                "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all",
                value.tents <= 1 ? "opacity-30 cursor-not-allowed" : "hover:border-[#BA7517] hover:bg-white/10 active:scale-95 cursor-pointer"
              )}
              aria-label="Decrease tents"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-bold text-white">{value.tents}</span>
            <button
              type="button"
              disabled={value.tents >= 6}
              onClick={() => handleUpdate('tents', 1)}
              className={cn(
                "w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all",
                value.tents >= 6 ? "opacity-30 cursor-not-allowed" : "hover:border-[#BA7517] hover:bg-white/10 active:scale-95 cursor-pointer"
              )}
              aria-label="Increase tents"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="text-xs text-white/70">
          <span className="font-semibold text-white">{totalGuests}</span> {totalGuests === 1 ? 'guest' : 'guests'},{' '}
          <span className="font-semibold text-white">{value.tents}</span> {value.tents === 1 ? 'tent' : 'tents'}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="bg-[#BA7517] hover:bg-[#EF9F27] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
        >
          {t('search.apply') || 'Done'}
        </button>
      </div>
    </div>
  );

  if (isMobile && typeof document !== 'undefined') {
    return createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {guestsCard}
      </div>,
      document.body
    );
  }

  return (
    <div 
      data-search-picker="true"
      className={cn(
        "absolute right-0 md:right-[12%] lg:right-[14%] z-[100]",
        placement === 'top' ? "bottom-full mb-3" : "top-full mt-3"
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {guestsCard}
    </div>
  );
}
