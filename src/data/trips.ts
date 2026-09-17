import { Trip } from '../types';

export const TRIPS_DATA: Trip[] = [
  {
    id: 'orange-bay',
    title: 'Orange Bay Premium Island',
    category: 'Hurghada',
    priceEUR: 30,
    duration: '8 hours',
    badge: 'Popular',
    shortDesc: 'Paradise on earth! Relax under iconic orange parasols in turquoise lagoons. Snorkeling & buffet lunch included.',
    fullDesc: 'Escape to the world-famous Orange Bay on Giftun Island. Renowned for its powdery white sands, shallow turquoise lagoon, and signature orange umbrellas, this tour offers the quintessential Red Sea day. Sail on a luxury yacht, snorkel at vibrant coral reefs, and savor a freshly prepared onboard open-buffet lunch.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 384,
    highlights: [
      '2.5 hours relaxed free time on the iconic Orange Bay beach',
      '2 guided snorkeling stops at pristine coral reefs',
      'Delicious hot seafood & BBQ buffet lunch onboard',
      'Water sports fun: Banana boat & Quadra water sofa ride'
    ],
    inclusions: [
      'Round-trip hotel pickup and drop-off in Hurghada',
      'Snorkeling equipment (mask, snorkel, fins, life vest)',
      'Professional certified snorkeling guides',
      'Buffet lunch + unlimited soft drinks, mineral water, coffee & tea',
      'National Park entry fees'
    ],
    exclusions: [
      'Personal photo and video album from boat cameraman',
      'Transfers from El Gouna / Makadi / Sahl Hasheesh (€5 surcharge)'
    ],
    itinerary: [
      { time: '08:00', title: 'Hotel Pickup', description: 'Air-conditioned vehicle picks you up from your hotel lobby.' },
      { time: '09:00', title: 'Marina Departure', description: 'Board the luxury motor yacht and safety briefing by our PADI crew.' },
      { time: '10:30', title: 'First Snorkeling Stop', description: 'Explore coral pinnacles teeming with clownfish, rays, and angelfish.' },
      { time: '12:00', title: 'Orange Bay Island Landing', description: 'Disembark onto the wooden boardwalks and crystal lagoons of Orange Bay.' },
      { time: '14:30', title: 'Open Buffet Lunch', description: 'Freshly prepared grilled fish, chicken, rice, salads, and seasonal fruits.' },
      { time: '15:30', title: 'Water Sports & Second Reef', description: 'Exciting banana boat ride and second reef snorkel session.' },
      { time: '16:30', title: 'Return to Marina & Hotel', description: 'Cruise back into Hurghada Marina with sunset panoramic views.' }
    ],
    suitableFor: 'Couples, families, snorkelers, beach lovers of all ages',
    pickupInfo: 'Pickup from all Hurghada hotels included at 07:45–08:30 depending on hotel location.'
  },
  {
    id: 'ozaria-island',
    title: 'Ozaria Island VIP Excursion',
    category: 'Hurghada',
    priceEUR: 55,
    duration: '8 hours',
    badge: 'Top Rated',
    shortDesc: 'Experience paradise at Ozaria Island! This premium excursion takes you to the Red Sea’s most stunning turquoise lagoon.',
    fullDesc: 'Ozaria Island represents the newest standard of luxury island hopping in Hurghada. Enjoy VIP shaded sun loungers, an uncrowded atmosphere, crystal clear waters ideal for swimming and photo shoots, coupled with an elevated dining menu and premium yacht service.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewsCount: 142,
    highlights: [
      'Exclusive private island club setup with VIP cabanas',
      'Secluded pristine coral garden with crystal water visibility',
      'Gourmet barbecue lunch & fresh tropical fruit platters',
      'Complimentary professional photo session on arrival'
    ],
    inclusions: [
      'VIP hotel transfer in high-grade air-conditioned coach',
      'Private island sunbed & umbrella reservation',
      'All snorkeling gear and life vests',
      'Deluxe buffet lunch & cold refreshments',
      'Marine conservation taxes'
    ],
    exclusions: ['Motorized water sports (jet ski)', 'Alcoholic beverages'],
    itinerary: [
      { time: '08:30', title: 'Hotel Transfer', description: 'Smooth pickup from your resort.' },
      { time: '09:30', title: 'Yacht Cruising', description: 'Scenic sail across the Red Sea straits.' },
      { time: '11:00', title: 'Ozaria Island VIP Beach', description: 'Relax, swim in turquoise shallow waters, and enjoy beach games.' },
      { time: '13:30', title: 'Gourmet Chef Lunch', description: 'Cooked fresh on the yacht or island pavilion.' },
      { time: '15:00', title: 'Coral Snorkeling Safari', description: 'Guided swim along deep reef walls.' },
      { time: '16:30', title: 'Return to Hotel', description: 'Comfortable drop-off back at your resort.' }
    ],
    suitableFor: 'Couples, honeymooners, luxury seekers',
    pickupInfo: 'Daily pickups starting 08:15 AM.'
  },
  {
    id: 'paradise-island',
    title: 'Paradise Island (Egyptian Maldives)',
    category: 'Hurghada',
    priceEUR: 65,
    duration: '8 hours',
    badge: 'Popular',
    shortDesc: 'Magical boat trip to Paradise Island — white sands, turquoise lagoons, snorkeling, and island relaxation.',
    fullDesc: 'Commonly dubbed the "Egyptian Maldives", Paradise Island is celebrated for its powder-soft white sand and translucent waters that stretch into the horizon. Features bamboo gazebos, an island restaurant, live oriental entertainment, and breathtaking reef walls.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 290,
    highlights: [
      'Direct landing on Paradise Island white sand beach',
      'Spectacular coral reef snorkeling with turtles and exotic fish',
      'Island lunch buffet with cold refreshments',
      'Folklore Tanoura and Belly Dance show on the beach'
    ],
    inclusions: [
      'Roundtrip hotel transfers',
      'Boat cruise with shaded deck and sun loungers',
      'Full snorkeling equipment',
      'Island entry ticket and umbrella use',
      'Buffet lunch and all-day soft drinks'
    ],
    exclusions: ['Imported drinks', 'Gratuities for crew'],
    itinerary: [
      { time: '08:15', title: 'Pickup & Boarding', description: 'Transfer to boat jetty.' },
      { time: '09:30', title: 'First Snorkeling Reef', description: 'Snorkel at Shaab Sabina reef.' },
      { time: '11:30', title: 'Paradise Island Beach', description: 'Stay on the island, relax, swim, and watch folklore performance.' },
      { time: '14:00', title: 'Island Lunch', description: 'Buffet lunch served in island shaded restaurant.' },
      { time: '15:30', title: 'Second Snorkel Stop & Return', description: 'Sail back towards marina.' }
    ],
    suitableFor: 'Families with children, couples, groups',
    pickupInfo: 'Hurghada hotel pickups from 08:00 AM.'
  },
  {
    id: 'dolphin-house',
    title: 'Dolphin House Eco Adventure',
    category: 'Sea',
    priceEUR: 25,
    duration: '7 hours',
    badge: 'Popular',
    shortDesc: 'Swim with wild dolphins in their natural Red Sea habitat. Eco-certified, PADI-guided snorkeling.',
    fullDesc: 'Head to the famous Shaab El Erg horseshoe reef, renowned as the natural gathering sanctuary for pods of wild spinner and bottlenose dolphins. With a 90%+ sighting rate, you have the rare opportunity to observe and respectfully snorkel alongside these joyful creatures in open sea.',
    image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 512,
    highlights: [
      'High success probability to swim near wild dolphin pods',
      '2 extensive snorkeling stops at protected outer reefs',
      'Eco-friendly practices respecting marine wildlife welfare',
      'Water sports inflatables (banana boat & crazy eight)'
    ],
    inclusions: [
      'Hotel pickup & drop-off',
      'Experienced marine naturalist snorkel guide',
      'Masks, fins, life jackets',
      'Open buffet lunch on yacht + hot and cold drinks',
      'Marine conservation taxes'
    ],
    exclusions: ['Wetsuit rental during winter (€5 optional)'],
    itinerary: [
      { time: '07:45', title: 'Morning Pickup', description: 'Early departure to maximize dolphin activity.' },
      { time: '08:45', title: 'Sail to Shaab El Erg', description: '1-hour cruise into the open Red Sea.' },
      { time: '10:00', title: 'Dolphin Encounter', description: 'Observe dolphins swimming and playing; slip into water quietly with guides.' },
      { time: '12:30', title: 'Fresh Yacht Lunch', description: 'Hot buffet served on shaded salon.' },
      { time: '13:45', title: 'Reef Garden Snorkel', description: 'Second stop over kaleidoscopic corals.' },
      { time: '15:30', title: 'Return Journey', description: 'Cruise back into port.' }
    ],
    suitableFor: 'Animal lovers, swimmers, families with kids',
    pickupInfo: 'Early pickup between 07:30 and 08:00 AM.'
  },
  {
    id: 'super-safari',
    title: 'Super Safari Saharan Trek',
    category: 'Desert',
    priceEUR: 35,
    duration: '7 hours',
    badge: 'Popular',
    shortDesc: 'Quad biking, camel riding, Bedouin village visit, and authentic BBQ dinner under the stars.',
    fullDesc: 'Experience the raw adrenaline and mystic culture of the Eastern Egyptian Desert. Drive your own 250cc ATV quad bike across rolling sand dunes, speed across mountain passes in a spider buggy, ride a camel, visit a secluded Bedouin camp, and feast under starry desert skies with oriental belly dancing and tanoura fire shows.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 460,
    highlights: [
      '45-minute quad bike driving through desert dunes',
      '20-minute spider buggy trail drive',
      '4x4 Land Cruiser desert dune bashing',
      'Traditional camel trek & Bedouin herbal tea',
      'Barbecue dinner & folkloric fire/belly dance show'
    ],
    inclusions: [
      'Pick up and drop off in 4WD Jeep directly from hotel',
      'Quad bike and buggy usage with safety helmets',
      'Bedouin village tour & traditional bread making demonstration',
      'Open BBQ dinner with soft drinks and mineral water',
      'Evening oriental entertainment show'
    ],
    exclusions: ['Desert scarf (shemagh) & protective goggles (€3 each or bring your own)'],
    itinerary: [
      { time: '13:00', title: 'Jeep Safari Pickup', description: '4x4 Jeep picks you up and heads into desert mountains.' },
      { time: '14:00', title: 'Quad Biking Base', description: 'Test-drive briefing and 45-minute thrilling desert quad trek.' },
      { time: '15:15', title: 'Spider Buggy Drive', description: 'Fast-paced buggy driving on open flats.' },
      { time: '16:00', title: 'Bedouin Village Journey', description: 'Drive deeper into the mountains to an authentic Bedouin settlement.' },
      { time: '17:00', title: 'Camel Ride & Sunset', description: 'Watch the sun sink behind dramatic jagged granite peaks.' },
      { time: '18:30', title: 'Dinner & Fire Show', description: 'Barbecue buffet, traditional music, and fire spinner show.' },
      { time: '19:45', title: 'Return Transfer', description: 'Drop-off at your hotel around 20:30.' }
    ],
    suitableFor: 'Adventure seekers, photographers, teens and adults',
    pickupInfo: 'Hotel pickup around 12:30–13:15 PM.'
  },
  {
    id: 'diving',
    title: 'Red Sea Discovery Dive (Intro & PADI)',
    category: 'Sea',
    priceEUR: 35,
    duration: '7 hours',
    badge: 'Top Rated',
    shortDesc: 'PADI-certified scuba diving for beginners. Explore Red Sea coral gardens with 1-on-1 expert guidance.',
    fullDesc: 'Hurghada possesses some of the warmest, clearest waters on the planet with visibility often exceeding 30 meters. This introductory scuba experience requires no previous certification. Your personal PADI instructor guides you 1-on-1 underwater up to 7-10 meters depth, making you feel completely secure as you glide through coral pinnacles.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewsCount: 310,
    highlights: [
      '2 separate introductory dives at 2 distinct reef dive sites',
      '1-on-1 direct instructor supervision throughout underwater time',
      'Full modern Scubapro / Cressi dive equipment included',
      'Buffet lunch on dive yacht + unlimited drinks'
    ],
    inclusions: [
      'Hotel pickup and drop-off',
      'All diving gear: tank, BCD, regulator, wetsuit, weights, mask, fins',
      'PADI Master Diver / Instructor guidance',
      'Freshly cooked onboard lunch and hot/cold drinks'
    ],
    exclusions: ['Underwater photography package'],
    itinerary: [
      { time: '08:00', title: 'Pickup & Harbour Departure', description: 'Depart from the diving center marina.' },
      { time: '09:00', title: 'Comprehensive Dive Briefing', description: 'Learn equalization, regulator clearing, and hand signals.' },
      { time: '10:30', title: 'First Dive Session', description: 'Submerge 20–25 minutes at gentle shallow reef.' },
      { time: '12:30', title: 'Lunch & Surface Interval', description: 'Sunbathe on top deck and enjoy lunch.' },
      { time: '14:00', title: 'Second Dive Session', description: 'Explore deeper coral wall with moray eels and lionfish.' },
      { time: '16:00', title: 'Return to Marina', description: 'Logbook sign-off and hotel drop-off.' }
    ],
    suitableFor: 'First-time divers, certified divers, confident swimmers aged 10+',
    pickupInfo: 'Hotel pickup around 07:45–08:15 AM.'
  },
  {
    id: 'pyramids',
    title: 'Giza Pyramids & Cairo Discovery',
    category: 'Cairo',
    priceEUR: 90,
    duration: '16–18 hours',
    badge: 'Best Seller',
    shortDesc: 'Visit the Great Pyramids, Sphinx, and Egyptian Museum. Expert Egyptologist guide included.',
    fullDesc: 'Witness the sole surviving Wonder of the Ancient World in person. Travel from Hurghada to Cairo in a deluxe air-conditioned touring bus or private car. Stand before the Great Pyramid of Khufu, look into the eyes of the Great Sphinx of Giza, explore treasures inside the world-renowned Egyptian Museum, and stroll through historic Khan El Khalili bazaar.',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 620,
    highlights: [
      'Great Pyramids of Giza (Khufu, Khafre, Menkaure)',
      'The Great Sphinx and Valley Temple of Khafre',
      'Egyptian Antiquities Museum in Tahrir Square',
      'Egyptian restaurant lunch overlooking Cairo',
      'Licensed English/Multilingual Egyptologist guide'
    ],
    inclusions: [
      'Round-trip highway transport in luxury AC coach with security convoy',
      'All entrance fees to Giza Plateau & Egyptian Museum',
      'Professional certified Egyptologist guide',
      'Restaurant lunch in Cairo'
    ],
    exclusions: ['Entrance ticket inside the Great Pyramid burial chamber', 'Drinks at restaurant'],
    itinerary: [
      { time: '01:30', title: 'Overnight Hotel Departure', description: 'Comfortable night coach journey with scheduled rest stops.' },
      { time: '08:30', title: 'Arrival in Giza', description: 'Begin tour at the Giza Pyramid Plateau.' },
      { time: '11:30', title: 'The Great Sphinx', description: 'Close-up photography and history explanation at the Sphinx.' },
      { time: '13:00', title: 'Egyptian Lunch', description: 'Fresh grilled oriental cuisine.' },
      { time: '14:30', title: 'Egyptian Museum', description: 'Explore ancient sarcophagi, mummies, and gold artifacts.' },
      { time: '17:00', title: 'Return Journey', description: 'Relax on comfortable coach back to Hurghada (approx. 22:30 arrival).' }
    ],
    suitableFor: 'History enthusiasts, travelers seeking iconic world wonders',
    pickupInfo: 'Night departure around 01:30–02:00 AM.'
  },
  {
    id: 'luxor',
    title: 'Luxor Kings & Temples Day Tour',
    category: 'Luxor',
    priceEUR: 70,
    duration: '16 hours',
    badge: 'Popular',
    shortDesc: 'Discover the world’s largest open-air museum — Karnak Temple, Valley of the Kings, and the Nile.',
    fullDesc: 'Cross the Nile Valley into ancient Thebes. Luxor holds one third of the world’s greatest antiquities. Walk between the colossal 134 towering stone pillars of Karnak Temple, descend into underground painted tomb chambers of Pharaohs in the Valley of the Kings, behold Queen Hatshepsut’s terraced cliffside temple, and stand before the giant Colossi of Memnon.',
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 480,
    highlights: [
      'Karnak Temple Complex & Hypostyle Hall',
      'Valley of the Kings (entry to 3 pharaonic royal tombs)',
      'Mortuary Temple of Queen Hatshepsut at Deir el-Bahari',
      'Colossi of Memnon statues',
      'Scenic Nile River crossing in traditional motorboat'
    ],
    inclusions: [
      'Hotel pickup & drop-off in deluxe air-conditioned bus',
      'All entrance tickets to Karnak, Valley of the Kings, and Hatshepsut',
      'Expert licensed Egyptologist guide',
      'Full lunch buffet at Nile-view restaurant'
    ],
    exclusions: ['King Tutankhamun tomb special entry ticket (optional extra)', 'Drinks'],
    itinerary: [
      { time: '04:30', title: 'Early Morning Departure', description: 'Scenic drive through the Red Sea mountains into the fertile Nile basin.' },
      { time: '09:00', title: 'Karnak Temple Complex', description: 'Walk among giant obelisks, avenue of sphinxes, and sacred lake.' },
      { time: '12:00', title: 'Nile Crossing & Lunch', description: 'Cross the Nile to the West Bank and enjoy lunch.' },
      { time: '13:30', title: 'Valley of the Kings', description: 'Enter royal underground tomb chambers with original vivid hieroglyphs.' },
      { time: '15:30', title: 'Hatshepsut Temple & Colossi of Memnon', description: 'Admire the monumental 3-tier cliff sanctuary.' },
      { time: '17:00', title: 'Return Drive', description: 'Return to Hurghada by 21:00.' }
    ],
    suitableFor: 'Culture seekers, architectural fans, couples and families',
    pickupInfo: 'Early pickup around 04:30–05:00 AM.'
  },
  {
    id: 'island-bianka',
    title: 'Bianka Island Exclusive Escape',
    category: 'Hurghada',
    priceEUR: 65,
    duration: '8 hours',
    badge: 'New',
    shortDesc: 'Luxury boho-chic island with premium sunbeds and gourmet dining — Hurghada’s most exclusive escape.',
    fullDesc: 'Bianka Island brings Mykonos & Tulum boho vibes to the pristine waters of the Red Sea. Featuring handcrafted bamboo cabanas, woven daybeds, lounge DJ chillout music, artisan mocktails, and crystal clear swimming lagoons.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 95,
    highlights: [
      'Private boho-chic beach club setup',
      'Gourmet Mediterranean & seafood lunch buffet',
      'Complimentary welcome drinks & chilled towels',
      'Guided snorkel safari at adjacent reef barrier'
    ],
    inclusions: [
      'Hotel transfer in executive minivan',
      'Island entry & reserved luxury sunbed',
      'Snorkel gear & towels',
      'Lunch buffet & soft beverages'
    ],
    exclusions: ['Cocktails and premium spirits'],
    itinerary: [
      { time: '08:45', title: 'Hotel Departure', description: 'Private transfer to marina.' },
      { time: '09:45', title: 'Arrival at Bianka', description: 'Welcome drink and daybed check-in.' },
      { time: '13:00', title: 'Mediterranean Lunch', description: 'Fresh seafood, pasta, and grilled meats.' },
      { time: '14:30', title: 'Snorkeling Expedition', description: 'Reef swim with guide.' },
      { time: '16:30', title: 'Sunset Cruise Back', description: 'Return to Hurghada.' }
    ],
    suitableFor: 'Couples, friends, luxury lifestyle seekers',
    pickupInfo: 'Hotel pickup at 08:30 AM.'
  },
  {
    id: 'safari-stars',
    title: 'Safari Under the Stars & Astronomy',
    category: 'Desert',
    priceEUR: 45,
    duration: '5 hours',
    badge: 'New',
    shortDesc: 'Jeep safari into the Eastern Desert, stargazing with an astronomy guide, Bedouin dinner included.',
    fullDesc: 'Away from the city lights of Hurghada, the Saharan night sky displays an astonishing blanket of millions of stars, constellations, and the Milky Way. Travel by 4x4 into a secluded canyon, view Saturn’s rings and deep-space nebulae through high-powered telescopes guided by an astronomer, and enjoy a candlelit Bedouin dinner.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewsCount: 160,
    highlights: [
      'Professional computerized telescope observation',
      'Expert astronomer explaining planets, galaxies, and star signs',
      'Sunset dune photography session',
      'Candlelit Bedouin dinner & tea over campfires'
    ],
    inclusions: [
      '4x4 Land Cruiser hotel roundtrip',
      'Telescope viewing and astronomy presentation',
      'Full Bedouin dinner and hot herbal tea',
      'Star charts and guide'
    ],
    exclusions: ['Personal photos'],
    itinerary: [
      { time: '16:00', title: 'Afternoon Pickup', description: 'Jeep transfer into the desert.' },
      { time: '17:30', title: 'Sunset from Mountain Lookout', description: 'Watch colors change over the mountains.' },
      { time: '18:30', title: 'Bedouin Dinner & Fire', description: 'Dine in open-air desert camp.' },
      { time: '19:30', title: 'Telescope Stargazing', description: 'View moon craters, planets, and deep sky.' },
      { time: '21:00', title: 'Return Transfer', description: 'Back at hotel around 21:45.' }
    ],
    suitableFor: 'Couples, families with kids, stargazers',
    pickupInfo: 'Pickup from 15:30–16:15 PM.'
  },
  {
    id: 'parasailing',
    title: 'Parasailing Adventure Over the Red Sea',
    category: 'Sea',
    priceEUR: 20,
    duration: '2 hours',
    badge: 'Popular',
    shortDesc: 'Fly 60m above the Red Sea with certified instructors. Solo or tandem flights available.',
    fullDesc: 'Get a bird’s eye perspective of Hurghada, the coastline, and the turquoise coral reefs below. Take off and land directly from the custom hydraulic platform of our specialized speedboats. Absolutely safe, exhilarating, and completely dry takeoff and landing!',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewsCount: 220,
    highlights: [
      'Flight altitude 50–70 meters above sea level',
      '10–12 minutes pure aerial flight time',
      'Gentle hydraulic takeoff and landing directly on the boat deck',
      'Option for tandem (2 persons) or solo flight'
    ],
    inclusions: [
      'Hotel pickup & drop-off',
      'Speedboat transfer',
      'Parachute harness & life vest',
      'Certified flight captain & crew'
    ],
    exclusions: ['GoPro video package'],
    itinerary: [
      { time: 'Flexible', title: 'Hotel Pickup', description: 'Pickups available throughout the morning and afternoon.' },
      { time: '+30m', title: 'Speedboat Briefing', description: 'Board the parasail boat with small group.' },
      { time: '+45m', title: 'Flight Time', description: 'Ascend into the sky and enjoy 360° panoramic views.' },
      { time: '+1h 30m', title: 'Return Transfer', description: 'Back to your hotel.' }
    ],
    suitableFor: 'Ages 6+, couples, thrill seekers',
    pickupInfo: 'Flexible departure slots every 2 hours.'
  },
  {
    id: 'nefertari',
    title: 'Nefertari Luxury Semi-Submarine',
    category: 'Sea',
    priceEUR: 95,
    duration: '3 hours',
    badge: 'Top Rated',
    shortDesc: 'Underwater sightseeing from a luxury semi-submarine without getting wet. Perfect for families!',
    fullDesc: 'Modeled after ancient pharaonic royalty, the Nefertari features underwater viewing salons with panoramic glass windows 3 meters beneath the water surface. Gaze at vibrant coral gardens, sea turtles, and clownfish in air-conditioned comfort, followed by an optional snorkeling session.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewsCount: 175,
    highlights: [
      'Submerged observation deck with huge glass windows',
      'Air-conditioned comfort suitable for toddlers & seniors',
      'Snorkeling gear provided for those who want to jump in',
      'Royal pharaonic decor & friendly hospitality'
    ],
    inclusions: [
      'Hotel pickup and drop-off',
      'Submarine cruise ticket',
      'Soft drink and bottle of water',
      'Snorkeling stop with equipment'
    ],
    exclusions: ['Souvenirs'],
    itinerary: [
      { time: '09:30', title: 'Marina Departure', description: 'Sail towards protected marine reserves.' },
      { time: '10:00', title: 'Underwater Salon Observation', description: 'Fish feeding show in front of your viewing window.' },
      { time: '11:15', title: 'Snorkeling Stop', description: 'Hop in the water or relax on sun deck.' },
      { time: '12:30', title: 'Return to Marina', description: 'Drop-off at hotel.' }
    ],
    suitableFor: 'Families with young children, non-swimmers, seniors',
    pickupInfo: 'Daily departures at 09:00 AM and 14:00 PM.'
  }
];
