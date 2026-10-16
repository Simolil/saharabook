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
  hero: '/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-food-tagine.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-campfire.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-01.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-02.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-03.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-04.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-05.jpg',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-camel.jpg',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-host-mustapha.webp',
    '/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-family.jpg'
  ],
  tents: {
    'traditional-nomad-tent': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-02.webp',
    'luxury-canvas-suite': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.webp',
    'royal-family-pavilion': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-family.jpg',
    'exclusive-private-bivouac': '/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp'
  },
  caption: 'Authentic Saharan Nomad Bivouac nestled deep in Erg Chigaga dunes'
};

export default bivouacLesNomadesImages;
