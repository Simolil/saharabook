import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Kasbah Bivouac Les Roches
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const kasbahBivouacLesRochesImages: LodgeImages = {
  slug: 'kasbah-bivouac-les-roches',
  name: 'Kasbah Bivouac Les Roches',
  hero: '/images/slideshow/slide-8.jpg',
  fallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-8.jpg',
    '/images/slideshow/slide-3.jpg',
    '/images/destinations/ouarzazate.jpg',
    '/images/slideshow/slide-10.png',
    '/images/slideshow/slide-9.png'
  ],
  tents: {
    'kasbah-suite': '/images/slideshow/slide-8.jpg',
    'courtyard-room': '/images/slideshow/slide-3.jpg'
  },
  caption: 'Rammed-earth fortress and desert staging base at the edge of Foum Zguid'
};

export default kasbahBivouacLesRochesImages;
