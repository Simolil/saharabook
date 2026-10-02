import { LodgeImages } from './types';

/**
 * Lodge Image Configuration: Auberge Iriqui Traditional Outpost
 * 
 * Edit this file to add, replace, or reorder images for this lodge.
 */
export const aubergeIriquiOutpostImages: LodgeImages = {
  slug: 'auberge-iriqui-outpost',
  name: 'Auberge Iriqui Traditional Outpost',
  hero: '/images/slideshow/slide-9.png',
  fallback: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
  gallery: [
    '/images/slideshow/slide-9.png',
    '/images/slideshow/slide-10.png',
    '/images/slideshow/slide-8.jpg',
    '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
    '/images/slideshow/slide-7.jpg'
  ],
  tents: {
    'traditional-room': '/images/slideshow/slide-9.png',
    'outpost-terrace': '/images/slideshow/slide-10.png'
  },
  caption: 'Traditional expedition staging post with secure parking and expert 4x4 drivers'
};

export default aubergeIriquiOutpostImages;
