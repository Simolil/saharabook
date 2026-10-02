import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Ksar Ouarzazate Desert Lodge (Ouarzazate)
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const ksarOuarzazateDesertLodgeImages: LodgeImages = {
  slug: 'ksar-ouarzazate-desert-lodge',
  name: 'Ksar Ouarzazate Desert Lodge',
  hero: '/images/destinations/ouarzazate.jpg',
  fallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/destinations/ouarzazate.jpg',
    '/images/slideshow/slide-8.jpg',
    '/images/slideshow/slide-3.jpg',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200'
  ],
  tents: {
    'kasbah-room': '/images/destinations/ouarzazate.jpg',
    'oasis-suite': '/images/slideshow/slide-8.jpg'
  },
  caption: 'Historic Kasbah glamping lodge nestled between ancient palm groves and Atlas valleys'
};

export default ksarOuarzazateDesertLodgeImages;
