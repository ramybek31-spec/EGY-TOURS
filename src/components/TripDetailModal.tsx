import React, { useState } from 'react';
import { X, Clock, Star, Check, AlertCircle, MessageCircle, Users, Calendar, MapPin } from 'lucide-react';
import { Trip, CurrencyCode } from '../types';

interface TripDetailModalProps {
  trip: Trip | null;
  onClose: () => void;
  currency: CurrencyCode;
  convertPrice: (eur: number) => { formatted: string; amount: number; symbol: string };
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  trip,
  onClose,
  currency,
  convertPrice
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

  const currentPrice = convertPrice(trip.priceEUR);
  const totalPrice = currentPrice.amount * guestsCount;

  const allImages = [trip.image, ...(trip.galleryImages || [])];
  const activeImage = allImages[activeImgIndex] || trip.image;

  const handleWhatsAppBook = () => {
    const message = encodeURIComponent(
      `Hello EGY TOURS! 🐪✨\n\n` +
      `I would like to book:\n` +
      `📌 *${trip.title}*\n` +
      `👥 Guests: *${guestsCount}*\n` +
      `📅 Date: *${selectedDate}*\n` +
      `🏨 Hotel: *${hotelName || 'To be specified'}*\n` +
      `💰 Est. Total: *${currentPrice.symbol}${totalPrice.toLocaleString()} ${currency}*\n\n` +
      `Please confirm availability and pickup time!`
    );
    window.open(`https://wa.me/201107871007?text=${message}`, '_blank');
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
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0c0c0c]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFD700] text-xs font-bold uppercase tracking-wider">
              {trip.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{trip.rating}</span>
              <span className="text-zinc-400 font-normal">({trip.reviewsCount} reviews)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1c1c1c] border border-white/10 text-zinc-300 hover:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Title and Duration */}
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
              {trip.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
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
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
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
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1b1708] to-[#121212] border-2 border-[#D4AF37]/50 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#D4AF37]/20">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">Price per Person</span>
                <span className="font-heading text-2xl font-bold text-[#FFD700]">
                  {currentPrice.formatted}
                </span>
                <span className="text-xs text-zinc-400 ml-1">/ adult</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">Total Estimate</span>
                <span className="font-heading text-2xl font-bold text-emerald-400">
                  {currentPrice.symbol}{totalPrice.toLocaleString()} {currency}
                </span>
              </div>
            </div>

            {/* Inputs: Guests, Date, Hotel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
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
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2ce06f] hover:to-[#179e8e] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-3 transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Book on WhatsApp · Instant Confirmation</span>
            </button>
            <p className="text-[0.7rem] text-center text-zinc-400 mt-2">
              ⚡ No credit card required. Free cancellation up to 24 hours before tour. Pay in cash on the day of trip.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
