import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Map, Info, Check, Sparkles } from 'lucide-react';
import SearchBar from '@/src/components/SearchBar';
import CampCard from '@/src/components/CampCard';
import Slideshow from '@/src/components/Slideshow';
import { mockCamps } from '@/src/lib/mockData';
import { Helmet } from 'react-helmet-async';
import { StarZellij } from '@/src/components/Zellij';
import { useLanguage } from '@/src/lib/LanguageContext';

interface AnimatedHeroWordProps {
  word: string;
  key?: string | number;
}

const AnimatedHeroWord = ({ word }: AnimatedHeroWordProps) => {
  const { t } = useLanguage();
  const translatedWord = t(`hero.${word.toLowerCase()}`);
  const isVerified = word.toLowerCase() === 'verified';

  return (
    <motion.span
      initial={{ opacity: 0, y: 35, rotateX: -60, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -35, rotateX: 60, filter: 'blur(8px)' }}
      transition={{ 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ transformOrigin: "center bottom", backfaceVisibility: "hidden" }}
      className="inline-flex items-center justify-center md:justify-start dunes-text-sahara font-comic-cat tracking-tight pl-0 pr-2 select-none whitespace-nowrap"
    >
      <span>{translatedWord}</span>
      {isVerified && (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 md:w-16 md:h-16 ml-3 sm:ml-4 shrink-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.85 }}
        >
          <motion.path
            d="M4.5 12.5 C 6 14.5, 8.5 18, 10 20 C 13.5 13.5, 17 7, 20.5 4"
            stroke="#BA7517"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.0,
            }}
          />
        </motion.svg>
      )}
    </motion.span>
  );
};

export default function Home() {
  const [headerWord, setHeaderWord] = useState('Handpicked');
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderWord(prev => prev === 'Handpicked' ? 'Verified' : 'Handpicked');
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dunecamps | {t('hero.verified')} Luxury Desert Camps in Morocco</title>
        <meta name="description" content={t('footer.desc')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <Slideshow className="w-full h-full" />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#0B132B] via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-3 border border-[#BA7517]/40 px-6 py-2 rounded-xl mb-8 relative group cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <ShieldCheck size={16} className="text-[#BA7517] relative z-10" />
              <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] relative z-10">{t('hero.expert')}</span>
              
              {/* Subtle pulsing dot */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#BA7517] rounded-full">
                <motion.div 
                   className="absolute inset-0 bg-[#BA7517] rounded-full"
                   animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-8xl text-white tracking-tight leading-tight mb-10 flex flex-col md:flex-row items-center justify-center gap-x-2 gap-y-2 text-center px-4 font-comic-cat font-normal">
              <div className="flex items-center justify-center shrink-0">
                <motion.span 
                  initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="dunes-text-sahara font-comic-cat relative inline-block px-1 tracking-tight"
                >
                  {t('hero.the_sahara')}
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-white font-comic-cat text-3xl md:text-5xl align-baseline relative translate-y-1 md:translate-y-2"
                >
                  ,
                </motion.span>
              </div>
              <div className="font-comic-cat relative inline-flex items-center justify-center md:justify-start text-center md:text-left tracking-tight w-[200px] sm:w-[260px] md:w-[380px] lg:w-[460px] align-middle overflow-visible shrink-0 ml-1 md:ml-2">
                <AnimatePresence mode="wait">
                  <AnimatedHeroWord key={headerWord} word={headerWord} />
                </AnimatePresence>
              </div>
            </h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
           <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-4 bg-[#BA7517]"
              />
           </div>
        </div>
      </section>

      {/* Intro Hook & Search Section */}
      <section className="bg-[#FAF7F2] pt-16 pb-16 md:pt-20 md:pb-24 border-b border-[#BA7517]/10 relative overflow-hidden">
        {/* Search Bar - Positioned directly in the white page after the slideshow */}
        <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-20 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SearchBar />
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] translate-x-12 -translate-y-12">
          <StarZellij />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#0B132B] text-xl md:text-3xl font-bold leading-tight tracking-tight">
            {t('home.trust_hook').split('No scams')[0]} <span className="text-[#BA7517] bg-[#BA7517]/10 px-3 py-1 rounded-full italic font-medium inline-block mt-2 md:mt-0">No scams{t('home.trust_hook').split('No scams')[1]}</span>
          </p>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#0B132B] mb-4">{t('home.find_your_camp')}</h2>
              <p className="text-[#0B132B]/60 max-w-md">{t('home.compare_desc')}</p>
            </div>
            <Link to="/compare" className="group flex items-center space-x-2 text-[#BA7517] font-bold text-sm">
              <span>{t('home.view_all')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'merzouga', name: t('search.merzouga'), sub: 'The High Sahara', img: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800' },
              { id: 'zagora', name: t('search.zagora'), sub: 'The Draa Gateway', img: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800' },
              { id: 'agafay', name: t('search.agafay'), sub: 'The Marrakech Secret', img: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800' },
              { id: 'foumzguid', name: t('search.foumzguid'), sub: 'Erg Chigaga Gateway', img: 'https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=800' }
            ].map((dest) => (
              <Link key={dest.id} to={`/destinations/${dest.id}`} className="relative h-96 group rounded-3xl overflow-hidden shadow-xl">
                <img src={dest.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <p className="text-[#BA7517] text-[10px] font-bold uppercase tracking-widest mb-1">{dest.sub}</p>
                   <h3 className="text-3xl font-serif font-semibold text-white">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Camps */}
      <section className="py-24 bg-[#FAF7F2] border-y border-[#BA7517]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-12">
            <ShieldCheck className="text-[#BA7517]" size={32} />
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#0B132B]">{t('home.top_rated')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCamps.map((camp) => (
              <CampCard key={camp.id} camp={camp} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-24 bg-[#0B132B] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-12 flex justify-center">
            <div className="w-20 h-20 bg-[#BA7517]/10 rounded-full flex items-center justify-center border border-[#BA7517]/20">
               <div className="relative">
                 <Info className="text-[#BA7517]" size={40} />
               </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-8 leading-tight">
            {t('home.scam_title').split('Don\'t')[0]} 
            <span className="text-[#BA7517]"> Don't{t('home.scam_title').split('Don\'t')[1]}</span>
          </h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            {t('home.scam_desc')}
          </p>
          <Link to="/scam-guide" className="inline-flex items-center space-x-3 bg-white text-[#0B132B] px-8 py-4 rounded-lg md:rounded-xl font-bold hover:bg-[#BA7517] hover:text-white transition-all transform hover:-translate-y-1">
             <span>{t('home.scam_action')}</span>
             <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
