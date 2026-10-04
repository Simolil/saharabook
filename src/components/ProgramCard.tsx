import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight, Check } from 'lucide-react';
import { StructuredDesertProgram } from '@/src/data/bivouacNomadesPrograms';
import { formatCurrency } from '@/src/lib/utils';
import MoroccanGateArch from '@/src/components/MoroccanGateArch';

interface ProgramCardProps {
  key?: string | number;
  program: StructuredDesertProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link
      to={program.path}
      className="group flex flex-col h-full rounded-3xl bg-white border border-[#BA7517]/20 shadow-sm hover:shadow-xl hover:border-[#BA7517]/60 transition-all duration-300 overflow-hidden relative"
    >
      {/* Photo Header */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#0B132B]">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Moroccan Gate Arch top border */}
        <MoroccanGateArch
          fillColor="#0B132B"
          strokeColor="#BA7517"
          heightClass="h-6"
        />

        {/* Duration badge */}
        <div className="absolute top-3 left-3 bg-[#0B132B]/90 backdrop-blur-md text-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#BA7517]/40 shadow-sm flex items-center space-x-1.5 z-10">
          <Clock size={12} className="text-[#EF9F27]" />
          <span>{program.durationLabel}</span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#0B132B] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 z-10">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span>{program.rating}</span>
          <span className="text-stone-400 font-normal">({program.reviewCount})</span>
        </div>

        {/* Price callout inside photo */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#EF9F27] block">
              Operator Rate
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-serif font-bold text-white drop-shadow-sm">
                {program.pricePerPerson} €
              </span>
              <span className="text-xs text-white/90 font-medium">/ person</span>
            </div>
          </div>
          <span className="text-xs text-white font-medium px-2.5 py-0.5 rounded bg-black/50 backdrop-blur-xs border border-white/20">
            {program.startPoint.split(' ')[0]} Start
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Camp and Destination */}
          <div className="flex items-center space-x-1.5 text-xs text-[#BA7517] font-semibold mb-1.5">
            <MapPin size={13} className="shrink-0" />
            <span className="line-clamp-1">{program.campName} · {program.destination}</span>
          </div>

          {/* Program Title */}
          <h3 className="font-serif font-bold text-lg text-[#0B132B] group-hover:text-[#BA7517] transition-colors line-clamp-2 leading-tight mb-3">
            {program.title}
          </h3>

          {/* 2-3 Fast-scan Highlights (NO bulky itinerary or walls of text) */}
          <ul className="space-y-1.5 mb-4 text-xs text-stone-700">
            {program.cardHighlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <Check size={13} className="text-[#BA7517] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Link */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0B132B] group-hover:text-[#BA7517] transition-colors">
          <span>View Day-by-Day &amp; Book</span>
          <div className="w-7 h-7 rounded-full bg-[#FAF7F2] group-hover:bg-[#BA7517] group-hover:text-white flex items-center justify-center transition-all">
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}
