export interface TourData {
  slug: string;
  title: string;
  description: string;
  content: string;
  price: number;
  duration: string;
  destination: string;
  start_city: string;
}

export const tours: TourData[] = [
  {
    slug: "3-days-from-marrakech-to-merzouga",
    title: "3-Day Private Desert Safari from Marrakech to Merzouga",
    description: "Embark on an unforgettable journey from the Red City of Marrakech to the golden dunes of Erg Chebbi in Merzouga. Stay in a luxury desert camp and witness the magic of the Sahara.",
    duration: "3 Days",
    price: 450,
    destination: "merzouga",
    start_city: "Marrakech",
    content: `
      Your 3-day adventure begins in Marrakech, crossing the majestic High Atlas Mountains via the Tizi n'Tichka pass. You'll explore the UNESCO World Heritage site of Ait Ben Haddou, the gateway to the Sahara. 
      On the second day, we travel through the Valley of the Roses and the Dades Gorges before reaching the mesmerizing dunes of Merzouga. 
      The highlight of the tour is a camel trek into the heart of the Erg Chebbi dunes to reach your luxury camp. Enjoy a traditional Berber dinner under a canopy of stars, accompanied by local music. 
      The third day brings you back across the varied landscapes of Morocco, returning to Marrakech with memories that will last a lifetime. 
      This private tour ensures safety, comfort, and an authentic Moroccan experience.
    `
  },
  {
    slug: "2-days-from-ouarzazate-to-zagora",
    title: "2-Day Desert Escape from Ouarzazate to Zagora",
    description: "Short on time? Experience the beauty of the Draa Valley and the Zagora desert on this 2-day escape from Ouarzazate.",
    duration: "2 Days",
    price: 220,
    destination: "zagora",
    start_city: "Ouarzazate",
    content: `
      Starting from the 'Hollywood of Morocco', Ouarzazate, this tour takes you through the lush Draa Valley, home to millions of date palms. 
      Zagora is known for its iconic 'Timbuktu 52 days' sign and its historical significance as a caravan hub. 
      You will stay in a traditional desert camp, experiencing the unique hospitality of the local nomads. 
      Zagora's dunes are rocky and atmospheric, offering a different vibe compared to the high sandy peaks of Merzouga. 
      Perfect for a quick weekend getaway or a short extension to your Moroccan itinerary.
    `
  },
  {
    slug: "agafay-luxury-sunset-glamping",
    title: "Agafay Luxury Sunset Glamping & Dinner",
    description: "Discover the rocky Agafay desert, just 45 minutes from Marrakech. Perfect for a luxurious evening of glamping and fine dining.",
    duration: "Overnight",
    price: 180,
    destination: "agafay",
    start_city: "Marrakech",
    content: `
      The Agafay desert is Morocco's 'hidden' gem, offering a desert experience without the long drive to the Sahara. 
      This tour focuses on relaxation and luxury. Arrive in the late afternoon to witness a spectacular sunset over the Atlas Mountains. 
      Enjoy a gourmet Moroccan meal in a glass-walled tent or under the open sky. 
      The camps in Agafay are among the most stylish in the country, featuring infinity pools and designer tents. 
      It's the ultimate romantic escape or a sophisticated way to experience the desert landscape in comfort.
    `
  }
];
