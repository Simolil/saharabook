import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, RotateCcw, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/lib/LanguageContext';

interface DateRangePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  onClose: () => void;
  placement?: 'top' | 'bottom';
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

// Normalize to start of day in local time for accurate comparison
function startOfDay(d: Date): Date {
  const res = new Date(d);
  res.setHours(0, 0, 0, 0);
  return res;
}

function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatDateDisplay(d: Date | null): string {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  onClose,
  placement = 'top'
}: DateRangePickerProps) {
  const { t } = useLanguage();
  const today = useMemo(() => startOfDay(new Date()), []);

  // Detect mobile to render portal vs anchored dropdown
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
  
  // Track whether user is actively selecting Arrival or Departure
  const [activeStep, setActiveStep] = useState<'arrival' | 'departure'>(() => {
    return checkIn && !checkOut ? 'departure' : 'arrival';
  });

  // Displayed month
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => {
    return checkIn ? new Date(checkIn.getFullYear(), checkIn.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const canGoPrev = useMemo(() => {
    const currentStart = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentStart > thisMonthStart;
  }, [currentMonthDate, today]);

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Day click handler supporting interactive Arrival & Departure selection
  const handleDateClick = (date: Date) => {
    const target = startOfDay(date);
    if (target < today) return;

    if (activeStep === 'arrival' || !checkIn) {
      // User is picking arrival date
      onChange(target, checkOut && target < checkOut ? checkOut : null);
      setActiveStep('departure');
    } else {
      // User is picking departure date
      if (target <= checkIn) {
        // If chosen departure is on or before arrival, make it the new arrival
        onChange(target, null);
        setActiveStep('departure');
      } else {
        onChange(checkIn, target);
        // Both selected
      }
    }
  };

  // Helper to render one month calendar grid
  const renderMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }

    return (
      <div className="w-full">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {WEEKDAYS.map((wd, i) => (
            <span key={wd} className={cn(
              "text-[11px] font-semibold uppercase tracking-wider py-1",
              i >= 5 ? "text-[#BA7517]/80" : "text-white/40"
            )}>
              {wd}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center">
          {days.map((d, index) => {
            if (!d) {
              return <div key={`empty-${index}`} className="h-8.5 w-full" />;
            }

            const dayStart = startOfDay(d);
            const isPast = dayStart < today;
            const isCheckInDay = checkIn && isSameDay(dayStart, checkIn);
            const isCheckOutDay = checkOut && isSameDay(dayStart, checkOut);
            
            // Check if day is inside range
            let isInRange = false;
            if (checkIn && checkOut) {
              isInRange = dayStart > checkIn && dayStart < checkOut;
            } else if (checkIn && !checkOut && hoverDate) {
              isInRange = dayStart > checkIn && dayStart <= hoverDate;
            }

            return (
              <button
                key={dayStart.toISOString()}
                type="button"
                disabled={isPast}
                onClick={() => handleDateClick(dayStart)}
                onMouseEnter={() => {
                  if (checkIn && !checkOut && dayStart > checkIn) {
                    setHoverDate(dayStart);
                  }
                }}
                onMouseLeave={() => setHoverDate(null)}
                className={cn(
                  "h-8.5 w-full relative flex items-center justify-center text-xs font-semibold transition-all duration-150 cursor-pointer select-none",
                  isPast && "text-white/20 cursor-not-allowed",
                  !isPast && !isCheckInDay && !isCheckOutDay && !isInRange && "text-white/90 hover:bg-white/10 rounded-lg",
                  isInRange && "bg-[#BA7517]/25 text-white",
                  isCheckInDay && "bg-[#BA7517] text-white font-bold rounded-l-lg shadow-md z-10",
                  isCheckOutDay && "bg-[#BA7517] text-white font-bold rounded-r-lg shadow-md z-10",
                  (isCheckInDay && isCheckOutDay) && "rounded-lg"
                )}
              >
                <span>{d.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
  }, [checkIn, checkOut]);

  // Quick preset dates
  const handleQuickPreset = (nightsCount: number) => {
    const start = checkIn || new Date(today.getTime() + 86400000);
    const end = new Date(start);
    end.setDate(end.getDate() + nightsCount);
    onChange(start, end);
    setActiveStep('departure');
  };

  const calendarCard = (
    <div 
      data-search-picker="true"
      className="w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] bg-[#0B132B] border border-[#BA7517]/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] ring-1 ring-white/10 p-5 md:p-6 text-white relative animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Header - Identical structure to Guests & Destination pickers */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Calendar className="text-[#BA7517]" size={18} />
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            {t('search.arrival')} & {t('search.departure')}
          </h4>
        </div>

        <button 
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close calendar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Arrival & Departure interactive cards */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveStep('arrival')}
          className={cn(
            "p-2.5 rounded-xl border text-left transition-all cursor-pointer relative",
            activeStep === 'arrival' 
              ? "border-[#BA7517] bg-[#BA7517]/20 ring-1 ring-[#BA7517]/50" 
              : "border-white/10 bg-white/5 hover:border-white/20"
          )}
        >
          <div className="text-[9px] uppercase tracking-widest font-black text-[#BA7517]">
            {t('search.arrival') || 'Arrival'}
          </div>
          <div className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
            {checkIn ? formatDateDisplay(checkIn) : 'Select date'}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveStep('departure')}
          className={cn(
            "p-2.5 rounded-xl border text-left transition-all cursor-pointer relative",
            activeStep === 'departure' 
              ? "border-[#BA7517] bg-[#BA7517]/20 ring-1 ring-[#BA7517]/50" 
              : "border-white/10 bg-white/5 hover:border-white/20"
          )}
        >
          <div className="text-[9px] uppercase tracking-widest font-black text-[#BA7517]">
            {t('search.departure') || 'Departure'}
          </div>
          <div className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
            {checkOut ? formatDateDisplay(checkOut) : 'Select date'}
          </div>
        </button>
      </div>

      {/* Selection Guidance & Nights Indicator */}
      <div className="flex items-center justify-between text-[11px] mb-3 px-1 text-white/60">
        <span className="font-medium text-white/80">
          {activeStep === 'arrival' 
            ? 'Select arrival date on calendar' 
            : 'Select departure date on calendar'}
        </span>
        {nights > 0 && (
          <span className="text-[#EF9F27] font-bold bg-[#BA7517]/20 border border-[#BA7517]/40 px-2 py-0.5 rounded-full text-[10px]">
            {nights} {nights === 1 ? 'night' : 'nights'}
          </span>
        )}
      </div>

      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={handlePrevMonth}
          className={cn(
            "p-1.5 rounded-lg border border-white/10 text-white transition-all flex items-center justify-center",
            canGoPrev ? "hover:bg-white/10 hover:border-[#BA7517]/40 cursor-pointer" : "opacity-30 cursor-not-allowed"
          )}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-sm font-bold tracking-wide text-white font-serif">
          {MONTH_NAMES[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-lg border border-white/10 text-white hover:bg-white/10 hover:border-[#BA7517]/40 transition-all flex items-center justify-center cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar Grid: Single month view */}
      <div className="pb-3">
        {renderMonth(currentMonthDate)}
      </div>

      {/* Quick Presets & Action Footer - Identical to Guests & Destination pickers */}
      <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => handleQuickPreset(1)}
            className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            1N
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(2)}
            className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            2N
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(3)}
            className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            3N
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {(checkIn || checkOut) && (
            <button
              type="button"
              onClick={() => {
                onChange(null, null);
                setActiveStep('arrival');
              }}
              className="text-xs text-white/60 hover:text-white flex items-center space-x-1 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Clear</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="bg-[#BA7517] hover:bg-[#EF9F27] text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {checkIn && checkOut ? `Done (${nights}N)` : (t('search.apply') || 'Done')}
          </button>
        </div>
      </div>
    </div>
  );

  // If mobile, render as a viewport modal overlay attached directly to body
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
        {calendarCard}
      </div>,
      document.body
    );
  }

  // On desktop, render anchored above (top) or below (bottom) the search bar
  return (
    <div 
      data-search-picker="true"
      className={cn(
        "absolute left-0 md:left-[22%] lg:left-[24%] z-[100]",
        placement === 'top' ? "bottom-full mb-3" : "top-full mt-3"
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {calendarCard}
    </div>
  );
}
