import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Scarabeo Stone Desert Camp (Agafay)
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const scarabeoAlternativeCampImages: LodgeImages = {
  slug: 'scarabeo-alternative-camp',
  name: 'Scarabeo Stone Desert Camp',
  hero: '/images/destinations/agafay.jpg',
  fallback: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/agafay.jpg',
    '/images/slideshow/slide-2.jpg',
    '/images/slideshow/slide-4.jpg',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200'
  ],
  tents: {
    'stone-canvas': '/images/destinations/agafay.jpg',
    'atlas-view': '/images/slideshow/slide-2.jpg'
  },
  caption: 'Iconic glamping experience in the Agafay stone desert with stunning Atlas views'
};

export default scarabeoAlternativeCampImages;
