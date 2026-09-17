import React, { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  Star,
  Compass,
  ArrowRight,
  MessageCircle,
  Zap,
  Share2,
  Facebook,
  Check
} from 'lucide-react';
import { Trip, TripCategory, CurrencyCode } from '../types';
import { TRIPS_DATA } from '../data/trips';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';
import { TripDetailModal } from './TripDetailModal';
import { buildWhatsAppUrl, getTourInquiryMessage } from '../utils/whatsapp';

interface TripsSectionProps {
  currentLang: SupportedLanguage;
  currency: CurrencyCode;
  convertPrice: (eur: number) => { formatted: string; amount: number; symbol: string };
}

export const TripsSection: React.FC<TripsSectionProps> = ({
  currentLang,
  currency,
  convertPrice
}) => {
  const [selectedCat, setSelectedCat] = useState<TripCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [copiedTripId, setCopiedTripId] = useState<string | null>(null);

  const handleNativeShareTrip = async (
    trip: Trip,
    formattedPrice: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.egy-tour.com';
    const shareData = {
      title: `${trip.title} - EGY TOURS Egypt`,
      text: `Book ${trip.title} (${formattedPrice}) with EGY TOURS. VIP service, instant WhatsApp confirmation, 0% advance deposit!`,
      url: shareUrl
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(`${trip.title} (${formattedPrice}) - ${shareUrl}`);
        setCopiedTripId(trip.id);
        setTimeout(() => setCopiedTripId(null), 2500);
      }
    } catch (err) {
      console.warn('Clipboard failed:', err);
    }
  };

  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const categories: { id: TripCategory; label: string }[] = [
    { id: 'all', label: t('filter_all') },
    { id: 'Hurghada', label: t('filter_hurghada') },
    { id: 'Sea', label: t('filter_sea') },
    { id: 'Desert', label: t('filter_desert') },
    { id: 'Luxor', label: t('filter_luxor') },
    { id: 'Cairo', label: t('filter_cairo') }
  ];

  const filteredTrips = useMemo(() => {
    return TRIPS_DATA.filter((trip) => {
      const matchCat = selectedCat === 'all' || trip.category === selectedCat;
      const matchSearch =
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <section id="trips" className="py-14 sm:py-20 bg-[#0a0a0a] relative scroll-mt-16">
      <div id="trips-section" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="section-title">Our Tours & Excursions</h2>
          <span className="gold-line" />
          <p className="section-subtitle">
            Curated, hand-picked marine adventures, island getaways, desert safaris, and historical explorations.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6 sm:mb-8">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#141414] border border-[#D4AF37]/30 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[0.7rem] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  selectedCat === cat.id
                    ? 'bg-gradient-to-r from-[#9a761e] to-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold scale-105'
                    : 'bg-[#141414] border border-[#D4AF37]/25 text-zinc-300 hover:border-[#D4AF37] hover:text-[#FFD700]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#111111] border border-white/10 max-w-md mx-auto">
            <Compass className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-white mb-1">No Tours Found</h3>
            <p className="text-xs text-zinc-400 mb-4">{t('no_trips_found')}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCat('all');
                setSearchQuery('');
              }}
              className="btn-gold text-xs py-2 px-5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => {
              const priceInfo = convertPrice(trip.priceEUR);
              return (
                <article
                  key={trip.id}
                  className="flex flex-col rounded-2xl bg-[#121212] border border-[#D4AF37]/20 hover:border-[#D4AF37] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D4AF37]/15 group"
                >
                  {/* Card Image */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black"
                    onClick={() => setSelectedTrip(trip)}
                  >
                    <img
                      src={trip.image}
                      alt={trip.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />

                    {/* Category & Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFD700] text-[0.65rem] font-bold uppercase tracking-wider">
                        {trip.category}
                      </span>
                    </div>

                    {trip.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#9a761e] to-[#D4AF37] text-black text-[0.65rem] font-extrabold uppercase tracking-wider shadow-md">
                          {trip.badge}
                        </span>
                      </div>
                    )}

                    {/* Duration Pill at bottom-right of image */}
                    <div className="absolute bottom-2.5 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 text-zinc-300 text-[0.7rem] font-medium backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{trip.rating}</span>
                        <span className="text-zinc-500 font-normal">({trip.reviewsCount} reviews)</span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => setSelectedTrip(trip)}
                        className="font-heading text-lg font-bold text-white group-hover:text-[#FFD700] transition-colors leading-snug mb-2 cursor-pointer"
                      >
                        {trip.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                        {trip.shortDesc}
                      </p>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-[0.7rem] text-zinc-400 uppercase tracking-wider">
                          {t('from_price')}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-xl font-extrabold text-[#FFD700]">
                            {priceInfo.formatted}
                          </span>
                          <span className="text-[0.7rem] text-zinc-400">{t('per_person')}</span>
                        </div>
                      </div>

                      {/* Buttons: See Details + WhatsApp Quick Book */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedTrip(trip)}
                          className="py-2 px-3 rounded-lg border border-white/20 hover:border-[#D4AF37] text-zinc-200 hover:text-[#FFD700] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>{t('see_details')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <div className="relative group/book">
                          <a
                            href={buildWhatsAppUrl(getTourInquiryMessage(currentLang, trip.title))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-950/40 w-full"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t('book_now')}</span>
                          </a>

                          {/* Quick Book Tooltip */}
                          <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover/book:opacity-100 group-focus-within/book:opacity-100 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap hidden sm:block">
                            <div className="px-2.5 py-1 rounded-lg bg-[#0a1814]/95 border border-[#D4AF37]/80 text-[0.68rem] text-zinc-100 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                              <Zap className="w-3 h-3 text-[#FFD700] fill-[#FFD700] flex-shrink-0" />
                              <span className="font-bold text-[#FFD700]">Quick Book:</span>
                              <span className="text-zinc-200">Instant WhatsApp reply · 0% deposit</span>
                            </div>
                            <div className="w-2 h-2 bg-[#0a1814] border-r border-b border-[#D4AF37]/80 transform rotate-45 mx-auto -mt-1" />
                          </div>
                        </div>
                      </div>

                      {/* Social Share Bar: Facebook & WhatsApp */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[0.68rem] text-zinc-400 font-medium">
                          <Share2 className="w-3 h-3 text-[#D4AF37]" />
                          <span>Share:</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* WhatsApp Share Button */}
                          <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                              `Check out this excursion in Egypt: ${trip.title} (${priceInfo.formatted}) - ${trip.shortDesc}\n${
                                typeof window !== 'undefined' ? window.location.href : 'https://www.egy-tour.com'
                              }`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/35 text-[0.68rem] font-bold transition-all shadow-sm hover:scale-[1.03] cursor-pointer"
                            title={`Share ${trip.title} on WhatsApp`}
                            aria-label={`Share ${trip.title} on WhatsApp`}
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Facebook Share Button */}
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              typeof window !== 'undefined' ? window.location.href : 'https://www.egy-tour.com'
                            )}&quote=${encodeURIComponent(
                              `Check out ${trip.title} with EGY TOURS - VIP Excursions in Egypt!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/35 text-[0.68rem] font-bold transition-all shadow-sm hover:scale-[1.03] cursor-pointer"
                            title={`Share ${trip.title} on Facebook`}
                            aria-label={`Share ${trip.title} on Facebook`}
                          >
                            <Facebook className="w-3 h-3" />
                            <span>Facebook</span>
                          </a>

                          {/* Native Mobile Share / Copy Link Button */}
                          <button
                            type="button"
                            onClick={(e) => handleNativeShareTrip(trip, priceInfo.formatted, e)}
                            className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-[#FFD700] border border-white/10 text-[0.68rem] transition-all hover:scale-[1.05] cursor-pointer"
                            title={`Share ${trip.title} via mobile menu or copy`}
                            aria-label={`Share ${trip.title} via mobile menu`}
                          >
                            {copiedTripId === trip.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Share2 className="w-3 h-3 text-zinc-300" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Trip Details Modal */}
      <TripDetailModal
        trip={selectedTrip}
        onClose={() => setSelectedTrip(null)}
        currency={currency}
        convertPrice={convertPrice}
        currentLang={currentLang}
      />
    </section>
  );
};
