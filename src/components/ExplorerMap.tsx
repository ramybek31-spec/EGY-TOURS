import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  MapPin,
  Phone,
  Compass,
  ExternalLink,
  Navigation,
  Anchor,
  Copy,
  Check,
  Palmtree,
  Fish,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Wind,
  Thermometer,
  Eye,
  Activity,
  Maximize2
} from 'lucide-react';
import { MAP_POINTS } from '../data/mapPoints';
import { MapPoint } from '../types';
import { SupportedLanguage, TRANSLATIONS } from '../data/translations';

interface ExplorerMapProps {
  currentLang: SupportedLanguage;
}

type MapCategoryFilter = 'all' | 'marina' | 'island' | 'reef' | 'desert' | 'city';
type MapViewMode = 'nautical' | 'satellite';

export const ExplorerMap: React.FC<ExplorerMapProps> = ({ currentLang }) => {
  const [activePoint, setActivePoint] = useState<MapPoint>(MAP_POINTS[0]);
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapCategoryFilter>('all');
  const [viewMode, setMapViewMode] = useState<MapViewMode>('nautical');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedGps, setCopiedGps] = useState(false);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const [showRadarSweep, setShowRadarSweep] = useState(true);

  const mapStageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [-12, 16]);

  // Hurghada Marina reference base point
  const marinaBase = MAP_POINTS.find(p => p.id === 'marina') || MAP_POINTS[0];

  // Filtered map points based on active category
  const filteredPoints = useMemo(() => {
    if (selectedCategory === 'all') return MAP_POINTS;
    return MAP_POINTS.filter(p => p.type === selectedCategory);
  }, [selectedCategory]);

  const t = (key: string) => TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en'][key] || key;

  // Handle GPS Copy to clipboard
  const handleCopyGps = (e: React.MouseEvent, pt: MapPoint = activePoint) => {
    e.stopPropagation();
    const coords = `${pt.lat.toFixed(4)}° N, ${pt.lng.toFixed(4)}° E`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(coords);
    }
    setCopiedGps(true);
    setTimeout(() => setCopiedGps(false), 2000);
  };

  // Track mouse coordinates over the nautical chart canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapStageRef.current) return;
    const rect = mapStageRef.current.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    // Calculate approximate regional Lat / Lng corresponding to the chart coordinates
    const approxLat = 27.45 - (yPct / 100) * 0.40;
    const approxLng = 33.65 + (xPct / 100) * 0.45;

    setMouseCoords({
      x: xPct,
      y: yPct,
      lat: Number(approxLat.toFixed(4)),
      lng: Number(approxLng.toFixed(4)),
    });
  };

  const handleMouseLeave = () => {
    setMouseCoords(null);
  };

  // Zoom control handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.85));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setActivePoint(marinaBase);
  };

  // Return styling & icons based on location type
  const getTypeColor = (type: MapPoint['type']) => {
    switch (type) {
      case 'marina':
        return {
          color: '#FFD700',
          bg: 'bg-[#D4AF37]/20',
          border: 'border-[#FFD700]',
          text: 'text-[#FFD700]',
          glow: 'shadow-[0_0_20px_rgba(255,215,0,0.6)]'
        };
      case 'island':
        return {
          color: '#06b6d4',
          bg: 'bg-cyan-500/20',
          border: 'border-cyan-400',
          text: 'text-cyan-400',
          glow: 'shadow-[0_0_20px_rgba(6,182,212,0.6)]'
        };
      case 'reef':
        return {
          color: '#38bdf8',
          bg: 'bg-sky-500/20',
          border: 'border-sky-400',
          text: 'text-sky-400',
          glow: 'shadow-[0_0_20px_rgba(56,189,248,0.6)]'
        };
      case 'desert':
        return {
          color: '#f59e0b',
          bg: 'bg-amber-500/20',
          border: 'border-amber-400',
          text: 'text-amber-400',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.6)]'
        };
      case 'city':
        return {
          color: '#eab308',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-400',
          text: 'text-yellow-400',
          glow: 'shadow-[0_0_20px_rgba(234,179,8,0.6)]'
        };
      default:
        return {
          color: '#D4AF37',
          bg: 'bg-[#D4AF37]/20',
          border: 'border-[#D4AF37]',
          text: 'text-[#D4AF37]',
          glow: 'shadow-[0_0_20px_rgba(212,175,55,0.6)]'
        };
    }
  };

  const getTypeIcon = (type: MapPoint['type'], className = "w-4 h-4") => {
    switch (type) {
      case 'marina':
        return <Anchor className={className} />;
      case 'island':
        return <Palmtree className={className} />;
      case 'reef':
        return <Fish className={className} />;
      case 'desert':
        return <Compass className={className} />;
      case 'city':
        return <Layers className={className} />;
      default:
        return <MapPin className={className} />;
    }
  };

  // Determine active target for the route line
  const displayedTarget = hoveredPoint || activePoint;
  const showActiveRoute = displayedTarget.id !== 'marina';

  return (
    <section
      ref={sectionRef}
      id="map-section"
      className="py-14 sm:py-20 bg-[#080c11] border-t border-[#D4AF37]/20 relative overflow-hidden select-none"
    >
      {/* Ambient Maritime Background Gradient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#0a2540]/25 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#FFD700] text-xs font-bold uppercase tracking-wider mb-3 shadow-lg shadow-[#D4AF37]/10"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Interactive Red Sea Chart</span>
          </motion.div>

          <h2 className="section-title">{t('map_title')}</h2>
          <span className="gold-line" />
          <p className="section-subtitle">{t('map_sub')}</p>
        </div>

        {/* Live Maritime Telemetry Strip */}
        <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-[#0e1620]/90 backdrop-blur-md border border-white/10 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2.5 px-2">
            <div className="p-2 rounded-lg bg-[#D4AF37]/15 text-[#FFD700]">
              <Anchor className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[0.7rem] text-zinc-400">Departure Base Hub</div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Hurghada Marina</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400">
              <Thermometer className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[0.7rem] text-zinc-400">Sea Water Temp</div>
              <div className="font-bold text-white">26°C (79°F) · Perfect Warmth</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[0.7rem] text-zinc-400">Reef Visibility</div>
              <div className="font-bold text-white">30m+ Crystal Clarity</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[0.7rem] text-zinc-400">Wave & Wind</div>
              <div className="font-bold text-white">11 kts NNE · 0.3m Smooth</div>
            </div>
          </div>
        </div>

        {/* Filter Badges & View Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All Key Spots', icon: Sparkles, count: MAP_POINTS.length },
              { id: 'island', label: 'Islands', icon: Palmtree, count: MAP_POINTS.filter(p => p.type === 'island').length },
              { id: 'reef', label: 'Coral Reefs & Diving', icon: Fish, count: MAP_POINTS.filter(p => p.type === 'reef').length },
              { id: 'desert', label: 'Desert Safari', icon: Compass, count: MAP_POINTS.filter(p => p.type === 'desert').length },
              { id: 'city', label: 'Ancient Egypt', icon: Layers, count: MAP_POINTS.filter(p => p.type === 'city').length },
            ].map(cat => {
              const IconComponent = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as MapCategoryFilter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold shadow-md shadow-[#D4AF37]/30 scale-105'
                      : 'bg-[#121a24] text-zinc-300 hover:text-white hover:bg-[#1a2533] border border-white/10'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[0.65rem] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Switcher: Nautical Vector Radar vs Street/Satellite Map */}
          <div className="flex items-center p-1 rounded-xl bg-[#0f1722] border border-[#D4AF37]/30 text-xs">
            <button
              type="button"
              onClick={() => setMapViewMode('nautical')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'nautical'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Nautical Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setMapViewMode('satellite')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'satellite'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Live Map View</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Map Stage (8 cols) + Locations List / Dossier (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Map Visual Stage (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#0d141e] border-2 border-[#D4AF37]/35 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Corner Luxury Nautical Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37] z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] z-20 pointer-events-none" />

            {/* Stage Toolbar Overlay */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 p-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
              <button
                type="button"
                onClick={() => setShowRadarSweep(!showRadarSweep)}
                title="Toggle Radar Sweep Motion"
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  showRadarSweep ? 'text-[#FFD700] bg-[#D4AF37]/20' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-white/20" />
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset to Marina HQ (27.2228° N, 33.8423° E)"
                className="p-1.5 rounded-lg text-zinc-300 hover:text-[#FFD700] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Live Mouse Coordinates HUD */}
            <div className="absolute bottom-3 left-3 z-30 px-2.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[0.65rem] font-mono text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
              <span>
                {mouseCoords
                  ? `CURSOR: ${mouseCoords.lat.toFixed(4)}° N, ${mouseCoords.lng.toFixed(4)}° E`
                  : `HQ BASE: 27.2228° N, 33.8423° E`}
              </span>
              <span className="text-zinc-500 hidden sm:inline">|</span>
              <span className="text-[#FFD700] hidden sm:inline">RED SEA MARITIME GRID</span>
            </div>

            {/* Map Canvas Stage Container */}
            <div
              ref={mapStageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[380px] sm:h-[480px] overflow-hidden bg-[#070e17]"
            >
              {viewMode === 'nautical' ? (
                /* ================= NAUTICAL VECTOR RADAR CHART VIEW ================= */
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  className="w-full h-full relative cursor-crosshair"
                >
                  {/* Bathymetry & Coastal Background SVG Graphic */}
                  <svg
                    className="w-full h-full absolute inset-0 pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      {/* Deep Water Radial Gradient */}
                      <radialGradient id="waterDepth" cx="65%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#082b4a" stopOpacity="0.8" />
                        <stop offset="45%" stopColor="#061c33" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#040e1b" stopOpacity="1" />
                      </radialGradient>

                      {/* Shallow Coral Reef Turquoise Glow */}
                      <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>

                      {/* Radar Beam Gradient */}
                      <linearGradient id="radarBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Ocean Depth Background */}
                    <rect width="100" height="100" fill="url(#waterDepth)" />

                    {/* Mainland Egypt Coastal Landmass (Western / Left side) */}
                    <path
                      d="M 0 0 L 32 0 Q 30 20 36 38 Q 40 50 37 68 Q 33 82 39 100 L 0 100 Z"
                      fill="#121820"
                      stroke="#223040"
                      strokeWidth="0.6"
                    />

                    {/* Mountain Ridge Shading on Desert Shoreline */}
                    <path
                      d="M 0 0 L 22 0 Q 20 28 25 55 Q 22 75 28 100 L 0 100 Z"
                      fill="#0d1218"
                      opacity="0.8"
                    />

                    {/* Hurghada Coastline Reef Fringe (Turquoise Glow) */}
                    <path
                      d="M 32 0 Q 30 20 36 38 Q 40 50 37 68 Q 33 82 39 100"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                    />

                    {/* Giftun Island Archipelago (Giftun Kebir & Soraya) */}
                    <ellipse
                      cx="63"
                      cy="55"
                      rx="8.5"
                      ry="4.5"
                      fill="#15202b"
                      stroke="#06b6d4"
                      strokeWidth="0.8"
                      strokeDasharray="1,0.5"
                    />
                    <ellipse
                      cx="59"
                      cy="58"
                      rx="4"
                      ry="2.2"
                      fill="#15202b"
                      stroke="#38bdf8"
                      strokeWidth="0.6"
                    />
                    {/* Abu Ramada Reef Pinnacle */}
                    <ellipse
                      cx="74"
                      cy="68"
                      rx="3"
                      ry="2"
                      fill="#0f2639"
                      stroke="#38bdf8"
                      strokeWidth="0.7"
                    />
                    {/* Shaab El Erg (Dolphin House) Horseshoe Reef */}
                    <path
                      d="M 44 21 C 45 19, 49 19, 48 23"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                    />

                    {/* Nautical Bathymetric Depth Contours */}
                    <path
                      d="M 42 10 Q 52 35 50 65 Q 48 85 58 100"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.4"
                      strokeOpacity="0.25"
                      strokeDasharray="2,2"
                    />
                    <path
                      d="M 55 10 Q 70 30 72 65 Q 70 85 78 100"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="0.3"
                      strokeOpacity="0.18"
                      strokeDasharray="2,3"
                    />

                    {/* Latitude / Longitude Nautical Grid Lines */}
                    {[20, 40, 60, 80].map(val => (
                      <g key={val}>
                        <line x1="0" y1={val} x2="100" y2={val} stroke="#D4AF37" strokeWidth="0.15" strokeOpacity="0.2" />
                        <line x1={val} y1="0" x2={val} y2="100" stroke="#D4AF37" strokeWidth="0.15" strokeOpacity="0.2" />
                      </g>
                    ))}

                    {/* Sonar Concentric Rings from Hurghada Marina HQ */}
                    {[12, 24, 36, 48].map((radius, idx) => (
                      <circle
                        key={radius}
                        cx={marinaBase.chartX || 38}
                        cy={marinaBase.chartY || 48}
                        r={radius}
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="0.35"
                        strokeOpacity={0.15 - idx * 0.02}
                      />
                    ))}

                    {/* Active Route Trajectory from Marina HQ to Selected/Hovered Point */}
                    {showActiveRoute && (
                      <g>
                        <path
                          d={`M ${marinaBase.chartX || 38} ${marinaBase.chartY || 48} Q ${(marinaBase.chartX! + displayedTarget.chartX!) / 2 + 3} ${(marinaBase.chartY! + displayedTarget.chartY!) / 2 - 4} ${displayedTarget.chartX} ${displayedTarget.chartY}`}
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="0.8"
                          strokeDasharray="2,1.5"
                          className="animate-dash"
                        />
                        {/* Animated Boat / Yacht gliding along the route */}
                        <circle
                          cx={displayedTarget.chartX}
                          cy={displayedTarget.chartY}
                          r="1.8"
                          fill="#FFD700"
                          className="animate-ping"
                        />
                      </g>
                    )}
                  </svg>

                  {/* 360° Rotating Radar Sweep Beam anchored at Marina HQ */}
                  {showRadarSweep && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        left: `${marinaBase.chartX || 38}%`,
                        top: `${marinaBase.chartY || 48}%`,
                        width: '280px',
                        height: '280px',
                        marginLeft: '-140px',
                        marginTop: '-140px',
                        pointerEvents: 'none',
                        transformOrigin: 'center center',
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full"
                        style={{
                          background: 'conic-gradient(from 0deg, rgba(255, 215, 0, 0.28) 0deg, rgba(212, 175, 55, 0.05) 45deg, transparent 90deg, transparent 360deg)',
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Interactive Pins on Chart */}
                  {filteredPoints.map(pt => {
                    const isSelected = activePoint.id === pt.id;
                    const isHovered = hoveredPoint?.id === pt.id;
                    const typeStyle = getTypeColor(pt.type);
                    const posX = pt.chartX ?? 50;
                    const posY = pt.chartY ?? 50;

                    return (
                      <motion.div
                        key={pt.id}
                        style={{
                          position: 'absolute',
                          left: `${posX}%`,
                          top: `${posY}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className="z-20 group"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        onClick={() => setActivePoint(pt)}
                      >
                        {/* Interactive Marker Button with Motion & Hover */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.35 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Select ${pt.name}`}
                          className={`relative flex items-center justify-center rounded-full p-2 transition-all cursor-pointer ${
                            isSelected
                              ? `bg-black border-2 ${typeStyle.border} ${typeStyle.glow} scale-125 z-30`
                              : isHovered
                              ? `bg-black/90 border-2 ${typeStyle.border} z-25`
                              : 'bg-black/80 border border-white/30 hover:border-white'
                          }`}
                        >
                          {/* Pulsing Aura Ping */}
                          {(isSelected || isHovered) && (
                            <span
                              className="absolute inset-0 rounded-full animate-ping opacity-75"
                              style={{ backgroundColor: typeStyle.color }}
                            />
                          )}

                          {/* Marker Icon */}
                          <span style={{ color: typeStyle.color }}>
                            {getTypeIcon(pt.type, isSelected ? 'w-4 h-4' : 'w-3.5 h-3.5')}
                          </span>
                        </motion.button>

                        {/* Persistent Mini Label under Pin */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[0.62rem] font-bold whitespace-nowrap pointer-events-none transition-all ${
                            isSelected
                              ? 'bg-black/90 text-[#FFD700] border border-[#D4AF37]/50 shadow-md'
                              : isHovered
                              ? 'bg-black/80 text-white border border-white/30'
                              : 'bg-black/60 text-zinc-400 border border-black/40'
                          }`}
                        >
                          {pt.name.split(' (')[0]}
                        </div>

                        {/* Interactive Rich Hover Popover Preview */}
                        <AnimatePresence>
                          {isHovered && !isSelected && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-2 rounded-xl bg-black/95 backdrop-blur-md border border-[#D4AF37]/60 shadow-2xl z-40 pointer-events-none"
                            >
                              {pt.image && (
                                <div className="w-full h-20 rounded-lg overflow-hidden mb-2 relative">
                                  <img
                                    src={pt.image}
                                    alt={pt.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                  <span className="absolute bottom-1 left-1.5 text-[0.6rem] font-mono px-1.5 py-0.5 rounded bg-black/70 text-[#FFD700]">
                                    {pt.distance}
                                  </span>
                                </div>
                              )}
                              <h5 className="text-xs font-bold text-white mb-0.5 leading-tight">{pt.name}</h5>
                              <p className="text-[0.65rem] text-zinc-300 line-clamp-2">{pt.description}</p>
                              <div className="mt-1.5 flex items-center justify-between text-[0.6rem] text-zinc-400 border-t border-white/10 pt-1">
                                <span className="font-mono text-[#FFD700]">{pt.transitTime}</span>
                                <span>Click to inspect</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}

                  {/* Compass Rose in Corner */}
                  <div className="absolute bottom-10 right-4 w-14 h-14 pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
                    <Compass className="w-full h-full text-[#D4AF37] animate-spin-slow" />
                  </div>
                </motion.div>
              ) : (
                /* ================= LIVE OPENSTREETMAP SATELLITE / EMBED VIEW ================= */
                <div className="w-full h-full relative">
                  <iframe
                    title="EGY TOURS Hurghada Red Sea Live Map"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${(activePoint.lng - 0.035).toFixed(4)}%2C${(activePoint.lat - 0.025).toFixed(4)}%2C${(activePoint.lng + 0.035).toFixed(4)}%2C${(activePoint.lat + 0.025).toFixed(4)}&layer=mapnik&marker=${activePoint.lat}%2C${activePoint.lng}`}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: 'invert(90%) hue-rotate(180deg) contrast(120%) brightness(95%)',
                    }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}

              {/* Floating Active Point Pill Overlay with Parallax Motion */}
              <motion.div
                style={{ y: cardParallaxY }}
                className="absolute top-3 left-3 sm:top-4 sm:left-4 p-3 sm:p-4 rounded-xl bg-black/90 backdrop-blur-md border border-[#D4AF37]/50 max-w-[calc(100%-4.5rem)] sm:max-w-xs shadow-2xl z-30 select-none will-change-transform"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-ping" />
                    <span className="text-[0.65rem] font-bold text-[#FFD700] uppercase tracking-wider">
                      {activePoint.type}
                    </span>
                  </div>
                  {activePoint.distance && (
                    <span className="text-[0.65rem] px-1.5 py-0.5 rounded bg-white/10 font-mono text-zinc-300">
                      {activePoint.distance.split(' ')[0]} {activePoint.distance.split(' ')[1]}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 line-clamp-1">{activePoint.name}</h4>
                <p className="text-[0.7rem] text-zinc-300 line-clamp-2 leading-relaxed mb-2">
                  {activePoint.description}
                </p>

                <button
                  type="button"
                  onClick={e => handleCopyGps(e, activePoint)}
                  title="Click to copy GPS coordinates"
                  className="group/gps flex items-center justify-between gap-2 w-full px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 transition-all text-left cursor-pointer"
                >
                  <span className="text-[0.65rem] text-zinc-300 group-hover/gps:text-white font-mono">
                    GPS: {activePoint.lat.toFixed(4)}° N, {activePoint.lng.toFixed(4)}° E
                  </span>
                  <span className="inline-flex items-center text-[#FFD700]">
                    {copiedGps ? (
                      <span className="inline-flex items-center gap-1 text-[0.6rem] text-emerald-400 font-bold">
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </span>
                    ) : (
                      <Copy className="w-3 h-3 opacity-60 group-hover/gps:opacity-100 transition-opacity" />
                    )}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Location Explorer Sidebar & Active Dossier (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Active Destination Dossier Card */}
            <div className="rounded-2xl bg-[#111923] border-2 border-[#D4AF37]/40 shadow-xl overflow-hidden">
              {activePoint.image && (
                <div className="relative w-full h-36 overflow-hidden">
                  <img
                    src={activePoint.image}
                    alt={activePoint.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111923] via-black/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFD700] text-[0.65rem] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    {getTypeIcon(activePoint.type, 'w-3 h-3')}
                    <span>{activePoint.type}</span>
                  </div>
                  {activePoint.transitTime && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white text-[0.65rem] font-mono">
                      ⏱️ {activePoint.transitTime}
                    </div>
                  )}
                </div>
              )}

              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-white leading-tight">{activePoint.name}</h3>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">{activePoint.description}</p>

                {/* Highlights List */}
                {activePoint.highlights && activePoint.highlights.length > 0 && (
                  <div className="mb-4 space-y-1.5">
                    <div className="text-[0.68rem] font-bold text-[#FFD700] uppercase tracking-wider">Key Highlights:</div>
                    {activePoint.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Distance & Telemetry Matrix */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <div>
                    <div className="text-[0.65rem] text-zinc-400">Distance from Marina</div>
                    <div className="font-bold text-white font-mono">{activePoint.distance || '0 NM'}</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] text-zinc-400">Depth / Terrain</div>
                    <div className="font-bold text-white font-mono">{activePoint.depthOrTerrain || 'N/A'}</div>
                  </div>
                </div>

                {/* External Actions */}
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${activePoint.lat},${activePoint.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-xs py-3 w-full flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Exact Location in Google Maps</span>
                  </a>

                  {activePoint.tripId && (
                    <a
                      href="#trips-section"
                      className="px-4 py-2.5 rounded-xl bg-[#1a2636] hover:bg-[#223348] border border-white/10 hover:border-[#D4AF37]/50 text-xs font-bold text-zinc-200 hover:text-white transition-all text-center"
                    >
                      View Available Tour Packages
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Destination Directory List */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#101722] border border-white/10">
              <div className="flex items-center justify-between mb-3 px-1">
                <h4 className="text-xs font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Key Red Sea Coordinates</span>
                </h4>
                <span className="text-[0.65rem] text-zinc-400 font-mono">{filteredPoints.length} spots</span>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredPoints.map(pt => {
                  const isSelected = activePoint.id === pt.id;
                  const isHovered = hoveredPoint?.id === pt.id;
                  const typeStyle = getTypeColor(pt.type);

                  return (
                    <div
                      key={pt.id}
                      onClick={() => setActivePoint(pt)}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-[#D4AF37]/20 border-[#FFD700] shadow-md shadow-[#D4AF37]/15 scale-[1.01]'
                          : isHovered
                          ? 'bg-white/10 border-white/30 text-white'
                          : 'bg-[#0d141e] border-white/10 hover:border-white/20 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-lg flex-shrink-0 ${
                            isSelected ? 'bg-[#FFD700] text-black' : `${typeStyle.bg} ${typeStyle.text}`
                          }`}
                        >
                          {getTypeIcon(pt.type, 'w-3.5 h-3.5')}
                        </div>
                        <div className="min-w-0">
                          <h5 className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                            {pt.name}
                          </h5>
                          <p className="text-[0.65rem] text-zinc-400 font-mono truncate">{pt.distance}</p>
                        </div>
                      </div>

                      <span className="text-[0.65rem] px-2 py-0.5 rounded bg-black/40 text-zinc-400 uppercase font-mono flex-shrink-0">
                        {pt.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Global HQ Office & Logistics Footer Strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0f1722] border border-white/10 flex items-center justify-center gap-3 shadow-md">
            <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
            <div className="text-left">
              <div className="text-[0.7rem] text-zinc-400">Headquarters Pier Dock</div>
              <div className="text-xs font-bold text-white">Hurghada Marina Pier, Red Sea, Egypt</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f1722] border border-white/10 flex items-center justify-center gap-3 shadow-md">
            <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
            <div className="text-left">
              <div className="text-[0.7rem] text-zinc-400">24/7 VIP Concierge & Booking</div>
              <a href="tel:+201025221269" className="text-xs font-bold text-[#FFD700] hover:underline">
                +20 1025221269
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0f1722] border border-white/10 flex items-center justify-center gap-3 shadow-md">
            <Anchor className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
            <div className="text-left">
              <div className="text-[0.7rem] text-zinc-400">Complimentary Hotel Pickup</div>
              <div className="text-xs font-bold text-white">Hurghada, El Gouna, Makadi & Sahl Hasheesh</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
