import React, { useState, useMemo, useRef } from 'react';
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
  Sparkles,
  ExternalLink,
  MessageCircle,
  Award,
  Layers
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import BackButton from '@/src/components/BackButton';
import { mockCamps } from '@/src/lib/mockData';
import { FOUM_ZGUID_STAYS } from '@/src/data/foumZguidData';
import VerificationBadge from '@/src/components/VerificationBadge';
import { getCampImage, getCampFallbackImage } from '@/src/components/CampCard';
import { formatCurrency, cn } from '@/src/lib/utils';
import { LodgingBusinessSchema } from '@/src/lib/seo';
import { useLanguage } from '@/src/lib/LanguageContext';
import { TentOptionItem } from '@/src/types';
import MarrakechToCampRouteMap from '@/src/components/MarrakechToCampRouteMap';


export default function CampDetail() {
  const { slug, campSlug } = useParams<{ slug?: string; campSlug?: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const activeSlug = (slug || campSlug || '').toLowerCase();

  // Find camp or fallback to the first camp
  const camp = useMemo(() => {
    return (
      mockCamps.find(c => 
        c.slug.toLowerCase() === activeSlug ||
        (activeSlug === 'bivouac-nomades-chigaga' && c.slug === 'bivouac-les-nomades') ||
        (activeSlug === 'bivouac-les-nomades' && c.slug === 'bivouac-nomades-chigaga') ||
        (activeSlug === 'bivouaclesnomades' && c.slug === 'bivouac-les-nomades')
      ) || mockCamps[0]
    );
  }, [activeSlug]);

  // Gallery Photos (fallback if none specified)
  const photos = useMemo(() => {
    if (camp.images && camp.images.length > 0) {
      return camp.images;
    }
    const mainImg = getCampImage(camp);
    const fallbacks = [
      "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1200",
      "https://images.unsplash.com/photo-1489493585363-d6943649ef91?q=80&w=1200",
      "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1200",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200"
    ];
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
        capacity: '2',
        price_per_night: camp.price_per_night,
        image: photos[0],
        features: ['Private En-suite Shower', 'Moroccan Wool Blankets', '24/7 Solar USB', 'Complimentary Breakfast']
      }
    ];
  }, [camp, photos]);

  // Selected tent state (auto sync with tentOptions)
  const [selectedTentId, setSelectedTentId] = useState<string>(tentOptions[0]?.id || 'standard-suite');
  
  // Keep selected tent synced if camp changes
  React.useEffect(() => {
    if (tentOptions.length > 0 && !tentOptions.some(t => t.id === selectedTentId)) {
      setSelectedTentId(tentOptions[0].id);
    }
  }, [tentOptions, selectedTentId]);

  const currentTent = tentOptions.find(t => t.id === selectedTentId) || tentOptions[0];

  // Interactive Booking Widget State
  const [checkIn, setCheckIn] = useState('2026-10-14');
  const [checkOut, setCheckOut] = useState('2026-10-16');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  const isBivouacLesNomades = camp.slug === 'bivouac-les-nomades';

  // Add-ons state
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    transfer: false,
    quad: false,
    stargazing: false,
    sandBread: false
  });

  const addonPrices = useMemo(() => {
    if (isBivouacLesNomades) {
      return {
        transfer: 0, // Included complimentary with Bivouac Les Nomades
        quad: 45 * guests,
        stargazing: 20 * guests,
        sandBread: 15 * guests
      };
    }
    return {
      transfer: 60,
      quad: 50 * guests,
      stargazing: 25 * guests,
      sandBread: 20 * guests
    };
  }, [isBivouacLesNomades, guests]);

  const toggleAddon = (key: string) => {
    setSelectedAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Price calculations
  const tentRateTotal = currentTent.price_per_night * nights;
  const ecoTaxes = 3.5 * guests * nights;
  const addonsTotal = 
    (selectedAddons.transfer ? addonPrices.transfer : 0) +
    (selectedAddons.quad ? addonPrices.quad : 0) +
    (selectedAddons.stargazing ? addonPrices.stargazing : 0) +
    (selectedAddons.sandBread ? addonPrices.sandBread : 0);

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

  // Horizontal Scroll Container Refs & Scrolling Handler
  const tentScrollRef = useRef<HTMLDivElement | null>(null);
  const narrativeScrollRef = useRef<HTMLDivElement | null>(null);
  const amenitiesScrollRef = useRef<HTMLDivElement | null>(null);
  const experiencesScrollRef = useRef<HTMLDivElement | null>(null);
  const auditScrollRef = useRef<HTMLDivElement | null>(null);
  const similarStaysScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollSection = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', distance = 380) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth'
      });
    }
  };

  // Narrative Chapters Array for Horizontal Carousel
  const narrativeChapters = useMemo(() => {
    const chapters = [
      {
        id: 'arrival',
        chapterNum: '01',
        title: 'The Journey & Arrival',
        subtitle: 'Leaving Asphalt for Shimmering Lake Iriki',
        icon: <Car size={18} className="text-[#BA7517]" />,
        text: narrative.arrival,
        tag: 'Dakar Crossing'
      },
      {
        id: 'evening',
        chapterNum: '02',
        title: 'The Evening Under Stars',
        subtitle: 'Campfire, Fresh Taguella & Sahrawi Blues',
        icon: <Flame size={18} className="text-[#BA7517]" />,
        text: narrative.evening,
        tag: 'Saharan Nights'
      },
      {
        id: 'silence',
        chapterNum: '03',
        title: 'The Deep Dune Silence',
        subtitle: 'Profound Solitude & Dawn Awakening',
        icon: <VolumeX size={18} className="text-[#BA7517]" />,
        text: narrative.silence,
        tag: 'Pure Silence'
      }
    ];

    if (camp.owner_name) {
      chapters.push({
        id: 'heritage',
        chapterNum: '04',
        title: 'Nomadic Heritage & Host',
        subtitle: `${camp.owner_name} • ${camp.owner_title || 'Master Desert Guide'}`,
        icon: <Award size={18} className="text-[#BA7517]" />,
        text: camp.owner_quote || '',
        tag: 'Verified Founder'
      });
    }

    return chapters;
  }, [narrative, camp]);

  // Curated Experiences & Add-ons Array for Horizontal Carousel
  const curatedExperiences = useMemo(() => {
    return [
      {
        id: 'quad',
        title: 'High-Dune Quad Safari',
        subtitle: '1-Hour Guided Erg Chigaga Safari',
        image: '/images/destinations/foumzguid.jpg',
        priceLabel: `+€${addonPrices.quad}`,
        priceSub: '€45 / guest',
        description: 'Guided quad excursion along the high dunes and open plateaus with seasoned desert safety lead.',
        isAddon: true,
        addonKey: 'quad',
        included: false
      },
      {
        id: 'transfer',
        title: 'Lake Iriki 4x4 Dakar Crossing',
        subtitle: 'Departing Foum Zguid Meeting Depot',
        image: '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
        priceLabel: isBivouacLesNomades ? 'Included Free' : `+€${addonPrices.transfer}`,
        priceSub: isBivouacLesNomades ? 'Included in Booking' : 'Private Land Cruiser',
        description: 'Scenic off-road Land Cruiser expedition across the cracked salt lakebed and ancient fossil valleys.',
        isAddon: !isBivouacLesNomades,
        addonKey: 'transfer',
        included: isBivouacLesNomades
      },
      {
        id: 'sandBread',
        title: 'Nomadic Sand Bread Masterclass',
        subtitle: 'Bake Taguella in Desert Embers',
        image: '/src/assets/images/nomad_tent_interior_1790671861252.jpg',
        priceLabel: `+€${addonPrices.sandBread}`,
        priceSub: '€15 / guest',
        description: 'Learn the ancient desert craft of preparing and baking artisanal nomad bread directly in clean acacia coals.',
        isAddon: true,
        addonKey: 'sandBread',
        included: false
      },
      {
        id: 'camel',
        title: 'Sunset Camel Ridge Trek',
        subtitle: 'Ascend the 300m Dune Crest',
        image: '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
        priceLabel: 'Included Free',
        priceSub: 'Complimentary with Stay',
        description: 'Mount traditional dromedary camels at golden hour to witness 360° sunset panoramic views over the Sahara.',
        isAddon: false,
        addonKey: '',
        included: true
      },
      {
        id: 'stargazing',
        title: 'Sahrawi Blues & Star Jam',
        subtitle: 'Acoustic Drums by the Campfire',
        image: '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
        priceLabel: 'Included Free',
        priceSub: 'Nightly Performance',
        description: 'Local nomad musicians play traditional desert blues guitars, flutes, and drums under the unpolluted Milky Way.',
        isAddon: false,
        addonKey: '',
        included: true
      },
      {
        id: 'telescope',
        title: 'Telescope Stargazing Session',
        subtitle: 'Guided by Desert Sky Host',
        image: '/images/slideshow/slide-1.jpg',
        priceLabel: `+€${addonPrices.stargazing}`,
        priceSub: '€20 / guest',
        description: 'Discover Saturn rings, lunar craters, and deep space constellations with our on-site optical equipment.',
        isAddon: true,
        addonKey: 'stargazing',
        included: false
      }
    ];
  }, [isBivouacLesNomades, addonPrices]);

  // Similar Stays in Foum Zguid
  const similarStays = useMemo(() => {
    return FOUM_ZGUID_STAYS.filter(s => s.slug !== camp.slug).slice(0, 6);
  }, [camp.slug]);

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
                <span>{camp.tripadvisor_rating || (camp as any).rating || 4.9}</span>
                <span className="text-gray-400 font-normal">
                  ({camp.tripadvisor_reviews || (camp as any).reviewCount || 48} verified reviews)
                </span>
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

        {/* Verified Owner Partner & Official Website Transparency Banner */}
        {camp.official_website && (
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#14213D] to-[#0B132B] text-white border border-[#BA7517]/35 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center space-x-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#BA7517]/20 border border-[#BA7517]/40 flex items-center justify-center shrink-0">
                <ShieldCheck size={26} className="text-[#EF9F27]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="bg-[#EF9F27] text-[#0B132B] font-bold text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider">
                    Direct Partner Authorization
                  </span>
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    Verified with Founder {camp.owner_name || 'Owner'}
                  </span>
                  <span className="text-[#EF9F27] text-xs font-bold flex items-center gap-1">
                    <Star size={12} className="fill-[#EF9F27]" />
                    <span>5.0 TripAdvisor Rating</span>
                  </span>
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  Dunecamps holds complete booking and operations approval for this camp. Authentic direct rates, inspected sanitation, and direct coordination with Mustapha's team in Foum Zguid.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 shrink-0 self-start md:self-auto">
              <a 
                href={camp.official_website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-[#EF9F27] border border-[#EF9F27]/30 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <span>bivouaclesnomades.com</span>
                <ExternalLink size={13} />
              </a>
              {camp.whatsapp && (
                <a 
                  href={`https://wa.me/${camp.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Mustapha,%20I%20am%20inquiring%20about%20booking%20Bivouac%20Les%20Nomades%20via%20Dunecamps`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Host</span>
                </a>
              )}
            </div>
          </div>
        )}

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="inline-flex items-center space-x-2 text-[#BA7517] text-xs font-bold uppercase tracking-widest mb-1.5">
                    <Sparkles size={14} />
                    <span>Editorial Dispatch • 4 Chapters</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B]">
                    The Experience
                  </h2>
                </div>

                {/* Left / Right Scroll Controls */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <span className="text-[11px] text-[#0B132B]/60 font-medium mr-1 hidden sm:inline">
                    Scroll chapters &rarr;
                  </span>
                  <button 
                    type="button"
                    onClick={() => scrollSection(narrativeScrollRef, 'left')}
                    className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous chapter"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => scrollSection(narrativeScrollRef, 'right')}
                    className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Next chapter"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Narrative Chapters */}
              <div 
                ref={narrativeScrollRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
              >
                {narrativeChapters.map((chap) => (
                  <div 
                    key={chap.id}
                    className="w-[285px] sm:w-[340px] md:w-[380px] shrink-0 snap-start bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#BA7517]/20 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold text-[#BA7517] bg-[#BA7517]/10 px-2.5 py-0.5 rounded-full uppercase">
                          Chapter {chap.chapterNum} • {chap.tag}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-white border border-[#BA7517]/25 flex items-center justify-center shadow-xs">
                          {chap.icon}
                        </div>
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B132B] mb-1">
                        {chap.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#BA7517] mb-3">
                        {chap.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-[#0B132B]/85 italic font-serif leading-relaxed line-clamp-6">
                        "{chap.text}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#BA7517]/15 flex items-center justify-between text-[11px] text-[#0B132B]/60">
                      <span>Verified On-Site Diary</span>
                      <span className="text-[#BA7517] font-bold">Dunecamps Exclusive</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Amenities Horizontal Ribbon */}
              <div className="mt-6 pt-6 border-t border-[#BA7517]/15">
                <div className="flex items-center justify-between mb-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0B132B]/70 flex items-center space-x-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Confirmed On-Site Comforts</span>
                  </h4>
                  <div className="flex items-center space-x-1">
                    <button 
                      type="button"
                      onClick={() => scrollSection(amenitiesScrollRef, 'left', 240)}
                      className="w-6 h-6 rounded-full bg-[#FAF7F2] hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer text-xs"
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => scrollSection(amenitiesScrollRef, 'right', 240)}
                      className="w-6 h-6 rounded-full bg-[#FAF7F2] hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer text-xs"
                    >
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                <div 
                  ref={amenitiesScrollRef}
                  className="flex gap-2.5 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
                >
                  {(camp.key_amenities || [
                    "Private En-Suite Bathroom",
                    "Solar Powered Electricity 24/7",
                    "Sunset Camel Safari",
                    "Traditional Berber Tagine",
                    "Campfire Drum Circle",
                    "Private Dune Deck",
                    "Free Guarded Foum Zguid Parking",
                    "Sandboarding on Site"
                  ]).map((amenity, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#FAF7F2] border border-[#BA7517]/20 px-3.5 py-2 rounded-xl flex items-center space-x-2 text-xs font-semibold text-[#0B132B] shrink-0 hover:bg-[#BA7517]/10 transition-colors shadow-2xs"
                    >
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span className="whitespace-nowrap">{amenity}</span>
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

                {/* Camp Location & Access Map */}
                <div className="mt-6 pt-6 border-t border-[#BA7517]/15">
                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA7517] block">Camp Location &amp; Access</span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#0B132B]">
                      Location &amp; Meeting Point Map
                    </h3>
                    <p className="text-xs text-[#0B132B]/70 mt-0.5">
                      Foum Zguid secure meeting depot and 4x4 desert access to {camp.name}.
                    </p>
                  </div>
                  <MarrakechToCampRouteMap 
                    campName={camp.name}
                    campSlug={camp.slug}
                    meetingPointName={logistics.meeting_point}
                  />
                </div>
              </div>
            </section>


            {/* ========================================================================= */}
            {/* PHASE 2 - SECTION E: CURATED DESERT EXPERIENCES & EXCURSIONS              */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA7517] block">
                    Curated Sahara Adventures
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                    Desert Experiences &amp; Guided Excursions
                  </h2>
                </div>

                {/* Left / Right Scroll Controls */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <span className="text-[11px] text-[#0B132B]/60 font-medium mr-1 hidden sm:inline">
                    Swipe activities &rarr;
                  </span>
                  <button 
                    type="button"
                    onClick={() => scrollSection(experiencesScrollRef, 'left')}
                    className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous experience"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => scrollSection(experiencesScrollRef, 'right')}
                    className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Next experience"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track for Experiences */}
              <div 
                ref={experiencesScrollRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
              >
                {curatedExperiences.map((exp) => {
                  const isChecked = exp.isAddon && selectedAddons[exp.addonKey];
                  return (
                    <div 
                      key={exp.id}
                      className={cn(
                        "w-[260px] sm:w-[290px] md:w-[320px] shrink-0 snap-start bg-[#FAF7F2] rounded-2xl border transition-all flex flex-col justify-between overflow-hidden hover:shadow-md",
                        isChecked 
                          ? "border-[#BA7517] ring-1 ring-[#BA7517] bg-[#FAF7F2]" 
                          : "border-stone-200/90"
                      )}
                    >
                      <div>
                        {/* Experience Thumbnail Image */}
                        <div className="relative h-36 w-full overflow-hidden bg-stone-900">
                          <img 
                            src={exp.image} 
                            alt={exp.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                            {exp.priceSub}
                          </span>
                          {exp.included && (
                            <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
                              Included Free
                            </span>
                          )}
                        </div>

                        {/* Experience Info */}
                        <div className="p-4">
                          <h3 className="font-serif font-bold text-base text-[#0B132B] mb-0.5">
                            {exp.title}
                          </h3>
                          <p className="text-[11px] font-semibold text-[#BA7517] mb-2">
                            {exp.subtitle}
                          </p>
                          <p className="text-xs text-[#0B132B]/75 leading-relaxed line-clamp-3">
                            {exp.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="p-4 pt-0 border-t border-stone-200/60 mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-[#0B132B] font-serif">{exp.priceLabel}</span>
                        </div>

                        {exp.included ? (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                            ✓ In Stay
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleAddon(exp.addonKey)}
                            className={cn(
                              "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                              isChecked
                                ? "bg-[#0B132B] text-white"
                                : "bg-[#BA7517]/10 hover:bg-[#BA7517] text-[#BA7517] hover:text-white"
                            )}
                          >
                            {isChecked ? "Added ✓" : "+ Add to Stay"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>


            {/* ========================================================================= */}
            {/* PHASE 2 - SECTION F: ROOMS / TENT OPTIONS (HORIZONTAL CAROUSEL)            */}
            {/* ========================================================================= */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="inline-flex items-center space-x-2 text-[#BA7517] text-xs font-bold uppercase tracking-widest mb-1.5">
                    <Tent size={14} />
                    <span>Choose Your Sanctuary • {tentOptions.length} Suites Available</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                    Rooms &amp; Tent Options
                  </h2>
                </div>

                {/* Left / Right Scroll Controls */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <span className="text-[11px] text-[#0B132B]/60 font-medium mr-1 hidden sm:inline">
                    Swipe suites &rarr;
                  </span>
                  <button 
                    type="button"
                    onClick={() => scrollSection(tentScrollRef, 'left')}
                    className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous suite"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => scrollSection(tentScrollRef, 'right')}
                    className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Next suite"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track for Tent Suites */}
              <div 
                ref={tentScrollRef}
                className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
              >
                {tentOptions.map((option) => {
                  const isSelected = selectedTentId === option.id;
                  return (
                    <div 
                      key={option.id}
                      onClick={() => setSelectedTentId(option.id)}
                      className={cn(
                        "w-[305px] sm:w-[350px] md:w-[380px] shrink-0 snap-start rounded-3xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg relative group",
                        isSelected 
                          ? "border-[#BA7517] bg-[#FAF7F2]/40 shadow-lg ring-2 ring-[#BA7517]" 
                          : "border-stone-200 bg-white hover:border-[#BA7517]/40"
                      )}
                    >
                      <div>
                        {/* Tent Photo */}
                        <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                          <img 
                            src={option.image} 
                            alt={option.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          
                          {/* Badge pill */}
                          {option.badge && (
                            <span className="absolute top-3 left-3 bg-[#BA7517] text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md">
                              {option.badge}
                            </span>
                          )}

                          {/* Selected Pill */}
                          {isSelected && (
                            <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                              <span>Active Choice</span>
                              <Check size={11} />
                            </span>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] uppercase font-bold text-[#EF9F27] block">
                              {option.bed_type}
                            </span>
                            <h3 className="font-serif font-bold text-lg text-white leading-tight drop-shadow-sm">
                              {option.name}
                            </h3>
                          </div>
                        </div>

                        {/* Body Details */}
                        <div className="p-5">
                          <div className="flex items-center space-x-2 text-[10px] font-semibold text-[#0B132B]/80 mb-3">
                            <span className="bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                              👥 Max {option.capacity} Guests
                            </span>
                            <span className="bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                              🛏 {option.bed_type}
                            </span>
                          </div>

                          <p className="text-xs text-[#0B132B]/70 leading-relaxed mb-4 line-clamp-3">
                            {option.description}
                          </p>

                          {/* Features */}
                          {option.features && option.features.length > 0 && (
                            <div className="space-y-1.5 pt-3 border-t border-stone-100">
                              {option.features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-center space-x-1.5 text-xs text-[#0B132B]/85">
                                  <Check size={13} className="text-[#BA7517] shrink-0" />
                                  <span className="line-clamp-1">{feat}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Price & Selection */}
                      <div className="p-5 pt-3 border-t border-stone-100 bg-white/70 flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold font-serif text-[#0B132B]">
                            {formatCurrency(option.price_per_night)}
                          </div>
                          <span className="text-[10px] text-[#0B132B]/60">per night • taxes included</span>
                        </div>

                        <button
                          type="button"
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs",
                            isSelected 
                              ? "bg-[#0B132B] text-white" 
                              : "bg-[#BA7517] hover:bg-[#9E6010] text-white"
                          )}
                        >
                          {isSelected ? "Active Choice ✓" : "Select Suite"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Suite Dots Indicator & Helper */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#0B132B]/60">
                <span className="text-[11px]">
                  &larr; Scroll sideways to compare all {tentOptions.length} suites &amp; rates &rarr;
                </span>
                <div className="flex items-center space-x-1.5">
                  {tentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedTentId(opt.id)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all cursor-pointer",
                        selectedTentId === opt.id ? "bg-[#BA7517] w-6" : "bg-stone-300 hover:bg-stone-400"
                      )}
                      title={opt.name}
                    />
                  ))}
                </div>
              </div>
            </section>


            {/* ========================================================================= */}
            {/* PHASE 2 - SECTION G: DUNECAMPS PHYSICAL INSPECTION AUDIT                   */}
            {/* ========================================================================= */}
            <section className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/30 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3">
                  <ShieldCheck size={28} className="text-[#EF9F27] shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#EF9F27] block">
                      Direct Verification
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                      The Dunecamps Physical Inspection Audit
                    </h3>
                  </div>
                </div>

                {/* Scroll Buttons */}
                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button 
                    type="button"
                    onClick={() => scrollSection(auditScrollRef, 'left', 260)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => scrollSection(auditScrollRef, 'right', 260)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-5">
                Unlike mass-market OTAs where unverified operators can publish stolen photos, {camp.name} underwent an in-person physical inspection by our Saharan operations team.
              </p>

              {/* Horizontal Scroll Audit Cards */}
              <div 
                ref={auditScrollRef}
                className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
              >
                <div className="w-[230px] sm:w-[260px] shrink-0 snap-start bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start space-x-3">
                  <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white block mb-0.5">Water Pressure &amp; Heat</span>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      Private bathroom running hot water &amp; ceramic flush toilet inspected.
                    </p>
                  </div>
                </div>

                <div className="w-[230px] sm:w-[260px] shrink-0 snap-start bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start space-x-3">
                  <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white block mb-0.5">Solar Battery Array</span>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      Solar capacity tested for 24/7 tent lighting and camera/USB charging.
                    </p>
                  </div>
                </div>

                <div className="w-[230px] sm:w-[260px] shrink-0 snap-start bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start space-x-3">
                  <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white block mb-0.5">Dune Navigation Gear</span>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      Licensed 4x4 drivers equipped with GPS, sand recovery boards &amp; deflators.
                    </p>
                  </div>
                </div>

                <div className="w-[230px] sm:w-[260px] shrink-0 snap-start bg-white/5 p-4 rounded-2xl border border-white/10 flex items-start space-x-3">
                  <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white block mb-0.5">Direct WhatsApp Line</span>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      Direct host WhatsApp coordinate unlocked immediately upon booking.
                    </p>
                  </div>
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
                  {isBivouacLesNomades ? (
                    <>
                      {/* Bivouac Les Nomades Addon: 4x4 Notice */}
                      <div className="flex items-start space-x-2 text-xs p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                        <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between font-semibold text-emerald-950">
                            <span>Lake Iriki 4x4 Expedition</span>
                            <span className="text-emerald-700 font-bold">Included Free</span>
                          </div>
                          <span className="text-[10px] text-emerald-800/80">Guided transfer departing Foum Zguid at 14:30</span>
                        </div>
                      </div>

                      {/* Addon 1: Quad Biking */}
                      <label className="flex items-start space-x-2 text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedAddons.quad}
                          onChange={() => toggleAddon('quad')}
                          className="mt-0.5 rounded text-[#BA7517] focus:ring-[#BA7517]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between font-semibold text-[#0B132B]">
                            <span>High-Dune Quad Safari</span>
                            <span>+€{addonPrices.quad}</span>
                          </div>
                          <span className="text-[10px] text-[#0B132B]/60">1h guided Erg Chigaga dunes (€45/guest)</span>
                        </div>
                      </label>

                      {/* Addon 2: Fossil Safari Walk */}
                      <label className="flex items-start space-x-2 text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedAddons.stargazing}
                          onChange={() => toggleAddon('stargazing')}
                          className="mt-0.5 rounded text-[#BA7517] focus:ring-[#BA7517]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between font-semibold text-[#0B132B]">
                            <span>Lake Iriki Fossil Safari</span>
                            <span>+€{addonPrices.stargazing}</span>
                          </div>
                          <span className="text-[10px] text-[#0B132B]/60">Prehistoric seabed walk with Mustapha (€20/guest)</span>
                        </div>
                      </label>

                      {/* Addon 3: Sand Bread Workshop */}
                      <label className="flex items-start space-x-2 text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedAddons.sandBread}
                          onChange={() => toggleAddon('sandBread')}
                          className="mt-0.5 rounded text-[#BA7517] focus:ring-[#BA7517]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between font-semibold text-[#0B132B]">
                            <span>Nomadic Sand Bread Masterclass</span>
                            <span>+€{addonPrices.sandBread}</span>
                          </div>
                          <span className="text-[10px] text-[#0B132B]/60">Bake Taguella in desert embers (€15/guest)</span>
                        </div>
                      </label>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
                <span>{isBivouacLesNomades ? 'Reserve Sanctuary with Mustapha' : 'Instant Reserve & Request Verification'}</span>
                <ArrowRight size={16} />
              </button>

              {camp.whatsapp && (
                <a 
                  href={`https://wa.me/${camp.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Mustapha,%20I%20am%20inquiring%20about%20booking%20Bivouac%20Les%20Nomades%20via%20Dunecamps`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full bg-emerald-700/10 hover:bg-emerald-700/20 text-emerald-800 border border-emerald-300/60 text-center py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageCircle size={15} className="text-emerald-700" />
                  <span>Chat with Mustapha on WhatsApp</span>
                </a>
              )}

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
      {/* PHASE 2 - SECTION H: SIMILAR SANCTUARIES (HORIZONTAL EXPLORER)             */}
      {/* ========================================================================= */}
      {similarStays.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/20 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA7517] block">
                  Regional Collection
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B132B]">
                  Other Verified Stays in Foum Zguid &amp; Erg Chigaga
                </h2>
                <p className="text-xs text-[#0B132B]/70 mt-0.5">
                  Browse handpicked alternative bivouacs, luxury dune sanctuaries, and oasis auberges.
                </p>
              </div>

              {/* Scroll Controls */}
              <div className="flex items-center space-x-2 self-end sm:self-auto">
                <span className="text-[11px] text-[#0B132B]/60 font-medium mr-1 hidden sm:inline">
                  Swipe sanctuaries &rarr;
                </span>
                <button 
                  type="button"
                  onClick={() => scrollSection(similarStaysScrollRef, 'left')}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous camp"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  type="button"
                  onClick={() => scrollSection(similarStaysScrollRef, 'right')}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#BA7517]/15 text-[#0B132B] border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                  title="Next camp"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div 
              ref={similarStaysScrollRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {similarStays.map((stay) => (
                <div 
                  key={stay.id}
                  className="w-[270px] sm:w-[310px] md:w-[340px] shrink-0 snap-start bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Stay Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                      <img 
                        src={stay.image || stay.fallbackImage} 
                        alt={stay.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-2.5 left-2.5 bg-[#0B132B]/80 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                        {stay.categoryLabel}
                      </span>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-bold">
                        <div className="flex items-center space-x-1">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span>{stay.rating.toFixed(2)}</span>
                          <span className="text-white/70">({stay.reviewCount})</span>
                        </div>
                        <span className="text-[#EF9F27]">{stay.distanceKm} km into dunes</span>
                      </div>
                    </div>

                    {/* Stay Body */}
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-base text-[#0B132B] group-hover:text-[#BA7517] transition-colors line-clamp-1 mb-1">
                        {stay.name}
                      </h3>
                      <p className="text-xs text-[#0B132B]/70 line-clamp-2 leading-relaxed mb-3">
                        {stay.description_en}
                      </p>

                      <div className="text-[10px] text-stone-600 bg-stone-50 border border-stone-100 p-2 rounded-lg line-clamp-1">
                        📍 {stay.subDetail || 'Erg Chigaga, Foum Zguid'}
                      </div>
                    </div>
                  </div>

                  {/* Stay Footer */}
                  <div className="p-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold font-serif text-[#0B132B]">
                        {formatCurrency(stay.price_per_night)}
                      </span>
                      <span className="text-[10px] text-[#0B132B]/60"> / night</span>
                    </div>

                    <Link
                      to={`/camps/${stay.slug}`}
                      className="px-3.5 py-1.5 rounded-xl bg-[#BA7517]/10 hover:bg-[#BA7517] text-[#BA7517] hover:text-white font-bold text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Foum Zguid Hub Link */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#0B132B]/75">
              <span>Looking for edge lodges or town auberges?</span>
              <Link 
                to="/destination/foumzguid" 
                className="font-bold text-[#BA7517] hover:underline flex items-center space-x-1"
              >
                <span>View Full Foum Zguid Hub (14 Stays)</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}

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
