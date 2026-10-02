import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Auberge l'Oasis Foum Zguid
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const aubergeOasisFoumZguidImages: LodgeImages = {
  slug: 'auberge-oasis-foum-zguid',
  name: "Auberge l'Oasis Foum Zguid",
  hero: '/images/slideshow/slide-10.png',
  fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-10.png',
    '/images/slideshow/slide-9.png',
    '/images/destinations/ouarzazate.jpg',
    '/images/slideshow/slide-8.jpg',
    '/images/slideshow/slide-3.jpg'
  ],
  tents: {
    'garden-room': '/images/slideshow/slide-10.png',
    'oasis-suite': '/images/slideshow/slide-9.png'
  },
  caption: 'Peaceful garden oasis with homecooked tagines and desert track advice'
};

export default aubergeOasisFoumZguidImages;
