import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/lib/LanguageContext';
import DateRangePicker from './search/DateRangePicker';
import GuestsPicker, { GuestsConfig } from './search/GuestsPicker';
import DestinationPicker, { DESTINATIONS } from './search/DestinationPicker';

function formatShortDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function SearchBar({ isSticky = false }: { isSticky?: boolean }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Search parameters state
  const [destination, setDestination] = useState<string>('merzouga');

  // Default dates: tomorrow to 2 days after tomorrow
  const [checkIn, setCheckIn] = useState<Date | null>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [checkOut, setCheckOut] = useState<Date | null>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [guests, setGuests] = useState<GuestsConfig>({
    adults: 2,
    children: 0,
    tents: 1
  });

  // Modal / Dropdown visibility state
  const [isDestinationPickerOpen, setIsDestinationPickerOpen] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isGuestsPickerOpen, setIsGuestsPickerOpen] = useState<boolean>(false);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const destinationTriggerRef = useRef<HTMLDivElement>(null);
  const dateTriggerRef = useRef<HTMLDivElement>(null);
  const guestsTriggerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside (safely ignoring clicks inside portalled or inline pickers)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      // Inside search bar? Keep open
      if (searchBarRef.current && searchBarRef.current.contains(target as Node)) {
        return;
      }

      // Inside any picker popup or portal? Keep open
      if (target.closest && target.closest('[data-search-picker]')) {
        return;
      }

      setIsDestinationPickerOpen(false);
      setIsDatePickerOpen(false);
      setIsGuestsPickerOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDestinationPickerOpen(false);
        setIsDatePickerOpen(false);
        setIsGuestsPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDateChange = (inDate: Date | null, outDate: Date | null) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
  };

  const handleSearchSubmit = () => {
    // Navigate to destination hub
    navigate(`/destinations/${destination}`);
  };

  const totalGuests = guests.adults + guests.children;
  const nights = checkIn && checkOut ? Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  const currentDestOption = DESTINATIONS.find(d => d.id.toLowerCase() === destination.toLowerCase());
  const currentDestName = currentDestOption 
    ? (t(currentDestOption.nameKey) || currentDestOption.defaultName)
    : (t(`search.${destination}`) || destination);
  const currentDestRegion = currentDestOption?.region || '';

  return (
    <div 
      ref={searchBarRef}
      className={cn(
        "w-full max-w-7xl mx-auto transition-all duration-300 relative",
        isSticky ? "p-1 bg-black/60 backdrop-blur-md rounded-xl md:rounded-2xl border border-[#BA7517]/40 shadow-2xl" : ""
      )}
    >
      <div className={cn(
        "rounded-xl md:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-1.5 sm:p-2 flex flex-col md:flex-row items-center border border-[#BA7517]/40 backdrop-blur-md transition-all duration-300",
        isSticky ? "bg-[#0B132B]/85 border-transparent" : "bg-black/25 hover:bg-black/35"
      )}>
        {/* Destination Trigger */}
        <div 
          ref={destinationTriggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsDestinationPickerOpen(prev => !prev);
            setIsDatePickerOpen(false);
            setIsGuestsPickerOpen(false);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "flex-1 w-full md:w-auto px-3.5 py-2 md:px-3.5 md:py-2.5 lg:px-5 lg:py-3.5 flex items-center space-x-2.5 lg:space-x-3 border-b md:border-b-0 md:border-r border-[#BA7517]/30 cursor-pointer rounded-lg transition-colors group",
            isDestinationPickerOpen ? "bg-white/10" : "hover:bg-white/5"
          )}
        >
          <MapPin className="text-[#BA7517] group-hover:scale-110 transition-transform w-[16px] h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] shrink-0" />
          <div className="flex flex-col flex-1 text-left min-w-0">
            <span className="text-[9px] lg:text-[10px] uppercase tracking-widest font-black text-[#BA7517]">
              {t('search.destination')}
            </span>
            <div className="text-white text-xs lg:text-sm font-semibold truncate flex items-center justify-between">
              <span className="truncate">{currentDestName}</span>
              {currentDestRegion && (
                <span className="text-[9px] uppercase tracking-wider text-[#BA7517] font-bold ml-1.5 hidden xl:inline-block px-1.5 py-0.5 rounded bg-white/10 shrink-0">
                  {currentDestRegion}
                </span>
              )}
            </div>
          </div>
          <ChevronDown size={14} className={cn(
            "text-white/40 group-hover:text-white transition-transform duration-200 shrink-0 ml-1",
            isDestinationPickerOpen && "rotate-180 text-[#BA7517]"
          )} />
        </div>

        {/* Dates Trigger (Check-in & Check-out) */}
        <div 
          ref={dateTriggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsDatePickerOpen(prev => !prev);
            setIsDestinationPickerOpen(false);
            setIsGuestsPickerOpen(false);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "flex-1 w-full md:w-auto px-3.5 py-2 md:px-3.5 md:py-2.5 lg:px-5 lg:py-3.5 flex items-center space-x-2.5 lg:space-x-3 border-b md:border-b-0 md:border-r border-[#BA7517]/30 cursor-pointer rounded-lg transition-colors group",
            isDatePickerOpen ? "bg-white/10" : "hover:bg-white/5"
          )}
        >
          <Calendar className="text-[#BA7517] group-hover:scale-110 transition-transform w-[16px] h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] shrink-0" />
          <div className="flex flex-col flex-1 text-left min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-[9px] lg:text-[10px] uppercase tracking-widest font-black text-[#BA7517]">
                {t('search.arrival')} – {t('search.departure')}
              </span>
              {nights > 0 && (
                <span className="text-[9px] font-bold text-white/50 bg-white/10 px-1.5 py-0.5 rounded">
                  {nights}N
                </span>
              )}
            </div>
            
            <div className="text-white text-xs lg:text-sm font-semibold truncate">
              {checkIn && checkOut ? (
                <span className="truncate">
                  {formatShortDate(checkIn)} — {formatShortDate(checkOut)}
                </span>
              ) : checkIn ? (
                <span className="text-white/80 truncate">
                  {formatShortDate(checkIn)} — <span className="text-[#BA7517]">Select checkout</span>
                </span>
              ) : (
                <span className="text-white/50">{t('search.select_dates') || 'Select dates'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Guests Trigger */}
        <div 
          ref={guestsTriggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsGuestsPickerOpen(prev => !prev);
            setIsDatePickerOpen(false);
            setIsDestinationPickerOpen(false);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "flex-1 w-full md:w-auto px-3.5 py-2 md:px-3.5 md:py-2.5 lg:px-5 lg:py-3.5 flex items-center space-x-2.5 lg:space-x-3 cursor-pointer rounded-lg transition-colors group",
            isGuestsPickerOpen ? "bg-white/10" : "hover:bg-white/5"
          )}
        >
          <Users className="text-[#BA7517] group-hover:scale-110 transition-transform w-[16px] h-[16px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] shrink-0" />
          <div className="flex flex-col flex-1 text-left min-w-0">
            <span className="text-[9px] lg:text-[10px] uppercase tracking-widest font-black text-[#BA7517]">
              {t('search.guests')}
            </span>
            <div className="text-white text-xs lg:text-sm font-semibold truncate">
              <span>
                {totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}
              </span>
              <span className="text-white/40 mx-1">·</span>
              <span>
                {guests.tents} {guests.tents === 1 ? 'tent' : 'tents'}
              </span>
            </div>
          </div>
        </div>

        {/* Search Action */}
        <button 
          type="button"
          onClick={handleSearchSubmit}
          className="w-full md:w-auto border border-[#BA7517]/40 hover:border-[#BA7517] bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 md:px-5 md:py-2.5 lg:px-7 lg:py-3 rounded-lg md:rounded-xl font-bold text-xs lg:text-sm uppercase tracking-wider flex items-center justify-center space-x-1.5 lg:space-x-2 transition-all active:scale-95 shadow-[0_2px_6px_rgba(0,0,0,0.15)] group cursor-pointer shrink-0 mt-1.5 md:mt-0"
        >
          <span className="text-white group-hover:text-[#BA7517] transition-colors">{t('search.action')}</span>
          <ArrowRight className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-[#BA7517] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Destination Picker Pop-up */}
      {isDestinationPickerOpen && (
        <DestinationPicker
          value={destination}
          onSelect={(destId) => {
            setDestination(destId);
            setIsDestinationPickerOpen(false);
          }}
          onClose={() => setIsDestinationPickerOpen(false)}
          placement={isSticky ? 'bottom' : 'top'}
        />
      )}

      {/* Date Range Picker Pop-up */}
      {isDatePickerOpen && (
        <DateRangePicker 
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={handleDateChange}
          onClose={() => setIsDatePickerOpen(false)}
          placement={isSticky ? 'bottom' : 'top'}
        />
      )}

      {/* Guests Picker Pop-up */}
      {isGuestsPickerOpen && (
        <GuestsPicker 
          value={guests}
          onChange={setGuests}
          onClose={() => setIsGuestsPickerOpen(false)}
          placement={isSticky ? 'bottom' : 'top'}
        />
      )}
    </div>
  );
}
