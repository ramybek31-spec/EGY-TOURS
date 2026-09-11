import React, { useState } from 'react';
import { Sun, Waves, DollarSign, RefreshCw, Thermometer, Wind, Eye } from 'lucide-react';
import { CurrencyCode } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface InfoHubProps {
  currentLang: SupportedLanguage;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
}

export const InfoHub: React.FC<InfoHubProps> = ({
  currentLang,
  currentCurrency,
  onCurrencyChange
}) => {
  const [calcAmount, setCalcAmount] = useState<number>(50);
  const [calcFrom, setCalcFrom] = useState<CurrencyCode>('EUR');
  const [calcTo, setCalcTo] = useState<CurrencyCode>('EGP');

  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  // Approximate live conversion rates from EUR
  const ratesToEUR: Record<CurrencyCode, number> = {
    EUR: 1.0,
    USD: 1.08,
    GBP: 0.85,
    EGP: 54.2
  };

  const convertValue = (amount: number, from: CurrencyCode, to: CurrencyCode) => {
    // first convert to EUR, then to target
    const amountInEUR = amount / ratesToEUR[from];
    const converted = amountInEUR * ratesToEUR[to];
    return Math.round(converted * 100) / 100;
  };

  return (
    <section id="info-section" className="py-20 bg-[#070707] border-t border-[#D4AF37]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">{t('info_title')}</h2>
          <span className="gold-line" />
          <p className="section-subtitle">{t('info_sub')}</p>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Weather Card */}
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Hurghada Weather</span>
              <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
            </div>
            <div>
              <div className="font-heading text-4xl font-extrabold text-[#FFD700] mb-1">
                29°C <span className="text-base text-zinc-400 font-sans font-normal">/ 84°F</span>
              </div>
              <p className="text-xs text-zinc-300 font-medium">Clear Sky & Bright Sunshine</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[0.7rem] text-zinc-400">
              <span>Humidity: 42%</span>
              <span>UV Index: 8 (Very High)</span>
            </div>
          </div>

          {/* Sea Condition Card */}
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sea & Water</span>
              <Waves className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="font-heading text-4xl font-extrabold text-cyan-400 mb-1">
                25°C <span className="text-base text-zinc-400 font-sans font-normal">Water</span>
              </div>
              <p className="text-xs text-zinc-300 font-medium">Calm Waters · Gentle Swell 0.4m</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[0.7rem] text-zinc-400">
              <span>Visibility: 30m+</span>
              <span>Wind: 11 kts NNE</span>
            </div>
          </div>

          {/* Today's Exchange Rates Card */}
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Exchange Rates</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-zinc-300">1 EUR (€)</span>
                <span className="font-bold text-[#FFD700]">≈ 54.20 EGP</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-zinc-300">1 USD ($)</span>
                <span className="font-bold text-[#FFD700]">≈ 50.15 EGP</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-zinc-300">1 GBP (£)</span>
                <span className="font-bold text-[#FFD700]">≈ 63.80 EGP</span>
              </div>
            </div>
            <div className="mt-2 text-[0.68rem] text-zinc-500">
              * Official tourist exchange rate guide
            </div>
          </div>

          {/* Active Store Currency */}
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Active Store Currency</span>
              <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <div className="font-heading text-3xl font-extrabold text-[#FFD700] mb-2">
                {currentCurrency}
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                All prices on this website are shown dynamically converted in {currentCurrency}.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['EUR', 'USD', 'GBP', 'EGP'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onCurrencyChange(c)}
                  className={`py-1 rounded text-xs font-bold transition-colors ${
                    currentCurrency === c
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Currency Converter Tool Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121212] to-[#171717] border border-[#D4AF37]/30 max-w-2xl mx-auto shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-center">
            Quick Currency Converter
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            {/* Amount & From */}
            <div className="flex rounded-lg overflow-hidden border border-white/15 bg-black">
              <input
                type="number"
                min="1"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 text-sm text-white bg-transparent focus:outline-none"
              />
              <select
                value={calcFrom}
                onChange={(e) => setCalcFrom(e.target.value as CurrencyCode)}
                className="bg-[#1a1a1a] text-xs font-bold text-[#FFD700] px-2 py-2 border-l border-white/10 focus:outline-none cursor-pointer"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EGP">EGP (LE)</option>
              </select>
            </div>

            {/* Equals Icon */}
            <div className="text-center font-bold text-[#D4AF37] text-sm">
              =
            </div>

            {/* Result & Target */}
            <div className="flex rounded-lg overflow-hidden border border-[#D4AF37]/50 bg-black">
              <div className="w-full px-3 py-2 text-sm font-bold text-emerald-400 flex items-center">
                {convertValue(calcAmount, calcFrom, calcTo).toLocaleString()}
              </div>
              <select
                value={calcTo}
                onChange={(e) => setCalcTo(e.target.value as CurrencyCode)}
                className="bg-[#1a1a1a] text-xs font-bold text-[#FFD700] px-2 py-2 border-l border-white/10 focus:outline-none cursor-pointer"
              >
                <option value="EGP">EGP (LE)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
