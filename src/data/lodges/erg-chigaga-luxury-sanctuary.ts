import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Erg Chigaga Luxury Erg Sanctuary
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const ergChigagaLuxurySanctuaryImages: LodgeImages = {
  slug: 'erg-chigaga-luxury-sanctuary',
  name: 'Erg Chigaga Luxury Erg Sanctuary',
  hero: '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
    '/images/slideshow/slide-1.jpg',
    '/images/slideshow/slide-4.jpg',
    '/images/destinations/foumzguid.jpg',
    '/src/assets/images/foum_zguid_lake_iriki_hero_1790326234555.jpg'
  ],
  tents: {
    'royal-caidal': '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
    'luxury-suite': '/images/slideshow/slide-1.jpg'
  },
  caption: 'Signature Stargazer Camp in the colossal golden amphitheaters of Erg Chigaga'
};

export default ergChigagaLuxurySanctuaryImages;
