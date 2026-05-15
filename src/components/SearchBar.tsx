import React from 'react';
import { Search, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function SearchBar({ isSticky = false }: { isSticky?: boolean }) {
  return (
    <div className={cn(
      "w-full max-w-5xl mx-auto transition-all duration-300",
      isSticky ? "p-2 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] shadow-2xl" : ""
    )}>
      <div className={cn(
        "bg-white/[0.02] backdrop-blur-xl rounded-2xl md:rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center border border-white/[0.05]",
        isSticky ? "scale-[0.98]" : ""
      )}>
        {/* Destination */}
        <div className="flex-1 w-full md:w-auto px-4 py-2 md:px-6 md:py-4 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-white/10 group">
          <MapPin className="text-[#BA7517] group-hover:scale-110 transition-transform w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          <div className="flex flex-col flex-1">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-[#BA7517]">Destination</span>
            <select className="bg-transparent text-white text-xs md:text-sm font-semibold focus:outline-none appearance-none cursor-pointer">
              <option value="merzouga" className="bg-[#26215C]">Merzouga Desert</option>
              <option value="zagora" className="bg-[#26215C]">Zagora Desert</option>
              <option value="agafay" className="bg-[#26215C]">Agafay (Marrakech)</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="flex-1 w-full md:w-auto px-4 py-2 md:px-6 md:py-4 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-white/10">
          <Calendar className="text-[#BA7517] w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          <div className="flex flex-col">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-[#BA7517]">Arrival</span>
            <input 
              type="date" 
              className="bg-transparent text-white text-xs md:text-sm font-semibold focus:outline-none cursor-pointer [color-scheme:dark]" 
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 w-full md:w-auto px-4 py-2 md:px-6 md:py-4 flex items-center space-x-3">
          <Users className="text-[#BA7517] w-[18px] h-[18px] md:w-[20px] md:h-[20px]" />
          <div className="flex flex-col">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-[#BA7517]">Guests</span>
            <div className="flex items-center space-x-4">
               <input 
                 type="number" 
                 min="1" 
                 max="10" 
                 defaultValue="2"
                 className="bg-transparent text-white text-xs md:text-sm font-semibold focus:outline-none w-10 md:w-12"
               />
            </div>
          </div>
        </div>

        {/* Search Action */}
        <button className="w-full md:w-auto bg-[#BA7517] hover:bg-[#EF9F27] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-full font-bold text-sm md:text-base flex items-center justify-center space-x-2 transition-all active:scale-95">
          <span>Search</span>
          <ArrowRight className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </div>
  );
}
