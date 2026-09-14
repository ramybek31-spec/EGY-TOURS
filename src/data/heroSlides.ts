export interface HeroSlide {
  id: string;
  fileName: string;
  title: string;
  subtitle: string;
  category: string;
  highlight: string;
  badge: string;
  location: string;
  accentColor: string;
  fallbackUrl: string;
  description: string;
  whatsappPrompt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'nefertari-royal',
    fileName: 'nef3.webp',
    title: 'Nefertari Royal Salon',
    subtitle: 'Step into Pharaonic splendor with golden throne decor & underwater panoramic views',
    category: 'Sea & History Excursion',
    highlight: '👑 Royal Golden Salon & Coral Viewing',
    badge: 'Exclusive VIP',
    location: 'Hurghada Red Sea',
    accentColor: '#D4AF37',
    fallbackUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
    description: 'Ancient Egyptian royalty meets Red Sea underwater observation deck. Luxury pharaonic statues, gold carvings, and air-conditioned sub-sea lounge.',
    whatsappPrompt: 'Hello EGY TOURS! I would like to inquire about booking the Nefertari Royal VIP Lounge cruise.'
  },
  {
    id: 'vip-speedboat',
    fileName: 'speed3.webp',
    title: 'Private VIP Speedboat',
    subtitle: 'Glide across shallow crystal lagoons with private captain & custom island hopping',
    category: 'Private Marine Charter',
    highlight: '⚡ High-Speed Turquoise Lagoon Run',
    badge: 'Private Charter',
    location: 'Hurghada Archipelago',
    accentColor: '#5ce1e6',
    fallbackUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
    description: 'Custom private speed boat with sunshade canopy, luxury seating, and agile access to secluded sandbanks and shallow reefs.',
    whatsappPrompt: 'Hello EGY TOURS! I want to book a Private VIP Speedboat tour for my group.'
  },
  {
    id: 'paradise-island',
    fileName: 'paradise (2).jpeg',
    title: 'Paradise Island Sunset',
    subtitle: 'Golden hour tranquility at the iconic beach hammocks and wooden swing lounge',
    category: 'Island Escape',
    highlight: '🌅 Golden Hour Beach Swings',
    badge: 'Must Visit',
    location: 'Paradise Island, Giftun',
    accentColor: '#F59E0B',
    fallbackUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
    description: 'Hurghada’s world-famous beach haven. Bask under the sun, unwind in handwoven hammocks, and take memorable photos.',
    whatsappPrompt: 'Hello EGY TOURS! I would love to visit Paradise Island with hotel pickup.'
  },
  {
    id: 'pyramids-giza',
    fileName: 'pyramids.webp',
    title: 'Great Sphinx & Pyramids',
    subtitle: 'Behold the monumental Wonders of Giza with private Egyptologist guidance',
    category: 'Cultural Day Tour',
    highlight: '🏛️ 7 Wonders of the Ancient World',
    badge: 'UNESCO Heritage',
    location: 'Giza Plateau, Cairo',
    accentColor: '#D4AF37',
    fallbackUrl: 'https://images.unsplash.com/photo-1503177112294-7de59fb45731?auto=format&fit=crop&w=2000&q=85',
    description: 'Day tour from Hurghada to Cairo in executive Mercedes transport. Explore the Great Pyramid of Khufu, Sphinx, and the Grand Egyptian Museum.',
    whatsappPrompt: 'Hello EGY TOURS! I want to book the Day Tour to the Giza Pyramids and Sphinx.'
  },
  {
    id: 'bianka-serenity',
    fileName: 'BIANKA9.webp',
    title: 'Bianka Island Club',
    subtitle: 'Tulum & Mykonos bohemian vibes on Hurghada’s most exclusive private sandbank',
    category: 'Boho-Chic Island',
    highlight: '🏝️ Endless White Sands & DJ Lounge',
    badge: 'Trending Spot',
    location: 'Bianka Island, Red Sea',
    accentColor: '#38BDF8',
    fallbackUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
    description: 'Woven bamboo sunbeds, artisan mocktails, chilled lounge music, and swimming in shallow turquoise waters.',
    whatsappPrompt: 'Hello EGY TOURS! Please send details and booking info for Bianka Island.'
  },
  {
    id: 'dolphin-safari',
    fileName: 'D6.webp',
    title: 'Wild Dolphin House',
    subtitle: 'Swim alongside free-ranging pods of dolphins in protected coral reef lagoons',
    category: 'Marine Wildlife',
    highlight: '🐬 Natural Reef Dolphin Snorkeling',
    badge: '98% Encounter Rate',
    location: 'El Gouna & Hurghada Reefs',
    accentColor: '#0EA5E9',
    fallbackUrl: 'https://images.unsplash.com/photo-1570700276685-6e5454659f8a?auto=format&fit=crop&w=2000&q=85',
    description: 'An unforgettable encounter with spinner and bottlenose dolphins in their natural marine sanctuary with certified guides.',
    whatsappPrompt: 'Hello EGY TOURS! I would like to book the Dolphin House Snorkeling trip.'
  },
  {
    id: 'bianka-carriage',
    fileName: 'BIANKA2.webp',
    title: 'Fairytale Beach Carriage',
    subtitle: 'Romantic fairytale moments on ornate white carriage over pristine sands',
    category: 'Photo & Romance Spot',
    highlight: '✨ Fairytale White Beach Carriage',
    badge: 'Photo Favorite',
    location: 'Bianka Beach, Red Sea',
    accentColor: '#F472B6',
    fallbackUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
    description: 'Iconic ornate carriage installation perched directly on the shoreline, perfect for honeymoons, couples, and instagram memories.',
    whatsappPrompt: 'Hello EGY TOURS! I would love to visit the photo spots on Bianka Island.'
  },
  {
    id: 'super-quad-safari',
    fileName: 'supsaf3.webp',
    title: 'Super Quad Safari Caravan',
    subtitle: 'Conquer the majestic Eastern Saharan dunes on powerful ATV quad bikes',
    category: 'Desert Adventure',
    highlight: '🏍️ Adrenaline ATV Dune Caravan',
    badge: 'Action Packed',
    location: 'Eastern Desert, Hurghada',
    accentColor: '#FB923C',
    fallbackUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85',
    description: 'Convoy across golden sands, conquer desert mountain tracks, visit an authentic Bedouin camp, and enjoy hot herbal tea at sunset.',
    whatsappPrompt: 'Hello EGY TOURS! I want to book the Super Quad Desert Safari with Bedouin dinner.'
  },
  {
    id: 'cleopatra-spa',
    fileName: 'spa.jpg',
    title: 'Cleopatra VIP Spa & Hammam',
    subtitle: 'Warm heated marble, aromatic foam peeling & restorative coconut massage',
    category: 'Luxury Wellness',
    highlight: '🧖‍♀️ Heated Marble Hammam & Scrub',
    badge: 'Pure Relax',
    location: 'Hurghada Luxury Spa Center',
    accentColor: '#A855F7',
    fallbackUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
    description: 'Traditional Turkish and Moroccan ritual with heated marble slabs, cleansing black soap scrub, sauna, steam room, and full-body massage.',
    whatsappPrompt: 'Hello EGY TOURS! I would like to book a VIP Cleopatra Hammam & Spa session.'
  },
  {
    id: 'bianka-hammock',
    fileName: 'BIANKA1.webp',
    title: 'Lagoon Hammock Retreat',
    subtitle: 'Drift away suspended over calm waters with uninterrupted panoramic sea views',
    category: 'Beach Relaxation',
    highlight: '🌊 Overwater Net Hammocks',
    badge: 'Chilled Atmosphere',
    location: 'Bianka Island, Hurghada',
    accentColor: '#2DD4BF',
    fallbackUrl: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2000&q=85',
    description: 'Relax in open-air woven hammocks suspended above the crystal waters as warm sea breezes blow across the lagoon.',
    whatsappPrompt: 'Hello EGY TOURS! I want to reserve a day pass to Bianka Island hammocks.'
  },
  {
    id: 'vip-bus-fleet',
    fileName: 'EGY-TOURS-VIP-Bus-Mockup.jpg',
    title: 'EGY TOURS VIP Coach Fleet',
    subtitle: 'First-class Mercedes touring coaches with luxury recliners, onboard Wi-Fi & hostess',
    category: 'Luxury Transportation',
    highlight: '🚌 5-Star Mercedes Executive Coach',
    badge: 'First Class Travel',
    location: 'Cairo, Luxor & Hurghada',
    accentColor: '#D4AF37',
    fallbackUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2000&q=85',
    description: 'Our proprietary deep-blue VIP Mercedes coaches feature reclining leather seats, individual USB power, air-conditioning, and dedicated tour hostesses.',
    whatsappPrompt: 'Hello EGY TOURS! I am inquiring about your VIP bus excursions to Cairo & Luxor.'
  }
];
