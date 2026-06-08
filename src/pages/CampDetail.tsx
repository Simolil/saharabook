import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Star, Bath, Users, Wifi, Wind, Coffee, MapPin, ArrowLeft, Heart, Share2, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { mockCamps } from '@/src/lib/mockData';
import VerificationBadge from '@/src/components/VerificationBadge';
import { formatCurrency, cn } from '@/src/lib/utils';
import { LodgingBusinessSchema } from '@/src/lib/seo';
import { useLanguage } from '@/src/lib/LanguageContext';

export default function CampDetail() {
  const { slug } = useParams<{ slug: string }>();
  const camp = mockCamps.find(c => c.slug === slug) || mockCamps[0];
  const { t } = useLanguage();

  const amenities = [
    { icon: Bath, label: t('amenity.bath'), value: true },
    { icon: Wind, label: t('amenity.climate'), value: true },
    { icon: Coffee, label: t('amenity.food'), value: true },
    { icon: Users, label: t('amenity.guests').replace('{count}', camp.max_guests.toString()), value: true },
    { icon: Wifi, label: t('amenity.wifi'), value: false },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <Helmet>
        <title>{camp.name} | Luxury Desert Camp {t(`search.${camp.destination.split(' ')[0].toLowerCase()}`)} | Dunecamps</title>
        <meta name="description" content={camp.description_en} />
      </Helmet>

      <LodgingBusinessSchema 
        name={camp.name}
        description={camp.description_en}
        address={`${t(`search.${camp.destination.split(' ')[0].toLowerCase()}`)} Desert, Morocco`}
        latitude={camp.latitude}
        longitude={camp.longitude}
        priceRange="€€"
        amenities={amenities.map(a => a.label)}
        rating={4.9}
        reviewCount={42}
      />

      {/* Hero Gallery */}
      <section className="relative px-4 pt-12 pb-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-[#26215C]/60 hover:text-[#BA7517] mb-8 transition-colors">
          <ArrowLeft size={14} />
          <span>{t('detail.back')}</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-2xl relative">
            <img 
               src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1200" 
               className="w-full h-full object-cover" 
               alt={`${camp.name} Main View`}
            />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1509316975850-ff9958194c97?q=80&w=600" className="w-full h-full object-cover" alt="Interior" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl">
             <img src="https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=600" className="w-full h-full object-cover" alt="Food" />
          </div>
          <div className="md:col-span-2 rounded-3xl overflow-hidden shadow-xl relative">
             <img src="https://images.unsplash.com/photo-1489493585363-d6943649ef91?q=80&w=800" className="w-full h-full object-cover" alt="Stars" />
             <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full font-bold text-xs shadow-lg">
                {t('detail.photos')} (24)
             </button>
          </div>
        </div>
      </section>

      {/* Main Content Info */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
               <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <VerificationBadge tier={camp.verification_tier} />
                    <div className="flex items-center space-x-1 text-sm font-bold">
                       <Star size={16} className="text-amber-400 fill-amber-400" />
                       <span>4.9</span>
                       <span className="text-gray-400 opacity-60 font-medium">({t('detail.reviews').replace('{count}', '42')})</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#26215C] mb-2">{camp.name}</h1>
                  <div className="flex items-center space-x-2 text-[#BA7517] font-bold text-sm">
                     <MapPin size={16} />
                     <span>{t(`search.${camp.destination.split(' ')[0].toLowerCase()}`)} Desert, Morocco</span>
                  </div>
               </div>
               <div className="flex items-center space-x-2">
                  <button className="p-3 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                     <Share2 size={20} className="text-[#26215C]" />
                  </button>
                  <button className="p-3 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                     <Heart size={20} className="text-rose-500" />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-[#BA7517]/10">
               {amenities.map((item) => (
                 <div key={item.label} className={cn("flex items-center space-x-3", !item.value && "opacity-30")}>
                    <item.icon size={20} className="text-[#BA7517]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>

            <div className="prose prose-stone max-w-none text-[#26215C]/80 leading-relaxed mb-16">
               <h3 className="text-xl font-bold text-[#26215C] mb-4">{t('detail.experience')}</h3>
               <p className="mb-6">{camp.description_en}</p>
               <p>Every tent in {camp.name} is designed to offer maximum privacy while staying connected to the raw beauty of the Sahara. Our staff is recruited from the local tribes to ensure you experience genuine Berber hospitality. Dinner is included, featuring locally-sourced ingredients and traditional slow-cooked tagines.</p>
            </div>

            {/* Verification Detail */}
            <div className="bg-[#BA7517]/5 rounded-3xl p-8 border border-[#BA7517]/10 mb-16">
               <div className="flex items-center space-x-4 mb-6">
                  <ShieldCheck size={32} className="text-[#BA7517]" />
                  <h4 className="text-lg font-bold text-[#26215C]">{t('detail.why_verified').replace('{tier}', camp.verification_tier)}</h4>
               </div>
               <ul className="space-y-3">
                  {[
                    "Video walkthrough confirmed by team in March 2026",
                    "Management IDs and local business permits verified",
                    "Direct operator WhatsApp connection post-booking",
                    "Private bathrooms physically tested for water pressure"
                  ].map((check) => (
                    <li key={check} className="flex items-start space-x-2 text-sm text-[#26215C]/80">
                       <Check size={16} className="text-green-600 mt-1 shrink-0" />
                       <span>{check}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:col-span-1">
             <div className="sticky top-28 bg-white rounded-3xl p-8 border border-[#BA7517]/10 shadow-2xl">
                <div className="flex items-baseline justify-between mb-8">
                   <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-[#26215C]">{formatCurrency(camp.price_per_night)}</span>
                      <span className="text-xs text-gray-400 font-medium">{t('camp.night')}</span>
                   </div>
                   <div className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold uppercase tracking-widest">{t('detail.available')}</div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{t('detail.dates')}</label>
                      <button className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-[#26215C]">
                         <span>May 14 - May 16</span>
                      </button>
                   </div>
                   <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{t('detail.tent_type')}</label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-[#26215C] focus:outline-none">
                         <option>Royal Luxury Suite (+€0)</option>
                         <option>Honeymoon Tent (+€40)</option>
                         <option>Family Tent (+€20)</option>
                      </select>
                   </div>
                   <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{t('search.guests')}</label>
                      <input type="number" defaultValue="2" min="1" max={camp.max_guests} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold text-[#26215C]" />
                   </div>
                </div>

                <div className="space-y-3 mb-8 py-4 border-t border-gray-100">
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-400">€220 x 2 nights</span>
                      <span className="font-semibold">€440</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{t('detail.service_fee')}</span>
                      <span className="font-semibold">€0</span>
                   </div>
                   <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-lg font-bold text-[#26215C]">{t('detail.total')}</span>
                      <span className="text-lg font-bold text-[#26215C]">€440</span>
                   </div>
                </div>

                <Link 
                   to={`/book/${camp.slug}`}
                   className="block w-full bg-[#BA7517] hover:bg-[#EF9F27] text-white text-center py-4 rounded-lg md:rounded-xl font-bold shadow-lg shadow-[#BA7517]/20 transition-all active:scale-[0.98]"
                >
                   {t('detail.reserve')}
                </Link>
                <p className="text-[10px] text-center text-gray-400 mt-4 px-4 font-medium">{t('detail.charge_notice')}</p>
             </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
