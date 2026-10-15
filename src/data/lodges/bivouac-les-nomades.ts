import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Bivouac Les Nomades
 * 
 * Images stored in: /public/images/destinations/foum-zguid/bivouac-les-nomades/
 * Edit this file to add, replace, or reorder images for Bivouac Les Nomades.
 */
export const bivouacLesNomadesImages: LodgeImages = {
  slug: 'bivouac-les-nomades',
  name: 'Bivouac Les Nomades – Erg Chigaga Desert Camp',
  hero: '/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.jpg',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.jpg',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.jpg',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-night.jpg',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-lake-iriki.jpg',
    '/images/slideshow/slide-11.jpg'
  ],
  tents: {
    'traditional-nomad-tent': '/images/slideshow/slide-11.jpg',
    'luxury-canvas-suite': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.jpg',
    'royal-family-pavilion': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.jpg',
    'exclusive-private-bivouac': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-night.jpg'
  },
  caption: 'Authentic Saharan Nomad Bivouac nestled deep in Erg Chigaga dunes'
};

export default bivouacLesNomadesImages;
