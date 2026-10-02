import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: M'Hamid Chigaga Nomad Camp (M'Hamid)
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const mhamidChigagaNomadCampImages: LodgeImages = {
  slug: 'mhamid-chigaga-nomad-camp',
  name: "M'Hamid Chigaga Nomad Camp",
  hero: '/images/destinations/mhamid.jpg',
  fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/mhamid.jpg',
    '/images/slideshow/slide-6.jpg',
    '/images/slideshow/slide-7.jpg',
    'https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200'
  ],
  tents: {
    'frontier-tent': '/images/destinations/mhamid.jpg',
    'chigaga-suite': '/images/slideshow/slide-6.jpg'
  },
  caption: 'Authentic Sahrawi hospitality at the threshold of the deep dunes'
};

export default mhamidChigagaNomadCampImages;
