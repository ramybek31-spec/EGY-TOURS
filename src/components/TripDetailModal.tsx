import React, { useState } from 'react';
import {
  X,
  Clock,
  Star,
  Check,
  AlertCircle,
  MessageCircle,
  Users,
  Calendar,
  MapPin,
  Share2,
  Facebook
} from 'lucide-react';
import { Trip, CurrencyCode } from '../types';
import { SupportedLanguage } from '../data/translations';
import { buildWhatsAppUrl, getDetailedBookingMessage } from '../utils/whatsapp';

interface TripDetailModalProps {
  trip: Trip | null;
  onClose: () => void;
  currency: CurrencyCode;
  convertPrice: (eur: number) => { formatted: string; amount: number; symbol: string };
  currentLang?: SupportedLanguage;
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  trip,
  onClose,
  currency,
  convertPrice,
  currentLang = 'en'
}) => {
  if (!trip) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [hotelName, setHotelName] = useState('');
  const [isShareCopied, setIsShareCopied] = useState(false);

  const currentPrice = convertPrice(trip.priceEUR);
  const totalPrice = currentPrice.amount * guestsCount;

  const allImages = [trip.image, ...(trip.galleryImages || [])];
  const activeImage = allImages[activeImgIndex] || trip.image;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.egy-tour.com';

  const handleShareTrip = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const shareData = {
      title: `${trip.title} - EGY TOUR Egypt`,
      text: `Check out ${trip.title} (${currentPrice.formatted}) with EGY TOUR! Instant WhatsApp booking with 0% advance deposit.`,
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
        await navigator.clipboard.writeText(`${trip.title} (${currentPrice.formatted}) - ${shareUrl}`);
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2500);
      }
    } catch (err) {
      console.warn('Clipboard share failed:', err);
    }
  };

  const handleWhatsAppBook = () => {
    const formattedPrice = `${currentPrice.symbol}${totalPrice.toLocaleString()} ${currency}`;
    const message = getDetailedBookingMessage(currentLang, {
      tourTitle: trip.title,
      guestsCount,
      selectedDate,
      hotelName,
      formattedPrice
    });
    window.open(buildWhatsAppUrl(message), '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#111111] border border-[#D4AF37]/40 rounded-2xl shadow-2xl shadow-black overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-[#0c0c0c] gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFD700] text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider truncate">
              {trip.category}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-amber-400 font-bold truncate">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
              <span>{trip.rating}</span>
              <span className="text-zinc-400 font-normal hidden xs:inline">({trip.reviewsCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Share to WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out ${trip.title} with EGY TOUR (${currentPrice.formatted}): ${trip.shortDesc}\n${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-bold transition-all shadow-sm"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Share to Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}&quote=${encodeURIComponent(`Check out ${trip.title} with EGY TOUR Egypt!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 text-xs font-bold transition-all shadow-sm"
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>

            {/* Mobile native share button */}
            <button
              type="button"
              onClick={handleShareTrip}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1c1c] border border-white/10 text-zinc-300 hover:text-[#FFD700] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
              title="Share this excursion"
              aria-label="Share this excursion"
            >
              {isShareCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1c1c1c] border border-white/10 text-zinc-300 hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-3.5 sm:p-6 space-y-5 sm:space-y-6">
          {/* Title and Duration */}
          <div>
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {trip.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Duration: {trip.duration}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Hurghada & Red Sea</span>
              </span>
              <span className="text-emerald-400 font-medium">✓ Free Hotel Pickup</span>
            </div>
          </div>

          {/* Photo Gallery & Thumbnail Selector */}
          <div>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
              <img
                src={activeImage}
                alt={trip.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-[#D4AF37]/40 text-[#FFD700] text-xs font-bold">
                From {currentPrice.formatted} / person
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                      activeImgIndex === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${trip.title} gallery preview ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <h4 className="text-sm font-bold text-[#FFD700] uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">{trip.fullDesc}</p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-sm font-bold text-[#FFD700] uppercase tracking-wider mb-3">
              Trip Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {trip.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-200">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 text-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary Timeline */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
              <h4 className="text-sm font-bold text-[#FFD700] uppercase tracking-wider mb-4">
                Detailed Itinerary
              </h4>
              <div className="space-y-3 relative pl-4 border-l-2 border-[#D4AF37]/30">
                {trip.itinerary.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-[#FFD700] font-mono">{item.time}</span>
                      <span className="text-xs font-bold text-white">{item.title}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#141414] border border-emerald-950/40">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-1.5">
                {trip.inclusions.map((inc, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#141414] border border-red-950/30">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-zinc-500" />
                <span>What's Excluded</span>
              </h4>
              <ul className="space-y-1.5">
                {trip.exclusions.map((exc, i) => (
                  <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                    <span className="text-zinc-600">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Booking Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1b1708] to-[#121212] border-2 border-[#D4AF37]/50 shadow-xl">
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#D4AF37]/20">
              <div>
                <span className="text-[0.7rem] sm:text-xs text-zinc-400 uppercase tracking-wider block">Price per Person</span>
                <span className="font-heading text-xl sm:text-2xl font-bold text-[#FFD700]">
                  {currentPrice.formatted}
                </span>
                <span className="text-xs text-zinc-400 ml-1">/ adult</span>
              </div>

              <div className="text-left xs:text-right">
                <span className="text-[0.7rem] sm:text-xs text-zinc-400 uppercase tracking-wider block">Total Estimate</span>
                <span className="font-heading text-xl sm:text-2xl font-bold text-emerald-400">
                  {currentPrice.symbol}{totalPrice.toLocaleString()} {currency}
                </span>
              </div>
            </div>

            {/* Inputs: Guests, Date, Hotel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Users className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Desired Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <Calendar className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-300 block mb-1">
                  Hotel for Pickup (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Steigenberger ALDAU"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Big WhatsApp CTA Button */}
            <button
              type="button"
              onClick={handleWhatsAppBook}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2ce06f] hover:to-[#179e8e] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 sm:gap-3 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Book on WhatsApp · Instant Confirmation</span>
            </button>
            <p className="text-[0.68rem] sm:text-[0.7rem] text-center text-zinc-400 mt-2">
              ⚡ No credit card required. Free cancellation up to 24 hours before tour. Pay in cash on the day of trip.
            </p>

            {/* Social Share Excursion Row */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5">
              <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Share this tour:</span>
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Check out this tour in Egypt: ${trip.title} (${currentPrice.formatted}) - ${trip.shortDesc}\n${shareUrl}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Share excursion on WhatsApp"
                  aria-label="Share excursion on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}&quote=${encodeURIComponent(`Check out ${trip.title} with EGY TOUR Egypt!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
                  title="Share excursion on Facebook"
                  aria-label="Share excursion on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>

                <button
                  type="button"
                  onClick={handleShareTrip}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white border border-white/15 text-xs font-semibold transition-all cursor-pointer"
                  title="More sharing options or copy link"
                  aria-label="More sharing options or copy link"
                >
                  {isShareCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
