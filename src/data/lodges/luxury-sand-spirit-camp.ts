import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Sand Spirit Luxury Camp (Merzouga)
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const luxurySandSpiritCampImages: LodgeImages = {
  slug: 'luxury-sand-spirit-camp',
  name: 'Sand Spirit Luxury Camp',
  hero: '/images/destinations/merzouga.jpg',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/merzouga.jpg',
    '/images/slideshow/slide-1.jpg',
    '/images/slideshow/slide-6.jpg',
    'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=1200'
  ],
  tents: {
    'spirit-suite': '/images/destinations/merzouga.jpg',
    'dune-view': '/images/slideshow/slide-1.jpg'
  },
  caption: 'An oasis of luxury in the heart of the golden Erg Chebbi dunes'
};

export default luxurySandSpiritCampImages;
