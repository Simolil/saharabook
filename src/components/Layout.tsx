import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Calendar, Heart, User, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Helmet } from 'react-helmet-async';
import { StarZellij, ZellijCorner } from './Zellij';
import { useLanguage, Language } from '../lib/LanguageContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDestDropdownOpen, setIsDestDropdownOpen] = React.useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const currentUrl = `${import.meta.env.VITE_APP_URL || ''}${location.pathname}`;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const destinations = [
    { name: 'Merzouga', path: '/destinations/merzouga', desc: 'Erg Chebbi Dunes' },
    { name: 'Zagora', path: '/destinations/zagora', desc: 'Erg Chigaga Wilds' },
    { name: 'Agafay', path: '/destinations/agafay', desc: 'Stone Desert' },
  ];

  const navLinks = [
    { name: 'Compare', path: '/compare' },
    { name: 'Scam Guide', path: '/scam-guide' },
  ];

  const Logo = ({ light = false }: { light?: boolean }) => {
    const textColor = light ? "text-white" : "text-[#26215C]";
    const accentColor = "#BA7517";

    return (
      <Link to="/" className="group flex items-center">
        <div className="relative flex flex-col items-center select-none pt-2">
          {/* Hand-painted Dune "Umbrella" */}
          <div className="absolute -top-5 md:-top-7 left-1/2 -translate-x-1/2 w-28 h-14 md:w-36 md:h-18 pointer-events-none z-0">
            <motion.svg 
              viewBox="0 0 120 70" 
              className="w-full h-full"
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Single Dune with Verified Tick at the end */}
              <motion.path 
                d="M10 50 Q 35 15, 60 50 L 72 62 L 95 38" 
                stroke={accentColor} 
                strokeWidth="5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, delay: 0.4 }}
              />
            </motion.svg>
          </div>

          {/* Brand Name */}
          <motion.div 
            className={cn("text-2xl md:text-4xl leading-none font-painting tracking-normal relative z-10 flex items-center px-4", textColor)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Unified Logo Background */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: "circOut" }}
            >
              <svg viewBox="0 0 240 60" className="w-full h-full" preserveAspectRatio="none">
                {/* Main thick brush stroke */}
                <motion.path 
                  d="M5 30 Q 60 15, 120 30 T 235 30 L 235 40 Q 175 55, 120 40 T 5 40 Z" 
                  fill="#BA7517" 
                  className="opacity-20"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.4 }}
                />
                {/* Thinner accent stroke */}
                <motion.path 
                  d="M15 35 Q 70 25, 130 35 T 225 35" 
                  stroke="#BA7517" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  fill="none"
                  className="opacity-30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, delay: 0.6 }}
                />
              </svg>
            </motion.div>

            <div className="relative group flex items-center">
              <span className="relative z-10"><span className="text-[#BA7517]">D</span>une<span className={light ? "text-white" : "text-[#BA7517]"}>camps</span></span>
              
              {/* Sand Dust Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-[#BA7517] rounded-full blur-[0.3px] pointer-events-none opacity-0"
                  animate={{
                    x: [0, (i % 2 === 0 ? 1 : -1) * (15 + i * 5), (i % 2 === 0 ? 30 : -30)],
                    y: [0, -8 - i * 3, -15],
                    opacity: [0, 0.4, 0],
                    scale: [0, 1, 0.2],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${15 + i * 12}%`,
                    top: '80%'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Link>
    );
  };

  const ZellijRibbon = ({ light = false }: { light?: boolean }) => (
    <div className="h-4 w-full flex overflow-hidden opacity-80 relative">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M30 20l5-12h10l-8 7 3 12-10-7-10 7 3-12-8-7h10z' fill='%23BA7517'/%3E%3Cpath d='M0 20l3-8h7l-6 5 2 9-6-5-6 5 2-9-6-5h7z' fill='%2326215C'/%3E%3Cpath d='M60 20l3-8h7l-6 5 2 9-6-5-6 5 2-9-6-5h7z' fill='%2326215C'/%3E%3Ccircle cx='30' cy='20' r='3' fill='%2300BCD4' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat-x'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );

  const isHeroPage = ['/', '/destinations/'].some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)));
  const isDarkSectionPage = ['/scam-guide'].includes(location.pathname);
  const useLightHeader = isHeroPage || isDarkSectionPage;

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans text-[#26215C] relative overflow-x-hidden">
      {/* Moroccan Zellij Background - Richer layered pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Repeating tile background */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cpath d='M60 0l6 18 18-6-6 18 18 6-18 6 6 18-18-6-6 18-6-18-18 6 6-18-18-6 18-6-6-18 18 6z' fill='%23BA7517'/%3E%3Cpath d='M0 0l3 9 9-3-3 9 9 3-9 3 3 9-9-3-3 9-3-9-9 3 3-9-9-3 9-3-3-9 9 3z' fill='%2326215C'/%3E%3Cpath d='M120 0l3 9 9-3-3 9 9 3-9 3 3 9-9-3-3 9-3-9-9 3 3-9-9-3 9-3-3-9 9 3z' fill='%2326215C'/%3E%3Cpath d='M0 120l3 9 9-3-3 9 9 3-9 3 3 9-9-3-3 9-3-9-9 3 3-9-9-3 9-3-3-9 9 3z' fill='%2326215C'/%3E%3Cpath d='M120 120l3 9 9-3-3 9 9 3-9 3 3 9-9-3-3 9-3-9-9 3 3-9-9-3 9-3-3-9 9 3z' fill='%2326215C'/%3E%3Cpath d='M30 30l4 12 12-4-4 12 12 4-12 4 4 12-12-4-4 12-4-12-12 4 4-12-12-4 12-4-4-12 12 4z' fill='%23BA7517' opacity='0.3'/%3E%3Cpath d='M90 30l4 12 12-4-4 12 12 4-12 4 4 12-12-4-4 12-4-12-12 4 4-12-12-4 12-4-4-12 12 4z' fill='%2326215C' opacity='0.3'/%3E%3Cpath d='M30 90l4 12 12-4-4 12 12 4-12 4 4 12-12-4-4 12-4-12-12 4 4-12-12-4 12-4-4-12 12 4z' fill='%2326215C' opacity='0.3'/%3E%3Cpath d='M90 90l4 12 12-4-4 12 12 4-12 4 4 12-12-4-4 12-4-12-12 4 4-12-12-4 12-4-4-12 12 4z' fill='%23BA7517' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />

        {/* Floating large Zellij motifs */}
        <div className="absolute top-[10%] -left-20 w-80 h-80 opacity-[0.1] rotate-12 scale-110">
          <StarZellij />
        </div>
        <div className="absolute top-[40%] -right-32 w-96 h-96 opacity-[0.08] -rotate-12 scale-125">
          <StarZellij color1="#26215C" color2="#BA7517" />
        </div>
        <div className="absolute top-[70%] -left-40 w-120 h-120 opacity-[0.06] rotate-45 scale-150">
          <StarZellij />
        </div>
        <div className="absolute -bottom-20 right-[20%] w-72 h-72 opacity-[0.07] rotate-180">
          <StarZellij color1="#26215C" color2="#BA7517" />
        </div>
      </div>
      <Helmet>
        <link rel="canonical" href={currentUrl} />
        <link rel="alternate" href={currentUrl} hrefLang="en" />
        <link rel="alternate" href={currentUrl} hrefLang="fr" />
        <link rel="alternate" href={currentUrl} hrefLang="ar-MA" />
      </Helmet>
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent h-16 md:h-24">
        {/* Header Zellij Patterns - Very subtle in the background */}
        <ZellijCorner className="absolute top-0 right-0 translate-x-12 -translate-y-12 opacity-5" />
        <ZellijCorner className="absolute bottom-0 left-0 -translate-x-16 translate-y-16 rotate-45 opacity-5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
          <div className="flex justify-between items-center h-full">
            {/* Left: Hamburger Menu & Language Switcher */}
            <div className="w-1/3 md:w-1/3 flex items-center">
              <div className="flex items-center relative z-[70] md:space-x-1">
                <div className="flex items-center bg-[#BA7517] rounded-lg md:rounded-xl shadow-lg shadow-[#BA7517]/20 border border-white/10">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white h-8 md:h-10 px-2 md:px-4 flex items-center justify-center hover:bg-white/10 transition-all rounded-l-lg md:rounded-xl"
                  >
                    {isMenuOpen ? <X size={16} /> : <Menu size={16} className="md:w-5 md:h-5" />}
                    <span className="hidden md:inline ml-2 text-[10px] md:text-xs font-black uppercase tracking-widest">{t('nav.menu')}</span>
                  </button>

                  <div className="w-[1px] h-3 bg-white/20 md:hidden" />

                  <div className="relative md:hidden">
                    <button
                      onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                      className="text-white h-8 px-2.5 flex items-center justify-center hover:bg-white/10 transition-all rounded-r-lg"
                      title={t('nav.select_lang')}
                    >
                      <span className="text-[10px] font-bold uppercase">{language}</span>
                    </button>
                  </div>
                </div>

                {/* Desktop Language Switcher (Transparent) */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className={cn(
                      "h-10 px-3.5 flex items-center justify-center transition-all rounded-xl border border-transparent hover:bg-white/10",
                      useLightHeader ? "text-white" : "text-[#26215C]"
                    )}
                    title={t('nav.select_lang')}
                  >
                    <Globe size={16} className={cn("transition-transform duration-500", isLangDropdownOpen && "rotate-180")} />
                    <span className="ml-1.5 text-xs font-bold uppercase tracking-wider">{language}</span>
                  </button>

                  <AnimatePresence>
                    {isLangDropdownOpen && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-[80] bg-black/5 backdrop-blur-[2px]"
                          onClick={() => setIsLangDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
                          className="absolute left-0 mt-3 w-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(38,33,92,0.15)] border border-white overflow-hidden z-[90] p-1.5"
                        >
                          <div className="space-y-1">
                            <div className="px-3 py-2 text-[10px] font-black text-[#BA7517]/40 uppercase tracking-widest border-b border-gray-50 mb-1">
                              {t('nav.select_lang')}
                            </div>
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => {
                                  setLanguage(lang.code);
                                  setIsLangDropdownOpen(false);
                                }}
                                className={cn(
                                  "flex items-center justify-between w-full px-3 py-2.5 text-xs md:text-sm rounded-xl transition-all duration-300",
                                  language === lang.code 
                                    ? "bg-[#BA7517] text-white font-bold shadow-lg shadow-[#BA7517]/20" 
                                    : "text-[#26215C] hover:bg-[#FAF7F2] hover:text-[#BA7517]"
                                )}
                              >
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg leading-none">{lang.flag}</span>
                                  <span>{lang.name}</span>
                                </div>
                                {language === lang.code && <motion.div layoutId="active-lang" className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="w-1/3 md:w-1/3 flex justify-center">
              <Logo light={useLightHeader} />
            </div>

            {/* Right: Actions */}
            <div className="w-1/3 md:w-1/3 flex justify-end items-center space-x-2 md:space-x-4">
              <Link 
                to="/compare" 
                className={cn(
                  "hidden lg:flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] transition-opacity hover:opacity-70",
                  useLightHeader ? "text-white" : "text-[#26215C]"
                )}
              >
                <Search size={14} className="text-[#BA7517]" />
                <span>{t('nav.help')}</span>
              </Link>
              
              <Link 
                to="/book" 
                className="bg-[#BA7517] text-white h-9 md:h-11 px-4 md:px-6 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#EF9F27] transition-all shadow-lg shadow-[#BA7517]/20 border border-white/10 whitespace-nowrap flex items-center justify-center"
              >
                <span className="flex flex-col md:flex-row items-center justify-center leading-[0.8] md:leading-normal">
                  <span>{t('nav.book').split(' ')[0]}</span>
                  {t('nav.book').includes(' ') && (
                    <span className="md:ml-1 mt-0.5 md:mt-0">{t('nav.book').split(' ').slice(1).join(' ')}</span>
                  )}
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Full-screen Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[60] bg-[#26215C] flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Background patterns for overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <StarZellij className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%]" />
                <StarZellij className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%]" color1="#26215C" color2="#BA7517" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 text-[#FAF7F2] p-4 hover:rotate-90 transition-transform duration-500"
              >
                <X size={32} />
              </button>

              <div className="relative z-10 w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 items-center">
                <div className="md:col-span-3 space-y-4 md:space-y-8">
                  <div className="text-[10px] font-black text-[#BA7517] uppercase tracking-[1em] mb-4 md:mb-8 opacity-60">{t('nav.destinations')}</div>
                  <div className="space-y-4 md:space-y-6">
                    {destinations.map((dest) => (
                      <Link
                        key={dest.path}
                        to={dest.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="group block"
                      >
                        <div className="text-3xl sm:text-4xl md:text-6xl font-black text-[#FAF7F2] group-hover:text-[#BA7517] transition-all duration-500 tracking-tighter leading-none">
                          {dest.name}
                        </div>
                        <div className="text-xs md:text-sm text-[#FAF7F2]/40 mt-2 uppercase tracking-[0.3em] font-bold group-hover:text-[#FAF7F2]/80 transition-colors drop-shadow-sm">{dest.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block w-px h-64 bg-white/10 mx-auto" />

                <div className="md:col-span-1 flex flex-col justify-between h-full py-4 md:py-12">
                  <div className="space-y-6 md:space-y-12">
                    <div className="text-[10px] font-black text-[#BA7517] uppercase tracking-[1em] mb-4 md:mb-8 opacity-60">{t('nav.discover')}</div>
                    <div className="space-y-4 md:space-y-8">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-2xl md:text-3xl font-black uppercase text-white/70 hover:text-[#BA7517] transition-all duration-300"
                        >
                          {t(`nav.${link.name.toLowerCase().replace(' ', '_')}`)}
                        </Link>
                      ))}
                      <Link
                        to="/partners"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-2xl md:text-3xl font-black uppercase text-white/70 hover:text-[#BA7517] transition-all duration-300"
                      >
                        {t('nav.portal')}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-12 pt-12 md:mt-0 md:pt-0 border-t md:border-t-0 border-white/10">
                    <div className="text-[8px] md:text-[10px] text-[#FAF7F2]/40 uppercase tracking-[0.4em] font-black mb-6">{t('nav.socials')}</div>
                    <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-[#FAF7F2]/60">
                      <span className="hover:text-[#BA7517] cursor-pointer transition-colors">IG</span>
                      <span className="hover:text-[#BA7517] cursor-pointer transition-colors">FB</span>
                      <span className="hover:text-[#BA7517] cursor-pointer transition-colors">TA</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className={cn(
        "flex-1 relative z-10",
        !isHeroPage && !isDarkSectionPage ? "pt-24" : "pt-0"
      )}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-[#26215C] py-20 relative overflow-hidden border-t border-gray-100">
        {/* Sahara Dunes at the Very Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden opacity-[0.3]">
          <svg className="w-full h-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L0 50C300 10 500 110 720 50C940 10 1140 110 1440 50L1440 120L0 120Z" fill="#BA7517" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden opacity-[0.5]">
          <svg className="w-full h-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L0 35C240 65 480 20 720 40C960 60 1200 20 1440 35L1440 80L0 80Z" fill="#BA7517" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-gray-600 max-w-md leading-relaxed">
                {t('footer.desc')}
              </p>
            </div>
            <div>
              <h3 className="text-[#BA7517] font-semibold mb-6 uppercase tracking-widest text-xs">{t('footer.destinations')}</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link to="/destinations/merzouga" className="hover:text-[#BA7517] transition-colors">Merzouga (Erg Chebbi)</Link></li>
                <li><Link to="/destinations/zagora" className="hover:text-[#BA7517] transition-colors">Zagora (Erg Chigaga)</Link></li>
                <li><Link to="/destinations/agafay" className="hover:text-[#BA7517] transition-colors">Agafay (Stone Desert)</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#BA7517] font-semibold mb-6 uppercase tracking-widest text-xs">{t('footer.trust')}</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link to="/scam-guide" className="hover:text-[#BA7517] transition-colors">{t('footer.scam_guide')}</Link></li>
                <li><Link to="/compare" className="hover:text-[#BA7517] transition-colors">{t('footer.compare')}</Link></li>
                <li><Link to="/partners" className="hover:text-[#BA7517] transition-colors">{t('footer.partners')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
            <p>© 2026 Dunecamps — {t('footer.built_for')}</p>
            <div className="flex space-x-6">
              <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
