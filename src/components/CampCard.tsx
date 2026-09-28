import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, MapPin, Bath, ArrowRight } from 'lucide-react';
import { Camp } from '@/src/types';
import { formatCurrency, cn } from '@/src/lib/utils';
import VerificationBadge from './VerificationBadge';
import { useLanguage } from '@/src/lib/LanguageContext';

export const getCampImage = (camp: Camp): string => {
  const anyCamp = camp as any;
  if (anyCamp.image) return anyCamp.image;
  if (camp.destination) return `/images/destinations/${camp.destination}.jpg`;
  return '/images/destinations/merzouga.jpg';
};

export const getCampFallbackImage = (camp: Camp): string => {
  const anyCamp = camp as any;
  if (anyCamp.fallbackImage) return anyCamp.fallbackImage;
  const images: Record<string, string> = {
    merzouga: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800",
    zagora: "https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800",
    agafay: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800",
    foumzguid: "https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=800",
    'foum-zguid': "https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=800",
    ouarzazate: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800",
    mhamid: "https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800",
    chigaga: "https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=800"
  };
  return images[camp.destination] || images.merzouga;
};

export default function CampCard({ 
  camp, 
  variant = 'standard' 
}: { 
  camp: Camp; 
  variant?: 'standard' | 'square'; 
  key?: string 
}) {
  const { t } = useLanguage();

  if (variant === 'square') {
    return (
      <Link 
        to={`/camps/${camp.slug}`}
        className="group relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#BA7517]/25 shadow-md hover:shadow-2xl hover:border-[#BA7517]/60 transition-all duration-500 flex flex-col justify-between bg-stone-900"
      >
        {/* Full square background image */}
        <motion.img 
          layoutId={`camp-hero-${camp.slug}`}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          src={getCampImage(camp)} 
          onError={(e) => {
            const fb = getCampFallbackImage(camp);
            if (e.currentTarget.src !== fb) {
              e.currentTarget.src = fb;
            }
          }}
          alt={camp.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Soft, lightened gradient overlays to reveal the background image vividly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 via-[#0B132B]/20 to-transparent pointer-events-none group-hover:from-[#0B132B]/75 transition-all" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Top bar: Verification Badge & Price Pill */}
        <div className="relative z-10 p-3 sm:p-4 flex justify-between items-start gap-2">
          <VerificationBadge tier={camp.verification_tier} compact />
          <div className="bg-black/65 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg shrink-0">
            <span className="text-[#EF9F27] font-serif">{formatCurrency(camp.price_per_night)}</span>
            <span className="text-[10px] text-white/70 font-normal"> / {t('camp.night')}</span>
          </div>
        </div>

        {/* Bottom bar: Location, Rating, Camp Title, Amenities, and Action */}
        <div className="relative z-10 p-3.5 sm:p-5 flex flex-col justify-end">
          <div className="flex items-center justify-between text-xs font-bold mb-1 sm:mb-1.5">
            <div className="flex items-center space-x-1 text-[#EF9F27]">
              <MapPin size={12} className="shrink-0" />
              <span className="uppercase tracking-widest text-[9px] sm:text-[10px] truncate max-w-[150px]">{t(`search.${camp.destination.split(' ')[0].toLowerCase()}`)}</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 shrink-0">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-white text-xs font-bold">4.9</span>
              <span className="text-[10px] text-white/60">(48)</span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white leading-snug group-hover:text-[#EF9F27] transition-colors line-clamp-1 mb-1.5 sm:mb-2 drop-shadow-sm">
            {camp.name}
          </h3>

          <div className="flex items-center justify-between text-xs text-white/80 border-t border-white/15 pt-2 sm:pt-2.5">
            <div className="flex items-center space-x-2 truncate">
              <span className="flex items-center space-x-1">
                <Bath size={12} className="text-[#EF9F27]" />
                <span className="text-[10px] sm:text-[11px]">{t('camp.bath')}</span>
              </span>
              <span>•</span>
              <span className="text-[10px] sm:text-[11px]">{t('camp.guests').replace('{count}', camp.max_guests.toString())}</span>
            </div>
            <span className="text-[#EF9F27] font-semibold text-xs flex items-center space-x-1 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
              <span>{t('camp.details')}</span>
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/camps/${camp.slug}`}
      className="group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#BA7517]/15 shadow-xs hover:shadow-lg hover:border-[#BA7517]/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-40 overflow-hidden bg-stone-900">
        <motion.img 
          layoutId={`camp-hero-${camp.slug}`}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          src={getCampImage(camp)} 
          onError={(e) => {
            const fb = getCampFallbackImage(camp);
            if (e.currentTarget.src !== fb) {
              e.currentTarget.src = fb;
            }
          }}
          alt={camp.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
        />
        <div className="absolute top-2.5 left-2.5">
          <VerificationBadge tier={camp.verification_tier} />
        </div>
        <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold text-[#0B132B] shadow-xs">
          {formatCurrency(camp.price_per_night)} <span className="text-[9px] opacity-60 font-normal">{t('camp.night')}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col bg-[#FAF7F2]">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center space-x-1 text-[#BA7517]">
            <MapPin size={10} />
            <span className="text-[9px] uppercase font-bold tracking-widest">{t(`search.${camp.destination.split(' ')[0].toLowerCase()}`)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-[#0B132B]">4.9</span>
            <span className="text-[9px] text-gray-400">(42)</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-serif font-bold text-[#0B132B] mb-1.5 group-hover:text-[#BA7517] transition-colors leading-snug">
          {camp.name}
        </h3>

        <div className="flex items-center space-x-3 text-[#0B132B]/60 text-[11px]">
          <div className="flex items-center space-x-1">
            <Bath size={12} className="text-[#BA7517]" />
            <span>{t('camp.bath')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{t('camp.guests').replace('{count}', camp.max_guests.toString())}</span>
          </div>
        </div>
      </div>

      {/* Bottom Area: Dark Background */}
      <div className="px-3.5 sm:px-4 py-2 bg-gradient-to-t from-[#0B132B] via-[#14213D] to-[#1D2D50]/95 border-t border-[#BA7517]/10 flex items-center justify-between">
        <span className="text-[8px] uppercase font-bold tracking-widest text-[#FAF7F2]/60">{t('camp.availability')}</span>
        <button className="text-[#BA7517] text-[11px] font-bold group-hover:text-white transition-colors">
          {t('camp.details')}
        </button>
      </div>
    </Link>
  );
}
