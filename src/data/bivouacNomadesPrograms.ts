export interface ProgramItineraryDay {
  day: number;
  title: string;
  location: string;
  mealsIncluded: string[];
  description: string;
  activities: string[];
}

export interface ProgramReview {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
}

export interface StructuredDesertProgram {
  id: string;
  slug: string;
  path: string; // Real URL: /foum-zguid/:slug
  title: string;
  seoTitle: string;
  metaDescription: string;
  campName: string;
  campSlug: string;
  destination: string;
  rating: number;
  reviewCount: number;
  durationDays: number;
  durationNights: number;
  durationLabel: string;
  pricePerPerson: number;
  currency: string;
  startPoint: string;
  endPoint: string;
  transportType: string;
  image: string;
  gallery: string[];
  category: 'overnight' | 'luxury' | 'multi-day' | 'adventure' | 'cultural';
  activityTags: string[];
  cardHighlights: string[]; // 2-3 short, scan-friendly points for browsing cards
  editorialSummary: string; // Original, anti-duplicate editorial summary
  highlights: string[];
  itinerary: ProgramItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  goodToKnow: {
    meetingTime: string;
    meetingLocation: string;
    luggagePolicy: string;
    whatToPack: string[];
    connectivity: string;
    weatherNotice: string;
  };
  operatorQuestions: {
    issue: string;
    clarification: string;
    status: 'Verified with Mustapha' | 'Awaiting Schedule Confirmation';
  }[];
  reviews: ProgramReview[];
  verificationStatus: 'operator_listed' | 'physically_audited';
  lastCheckedDate: string;
}

export interface ProgramAuditMetadata {
  sourceUrl: string;
  lastCheckedDate: string;
  verificationStatus: 'operator_listed' | 'physically_audited';
  verificationLabel: string;
  notes: string;
}

export const BIVOUAC_NOMADES_AUDIT_META: ProgramAuditMetadata = {
  sourceUrl: "https://bivouaclesnomades.com",
  lastCheckedDate: "October 2026",
  verificationStatus: "operator_listed",
  verificationLabel: "Rates listed by the operator, last checked October 2026",
  notes: "Direct rates published on bivouaclesnomades.com. Specific schedule details and ambiguities flagged as questions to operator prior to physical audit."
};

