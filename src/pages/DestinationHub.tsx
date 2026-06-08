import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Map as MapIcon, Filter, ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import SearchBar from '@/src/components/SearchBar';
import CampCard from '@/src/components/CampCard';
import { mockCamps } from '@/src/lib/mockData';
import { tours } from '@/src/lib/toursData';
import { FAQSchema } from '@/src/lib/seo';
import { useLanguage } from '@/src/lib/LanguageContext';

export default function DestinationHub() {
  const { id } = useParams<{ id: string }>();
  const [isSticky, setIsSticky] = React.useState(() => 
    typeof window !== 'undefined' ? (window.innerWidth >= 768 && window.scrollY > 400) : false
  );
  const { t } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setIsSticky(window.scrollY > 400);
      } else {
        setIsSticky(false);
      }
    };
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const destinationData: Record<string, any> = {
    merzouga: {
      name: t('search.merzouga'),
      tagline: 'The Infinite Sands',
      description: 'Erg Chebbi is home to the most iconic, high sand dunes in Morocco. Rising up to 150 meters, they offer a classic Sahara experience with deep golden sands and nomadic culture.',
      faqs: [
        { q: "How do I get to Merzouga from Marrakech?", a: "The drive takes about 9-10 hours. Most travelers take a private tour or a Supratours bus." },
        { q: "Is Merzouga safe for solo travelers?", a: "Yes, Merzouga is very safe. We recommend booking verified camps through Dunecamps to avoid touts." }
      ]
    },
    zagora: {
      name: t('search.zagora'),
      tagline: 'The Wild Frontier',
      description: 'Zagora offers a more rugged, stone-and-sand experience. Erg Chigaga is the furthest and wildest desert in Morocco, requiring a 4x4 journey to reach truly high dunes.',
      faqs: [
        { q: "Is Zagora closer than Merzouga?", a: "Zagora town is closer (7 hours), but reaching the big dunes of Erg Chigaga takes just as long as Merzouga." }
      ]
    },
    agafay: {
      name: t('search.agafay'),
      tagline: 'The Designer Desert',
      description: 'Located just outside Marrakech, Agafay is a rocky "stone desert" that offers stunning Atlas Mountain views and luxury glamping without the long travel time.',
      faqs: [
        { q: "Does Agafay have sand dunes?", a: "No, Agafay consists of rolling stone hills. It is not a sandy desert like Merzouga." }
      ]
    },
    foumzguid: {
      name: t('search.foumzguid'),
      tagline: 'The Silent Giants',
      description: 'Foum Zguid is the ultimate gateway to Erg Chigaga, Morocco’s wildest and most isolated desert dunes. Traveling across Lake Iriqui, this path offers uncompromised solitude and raw Saharan beauty.',
      faqs: [
        { q: "How to reach Erg Chigaga from Foum Zguid?", a: "Reaching the deep dunes from Foum Zguid requires an off-road 4x4 vehicle to traverse 2-3 hours of rugged fossil plateaus and the dried Lake Iriqui clay bed." },
        { q: "Is Foum Zguid the best path for Erg Chigaga?", a: "Yes, it is the most Direct off-road track and bypasses the longer, more winding roads, offering an immediate transition to raw wilderness." }
      ]
    }
  };

  const data = destinationData[id || 'merzouga'] || destinationData.merzouga;
  const filteredCamps = mockCamps.filter(c => c.destination === id);
  const matchingTour = tours.find(t => t.destination === id);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      <Helmet>
        <title>{data.name} Luxury Camps & Tours | Dunecamps</title>
        <meta name="description" content={`Discover and book verified luxury desert camps in ${data.name}. ${data.description}`} />
      </Helmet>
      
      <FAQSchema faqs={data.faqs} />

      {/* Header Section */}
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <img 
          src={
            id === 'merzouga' 
              ? "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1600" 
              : id === 'agafay'
                ? "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1600"
                : id === 'foumzguid'
                  ? "https://images.unsplash.com/photo-1489493585363-d6943649ef91?q=80&w=1600"
                  : "https://images.unsplash.com/photo-1509316975850-ff9958194c97?q=80&w=1600"
          }
          className="w-full h-full object-cover" 
          alt={data.name}
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
           <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-4">{t('hub.explorer')}</span>
           <h1 className="text-5xl md:text-7xl font-serif font-bold italic text-white tracking-wide mb-4">{data.name}</h1>
           <p className="text-white font-medium text-lg italic font-serif">{data.tagline}</p>
        </div>
      </section>

      {/* Search Bar Wrapper - Keeps page layout static on scroll transition to prevent visual jumps */}
      <div className="relative -mt-16 z-40 px-4 h-24 mb-6">
        <div className={cn(
          "w-full transition-all duration-300",
          isSticky ? "md:fixed md:top-6 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-7xl md:px-4 md:z-45 relative" : "relative"
        )}>
          <SearchBar isSticky={isSticky} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
               <div className="flex items-center space-x-2 mb-6">
                  <Filter size={16} className="text-[#BA7517]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#26215C]">{t('hub.filters')}</h3>
               </div>
               
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t('hub.tier')}</p>
                    <div className="space-y-2">
                       {['Elite', 'Verified', 'Listed'].map((tier) => (
                         <label key={tier} className="flex items-center space-x-2 text-sm cursor-pointer hover:text-[#BA7517]">
                            <input type="checkbox" className="rounded border-gray-300 text-[#BA7517] focus:ring-[#BA7517]" />
                            <span>{tier} Only</span>
                         </label>
                       ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t('hub.price')}</p>
                    <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#BA7517]" />
                  </div>
               </div>
            </div>

            <div className="bg-[#26215C] p-8 rounded-3xl text-white">
               <h4 className="text-xl font-serif font-semibold tracking-wide mb-4">{t('hub.trust_title')}</h4>
               <p className="text-xs text-white/70 leading-relaxed mb-6">
                 {t('hub.trust_desc')}
               </p>
               <Link to="/scam-guide" className="text-[#BA7517] text-xs font-bold flex items-center space-x-2 hover:underline">
                  <span>{t('hub.trust_action')}</span>
               </Link>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="lg:col-span-3">
             <div className="flex justify-between items-center mb-10">
                <p className="text-sm text-[#26215C]/60">{t('hub.showing').replace('{count}', filteredCamps.length.toString())}</p>
                <button className="flex items-center space-x-2 text-sm font-bold text-[#26215C] hover:text-[#BA7517]">
                   <MapIcon size={16} />
                   <span>{t('hub.map')}</span>
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCamps.length > 0 ? (
                  filteredCamps.map(camp => (
                    <CampCard key={camp.id} camp={camp} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-gray-400">{t('hub.none')}</p>
                  </div>
                )}
             </div>

              {/* Bespoke Programs / Tours Section */}
              {matchingTour && (
                <div className="mt-16 bg-[#26215C] p-8 md:p-12 rounded-[40px] border border-[#BA7517]/30 shadow-2xl relative overflow-hidden text-left">
                  {/* Background graphic */}
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none translate-x-12 -translate-y-12">
                     <svg viewBox="0 0 100 100" className="w-full h-full fill-[#BA7517]">
                        <polygon points="50,0 100,35 80,90 20,90 0,35" />
                     </svg>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10 w-full text-left">
                     <div className="flex-1 space-y-4">
                        <span className="inline-block px-3 py-1 bg-[#BA7517]/20 border border-[#BA7517]/30 rounded-full text-[#BA7517] text-[10px] font-bold uppercase tracking-widest">
                           Featured Experience Program
                        </span>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide leading-tight">
                           {matchingTour.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
                           {matchingTour.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-bold text-white/85 pt-2">
                           <span className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-mono">⏱ {matchingTour.duration}</span>
                           <span className="bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 font-mono">📍 Starts: {matchingTour.start_city}</span>
                           <span className="bg-[#BA7517]/20 text-[#EF9F27] px-3 py-1.5 rounded-full border border-[#BA7517]/30">Base Price From €{matchingTour.price}</span>
                        </div>
                     </div>
                     <div className="shrink-0">
                        <Link 
                          to={`/tours/${matchingTour.slug}`} 
                          className="inline-flex items-center space-x-2 bg-[#BA7517] hover:bg-[#EF9F27] text-white px-8 py-4 rounded-lg md:rounded-xl font-bold text-sm shadow-xl transition-all transform hover:-translate-y-1"
                        >
                           <span>View Program Details</span>
                        </Link>
                     </div>
                  </div>
                </div>
              )}

             {/* Editorial Content */}
             <div className="mt-24 pt-24 border-t border-[#BA7517]/10">
                <h2 className="text-4xl font-serif font-bold text-[#26215C] tracking-tight mb-8">{t('hub.planning')} in {data.name}</h2>
                <div className="prose prose-stone max-w-none text-[#26215C]/80 leading-relaxed">
                   <p className="mb-6">{data.description}</p>
                   <p>Booking with Dunecamps ensures you direct access to camp operators via WhatsApp once confirmed, guaranteed private bathrooms (for Elite/Verified tiers), and secure digital payments. We handle the complexity of the Saharan logistics so you can focus on the stars.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
