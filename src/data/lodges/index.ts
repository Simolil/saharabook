import { LodgeImages } from './types';

// Import individual lodge image files
import { bivouacLesNomadesImages } from './bivouac-les-nomades';
import { ergChigagaLuxurySanctuaryImages } from './erg-chigaga-luxury-sanctuary';
import { chigagaWildDunesCampImages } from './chigaga-wild-dunes-camp';
import { ergMhazilNomadicBivouacImages } from './erg-mhazil-nomadic-bivouac';
import { sandsOfIrikiLuxuryBivouacImages } from './sands-of-iriki-luxury-bivouac';
import { chegagaStarNomadCampImages } from './chegaga-star-nomad-camp';
import { darAhansalDeepDesertCampImages } from './dar-ahansal-deep-desert-camp';
import { azalaiDesertBivouacChigagaImages } from './azalai-desert-bivouac-chigaga';
import { babRimalDesertEdgeLodgeImages } from './bab-rimal-desert-edge-lodge';
import { kasbahBivouacLesRochesImages } from './kasbah-bivouac-les-roches';
import { riadHibaFoumZguidImages } from './riad-hiba-foum-zguid';
import { irikiEcoSanctuaryLodgeImages } from './iriki-eco-sanctuary-lodge';
import { aubergeOasisFoumZguidImages } from './auberge-oasis-foum-zguid';
import { aubergeIriquiOutpostImages } from './auberge-iriqui-outpost';
import { luxurySandSpiritCampImages } from './luxury-sand-spirit-camp';
import { nomadDreamZagoraImages } from './nomad-dream-zagora';
import { scarabeoAlternativeCampImages } from './scarabeo-alternative-camp';
import { mhamidChigagaNomadCampImages } from './mhamid-chigaga-nomad-camp';
import { ksarOuarzazateDesertLodgeImages } from './ksar-ouarzazate-desert-lodge';

export * from './types';

// Re-export individual lodge configs for direct granular imports
export {
  bivouacLesNomadesImages,
  ergChigagaLuxurySanctuaryImages,
  chigagaWildDunesCampImages,
  ergMhazilNomadicBivouacImages,
  sandsOfIrikiLuxuryBivouacImages,
  chegagaStarNomadCampImages,
  darAhansalDeepDesertCampImages,
  azalaiDesertBivouacChigagaImages,
  babRimalDesertEdgeLodgeImages,
  kasbahBivouacLesRochesImages,
  riadHibaFoumZguidImages,
  irikiEcoSanctuaryLodgeImages,
  aubergeOasisFoumZguidImages,
  aubergeIriquiOutpostImages,
  luxurySandSpiritCampImages,
  nomadDreamZagoraImages,
  scarabeoAlternativeCampImages,
  mhamidChigagaNomadCampImages,
  ksarOuarzazateDesertLodgeImages
};

/**
 * Master Registry mapping lodge slugs to their dedicated image configuration.
 */
export const LODGE_IMAGES: Record<string, LodgeImages> = {
  'bivouac-les-nomades': bivouacLesNomadesImages,
  'bivouac-nomades-chigaga': bivouacLesNomadesImages,
  'bivouaclesnomades': bivouacLesNomadesImages,
  'erg-chigaga-luxury-sanctuary': ergChigagaLuxurySanctuaryImages,
  'chigaga-wild-dunes-camp': chigagaWildDunesCampImages,
  'erg-mhazil-nomadic-bivouac': ergMhazilNomadicBivouacImages,
  'sands-of-iriki-luxury-bivouac': sandsOfIrikiLuxuryBivouacImages,
  'chegaga-star-nomad-camp': chegagaStarNomadCampImages,
  'dar-ahansal-deep-desert-camp': darAhansalDeepDesertCampImages,
  'azalai-desert-bivouac-chigaga': azalaiDesertBivouacChigagaImages,
  'bab-rimal-desert-edge-lodge': babRimalDesertEdgeLodgeImages,
  'kasbah-bivouac-les-roches': kasbahBivouacLesRochesImages,
  'riad-hiba-foum-zguid': riadHibaFoumZguidImages,
  'iriki-eco-sanctuary-lodge': irikiEcoSanctuaryLodgeImages,
  'auberge-oasis-foum-zguid': aubergeOasisFoumZguidImages,
  'auberge-iriqui-outpost': aubergeIriquiOutpostImages,
  'luxury-sand-spirit-camp': luxurySandSpiritCampImages,
  'nomad-dream-zagora': nomadDreamZagoraImages,
  'scarabeo-alternative-camp': scarabeoAlternativeCampImages,
  'mhamid-chigaga-nomad-camp': mhamidChigagaNomadCampImages,
  'ksar-ouarzazate-desert-lodge': ksarOuarzazateDesertLodgeImages
};

/**
 * Retrieve the dedicated image configuration for any lodge by its slug.
 */
export const getLodgeImages = (slug: string): LodgeImages | undefined => {
  if (!slug) return undefined;
  return LODGE_IMAGES[slug.toLowerCase()];
};

/**
 * Helper to get the primary hero image for a lodge with fallback.
 */
export const getLodgeHero = (slug: string, fallback?: string): string => {
  const lodge = getLodgeImages(slug);
  if (lodge?.hero) return lodge.hero;
  return fallback || 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200';
};

/**
 * Helper to get the gallery photos for a lodge.
 */
export const getLodgeGallery = (slug: string): string[] => {
  const lodge = getLodgeImages(slug);
  if (lodge?.gallery && lodge.gallery.length > 0) {
    return lodge.gallery;
  }
  return [
    getLodgeHero(slug),
    'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=1200',
    'https://images.unsplash.com/photo-1489493585363-d6943649ef91?q=80&w=1200',
    'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1200'
  ];
};
