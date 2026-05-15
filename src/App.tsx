import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import DestinationHub from './pages/DestinationHub';
import CampDetail from './pages/CampDetail';
import TourDetail from './pages/TourDetail';
import ScamGuide from './pages/ScamGuide';
import Compare from './pages/Compare';
import BookingFlow from './pages/BookingFlow';
import PartnerPortal from './pages/PartnerPortal';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations/:id" element={<DestinationHub />} />
            <Route path="/camps/:slug" element={<CampDetail />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/scam-guide" element={<ScamGuide />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/book/:campSlug" element={<BookingFlow />} />
            <Route path="/partners" element={<PartnerPortal />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
