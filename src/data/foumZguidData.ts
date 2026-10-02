import { Camp } from '@/src/types';
import { LODGE_IMAGES } from './lodges';

export interface FoumZguidStay extends Camp {
  category: 'deep-sahara-bivouac' | 'desert-edge-lodge' | 'oasis-auberge';
  categoryLabel: string;
  subDetail: string;
  includedExtras: string[];
  image: string;
  fallbackImage: string;
  distanceKm: number;
  transferDetails: string;
  rating: number;
  reviewCount: number;
  tentType: string;
  highlightPill: string;
}

export const FOUM_ZGUID_HERO = {
  breadcrumbs: [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations/merzouga' },
    { label: 'Foum Zguid & Erg Chigaga Gateway', path: '/destinations/foum-zguid' }
  ],
  headline: 'Foum Zguid & The Wild South',
  subHeadline: 'Where paved roads end and the true, untouched Sahara begins. Escape the mass tourism of overcrowded dunes and enter absolute silence.',
  quickFacts: [
    { icon: '📍', label: 'Location', value: 'Tata Province, Southern Morocco' },
    { icon: '⏱️', label: 'Access', value: '~5.5 hrs 4x4 expedition from Marrakech or Ouarzazate' },
    { icon: '🏜️', label: 'Best For', value: 'Deep silence, Erg Chigaga dunes, Lake Iriki crossings' },
    { icon: '🛡️', label: 'Verified Stays', value: '14 Physically Inspected Camps & Lodges' }
  ]
};

export const LOGISTICS_GRID = {
  headline: 'Navigating the Foum Zguid Wilderness',
  subhead: 'Standard booking sites terrify travelers with vague transport details. We demystify the staging logistics upfront with 100% transparency.',
  columns: [
    {
      title: 'The Journey',
      tagline: 'Tarmac to Dried Clay Basin',
      body: 'Foum Zguid is the ultimate staging post. Beyond here, tarmac gives way to ancient desert tracks across the dried bed of Lake Iriki.',
      bullet: '4x4 track staging begins immediately at town border',
      iconName: 'Compass'
    },
    {
      title: 'Vehicle Requirements',
      tagline: 'Mandatory 4x4 & Secure Parking',
      body: 'Deep-dune camps require a certified 4x4 transfer. All verified camps on this page include secure vehicle parking in Foum Zguid town and coordinated professional transfers.',
      bullet: 'Leave ordinary rental cars at verified town garages',
      iconName: 'ShieldAlert'
    },
    {
      title: 'Best Season',
      tagline: 'October Through April',
      body: 'Peak conditions run from October through April, offering crisp daytime exploring and cold, star-saturated nights.',
      bullet: 'Zero sand-heat fatigue; crystal-clear night skies',
      iconName: 'Sun'
    }
  ]
};

export const FOUM_ZGUID_CATEGORIES = [
  {
    id: 'all',
    label: 'All Foum Zguid Stays',
    count: 14,
    description: 'The complete directory of physically inspected desert bivouacs, edge lodges, and oasis outposts.'
  },
  {
    id: 'deep-sahara-bivouac',
    label: 'Deep Sahara Bivouacs',
    count: 8,
    description: 'Camps nestled deep in Erg Chigaga & Erg El M’Hazil, accessed across Lake Iriki.'
  },
  {
    id: 'desert-edge-lodge',
    label: 'Desert-Edge Lodges',
    count: 4,
    description: 'Comfortable brick and earth sanctuaries right at the threshold of the off-road frontier.'
  },
  {
    id: 'oasis-auberge',
    label: 'Oasis Auberges',
    count: 2,
    description: 'Traditional family-run desert outposts nestled along the historic caravan trails.'
  }
];

