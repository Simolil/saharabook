import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Share2, 
  Heart, 
  Calendar, 
  Users, 
  Car, 
  VolumeX, 
  Flame, 
  Moon, 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Tent, 
  Bath, 
  Zap, 
  Compass, 
  Lock,
  ArrowRight,
  Plus,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import BackButton from '@/src/components/BackButton';
import { mockCamps } from '@/src/lib/mockData';
import VerificationBadge from '@/src/components/VerificationBadge';
import { getCampImage, getCampFallbackImage } from '@/src/components/CampCard';
import { formatCurrency, cn } from '@/src/lib/utils';
import { LodgingBusinessSchema } from '@/src/lib/seo';
import { useLanguage } from '@/src/lib/LanguageContext';
import { TentOptionItem } from '@/src/types';

export default function CampDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Find camp or fallback to the first camp
  const camp = mockCamps.find(c => c.slug === slug) || mockCamps[0];

  // Gallery Photos (fallback if none specified)
  const photos = useMemo(() => {
    const mainImg = getCampImage(camp);
    const fallbacks = [
      "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1200",
      "https://images.unsplash.com/photo-1489493585363-d6943649ef91?q=80&w=1200",
      "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1200",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200"
    ];
    if (camp.images && camp.images.length > 0) {
      return [mainImg, ...camp.images.slice(1)];
    }
    return [mainImg, ...fallbacks];
  }, [camp]);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Tent options available
  const tentOptions: TentOptionItem[] = useMemo(() => {
    if (camp.tent_options && camp.tent_options.length > 0) {
      return camp.tent_options;
    }
    return [
      {
        id: 'standard-suite',
        name: 'Classic Berber Tent Suite',
        description: 'Authentic canvas tent with private en-suite bathroom, handwoven nomad carpets, and solar illumination.',
        bed_type: '1 Queen Bed or 2 Twins',
        capacity: 2,
        price_per_night: camp.price_per_night,
        image: photos[0],
        features: ['Private En-suite Shower', 'Moroccan Wool Blankets', '24/7 Solar USB', 'Complimentary Breakfast']
      }
    ];
  }, [camp, photos]);

  // Selected tent state
  const [selectedTentId, setSelectedTentId] = useState<string>(tentOptions[0].id);
  const currentTent = tentOptions.find(t => t.id === selectedTentId) || tentOptions[0];

  // Interactive Booking Widget State
  const [checkIn, setCheckIn] = useState('2026-10-14');
  const [checkOut, setCheckOut] = useState('2026-10-16');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  // Add-ons state
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    transfer: false,
    quad: false,
    stargazing: false
  });

  const addonPrices = {
    transfer: 60, // Fixed per party
    quad: 50 * guests, // Per guest
    stargazing: 25 * guests // Per guest
  };

  const toggleAddon = (key: string) => {
    setSelectedAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Price calculations
  const tentRateTotal = currentTent.price_per_night * nights;
  const ecoTaxes = 3.5 * guests * nights;
  const addonsTotal = 
    (selectedAddons.transfer ? addonPrices.transfer : 0) +
    (selectedAddons.quad ? addonPrices.quad : 0) +
    (selectedAddons.stargazing ? addonPrices.stargazing : 0);

  const grandTotal = tentRateTotal + ecoTaxes + addonsTotal;

  // Handle reserve click
  const handleReserve = () => {
    navigate(`/book/${camp.slug}?tent=${selectedTentId}&guests=${guests}&nights=${nights}`);
  };

  // Trust bar data
  const trustBar = camp.trust_bar || {
    accommodation_type: "Deep Sahara Bivouac",
    facilities: "Private En-Suite Flush Toilet & Hot Shower",
    power: "Solar Electricity (24/7 USB charging)",
    included: "Sunset Camel Trek & Traditional Dinner"
  };

  // Logistics data
  const logistics = camp.logistics || {
    meeting_point: "Secure vehicle parking available in town, followed by a guided 4x4 dune transfer across the desert floor.",
    transfer_type: "Private 4x4 Land Cruiser transfer",
    transfer_included: true,
    transfer_cost: "Included complimentary with booking",
    drive_time_from_marrakech: "Approx. 5.5 hours",
    parking_info: "Gated private depot with 24/7 on-site attendant",
    road_type: "Paved road to meeting point, followed by desert dune track"
  };

  // Editorial Narrative
  const narrative = camp.editorial_narrative || {
    arrival: "Your expedition begins where paved civilisation halts. Boarding a private 4x4, you traverse desert reg before the towering golden crests loom against the horizon. Warm mint tea and almond dates welcome your arrival.",
    evening: "As dusk transforms the dune shadows from amber to violet, lantern carpet walkways lead to the open campfire. Berber drummers share hypnotic Sahrawi rhythms while slow-cooked tagines simmer over acacia coals.",
    silence: "At night, miles from artificial lights and cellular noise, the silence is profound. Sleep on hand-woven artisan linens within insulated canvas, waking to the sunrise shifting dune crests into radiant gold."
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#0B132B] pb-24">
      <Helmet>
        <title>{camp.name} | Verified Desert Sanctuary | Dunecamps</title>
        <meta name="description" content={camp.description_en} />
      </Helmet>

      <LodgingBusinessSchema 
        name={camp.name}
        description={camp.description_en}
        address={`${camp.sub_location || 'Sahara Desert'}, Morocco`}
        latitude={camp.latitude}
        longitude={camp.longitude}
        priceRange="€€€"
        amenities={camp.key_amenities || ["Private Bathroom", "Solar Power", "Camel Trek"]}
        rating={4.9}
        reviewCount={48}
      />

      {/* Top Bar with Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <BackButton />
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: camp.name, url: window.location.href }).catch(() => {});
                }
              }}
              className="p-2.5 bg-white border border-[#BA7517]/20 rounded-full hover:bg-stone-50 transition-colors shadow-xs cursor-pointer"
              title="Share Sanctuary"
            >
              <Share2 size={16} className="text-[#0B132B]" />
            </button>
            <button 
              className="p-2.5 bg-white border border-[#BA7517]/20 rounded-full hover:bg-stone-50 transition-colors shadow-xs text-rose-500 cursor-pointer"
              title="Save to Favorites"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PHASE 2 - SECTION A: THE IMMERSIVE GALLERY & HEADER (NO BORING SLIDERS)    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Header Block */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <VerificationBadge tier={camp.verification_tier} />
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Check size={11} className="text-emerald-600" />
                <span>Physically Inspected & Verified</span>
              </span>
              <div className="flex items-center space-x-1 text-xs font-bold text-[#0B132B] ml-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>4.9</span>
                <span className="text-gray-400 font-normal">(48 verified reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B132B] tracking-tight mb-2">
              {camp.name}
            </h1>

            <div className="flex items-center space-x-2 text-[#BA7517] font-semibold text-sm">
              <MapPin size={16} />
              <span>{camp.sub_location || `${camp.destination.toUpperCase()} Desert, Morocco`}</span>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Nightly Rate From</span>
            <div className="flex items-baseline space-x-1 justify-end">
              <span className="text-3xl font-bold font-serif text-[#0B132B]">{formatCurrency(camp.price_per_night)}</span>
              <span className="text-xs text-[#0B132B]/60">/ night</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Bento-Grid Layout (4-5 high-res photos) */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[420px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-lg border border-[#BA7517]/20">
          {/* Main Large Hero Bento Item */}
          <div 
            onClick={() => { setActivePhotoIdx(0); setLightboxOpen(true); }}
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden bg-stone-900"
          >
            <motion.img 
              layoutId={`camp-hero-${camp.slug}`}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={photos[0]} 
              onError={(e) => {
                const fb = getCampFallbackImage(camp);
                if (e.currentTarget.src !== fb) {
                  e.currentTarget.src = fb;
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              alt={`${camp.name} Master View`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-4 left-4 text-white text-xs font-semibold drop-shadow-sm flex items-center space-x-1.5">
              <Camera size={14} className="text-[#EF9F27]" />
              <span>Dune Sanctuary Panorama</span>
            </div>
          </div>

          {/* Photo 2: Tent Interior at Night */}
          <div 
            onClick={() => { setActivePhotoIdx(1); setLightboxOpen(true); }}
            className="relative group cursor-pointer overflow-hidden bg-stone-900 hidden sm:block"
          >
            <img 
              src={photos[1] || photos[0]} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              alt={`${camp.name} Tent Interior`} 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <span className="absolute bottom-2.5 left-3 text-white text-[10px] font-bold uppercase tracking-wider drop-shadow-sm">Tent Interior</span>
          </div>

          {/* Photo 3: Dining Area & Campfire */}
          <div 
            onClick={() => { setActivePhotoIdx(2); setLightboxOpen(true); }}
            className="relative group cursor-pointer overflow-hidden bg-stone-900 hidden sm:block"
          >
            <img 
              src={photos[2] || photos[0]} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              alt={`${camp.name} Dining Under Stars`} 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <span className="absolute bottom-2.5 left-3 text-white text-[10px] font-bold uppercase tracking-wider drop-shadow-sm">Saharan Dining</span>
          </div>

          {/* Photo 4 & 5: Landscape / Dusk */}
          <div 
            onClick={() => { setActivePhotoIdx(3); setLightboxOpen(true); }}
            className="md:col-span-2 relative group cursor-pointer overflow-hidden bg-stone-900"
          >
            <img 
              src={photos[3] || photos[0]} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              alt={`${camp.name} Dune Sunset`} 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-3 left-4 text-white text-[11px] font-semibold drop-shadow-sm">
              Twilight & Stargazing
            </div>

            {/* View All Photos Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIdx(0);
                setLightboxOpen(true);
              }}
              className="absolute bottom-3 right-4 bg-white/95 hover:bg-white text-[#0B132B] px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Camera size={13} className="text-[#BA7517]" />
              <span>View All Photos ({photos.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHASE 2 - SECTION B: THE "AT-A-GLANCE" TRUST BAR                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#BA7517]/20 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#BA7517]/15">
            {/* 1. Accommodation Type */}
            <div className="flex items-start space-x-3.5 pt-3 md:pt-0 md:px-3 first:pt-0 first:px-0">
              <div className="w-10 h-10 rounded-2xl bg-[#BA7517]/10 flex items-center justify-center text-[#BA7517] shrink-0">
                <Tent size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Accommodation Type</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{trustBar.accommodation_type}</p>
              </div>
            </div>

            {/* 2. Facilities */}
            <div className="flex items-start space-x-3.5 pt-3 md:pt-0 md:px-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BA7517]/10 flex items-center justify-center text-[#BA7517] shrink-0">
                <Bath size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Facilities</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{trustBar.facilities}</p>
              </div>
            </div>

            {/* 3. Power */}
            <div className="flex items-start space-x-3.5 pt-3 md:pt-0 md:px-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BA7517]/10 flex items-center justify-center text-[#BA7517] shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Power & Charging</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{trustBar.power}</p>
              </div>
            </div>

            {/* 4. Included */}
            <div className="flex items-start space-x-3.5 pt-3 md:pt-0 md:px-3">
              <div className="w-10 h-10 rounded-2xl bg-[#BA7517]/10 flex items-center justify-center text-[#BA7517] shrink-0">
                <Compass size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Included Perks</span>
                <p className="text-xs sm:text-sm font-bold text-[#0B132B] mt-0.5">{trustBar.included}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Narrative, Logistics, Rooms, Verification */}
          <div className="lg:col-span-2 space-y-12">

            {/* ========================================================================= */}
            {/* PHASE 2 - SECTION C: THE CORE NARRATIVE ("THE EXPERIENCE")                */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/15 shadow-sm">
              <div className="inline-flex items-center space-x-2 text-[#BA7517] text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles size={14} />
                <span>Editorial Dispatch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B] mb-6">
                The Experience
              </h2>

              <div className="space-y-6 text-[#0B132B]/85 text-sm sm:text-base leading-relaxed">
                {/* 1. Arrival */}
                <div className="border-l-2 border-[#BA7517] pl-4 sm:pl-5">
                  <h3 className="font-serif font-bold text-[#0B132B] text-base mb-1.5 flex items-center gap-2">
                    <Car size={16} className="text-[#BA7517]" />
                    <span>The Journey & Arrival</span>
                  </h3>
                  <p className="italic text-[#0B132B]/80 font-serif">
                    "{narrative.arrival}"
                  </p>
                </div>

                {/* 2. Evening */}
                <div className="border-l-2 border-[#BA7517] pl-4 sm:pl-5">
                  <h3 className="font-serif font-bold text-[#0B132B] text-base mb-1.5 flex items-center gap-2">
                    <Flame size={16} className="text-[#BA7517]" />
                    <span>The Evening Under Stars</span>
                  </h3>
                  <p className="italic text-[#0B132B]/80 font-serif">
                    "{narrative.evening}"
                  </p>
                </div>

                {/* 3. Silence */}
                <div className="border-l-2 border-[#BA7517] pl-4 sm:pl-5">
                  <h3 className="font-serif font-bold text-[#0B132B] text-base mb-1.5 flex items-center gap-2">
                    <VolumeX size={16} className="text-[#BA7517]" />
                    <span>The Deep Dune Silence</span>
                  </h3>
                  <p className="italic text-[#0B132B]/80 font-serif">
                    "{narrative.silence}"
                  </p>
                </div>
              </div>

              {/* Key Amenities Grid */}
              <div className="mt-8 pt-8 border-t border-[#BA7517]/15">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#0B132B]/60 mb-4">
                  Confirmed On-Site Comforts
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(camp.key_amenities || [
                    "Private En-Suite Bathroom",
                    "Solar Powered Electricity",
                    "Sunset Camel Safari",
                    "Traditional Berber Tagine",
                    "Campfire Drum Circle",
                    "Private Dune Deck"
                  ]).map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs font-medium text-[#0B132B]">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* PHASE 2 - SECTION D: TRANSPARENT LOGISTICS & GETTING THERE                */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#BA7517]/10 flex items-center justify-center text-[#BA7517]">
                  <Car size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA7517]">Zero Guesswork</span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                    Transparent Logistics & Getting There
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Meeting Point Box */}
                <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#BA7517]/15">
                  <span className="font-bold text-[#0B132B] block mb-1">📍 Designated Meeting Point</span>
                  <p className="text-[#0B132B]/80 leading-relaxed">{logistics.meeting_point}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Transfer Details */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#BA7517]/15">
                    <span className="font-bold text-[#0B132B] block mb-1">🚙 4x4 Dune Transfer</span>
                    <p className="text-[#0B132B]/80 mb-2">{logistics.transfer_type}</p>
                    <span className="inline-block px-2.5 py-1 bg-emerald-100/70 text-emerald-800 rounded-md font-bold text-[10px] uppercase">
                      {logistics.transfer_cost}
                    </span>
                  </div>

                  {/* Parking Information */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#BA7517]/15">
                    <span className="font-bold text-[#0B132B] block mb-1">🅿️ Secure Parking Depot</span>
                    <p className="text-[#0B132B]/80">{logistics.parking_info}</p>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 text-[#0B132B]/75 flex items-center justify-between text-xs">
                  <span>Drive duration from Marrakech: <strong>{logistics.drive_time_from_marrakech}</strong></span>
                  <span className="text-[#BA7517] font-semibold">{logistics.road_type}</span>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* PHASE 2 - SECTION E: ROOMS / TENT OPTIONS                                 */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA7517]">Choose Your Sanctuary</span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">Rooms & Tent Options</h2>
                </div>
                <span className="text-xs text-[#0B132B]/60 font-medium">Click to select for booking</span>
              </div>

              <div className="space-y-4">
                {tentOptions.map((option) => {
                  const isSelected = selectedTentId === option.id;
                  return (
                    <div 
                      key={option.id}
                      onClick={() => setSelectedTentId(option.id)}
                      className={cn(
                        "rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between",
                        isSelected 
                          ? "border-[#BA7517] bg-[#FAF7F2] shadow-md ring-1 ring-[#BA7517]" 
                          : "border-stone-200 bg-white hover:border-[#BA7517]/40"
                      )}
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={option.image} 
                          alt={option.name} 
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0" 
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B132B]">{option.name}</h3>
                            {isSelected && (
                              <span className="bg-[#BA7517] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#0B132B]/70 mt-1 max-w-md line-clamp-2">{option.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-semibold text-[#0B132B]/80">
                            <span className="bg-white px-2 py-0.5 rounded-md border border-stone-200">🛏 {option.bed_type}</span>
                            <span className="bg-white px-2 py-0.5 rounded-md border border-stone-200">👥 Max {option.capacity} Guests</span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        <div>
                          <span className="text-xl font-bold font-serif text-[#0B132B]">{formatCurrency(option.price_per_night)}</span>
                          <span className="text-xs text-[#0B132B]/60"> / night</span>
                        </div>
                        <button
                          type="button"
                          className={cn(
                            "mt-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-colors",
                            isSelected 
                              ? "bg-[#0B132B] text-white" 
                              : "bg-[#BA7517]/10 text-[#BA7517] hover:bg-[#BA7517] hover:text-white"
                          )}
                        >
                          {isSelected ? "Active Choice" : "Select Option"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Dunecamps Verification Guarantee Proof */}
            <section className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/30 shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheck size={28} className="text-[#EF9F27]" />
                <h3 className="text-xl font-serif font-bold text-white">The Dunecamps Physical Inspection Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Unlike mass-market OTAs where unverified operators can publish stolen photos, {camp.name} underwent an in-person physical inspection by our Saharan operations team.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90">
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>Private bathroom running water & pressure tested</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>Solar battery capacity verified for 24/7 charging</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>Licensed 4x4 drivers with sand extraction gear</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Check size={16} className="text-emerald-400 shrink-0" />
                  <span>Direct operator WhatsApp channel unlocked at checkout</span>
                </div>
              </div>
            </section>

          </div>

          {/* ========================================================================= */}
          {/* PHASE 2 - SECTION F: STICKY BOOKING WIDGET (CONVERSION ENGINE)            */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-[#BA7517]/25 shadow-xl">
              
              {/* Header with Price */}
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#BA7517]/15">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/50 block">Guaranteed Direct Rate</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-serif font-bold text-[#0B132B]">
                      {formatCurrency(currentTent.price_per_night)}
                    </span>
                    <span className="text-xs text-[#0B132B]/60">/ night</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Instant Verification
                </span>
              </div>

              {/* Selected Tent Pill */}
              <div className="mb-4 bg-[#FAF7F2] p-3 rounded-2xl border border-[#BA7517]/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#BA7517] block">Selected Tent</span>
                  <span className="font-bold text-[#0B132B]">{currentTent.name}</span>
                </div>
                <span className="font-bold text-[#0B132B]">{formatCurrency(currentTent.price_per_night)}</span>
              </div>

              {/* Date & Guest Selectors */}
              <div className="space-y-3 mb-5">
                {/* Dates Selector */}
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#BA7517]/15">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/60 block mb-1">
                    Stay Duration
                  </label>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#0B132B]">
                    <div className="flex items-center space-x-1.5">
                      <Calendar size={14} className="text-[#BA7517]" />
                      <span>{nights} Nights ({checkIn} to {checkOut})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        type="button"
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center font-bold text-xs hover:bg-stone-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold">{nights}</span>
                      <button 
                        type="button"
                        onClick={() => setNights(nights + 1)}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center font-bold text-xs hover:bg-stone-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Guest Count */}
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#BA7517]/15">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/60 block mb-1">
                    Guests (Max {camp.max_guests})
                  </label>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#0B132B]">
                    <div className="flex items-center space-x-1.5">
                      <Users size={14} className="text-[#BA7517]" />
                      <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center font-bold text-xs hover:bg-stone-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold">{guests}</span>
                      <button 
                        type="button"
                        onClick={() => setGuests(Math.min(camp.max_guests, guests + 1))}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 flex items-center justify-center font-bold text-xs hover:bg-stone-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Add-ons Section */}
              <div className="mb-5 border-t border-[#BA7517]/15 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B132B]/60 block mb-2">
                  Optional Add-Ons
                </span>
                <div className="space-y-2">
                  {/* Addon 1: VIP 4x4 Transfer */}
                  <label className="flex items-start space-x-2 text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedAddons.transfer}
                      onChange={() => toggleAddon('transfer')}
                      className="mt-0.5 rounded text-[#BA7517] focus:ring-[#BA7517]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-semibold text-[#0B132B]">
                        <span>VIP Dedicated 4x4 Transfer</span>
                        <span>+€{addonPrices.transfer}</span>
                      </div>
                      <span className="text-[10px] text-[#0B132B]/60">Private direct vehicle & luggage assistance</span>
                    </div>
                  </label>

                  {/* Addon 2: Quad Biking */}
                  <label className="flex items-start space-x-2 text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedAddons.quad}
                      onChange={() => toggleAddon('quad')}
                      className="mt-0.5 rounded text-[#BA7517] focus:ring-[#BA7517]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-semibold text-[#0B132B]">
                        <span>Sunset Quad Biking Tour</span>
                        <span>+€{addonPrices.quad}</span>
                      </div>
                      <span className="text-[10px] text-[#0B132B]/60">1h guided ridge safari (€50/guest)</span>
                    </div>
                  </label>

                  {/* Addon 3: Astronomy Session */}
                  <label className="flex items-start space-x-2 text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedAddons.stargazing}
                      onChange={() => toggleAddon('stargazing')}
                      className="mt-0.5 rounded text-[#BA7517] focus:ring-[#BA7517]"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-semibold text-[#0B132B]">
                        <span>Telescope Stargazing Session</span>
                        <span>+€{addonPrices.stargazing}</span>
                      </div>
                      <span className="text-[10px] text-[#0B132B]/60">With local desert astronomer (€25/guest)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="space-y-2 mb-6 pt-3 border-t border-[#BA7517]/15 text-xs text-[#0B132B]/80">
                <div className="flex justify-between">
                  <span>{formatCurrency(currentTent.price_per_night)} x {nights} nights</span>
                  <span className="font-semibold text-[#0B132B]">{formatCurrency(tentRateTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tourism & Eco-Conservation Levy</span>
                  <span className="font-semibold text-[#0B132B]">{formatCurrency(ecoTaxes)}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-[#BA7517]">
                    <span>Selected Add-ons</span>
                    <span className="font-semibold">{formatCurrency(addonsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-700">
                  <span>Dunecamps Verification Fee</span>
                  <span className="font-bold">Waived (€0)</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-[#BA7517]/20 text-base font-bold text-[#0B132B]">
                  <span>Total Amount</span>
                  <span className="text-2xl font-serif text-[#0B132B]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* CTA Button: Reserve / Request Verification */}
              <button 
                type="button"
                onClick={handleReserve}
                className="w-full bg-[#BA7517] hover:bg-[#9E6010] text-white text-center py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#BA7517]/25 transition-all transform active:scale-98 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Instant Reserve & Request Verification</span>
                <ArrowRight size={16} />
              </button>

              {/* Trust Subtext - NO aggressive fake scarcity ("Only 1 left!") */}
              <div className="mt-4 flex items-center justify-center space-x-1.5 text-[11px] text-[#0B132B]/60 text-center">
                <Lock size={12} className="text-[#BA7517]" />
                <span>Zero hidden fees • Free cancellation up to 7 days prior</span>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN IMAGE LIGHTBOX MODAL                                          */}
      {/* ========================================================================= */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div>
              <span className="text-xs font-mono text-[#EF9F27]">Photo {activePhotoIdx + 1} of {photos.length}</span>
              <h4 className="text-sm font-serif font-bold">{camp.name}</h4>
            </div>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full py-4">
            <button 
              onClick={() => setActivePhotoIdx((activePhotoIdx - 1 + photos.length) % photos.length)}
              className="absolute left-2 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors z-10 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <img 
              src={photos[activePhotoIdx]} 
              alt={`Gallery image ${activePhotoIdx + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl" 
            />
            <button 
              onClick={() => setActivePhotoIdx((activePhotoIdx + 1) % photos.length)}
              className="absolute right-2 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors z-10 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Lightbox Thumbnail Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {photos.map((p, idx) => (
              <button 
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={cn(
                  "w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer",
                  idx === activePhotoIdx ? "border-[#EF9F27] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={p} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
