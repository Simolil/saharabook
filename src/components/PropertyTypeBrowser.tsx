import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/src/lib/LanguageContext';
import { mockCamps } from '@/src/lib/mockData';
import { formatCurrency, cn } from '@/src/lib/utils';
import VerificationBadge from './VerificationBadge';

export interface PropertyTypeItem {
  id: string;
  category: string; // e.g. "Camp", "Kasbah", etc.
  title: string;    // e.g. "Desert Bivouac"
  vibe: string;     // The user's exact evocative description
  setting: string;  // Dune setting or region
  count: number;    // Number of stays
  priceFrom: number;// EUR
  image: string;
  fallback: string;
  sampleCampSlugs: string[];
}

export const PROPERTY_TYPES: PropertyTypeItem[] = [
  {
    id: 'camp',
    category: 'Camp',
    title: 'Desert Bivouac',
    vibe: 'Canvas suites and authentic tents nested deep within the shifting dunes under open skies.',
    setting: 'Erg Chebbi & Erg Chigaga Dunes',
    count: 38,
    priceFrom: 140,
    image: '/images/slideshow/slide-6.jpg',
    fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800',
    sampleCampSlugs: ['luxury-sand-spirit-camp', 'nomad-dream-zagora']
  },
  {
    id: 'kasbah',
    category: 'Kasbah',
    title: 'Heritage Kasbah',
    vibe: 'Fortified earth-brick architecture and historic desert-edge fortresses rich in local culture.',
    setting: 'Ouarzazate & Draa Valley',
    count: 19,
    priceFrom: 160,
    image: '/images/slideshow/slide-8.jpg',
    fallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800',
    sampleCampSlugs: ['ksar-ouarzazate-desert-lodge']
  },
  {
    id: 'lodge',
    category: 'Lodge',
    title: 'Desert Lodge',
    vibe: "Fixed-structure comfort offering panoramic views, modern amenities, and sanctuary at the desert's edge.",
    setting: 'Agafay Stone Desert',
    count: 15,
    priceFrom: 220,
    image: '/images/slideshow/slide-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    sampleCampSlugs: ['scarabeo-alternative-camp']
  },
  {
    id: 'auberge',
    category: 'Auberge',
    title: 'Oasis Auberge',
    vibe: 'Traditional, warm-hearted guesthouse stops welcoming travelers along the ancient caravan routes.',
    setting: "M'Hamid & Zagora Palm Groves",
    count: 22,
    priceFrom: 95,
    image: '/images/slideshow/slide-10.png',
    fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800',
    sampleCampSlugs: ['mhamid-chigaga-nomad-camp']
  },
  {
    id: 'hotel_eco',
    category: 'Hotel / Eco-Lodge',
    title: 'Desert Retreats & Eco-Lodges',
    vibe: 'Low-impact sustainable stays and contemporary hotel comforts seamlessly blended into the surrounding landscape.',
    setting: 'Foum Zguid & Agafay Highlands',
    count: 14,
    priceFrom: 240,
    image: '/images/destinations/agafay.jpg',
    fallback: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    sampleCampSlugs: ['chigaga-wild-dunes-camp', 'scarabeo-alternative-camp']
  }
];