const RAW_FOUM_ZGUID_STAYS: FoumZguidStay[] = [
  {
    id: 'fz-1',
    slug: 'erg-chigaga-luxury-sanctuary',
    name: 'Erg Chigaga Luxury Erg Sanctuary',
    description_en: 'A sanctuary of pure silence nestled deep in the colossal golden amphitheaters of Erg Chigaga. Handcrafted Berber wool suites under unpolluted starry skies.',
    description_fr: 'Un sanctuaire de silence absolu au cœur des dunes colossales de l’Erg Chigaga. Suites berbères faites main sous un ciel étoilé préservé.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.82,
    longitude: -6.15,
    price_per_night: 180,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 4,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: '55km deep into the dunes • En-suite flush toilet & hot shower',
    includedExtras: [
      'Sunset camel trek onto the grand dunes',
      'Traditional Berber dinner & drumming circle',
      'Secure Foum Zguid town parking',
      'Coordinated 4x4 expedition transfer via Lake Iriki'
    ],
    image: '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 55,
    transferDetails: 'Coordinated 4x4 pickup from Foum Zguid meeting point included; 2.5-hour track crossing Lake Iriki.',
    rating: 4.96,
    reviewCount: 58,
    tentType: 'Royal Caidal Canvas Suite',
    highlightPill: 'Signature Stargazer Camp'
  },
  {
    id: 'fz-2',
    slug: 'chigaga-wild-dunes-camp',
    name: 'Chigaga Wild Dunes Camp',
    description_en: 'Unmatched isolation and luxury at the foot of Morocco’s wildest dunes. Reached off-road via Foum Zguid across ancient fossil beds.',
    description_fr: 'Isolement et luxe inégalés au pied des dunes les plus sauvages du Maroc. Accessible en hors-piste via Foum Zguid à travers les lits de fossiles.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.85,
    longitude: -6.21,
    price_per_night: 240,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 4,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: '65km deep into the Great Dunes • Private solar electricity & hot rain shower',
    includedExtras: [
      'Guided ridge sunrise trek with elder nomad tracker',
      'Nomad flute campfire performance & fireside tea',
      'Private tent-side fire pit and artisanal stargazing deck',
      'Round-trip professional off-road 4x4 crossing'
    ],
    image: '/images/destinations/foumzguid.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1489493585363-d6943649ef91?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 65,
    transferDetails: 'Private 4x4 transfer included. 3-hour journey through Lake Iriki National Park.',
    rating: 4.98,
    reviewCount: 42,
    tentType: 'Nomad Emperor Suite',
    highlightPill: 'Deepest Dune Penetration'
  },
  {
    id: 'fz-3',
    slug: 'erg-mhazil-nomadic-bivouac',
    name: "Erg El M'Hazil Nomadic Bivouac",
    description_en: 'Set in the lesser-known, pristine dune field of Erg El M’Hazil west of Chigaga. Untouched ripples, zero light pollution, and true solitude.',
    description_fr: 'Situé dans le champ de dunes préservé d’Erg El M’Hazil. Silence total, zéro pollution lumineuse et solitude saharienne absolue.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.79,
    longitude: -6.34,
    price_per_night: 210,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 3,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: '48km off-road • Pristine untouched dune field • Private bio-flush bath',
    includedExtras: [
      'Lake Iriki fossil safari walk & geo-explanation',
      '4-course slow-cooked Sahrawi lamb dinner',
      'Astronomical telescope stargazing session',
      'Full round-trip 4x4 transfer & safe car storage'
    ],
    image: '/images/slideshow/slide-6.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 48,
    transferDetails: 'Coordinated pickup at Foum Zguid Oasis Cafe. Includes 2 hours off-road transit.',
    rating: 4.93,
    reviewCount: 31,
    tentType: 'Bedouin Wool Pavillion',
    highlightPill: 'Zero Tourist Crowds'
  },
  {
    id: 'fz-4',
    slug: 'sands-of-iriki-luxury-bivouac',
    name: 'Sands of Iriki Luxury Bivouac',
    description_en: 'Positioned right where the vast clay pan of Lake Iriki meets the towering dunes. Extraordinary contrast of flat salt horizon and golden peaks.',
    description_fr: 'Positionné là où le vaste bassin d’argile du Lac Iriki rencontre les dunes géantes. Contraste saisissant entre l’horizon blanc et le sable doré.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.88,
    longitude: -6.08,
    price_per_night: 260,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 4,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Edge of Lake Iriki National Park • Handcrafted cedar furniture & plush king bed',
    includedExtras: [
      'Sunset golden-hour dune tea on high dunes',
      'Sandboarding gear & introductory runs',
      'Private 4x4 dune tour around the dried salt pan',
      'Town staging & secure covered car parking'
    ],
    image: '/images/slideshow/slide-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 52,
    transferDetails: 'Dedicated Land Cruiser transfer from Foum Zguid hub; includes national park entry guidance.',
    rating: 4.95,
    reviewCount: 47,
    tentType: 'Grand Horizon Tent',
    highlightPill: 'Iriki National Park Border'
  },
  {
    id: 'fz-5',
    slug: 'chegaga-star-nomad-camp',
    name: 'Chegaga Star Nomad Camp',
    description_en: 'An authentic Berber camp run by hereditary nomadic families from Tata province. Warm hospitality, genuine music, and unpretentious desert comfort.',
    description_fr: 'Un camp berbère authentique géré par des familles nomades de Tata. Hospitalité chaleureuse, musiques du désert et confort feutré.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.83,
    longitude: -6.18,
    price_per_night: 160,
    currency: 'EUR',
    verification_tier: 'verified',
    private_bathroom: true,
    max_guests: 3,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: '52km into the grand dunes • Authentic wool-woven tent & en-suite bath',
    includedExtras: [
      'Berber sand bread baking masterclass in hot coals',
      'Dromedary sunset caravan ride',
      'Traditional tagine & nomad herb tea ceremony',
      'Foum Zguid staging point parking included'
    ],
    image: '/images/slideshow/slide-7.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 52,
    transferDetails: 'Group 4x4 convoy transfer departing Foum Zguid daily at 14:30.',
    rating: 4.89,
    reviewCount: 64,
    tentType: 'Traditional Woven Bivouac',
    highlightPill: 'Family Nomadic Lore'
  },
  {
    id: 'fz-6',
    slug: 'dar-ahansal-deep-desert-camp',
    name: 'Dar Ahansal Deep Desert Camp',
    description_en: 'Conceived for silence seekers, photographers, and writers. Tents are spaced over 100 meters apart in a natural dune amphitheater.',
    description_fr: 'Conçu pour les amateurs de silence, photographes et écrivains. Tentes espacées de plus de 100 mètres dans un cirque naturel de dunes.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.81,
    longitude: -6.12,
    price_per_night: 290,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 2,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Isolated dune amphitheater • Organic cotton linens & private heated shower',
    includedExtras: [
      'Chef-curated desert dinner with local Tata spices',
      'Acoustic Saharan blues recital under the stars',
      'Sunrise yoga mats & meditation dunes',
      'Private air-conditioned 4x4 staging transfer'
    ],
    image: '/images/slideshow/slide-2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 58,
    transferDetails: 'Private expedition vehicle with bottled water and local dried dates included.',
    rating: 4.99,
    reviewCount: 29,
    tentType: 'Quietude Canvas Lodge',
    highlightPill: 'Ultimate Privacy'
  },
  {
    id: 'fz-7',
    slug: 'bivouac-les-nomades',
    name: 'Bivouac Les Nomades – Erg Chigaga Desert Camp',
    description_en: 'Authentic family-run desert sanctuary and expedition agency nestled in the colossal dunes of Erg Chigaga, 67 km from Foum Zguid across Lake Iriki. Owned and guided by local nomad expert Mustapha Elayadi, featuring eco-solar powered traditional and luxury suites, hot showers, campfire music, and unforgettable Saharan tranquility.',
    description_fr: 'Sanctuaire désertique familial et agence d’expédition nichée au cœur des dunes colossales de l’Erg Chigaga, à 67 km de Foum Zguid par le Lac Iriki. Fondé et guidé par Mustapha Elayadi, proposant des tentes traditionnelles et suites de luxe solaires, douches chaudes, musique au coin du feu et authenticité nomade.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.86,
    longitude: -6.17,
    price_per_night: 95,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 4,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: '67km deep in Erg Chigaga • Private en-suite hot bath & flush toilet • Lake Iriki 4x4 staging',
    highlightPill: 'Owner Verified ★ 5.0 TripAdvisor',
    rating: 5.0,
    reviewCount: 128,
    tentType: 'Luxury & Traditional Nomadic Suites',
    image: '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
    images: [
      '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
      '/src/assets/images/nomad_tent_interior_1790671861252.jpg',
      '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
      '/images/destinations/foum_zguid_lake_iriki_hero.jpg',
      '/images/slideshow/slide-11.jpg'
    ],
    sub_location: 'Erg Chigaga Dunes (67km deep via Lake Iriki), Foum Zguid, Tata Province',
    official_website: 'https://bivouaclesnomades.com/',
    owner_name: 'Mustapha Elayadi',
    owner_title: 'Master Nomad Guide & Camp Founder ("Desert GPS")',
    owner_quote: 'Born in the nomad tents of Tata province, our family has navigated the dunes of Erg Chigaga for generations. We welcome you not as a tourist, but as an honored guest in our Saharan homeland.',
    whatsapp: '+212661914041',
    phone: '+212 661-914041',
    tripadvisor_rating: 5.0,
    tripadvisor_reviews: 128,
    trust_bar: {
      accommodation_type: 'Deep Sahara Nomad Bivouac',
      facilities: 'Private En-Suite Hot Shower & Flush Toilet',
      power: '100% Eco-Solar Array (24/7 USB Charging & Lighting)',
      included: 'Sunset Camel Trek, Nomad Drum Circle & Fresh Tagine Dinner'
    },
    editorial_narrative: {
      arrival: 'Your expedition departs Foum Zguid in a rugged 4x4 Land Cruiser, leaving asphalt behind to speed across the cracked, shimmering clay floor of Lake Iriki. As the distant Anti-Atlas mountains fade into the haze, the colossal golden ridges of Erg Chigaga emerge on the horizon. Arriving at Bivouac Les Nomades, you are warmly greeted by Mustapha Elayadi and his Sahrawi team with piping-hot mint tea, roasted almonds, and sweet desert dates under the shaded pavilion.',
      evening: 'As dusk paints the dunes in deep amber and violet shadows, lantern-lit walkways guide you to the central fire pit. Guests gather around crackling acacia logs as the camp chef reveals sand bread ("Taguella") freshly baked in hot desert embers, followed by slow-simmered lamb tagine with Tata spices. Afterward, Mustapha and his brothers play hypnotic Sahrawi blues on acoustic instruments and drums, singing age-old nomadic poetry under a crystal canopy of shooting stars.',
      silence: 'Miles away from generator hum, highways, or tourist crowds, the night in Erg Chigaga brings a silence so total you can hear the soft whisper of wind shifting the dune crests. Cocooned inside handwoven wool blankets and insulated canvas, you wake at dawn to watch the first rays ignite the grand dunes into radiant copper.'
    },
    logistics: {
      meeting_point: 'Bivouac Les Nomades Base & Welcome Agency, Avenue Mohammed V, Foum Zguid Town Center (directly opposite municipal gardens, Tata Province). Coordinated directly with host Mustapha.',
      transfer_type: 'Coordinated 2.5-hour 4x4 Toyota Land Cruiser expedition across the Lake Iriki flatlands and ancient marine fossil beds directly into Erg Chigaga',
      transfer_included: true,
      transfer_cost: 'Round-trip 4x4 expedition included in camp reservation',
      drive_time_from_marrakech: 'Approx. 5.5 hours via Tizi n\'Tichka pass & Taznakht (3.5 hours from Ouarzazate or Zagora)',
      parking_info: 'Guarded 24/7 enclosed private garage in Foum Zguid town included complimentary for all standard rental cars (2WD)',
      road_type: 'Paved national highway (N12/R111) straight to Foum Zguid meeting point; off-road desert track to camp'
    },
    key_amenities: [
      'Private En-Suite Hot Shower',
      'Ceramic Flush Toilet',
      '100% Solar-Powered 24/7',
      'Sunset Camel Trek Included',
      'Fresh Berber Sand Bread (Taguella)',
      'Traditional Sahrawi Drumming',
      'Free Guarded Foum Zguid Parking',
      'Sandboarding Boards on Site',
      'Lake Iriki Fossil Safari',
      'Direct Owner Verification (Mustapha)'
    ],
    tent_options: [
      {
        id: 'traditional-nomad-tent',
        name: 'Traditional Berber Nomad Tent',
        badge: 'Authentic Sahrawi',
        description: 'Cozy authentic tent woven from sheep wool and camel hair, equipped with raised comfortable beds, handwoven Berber carpets, solar lighting, and private en-suite bathroom with hot shower and toilet.',
        bed_type: '1 Queen Bed or 2 Twin Beds',
        capacity: '2-3',
        price_per_night: 95,
        image: '/images/slideshow/slide-11.jpg',
        features: ['Private En-suite Shower & Toilet', 'Woven Berber Wool Carpets', '24/7 Solar USB Charging', 'Traditional Breakfast Included']
      },
      {
        id: 'luxury-canvas-suite',
        name: 'Erg Chigaga Luxury Canvas Suite',
        badge: 'Most Popular',
        description: 'Spacious 34m² canvas suite with plush King bed, premium orthopaedic mattress, crisp white linens, handcrafted cedar tables, brass Moroccan lanterns, private en-suite bathroom with hot running water shower and flush toilet, plus a private shaded dune terrace.',
        bed_type: '1 Plush King Bed',
        capacity: '2',
        price_per_night: 150,
        image: '/src/assets/images/nomad_tent_interior_1790671861252.jpg',
        features: ['34 m² Space & King Bed', 'Private En-Suite Hot Shower & Toilet', 'Private Shaded Dune Deck', 'Dinner & Breakfast Included', 'USB & Camera Charging Station']
      },
      {
        id: 'royal-family-pavilion',
        name: 'Royal Panoramic Family Pavilion',
        badge: 'Family / Group',
        description: 'Extra-large 45m² pavilion ideal for families or friends traveling together. Features 1 King bed plus 2 Twin beds, large nomad carpets, sitting lounge, private en-suite bathroom, and breathtaking panoramic views of the Erg Chigaga golden dunes.',
        bed_type: '1 King Bed + 2 Twin Beds',
        capacity: '4',
        price_per_night: 230,
        image: '/src/assets/images/bivouac_les_nomades_1790671846484.jpg',
        features: ['45 m² Multi-Bed Suite (Max 4 Guests)', 'Private En-Suite Hot Bathroom', 'Panoramic High-Dune View', 'Full Board Dinner & Breakfast', 'Complimentary Camel Safari']
      },
      {
        id: 'exclusive-private-bivouac',
        name: 'Exclusive Private Nomad Bivouac',
        badge: 'Ultra-Exclusive',
        description: 'A completely private, secluded desert encampment set up in an isolated dune bowl for ultimate romantic or group intimacy. Includes a dedicated private desert chef, private guide, bespoke campfire setup, and 360° unobstructed Sahara views.',
        bed_type: 'Custom Configuration (1-3 Tents)',
        capacity: '2-6',
        price_per_night: 380,
        image: '/src/assets/images/chigaga_milkyway_tent_1790326245816.jpg',
        features: ['100% Private Isolated Dune Encampment', 'Dedicated Private Chef & Butler', 'Custom 4-Course Candlelit Dune Banquet', 'Exclusive Stargazing & Music Setup', 'Round-Trip Private 4x4 Included']
      }
    ],
    includedExtras: [
      'Sunset camel trek to the 300m high Erg Chigaga ridge',
      'Authentic evening campfire with Sahrawi nomad drums and songs',
      'Multi-course dinner with fresh sand bread (Taguella) and breakfast',
      'Free guarded 24/7 vehicle parking at Foum Zguid agency base',
      'Lake Iriki dried lake crossing & fossil bed stop'
    ],
    distanceKm: 67,
    transferDetails: 'Coordinated 4x4 Land Cruiser expedition departing Foum Zguid base daily at 14:30. Lake Iriki crossing included.'
  },
  {
    id: 'fz-8',
    slug: 'azalai-desert-bivouac-chigaga',
    name: 'Azalai Desert Bivouac Chigaga',
    description_en: 'The pinnacle of deep Saharan expedition glamor. Colonial leather steamer trunks, antique silver teapots, and bespoke white canvas pavilions.',
    description_fr: 'Le summum de l’élégance saharienne. Malles en cuir, argenterie ancienne et grands pavillons de toile blanche au milieu du désert.',
    destination: 'foum-zguid',
    category: 'deep-sahara-bivouac',
    categoryLabel: 'Deep Sahara Bivouac',
    latitude: 29.84,
    longitude: -6.23,
    price_per_night: 340,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 2,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Ultra-luxury expedition bivouac • Antique kilim rugs & brass en-suite fixtures',
    includedExtras: [
      'Private camp butler throughout your desert stay',
      'Vintage expedition 4x4 transit across Lake Iriki',
      'Multi-course candlelit dune banquet with Moroccan fine wines',
      'Private astronomy guide and high-powered binoculars'
    ],
    image: '/images/slideshow/slide-4.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 60,
    transferDetails: 'Private luxury Toyota Prado staging from Foum Zguid with chilled refreshments.',
    rating: 5.0,
    reviewCount: 38,
    tentType: 'Expedition Master Pavilion',
    highlightPill: 'Ultra-Luxury Standard'
  },
  {
    id: 'fz-9',
    slug: 'bab-rimal-desert-edge-lodge',
    name: 'Bab Rimal Desert Edge Lodge',
    description_en: 'Built from local pisé and river stone at the threshold of the Foum Zguid oasis. The premier gateway base before entering the deep sand dunes.',
    description_fr: 'Construit en pisé et pierre locale aux portes de l’oasis de Foum Zguid. La base idéale avant la traversée vers les dunes.',
    destination: 'foum-zguid',
    category: 'desert-edge-lodge',
    categoryLabel: 'Desert-Edge Lodge',
    latitude: 30.01,
    longitude: -6.87,
    price_per_night: 125,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 4,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Threshold of Lake Iriki • Earthen pisé suites & fresh spring-fed pool',
    includedExtras: [
      'Secure 24/7 monitored rental vehicle parking inside gates',
      'Fresh palm-grove poolside breakfast buffet',
      '4x4 expedition vehicle staging & tire pressure check',
      'Direct coordination with Chigaga camp drivers'
    ],
    image: '/images/slideshow/slide-3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 0,
    transferDetails: 'Accessible by any standard 2WD rental car; departure point for all deep-dune 4x4s.',
    rating: 4.92,
    reviewCount: 76,
    tentType: 'Adobe Desert Suite',
    highlightPill: 'Paved Access + Swimming Pool'
  },
  {
    id: 'fz-10',
    slug: 'kasbah-bivouac-les-roches',
    name: 'Kasbah Bivouac Les Roches',
    description_en: 'A historic earth-and-stone Kasbah at the southern tip of Jebel Bani. Cool vaulted ceilings, palm garden courtyards, and local Berber guides.',
    description_fr: 'Une casbah traditionnelle en pisé au pied du Jebel Bani. Voûtes fraîches, jardins de palmiers et guides berbères locaux.',
    destination: 'foum-zguid',
    category: 'desert-edge-lodge',
    categoryLabel: 'Desert-Edge Lodge',
    latitude: 30.02,
    longitude: -6.89,
    price_per_night: 110,
    currency: 'EUR',
    verification_tier: 'verified',
    private_bathroom: true,
    max_guests: 3,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Palm oasis threshold • Thick adobe walls & air-cooled comfort',
    includedExtras: [
      'Gated secure vehicle parking while you are in the dunes',
      'Fresh Tata dates & almond milk welcoming tray',
      'Desert GPS track briefing with regional expedition experts',
      'Hearty pre-departure expedition breakfast'
    ],
    image: '/images/slideshow/slide-8.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 2,
    transferDetails: 'Standard car reachable. On-site 4x4 fleet handles onward desert departures.',
    rating: 4.87,
    reviewCount: 52,
    tentType: 'Kasbah Adobe Room',
    highlightPill: 'Heritage Oasis Kasbah'
  },
  {
    id: 'fz-11',
    slug: 'riad-hiba-foum-zguid',
    name: 'Hôtel Restaurant Riad Hiba',
    description_en: 'Authentic town riad in Foum Zguid offering comfortable rooms, a leafy interior fountain courtyard, and deep local expedition knowledge.',
    description_fr: 'Riad authentique à Foum Zguid avec patio arboré, fontaine rafraîchissante et conseils avisés pour les départs vers l’Erg Chigaga.',
    destination: 'foum-zguid',
    category: 'desert-edge-lodge',
    categoryLabel: 'Desert-Edge Lodge',
    latitude: 30.03,
    longitude: -6.88,
    price_per_night: 95,
    currency: 'EUR',
    verification_tier: 'verified',
    private_bathroom: true,
    max_guests: 2,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Historic staging point • Traditional zellij courtyard & artisan suites',
    includedExtras: [
      'Guarded parking garage with shade canopies',
      'Custom expedition supply packing (mineral water & trail fruit)',
      '3-course Berber feast cooked in traditional wood ovens',
      'Morning departure coordination with desert drivers'
    ],
    image: '/images/destinations/ouarzazate.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 0,
    transferDetails: 'Located in Foum Zguid town center on the main paved avenue.',
    rating: 4.84,
    reviewCount: 43,
    tentType: 'Zellij Patio Room',
    highlightPill: 'Central Town Staging'
  },
  {
    id: 'fz-12',
    slug: 'iriki-eco-sanctuary-lodge',
    name: 'Iriki Eco-Sanctuary Lodge',
    description_en: 'Architecturally integrated rammed-earth lodge situated where the Jebel Bani mountain ridges dip down towards the Sahara sands.',
    description_fr: 'Lodge bioclimatique en pisé intégré aux contreforts du Jebel Bani, offrant une vue panoramique sur l’immensité désertique.',
    destination: 'foum-zguid',
    category: 'desert-edge-lodge',
    categoryLabel: 'Desert-Edge Lodge',
    latitude: 29.98,
    longitude: -6.82,
    price_per_night: 175,
    currency: 'EUR',
    verification_tier: 'elite',
    private_bathroom: true,
    max_guests: 3,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Desert border at Jebel Bani • Passive earth cooling & panoramic observation roof',
    includedExtras: [
      'Observation telescope deck overlooking the desert plain',
      'Farm-to-table organic oasis breakfast',
      'Guided Lake Iriki geology & fossil staging tour',
      'Complimentary guarded lockup for customer rental cars'
    ],
    image: '/images/slideshow/slide-5.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 8,
    transferDetails: 'Paved road until the final 500m of compacted gravel. 4x4 staging hub on-site.',
    rating: 4.94,
    reviewCount: 36,
    tentType: 'Rammed-Earth Eco Suite',
    highlightPill: 'Mountain & Dune Panorama'
  },
  {
    id: 'fz-13',
    slug: 'auberge-oasis-foum-zguid',
    name: "Auberge l'Oasis Foum Zguid",
    description_en: 'A quiet, unhurried guesthouse shaded by 800 date palms. Loved by overland travelers, motorcycle adventurers, and desert purists.',
    description_fr: 'Maison d’hôtes paisible à l’ombre d’une palmeraie centenaire. Le repaire des voyageurs au long cours et des amoureux du Sahara authentique.',
    destination: 'foum-zguid',
    category: 'oasis-auberge',
    categoryLabel: 'Oasis Auberge',
    latitude: 30.02,
    longitude: -6.87,
    price_per_night: 85,
    currency: 'EUR',
    verification_tier: 'verified',
    private_bathroom: true,
    max_guests: 3,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Nestled in the ancient palmeraie • Family-run nomadic hospitality',
    includedExtras: [
      'Shaded garden mint tea with homemade gazelle horns',
      'Safe lockup for private vehicles during desert nights',
      'Homecooked claypot lemon chicken tagine',
      'Friendly local advice on track conditions and weather'
    ],
    image: '/images/slideshow/slide-10.png',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 1,
    transferDetails: 'Easy paved access. Secure compound for vehicles and motorbikes.',
    rating: 4.86,
    reviewCount: 55,
    tentType: 'Traditional Palm Garden Room',
    highlightPill: 'Authentic Palmeraie'
  },
  {
    id: 'fz-14',
    slug: 'auberge-iriqui-outpost',
    name: 'Auberge Iriqui Traditional Outpost',
    description_en: 'Historic camel caravan outpost operating for three generations. Thick straw-mud walls that stay naturally cool even during mid-day desert heat.',
    description_fr: 'Ancien relais de caravanes transmis depuis trois générations. Murs épais en pisé assurant une fraîcheur naturelle.',
    destination: 'foum-zguid',
    category: 'oasis-auberge',
    categoryLabel: 'Oasis Auberge',
    latitude: 30.01,
    longitude: -6.86,
    price_per_night: 75,
    currency: 'EUR',
    verification_tier: 'verified',
    private_bathroom: true,
    max_guests: 2,
    status: 'active',
    created_at: new Date().toISOString(),
    subDetail: 'Century-old desert trading post • Mud-brick architecture & quiet courtyard',
    includedExtras: [
      'Free secure car storage during your desert bivouac stay',
      'Sunrise palm terrace breakfast with freshly baked flatbread',
      'Personal introduction to your licensed desert 4x4 driver',
      'Complimentary bottled spring water for your journey'
    ],
    image: '/images/slideshow/slide-9.png',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9958194c97?auto=format&fit=crop&q=80&w=1200',
    distanceKm: 1,
    transferDetails: 'Paved access in town. Complete staging coordination for Lake Iriki expeditions.',
    rating: 4.82,
    reviewCount: 48,
    tentType: 'Heritage Mud-Brick Chamber',
    highlightPill: 'Old Caravan Outpost'
  }
];

