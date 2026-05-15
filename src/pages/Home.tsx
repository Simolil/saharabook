import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Map, Info } from 'lucide-react';
import SearchBar from '@/src/components/SearchBar';
import CampCard from '@/src/components/CampCard';
import Slideshow from '@/src/components/Slideshow';
import { mockCamps } from '@/src/lib/mockData';
import { Helmet } from 'react-helmet-async';
import { StarZellij } from '@/src/components/Zellij';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>SaharaBook.ma | Verified Luxury Desert Camps in Morocco</title>
        <meta name="description" content="Book your dream desert escape in Merzouga, Zagora, or Agafay. Hand-verified camps, secure payments, and zero scams." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <Slideshow className="w-full h-full" />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#26215C] via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mt-[-15vh] md:mt-[-10vh]">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
            <span className="text-[#BA7517] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs block mb-4">Morocco's Verified Desert Expert</span>
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter leading-tight mb-10">
              <span className="dunes-text-sahara font-painting relative transition-all duration-700 inline-block px-1">The Sahara</span>
              <span className="text-[#BA7517] font-serif italic text-3xl md:text-5xl align-middle mx-2 opacity-60">,</span>
              <span className="font-painting relative transition-all duration-700 inline-block px-1">
                <span className="dunes-text-handpicked">Handpick</span>
                <span className="text-[#BA7517]">ed</span>
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Search Bar - Positioned near the bottom edge */}
        <div className="absolute bottom-10 md:bottom-14 left-0 w-full z-20">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <SearchBar />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
           <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-4 bg-[#BA7517]"
              />
           </div>
        </div>
      </section>

      {/* Intro Hook */}
      <section className="bg-white py-16 md:py-24 border-b border-[#BA7517]/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] translate-x-12 -translate-y-12">
          <StarZellij />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#26215C] text-xl md:text-3xl font-bold leading-tight tracking-tight">
            We physically verify every camp so you don't have to. <span className="text-[#BA7517] bg-[#BA7517]/10 px-3 py-1 rounded-full italic font-medium inline-block mt-2 md:mt-0">No scams, no stress, just the magic of the dunes.</span>
          </p>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter text-[#26215C] mb-4">Choose Your <span className="text-[#BA7517]">Desert</span></h2>
              <p className="text-[#26215C]/60 max-w-md">Each destination offers a unique rhythm. From the high dunes of Merzouga to the stone silence of Agafay.</p>
            </div>
            <Link to="/compare" className="group flex items-center space-x-2 text-[#BA7517] font-bold text-sm">
              <span>Compare Destinations</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'merzouga', name: 'Merzouga', sub: 'The High Sahara', img: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800' },
              { id: 'zagora', name: 'Zagora', sub: 'The Draa Gateway', img: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800' },
              { id: 'agafay', name: 'Agafay', sub: 'The Marrakech Secret', img: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800' }
            ].map((dest) => (
              <Link key={dest.id} to={`/destinations/${dest.id}`} className="relative h-96 group rounded-3xl overflow-hidden shadow-xl">
                <img src={dest.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26215C]/90 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <p className="text-[#BA7517] text-[10px] font-bold uppercase tracking-widest mb-1">{dest.sub}</p>
                   <h3 className="text-3xl font-bold text-white tracking-tight">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Camps */}
      <section className="py-24 bg-white border-y border-[#BA7517]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-12">
            <ShieldCheck className="text-[#BA7517]" size={32} />
            <h2 className="text-4xl font-bold tracking-tighter text-[#26215C]">Our Verified <span className="text-[#BA7517]">Collection</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCamps.map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-24 bg-[#26215C] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12 flex justify-center">
            <div className="w-20 h-20 bg-[#BA7517]/10 rounded-full flex items-center justify-center border border-[#BA7517]/20">
               <Info className="text-[#BA7517]" size={40} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            Planning a Moroccan desert trip? 
            <span className="text-[#BA7517]"> Don't get scammed.</span>
          </h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            From "fake camps" to hidden transportation fees, the desert can be tricky. 
            We've built the world's first trust-first booking platform for Sahara explorers.
          </p>
          <Link to="/scam-guide" className="inline-flex items-center space-x-3 bg-white text-[#26215C] px-8 py-4 rounded-full font-bold hover:bg-[#BA7517] hover:text-white transition-all transform hover:-translate-y-1">
             <span>Read the Definitive Scam Guide</span>
             <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
