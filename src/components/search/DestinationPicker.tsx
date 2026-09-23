import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Compass, X, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/lib/LanguageContext';

export interface DestinationOption {
  id: string;
  nameKey: string;
  defaultName: string;
  region: string;
  highlight: string;
}

export const DESTINATIONS: DestinationOption[] = [
  {
    id: 'merzouga',
    nameKey: 'search.merzouga',
    defaultName: 'Merzouga',
    region: 'Erg Chebbi Dunes',
    highlight: 'Classic golden dunes'
  },
  {
    id: 'zagora',
    nameKey: 'search.zagora',
    defaultName: 'Zagora',
    region: 'Draa Valley',
    highlight: 'Wild desert frontier'
  },
  {
    id: 'agafay',
    nameKey: 'search.agafay',
    defaultName: 'Agafay',
    region: 'Near Marrakech (45 min)',
    highlight: 'Stone desert luxury'
  },
  {
    id: 'foumzguid',
    nameKey: 'search.foumzguid',
    defaultName: 'Foum Zguid',
    region: 'Chigaga Gateway',
    highlight: 'Remote wilderness'
  },
  {
    id: 'mhamid',
    nameKey: 'search.mhamid',
    defaultName: "M'Hamid",
    region: 'Caravan Oasis',
    highlight: 'Where the road ends'
  },
  {
    id: 'ouarzazate',
    nameKey: 'search.ouarzazate',
    defaultName: 'Ouarzazate',
    region: 'Door of the Desert',
    highlight: 'Kasbahs & palm groves'
  }
];

interface DestinationPickerProps {
  value: string;
  onSelect: (destinationId: string) => void;
  onClose: () => void;
  placement?: 'top' | 'bottom';
}

export default function DestinationPicker({
  value,
  onSelect,
  onClose,
  placement = 'top'
}: DestinationPickerProps) {
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

  const selectedDestination = DESTINATIONS.find(d => d.id.toLowerCase() === value.toLowerCase()) || DESTINATIONS[0];
  const selectedDisplayName = t(selectedDestination.nameKey) || selectedDestination.defaultName;

  const destinationCard = (
    <div 
      data-search-picker="true"
      className="w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] bg-[#0B132B] border border-[#BA7517]/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-1 ring-white/10 p-5 md:p-6 text-white relative animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Header - Identical structure to Guests Picker */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Compass className="text-[#BA7517]" size={18} />
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            {t('search.destination') || 'Destination'}
          </h4>
        </div>
        <button 
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close destination picker"
        >
          <X size={18} />
        </button>
      </div>

      {/* Simple destination list matching the simplicity of Guests counter rows */}
      <div className="space-y-2">
        {DESTINATIONS.map((dest) => {
          const isSelected = value.toLowerCase() === dest.id.toLowerCase();
          const displayName = t(dest.nameKey) || dest.defaultName;

          return (
            <button
              key={dest.id}
              type="button"
              onClick={() => {
                onSelect(dest.id);
                onClose();
              }}
              className={cn(
                "w-full text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer",
                isSelected 
                  ? "bg-[#BA7517]/20 border-[#BA7517] text-white shadow-sm" 
                  : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-[#BA7517]/40 text-white/80"
              )}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "text-sm font-bold tracking-wide",
                    isSelected ? "text-white" : "text-white/90 group-hover:text-white"
                  )}>
                    {displayName}
                  </span>
                  <span className="text-[10px] text-white/40">·</span>
                  <span className="text-[11px] text-[#BA7517] font-medium">
                    {dest.region}
                  </span>
                </div>
              </div>

              {/* Clean radio indicator */}
              <div className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center transition-all",
                isSelected 
                  ? "border-[#BA7517] bg-[#BA7517] text-white shadow-sm" 
                  : "border-white/30 group-hover:border-[#BA7517]/60"
              )}>
                {isSelected && <Check size={12} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer - Identical structure to Guests Picker */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="text-xs text-white/70 truncate mr-2">
          <span className="text-white/40">{t('search.destination')}: </span>
          <span className="font-semibold text-white">{selectedDisplayName}</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="bg-[#BA7517] hover:bg-[#EF9F27] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
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
        {destinationCard}
      </div>,
      document.body
    );
  }

  return (
    <div 
      data-search-picker="true"
      className={cn(
        "absolute left-0 md:left-2 z-[100]",
        placement === 'top' ? "bottom-full mb-3" : "top-full mt-3"
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {destinationCard}
    </div>
  );
}
