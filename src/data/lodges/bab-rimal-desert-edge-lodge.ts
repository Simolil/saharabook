import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Bab Rimal Desert Edge Lodge
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const babRimalDesertEdgeLodgeImages: LodgeImages = {
  slug: 'bab-rimal-desert-edge-lodge',
  name: 'Bab Rimal Desert Edge Lodge',
  hero: '/images/slideshow/slide-3.jpg',
  fallback: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-3.jpg',
    '/images/slideshow/slide-8.jpg',
    '/images/destinations/ouarzazate.jpg',
    '/images/slideshow/slide-5.jpg',
    '/images/slideshow/slide-10.png'
  ],
  tents: {
    'palm-pool-suite': '/images/slideshow/slide-3.jpg',
    'garden-room': '/images/slideshow/slide-8.jpg'
  },
  caption: 'Premier palm-grove staging lodge with swimming pool at the desert threshold'
};

export default babRimalDesertEdgeLodgeImages;
