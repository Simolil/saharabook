import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Bivouac Les Nomades
 * 
 * Edit this file to add, replace, or reorder images for Bivouac Les Nomades.
 */
export const bivouacLesNomadesImages: LodgeImages = {
  slug: 'bivouac-les-nomades',
  name: 'Bivouac Les Nomades – Erg Chigaga Desert Camp',
  hero: '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
  fallback: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
    '/src/assets/images/nomad_tent_interior_1790671861252.jpg',
    '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
    '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
    '/images/slideshow/slide-11.jpg'
  ],
  tents: {
    'traditional-nomad-tent': '/images/slideshow/slide-11.jpg',
    'luxury-canvas-suite': '/src/assets/images/nomad_tent_interior_1790671861252.jpg',
    'royal-family-pavilion': '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
    'exclusive-private-bivouac': '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg'
  },
  caption: 'Authentic Saharan Nomad Bivouac nestled deep in Erg Chigaga dunes'
};

export default bivouacLesNomadesImages;
