import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Iriki Eco-Sanctuary Lodge
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const irikiEcoSanctuaryLodgeImages: LodgeImages = {
  slug: 'iriki-eco-sanctuary-lodge',
  name: 'Iriki Eco-Sanctuary Lodge',
  hero: '/images/slideshow/slide-5.jpg',
  fallback: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-5.jpg',
    '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
    '/images/slideshow/slide-1.jpg',
    '/src/assets/images/foum_zguid_lake_iriki_hero_1790326234555.jpg',
    '/images/slideshow/slide-8.jpg'
  ],
  tents: {
    'eco-lodge-suite': '/images/slideshow/slide-5.jpg',
    'telescope-pavilion': '/images/destinations/foum_zguid_lake_iriki_hero.jpg'
  },
  caption: 'Observation deck overlooking desert plains with Lake Iriki geology walks'
};

export default irikiEcoSanctuaryLodgeImages;
