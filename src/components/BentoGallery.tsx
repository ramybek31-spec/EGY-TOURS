import React, { useState } from 'react';
import { X, ZoomIn, Compass, MessageCircle } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface BentoGalleryProps {
  currentLang: SupportedLanguage;
}

interface GalleryItem {
  id: string;
  tag: string;
  title: string;
  src: string;
  spanClass: string;
}

export const BentoGallery: React.FC<BentoGalleryProps> = ({ currentLang }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      tag: 'Red Sea',
      title: 'Nefertari Glass Submarine',
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      spanClass: 'bento-wide'
    },
    {
      id: '2',
      tag: 'Red Sea',
      title: 'Orange Bay Beach Lagoon',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      spanClass: 'bento-tall'
    },
    {
      id: '3',
      tag: 'Cairo',
      title: 'Great Pyramids of Giza',
      src: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    },
    {
      id: '4',
      tag: 'Adventure',
      title: 'Saharan Camel Trek',
      src: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    },
    {
      id: '5',
      tag: 'Sea',
      title: 'The Deep Blue Coral Diving',
      src: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
      spanClass: 'bento-tall'
    },
    {
      id: '6',
      tag: 'Sea',
      title: 'Dolphin House Wild Pods',
      src: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
      spanClass: 'bento-wide'
    },
    {
      id: '7',
      tag: 'Luxor',
      title: 'Karnak Temple Pillars',
      src: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    },
    {
      id: '8',
      tag: 'Adventure',
      title: 'Super Safari Quad Trek',
      src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    },
    {
      id: '9',
      tag: 'Adventure',
      title: 'Sunset Beach Horse Riding',
      src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    },
    {
      id: '10',
      tag: 'Sun & Sea',
      title: 'Paradise Island Sands',
      src: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
      spanClass: 'bento-wide'
    },
    {
      id: '11',
      tag: 'Sea',
      title: 'Red Sea Marine Life',
      src: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    },
    {
      id: '12',
      tag: 'Beauty',
      title: 'Golden Hour Desert Vista',
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      spanClass: ''
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-[#070707] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Capture the Moments</h2>
        <span className="gold-line" />
        <p className="section-subtitle">
          From glowing coral reefs to dramatic desert horizons, immerse yourself in the beauty of Hurghada.
        </p>

        {/* Bento Grid */}
        <div className="bento-gallery">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className={`bento-item ${item.spanClass} group`}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
              />
              <div className="bento-caption">
                <span className="bento-tag">{item.tag}</span>
                <p>{item.title}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-[#D4AF37]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-[#FFD700]" />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery CTA */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <a href="#trips" className="btn-gold">
            <Compass className="w-4 h-4" />
            <span>{t('explore_trips')}</span>
          </a>
          <a
            href="https://wa.me/201107871007?text=Hello%20EGY%20TOURS!%20I%20saw%20your%20gallery%20and%20would%20like%20to%20book%20a%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('book_whatsapp')}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#161616] border border-[#D4AF37] text-[#FFD700] hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center cursor-pointer z-50"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-[#D4AF37]/40 shadow-2xl"
            />
            <div className="mt-4 flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase">
                {activeImage.tag}
              </span>
              <span className="font-heading text-lg font-bold text-white">{activeImage.title}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
