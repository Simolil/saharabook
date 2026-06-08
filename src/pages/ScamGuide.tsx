import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FAQSchema } from '@/src/lib/seo';
import { useLanguage } from '@/src/lib/LanguageContext';

export default function ScamGuide() {
  const { t } = useLanguage();
  const scams = [
    {
      title: "The 'Fake Camp' Bait",
      description: "Touts at Marrakech or Ouarzazate bus stations show you photos of luxury camps at low prices, but take you to a basic camp with no facilities.",
      prevention: "Only book via Dunecamps — we hand-verify every location physically."
    },
    {
      title: "Hidden Transport Fees",
      description: "A camp booking seems cheap, but upon arrival, you are charged €50-€100 extra per person for the 4x4 or camel trek to reach the dunes.",
      prevention: "All Dunecamps elite/verified bookings include camel transfer or 4x4 options explicitly."
    },
    {
      title: "Phantasmagoric Bathrooms",
      description: "Listing says 'private bathroom', but it's actually a shared bucket shower 200m away behind a dune.",
      prevention: "Our 'Elite' tier strictly requires ensuite flushing toilets and hot showers within the tent."
    }
  ];

  const faqs = [
    { q: "Is it safe to drive to Merzouga myself?", a: "Yes, the roads to Merzouga and Zagora are paved. However, reaching Erg Chigaga always requires a 4x4 and a guide." },
    { q: "Can I book a camp on arrival?", a: "We strongly advise against it. Touts will approach you, often offering inferior camps at inflated prices." }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <Helmet>
        <title>Morocco Desert Scam Guide 2026 | Dunecamps</title>
        <meta name="description" content="How to avoid common Saharan desert scams in Merzouga and Zagora. The ultimate traveler guide to safe desert bookings." />
      </Helmet>

      <FAQSchema faqs={faqs} />

      <section className="py-24 bg-[#26215C] text-white">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <ShieldAlert size={64} className="text-[#BA7517] mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight">
               {t('scam.guide_title').split('Ruin')[0]}<br />
               <span className="text-[#BA7517]">Ruin{t('scam.guide_title').split('Ruin')[1]}</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
               {t('scam.guide_subtitle')}
            </p>
         </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scams.map((scam, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">
                 <div className="flex items-center space-x-2 text-rose-500 mb-6 uppercase tracking-widest text-[10px] font-bold">
                    <XCircle size={14} />
                    <span>{t('scam.the_scam')}</span>
                 </div>
                 <h3 className="text-xl font-bold text-[#26215C] mb-4">{scam.title}</h3>
                 <p className="text-[#26215C]/60 text-sm mb-8 flex-1 leading-relaxed">{scam.description}</p>
                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <div className="flex items-center space-x-2 text-green-700 mb-2 uppercase tracking-widest text-[10px] font-bold">
                       <ShieldCheck size={14} />
                       <span>{t('scam.prevention')}</span>
                    </div>
                    <p className="text-green-800 text-xs font-medium leading-relaxed">{scam.prevention}</p>
                 </div>
              </div>
            ))}
         </div>

         <div className="mt-24 bg-white rounded-[40px] p-12 md:p-20 shadow-2xl relative overflow-hidden border border-gray-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BA7517]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-4xl font-bold tracking-tighter text-[#26215C] mb-8 leading-tight">{t('scam.promise_title').split('Promise')[0]} <span className="text-[#BA7517]">Promise.</span></h2>
                  <ul className="space-y-6">
                     {[
                       "Physical onsite verification of every camp every 6 months",
                       "Escrow payments (operators paid only after you check in)",
                       "Zero hidden transport fees policy",
                       "Direct access to your camp manager on WhatsApp"
                     ].map((item, i) => (
                       <li key={i} className="flex items-start space-x-4">
                          <CheckCircle2 size={24} className="text-[#BA7517] mt-1" />
                          <span className="text-[#26215C] font-semibold">{item}</span>
                       </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#BA7517]/10">
                  <h4 className="font-bold text-[#26215C] mb-4">{t('scam.ready')}</h4>
                  <p className="text-sm text-[#26215C]/60 mb-8">{t('home.scam_desc').split('. ')[1]}</p>
                  <Link to="/compare" className="w-full bg-[#26215C] text-white py-4 rounded-lg md:rounded-xl font-bold flex items-center justify-center space-x-2">
                     <span>{t('scam.explore_action')}</span>
                     <ArrowRight size={18} />
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
