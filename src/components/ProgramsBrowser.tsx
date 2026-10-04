import React, { useRef, useState, useEffect } from 'react';
import { STRUCTURED_PROGRAMS, BIVOUAC_NOMADES_AUDIT_META } from '@/src/data/bivouacNomadesPrograms';
import ProgramCard from '@/src/components/ProgramCard';
import { Compass, Clock, ShieldCheck, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProgramsBrowserProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function ProgramsBrowser({
  className,
  title = "Desert Programs from Foum Zguid",
  subtitle
}: ProgramsBrowserProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Dynamic lowest price calculation so copy never goes stale
  const minPrice = Math.min(...STRUCTURED_PROGRAMS.map(p => p.pricePerPerson));
  const dynamicSubtitle = subtitle || `Erg Chegaga expeditions operated by Bivouac Les Nomades. Operator-listed rates from ${minPrice} €.`;

  // Update arrow disabled states based on scroll position
  const updateScrollBounds = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    updateScrollBounds();
    window.addEventListener('resize', updateScrollBounds);
    return () => window.removeEventListener('resize', updateScrollBounds);
  }, []);

  // Measure card width + gap dynamically
  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const cardWidthWithGap = card.offsetWidth + 20; // 20px gap (gap-5)
    el.scrollBy({
      left: (dir === 'left' ? -1 : 1) * cardWidthWithGap,
      behavior: 'smooth'
    });
  };

  const isPhysicallyAudited = BIVOUAC_NOMADES_AUDIT_META.verificationStatus === 'physically_audited';

  return (
    <section id="desert-programs" className={cn("space-y-6", className)}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#BA7517]/20">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B132B] text-[#EF9F27] border border-[#BA7517]/40 mb-2">
            <Compass size={13} className="text-[#EF9F27]" />
            <span>Erg Chegaga Expeditions</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0B132B]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 mt-1 max-w-2xl font-normal">
            {dynamicSubtitle}
          </p>
        </div>

        {/* Mobile Swipe Nav Controls (Hidden on md+ where cards display in full grid) */}
        <div className="flex md:hidden items-center space-x-2 self-end shrink-0">
          <span className="text-xs text-stone-600 font-medium mr-1">
            Swipe tours &rarr;
          </span>
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer",
              canScrollLeft
                ? "bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border-stone-300"
                : "bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50"
            )}
            title="Previous tour"
            aria-label="Previous tour"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer",
              canScrollRight
                ? "bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border-stone-300"
                : "bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed opacity-50"
            )}
            title="Next tour"
            aria-label="Next tour"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Cards Layout: Swipe Carousel on Mobile, Full Multi-Column Grid on Desktop */}
      <div
        ref={scrollRef}
        onScroll={updateScrollBounds}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible pb-3 md:pb-0"
      >
        {STRUCTURED_PROGRAMS.map((program) => (
          <div
            key={program.id}
            className="w-[295px] sm:w-[335px] md:w-auto shrink-0 snap-start flex"
          >
            <ProgramCard program={program} />
          </div>
        ))}
      </div>

      {/* Accurate Trust Claim Footer (No false audit claims) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-700 pt-2 border-t border-stone-200">
        <div className="flex items-center space-x-2">
          {isPhysicallyAudited ? (
            <>
              <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
              <span className="font-semibold text-emerald-900">Physically audited by Dunecamps</span>
            </>
          ) : (
            <>
              <Clock size={14} className="text-[#BA7517] shrink-0" />
              <span>{BIVOUAC_NOMADES_AUDIT_META.verificationLabel}</span>
            </>
          )}
        </div>
        
        <span className="text-stone-500 text-[11px]">
          Source: {BIVOUAC_NOMADES_AUDIT_META.sourceUrl.replace('https://', '')}
        </span>
      </div>
    </section>
  );
}
