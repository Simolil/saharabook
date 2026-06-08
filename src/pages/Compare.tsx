import React from 'react';
import { Check, X, Info, MapPin, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import Layout from '@/src/components/Layout';

export default function Compare() {
  const categories: { name: string; merzouga: string; zagora: string; agafay: string; foumzguid: string }[] = [
    { name: 'Dune Height', merzouga: 'High (150m+)', zagora: 'Low to Medium', agafay: 'None (Stone hills)', foumzguid: 'Very High (120m+)' },
    { name: 'Sand Color', merzouga: 'Golden / Orange', zagora: 'Earthy / Reddish', agafay: 'Ochre Grey', foumzguid: 'Pale Gold / Ochre' },
    { name: 'Travel Time from MRK', merzouga: '9-10 Hours', zagora: '7-8 Hours', agafay: '45 Minutes', foumzguid: '8-9 Hours' },
    { name: 'Crowd Level', merzouga: 'Moderate', zagora: 'Low (Wild)', agafay: 'High (Boutique)', foumzguid: 'Extremely Low' },
    { name: 'Activities', merzouga: 'Camel, Sandboard, 4x4', zagora: 'Trekking, 4x4', agafay: 'Infinity Pools, Quad', foumzguid: '4x4 expedition, Off-roading, Stargazing' },
    { name: 'Best For', merzouga: 'Classic Sahara', zagora: 'Wild Exploration', agafay: 'Luxury Extension', foumzguid: 'Deep Solitude' }
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-24">
      <Helmet>
        <title>Compare Merzouga vs Zagora vs Agafay vs Foum Zguid | Dunecamps</title>
        <meta name="description" content="Which Morocco desert destination is right for you? Compare dunes, travel time, and experiences." />
      </Helmet>

      <section className="py-24 bg-[#FAF7F2]">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#26215C] mb-8">Where the <span className="text-[#BA7517] italic">Stars</span> Align.</h1>
            <p className="text-[#26215C]/60 text-lg leading-relaxed max-w-2xl mx-auto">
               Not all deserts are created equal. Whether you crave the towering dunes of Erg Chebbi, the deep silence of Erg Chigaga via Foum Zguid, or the sophisticated calm of Agafay, we help you find your perfect match.
            </p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
         <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-5 hidden md:grid-cols-5 md:grid">
               <div className="p-10 bg-gray-50 border-r border-b border-gray-100 flex items-center">
                  <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Comparison Table</span>
               </div>
               {['Merzouga', 'Zagora', 'Agafay', 'Foum Zguid'].map((d) => (
                 <div key={d} className="p-10 border-b border-r border-gray-100 last:border-r-0 text-center">
                    <h3 className="text-xl font-serif font-semibold text-[#26215C]">{d}</h3>
                    <Link to={`/destinations/${d.toLowerCase().replace(' ', '')}`} className="text-[10px] font-bold text-[#BA7517] uppercase tracking-widest mt-2 hover:underline inline-block">Explore Hub</Link>
                 </div>
               ))}
            </div>

            {categories.map((cat, i) => (
               <div key={cat.name} className="grid grid-cols-1 md:grid-cols-5 border-b border-gray-100 group">
                  <div className="p-8 md:p-10 bg-gray-50/50 md:border-r border-gray-100 flex items-center">
                     <span className="text-xs font-bold text-[#26215C] uppercase tracking-wider">{cat.name}</span>
                  </div>
                  {['merzouga', 'zagora', 'agafay', 'foumzguid'].map((key) => (
                    <div key={key} className="p-8 md:p-10 md:border-r last:border-r-0 border-gray-100 text-center transition-colors group-hover:bg-[#BA7517]/5 flex items-center justify-center">
                       <p className="text-sm font-semibold text-[#26215C]">{cat[key as keyof Omit<typeof cat, 'name'>]}</p>
                    </div>
                  ))}
               </div>
            ))}
         </div>

         {/* Recommendation Engine Lite */}
         <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "The Bucket Lister", 
                dest: "Merzouga", 
                desc: "You want the massive orange dunes you see in movies. You don't mind the 10-hour drive for the ultimate reward.",
                color: "bg-[#BA7517]"
              },
              { 
                title: "The Wild Nomad", 
                dest: "Zagora", 
                desc: "You want silence and isolation. You prefer off-the-beaten-path trails and fewer tourists.",
                color: "bg-[#26215C]"
              },
              { 
                title: "The Chic Explorer", 
                dest: "Agafay", 
                desc: "You have limited time but want a luxury desert aesthetic, sunset drinks, and a boutique camp experience.",
                color: "bg-[#D85A30]"
              },
              { 
                title: "The Off-Road Pioneer", 
                dest: "Foum Zguid", 
                desc: "You demand true isolation, flat dry clay-lakes (Lake Iriqui) and massive sandy giants. Ready to explore off-piste.",
                color: "bg-[#7A3E15]"
              }
            ].map(rec => (
              <div key={rec.dest} className="flex flex-col h-full bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm">
                 <div className={cn("w-12 h-12 rounded-full mb-8 flex items-center justify-center text-white", rec.color)}>
                    <Info size={24} />
                 </div>
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">{rec.title}</h4>
                 <h3 className="text-2xl font-bold text-[#26215C] mb-6">Choose {rec.dest}</h3>
                 <p className="text-sm text-[#26215C]/60 mb-8 leading-relaxed flex-1">{rec.desc}</p>
                 <Link to={`/destinations/${rec.dest.toLowerCase().replace(' ', '')}`} className="w-full py-4 text-center border-2 border-[#BA7517] text-[#BA7517] font-bold rounded-lg md:rounded-xl hover:bg-[#BA7517] hover:text-white transition-all">
                    View Verified Camps
                 </Link>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
