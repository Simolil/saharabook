import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  getProgramBySlug, 
  STRUCTURED_PROGRAMS, 
  StructuredDesertProgram 
} from '@/src/data/bivouacNomadesPrograms';
import { 
  Star, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  X, 
  Share2, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  Copy, 
  MessageCircle,
  HelpCircle,
  Car,
  Compass,
  Sparkles,
  Luggage,
  Sun
} from 'lucide-react';
import BackButton from '@/src/components/BackButton';
import { formatCurrency, cn } from '@/src/lib/utils';
import MoroccanGateArch from '@/src/components/MoroccanGateArch';

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const program: StructuredDesertProgram = useMemo(() => {
    return getProgramBySlug(slug || '') || STRUCTURED_PROGRAMS[0];
  }, [slug]);

  // Booking Form State
  const [selectedDate, setSelectedDate] = useState('2026-10-18');
  const [guests, setGuests] = useState(2);
  const [copiedShare, setCopiedShare] = useState(false);

  // Pricing
  const totalAmount = program.pricePerPerson * guests;

  // Share Handlers
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://www.dunecamps.com${program.path}`;
  const whatsappShareText = encodeURIComponent(
    `Check out this verified ${program.title} (${program.pricePerPerson} €/pers) from Foum Zguid to Erg Chegaga on Dunecamps: ${currentUrl}`
  );

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleProceedBooking = () => {
    navigate(`/book/${program.campSlug}?program=${encodeURIComponent(program.id)}&programName=${encodeURIComponent(program.title)}&guests=${guests}&date=${selectedDate}`);
  };

  // Structured Data Schema for Search Engines (TouristTrip & Product)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": program.title,
    "description": program.metaDescription,
    "touristType": ["Adventure", "Cultural"],
    "offers": {
      "@type": "Offer",
      "price": program.pricePerPerson,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": currentUrl,
      "validFrom": "2026-01-01"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Dunecamps Verified Desert Outposts",
      "url": "https://www.dunecamps.com"
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": program.itinerary.map((day, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": `Day ${day.day}: ${day.title}`,
        "description": day.description
      }))
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24 lg:pb-16 text-[#0B132B]">
      <Helmet>
        <title>{program.seoTitle} | Dunecamps</title>
        <meta name="description" content={program.metaDescription} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={program.seoTitle} />
        <meta property="og:description" content={program.metaDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={program.image} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Top Breadcrumb Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <BackButton />
          
          {/* Breadcrumb Path */}
          <nav className="hidden sm:flex items-center space-x-2 text-xs text-stone-500 font-medium">
            <Link to="/" className="hover:text-[#BA7517]">Home</Link>
            <ChevronRight size={12} />
            <Link to="/destinations/foum-zguid" className="hover:text-[#BA7517]">Foum Zguid</Link>
            <ChevronRight size={12} />
            <Link to={`/camps/${program.campSlug}`} className="hover:text-[#BA7517]">{program.campName}</Link>
            <ChevronRight size={12} />
            <span className="text-[#0B132B] font-bold truncate max-w-[200px]">{program.title}</span>
          </nav>

          {/* Social Share & WhatsApp Action */}
          <div className="flex items-center space-x-2">
            <a
              href={`https://wa.me/?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
              title="Share verified link on WhatsApp"
            >
              <MessageCircle size={14} />
              <span>Share on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="p-1.5 rounded-xl bg-white border border-stone-200 hover:border-[#BA7517] text-stone-600 hover:text-[#BA7517] transition-colors"
              title="Copy shareable link"
            >
              {copiedShare ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#0B132B] h-72 sm:h-96 md:h-[420px] shadow-lg border border-[#BA7517]/25">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Gate Arch Top */}
          <MoroccanGateArch fillColor="#0B132B" strokeColor="#BA7517" heightClass="h-7 sm:h-8" />

          {/* Header Overlay Content */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#BA7517] text-white">
                {program.durationLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20">
                {program.destination}
              </span>
              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-bold">
                <Star size={13} className="text-amber-400 fill-amber-400" />
                <span>{program.rating}</span>
                <span className="text-white/70 font-normal">({program.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight max-w-4xl drop-shadow-sm">
              {program.title}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-3xl line-clamp-2">
              {program.editorialSummary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Content (Left) & Sticky Booking Panel (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Editorial Content Column */}
          <div className="lg:col-span-2 space-y-10">

            {/* Quick Summary Strip */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#BA7517]/20 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
              <div className="pt-2 sm:pt-0 sm:px-3 first:pt-0 first:px-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Departure</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{program.startPoint}</p>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Expedition Length</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{program.durationLabel}</p>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Operator Base</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{program.campName}</p>
              </div>
              <div className="pt-2 sm:pt-0 sm:px-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Transport</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{program.transportType}</p>
              </div>
            </div>

            {/* Editorial Overview & Highlights */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-xs space-y-5">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                About This Sahara Expedition
              </h2>
              <p className="text-xs sm:text-sm text-[#0B132B]/85 leading-relaxed">
                {program.editorialSummary}
              </p>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#BA7517] block mb-3">
                  Key Experience Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {program.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#0B132B]/90 bg-[#FAF7F2] p-3 rounded-xl border border-[#BA7517]/15">
                      <Sparkles size={14} className="text-[#BA7517] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Day-by-Day Itinerary Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-xs space-y-6">
              <div className="flex items-center space-x-2">
                <Calendar size={18} className="text-[#BA7517]" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                  Day-by-Day Expedition Itinerary
                </h2>
              </div>

              <div className="space-y-6">
                {program.itinerary.map((day) => (
                  <div 
                    key={day.day}
                    className="relative pl-8 sm:pl-10 pb-6 last:pb-0 border-l-2 border-[#BA7517]/30 last:border-l-0"
                  >
                    {/* Circle Node */}
                    <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#0B132B] text-[#EF9F27] flex items-center justify-center font-bold text-xs shadow-md border-2 border-[#FAF7F2]">
                      D{day.day}
                    </div>

                    <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#BA7517]/15">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA7517]">
                            Day {day.day} • {day.location}
                          </span>
                        </div>
                        {day.mealsIncluded && day.mealsIncluded.length > 0 && (
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Meals: {day.mealsIncluded.join(', ')}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B132B] mb-2">
                        {day.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#0B132B]/80 leading-relaxed mb-4">
                        {day.description}
                      </p>

                      {day.activities && day.activities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-stone-200/60">
                          {day.activities.map((act, aIdx) => (
                            <span 
                              key={aIdx} 
                              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700"
                            >
                              • {act}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-xs space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                What's Included &amp; Excluded
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-3 pb-2 border-b border-emerald-200/70">
                    <Check size={16} className="text-emerald-700" />
                    <span>Included in Rate</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#0B132B]/85">
                    {program.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center space-x-2 text-stone-700 font-bold text-xs uppercase tracking-wider mb-3 pb-2 border-b border-stone-200">
                    <X size={16} className="text-stone-500" />
                    <span>Not Included</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#0B132B]/75">
                    {program.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Dunecamps Verification Notes (Answering inconsistencies before publishing) */}
            {program.operatorQuestions && program.operatorQuestions.length > 0 && (
              <section className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 text-amber-950 font-bold">
                  <AlertCircle size={20} className="text-amber-800" />
                  <h2 className="text-base sm:text-lg font-serif">
                    Dunecamps Verification &amp; Operator Clarity Notes
                  </h2>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  To ensure complete transparency and avoid common website discrepancies, our audit team verified the following program specifics directly with the camp operator:
                </p>

                <div className="space-y-3 pt-2">
                  {program.operatorQuestions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-white/90 p-4 rounded-xl border border-amber-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#0B132B] font-bold">{q.issue}</strong>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {q.status}
                        </span>
                      </div>
                      <p className="text-[#0B132B]/80 leading-relaxed">{q.clarification}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* "Good to Know" Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-xs space-y-6">
              <div className="flex items-center space-x-2">
                <HelpCircle size={18} className="text-[#BA7517]" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                  Good to Know Before You Go
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 space-y-1">
                  <span className="font-bold text-[#0B132B] block">📍 Meeting &amp; Depot</span>
                  <p className="text-[#0B132B]/80">{program.goodToKnow.meetingTime}</p>
                  <p className="text-[#0B132B]/80">{program.goodToKnow.meetingLocation}</p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 space-y-1">
                  <span className="font-bold text-[#0B132B] block">🧳 Luggage Policy</span>
                  <p className="text-[#0B132B]/80">{program.goodToKnow.luggagePolicy}</p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 space-y-1">
                  <span className="font-bold text-[#0B132B] block">🎒 What to Pack</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[#0B132B]/80">
                    {program.goodToKnow.whatToPack.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 space-y-1">
                  <span className="font-bold text-[#0B132B] block">📶 Cell &amp; Weather Notice</span>
                  <p className="text-[#0B132B]/80">{program.goodToKnow.connectivity}</p>
                  <p className="text-[#0B132B]/80 mt-1">{program.goodToKnow.weatherNotice}</p>
                </div>
              </div>
            </section>

            {/* Traveler Reviews Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star size={18} className="text-amber-400 fill-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                    Verified Traveler Reviews
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#BA7517]">{program.rating} / 5.0 Average</span>
              </div>

              <div className="space-y-4">
                {program.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <strong className="text-[#0B132B] font-bold">{rev.author}</strong>
                        <span className="text-stone-400">· {rev.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, rIdx) => (
                          <Star key={rIdx} size={12} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#0B132B]">{rev.title}</h4>
                    <p className="text-xs text-[#0B132B]/80 leading-relaxed italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-stone-400 block pt-1">{rev.date}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sticky Desktop Booking Panel */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-[#BA7517]/25 shadow-xl space-y-5">
              
              {/* Header Price */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#BA7517]/15">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 block">Operator Listed Rate</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-serif font-bold text-[#0B132B]">{program.pricePerPerson} €</span>
                    <span className="text-xs text-stone-600 font-medium">/ person</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-stone-100 text-stone-700 border border-stone-200 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Checked Oct 2026
                </span>
              </div>

              {/* Date & Guest Controls */}
              <div className="space-y-3">
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200/80">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/60 block mb-1">
                    Expedition Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs font-semibold text-[#0B132B] bg-transparent outline-none cursor-pointer"
                  />
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200/80">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/60 block mb-1">
                    Travelers / Guests
                  </label>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#0B132B]">
                    <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center font-bold hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="w-5 text-center">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center font-bold hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-[#0B132B]/80">
                <div className="flex justify-between">
                  <span>{program.pricePerPerson} € x {guests} {guests === 1 ? 'guest' : 'guests'}</span>
                  <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Dunecamps Booking Fee</span>
                  <span className="font-bold">Waived (€0)</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-base font-bold text-[#0B132B]">
                  <span>Total Amount</span>
                  <span className="text-2xl font-serif">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* Booking CTA */}
              <button
                type="button"
                onClick={handleProceedBooking}
                className="w-full bg-[#BA7517] hover:bg-[#9E6010] text-white text-center py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Book This Program ({formatCurrency(totalAmount)})</span>
                <ArrowRight size={16} />
              </button>

              {/* Share On WhatsApp Link */}
              <a
                href={`https://wa.me/?text=${whatsappShareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition-all flex items-center justify-center space-x-2 text-center"
              >
                <MessageCircle size={14} />
                <span>Share Program on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center space-x-1.5 text-xs text-stone-600 text-center">
                <Clock size={13} className="text-[#BA7517]" />
                <span>Rates listed by operator · Direct reservation confirmation</span>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Mobile Sticky Bottom Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#BA7517]/25 p-3.5 px-4 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-stone-500 block">Total ({guests} pers)</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-serif font-bold text-[#0B132B]">{formatCurrency(totalAmount)}</span>
            <span className="text-[10px] text-stone-500">({program.pricePerPerson}€/p)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`https://wa.me/?text=${whatsappShareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300"
            title="Share on WhatsApp"
          >
            <MessageCircle size={16} />
          </a>

          <button
            type="button"
            onClick={handleProceedBooking}
            className="px-5 py-3 rounded-xl bg-[#BA7517] hover:bg-[#9E6010] text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
          >
            <span>Book Now</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
