-- Bivouac.ma Supabase Schema

-- Destinations Enum
CREATE TYPE destination_type AS ENUM ('merzouga', 'zagora', 'agafay');
CREATE TYPE verification_tier_type AS ENUM ('listed', 'verified', 'elite');
CREATE TYPE booking_status_type AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE language_type AS ENUM ('en', 'fr', 'ar');

-- Camps Table
CREATE TABLE camps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  destination destination_type NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  verification_tier verification_tier_type DEFAULT 'listed',
  private_bathroom BOOLEAN DEFAULT true,
  max_guests INTEGER NOT NULL,
  featured_until TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active', -- active, under_review
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tent Types Table
CREATE TABLE tent_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID REFERENCES camps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  capacity INTEGER NOT NULL,
  price_modifier DECIMAL(10, 2) DEFAULT 0.00,
  images JSONB DEFAULT '[]'::JSONB
);

-- Availability Table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID REFERENCES camps(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_tents INTEGER NOT NULL,
  booked_tents INTEGER DEFAULT 0,
  UNIQUE(camp_id, date)
);

-- Users (Profiles) linked to Supabase Auth
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID REFERENCES camps(id),
  tent_type_id UUID REFERENCES tent_types(id),
  user_id UUID REFERENCES auth.users(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status booking_status_type DEFAULT 'pending',
  stripe_payment_id TEXT,
  voucher_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID REFERENCES camps(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  user_id UUID REFERENCES auth.users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  body TEXT,
  language language_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Operators Table
CREATE TABLE operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID REFERENCES camps(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  whatsapp TEXT,
  response_rate DECIMAL(3, 2),
  verified_at TIMESTAMP WITH TIME ZONE,
  commission_rate DECIMAL(3, 2) DEFAULT 0.17
);

-- Referral Links
CREATE TABLE referral_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_code TEXT UNIQUE NOT NULL,
  owner_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Security Rules (Row Level Security)
ALTER TABLE camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE tent_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public camps access" ON camps FOR SELECT USING (true);
CREATE POLICY "Public tent_types access" ON tent_types FOR SELECT USING (true);
CREATE POLICY "Public availability access" ON availability FOR SELECT USING (true);
CREATE POLICY "Public reviews access" ON reviews FOR SELECT USING (true);

-- Authenticated booking access
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Operator access (simplified)
CREATE POLICY "Operators can view their own data" ON operators FOR SELECT USING (true);
