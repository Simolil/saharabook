import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Azalai Desert Bivouac Chigaga
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const azalaiDesertBivouacChigagaImages: LodgeImages = {
  slug: 'azalai-desert-bivouac-chigaga',
  name: 'Azalai Desert Bivouac Chigaga',
  hero: '/images/slideshow/slide-4.jpg',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-4.jpg',
    '/images/slideshow/slide-1.jpg',
    '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
    '/images/slideshow/slide-3.jpg',
    '/images/destinations/foumzguid.jpg'
  ],
  tents: {
    'colonial-pavilion': '/images/slideshow/slide-4.jpg',
    'antique-canvas': '/images/slideshow/slide-1.jpg'
  },
  caption: 'The pinnacle of deep Saharan expedition glamor and white canvas pavilions'
};

export default azalaiDesertBivouacChigagaImages;
