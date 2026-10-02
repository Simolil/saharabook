import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Chigaga Wild Dunes Camp
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const chigagaWildDunesCampImages: LodgeImages = {
  slug: 'chigaga-wild-dunes-camp',
  name: 'Chigaga Wild Dunes Camp',
  hero: '/images/destinations/foumzguid.jpg',
  fallback: 'https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/foumzguid.jpg',
    '/images/slideshow/slide-6.jpg',
    '/images/slideshow/slide-2.jpg',
    '/src/assets/images/foum_zguid_lake_iriki_hero_1790326234555.jpg',
    '/images/slideshow/slide-11.jpg'
  ],
  tents: {
    'emperor-suite': '/images/destinations/foumzguid.jpg',
    'nomad-lodge': '/images/slideshow/slide-6.jpg'
  },
  caption: 'Deepest Dune Penetration at the foot of Morocco’s wildest sand ridges'
};

export default chigagaWildDunesCampImages;
