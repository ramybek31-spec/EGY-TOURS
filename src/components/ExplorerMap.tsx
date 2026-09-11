import React, { useState } from 'react';
import { MapPin, Phone, Compass, ExternalLink, Navigation, Anchor, Sun, Waves } from 'lucide-react';
import { MAP_POINTS } from '../data/mapPoints';
import { MapPoint } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface ExplorerMapProps {
  currentLang: SupportedLanguage;
}

export const ExplorerMap: React.FC<ExplorerMapProps> = ({ currentLang }) => {
  const [activePoint, setActivePoint] = useState<MapPoint>(MAP_POINTS[0]);
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  return (
    <section id="map-section" className="py-20 bg-[#0a0a0a] border-t border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Red Sea Explorer</span>
          </div>

          <h2 className="section-title">{t('map_title')}</h2>
          <span className="gold-line" />
          <p className="section-subtitle">{t('map_sub')}</p>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Visual Map Card (8 cols) */}
          <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl bg-[#111111] border-2 border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            {/* Corner Luxury Brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

            {/* Embedded Google Maps / Interactive Stage */}
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden bg-[#0c131a] border border-white/10">
              <iframe
                title="EGY TOURS Hurghada Red Sea & Cairo Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113642.48395232938!2d33.72260655452417!3d27.22285191398864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287a1770e2815%3A0x7d97e889a7140f7b!2sHurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Overlay Active Point Pill */}
              <div className="absolute top-4 left-4 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 max-w-xs shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-ping" />
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">
                    {activePoint.type}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-0.5">{activePoint.name}</h4>
                <p className="text-xs text-zinc-300 leading-snug">{activePoint.description}</p>
                <div className="mt-2 text-[0.65rem] text-zinc-400 font-mono">
                  GPS: {activePoint.lat.toFixed(4)}° N, {activePoint.lng.toFixed(4)}° E
                </div>
              </div>
            </div>
          </div>

          {/* Location Points Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="p-4 rounded-xl bg-[#141414] border border-[#D4AF37]/30">
              <h3 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider mb-1 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Featured Excursion Locations</span>
              </h3>
              <p className="text-xs text-zinc-400">Click any key spot to inspect details:</p>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {MAP_POINTS.map((pt) => (
                <div
                  key={pt.id}
                  onClick={() => setActivePoint(pt)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                    activePoint.id === pt.id
                      ? 'bg-[#D4AF37]/15 border-[#FFD700] shadow-md shadow-[#D4AF37]/10 scale-[1.01]'
                      : 'bg-[#121212] border-white/10 hover:border-white/25 text-zinc-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activePoint.id === pt.id ? 'text-[#FFD700]' : 'text-zinc-500'}`} />
                    <div>
                      <h4 className={`text-xs font-bold ${activePoint.id === pt.id ? 'text-white' : 'text-zinc-300'}`}>
                        {pt.name}
                      </h4>
                      <p className="text-[0.7rem] text-zinc-400 line-clamp-1">{pt.description}</p>
                    </div>
                  </div>
                  <span className="text-[0.65rem] px-2 py-0.5 rounded bg-white/5 uppercase font-mono text-zinc-400">
                    {pt.type}
                  </span>
                </div>
              ))}
            </div>

            {/* Google Maps External Link Button */}
            <a
              href="https://maps.app.goo.gl/qckJzUVJvqkfbBiDA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs py-3 w-full"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Info Strip below map */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <div className="text-xs text-zinc-400">Main Office & Pier</div>
              <div className="text-xs font-bold text-white">Hurghada Marine St, Red Sea, Egypt</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <div className="text-xs text-zinc-400">24/7 Telephone & Booking</div>
              <a href="tel:+201107871007" className="text-xs font-bold text-[#FFD700] hover:underline">
                +20 1107871007
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121212] border border-white/10 flex items-center justify-center gap-3">
            <Anchor className="w-5 h-5 text-[#D4AF37]" />
            <div className="text-left">
              <div className="text-xs text-zinc-400">Free Hotel Pickups</div>
              <div className="text-xs font-bold text-white">Hurghada, El Gouna, Makadi & Sahl Hasheesh</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
