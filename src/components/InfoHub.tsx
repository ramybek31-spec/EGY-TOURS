import React, { useState } from 'react';
import { Sun, Waves, DollarSign, RefreshCw, ArrowRightLeft, Sparkles } from 'lucide-react';
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

  // Approximate live conversion rates relative to EUR
  const ratesToEUR: Record<CurrencyCode, number> = {
    EUR: 1.0,
    USD: 1.08,
    GBP: 0.85,
    EGP: 54.2
  };

  const convertValue = (amount: number, from: CurrencyCode, to: CurrencyCode) => {
    const amountInEUR = amount / ratesToEUR[from];
    const converted = amountInEUR * ratesToEUR[to];
    return Math.round(converted * 100) / 100;
  };

  const handleSwapCurrencies = () => {
    const prevFrom = calcFrom;
    setCalcFrom(calcTo);
    setCalcTo(prevFrom);
  };

  return (
    <section id="info-section" className="py-20 bg-[#070707] border-t border-[#D4AF37]/15 relative scroll-mt-16">
      <div id="info" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="section-title">{t('info_title')}</h2>
          <span className="gold-line" />
          <p className="section-subtitle">{t('info_sub')}</p>
        </div>

        {/* COMBINED 1 WIDGET: Weather, Sea State, Rates, Active Currency, and Live Converter */}
        <div
          id="resort-live-hub-widget"
          className="rounded-2xl bg-[#0c0c0c] border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(212,175,55,0.12)] overflow-hidden transition-all"
        >
          {/* Top Status Header of the Combined Widget */}
          <div className="px-6 py-3.5 bg-gradient-to-r from-[#151515] via-[#1c180e] to-[#151515] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-extrabold text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                Live Red Sea Radar & Currency Console
              </span>
            </div>
            <div className="text-[0.72rem] text-zinc-400 font-medium">
              Real-time feed · Hurghada, Egypt
            </div>
          </div>

          {/* Upper Section: 4 Core Modules with Clean Dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 gap-6 md:gap-0">
            {/* 1. Hurghada Weather */}
            <div className="flex flex-col justify-between px-0 md:px-5 first:pl-0">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Hurghada Weather
                  </span>
                  <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
                </div>
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

            {/* 2. Sea & Water Conditions */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 px-0 md:px-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Sea & Water
                  </span>
                  <Waves className="w-5 h-5 text-cyan-400" />
                </div>
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

            {/* 3. Exchange Rates */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 px-0 md:px-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Exchange Rates
                  </span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between py-0.5 border-b border-white/5">
                    <span className="text-zinc-300">1 EUR (€)</span>
                    <span className="font-bold text-[#FFD700]">≈ 54.20 EGP</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5 border-b border-white/5">
                    <span className="text-zinc-300">1 USD ($)</span>
                    <span className="font-bold text-[#FFD700]">≈ 50.15 EGP</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-zinc-300">1 GBP (£)</span>
                    <span className="font-bold text-[#FFD700]">≈ 63.80 EGP</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[0.68rem] text-zinc-500">
                * Official tourist exchange rate guide
              </div>
            </div>

            {/* 4. Active Store Currency */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 px-0 md:px-5 last:pr-0">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Active Store Currency
                  </span>
                  <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="font-heading text-3xl font-extrabold text-[#FFD700] mb-1">
                  {currentCurrency}
                </div>
                <p className="text-[0.72rem] text-zinc-400 mb-3">
                  All prices on this website are shown dynamically converted in {currentCurrency}.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['EUR', 'USD', 'GBP', 'EGP'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onCurrencyChange(c)}
                    className={`py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      currentCurrency === c
                        ? 'bg-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Integrated Lower Section: Quick Currency Converter within the SAME Widget */}
          <div className="border-t border-[#D4AF37]/25 bg-gradient-to-b from-[#141414] to-[#0c0c0c] p-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                <h3 className="text-xs font-extrabold text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Quick Currency Converter</span>
                </h3>
                <div className="text-[0.7rem] text-zinc-400 font-medium">
                  Rate: 1 {calcFrom} = {convertValue(1, calcFrom, calcTo).toLocaleString()} {calcTo}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                {/* Amount & From */}
                <div className="flex rounded-xl overflow-hidden border border-white/15 bg-black/80 focus-within:border-[#D4AF37] transition-all">
                  <input
                    type="number"
                    min="1"
                    value={calcAmount || ''}
                    onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold text-white bg-transparent focus:outline-none"
                    placeholder="Amount"
                  />
                  <select
                    value={calcFrom}
                    onChange={(e) => setCalcFrom(e.target.value as CurrencyCode)}
                    className="bg-[#1a1a1a] text-xs font-bold text-[#FFD700] px-3 py-2.5 border-l border-white/10 focus:outline-none cursor-pointer"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EGP">EGP (LE)</option>
                  </select>
                </div>

                {/* Interactive Swap Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleSwapCurrencies}
                    className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37] text-zinc-300 hover:text-[#FFD700] transition-all cursor-pointer shadow-sm hover:scale-110 active:scale-95"
                    title="Swap currencies"
                    aria-label="Swap currencies"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Result & Target */}
                <div className="flex rounded-xl overflow-hidden border border-[#D4AF37]/60 bg-black/80 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
                  <div className="w-full px-3.5 py-2.5 text-base font-bold text-emerald-400 flex items-center">
                    {convertValue(calcAmount, calcFrom, calcTo).toLocaleString()}
                  </div>
                  <select
                    value={calcTo}
                    onChange={(e) => setCalcTo(e.target.value as CurrencyCode)}
                    className="bg-[#1a1a1a] text-xs font-bold text-[#FFD700] px-3 py-2.5 border-l border-white/10 focus:outline-none cursor-pointer"
                  >
                    <option value="EGP">EGP (LE)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              {/* Quick Amount Presets */}
              <div className="mt-3 flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-[0.68rem] text-zinc-500 font-medium">Quick Presets:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[20, 50, 100, 200, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCalcAmount(preset)}
                      className={`px-2 py-0.5 rounded text-[0.68rem] font-medium transition-all cursor-pointer ${
                        calcAmount === preset
                          ? 'bg-[#D4AF37]/30 text-[#FFD700] border border-[#D4AF37]/70'
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      {preset} {calcFrom}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
