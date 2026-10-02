import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Nomad Dream Desert Camp (Zagora)
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const nomadDreamZagoraImages: LodgeImages = {
  slug: 'nomad-dream-zagora',
  name: 'Nomad Dream Desert Camp',
  hero: '/images/destinations/zagora.jpg',
  fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/zagora.jpg',
    '/images/slideshow/slide-7.jpg',
    '/images/slideshow/slide-11.jpg',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=1200'
  ],
  tents: {
    'draa-tent': '/images/destinations/zagora.jpg',
    'nomad-room': '/images/slideshow/slide-7.jpg'
  },
  caption: 'Authentic Berber hospitality meets modern comfort in the mystical Zagora desert'
};

export default nomadDreamZagoraImages;