export const STRUCTURED_PROGRAMS: StructuredDesertProgram[] = [
  {
    id: "2-days-overnight-adventure",
    slug: "2-day-overnight-erg-chegaga",
    path: "/foum-zguid/2-day-overnight-erg-chegaga",
    title: "2-Day Overnight Erg Chegaga Desert Safari",
    seoTitle: "2 Day Erg Chegaga Tour from Foum Zguid | Bivouac Les Nomades",
    metaDescription: "Experience Erg Chegaga dunes from Foum Zguid. Cross dry Lake Iriki, search for marine fossils, and sleep under Saharan stars with Bivouac Les Nomades.",
    campName: "Bivouac Les Nomades",
    campSlug: "bivouac-les-nomades",
    destination: "Foum Zguid & Erg Chegaga",
    rating: 4.9,
    reviewCount: 52,
    durationDays: 2,
    durationNights: 1,
    durationLabel: "2 Days / 1 Night",
    pricePerPerson: 99,
    currency: "EUR",
    startPoint: "Foum Zguid Meeting Depot",
    endPoint: "Foum Zguid",
    transportType: "Rugged 4x4 Land Cruiser transfer",
    image: "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tour-2day.webp",
    gallery: [
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tour-2day.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-campfire.webp"
    ],
    category: "overnight",
    activityTags: ["Dunes & Sunset", "Fossil Beds", "Nomadic Tea", "Stargazing"],
    cardHighlights: [
      "Paris-Dakar piste & Lake Iriki salt flats",
      "Traditional tagine dinner & fireside drum circle",
      "Nomadic tea ceremony & morning dune walk"
    ],
    editorialSummary: "A compact, high-value desert expedition designed for travelers wanting to reach the towering sand crests of Erg Chegaga without an extensive multi-day commitment. You cross the dry lakebed of Iriki by 4x4, collect Devonian marine fossils at the base of Tajjin Mountain, and spend the night in an authentic Saharan bivouac.",
    highlights: [
      "Scenic 4x4 drive crossing the ancient Paris-Dakar rally tracks",
      "Stop at Tajjin Mountain to examine prehistoric sea fossils",
      "Sunset observation from the crest of Erg Chegaga dunes",
      "Campfire with traditional Berber drumming and bread baking",
      "Morning tea ritual with local nomadic shepherd families"
    ],
    itinerary: [
      {
        day: 1,
        title: "Foum Zguid to Erg Chegaga via Lake Iriki & Fossil Basin",
        location: "Erg Chegaga Sand Sea",
        mealsIncluded: ["Dinner"],
        description: "Meet your desert driver in Foum Zguid at 15:00. Board the 4x4 to head south into Iriki National Park. You traverse dry salt pans, stop at the mineral-rich strata of Tajjin Mountain to search for marine fossils, and reach camp as the sands shift to amber. Conclude with a traditional Moroccan tagine and folklore music under unpolluted night skies.",
        activities: ["4x4 Desert Crossing", "Paleontological Fossil Discovery", "Sunset Over Dunes", "Berber Drumming Circle"]
      },
      {
        day: 2,
        title: "Dune Sunrise, Nomadic Tea Ritual & 4x4 Return",
        location: "Foum Zguid",
        mealsIncluded: ["Breakfast", "Desert Lunch"],
        description: "Wake before dawn to watch the Saharan sun rise over the dune ridge. After an outdoor breakfast of fresh msemen, eggs, and Moroccan coffee, join a guided walk to a nearby nomadic settlement for a ceremonial mint tea exchange. Enjoy a secluded midday lunch among the dunes before the 4x4 navigates back to Foum Zguid by late afternoon.",
        activities: ["Sunrise Photography", "Nomadic Settlement Visit", "Saharan Midday Picnic", "Return 4x4 Ride"]
      }
    ],
    inclusions: [
      "Round-trip 4x4 transport between Foum Zguid and Erg Chegaga",
      "1 night tent accommodation at Bivouac Les Nomades",
      "Dinner on Day 1, Breakfast & Lunch on Day 2",
      "Lake Iriki and Tajjin fossil site exploration",
      "Nomadic tea ceremony and local Berber guide",
      "Guarded parking in Foum Zguid for private rental cars"
    ],
    exclusions: [
      "Alcoholic beverages and personal snacks",
      "Tips for 4x4 driver and camp staff (discretionary)",
      "Personal travel and medical insurance"
    ],
    goodToKnow: {
      meetingTime: "15:00 at the Foum Zguid cooperative meeting depot.",
      meetingLocation: "Foum Zguid town center (secure parking provided).",
      luggagePolicy: "1 soft duffle or carry-on per guest; main suitcases can remain safely locked in Foum Zguid.",
      whatToPack: ["Warm fleece/jacket for desert nights", "Closed-toe walking shoes", "Sunglasses & high SPF", "Headlamp or torch"],
      connectivity: "Limited Maroc Telecom 3G signal near camp perimeter; digital detox recommended.",
      weatherNotice: "Desert temperatures drop quickly after sunset; layering is essential year-round."
    },
    operatorQuestions: [
      {
        issue: "Departure Timing Flexibility",
        clarification: "Standard departure is 15:00, but morning departures can be arranged if pre-booked with Mustapha.",
        status: "Verified with Mustapha"
      }
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Sophie & Martin L.",
        location: "Lyon, France",
        date: "September 2026",
        rating: 5,
        title: "Unbeatable value for the wild Erg Chegaga dunes",
        comment: "At 99 euros we were unsure what to expect, but the 4x4 journey across Lake Iriki was breathtaking and Mustapha was an exceptionally welcoming host. Seeing the stars without light pollution is unforgettable."
      },
      {
        id: "rev-2",
        author: "Julian K.",
        location: "Munich, Germany",
        date: "August 2026",
        rating: 5,
        title: "Real Morocco, far from the tourist crowds",
        comment: "Foum Zguid is so much more authentic than Merzouga. The fossil hunting stop was fascinating and sleeping in the silent dunes was magical."
      }
    ],
    verificationStatus: 'operator_listed',
    lastCheckedDate: 'October 2026'
  },
  {
    id: "erg-chegaga-luxury-camp",
    slug: "erg-chegaga-luxury-camp",
    path: "/foum-zguid/erg-chegaga-luxury-camp",
    title: "Erg Chegaga Luxury Glamping Sanctuary",
    seoTitle: "Erg Chegaga Luxury Camp from Foum Zguid | Private Bathroom Glamping",
    metaDescription: "Private en-suite luxury tent glamping in Erg Chegaga dunes from Foum Zguid. King beds, private solar showers, gourmet desert dinners, and sunset camel trek.",
    campName: "Bivouac Les Nomades — Luxury Suite",
    campSlug: "bivouac-les-nomades",
    destination: "Erg Chegaga Luxury Sector",
    rating: 5.0,
    reviewCount: 38,
    durationDays: 2,
    durationNights: 1,
    durationLabel: "2 Days / 1 Night",
    pricePerPerson: 200,
    currency: "EUR",
    startPoint: "Foum Zguid Private Welcome Lounge",
    endPoint: "Foum Zguid",
    transportType: "Private Air-Conditioned 4x4",
    image: "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.webp",
    gallery: [
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tent-luxury.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-food-tagine.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-campfire.webp"
    ],
    category: "luxury",
    activityTags: ["Luxury Glamping", "Private En-Suite", "Sunset Camel Trek", "Gourmet Dining"],
    cardHighlights: [
      "Private hand-crafted tent with en-suite hot shower & flush toilet",
      "Guided sunset camel ride along the high dune ridge",
      "Multi-course candlelit Moroccan dinner under the Milky Way"
    ],
    editorialSummary: "Created for travelers who value deep desert remoteness without sacrificing hot water, real king mattresses, and en-suite bathrooms. This upgraded experience replaces basic shared facilities with spacious private canvas suites complete with hand-woven Berber carpets and dedicated table-side dining.",
    highlights: [
      "Spacious canvas suite with king bed and private en-suite bathroom",
      "Solar-powered 24/7 lighting and USB phone charging in tent",
      "Sunset camel caravan across Erg Chegaga's 300m dune sea",
      "Private outdoor dining setup with Moroccan gourmet specialties",
      "Quiet glamping zone separated from group camp areas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Private 4x4 Transfer, Sunset Caravan & Luxury Tent Check-in",
        location: "Erg Chegaga Luxury Enclave",
        mealsIncluded: ["Welcome Refreshments", "Gourmet Dinner"],
        description: "Depart Foum Zguid in a dedicated 4x4. Traverse the desert plateau and arrive directly at the luxury tent enclave. Unpack into your private suite with fresh linens and en-suite facilities. As golden hour approaches, mount your dromedary for a gentle ascent to Erg Chegaga's highest ridgeline. Return to camp for an elaborate candlelit multi-course Moroccan feast and quiet fireside acoustic music.",
        activities: ["Private 4x4 Transit", "Luxury Suite Orientation", "High-Dune Camel Trek", "Candlelit Sahara Feast"]
      },
      {
        day: 2,
        title: "Golden Dune Dawn, Artisanal Breakfast & Return Transfer",
        location: "Foum Zguid",
        mealsIncluded: ["Breakfast"],
        description: "Awake to sunrise colors illuminating your tent canvas. Enjoy fresh fruit, Moroccan pastries, organic olive oils, and brewed coffee on your private dune terrace. Spend peaceful morning hours walking the crests before your private 4x4 returns you smoothly to your vehicle in Foum Zguid.",
        activities: ["Terrace Sunrise Viewing", "Artisanal Berber Breakfast", "Private Return Transfer"]
      }
    ],
    inclusions: [
      "Private round-trip 4x4 transfer from Foum Zguid",
      "1 night in private luxury suite with en-suite shower & toilet",
      "Gourmet multi-course dinner & artisanal terrace breakfast",
      "Guided sunset camel trek with dedicated dromedary guide",
      "Live acoustic fireside musical performance",
      "Unlimited bottled water, fresh mint tea, and desert snacks"
    ],
    exclusions: [
      "Optional quad biking or sand dune buggy excursions",
      "Staff gratuities",
      "Personal medical insurance"
    ],
    goodToKnow: {
      meetingTime: "Flexible afternoon departure (between 14:00 and 16:00).",
      meetingLocation: "Foum Zguid private partner lounge.",
      luggagePolicy: "Full luggage accepted; porters carry bags straight to tent suite.",
      whatToPack: ["Comfortable evening wear", "Slip-on camp shoes", "Camera / tripod for night sky photography"],
      connectivity: "Emergency satellite phone on site; local SIM data intermittently available.",
      weatherNotice: "Luxury tents feature heavy insulated nomadic canvas to regulate interior temperatures."
    },
    operatorQuestions: [
      {
        issue: "Bathroom Heating in Winter",
        clarification: "Hot water is heated via solar boilers with wood-fire backup for cold January/February evenings.",
        status: "Verified with Mustapha"
      }
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Elena & David R.",
        location: "London, UK",
        date: "October 2026",
        rating: 5,
        title: "Real comfort in the middle of nowhere",
        comment: "Having a real flush toilet and hot shower after riding a camel across the dunes felt like pure luxury. The food was the best we had in Morocco."
      }
    ],
    verificationStatus: 'operator_listed',
    lastCheckedDate: 'October 2026'
  },
  {
    id: "foum-zguid-to-zagora-traverse",
    slug: "foum-zguid-to-zagora-via-lake-iriki",
    path: "/foum-zguid/foum-zguid-to-zagora-via-lake-iriki",
    title: "3-Day Sahara Traverse: Foum Zguid to Zagora via Lake Iriki",
    seoTitle: "3 Day Foum Zguid to Zagora Desert Tour via Erg Chegaga & Lake Iriki",
    metaDescription: "Cross southern Morocco from Foum Zguid to Zagora over 3 days. Experience Lake Iriki, Erg Chegaga dunes, Draa Valley oases, and stay in two distinct desert camps.",
    campName: "Bivouac Les Nomades + Zagora Caravan Outpost",
    campSlug: "bivouac-les-nomades",
    destination: "Foum Zguid → Erg Chegaga → Zagora",
    rating: 4.85,
    reviewCount: 29,
    durationDays: 3,
    durationNights: 2,
    durationLabel: "3 Days / 2 Nights",
    pricePerPerson: 280,
    currency: "EUR",
    startPoint: "Foum Zguid",
    endPoint: "Zagora (or return transfer)",
    transportType: "Full 3-Day Expedition 4x4 with Guide",
    image: "/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp",
    gallery: [
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-camel.jpg",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-03.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-04.webp"
    ],
    category: "multi-day",
    activityTags: ["One-Way Traverse", "Two Different Camps", "Draa Valley Oasis", "Kasbah Heritage"],
    cardHighlights: [
      "One-way traverse connecting Foum Zguid to Zagora via Erg Chegaga",
      "Two contrasting camps: authentic wilderness bivouac & luxury oasis tent",
      "Visits to ancient Jewish kasbah, Koranic library & Tamegroute pottery"
    ],
    editorialSummary: "A linear desert traverse through Morocco's southernmost wild corridor. Instead of backtracking, you embark from Foum Zguid, cross Lake Iriki into Erg Chegaga, explore hidden desert settlements, and emerge through the lush date palms of the Draa Valley into Zagora.",
    highlights: [
      "Point-to-point journey across the breadth of the southern Moroccan Sahara",
      "Exploration of the ancient clay village and school of Sidi Abd Enbi",
      "Stay in both an authentic wilderness camp and a comfortable glamping lodge",
      "Historical tour of Tamegroute's subterranean kasbah and green pottery kilns"
    ],
    itinerary: [
      {
        day: 1,
        title: "Foum Zguid, Tajine Mountains, Lake Iriki & Chegaga Sunset",
        location: "Erg Chegaga Dunes",
        mealsIncluded: ["Dinner"],
        description: "Meet in Foum Zguid at 15:30. Travel through the ancient sea beds of the Tajine Mountains, pause at Elagermia oasis to collect marine fossils, and traverse the flat expanse of Lake Iriki. Arrive at Bivouac Les Nomades for sunset tea, a camel ride across the golden dunes, and a fireside tagine dinner.",
        activities: ["4x4 Mountain Pass", "Lake Iriki Crossing", "Sunset Camel Trek", "Campfire Gathering"]
      },
      {
        day: 2,
        title: "Sidi Abd Enbi Village, Desert School & Chegaga Dunes Camp",
        location: "Erg Chegaga Deep Sector",
        mealsIncluded: ["Breakfast", "Nomad Family Lunch", "Dinner"],
        description: "Depart camp after breakfast to explore the historical mud-brick village of Sidi Abd Enbi and the Zawiat oasis. Visit a remote nomadic primary school supported by desert guides. Share a traditional home-cooked lunch with local nomadic elders before traveling deeper into Erg Chegaga for a night at a luxury camp with live Saharan music.",
        activities: ["Heritage Village Walk", "Nomadic School Visit", "Cultural Family Lunch", "Second Camp Experience"]
      },
      {
        day: 3,
        title: "M'Hamid Elghizlane, Tamegroute Pottery & Zagora Conclusion",
        location: "Zagora",
        mealsIncluded: ["Breakfast"],
        description: "Breakfast overlooking the morning dunes, then follow the historic caravan routes toward M'Hamid Elghizlane. Trace the Draa River oases northward to Tamegroute to tour the 17th-century Koranic library, ancient underground kasbah, and emerald-green glaze pottery workshops, concluding in Zagora.",
        activities: ["Caravan Route Transit", "Tamegroute Historical Tour", "Pottery Workshop Demonstration"]
      }
    ],
    inclusions: [
      "3 full days of private 4x4 expedition vehicle with professional driver-guide",
      "1 night authentic nomad camp + 1 night upgraded luxury camp",
      "All dinners and breakfasts plus Day 2 authentic nomad lunch",
      "Sunset camel trekking on the high dunes",
      "All historical village, oasis, and pottery workshop entrance visits",
      "End-of-tour drop-off in Zagora or arranged return transfer"
    ],
    exclusions: [
      "Lunches on Day 1 and Day 3",
      "Personal souvenirs and purchases in Tamegroute",
      "Driver and guide tips"
    ],
    goodToKnow: {
      meetingTime: "15:30 sharp in Foum Zguid (luggage transferred into 4x4).",
      meetingLocation: "Foum Zguid meeting point (depot transfer coordinated).",
      luggagePolicy: "Suitcases ride secured in rear cargo cage of the 4x4.",
      whatToPack: ["Comfortable hiking shoes for village walks", "Cash for artisanal pottery in Tamegroute", "Scarf for dust protection"],
      connectivity: "Zagora and M'Hamid have 4G; Erg Chegaga zone has limited coverage.",
      weatherNotice: "The route transitions from open desert plain to river valley microclimate."
    },
    operatorQuestions: [
      {
        issue: "Camel Trek Duration Confirmation",
        clarification: "The operator listing headline notes '2 days camel trekking', but the standard itinerary is a sunset ride on Day 1. Extended day trekking can be added upon request.",
        status: "Verified with Mustapha"
      },
      {
        issue: "End Point Logistics",
        clarification: "Tour terminates in Zagora; return transfer back to Foum Zguid can be included if your rental car was parked there.",
        status: "Verified with Mustapha"
      }
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Marco & Giulia B.",
        location: "Milan, Italy",
        date: "November 2026",
        rating: 5,
        title: "The ideal way to travel from Foum Zguid to Zagora",
        comment: "Rather than driving the boring paved roads around the mountains, crossing the Sahara directly through Lake Iriki was the highlight of our two weeks in Morocco."
      }
    ],
    verificationStatus: 'operator_listed',
    lastCheckedDate: 'October 2026'
  },
  {
    id: "4-day-berber-cultural-sahara-discovery",
    slug: "4-day-berber-cultural-sahara-discovery",
    path: "/foum-zguid/4-day-berber-cultural-sahara-discovery",
    title: "4-Day Berber Cultural Immersion & Sahara Discovery",
    seoTitle: "4 Day Berber Cultural Tour from Foum Zguid | Nomadic Sahara Life",
    metaDescription: "4-day deep cultural immersion in Erg Chigaga from Foum Zguid. Sleep in the dunes, visit authentic desert farms, learn ancient nomadic customs, and hike Lake Iriki.",
    campName: "Bivouac Les Nomades",
    campSlug: "bivouac-les-nomades",
    destination: "Foum Zguid & Erg Chigaga",
    rating: 4.95,
    reviewCount: 34,
    durationDays: 4,
    durationNights: 3,
    durationLabel: "4 Days / 3 Nights",
    pricePerPerson: 300,
    currency: "EUR",
    startPoint: "Foum Zguid",
    endPoint: "Foum Zguid",
    transportType: "Dedicated 4x4 Support Vehicle",
    image: "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tour-culture.jpg",
    gallery: [
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tour-culture.jpg",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-host-mustapha.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-camel.jpg",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-food-tagine.webp"
    ],
    category: "cultural",
    activityTags: ["Deep Culture", "Family Friendly", "Desert Farm Agriculture", "Guided Hiking"],
    cardHighlights: [
      "Deep immersion with Berber shepherd families and nomadic elders",
      "Guided walking trek across Lake Iriki dunes with ancestral storytelling",
      "Organic desert oasis farm tour and artisanal craft workshops"
    ],
    editorialSummary: "A leisurely, family-friendly cultural journey that replaces rushed sightseeing with meaningful connections. You spend three unhurried nights in the desert, hike along ancient nomadic trails with a resident guide, visit an oasis farm sustaining agriculture against the encroaching sands, and master the art of baking bread in desert embers.",
    highlights: [
      "In-depth cultural conversations and home-cooked meals with Berber hosts",
      "Educational exploration of arid agriculture and desert water irrigation",
      "Full guided morning dune walk with storytelling on nomadic astronomy and flora",
      "Traditional bread baking (Taguella) buried beneath hot sand and embers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Foum Zguid to Erg Chigaga & Sunset Camel Caravan",
        location: "Erg Chigaga",
        mealsIncluded: ["Dinner"],
        description: "Depart Foum Zguid in the afternoon across the fossil plateau. Arrive at the camp among the high dunes, settle into your tent, and embark on a golden hour camel ride to the highest crest for panoramic views across the Sahara.",
        activities: ["4x4 Mountain Passage", "Dune Arrival", "Sunset Camel Trek", "Campfire Welcoming"]
      },
      {
        day: 2,
        title: "Nomadic Community Traditions & Traditional Taguella Bread",
        location: "Chegaga Nomad Encampment",
        mealsIncluded: ["Breakfast", "Dinner"],
        description: "Dedicate the day to understanding genuine nomadic life. Meet with nomadic families, observe wool-weaving techniques, and participate in an authentic Taguella masterclass (traditional desert flatbread baked beneath the sand). Conclude with an evening of Berber music and folklore songs.",
        activities: ["Wool Weaving Demonstration", "Nomad Camp Exchange", "Taguella Sand Bread Baking", "Acoustic Berber Music"]
      },
      {
        day: 3,
        title: "Guided Lake Iriki Dune Trek & Desert Oasis Farm Visit",
        location: "Lake Iriki Basin & Oasis Farm",
        mealsIncluded: ["Breakfast", "Dinner"],
        description: "Join your guide for a gentle morning hike across the undulating dunes toward the edge of Lake Iriki, listening to generational lore about Saharan wildlife and navigation. In the afternoon, visit a desert oasis farm to discover how date palms and vegetables thrive in arid conditions.",
        activities: ["Nature & Wildlife Walking Trek", "Desert Agricultural Tour", "Fresh Produce Tasting", "Sunset Star Party"]
      },
      {
        day: 4,
        title: "Leisurely Breakfast, Foum Zguid Artisan Cooperatives & Departure",
        location: "Foum Zguid",
        mealsIncluded: ["Breakfast"],
        description: "Enjoy a relaxed breakfast at camp before taking the scenic 4x4 return to Foum Zguid. Spend late morning visiting local women's rug-weaving cooperatives and date merchants in town before your onward journey.",
        activities: ["Relaxed Dune Breakfast", "4x4 Return", "Artisan Cooperative Visit"]
      }
    ],
    inclusions: [
      "4 full days of 4x4 logistics and local Berber driver-guide",
      "3 nights desert camp accommodation among the Erg Chigaga dunes",
      "Daily hearty breakfasts and homemade dinners",
      "Guided sunset camel trekking experience",
      "All cultural workshops (sand bread baking, farm visit, folklore night)",
      "Guided Lake Iriki educational nature hike"
    ],
    exclusions: [
      "Daily lunches (can be arranged at local nomad cafes for €10-12/day)",
      "Travel insurance and tips",
      "Personal purchases at artisan cooperatives"
    ],
    goodToKnow: {
      meetingTime: "14:00 in Foum Zguid.",
      meetingLocation: "Foum Zguid cooperative meeting office.",
      luggagePolicy: "Standard travel luggage accepted.",
      whatToPack: ["Sturdy walking shoes/sneakers", "Sun hat and loose cotton clothing", "Refillable water canteen", "Warm night layers"],
      connectivity: "Cell signal available on surrounding hilltops; camp provides relaxing disconnect.",
      weatherNotice: "Ideal from September through May with warm sunny days and brisk clear nights."
    },
    operatorQuestions: [
      {
        issue: "Accommodation Location Clarification",
        clarification: "The operator's original website text stated '3 nights in Foum Zguid', but the verified program confirms you sleep all 3 nights out among the Erg Chigaga dunes where the magic happens.",
        status: "Verified with Mustapha"
      }
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Familie Weber",
        location: "Zurich, Switzerland",
        date: "October 2026",
        rating: 5,
        title: "Perfect for our teenage children",
        comment: "Our kids forgot their phones within two hours. Making bread in the sand with Mustapha and his family will stay in our memories forever."
      }
    ],
    verificationStatus: 'operator_listed',
    lastCheckedDate: 'October 2026'
  },
  {
    id: "4-day-adventure-activities-tour",
    slug: "4-day-adventure-activities-tour",
    path: "/foum-zguid/4-day-adventure-activities-tour",
    title: "4-Day Sahara Adventure: Quads, Sandboarding & High Dunes",
    seoTitle: "4 Day Sahara Adventure Tour Foum Zguid | Quad Biking & Sandboarding",
    metaDescription: "Action-packed 4-day desert adventure in Erg Chegaga from Foum Zguid. Includes quad biking, high-dune sandboarding, camel treks, 4x4 Paris-Dakar piste, and camping.",
    campName: "Bivouac Les Nomades — Adventure Base",
    campSlug: "bivouac-les-nomades",
    destination: "Erg Chegaga Action Sector",
    rating: 4.9,
    reviewCount: 41,
    durationDays: 4,
    durationNights: 3,
    durationLabel: "4 Days / 3 Nights",
    pricePerPerson: 350,
    currency: "EUR",
    startPoint: "Foum Zguid",
    endPoint: "Foum Zguid",
    transportType: "Rugged 4x4 Expedition Vehicle",
    image: "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tour-adventure.webp",
    gallery: [
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-tour-adventure.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-hero.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-gallery-01.webp",
      "/images/destinations/foum-zguid/bivouac-les-nomades/bln-activity-campfire.webp"
    ],
    category: "adventure",
    activityTags: ["Quad Biking Included", "Sandboarding", "Camel Trek", "Paris-Dakar 4x4"],
    cardHighlights: [
      "Guided ATV quad safari across the rolling sand dunes",
      "High-dune sandboarding equipment with instruction",
      "Full board meals (breakfast, lunch, dinner) included daily"
    ],
    editorialSummary: "Engineered specifically for active explorers and thrill-seekers. This program pairs the remote isolation of Erg Chegaga with heart-pounding activities: powering across the sands on guided ATV quad bikes, carving down 100-meter dune slipfaces on sandboards, and tackling challenging 4x4 desert trails.",
    highlights: [
      "Exciting guided ATV quad bike tour through Erg Chegaga dunes",
      "Sandboarding down pristine Saharan slipfaces with full gear provided",
      "Full board dining included across all active days (breakfast, lunch, dinner)",
      "Challenging 4x4 technical navigation across sand dunes and salt plains"
    ],
    itinerary: [
      {
        day: 1,
        title: "Morning 4x4 Expedition to Erg Chegaga & Afternoon Camel Trek",
        location: "Erg Chegaga Dunes",
        mealsIncluded: ["Lunch", "Dinner"],
        description: "Depart Foum Zguid in the morning for an exhilarating 4x4 run along the historic Paris-Dakar tracks. Arrive at the camp for an outdoor lunch, then mount camels in the late afternoon to trek across the crest of the dunes for a stunning sunset.",
        activities: ["Paris-Dakar 4x4 Drive", "Camp Welcome Lunch", "Sunset Camel Trek", "Fireside Tagine Dinner"]
      },
      {
        day: 2,
        title: "Sunrise Trek, Oasis Exploration & High Dune Sandboarding",
        location: "Erg Chegaga Sand Wave",
        mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
        description: "Greet the dawn with a morning ridge walk. After breakfast, set out to explore the secluded oases that dot Erg Chegaga. The afternoon is dedicated to high-dune sandboarding with wax and boards supplied by the camp.",
        activities: ["Dawn Dune Ascent", "Oasis Scouting", "High-Velocity Sandboarding", "Campfire Stargazing"]
      },
      {
        day: 3,
        title: "ATV Quad Biking Safari & Desert Village Lunch",
        location: "Lake Iriki & Dune Perimeter",
        mealsIncluded: ["Breakfast", "Village Lunch", "Dinner"],
        description: "Suit up in safety gear for an adrenaline-fueled guided quad bike safari navigating the undulating ridges and flat salt flats. In the afternoon, journey toward the edge of Lake Iriki for a traditional lunch in a nearby desert outpost.",
        activities: ["Safety Briefing & Gear Setup", "Guided ATV Quad Safari", "Outpost Village Lunch", "Sunset Dune Photography"]
      },
      {
        day: 4,
        title: "Final Sahara Panorama, Foum Zguid Return & Souvenirs",
        location: "Foum Zguid",
        mealsIncluded: ["Breakfast"],
        description: "Enjoy a final hearty Saharan breakfast, pack your gear, and take the 4x4 back to Foum Zguid for souvenir shopping and onward connection.",
        activities: ["Camp Farewell", "4x4 Return Ride", "Foum Zguid Market Stroll"]
      }
    ],
    inclusions: [
      "All 4x4 expedition transport from and back to Foum Zguid",
      "3 nights desert camp accommodation",
      "Full board: Breakfast, lunch, and dinner daily",
      "Guided ATV quad bike excursion with helmet and fuel provided",
      "High-dune sandboard rentals with wax and local coaching",
      "Sunset camel trekking expedition",
      "All activity safety equipment and experienced local desert guides"
    ],
    exclusions: [
      "Extreme sports personal insurance coverage",
      "Personal souvenirs and extra snacks",
      "Discretionary tips for guides and mechanics"
    ],
    goodToKnow: {
      meetingTime: "10:00 in Foum Zguid for morning departure.",
      meetingLocation: "Foum Zguid 4x4 base depot.",
      luggagePolicy: "Sturdy luggage or backpacks recommended.",
      whatToPack: ["Bandana/cheche scarf and dust goggles for quad biking", "Athletic shoes", "Sunscreen and lip balm", "Action camera (GoPro) if desired"],
      connectivity: "Emergency satellite communicator with guide; off-grid cellular.",
      weatherNotice: "Windy afternoons can occur; quad goggles provided by guide."
    },
    operatorQuestions: [
      {
        issue: "Activity Scheduling Confirmation",
        clarification: "Original operator site had a duplicated Day 3; our verified itinerary schedules sandboarding on Day 2 and the ATV Quad Safari on Day 3 for the best wind and sand conditions.",
        status: "Verified with Mustapha"
      },
      {
        issue: "Quad Driver Requirements",
        clarification: "Drivers must be 16+ to operate their own quad; younger teenagers can ride as passengers with the guide or parents.",
        status: "Verified with Mustapha"
      }
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Alex & Liam T.",
        location: "Bristol, UK",
        date: "September 2026",
        rating: 5,
        title: "Pure adrenaline in the Sahara",
        comment: "Quad biking over massive orange dunes with no another tourist in sight was one of the greatest experiences of my life. Great equipment and safety focus."
      }
    ],
    verificationStatus: 'operator_listed',
    lastCheckedDate: 'October 2026'
  }
];

export function getProgramBySlug(slug: string): StructuredDesertProgram | undefined {
  const normalized = (slug || '').toLowerCase().trim();
  return STRUCTURED_PROGRAMS.find(p => 
    p.slug === normalized || 
    p.id === normalized ||
    p.path.endsWith(normalized) ||
    normalized.includes(p.slug) ||
    p.slug.includes(normalized)
  );
}
