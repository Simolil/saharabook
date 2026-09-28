import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './lib/LanguageContext';
import Layout from './components/Layout';
import { LayoutGroup, AnimatePresence, motion } from 'motion/react';
import { ScrollManagerInit, PageScrollHandler } from './components/ScrollManager';

// Pages
import Home from './pages/Home';
import DestinationHub from './pages/DestinationHub';
import FoumZguidHub from './pages/FoumZguidHub';
import CampDetail from './pages/CampDetail';
import TourDetail from './pages/TourDetail';
import ScamGuide from './pages/ScamGuide';
import Compare from './pages/Compare';
import BookingFlow from './pages/BookingFlow';
import PartnerPortal from './pages/PartnerPortal';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <LayoutGroup id="dunecamps-app">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.15, ease: 'easeOut' }
          }}
          className="w-full flex-1 flex flex-col min-h-[calc(100vh-16rem)]"
        >
          <PageScrollHandler />
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/destinations/foum-zguid" element={<FoumZguidHub />} />
            <Route path="/destinations/foumzguid" element={<FoumZguidHub />} />
            <Route path="/destinations/:id" element={<DestinationHub />} />
            <Route path="/camps/:slug" element={<CampDetail />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/scam-guide" element={<ScamGuide />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/book/:campSlug" element={<BookingFlow />} />
            <Route path="/partners" element={<PartnerPortal />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollManagerInit />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

