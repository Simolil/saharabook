import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Hôtel Restaurant Riad Hiba
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const riadHibaFoumZguidImages: LodgeImages = {
  slug: 'riad-hiba-foum-zguid',
  name: 'Hôtel Restaurant Riad Hiba',
  hero: '/images/destinations/ouarzazate.jpg',
  fallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/ouarzazate.jpg',
    '/images/slideshow/slide-10.png',
    '/images/slideshow/slide-9.png',
    '/images/slideshow/slide-8.jpg',
    '/images/slideshow/slide-3.jpg'
  ],
  tents: {
    'riad-room': '/images/destinations/ouarzazate.jpg',
    'terrace-suite': '/images/slideshow/slide-10.png'
  },
  caption: 'Town-center hospitality, shaded courtyards, and authentic home-style cuisine'
};

export default riadHibaFoumZguidImages;
