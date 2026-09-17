export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'EGP';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  rateFromEUR: number; // 1 EUR in this currency
}

export type TripCategory = 'all' | 'Hurghada' | 'Sea' | 'Desert' | 'Luxor' | 'Cairo';

export interface TripItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface Trip {
  id: string;
  title: string;
  category: 'Hurghada' | 'Sea' | 'Desert' | 'Luxor' | 'Cairo';
  priceEUR: number;
  duration: string;
  badge?: 'Popular' | 'New' | 'Top Rated' | 'Best Seller';
  shortDesc: string;
  fullDesc: string;
  image: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TripItineraryItem[];
  suitableFor: string;
  pickupInfo: string;
}

export interface Review {
  id: string;
  author: string;
  country: string;
  countryCode: string;
  flag: string;
  platform: 'TripAdvisor' | 'Google' | 'GetYourGuide';
  rating: number;
  date: string;
  comment: string;
  avatarText?: string;
  avatarImg?: string;
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'island' | 'reef' | 'desert' | 'city' | 'marina';
  lat: number;
  lng: number;
  description: string;
  tripId?: string;
  image?: string;
  distance?: string;
  transitTime?: string;
  depthOrTerrain?: string;
  highlights?: string[];
  chartX?: number; // 0-100 percentage on regional map
  chartY?: number; // 0-100 percentage on regional map
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
