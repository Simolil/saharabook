import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Erg El M'Hazil Nomadic Bivouac
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const ergMhazilNomadicBivouacImages: LodgeImages = {
  slug: 'erg-mhazil-nomadic-bivouac',
  name: "Erg El M'Hazil Nomadic Bivouac",
  hero: '/images/slideshow/slide-6.jpg',
  fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-6.jpg',
    '/images/slideshow/slide-7.jpg',
    '/images/slideshow/slide-11.jpg',
    '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
    '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg'
  ],
  tents: {
    'bedouin-wool': '/images/slideshow/slide-6.jpg',
    'desert-tent': '/images/slideshow/slide-7.jpg'
  },
  caption: 'Pristine untouched dune field with zero tourist crowds west of Chigaga'
};

export default ergMhazilNomadicBivouacImages;
