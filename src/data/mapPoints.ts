import { MapPoint } from '../types';

export const MAP_POINTS: MapPoint[] = [
  {
    id: 'marina',
    name: 'Hurghada Marina HQ',
    type: 'marina',
    lat: 27.2228,
    lng: 33.8423,
    description: 'EGY TOURS departure pier, luxury yachts dock, and briefing lounge.'
  },
  {
    id: 'orange-bay',
    name: 'Orange Bay (Giftun Island)',
    type: 'island',
    lat: 27.1895,
    lng: 33.9185,
    description: 'Turquoise shallow waters, wooden piers, and iconic sun parasols.',
    tripId: 'orange-bay'
  },
  {
    id: 'paradise-island',
    name: 'Paradise Island Beach',
    type: 'island',
    lat: 27.1950,
    lng: 33.9050,
    description: 'Egyptian Maldives with fine white coral sands and beach restaurant.',
    tripId: 'paradise-island'
  },
  {
    id: 'dolphin-house',
    name: 'Dolphin House (Shaab El Erg)',
    type: 'reef',
    lat: 27.3850,
    lng: 33.7800,
    description: 'Natural horseshoe coral reef where wild spinner dolphin pods congregate.',
    tripId: 'dolphin-house'
  },
  {
    id: 'abu-ramada',
    name: 'Shaab Abu Ramada (The Aquarium)',
    type: 'reef',
    lat: 27.1620,
    lng: 33.9850,
    description: 'Spectacular underwater coral drop-offs teeming with clownfish, rays, and sea turtles.',
    tripId: 'diving'
  },
  {
    id: 'desert-base',
    name: 'Eastern Desert Safari Camp',
    type: 'desert',
    lat: 27.1400,
    lng: 33.6800,
    description: 'ATV quad bike tracks, spider buggies, camel trails, and Bedouin evening tents.',
    tripId: 'super-safari'
  },
  {
    id: 'luxor-karnak',
    name: 'Luxor (Karnak & Kings Valley)',
    type: 'city',
    lat: 25.7188,
    lng: 32.6573,
    description: 'The monumental heart of Ancient Egypt along the Nile Valley.',
    tripId: 'luxor'
  },
  {
    id: 'cairo-pyramids',
    name: 'Giza Pyramids & Sphinx (Cairo)',
    type: 'city',
    lat: 29.9792,
    lng: 31.1342,
    description: 'The Great Pyramid of Khufu, Sphinx, and the grand Egyptian Museum.',
    tripId: 'pyramids'
  }
];
