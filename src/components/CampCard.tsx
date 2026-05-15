import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Bath } from 'lucide-react';
import { Camp } from '@/src/types';
import { formatCurrency, cn } from '@/src/lib/utils';
import VerificationBadge from './VerificationBadge';

export default function CampCard({ camp }: { camp: Camp }) {
  // Mock image based on destination
  const getMockImage = (dest: string) => {
    const images: Record<string, string> = {
      merzouga: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800",
      zagora: "https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800",
      agafay: "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800"
    };
    return images[dest] || images.merzouga;
  };

  return (
    <Link 
      to={`/camps/${camp.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
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
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#26215C]">
          {formatCurrency(camp.price_per_night)} <span className="text-[10px] opacity-60 font-medium">/ night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-1 text-[#BA7517]">
            <MapPin size={12} />
            <span className="text-[10px] uppercase font-bold tracking-widest">{camp.destination}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold">4.9</span>
            <span className="text-[10px] text-gray-400">(42)</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#26215C] mb-2 group-hover:text-[#BA7517] transition-colors">
          {camp.name}
        </h3>

        <div className="flex items-center space-x-4 mb-4 text-[#26215C]/60 text-xs">
          <div className="flex items-center space-x-1">
            <Bath size={14} />
            <span>Private Bath</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Up to {camp.max_guests} guests</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Availability: Today</span>
          <button className="text-[#BA7517] text-xs font-bold hover:underline">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
