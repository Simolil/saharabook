export type Destination = 'merzouga' | 'zagora' | 'agafay' | 'foumzguid';
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