export default function PropertyTypeBrowser() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedType, setSelectedType] = useState<PropertyTypeItem | null>(null);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.clientWidth || 240;
    const scrollAmount = (cardWidth + 20) * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Matching camps for modal
  const matchingCamps = selectedType
    ? mockCamps.filter(c => selectedType.sampleCampSlugs.includes(c.slug))
    : [];

  return (
    <section className="py-10 md:py-14 bg-[#FAF7F2] border-b border-[#BA7517]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Compact Booking.com style */}
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              {t('home.browse_by_type')}
            </h2>
            <p className="text-[#0B132B]/60 text-xs sm:text-sm mt-1 max-w-xl">
              {t('home.browse_by_type_sub')}
            </p>
          </div>

          {/* Sleek Carousel Arrows */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous property type"
              className={cn(
                "w-8 h-8 rounded-full border border-[#BA7517]/25 flex items-center justify-center transition-all duration-200",
                canScrollLeft
                  ? "bg-white text-[#0B132B] shadow-xs hover:border-[#BA7517] hover:bg-[#BA7517] hover:text-white cursor-pointer"
                  : "bg-white/40 text-[#0B132B]/20 border-gray-200 cursor-not-allowed"
              )}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next property type"
              className={cn(
                "w-8 h-8 rounded-full border border-[#BA7517]/25 flex items-center justify-center transition-all duration-200",
                canScrollRight
                  ? "bg-white text-[#0B132B] shadow-xs hover:border-[#BA7517] hover:bg-[#BA7517] hover:text-white cursor-pointer"
                  : "bg-white/40 text-[#0B132B]/20 border-gray-200 cursor-not-allowed"
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 sm:space-x-5 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scroll-smooth scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROPERTY_TYPES.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedType(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedType(item);
                }
              }}
              className="group w-[205px] sm:w-[225px] md:w-[245px] shrink-0 snap-start flex flex-col cursor-pointer focus:outline-none"
            >
              {/* Image Container with Elegant Rounded Corners & Zoom */}
              <div className="relative h-36 sm:h-40 md:h-44 w-full rounded-2xl overflow-hidden bg-stone-900 shadow-xs ring-1 ring-black/5 group-hover:shadow-md transition-shadow duration-300">
                <img
                  src={item.image}
                  onError={(e) => {
                    if (e.currentTarget.src !== item.fallback) {
                      e.currentTarget.src = item.fallback;
                    }
                  }}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                />
                
                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill Tag */}
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/10 shadow-xs">
                  {item.category}
                </div>

                {/* Subtle Price Tag */}
                <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#0B132B] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  from {formatCurrency(item.priceFrom)}
                </div>
              </div>

              {/* Card Meta - Compact and elegant */}
              <div className="pt-2.5 px-0.5 flex flex-col">
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#0B132B] group-hover:text-[#BA7517] transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-[11px] sm:text-xs text-[#0B132B]/55 font-medium mt-0.5">
                  {item.count} stays available
                </p>

                {/* Evocative Vibe teaser */}
                <p className="text-[11px] text-[#0B132B]/70 line-clamp-2 mt-1.5 leading-snug italic border-l border-[#BA7517]/40 pl-2">
                  "{item.vibe}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type Preview Modal / Drawer */}
      {selectedType && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedType(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#BA7517]/30 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={selectedType.image}
                onError={(e) => {
                  if (e.currentTarget.src !== selectedType.fallback) {
                    e.currentTarget.src = selectedType.fallback;
                  }
                }}
                alt={selectedType.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/50 to-transparent" />
              
              <button
                onClick={() => setSelectedType(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/70 flex items-center justify-center transition-colors cursor-pointer border border-white/20"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-[#BA7517] text-[10px] font-bold uppercase tracking-widest bg-[#0B132B]/80 px-2.5 py-0.5 rounded-full border border-white/10 mb-2 inline-block">
                  {selectedType.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  {selectedType.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  Typical region: {selectedType.setting}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="bg-[#BA7517]/10 border border-[#BA7517]/20 p-4 sm:p-5 rounded-2xl">
                <p className="text-[#BA7517] text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Sparkles size={14} />
                  <span>The Vibe</span>
                </p>
                <p className="text-[#0B132B] text-sm sm:text-base leading-relaxed italic">
                  "{selectedType.vibe}"
                </p>
              </div>

              {/* Sample Verified Stays */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B132B] mb-3">
                  Verified {selectedType.title} Stays
                </h4>

                <div className="space-y-3">
                  {matchingCamps.map((camp) => (
                    <div
                      key={camp.id}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#BA7517]/15 shadow-sm hover:border-[#BA7517]/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-serif font-bold text-[#0B132B] text-base">
                            {camp.name}
                          </h5>
                          <VerificationBadge tier={camp.verification_tier} />
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-[#0B132B]/60">
                          <MapPin size={12} className="text-[#BA7517]" />
                          <span className="capitalize">{camp.destination} Desert</span>
                          <span>•</span>
                          <span className="font-semibold text-[#0B132B]">{formatCurrency(camp.price_per_night)}/night</span>
                        </div>
                      </div>

                      <Link
                        to={`/camps/${camp.slug}`}
                        onClick={() => setSelectedType(null)}
                        className="px-4 py-2 bg-[#0B132B] text-white hover:bg-[#BA7517] text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center space-x-1.5"
                      >
                        <span>View Stay</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#BA7517]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#0B132B]/60 flex items-center space-x-1.5">
                <ShieldCheck size={16} className="text-[#BA7517]" />
                <span>All {selectedType.title} properties physically inspected & certified.</span>
              </div>
              <Link
                to="/compare"
                onClick={() => setSelectedType(null)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#BA7517] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#A36413] transition-colors text-center"
              >
                Compare All Desert Stays
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
