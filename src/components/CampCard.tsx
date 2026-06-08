import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Bath } from 'lucide-react';
import { Camp } from '@/src/types';
import { formatCurrency, cn } from '@/src/lib/utils';
import VerificationBadge from './VerificationBadge';
import { useLanguage } from '@/src/lib/LanguageContext';

export default function CampCard({ camp }: { camp: Camp; key?: string }) {
  const { t } = useLanguage();
  // Mock image based on destination
  const getMockImage = (dest: string) => {
    const images: Record<string, string> = {
      merzouga: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800",
      zagora: "https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800",
      agafay: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800",
      foumzguid: "https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=800"
    };
    return images[dest] || images.merzouga;
  };

  return (
    <Link 
      to={`/camps/${camp.slug}`}
      className="group bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#BA7517]/15 shadow-sm hover:shadow-2xl hover:border-[#BA7517]/30 transition-all duration-500 flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={getMockImage(camp.destination)} 
          alt={camp.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <VerificationBadge tier={camp.verification_tier} />
        </div>
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0B132B]">
          {formatCurrency(camp.price_per_night)} <span className="text-[10px] opacity-60 font-medium">{t('camp.night')}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col bg-[#FAF7F2]">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-1 text-[#BA7517]">
            <MapPin size={12} />
            <span className="text-[10px] uppercase font-bold tracking-widest">{t(`search.${camp.destination.split(' ')[0].toLowerCase()}`)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-[#0B132B]">4.9</span>
            <span className="text-[10px] text-gray-400">(42)</span>
          </div>
        </div>

        <h3 className="text-lg font-serif font-semibold text-[#0B132B] mb-2 group-hover:text-[#BA7517] transition-colors">
          {camp.name}
        </h3>

        <div className="flex items-center space-x-4 mb-4 text-[#0B132B]/60 text-xs">
          <div className="flex items-center space-x-1">
            <Bath size={14} className="text-[#BA7517]" />
            <span>{t('camp.bath')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{t('camp.guests').replace('{count}', camp.max_guests.toString())}</span>
          </div>
        </div>
      </div>

      {/* Bottom Area: Dark Background ("only at the bottom") */}
      <div className="px-6 py-4 bg-gradient-to-t from-[#0B132B] via-[#14213D] to-[#1D2D50]/95 border-t border-[#BA7517]/10 flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF7F2]/60">{t('camp.availability')}</span>
        <button className="text-[#BA7517] text-xs font-bold group-hover:text-white transition-colors">
          {t('camp.details')}
        </button>
      </div>
    </Link>
  );
}
