export interface LodgeImages {
  slug: string;
  name: string;
  hero: string;
  fallback: string;
  gallery: string[];
  tents?: Record<string, string>;
  caption?: string;
}