// Automatically synchronise stay images with dedicated lodge image files
export const FOUM_ZGUID_STAYS: FoumZguidStay[] = RAW_FOUM_ZGUID_STAYS.map(stay => {
  const lodge = LODGE_IMAGES[stay.slug];
  if (!lodge) return stay;
  return {
    ...stay,
    image: lodge.hero || stay.image,
    fallbackImage: lodge.fallback || stay.fallbackImage,
    images: lodge.gallery && lodge.gallery.length > 0 ? lodge.gallery : stay.images
  };
});

export const EXPERT_GUIDE_CONTENT = {
  subheading: 'Why Choose Foum Zguid Over Merzouga?',
  bodyCopy: "While northern gateways like Merzouga have grown dense with commercial tourism, Foum Zguid remains the quiet, authentic portal to Morocco's most pristine desert ecosystems. Traversing the surreal, fossil-rich plains of Lake Iriki National Park and the untamed ridges of Jebel Bani, a stay here offers true solitude. Our local team physically audits every route, camp, and partner driver to ensure your journey is completely seamless, scam-free, and anchored in respectful nomadic traditions.",
  deepDives: [
    {
      title: 'Crossing the Dried Basin of Lake Iriki',
      content: 'Once a vast lake fed by the Draa river where gazelles and ostriches roamed, Lake Iriki is today an ethereal 30-kilometer clay and salt flat. Driving across it by 4x4 feels like navigating another planet—a vast white mirage plane framed by the violet cliffs of Jebel Bani to the north and the towering orange crests of Erg Chigaga to the south.'
    },
    {
      title: 'Erg Chigaga vs. Erg Chebbi',
      content: 'Erg Chebbi (Merzouga) has a paved road running directly to the back of the dunes, meaning hotels and quad bikes surround the perimeter. In contrast, Erg Chigaga is protected by a 50km buffer of roadless wilderness. Reaching it requires a true desert expedition, rewarding you with total acoustic silence and zero artificial light pollution.'
    },
    {
      title: 'Our Physical Inspection Standard',
      content: 'Every single stay listed on this page is physically inspected by our ground team. We audit bed linens, private flush plumbing systems, solar battery reserves, emergency satellite communication beacons, and the legal commercial licensing of all 4x4 partner drivers.'
    }
  ]
};

