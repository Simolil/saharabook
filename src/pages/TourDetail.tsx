import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, BadgeEuro, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ProductSchema } from '@/src/lib/seo';
import { tours } from '@/src/lib/toursData';

export default function TourDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tour = tours.find(t => t.slug === slug) || tours[0];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <Helmet>
        <title>{tour.title} | SaharaBook.ma</title>
        <meta name="description" content={tour.description} />
      </Helmet>

      <ProductSchema 
        name={tour.title}
        description={tour.description}
        price={tour.price}
        currency="EUR"
        images={["/merzouga-sunset.jpg"]}
      />

      <section className="relative h-[60vh]">
         <img 
            src="/merzouga-sunset.jpg" 
            className="w-full h-full object-cover" 
            alt={tour.title}
         />
         <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#FAF7F2]" />
         <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4">
            <Link to="/" className="inline-flex items-center space-x-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest mb-8">
               <ArrowLeft size={14} />
               <span>All Journeys</span>
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-[#26215C] tracking-tighter max-w-3xl leading-tight">
               {tour.title}
            </h1>
         </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
               {/* Tour Meta */}
               <div className="flex flex-wrap gap-8 py-8 border-y border-[#BA7517]/10">
                  <div className="flex items-center space-x-3">
                     <Clock className="text-[#BA7517]" size={20} />
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Duration</p>
                        <p className="text-sm font-bold text-[#26215C]">{tour.duration}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-3">
                     <MapPin className="text-[#BA7517]" size={20} />
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Starts From</p>
                        <p className="text-sm font-bold text-[#26215C]">{tour.start_city}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-3">
                     <BadgeEuro className="text-[#BA7517]" size={20} />
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Base Price</p>
                        <p className="text-sm font-bold text-[#26215C]">From €{tour.price}</p>
                     </div>
                  </div>
               </div>

               {/* Content */}
               <div className="prose prose-stone max-w-none text-[#26215C]/80">
                  <h2 className="text-2xl font-bold text-[#26215C] mb-6">Overview</h2>
                  <div className="whitespace-pre-line leading-relaxed italic border-l-4 border-[#BA7517] pl-8 py-2 bg-white rounded-r-2xl shadow-sm mb-12">
                     {tour.description}
                  </div>
                  <div className="leading-relaxed space-y-6">
                    {tour.content.split('\n').map((para, i) => para.trim() && (
                      <p key={i}>{para.trim()}</p>
                    ))}
                  </div>
               </div>

               {/* Highlights */}
               <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-[#26215C] mb-8">What is Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       "Private 4x4 Transportation",
                       "English-speaking Berber Guide",
                       "Luxury Camp Stay (Private Bath)",
                       "Camel Trek at Sunset",
                       "Sandboarding in the Dunes",
                       "Authentic Dinner & Music"
                     ].map(item => (
                       <div key={item} className="flex items-center space-x-3 text-sm font-semibold text-[#26215C]/80">
                          <CheckCircle size={18} className="text-[#BA7517]" />
                          <span>{item}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-1">
               <div className="sticky top-28 bg-[#26215C] p-10 rounded-[40px] text-white shadow-2xl">
                  <h4 className="text-2xl font-bold mb-6">Inquiry only</h4>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed">
                     Our tours are custom-designed for each guest. Contact our Saharan concierge to check dates and customize your itinerary.
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#BA7517]" placeholder="Your Email" />
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm h-32 focus:outline-none focus:border-[#BA7517]" placeholder="Questions / Preferred Dates" />
                  </div>

                  <button className="w-full bg-[#BA7517] hover:bg-[#EF9F27] text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all">
                     <Send size={18} />
                     <span>Send Inquiry</span>
                  </button>
                  <p className="text-[10px] text-center mt-6 text-white/40 uppercase tracking-widest font-bold">Responds within 2 hours</p>
               </div>
            </aside>
         </div>
      </section>
    </div>
  );
}
