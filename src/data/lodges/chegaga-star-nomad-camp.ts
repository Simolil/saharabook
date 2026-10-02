import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Chegaga Star Nomad Camp
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const chegagaStarNomadCampImages: LodgeImages = {
  slug: 'chegaga-star-nomad-camp',
  name: 'Chegaga Star Nomad Camp',
  hero: '/images/slideshow/slide-7.jpg',
  fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-7.jpg',
    '/images/slideshow/slide-11.jpg',
    '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
    '/images/destinations/foumzguid.jpg',
    '/images/slideshow/slide-6.jpg'
  ],
  tents: {
    'traditional-woven': '/images/slideshow/slide-7.jpg',
    'nomad-star': '/images/slideshow/slide-11.jpg'
  },
  caption: 'Hereditary nomadic family hospitality and genuine Sahrawi desert music'
};

export default chegagaStarNomadCampImages;
