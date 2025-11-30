import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  Crown,
  MapPin,
  Maximize2,
  Phone,
  Mail,
  Home,
  Search,
  Building2,
  Heart,
  User,
  ChevronRight,
  Sparkles,
  Shield,
  Star,
  Landmark,
  Eye,
  Calendar,
  Download,
  FileText,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Plot {
  id: string;
  number: string;
  size: string;
  sqm: number;
  status: 'available' | 'reserved' | 'sold';
  tier: 'Standard' | 'Premium' | 'Signature';
  price: number;
  feature?: string;
  path: string;
  labelX: number;
  labelY: number;
}

const SurveyPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'request'>('map');

  const plots: Plot[] = [
    { id: '1', number: 'PART 10', size: '32m × 20m', sqm: 640, status: 'available', tier: 'Premium', price: 18000000, feature: 'Corner Plot with Dual Road Frontage', path: 'M 45 65 L 125 65 L 125 125 L 45 125 Z', labelX: 85, labelY: 95 },
    { id: '2', number: 'PART 11', size: '30m × 20m', sqm: 600, status: 'sold', tier: 'Standard', price: 15000000, path: 'M 130 65 L 200 65 L 200 125 L 130 125 Z', labelX: 165, labelY: 95 },
    { id: '3', number: 'PART 12', size: '30m × 20m', sqm: 600, status: 'available', tier: 'Standard', price: 15000000, path: 'M 205 65 L 275 65 L 275 125 L 205 125 Z', labelX: 240, labelY: 95 },
    { id: '4', number: 'PART 13', size: '32m × 20m', sqm: 640, status: 'reserved', tier: 'Premium', price: 18000000, feature: 'Corner Plot', path: 'M 280 65 L 360 65 L 360 125 L 280 125 Z', labelX: 320, labelY: 95 },
    { id: '5', number: 'PART 14', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Signature', price: 22000000, feature: 'Prime Central Location', path: 'M 45 135 L 125 135 L 125 200 L 45 200 Z', labelX: 85, labelY: 167 },
    { id: '6', number: 'PART 15', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Standard', price: 16000000, path: 'M 130 135 L 200 135 L 200 200 L 130 200 Z', labelX: 165, labelY: 167 },
    { id: '7', number: 'PART 16', size: '30m × 22m', sqm: 660, status: 'sold', tier: 'Standard', price: 16000000, path: 'M 205 135 L 275 135 L 275 200 L 205 200 Z', labelX: 240, labelY: 167 },
    { id: '8', number: 'PART 17', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Premium', price: 19000000, feature: 'Garden View', path: 'M 280 135 L 360 135 L 360 200 L 280 200 Z', labelX: 320, labelY: 167 },
    { id: '9', number: 'PART 18', size: '28m × 20m', sqm: 560, status: 'available', tier: 'Standard', price: 14000000, path: 'M 45 210 L 115 210 L 115 270 L 45 270 Z', labelX: 80, labelY: 240 },
    { id: '10', number: 'PART 19', size: '28m × 20m', sqm: 560, status: 'reserved', tier: 'Standard', price: 14000000, path: 'M 120 210 L 190 210 L 190 270 L 120 270 Z', labelX: 155, labelY: 240 },
    { id: '11', number: 'PART 20', size: '28m × 20m', sqm: 560, status: 'available', tier: 'Standard', price: 14000000, path: 'M 195 210 L 265 210 L 265 270 L 195 270 Z', labelX: 230, labelY: 240 },
    { id: '12', number: 'PART 21', size: '32m × 20m', sqm: 640, status: 'available', tier: 'Signature', price: 24000000, feature: 'Premium Corner with Park Access', path: 'M 270 210 L 360 210 L 360 270 L 270 270 Z', labelX: 315, labelY: 240 },
    { id: '13', number: 'PART 22', size: '35m × 22m', sqm: 770, status: 'sold', tier: 'Signature', price: 28000000, feature: 'Estate Entrance Plot', path: 'M 45 290 L 140 290 L 140 355 L 45 355 Z', labelX: 92, labelY: 322 },
    { id: '14', number: 'PART 23', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Premium', price: 20000000, feature: 'Central Boulevard View', path: 'M 145 290 L 225 290 L 225 355 L 145 355 Z', labelX: 185, labelY: 322 },
    { id: '15', number: 'PART 24', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Standard', price: 16000000, path: 'M 230 290 L 310 290 L 310 355 L 230 355 Z', labelX: 270, labelY: 322 },
    { id: '16', number: 'PART 25', size: '35m × 22m', sqm: 770, status: 'available', tier: 'Premium', price: 21000000, feature: 'Corner Plot', path: 'M 315 290 L 400 290 L 400 355 L 315 355 Z', labelX: 357, labelY: 322 },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Signature': return '#c9a961';
      case 'Premium': return '#0d6e5d';
      default: return '#0f3d5c';
    }
  };

  const formatPrice = (amount: number) => `₦${(amount / 1000000).toFixed(0)}M`;

  const filteredPlot = searchQuery ? plots.find(p => p.number.toLowerCase().includes(searchQuery.toLowerCase())) : null;

  const isActive = (path: string) => location.pathname === path;

  const handleReserve = () => {
    setShowReserveModal(false);
    setSelectedPlot(null);
    toast.success('Plot reserved! Our team will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-5 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961] rounded-full blur-[80px]" />
        </div>
        <div className="relative flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#c9a961]" />
              <h1 className="text-white font-serif text-lg font-bold">Estate Survey Plan</h1>
            </div>
            <p className="text-white/50 text-[10px] tracking-widest uppercase">Legacy Estate • Master Plan</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'map' ? 'bg-[#c9a961] text-[#1a1a2e]' : 'text-white/70'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            Master Plan
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'request' ? 'bg-[#c9a961] text-[#1a1a2e]' : 'text-white/70'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Request Plan
          </button>
        </div>
      </header>

      {activeTab === 'map' ? (
        <div className="px-4 py-4 space-y-4">
          {/* Estate Story Banner */}
          <div className="relative bg-gradient-to-r from-[#1a1a2e] to-[#0f3d5c] rounded-2xl p-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a961]/20 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="w-10 h-10 bg-[#c9a961]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-[#c9a961]" />
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-sm mb-1">A Legacy in the Making</h3>
                <p className="text-white/60 text-[10px] leading-relaxed">
                  Invest in a curated community. Each plot is a canvas for your dream, backed by our lifetime management expertise.
                </p>
              </div>
            </div>
          </div>

          {/* Search & Legend Panel */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-lg">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Plot ID (e.g., PART 24)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f8f6f1] rounded-xl text-sm text-[#1a1a2e] placeholder-[#8b6947]/50 border border-[#c9a961]/20 focus:outline-none focus:border-[#c9a961] font-serif"
              />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#e8f5e9] border border-[#2e7d32]" />
                <span className="text-[#1a1a2e]">Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#fff8e1] border border-[#c9a961]" />
                <span className="text-[#1a1a2e]">Reserved</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-[#f5f5f5] border border-[#999]">
                  <svg viewBox="0 0 12 12" className="w-full h-full">
                    <line x1="0" y1="0" x2="12" y2="12" stroke="#999" strokeWidth="1" />
                    <line x1="12" y1="0" x2="0" y2="12" stroke="#999" strokeWidth="1" />
                  </svg>
                </div>
                <span className="text-[#1a1a2e]">Sold</span>
              </div>
            </div>
          </div>

          {/* THE MAGNIFICENT MAP */}
          <div className="bg-white rounded-2xl border border-[#c9a961]/30 shadow-xl overflow-hidden">
            {/* Map Title Bar */}
            <div className="bg-[#1a1a2e] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-[#c9a961] rounded flex items-center justify-center">
                  <Crown className="w-3 h-3 text-[#c9a961]" />
                </div>
                <div>
                  <p className="text-[#c9a961] font-serif text-xs font-bold tracking-wide">LEGACY ESTATE</p>
                  <p className="text-white/40 text-[8px] tracking-widest">INDEPENDENCE LAYOUT • ENUGU</p>
                </div>
              </div>
              <button className="p-1.5 bg-white/10 rounded-lg">
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Survey Map Canvas - Parchment Style */}
            <div 
              className="relative overflow-auto"
              style={{ 
                background: 'linear-gradient(135deg, #f8f6f1 0%, #f0ebe3 50%, #e8e2d9 100%)',
                minHeight: '420px'
              }}
            >
              {/* Parchment Texture Overlay */}
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
              />

              <svg viewBox="0 0 440 420" className="w-full min-w-[440px]" style={{ minHeight: '420px' }}>
                {/* Decorative Border */}
                <rect x="5" y="5" width="430" height="410" fill="none" stroke="#c9a961" strokeWidth="2" opacity="0.3" />
                <rect x="10" y="10" width="420" height="400" fill="none" stroke="#1a1a2e" strokeWidth="0.5" opacity="0.2" />

                {/* Grid Pattern */}
                <defs>
                  <pattern id="sketchGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8b6947" strokeWidth="0.2" opacity="0.3"/>
                  </pattern>
                  <pattern id="crosshatch" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M 0 0 L 6 6 M 6 0 L 0 6" stroke="#666" strokeWidth="0.5" opacity="0.5"/>
                  </pattern>
                </defs>
                <rect x="20" y="40" width="400" height="340" fill="url(#sketchGrid)" />

                {/* Roads - Sketched Style */}
                {/* Main Hope Road - Top */}
                <path d="M 20 50 L 420 50" stroke="#4a4a4a" strokeWidth="12" strokeLinecap="round" opacity="0.15" />
                <path d="M 20 50 L 420 50" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="4,2" />
                <text x="220" y="46" className="text-[7px] fill-[#4a4a4a] font-serif font-bold tracking-widest" textAnchor="middle">HOPE ROAD</text>

                {/* South Hope Road - Bottom */}
                <path d="M 20 370 L 420 370" stroke="#4a4a4a" strokeWidth="12" strokeLinecap="round" opacity="0.15" />
                <path d="M 20 370 L 420 370" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="4,2" />
                <text x="220" y="382" className="text-[7px] fill-[#4a4a4a] font-serif font-bold tracking-widest" textAnchor="middle">SOUTH HOPE ROAD</text>

                {/* Street W - Left Side */}
                <path d="M 30 60 L 30 360" stroke="#4a4a4a" strokeWidth="10" strokeLinecap="round" opacity="0.15" />
                <path d="M 30 60 L 30 360" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="4,2" />
                <text x="22" y="210" className="text-[6px] fill-[#4a4a4a] font-serif font-bold" textAnchor="middle" transform="rotate(-90, 22, 210)">STREET W</text>

                {/* Street E - Right Side */}
                <path d="M 410 60 L 410 360" stroke="#4a4a4a" strokeWidth="10" strokeLinecap="round" opacity="0.15" />
                <path d="M 410 60 L 410 360" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="4,2" />

                {/* Internal Road */}
                <path d="M 200 130 L 200 280" stroke="#4a4a4a" strokeWidth="8" strokeLinecap="round" opacity="0.1" />
                <path d="M 200 130 L 200 280" stroke="#4a4a4a" strokeWidth="0.5" strokeDasharray="3,2" />

                {/* PLOTS */}
                {plots.map((plot) => {
                  const isHovered = hoveredPlot === plot.id;
                  const isSearched = filteredPlot?.id === plot.id;
                  const isSelected = selectedPlot?.id === plot.id;

                  let fillColor = '#e8f5e9';
                  let strokeColor = '#2e7d32';
                  let strokeStyle = '';
                  let fillPattern = '';

                  if (plot.status === 'sold') {
                    fillColor = '#f5f5f5';
                    strokeColor = '#888';
                    fillPattern = 'url(#crosshatch)';
                    strokeStyle = '4,2';
                  } else if (plot.status === 'reserved') {
                    fillColor = '#fff8e1';
                    strokeColor = '#c9a961';
                    strokeStyle = '4,2';
                  }

                  if (plot.tier === 'Signature' && plot.status === 'available') {
                    strokeColor = '#c9a961';
                  } else if (plot.tier === 'Premium' && plot.status === 'available') {
                    strokeColor = '#0d6e5d';
                  }

                  return (
                    <g
                      key={plot.id}
                      onClick={() => plot.status === 'available' && setSelectedPlot(plot)}
                      onMouseEnter={() => setHoveredPlot(plot.id)}
                      onMouseLeave={() => setHoveredPlot(null)}
                      style={{ cursor: plot.status === 'available' ? 'pointer' : 'default' }}
                      className="transition-all duration-300"
                    >
                      {/* Plot Shape */}
                      <path
                        d={plot.path}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={isHovered || isSearched || isSelected ? 2.5 : 1.5}
                        strokeDasharray={strokeStyle}
                        opacity={isHovered || isSearched ? 1 : 0.9}
                        className="transition-all duration-300"
                      />
                      {plot.status === 'sold' && (
                        <path d={plot.path} fill="url(#crosshatch)" opacity="0.5" />
                      )}

                      {/* Glow Effect for Hover */}
                      {(isHovered || isSearched) && plot.status === 'available' && (
                        <path
                          d={plot.path}
                          fill="none"
                          stroke="#c9a961"
                          strokeWidth="4"
                          opacity="0.3"
                          className="animate-pulse"
                        />
                      )}

                      {/* Plot Number */}
                      <text
                        x={plot.labelX}
                        y={plot.labelY - 8}
                        className="font-serif font-bold"
                        style={{ fontSize: '8px', fill: '#1a1a2e' }}
                        textAnchor="middle"
                      >
                        {plot.number}
                      </text>

                      {/* Plot Size */}
                      <text
                        x={plot.labelX}
                        y={plot.labelY + 4}
                        style={{ fontSize: '6px', fill: '#666' }}
                        textAnchor="middle"
                      >
                        {plot.sqm} sqm
                      </text>

                      {/* Tier Badge for Premium/Signature */}
                      {plot.tier !== 'Standard' && plot.status === 'available' && (
                        <g>
                          <circle cx={plot.labelX + 25} cy={plot.labelY - 15} r="6" fill={getTierColor(plot.tier)} />
                          <Star x={plot.labelX + 22} y={plot.labelY - 18} className="w-2 h-2 text-white fill-white" style={{ fontSize: '6px' }} />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Compass Rose */}
                <g transform="translate(385, 395)">
                  <circle cx="0" cy="0" r="18" fill="#f8f6f1" stroke="#1a1a2e" strokeWidth="1" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#c9a961" strokeWidth="0.5" />
                  <polygon points="0,-12 3,4 0,0 -3,4" fill="#1a1a2e" />
                  <polygon points="0,12 3,-4 0,0 -3,-4" fill="#c9a961" opacity="0.5" />
                  <text x="0" y="-20" className="text-[7px] fill-[#1a1a2e] font-serif font-bold" textAnchor="middle">N</text>
                </g>

                {/* Scale Bar */}
                <g transform="translate(50, 395)">
                  <rect x="0" y="0" width="25" height="4" fill="#1a1a2e" />
                  <rect x="25" y="0" width="25" height="4" fill="none" stroke="#1a1a2e" strokeWidth="0.5" />
                  <rect x="50" y="0" width="25" height="4" fill="#1a1a2e" />
                  <text x="0" y="12" className="text-[6px] fill-[#1a1a2e]">0</text>
                  <text x="37" y="12" className="text-[6px] fill-[#1a1a2e]">50m</text>
                  <text x="75" y="12" className="text-[6px] fill-[#1a1a2e]">100m</text>
                </g>

                {/* Estate Crest/Logo */}
                <g transform="translate(220, 395)">
                  <rect x="-50" y="-10" width="100" height="20" fill="#1a1a2e" rx="2" />
                  <text x="0" y="3" className="text-[7px] fill-[#c9a961] font-serif font-bold tracking-wider" textAnchor="middle">LEGACY ESTATE © 2024</text>
                </g>
              </svg>
            </div>

            {/* Stats Bar */}
            <div className="bg-[#1a1a2e] px-4 py-3 grid grid-cols-4 gap-2">
              <div className="text-center">
                <p className="text-[#c9a961] text-[9px]">Total Plots</p>
                <p className="text-white font-bold text-sm">16</p>
              </div>
              <div className="text-center">
                <p className="text-[#c9a961] text-[9px]">Available</p>
                <p className="text-emerald-400 font-bold text-sm">11</p>
              </div>
              <div className="text-center">
                <p className="text-[#c9a961] text-[9px]">Reserved</p>
                <p className="text-amber-400 font-bold text-sm">2</p>
              </div>
              <div className="text-center">
                <p className="text-[#c9a961] text-[9px]">Sold</p>
                <p className="text-white/50 font-bold text-sm">3</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#c9a961]/10 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#c9a961]" />
              </div>
              <div className="flex-1">
                <p className="text-[#1a1a2e] font-serif font-bold text-sm">Investment Desk</p>
                <p className="text-[#8b6947] text-xs">+234 801 234 5678</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c9a961]" />
            </div>
          </div>
        </div>
      ) : (
        /* Request Tab Content */
        <div className="px-4 py-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/20 space-y-3">
            <h3 className="text-[#1a1a2e] font-serif font-bold text-sm">Request Survey Plan</h3>
            <input type="text" placeholder="Property Address" className="w-full px-3 py-2.5 bg-[#f8f6f1] border border-[#c9a961]/20 rounded-xl text-sm" />
            <input type="text" placeholder="Plot Size (sqm)" className="w-full px-3 py-2.5 bg-[#f8f6f1] border border-[#c9a961]/20 rounded-xl text-sm" />
            <input type="text" placeholder="Your Name" className="w-full px-3 py-2.5 bg-[#f8f6f1] border border-[#c9a961]/20 rounded-xl text-sm" />
            <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2.5 bg-[#f8f6f1] border border-[#c9a961]/20 rounded-xl text-sm" />
            <button className="w-full py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold text-sm">
              Submit Request
            </button>
          </div>
        </div>
      )}

      {/* Plot Detail Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPlot(null)}>
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#0f3d5c] p-4 relative">
              <button onClick={() => setSelectedPlot(null)} className="absolute top-4 right-4 p-1 bg-white/10 rounded-full">
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#c9a961]/20 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#c9a961]" />
                </div>
                <div>
                  <p className="text-[#c9a961] text-[10px] font-medium uppercase tracking-widest">{selectedPlot.tier} Plot</p>
                  <h3 className="text-white font-serif text-xl font-bold">{selectedPlot.number}</h3>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Specs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8f6f1] rounded-xl p-3">
                  <p className="text-[#8b6947] text-[10px]">Plot Size</p>
                  <p className="text-[#1a1a2e] font-bold">{selectedPlot.sqm} sqm</p>
                </div>
                <div className="bg-[#f8f6f1] rounded-xl p-3">
                  <p className="text-[#8b6947] text-[10px]">Dimensions</p>
                  <p className="text-[#1a1a2e] font-bold">{selectedPlot.size}</p>
                </div>
              </div>

              {/* Feature */}
              {selectedPlot.feature && (
                <div className="flex items-center gap-2 p-3 bg-[#c9a961]/10 rounded-xl border border-[#c9a961]/20">
                  <Sparkles className="w-4 h-4 text-[#c9a961]" />
                  <span className="text-[#1a1a2e] text-sm font-medium">{selectedPlot.feature}</span>
                </div>
              )}

              {/* Price */}
              <div className="text-center py-3 bg-gradient-to-r from-[#0d6e5d]/10 to-[#0f3d5c]/10 rounded-xl">
                <p className="text-[#8b6947] text-xs mb-1">Investment Value</p>
                <p className="text-[#0d6e5d] font-serif text-2xl font-bold">{formatPrice(selectedPlot.price)}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowReserveModal(true)}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Reserve This Plot
                </button>
                <button className="py-3.5 px-4 bg-[#f8f6f1] border border-[#c9a961]/30 rounded-xl">
                  <Eye className="w-5 h-5 text-[#8b6947]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reserve Confirmation Modal */}
      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-[#c9a961]/10 rounded-2xl flex items-center justify-center">
                <Check className="w-8 h-8 text-[#c9a961]" />
              </div>
              <h3 className="font-serif text-[#1a1a2e] font-bold text-lg">Confirm Reservation</h3>
              <p className="text-[#8b6947] text-sm mt-1">Reserve {selectedPlot?.number} for {formatPrice(selectedPlot?.price || 0)}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReserveModal(false)} className="flex-1 py-3 bg-[#f8f6f1] rounded-xl text-[#8b6947] font-medium">
                Cancel
              </button>
              <button onClick={handleReserve} className="flex-1 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${isActive(item.path) ? 'bg-gradient-to-r from-[#1a1a2e] to-[#0f3d5c]' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] ${isActive(item.path) ? 'text-[#1a1a2e]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SurveyPlan;