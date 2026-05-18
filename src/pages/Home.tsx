import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Map, Info } from 'lucide-react';
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

  return (
    <motion.span
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
        exit: {
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
          },
        },
      }}
      className="inline-block whitespace-nowrap px-1 relative"
    >
      <span className="sr-only">{translatedWord}</span>
      <span className="flex" aria-hidden="true">
        {translatedWord.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={{
              initial: { opacity: 0, x: -15, filter: 'blur(8px)', scale: 0.9 },
              animate: { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 },
              exit: { opacity: 0, x: 15, filter: 'blur(8px)', scale: 0.9 },
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              exit: { delay: 0.15 } 
            }}
            className={`inline-block ${index >= translatedWord.length - 2 ? 'text-[#BA7517]' : 'text-white'}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
      
      {word === 'Verified' && (
        <motion.div 
          variants={{
            initial: { opacity: 0, x: -5 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 15, scale: 0.8, filter: 'blur(10px)' }
          }}
          transition={{ 
            animate: { duration: 1.2, delay: 0.6 },
            exit: { duration: 0.4, delay: 0 } 
          }}
          className="absolute left-[calc(100%+0.5rem)] md:left-[calc(100%+1.5rem)] top-1/2 -translate-y-1/2 w-20 h-12 md:w-36 md:h-24 pointer-events-none"
        >
          <svg viewBox="0 0 120 70" className="w-full h-full">
            <motion.path 
              d="M10 50 Q 35 15, 60 50 L 72 62 L 115 18" 
              stroke="#BA7517" 
              strokeWidth="5" 
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1.0, 
                delay: 0.9,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
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
        <title>Bivouac.ma | {t('hero.verified')} Luxury Desert Camps in Morocco</title>
        <meta name="description" content={t('footer.desc')} />
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
            <motion.div 
              className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-8 shadow-2xl relative overflow-hidden group cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Animated highlight sweep */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              />
              
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
            <h1 className="text-5xl md:text-8xl text-white tracking-tighter leading-tight mb-10 flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-2 text-center px-4">
              <div className="flex items-center justify-center shrink-0">
                <span className="dunes-text-sahara font-painting relative transition-all duration-700 inline-block px-1 tracking-normal">{t('hero.the_sahara')}</span>
                <span className="text-white font-serif italic text-3xl md:text-5xl align-baseline mx-1">,</span>
              </div>
              <div className="font-painting relative transition-all duration-700 inline-block tracking-normal min-w-[240px] md:min-w-[500px] text-center md:text-left align-middle overflow-visible">
                <AnimatePresence mode="wait">
                  <AnimatedHeroWord key={headerWord} word={headerWord} />
                </AnimatePresence>
              </div>
            </h1>
          </motion.div>
        </div>

        {/* Search Bar - Positioned near the bottom edge */}
        <div className="absolute bottom-24 md:bottom-14 left-0 w-full z-20">
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
            {t('home.trust_hook').split('No scams')[0]} <span className="text-[#BA7517] bg-[#BA7517]/10 px-3 py-1 rounded-full italic font-medium inline-block mt-2 md:mt-0">No scams{t('home.trust_hook').split('No scams')[1]}</span>
          </p>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter text-[#26215C] mb-4">{t('home.find_your_camp')}</h2>
              <p className="text-[#26215C]/60 max-w-md">{t('home.compare_desc')}</p>
            </div>
            <Link to="/compare" className="group flex items-center space-x-2 text-[#BA7517] font-bold text-sm">
              <span>{t('home.view_all')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'merzouga', name: t('search.merzouga'), sub: 'The High Sahara', img: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800' },
              { id: 'zagora', name: t('search.zagora'), sub: 'The Draa Gateway', img: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=800' },
              { id: 'agafay', name: t('search.agafay'), sub: 'The Marrakech Secret', img: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800' }
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
            <h2 className="text-4xl font-bold tracking-tighter text-[#26215C]">{t('home.top_rated')}</h2>
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
               <div className="relative">
                 <Info className="text-[#BA7517]" size={40} />
               </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            {t('home.scam_title').split('Don\'t')[0]} 
            <span className="text-[#BA7517]"> Don't{t('home.scam_title').split('Don\'t')[1]}</span>
          </h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            {t('home.scam_desc')}
          </p>
          <Link to="/scam-guide" className="inline-flex items-center space-x-3 bg-white text-[#26215C] px-8 py-4 rounded-full font-bold hover:bg-[#BA7517] hover:text-white transition-all transform hover:-translate-y-1">
             <span>{t('home.scam_action')}</span>
             <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
