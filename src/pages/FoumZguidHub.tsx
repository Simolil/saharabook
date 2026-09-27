import React, { useState, useMemo } from 'react';
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
  Navigation
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

export default function FoumZguidHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedStayForModal, setSelectedStayForModal] = useState<FoumZguidStay | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'distance'>('recommended');

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
            src="/src/assets/images/foum_zguid_lake_iriki_hero_1790326234555.jpg" 
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
          {/* Header */}
          <div className="max-w-3xl mb-10 text-left">
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

          {/* Three-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {LOGISTICS_GRID.columns.map((col, idx) => (
              <div 
                key={col.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#BA7517]/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
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

          {/* Quick Assurance Strip */}
          <div className="mt-8 bg-[#0B132B] text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-full bg-[#BA7517]/20 border border-[#BA7517]/40 flex items-center justify-center shrink-0">
                <Car size={18} className="text-[#EF9F27]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Rental Car Driving To Foum Zguid?</p>
                <p className="text-xs text-white/70">Paved roads lead all the way to town. Secure guarded parking is arranged for all 14 stays below.</p>
              </div>
            </div>
            <a 
              href="#faqs" 
              className="shrink-0 px-4 py-2 bg-white/10 hover:bg-white/20 text-[#EF9F27] text-xs font-bold rounded-lg border border-[#EF9F27]/30 transition-colors flex items-center space-x-1.5"
            >
              <span>Read Vehicle FAQ</span>
              <ArrowRight size={13} />
            </a>
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
          4. THE CURATED PROPERTY GRID
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Bar & Count Feedback */}
          <div className="flex items-center justify-between pb-6 border-b border-[#BA7517]/15 mb-8">
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

            <div className="flex items-center space-x-2 text-xs text-[#0B132B]/60">
              <ShieldCheck size={14} className="text-[#BA7517]" />
              <span className="hidden sm:inline">100% Physically Inspected On-Site</span>
            </div>
          </div>

          {/* Clean, Asymmetric Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStays.map((stay, index) => {
              const isFirstSpecial = index === 0;
              return (
                <article
                  key={stay.id}
                  className={cn(
                    "group bg-white rounded-3xl overflow-hidden border border-[#BA7517]/20 shadow-sm hover:shadow-2xl hover:border-[#BA7517]/40 transition-all duration-500 flex flex-col justify-between",
                    isFirstSpecial ? "md:col-span-2 lg:col-span-1 ring-1 ring-[#BA7517]/30" : ""
                  )}
                >
                  {/* Top: Moorish Arch Masked Image Area */}
                  <div>
                    <div className="relative p-3 pb-0 bg-gradient-to-b from-[#F7EFE4] to-white">
                      {/* Moorish Arch Container */}
                      <div 
                        className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900 shadow-inner"
                        style={{
                          clipPath: 'url(#moorish-arch-clip)',
                          WebkitClipPath: 'url(#moorish-arch-clip)'
                        }}
                      >
                        <img 
                          src={stay.image} 
                          onError={(e) => {
                            if (e.currentTarget.src !== stay.fallbackImage) {
                              e.currentTarget.src = stay.fallbackImage;
                            }
                          }}
                          alt={stay.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        {/* Soft architectural dark vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 z-10">
                          <VerificationBadge tier={stay.verification_tier} />
                        </div>

                        {stay.highlightPill && (
                          <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#EF9F27] border border-[#EF9F27]/30 uppercase tracking-wider">
                            {stay.highlightPill}
                          </div>
                        )}

                        {/* Bottom Overlay Info on Image */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                          <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs">
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            <span className="font-bold">{stay.rating}</span>
                            <span className="text-white/60 text-[10px]">({stay.reviewCount})</span>
                          </div>

                          <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0B132B] shadow">
                            From {formatCurrency(stay.price_per_night)} <span className="text-[10px] text-[#0B132B]/60 font-medium">/ night</span>
                          </div>
                        </div>
                      </div>

                      {/* Delicate Moorish Keystone Arch Filigree Line (Golden architectural crown) */}
                      <div className="w-full flex justify-center -mt-0.5 pointer-events-none">
                        <div className="w-12 h-1 bg-[#BA7517]/40 rounded-full" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 text-left">
                      {/* Physical Inspection Badge (Specific to prompt blueprint) */}
                      <div className="flex items-center space-x-1.5 text-emerald-700 text-[11px] font-bold tracking-wide mb-2">
                        <Check size={14} className="text-emerald-600 stroke-[3]" />
                        <span>Physically Inspected &amp; Verified</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-serif font-bold text-[#0B132B] group-hover:text-[#BA7517] transition-colors leading-snug mb-2">
                        <Link to={`/camps/${stay.slug}`}>
                          {stay.name}
                        </Link>
                      </h3>

                      {/* Sub-detail */}
                      <p className="text-xs font-semibold text-[#0B132B]/80 mb-4 pb-3 border-b border-[#BA7517]/10 flex items-center gap-1.5">
                        <Navigation size={13} className="text-[#BA7517] shrink-0" />
                        <span>{stay.subDetail}</span>
                      </p>

                      {/* Included Extras */}
                      <div className="mb-4">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[#BA7517] mb-2">
                          Included Extras:
                        </p>
                        <ul className="space-y-1.5">
                          {stay.includedExtras.slice(0, 3).map((extra, idx) => (
                            <li key={idx} className="flex items-start text-xs text-[#0B132B]/75 leading-tight">
                              <span className="text-[#BA7517] mr-2 text-xs">✦</span>
                              <span>{extra}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Logistics Assurance Tag */}
                      <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#BA7517]/15 text-[11px] text-[#0B132B]/75 flex items-start space-x-2">
                        <Car size={13} className="text-[#BA7517] shrink-0 mt-0.5" />
                        <span className="leading-tight">{stay.transferDetails}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Footer */}
                  <div className="px-6 py-4 bg-gradient-to-t from-[#0B132B] via-[#14213D] to-[#1D2D50] border-t border-[#BA7517]/20 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#EF9F27]">
                        {stay.categoryLabel}
                      </span>
                      <p className="text-xs text-white/80 font-medium">
                        {stay.distanceKm > 0 ? `${stay.distanceKm} km off-road` : 'Direct road access'}
                      </p>
                    </div>

                    <Link
                      to={`/camps/${stay.slug}`}
                      className="inline-flex items-center space-x-1.5 bg-[#BA7517] hover:bg-[#EF9F27] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md group-hover:translate-x-0.5"
                    >
                      <span>View Sanctuary</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
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

          {/* Three Detailed Field Dispatches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {EXPERT_GUIDE_CONTENT.deepDives.map((item, idx) => (
              <div 
                key={item.title}
                className="bg-white p-6 rounded-2xl border border-[#BA7517]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#BA7517]/10 text-[#BA7517] flex items-center justify-center font-bold text-xs mb-4">
                    {idx + 1}
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
