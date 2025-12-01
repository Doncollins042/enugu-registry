import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Shield,
  CheckCircle2,
  Lock,
  ChevronRight,
  Crown,
  Sparkles,
  Star,
  Eye,
  X,
  Home,
  Search,
  Building2,
  Heart,
  User,
  Phone,
  Landmark,
  Maximize2
} from 'lucide-react';
import toast from 'react-hot-toast';

// Demo estates data
const DEMO_ESTATES = [
  {
    id: 1,
    name: 'Legacy Estate',
    slug: 'legacy-estate',
    location: 'Independence Layout, Enugu',
    description: 'Premium residential estate with modern infrastructure and 24/7 security.',
    totalArea: '12.5 Hectares',
    amenities: ['24/7 Security', 'Paved Roads', 'Drainage System', 'Street Lights', 'Green Areas'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  },
  {
    id: 2,
    name: 'Royal Gardens',
    slug: 'royal-gardens',
    location: 'Trans-Ekulu, Enugu',
    description: 'Serene garden estate with beautiful landscaping and family-friendly environment.',
    totalArea: '8.2 Hectares',
    amenities: ['Gated Community', 'Central Park', 'Playground', 'Water Supply', 'Power Supply'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    id: 3,
    name: 'Diamond Heights',
    slug: 'diamond-heights',
    location: 'New Haven, Enugu',
    description: 'Exclusive hilltop estate offering panoramic views of Enugu city.',
    totalArea: '15.0 Hectares',
    amenities: ['Hilltop Location', 'Private Roads', 'Club House', 'Tennis Court', 'Swimming Pool'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  },
  {
    id: 4,
    name: 'Green Valley Estate',
    slug: 'green-valley-estate',
    location: 'Abakpa Nike, Enugu',
    description: 'Affordable housing estate with modern amenities for young families.',
    totalArea: '20.0 Hectares',
    amenities: ['Affordable Pricing', 'Flexible Payment', 'Good Roads', 'Schools Nearby'],
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
  },
  {
    id: 5,
    name: 'Centenary City',
    slug: 'centenary-city',
    location: 'Enugu East, Enugu',
    description: 'Mixed-use development with residential and commercial plots.',
    totalArea: '35.0 Hectares',
    amenities: ['Commercial Zones', 'Residential Zones', 'Shopping Mall', 'Hotels'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    id: 6,
    name: 'Paradise Gardens',
    slug: 'paradise-gardens',
    location: 'Agbani Road, Enugu',
    description: 'Beautiful estate with lush greenery and serene environment.',
    totalArea: '10.0 Hectares',
    amenities: ['Garden Views', 'Quiet Environment', 'Family Friendly', 'Near Schools'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  },
];

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

// Generate plots for each estate
const generatePlots = (estateName: string): Plot[] => {
  const basePlots: Plot[] = [
    { id: '1', number: 'PLOT 01', size: '32m × 20m', sqm: 640, status: 'available', tier: 'Premium', price: 18000000, feature: 'Corner Plot with Dual Road Frontage', path: 'M 45 65 L 125 65 L 125 125 L 45 125 Z', labelX: 85, labelY: 95 },
    { id: '2', number: 'PLOT 02', size: '30m × 20m', sqm: 600, status: 'sold', tier: 'Standard', price: 15000000, path: 'M 130 65 L 195 65 L 195 125 L 130 125 Z', labelX: 162, labelY: 95 },
    { id: '3', number: 'PLOT 03', size: '30m × 20m', sqm: 600, status: 'available', tier: 'Standard', price: 15000000, path: 'M 200 65 L 270 65 L 270 125 L 200 125 Z', labelX: 235, labelY: 95 },
    { id: '4', number: 'PLOT 04', size: '32m × 20m', sqm: 640, status: 'reserved', tier: 'Premium', price: 18000000, feature: 'Corner Plot', path: 'M 275 65 L 355 65 L 355 125 L 275 125 Z', labelX: 315, labelY: 95 },
    { id: '5', number: 'PLOT 05', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Signature', price: 22000000, feature: 'Prime Central Location', path: 'M 45 135 L 125 135 L 125 195 L 45 195 Z', labelX: 85, labelY: 165 },
    { id: '6', number: 'PLOT 06', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Standard', price: 16000000, path: 'M 130 135 L 195 135 L 195 195 L 130 195 Z', labelX: 162, labelY: 165 },
    { id: '7', number: 'PLOT 07', size: '30m × 22m', sqm: 660, status: 'sold', tier: 'Standard', price: 16000000, path: 'M 200 135 L 270 135 L 270 195 L 200 195 Z', labelX: 235, labelY: 165 },
    { id: '8', number: 'PLOT 08', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Premium', price: 19000000, feature: 'Garden View', path: 'M 275 135 L 355 135 L 355 195 L 275 195 Z', labelX: 315, labelY: 165 },
    { id: '9', number: 'PLOT 09', size: '28m × 20m', sqm: 560, status: 'available', tier: 'Standard', price: 14000000, path: 'M 45 205 L 115 205 L 115 265 L 45 265 Z', labelX: 80, labelY: 235 },
    { id: '10', number: 'PLOT 10', size: '28m × 20m', sqm: 560, status: 'reserved', tier: 'Standard', price: 14000000, path: 'M 120 205 L 190 205 L 190 265 L 120 265 Z', labelX: 155, labelY: 235 },
    { id: '11', number: 'PLOT 11', size: '28m × 20m', sqm: 560, status: 'available', tier: 'Standard', price: 14000000, path: 'M 195 205 L 265 205 L 265 265 L 195 265 Z', labelX: 230, labelY: 235 },
    { id: '12', number: 'PLOT 12', size: '32m × 20m', sqm: 640, status: 'available', tier: 'Signature', price: 24000000, feature: 'Premium Corner with Park Access', path: 'M 270 205 L 355 205 L 355 265 L 270 265 Z', labelX: 312, labelY: 235 },
    { id: '13', number: 'PLOT 13', size: '35m × 22m', sqm: 770, status: 'sold', tier: 'Signature', price: 28000000, feature: 'Estate Entrance Plot', path: 'M 45 280 L 135 280 L 135 345 L 45 345 Z', labelX: 90, labelY: 312 },
    { id: '14', number: 'PLOT 14', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Premium', price: 20000000, feature: 'Central Boulevard View', path: 'M 140 280 L 220 280 L 220 345 L 140 345 Z', labelX: 180, labelY: 312 },
    { id: '15', number: 'PLOT 15', size: '30m × 22m', sqm: 660, status: 'available', tier: 'Standard', price: 16000000, path: 'M 225 280 L 305 280 L 305 345 L 225 345 Z', labelX: 265, labelY: 312 },
    { id: '16', number: 'PLOT 16', size: '35m × 22m', sqm: 770, status: 'available', tier: 'Premium', price: 21000000, feature: 'Corner Plot', path: 'M 310 280 L 395 280 L 395 345 L 310 345 Z', labelX: 352, labelY: 312 },
  ];
  return basePlots;
};

const EstateDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [estate, setEstate] = useState<typeof DEMO_ESTATES[0] | null>(null);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundEstate = DEMO_ESTATES.find(e => e.slug === slug);
    if (foundEstate) {
      setEstate(foundEstate);
      setPlots(generatePlots(foundEstate.name));
    }
    setLoading(false);
  }, [slug]);

  const formatPrice = (amount: number) => `₦${(amount / 1000000).toFixed(0)}M`;

  const handleSelectPlot = (plot: Plot) => {
    if (plot.status === 'available') {
      setSelectedPlot(plot);
    } else if (plot.status === 'sold') {
      toast.error('This plot has been sold');
    } else {
      toast.error('This plot is reserved');
    }
  };

  const handleProceedToPayment = () => {
    if (selectedPlot && estate) {
      localStorage.setItem('selectedPlot', JSON.stringify(selectedPlot));
      localStorage.setItem('selectedEstate', JSON.stringify(estate));
      navigate('/land-payment-summary', {
        state: { plot: selectedPlot, estate }
      });
    }
  };

  const filteredPlot = searchQuery ? plots.find(p => p.number.toLowerCase().includes(searchQuery.toLowerCase())) : null;

  const stats = {
    total: plots.length,
    available: plots.filter(p => p.status === 'available').length,
    reserved: plots.filter(p => p.status === 'reserved').length,
    sold: plots.filter(p => p.status === 'sold').length,
  };

  const isActive = (path: string) => location.pathname === path;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f1] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#c9a961] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!estate) {
    return (
      <div className="min-h-screen bg-[#f8f6f1] flex flex-col items-center justify-center p-6">
        <p className="text-[#1a1a2e] font-bold text-lg mb-4">Estate not found</p>
        <button onClick={() => navigate('/search')} className="px-6 py-3 bg-[#c9a961] text-white rounded-xl">
          Browse Estates
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f1] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-5 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961] rounded-full blur-[80px]" />
        </div>
        <div className="relative flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#c9a961]" />
              <h1 className="text-white font-serif text-lg font-bold">{estate.name}</h1>
            </div>
            <p className="text-white/50 text-[10px] flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {estate.location}
            </p>
          </div>
        </div>
      </header>

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
              <p className="text-white/60 text-[10px] leading-relaxed">{estate.description}</p>
            </div>
          </div>
        </div>

        {/* Search & Legend Panel */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-lg">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Plot ID (e.g., PLOT 01)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#f8f6f1] rounded-xl text-sm text-[#1a1a2e] placeholder-[#8b6947]/50 border border-[#c9a961]/20 focus:outline-none focus:border-[#c9a961] font-serif"
            />
          </div>
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
              <div className="w-3 h-3 rounded bg-[#f5f5f5] border border-[#999] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-[#999] rotate-45" />
                </div>
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
                <p className="text-[#c9a961] font-serif text-xs font-bold tracking-wide">{estate.name.toUpperCase()}</p>
                <p className="text-white/40 text-[8px] tracking-widest">{estate.location.toUpperCase()}</p>
              </div>
            </div>
            <button className="p-1.5 bg-white/10 rounded-lg">
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Survey Map Canvas */}
          <div
            className="relative overflow-auto"
            style={{
              background: 'linear-gradient(135deg, #f8f6f1 0%, #f0ebe3 50%, #e8e2d9 100%)',
              minHeight: '380px'
            }}
          >
            {/* Parchment Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
            />

            <svg viewBox="0 0 420 400" className="w-full min-w-[420px]" style={{ minHeight: '380px' }}>
              {/* Background Pattern */}
              <defs>
                <pattern id="sketchGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8b6947" strokeWidth="0.2" opacity="0.3" />
                </pattern>
                <pattern id="crosshatch" width="6" height="6" patternUnits="userSpaceOnUse">
                  <path d="M 0 0 L 6 6 M 6 0 L 0 6" stroke="#666" strokeWidth="0.5" opacity="0.4" />
                </pattern>
              </defs>

              {/* Decorative Border */}
              <rect x="5" y="5" width="410" height="390" fill="none" stroke="#c9a961" strokeWidth="2" opacity="0.3" />
              <rect x="10" y="10" width="400" height="380" fill="none" stroke="#1a1a2e" strokeWidth="0.5" opacity="0.2" />
              <rect x="20" y="40" width="380" height="320" fill="url(#sketchGrid)" />

              {/* Roads */}
              {/* Main Road - Top */}
              <path d="M 20 50 L 400 50" stroke="#4a4a4a" strokeWidth="12" strokeLinecap="round" opacity="0.12" />
              <path d="M 20 50 L 400 50" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="5,3" />
              <text x="210" y="44" fontFamily="serif" fontSize="7" fill="#4a4a4a" fontWeight="600" textAnchor="middle" letterSpacing="2">MAIN BOULEVARD</text>

              {/* Bottom Road */}
              <path d="M 20 360 L 400 360" stroke="#4a4a4a" strokeWidth="12" strokeLinecap="round" opacity="0.12" />
              <path d="M 20 360 L 400 360" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="5,3" />
              <text x="210" y="375" fontFamily="serif" fontSize="7" fill="#4a4a4a" fontWeight="600" textAnchor="middle" letterSpacing="2">CRESCENT DRIVE</text>

              {/* Left Road */}
              <path d="M 30 60 L 30 350" stroke="#4a4a4a" strokeWidth="10" strokeLinecap="round" opacity="0.12" />
              <path d="M 30 60 L 30 350" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="5,3" />
              <text x="20" y="200" fontFamily="serif" fontSize="6" fill="#4a4a4a" fontWeight="600" textAnchor="middle" transform="rotate(-90, 20, 200)" letterSpacing="2">AVENUE A</text>

              {/* Right Road */}
              <path d="M 390 60 L 390 350" stroke="#4a4a4a" strokeWidth="10" strokeLinecap="round" opacity="0.12" />
              <path d="M 390 60 L 390 350" stroke="#4a4a4a" strokeWidth="1" strokeDasharray="5,3" />

              {/* Internal Road */}
              <path d="M 195 130 L 195 270" stroke="#4a4a4a" strokeWidth="8" strokeLinecap="round" opacity="0.08" />
              <path d="M 195 130 L 195 270" stroke="#4a4a4a" strokeWidth="0.5" strokeDasharray="4,2" />

              {/* PLOTS */}
              {plots.map((plot) => {
                const isHovered = hoveredPlot === plot.id;
                const isSearched = filteredPlot?.id === plot.id;
                const isSelected = selectedPlot?.id === plot.id;

                let fillColor = '#e8f5e9';
                let strokeColor = '#2e7d32';
                let strokeStyle = '';

                if (plot.status === 'sold') {
                  fillColor = '#f5f5f5';
                  strokeColor = '#888';
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
                    onClick={() => handleSelectPlot(plot)}
                    onMouseEnter={() => setHoveredPlot(plot.id)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    style={{ cursor: plot.status === 'available' ? 'pointer' : 'default' }}
                  >
                    {/* Plot Shape */}
                    <path
                      d={plot.path}
                      fill={fillColor}
                      stroke={isSelected ? '#c9a961' : strokeColor}
                      strokeWidth={isHovered || isSearched || isSelected ? 2.5 : 1.5}
                      strokeDasharray={strokeStyle}
                      opacity={isHovered || isSearched ? 1 : 0.9}
                      className="transition-all duration-200"
                    />
                    {plot.status === 'sold' && (
                      <path d={plot.path} fill="url(#crosshatch)" opacity="0.5" />
                    )}

                    {/* Glow Effect */}
                    {(isHovered || isSearched || isSelected) && plot.status === 'available' && (
                      <path d={plot.path} fill="none" stroke="#c9a961" strokeWidth="4" opacity="0.3" />
                    )}

                    {/* Plot Number */}
                    <text x={plot.labelX} y={plot.labelY - 6} fontFamily="serif" fontSize="8" fill="#1a1a2e" fontWeight="700" textAnchor="middle">
                      {plot.number}
                    </text>

                    {/* Plot Size */}
                    <text x={plot.labelX} y={plot.labelY + 6} fontSize="6" fill="#666" textAnchor="middle">
                      {plot.sqm} sqm
                    </text>

                    {/* Tier Badge */}
                    {plot.tier !== 'Standard' && plot.status === 'available' && (
                      <g>
                        <circle cx={plot.labelX + 25} cy={plot.labelY - 15} r="5" fill={plot.tier === 'Signature' ? '#c9a961' : '#0d6e5d'} />
                        <text x={plot.labelX + 25} y={plot.labelY - 12} fontSize="5" fill="white" textAnchor="middle">★</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Compass Rose */}
              <g transform="translate(375, 380)">
                <circle cx="0" cy="0" r="15" fill="#f8f6f1" stroke="#1a1a2e" strokeWidth="1" />
                <polygon points="0,-10 2,3 0,0 -2,3" fill="#1a1a2e" />
                <text x="0" y="-18" fontFamily="serif" fontSize="7" fill="#1a1a2e" fontWeight="700" textAnchor="middle">N</text>
              </g>

              {/* Scale Bar */}
              <g transform="translate(50, 380)">
                <rect x="0" y="0" width="20" height="4" fill="#1a1a2e" />
                <rect x="20" y="0" width="20" height="4" fill="none" stroke="#1a1a2e" strokeWidth="0.5" />
                <rect x="40" y="0" width="20" height="4" fill="#1a1a2e" />
                <text x="0" y="12" fontSize="6" fill="#1a1a2e">0</text>
                <text x="30" y="12" fontSize="6" fill="#1a1a2e">50m</text>
                <text x="60" y="12" fontSize="6" fill="#1a1a2e">100m</text>
              </g>

              {/* Title Block */}
              <g transform="translate(210, 385)">
                <rect x="-50" y="-8" width="100" height="18" fill="#1a1a2e" rx="2" />
                <text x="0" y="4" fontFamily="serif" fontSize="7" fill="#c9a961" fontWeight="700" textAnchor="middle" letterSpacing="1">{estate.name.toUpperCase()}</text>
              </g>
            </svg>
          </div>

          {/* Stats Bar */}
          <div className="bg-[#1a1a2e] px-4 py-3 grid grid-cols-4 gap-2">
            <div className="text-center">
              <p className="text-[#c9a961] text-[9px]">Total Plots</p>
              <p className="text-white font-bold text-sm">{stats.total}</p>
            </div>
            <div className="text-center">
              <p className="text-[#c9a961] text-[9px]">Available</p>
              <p className="text-emerald-400 font-bold text-sm">{stats.available}</p>
            </div>
            <div className="text-center">
              <p className="text-[#c9a961] text-[9px]">Reserved</p>
              <p className="text-amber-400 font-bold text-sm">{stats.reserved}</p>
            </div>
            <div className="text-center">
              <p className="text-[#c9a961] text-[9px]">Sold</p>
              <p className="text-white/50 font-bold text-sm">{stats.sold}</p>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/20">
          <h3 className="text-[#1a1a2e] font-serif font-bold text-sm mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c9a961]" />
            Estate Amenities
          </h3>
          <div className="flex flex-wrap gap-2">
            {estate.amenities.map((amenity, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#f8f6f1] rounded-lg text-[10px] text-[#1a1a2e] border border-[#c9a961]/10">
                {amenity}
              </span>
            ))}
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

      {/* Plot Detail Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPlot(null)}>
          <div className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
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

              {selectedPlot.feature && (
                <div className="flex items-center gap-2 p-3 bg-[#c9a961]/10 rounded-xl border border-[#c9a961]/20">
                  <Sparkles className="w-4 h-4 text-[#c9a961]" />
                  <span className="text-[#1a1a2e] text-sm font-medium">{selectedPlot.feature}</span>
                </div>
              )}

              <div className="text-center py-3 bg-gradient-to-r from-[#0d6e5d]/10 to-[#0f3d5c]/10 rounded-xl">
                <p className="text-[#8b6947] text-xs mb-1">Investment Value</p>
                <p className="text-[#0d6e5d] font-serif text-2xl font-bold">{formatPrice(selectedPlot.price)}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleProceedToPayment}
                  className="flex-1 py-3.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Proceed to Payment
                </button>
                <button className="py-3.5 px-4 bg-[#f8f6f1] border border-[#c9a961]/30 rounded-xl">
                  <Eye className="w-5 h-5 text-[#8b6947]" />
                </button>
              </div>
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

export default EstateDetails;