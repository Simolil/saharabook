import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  MapPin, 
  Compass, 
  Sun, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  Star, 
  Car, 
  Flame, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  SlidersHorizontal,
  Info,
  Calendar,
  Sparkles,
  Bath,
  Users,
  Clock,
  Navigation,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Rows,
  Tent
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '@/src/lib/utils';
import { 
  FOUM_ZGUID_HERO, 
  LOGISTICS_GRID, 
  FOUM_ZGUID_CATEGORIES, 
  FOUM_ZGUID_STAYS, 
  EXPERT_GUIDE_CONTENT, 
  REGIONAL_FAQS, 
  FoumZguidStay 
} from '@/src/data/foumZguidData';
import { FAQSchema } from '@/src/lib/seo';
import VerificationBadge from '@/src/components/VerificationBadge';
import BackButton from '@/src/components/BackButton';
import SearchBar from '@/src/components/SearchBar';
import FoumZguidRegionalMap from '@/src/components/FoumZguidRegionalMap';

export default function FoumZguidHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedStayForModal, setSelectedStayForModal] = useState<FoumZguidStay | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'distance'>('recommended');
  const [selectedCampForMap, setSelectedCampForMap] = useState<string>('bivouac-les-nomades');
  const [staysLayoutMode, setStaysLayoutMode] = useState<'carousel' | 'grid'>('carousel');

  // Horizontal Scroll Container Refs
  const staysScrollRef = useRef<HTMLDivElement | null>(null);
  const logisticsScrollRef = useRef<HTMLDivElement | null>(null);
  const categoriesScrollRef = useRef<HTMLDivElement | null>(null);
  const dispatchesScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollSection = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', distance = 380) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToMapCamp = (slug: string) => {
    setSelectedCampForMap(slug);
    const el = document.getElementById('foum-zguid-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredStays = useMemo(() => {
    let list = FOUM_ZGUID_STAYS;
    if (selectedCategory !== 'all') {
      list = list.filter(stay => stay.category === selectedCategory);
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price_per_night - b.price_per_night;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return b.rating - a.rating;
    });
  }, [selectedCategory, sortBy]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#0B132B]">
      {/* Dynamic SEO Meta */}
      <Helmet>
        <title>Foum Zguid & Erg Chigaga Gateway | Verified Desert Camps & Expeditions | Dunecamps</title>
        <meta 
          name="description" 
          content="The authoritative staging hub for Foum Zguid, Lake Iriki, and Erg Chigaga. 14 physically inspected deep-desert bivouacs, transparent 4x4 staging logistics, and zero OTA clutter." 
        />
        <meta property="og:title" content="Foum Zguid & Erg Chigaga Gateway | Dunecamps" />
        <meta property="og:description" content="Where paved roads end and the true Sahara begins. 14 verified camps, secure town parking, and Lake Iriki 4x4 transfers." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Structured FAQ Schema */}
      <FAQSchema faqs={REGIONAL_FAQS.map(f => ({ q: f.question, a: f.answer }))} />

      {/* Global Moorish Arch SVG Clip Path Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="moorish-arch-clip" clipPathUnits="objectBoundingBox">
            {/* Elegant Moroccan Pointed Horseshoe Arch */}
            <path d="M 0,1 L 0,0.36 C 0.02,0.32 0.06,0.26 0.08,0.18 C 0.12,0.07 0.28,0.008 0.485,0.001 C 0.495,0 0.505,0 0.515,0.001 C 0.72,0.008 0.88,0.07 0.92,0.18 C 0.94,0.26 0.98,0.32 1,0.36 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* =========================================================================
          1. THE HERO SECTION (Full Device Screen Viewport - Fits All Devices)
          ========================================================================= */}
      <section className="relative h-[100dvh] min-h-[600px] flex flex-col justify-between overflow-hidden bg-stone-950">
        {/* Wide Cinematic Background Photo - Vivid & Clearly Visible */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/destinations/foum_zguid_lake_iriki_hero.jpg" 
            onError={(e) => {
              if (e.currentTarget.src !== '/images/destinations/foumzguid.jpg') {
                e.currentTarget.src = '/images/destinations/foumzguid.jpg';
              }
            }}
            alt="4x4 tracks crossing the vast dry Lake Iriki clay bed meeting Erg Chigaga dunes under an amber sky"
            className="w-full h-full object-cover object-center transform scale-[1.01] filter brightness-[0.98] contrast-[1.04]"
          />
          {/* Lightened, subtle gradient overlays so the background photo shines through with clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-black/15 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-stone-950/70" />
        </div>

        {/* Top Bar: Exactly matching reference image with no header and clean top position */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <BackButton variant="dark" />
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-medium text-white/80 overflow-x-auto py-1 scrollbar-none">
              {FOUM_ZGUID_HERO.breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.label}>
                  {idx > 0 && <span className="text-white/40 select-none">/</span>}
                  {idx === FOUM_ZGUID_HERO.breadcrumbs.length - 1 ? (
                    <span className="text-[#EF9F27] font-semibold whitespace-nowrap">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-white transition-colors whitespace-nowrap">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white/90 text-xs shadow-sm">
            <ShieldCheck size={14} className="text-[#EF9F27]" />
            <span>Direct Deep-Desert Expedition Staging</span>
          </div>
        </div>

        {/* Center Content: Headline & Subheadline (Vertically centered) */}
        <div className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4 text-center my-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#EF9F27]/30 text-[#EF9F27] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-2 sm:mb-3 shadow-sm"
          >
            <Compass size={13} className="animate-spin-slow" />
            <span>Erg Chigaga & Lake Iriki Expedition Gateway</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-2 sm:mb-3 drop-shadow-lg"
          >
            Foum Zguid <span className="text-[#EF9F27] font-serif font-normal italic">&amp;</span> The Wild South
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/90 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto drop-shadow"
          >
            {FOUM_ZGUID_HERO.subHeadline}
          </motion.p>
        </div>

        {/* Bottom Hero Module: Elevated Search Navigation Bar */}
        <div className="relative z-20 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-1">
          <div className="w-full">
            <SearchBar defaultDestination="foumzguid" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          1.5 DEDICATED QUICK-FACTS STRIP (Dark Brown Saharan Earth Mood)
          ========================================================================= */}
      <section className="py-6 sm:py-8 bg-gradient-to-b from-[#1B110A] via-[#23160D] to-[#1B110A] text-white border-y border-[#BA7517]/30 relative z-10 shadow-xl overflow-hidden">
        {/* Subtle Warm Desert Amber Glow Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(186,117,23,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#120B06]/75 backdrop-blur-md border border-[#BA7517]/35 rounded-2xl p-4 sm:p-5 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#BA7517]/20">
              {FOUM_ZGUID_HERO.quickFacts.map((fact, idx) => (
                <div 
                  key={fact.label} 
                  className={`pt-3 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''} text-left flex items-start space-x-3`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#BA7517]/20 border border-[#BA7517]/40 flex items-center justify-center text-lg shrink-0 shadow-inner">
                    <span>{fact.icon}</span>
                  </div>
                  <div>
                    <div className="text-[#EF9F27] text-[11px] font-bold uppercase tracking-wider mb-0.5">
                      {fact.label}
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE OTA-KILLER LOGISTICS STRIP ("Know Before You Go")
          ========================================================================= */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-14 bg-gradient-to-b from-[#FAF7F2] to-[#F4EEE5] border-b border-[#BA7517]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Scroll Buttons for Mobile/Tablet */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="max-w-3xl text-left">
              <div className="inline-flex items-center space-x-2 text-[#BA7517] text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldAlert size={15} />
                <span>Know Before You Go • Deep-Desert Logistics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight">
                {LOGISTICS_GRID.headline}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#0B132B]/75 leading-relaxed">
                {LOGISTICS_GRID.subhead}
              </p>
            </div>

            {/* Scroll Navigation on Mobile/Tablet */}
            <div className="flex md:hidden items-center space-x-2 self-end">
              <span className="text-[11px] text-[#0B132B]/60 font-medium">Swipe cards &rarr;</span>
              <button 
                type="button"
                onClick={() => scrollSection(logisticsScrollRef, 'left', 300)}
                className="w-8 h-8 rounded-full bg-white text-[#0B132B] border border-stone-200 flex items-center justify-center shadow-xs cursor-pointer"
                title="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                type="button"
                onClick={() => scrollSection(logisticsScrollRef, 'right', 300)}
                className="w-8 h-8 rounded-full bg-white text-[#0B132B] border border-stone-200 flex items-center justify-center shadow-xs cursor-pointer"
                title="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Three-Column Horizontal Snap Track */}
          <div 
            ref={logisticsScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {LOGISTICS_GRID.columns.map((col, idx) => (
              <div 
                key={col.title}
                className="w-[285px] sm:w-[330px] md:w-auto shrink-0 md:shrink snap-start bg-white rounded-2xl p-6 sm:p-7 border border-[#BA7517]/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle Moroccan motif backdrop watermark */}
                <div className="absolute -right-4 -bottom-4 text-[#BA7517]/5 pointer-events-none">
                  <Compass size={120} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-[#BA7517]/10 text-[#BA7517] font-bold text-xs flex items-center justify-center font-mono">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-[#BA7517] uppercase tracking-wider bg-[#BA7517]/10 px-2.5 py-0.5 rounded-full">
                      {col.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#0B132B] mb-3">
                    {col.title}
                  </h3>

                  <p className="text-sm text-[#0B132B]/80 leading-relaxed mb-4">
                    {col.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#BA7517]/10 flex items-center space-x-2 text-xs font-semibold text-[#0B132B]/90">
                  <Check size={14} className="text-[#BA7517] shrink-0" />
                  <span>{col.bullet}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Regional Map Section */}
          <div id="foum-zguid-map" className="mt-8 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA7517] block">
                  Route &amp; Stays Map
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                  Marrakech to Foum Zguid Highway &amp; Lodge Locations
                </h3>
                <p className="text-xs text-[#0B132B]/70 mt-0.5">
                  Follow the scenic paved road from Marrakech through the High Atlas, then click any lodge to find its exact location, coordinates, and desert transfer.
                </p>
              </div>
            </div>

            <FoumZguidRegionalMap 
              initialSelectedSlug={selectedCampForMap} 
            />
          </div>
        </div>
      </section>



      {/* =========================================================================
          3. REGIONAL PROPERTY CATEGORIES (Using Moorish Arch Masking)
          ========================================================================= */}
      <section className="pt-12 sm:pt-14 pb-8 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[#BA7517] text-xs font-bold uppercase tracking-widest mb-1">
                Architectural Taxonomy
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B]">
                Regional Property Categories
              </h2>
            </div>

            {/* Sorting control */}
            <div className="flex items-center space-x-2 text-xs font-medium text-[#0B132B]/70 self-start md:self-auto">
              <SlidersHorizontal size={14} className="text-[#BA7517]" />
              <span>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#BA7517]/25 rounded-lg px-2.5 py-1 text-xs font-semibold text-[#0B132B] focus:outline-none focus:ring-1 focus:ring-[#BA7517]"
              >
                <option value="recommended">Highest Rated &amp; Verified</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="distance">Distance from Town Staging</option>
              </select>
            </div>
          </div>

          {/* Interactive filter pills styled with architectural context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {FOUM_ZGUID_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={cn(
                    "text-left p-4 rounded-none border transition-all duration-300 relative group cursor-pointer",
                    isActive
                      ? "bg-[#0B132B] text-white border-[#BA7517] shadow-lg ring-1 ring-[#BA7517]/40"
                      : "bg-white hover:bg-[#FAF7F2] text-[#0B132B] border-[#BA7517]/20 hover:border-[#BA7517]/50 shadow-xs"
                  )}
                >
                  {/* Subtle Moorish arch micro-indicator on top */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none font-mono",
                      isActive ? "bg-[#BA7517] text-white" : "bg-[#BA7517]/10 text-[#BA7517]"
                    )}>
                      {cat.count} Stays
                    </span>

                    {/* Moorish Arch Silhouette Icon */}
                    <svg viewBox="0 0 24 24" className={cn("w-4 h-4", isActive ? "text-[#EF9F27]" : "text-[#BA7517]/40")}>
                      <path 
                        d="M 4 20 L 4 10 C 4 7 7 3 12 2 C 17 3 20 7 20 10 L 20 20 Z" 
                        fill="currentColor" 
                        opacity="0.9"
                      />
                    </svg>
                  </div>

                  <h3 className={cn(
                    "text-base font-serif font-bold mb-1 group-hover:text-[#EF9F27] transition-colors",
                    isActive ? "text-[#EF9F27]" : "text-[#0B132B]"
                  )}>
                    {cat.label}
                  </h3>

                  <p className={cn(
                    "text-xs leading-relaxed line-clamp-2",
                    isActive ? "text-white/75" : "text-[#0B132B]/60"
                  )}>
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. THE CURATED PROPERTY SHOWCASE (Horizontal Scroll Carousel)
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Bar & Layout Switcher & Left/Right Scroll Controls (DIRECTLY ABOVE PROPERTY CARDS SCROLL) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#BA7517]/15 mb-5 gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-[#0B132B]">
                Showing {filteredStays.length} Verified Properties
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs text-[#BA7517] hover:underline font-semibold ml-2 cursor-pointer"
                >
                  (Clear filter)
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2.5 self-end sm:self-auto">
              {/* Layout Mode Switcher */}
              <div className="bg-stone-200/90 p-0.5 rounded-xl border border-stone-300 flex items-center space-x-0.5 text-xs">
                <button
                  onClick={() => setStaysLayoutMode('carousel')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 cursor-pointer",
                    staysLayoutMode === 'carousel'
                      ? "bg-[#0B132B] text-white shadow-xs"
                      : "text-[#0B132B]/70 hover:text-[#0B132B]"
                  )}
                  title="Horizontal scroll view"
                >
                  <Rows size={13} />
                  <span>Scroll</span>
                </button>
                <button
                  onClick={() => setStaysLayoutMode('grid')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold transition-all flex items-center space-x-1 cursor-pointer",
                    staysLayoutMode === 'grid'
                      ? "bg-[#0B132B] text-white shadow-xs"
                      : "text-[#0B132B]/70 hover:text-[#0B132B]"
                  )}
                  title="Full grid view"
                >
                  <LayoutGrid size={13} />
                  <span>Grid</span>
                </button>
              </div>

              {/* Left / Right Carousel Controls */}
              {staysLayoutMode === 'carousel' && (
                <div className="flex items-center space-x-1">
                  <button 
                    type="button"
                    onClick={() => scrollSection(staysScrollRef, 'left', 310)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF7F2] text-[#0B132B] border border-stone-300 flex items-center justify-center shadow-xs cursor-pointer"
                    title="Previous stays"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => scrollSection(staysScrollRef, 'right', 310)}
                    className="w-8 h-8 rounded-full bg-white hover:bg-[#FAF7F2] text-[#0B132B] border border-stone-300 flex items-center justify-center shadow-xs cursor-pointer"
                    title="Next stays"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stays Container: Balanced, Phone-Optimized Cards with Key Information */}
          <div 
            ref={staysScrollRef}
            className={cn(
              staysLayoutMode === 'carousel'
                ? "flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            )}
          >
            {filteredStays.map((stay) => {
              const isBivouacLesNomades = stay.slug === 'bivouac-les-nomades';
              return (
                <article
                  key={stay.id}
                  className={cn(
                    "group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#BA7517]/20 shadow-xs hover:shadow-xl hover:border-[#BA7517]/40 transition-all duration-300 flex flex-col justify-between",
                    staysLayoutMode === 'carousel' ? "w-[270px] sm:w-[295px] md:w-[320px] shrink-0 snap-start" : "w-full",
                    isBivouacLesNomades ? "ring-2 ring-[#BA7517] shadow-md" : ""
                  )}
                >
                  {/* Top: Photo Area with Status & Overlay */}
                  <div>
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-900">
                      <motion.img 
                        layoutId={`camp-hero-${stay.slug}`}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        src={stay.image} 
                        onError={(e) => {
                          if (e.currentTarget.src !== stay.fallbackImage) {
                            e.currentTarget.src = stay.fallbackImage;
                          }
                        }}
                        alt={stay.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <VerificationBadge tier={stay.verification_tier} compact />
                      </div>

                      {/* Category Pill */}
                      <div className="absolute top-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#EF9F27] border border-[#EF9F27]/30 uppercase tracking-wider">
                        {stay.categoryLabel}
                      </div>

                      {/* Bottom Overlay: Price & Rating */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white z-10">
                        <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span>{stay.rating}</span>
                          <span className="text-white/70 text-[10px]">({stay.reviewCount})</span>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0B132B] shadow-sm">
                          From {formatCurrency(stay.price_per_night)} <span className="text-[10px] text-[#0B132B]/60 font-normal">/ nt</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body with Key Info */}
                    <div className="p-4 text-left flex flex-col justify-between flex-1">
                      <div>
                        {/* Tent Style / Suite Type */}
                        <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-[#BA7517] mb-1">
                          <Tent size={13} className="shrink-0" />
                          <span className="truncate">{stay.tentType || 'Saharan Canvas Suite'}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-serif font-bold text-[#0B132B] group-hover:text-[#BA7517] transition-colors line-clamp-1 mb-1.5 leading-snug">
                          <Link to={`/camps/${stay.slug}`} title={stay.name}>
                            {stay.name}
                          </Link>
                        </h3>

                        {/* Distance & Terrain */}
                        <div className="flex items-center text-xs text-[#0B132B]/75 gap-1.5 mb-3">
                          <Navigation size={12} className="text-[#BA7517] shrink-0" />
                          <span className="truncate font-medium">
                            {stay.distanceKm > 0 ? `${stay.distanceKm} km off-road via Lake Iriki` : 'Direct road access in town'}
                          </span>
                        </div>

                        {/* Key Highlights / Included Extras */}
                        {stay.includedExtras && stay.includedExtras.length > 0 && (
                          <div className="space-y-1.5 pt-2.5 pb-3 border-t border-stone-100 text-xs text-[#0B132B]/80">
                            {stay.includedExtras.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="flex items-start space-x-1.5 leading-tight">
                                <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-1 text-[11px] font-medium">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleScrollToMapCamp(stay.slug);
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-[#BA7517] bg-[#BA7517]/10 hover:bg-[#BA7517] hover:text-white transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
                          title="Locate exact pin on regional map"
                        >
                          <MapPin size={12} />
                          <span>Map</span>
                        </button>

                        <Link
                          to={`/camps/${stay.slug}`}
                          className="flex-1 text-center py-2 px-3 bg-[#0B132B] hover:bg-[#BA7517] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-xs"
                        >
                          <span>View Sanctuary</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Carousel Helper & Dot Strip */}
          {staysLayoutMode === 'carousel' && (
            <div className="mt-4 pt-3 border-t border-[#BA7517]/15 flex items-center justify-between gap-3 text-xs text-[#0B132B]/60">
              <span className="text-[11px] font-medium">
                &larr; Swipe to explore all {filteredStays.length} verified stays &rarr;
              </span>
              <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
                {filteredStays.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (staysScrollRef.current) {
                        staysScrollRef.current.scrollTo({ left: idx * 295, behavior: 'smooth' });
                      }
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-stone-300 hover:bg-[#BA7517] transition-colors cursor-pointer"
                    title={s.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>


      {/* =========================================================================
          5. LOCAL EXPERT GUIDE & REGION LORE
          ========================================================================= */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#FAF7F2] border-t border-[#BA7517]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 bg-[#BA7517]/15 border border-[#BA7517]/30 rounded-full text-[#BA7517] text-[10px] font-bold uppercase tracking-widest mb-3">
              Editorial Authority &amp; Field Lore
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#0B132B] tracking-tight mb-4">
              {EXPERT_GUIDE_CONTENT.subheading}
            </h2>
            <div className="w-20 h-1 bg-[#BA7517] mx-auto rounded-full mb-6" />
            <p className="text-base sm:text-lg text-[#0B132B]/85 leading-relaxed font-serif italic">
              "{EXPERT_GUIDE_CONTENT.bodyCopy}"
            </p>
          </div>

          {/* Three Detailed Field Dispatches Header & Controls */}
          <div className="flex items-center justify-between mt-10 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#BA7517]">
              Field Lore Dispatches
            </span>
            <div className="flex md:hidden items-center space-x-2">
              <span className="text-[11px] text-[#0B132B]/60 font-medium">Swipe dispatches &rarr;</span>
              <button 
                type="button"
                onClick={() => scrollSection(dispatchesScrollRef, 'left', 300)}
                className="w-7 h-7 rounded-full bg-white text-[#0B132B] border border-stone-200 flex items-center justify-center shadow-xs cursor-pointer"
                title="Previous"
              >
                <ChevronLeft size={14} />
              </button>
              <button 
                type="button"
                onClick={() => scrollSection(dispatchesScrollRef, 'right', 300)}
                className="w-7 h-7 rounded-full bg-white text-[#0B132B] border border-stone-200 flex items-center justify-center shadow-xs cursor-pointer"
                title="Next"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Three Detailed Field Dispatches in Horizontal Snap Track */}
          <div 
            ref={dispatchesScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {EXPERT_GUIDE_CONTENT.deepDives.map((item, idx) => (
              <div 
                key={item.title}
                className="w-[285px] sm:w-[330px] md:w-auto shrink-0 md:shrink snap-start bg-white p-6 rounded-2xl border border-[#BA7517]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#BA7517]/10 text-[#BA7517] flex items-center justify-center font-bold text-xs mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#0B132B] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0B132B]/75 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>


          {/* Physical Audit Stamp Banner */}
          <div className="mt-12 bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border border-[#BA7517]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-[#BA7517]/20 border border-[#BA7517]/40 flex items-center justify-center shrink-0">
                <ShieldCheck size={28} className="text-[#EF9F27]" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-serif font-bold text-white">
                  The Dunecamps Physical Inspection Standard
                </h4>
                <p className="text-xs text-white/70 max-w-xl mt-1">
                  We refuse 7 out of 10 camps that apply. Every camp in Foum Zguid is personally tested for clean private flush toilets, reliable hot water, genuine nomadic heritage, and legal off-road licenses.
                </p>
              </div>
            </div>
            <Link
              to="/scam-guide"
              className="shrink-0 px-6 py-3 bg-[#BA7517] hover:bg-[#EF9F27] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center space-x-2"
            >
              <span>Read Scam Guide</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. REGIONAL FAQ SECTION (Collapsible Accordions)
          ========================================================================= */}
      <section id="faqs" className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#BA7517]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-[#BA7517] text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle size={15} />
              <span>Traveler Clarity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
              Frequently Asked Questions: Foum Zguid &amp; Erg Chigaga
            </h2>
            <p className="mt-2 text-sm text-[#0B132B]/70">
              Clear answers to the most common questions before heading into the wild south.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {REGIONAL_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={faq.question}
                  className="bg-white rounded-2xl border border-[#BA7517]/20 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    type="button"
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#BA7517]/30"
                  >
                    <span className="text-base sm:text-lg font-serif font-semibold text-[#0B132B]">
                      {faq.question}
                    </span>
                    <span className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                      isOpen ? "bg-[#BA7517] text-white rotate-180" : "bg-[#FAF7F2] text-[#BA7517]"
                    )}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-sm text-[#0B132B]/80 leading-relaxed border-t border-[#BA7517]/10 pt-4">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Help Contact Banner */}
          <div className="mt-12 text-center p-6 bg-[#BA7517]/10 rounded-2xl border border-[#BA7517]/25">
            <p className="text-sm font-semibold text-[#0B132B]">
              Need specialized convoy or custom expedition advice?
            </p>
            <p className="text-xs text-[#0B132B]/70 mt-1 mb-4">
              Our Foum Zguid ground coordinators can confirm seasonal track conditions across Lake Iriki.
            </p>
            <Link
              to="/partners"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0B132B] hover:bg-[#BA7517] text-white text-xs font-bold rounded-lg transition-colors"
            >
              <span>Contact Ground Team</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
