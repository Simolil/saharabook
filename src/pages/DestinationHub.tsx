import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Map as MapIcon, Filter, ArrowDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { cn } from '@/src/lib/utils';
import SearchBar from '@/src/components/SearchBar';
import CampCard from '@/src/components/CampCard';
import { mockCamps } from '@/src/lib/mockData';
import { FAQSchema } from '@/src/lib/seo';

export default function DestinationHub() {
  const { id } = useParams<{ id: string }>();
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const destinationData: Record<string, any> = {
    merzouga: {
      name: 'Merzouga (Erg Chebbi)',
      tagline: 'The Infinite Sands',
      description: 'Erg Chebbi is home to the most iconic, high sand dunes in Morocco. Rising up to 150 meters, they offer a classic Sahara experience with deep golden sands and nomadic culture.',
      faqs: [
        { q: "How do I get to Merzouga from Marrakech?", a: "The drive takes about 9-10 hours. Most travelers take a private tour or a Supratours bus." },
        { q: "Is Merzouga safe for solo travelers?", a: "Yes, Merzouga is very safe. We recommend booking verified camps through SaharaBook.ma to avoid touts." }
      ]
    },
    zagora: {
      name: 'Zagora (Erg Chigaga)',
      tagline: 'The Wild Frontier',
      description: 'Zagora offers a more rugged, stone-and-sand experience. Erg Chigaga is the furthest and wildest desert in Morocco, requiring a 4x4 journey to reach truly high dunes.',
      faqs: [
        { q: "Is Zagora closer than Merzouga?", a: "Zagora town is closer (7 hours), but reaching the big dunes of Erg Chigaga takes just as long as Merzouga." }
      ]
    },
    agafay: {
      name: 'Agafay Desert',
      tagline: 'The Designer Desert',
      description: 'Located just outside Marrakech, Agafay is a rocky "stone desert" that offers stunning Atlas Mountain views and luxury glamping without the long travel time.',
      faqs: [
        { q: "Does Agafay have sand dunes?", a: "No, Agafay consists of rolling stone hills. It is not a sandy desert like Merzouga." }
      ]
    }
  };

  const data = destinationData[id || 'merzouga'] || destinationData.merzouga;
  const filteredCamps = mockCamps.filter(c => c.destination === id);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      <Helmet>
        <title>{data.name} Luxury Camps & Tours | SaharaBook.ma</title>
        <meta name="description" content={`Discover and book verified luxury desert camps in ${data.name}. ${data.description}`} />
      </Helmet>
      
      <FAQSchema faqs={data.faqs} />

      {/* Header Section */}
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <img 
          src={id === 'merzouga' ? "/merzouga-sunset.jpg" : "/desert-camp.jpg"}
          className="w-full h-full object-cover" 
          alt={data.name}
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
           <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-4">Destination Explorer</span>
           <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">{data.name}</h1>
           <p className="text-white font-medium text-lg italic font-serif">{data.tagline}</p>
        </div>
      </section>

      {/* Sticky Search Bar */}
      <div className={cn(
        "z-40 px-4 transition-all duration-500",
        isSticky ? "fixed top-24 left-0 right-0 w-full" : "relative -mt-16"
      )}>
        <SearchBar isSticky={isSticky} />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
               <div className="flex items-center space-x-2 mb-6">
                  <Filter size={16} className="text-[#BA7517]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#26215C]">Filters</h3>
               </div>
               
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Verification Tier</p>
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Price Range</p>
                    <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#BA7517]" />
                  </div>
               </div>
            </div>

            <div className="bg-[#26215C] p-8 rounded-3xl text-white">
               <h4 className="text-lg font-bold mb-4">Trust Verified</h4>
               <p className="text-xs text-white/70 leading-relaxed mb-6">
                 Every camp in this grid has been physically inspected by our team. 
                 Prices shown include all taxes and local fees.
               </p>
               <Link to="/scam-guide" className="text-[#BA7517] text-xs font-bold flex items-center space-x-2 hover:underline">
                  <span>Learn about our verification</span>
               </Link>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="lg:col-span-3">
             <div className="flex justify-between items-center mb-10">
                <p className="text-sm text-[#26215C]/60">Showing <strong>{filteredCamps.length}</strong> handpicked camps</p>
                <button className="flex items-center space-x-2 text-sm font-bold text-[#26215C] hover:text-[#BA7517]">
                   <MapIcon size={16} />
                   <span>View on Map</span>
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCamps.length > 0 ? (
                  filteredCamps.map(camp => (
                    <CampCard key={camp.id} camp={camp} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-gray-400">No camps found for this filter combination.</p>
                  </div>
                )}
             </div>

             {/* Editorial Content */}
             <div className="mt-24 pt-24 border-t border-[#BA7517]/10">
                <h2 className="text-3xl font-bold tracking-tighter text-[#26215C] mb-8">Planning Your Stay in {data.name}</h2>
                <div className="prose prose-stone max-w-none text-[#26215C]/80 leading-relaxed">
                   <p className="mb-6">{data.description}</p>
                   <p>Booking with SaharaBook.ma ensures you direct access to camp operators via WhatsApp once confirmed, guaranteed private bathrooms (for Elite/Verified tiers), and secure digital payments. We handle the complexity of the Saharan logistics so you can focus on the stars.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
