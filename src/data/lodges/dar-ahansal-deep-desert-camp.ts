import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Dar Ahansal Deep Desert Camp
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const darAhansalDeepDesertCampImages: LodgeImages = {
  slug: 'dar-ahansal-deep-desert-camp',
  name: 'Dar Ahansal Deep Desert Camp',
  hero: '/images/slideshow/slide-2.jpg',
  fallback: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-2.jpg',
    '/images/slideshow/slide-4.jpg',
    '/src/assets/images/nomad_tent_interior_1790671861252.jpg',
    '/images/slideshow/slide-8.jpg',
    '/src/assets/images/bivouac_les_nomades_1790671846484.jpg'
  ],
  tents: {
    'quietude-lodge': '/images/slideshow/slide-2.jpg',
    'writers-canvas': '/images/slideshow/slide-4.jpg'
  },
  caption: 'Natural dune amphitheater crafted for silence seekers and photographers'
};

export default darAhansalDeepDesertCampImages;