export const REGIONAL_FAQS = [
  {
    question: 'Are 4x4 transfers from Foum Zguid town included in the booking?',
    answer: 'Each camp listing explicitly details its transfer policy. Many include coordinated 4x4 pickup from our secure town meeting point to handle the off-road crossing across Lake Iriki. For camps where transfers are an optional add-on, the exact flat price and vehicle details are clearly listed with zero hidden surprises.'
  },
  {
    question: 'Is there mobile network coverage at the deep desert camps?',
    answer: 'Connectivity is extremely limited or non-existent once you pass deep into Erg Chigaga—which is precisely why travelers come here. Emergency satellite comms are maintained at all verified camps, and our town dispatch team monitors weather and track conditions 24/7.'
  },
  {
    question: 'Can I leave my rental car safely in Foum Zguid?',
    answer: 'Yes. All our verified listings provide secure, monitored parking locations in town before you transition into the desert via 4x4. Your vehicle remains in a gated, guarded compound until your return.'
  },
  {
    question: 'How long does the off-road drive from Foum Zguid to Erg Chigaga take?',
    answer: 'The crossing takes between 2 to 3 hours depending on track conditions, covering approximately 50 to 65 kilometers of desert piste, fossil plateaus, and the dry clay basin of Lake Iriki. The ride is part of the expedition adventure!'
  },
  {
    question: 'What is the temperature like between day and night?',
    answer: 'During the prime season (October to April), daytime temperatures are pleasantly warm (22°C to 28°C / 72°F to 82°F) under bright sunny skies. At night, desert radiation causes temperatures to drop rapidly to 5°C to 10°C (40°F to 50°F). All verified camps provide thick camel-wool blankets, hot water bottles, and heated private en-suite showers.'
  },
  {
    question: 'Is Foum Zguid accessible with a standard 2WD rental car?',
    answer: 'Yes! The paved highway (N17/R111) connects Marrakech and Ouarzazate directly to Foum Zguid town smoothly. You do not need a 4x4 to reach Foum Zguid. You only need the 4x4 to venture past the town into the desert, which is handled by your camp operator.'
  }
];
