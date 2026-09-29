export type Destination = 'merzouga' | 'zagora' | 'agafay' | 'foumzguid' | 'foum-zguid' | 'ouarzazate' | 'mhamid' | 'chigaga';
export type VerificationTier = 'listed' | 'verified' | 'elite';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
export type Language = 'en' | 'fr' | 'ar';

export interface Camp {
  id: string;
  slug: string;
  name: string;
  description_en: string;
  description_fr: string;
  destination: Destination;
  latitude: number;
  longitude: number;
  price_per_night: number;
  currency: string;
  verification_tier: VerificationTier;
  private_bathroom: boolean;
  max_guests: number;
  featured_until?: string;
  status: 'active' | 'under_review';
  created_at: string;
  category?: 'deep-sahara-bivouac' | 'desert-edge-lodge' | 'oasis-auberge';
  distance_note?: string;
  included_extras?: string[];
  image?: string;
  images?: string[];
  sub_location?: string;
  key_amenities?: string[];
  logistics_transfer?: string;
  tent_options?: TentOptionItem[];
  trust_bar?: {
    accommodation_type?: string;
    facilities?: string;
    power?: string;
    included?: string;
  };
  logistics?: {
    meeting_point?: string;
    transfer_type?: string;
    transfer_included?: boolean;
    transfer_cost?: string;
    drive_time_from_marrakech?: string;
    parking_info?: string;
    road_type?: string;
  };
  editorial_narrative?: {
    arrival?: string;
    evening?: string;
    silence?: string;
  };
  official_website?: string;
  owner_name?: string;
  owner_title?: string;
  owner_quote?: string;
  whatsapp?: string;
  phone?: string;
  tripadvisor_rating?: number;
  tripadvisor_reviews?: number;
}

export interface TentOptionItem {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price_per_night: number;
  features: string[];
  capacity: string;
  bed_config?: string;
  bed_type?: string;
  sqm?: number;
  image?: string;
}

export interface TentType {
  id: string;
  camp_id: string;
  name: string;
  description: string;
  capacity: number;
  price_modifier: number;
  images: string[];
}

export interface Availability {
  id: string;
  camp_id: string;
  date: string;
  total_tents: number;
  booked_tents: number;
}

export interface Booking {
  id: string;
  camp_id: string;
  tent_type_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: BookingStatus;
  stripe_payment_id?: string;
  voucher_token: string;
  created_at: string;
}

export interface Review {
  id: string;
  camp_id: string;
  booking_id?: string;
  user_id?: string;
  rating: number;
  body: string;
  language: Language;
  created_at: string;
}

export interface Operator {
  id: string;
  camp_id: string;
  name: string;
  whatsapp: string;
  response_rate: number;
  verified_at?: string;
  commission_rate: number;
}
