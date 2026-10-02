import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Sands of Iriki Luxury Bivouac
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const sandsOfIrikiLuxuryBivouacImages: LodgeImages = {
  slug: 'sands-of-iriki-luxury-bivouac',
  name: 'Sands of Iriki Luxury Bivouac',
  hero: '/images/slideshow/slide-1.jpg',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-1.jpg',
    '/images/slideshow/slide-3.jpg',
    '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
    '/src/assets/images/foum_zguid_lake_iriki_hero_1790326234555.jpg',
    '/images/slideshow/slide-4.jpg'
  ],
  tents: {
    'grand-horizon': '/images/slideshow/slide-1.jpg',
    'luxury-canvas': '/images/slideshow/slide-3.jpg'
  },
  caption: 'Where Lake Iriki dried clay meets the grand dunes of the Sahara'
};

export default sandsOfIrikiLuxuryBivouacImages;
