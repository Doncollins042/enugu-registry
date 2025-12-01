import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Shield, ChevronRight, Crown, Sparkles, Eye, X,
  Home, Search, Building2, Heart, User, Phone, ZoomIn, ZoomOut,
  RotateCcw, Ruler, Compass, Navigation, Layers, Info
} from 'lucide-react';
import toast from 'react-hot-toast';

const DEMO_ESTATES = [
  { id: 1, name: 'Legacy Estate', slug: 'legacy-estate', location: 'Independence Layout, Enugu', description: 'Premium residential estate with modern infrastructure and 24/7 security.', amenities: ['24/7 Security', 'Paved Roads', 'Drainage', 'Street Lights', 'Green Areas'] },
  { id: 2, name: 'Royal Gardens', slug: 'royal-gardens', location: 'Trans-Ekulu, Enugu', description: 'Serene garden estate with beautiful landscaping.', amenities: ['Gated Community', 'Central Park', 'Playground', 'Water Supply'] },
  { id: 3, name: 'Diamond Heights', slug: 'diamond-heights', location: 'New Haven, Enugu', description: 'Exclusive hilltop estate offering panoramic views.', amenities: ['Hilltop Location', 'Private Roads', 'Club House', 'Pool'] },
  { id: 4, name: 'Green Valley Estate', slug: 'green-valley-estate', location: 'Abakpa Nike, Enugu', description: 'Affordable housing estate with modern amenities.', amenities: ['Affordable', 'Flexible Payment', 'Good Roads', 'Schools Nearby'] },
  { id: 5, name: 'Centenary City', slug: 'centenary-city', location: 'Enugu East, Enugu', description: 'Mixed-use development with residential and commercial plots.', amenities: ['Commercial Zones', 'Residential', 'Shopping Mall', 'Hotels'] },
  { id: 6, name: 'Paradise Gardens', slug: 'paradise-gardens', location: 'Agbani Road, Enugu', description: 'Beautiful estate with lush greenery.', amenities: ['Garden Views', 'Quiet Environment', 'Family Friendly'] },
];

interface Plot {
  id: string;
  number: string;
  blockNumber: string;
  sqm: number;
  status: 'available' | 'reserved' | 'sold';
  tier: 'Standard' | 'Premium' | 'Signature';
  price: number;
  feature?: string;
  path: string;
  labelX: number;
  labelY: number;
  width: number;
  length: number;
  facing: string;
  beacons: string[];
  coordinates: string;
}

const generatePlots = (): Plot[] => [
  // BLOCK A
  { id: 'A1', number: 'A-01', blockNumber: 'Block A', sqm: 685, status: 'available', tier: 'Signature', price: 28500000, feature: 'Corner Plot • Prime Location', path: 'M 42 72 L 42 142 L 122 142 L 122 82 L 112 72 Z', labelX: 80, labelY: 107, width: 28, length: 24, facing: 'North-East', beacons: ['BN-A01', 'BN-A02', 'BN-A03', 'BN-A04', 'BN-A05'], coordinates: 'N 6°27\'12" E 7°30\'45"' },
  { id: 'A2', number: 'A-02', blockNumber: 'Block A', sqm: 540, status: 'sold', tier: 'Standard', price: 19800000, path: 'M 128 82 L 128 142 L 198 142 L 198 78 Z', labelX: 163, labelY: 110, width: 23, length: 24, facing: 'North', beacons: ['BN-A06', 'BN-A07', 'BN-A08', 'BN-A09'], coordinates: 'N 6°27\'14" E 7°30\'47"' },
  { id: 'A3', number: 'A-03', blockNumber: 'Block A', sqm: 560, status: 'available', tier: 'Standard', price: 20500000, path: 'M 204 78 L 204 142 L 278 142 L 278 76 Z', labelX: 241, labelY: 109, width: 24, length: 24, facing: 'North', beacons: ['BN-A10', 'BN-A11', 'BN-A12', 'BN-A13'], coordinates: 'N 6°27\'15" E 7°30\'49"' },
  { id: 'A4', number: 'A-04', blockNumber: 'Block A', sqm: 595, status: 'reserved', tier: 'Premium', price: 24200000, feature: 'Garden Frontage', path: 'M 284 76 L 284 142 L 362 142 L 362 74 Z', labelX: 323, labelY: 108, width: 26, length: 24, facing: 'North', beacons: ['BN-A14', 'BN-A15', 'BN-A16', 'BN-A17'], coordinates: 'N 6°27\'16" E 7°30\'51"' },
  { id: 'A5', number: 'A-05', blockNumber: 'Block A', sqm: 720, status: 'available', tier: 'Signature', price: 32000000, feature: 'Corner Plot • Dual Road', path: 'M 368 74 L 368 142 L 448 142 L 458 82 L 448 72 Z', labelX: 410, labelY: 107, width: 30, length: 24, facing: 'North-West', beacons: ['BN-A18', 'BN-A19', 'BN-A20', 'BN-A21', 'BN-A22'], coordinates: 'N 6°27\'17" E 7°30\'53"' },
  // BLOCK B
  { id: 'B1', number: 'B-01', blockNumber: 'Block B', sqm: 520, status: 'available', tier: 'Standard', price: 18900000, path: 'M 42 152 L 42 218 L 118 218 L 118 152 Z', labelX: 80, labelY: 185, width: 22, length: 24, facing: 'East', beacons: ['BN-B01', 'BN-B02', 'BN-B03', 'BN-B04'], coordinates: 'N 6°27\'10" E 7°30\'45"' },
  { id: 'B2', number: 'B-02', blockNumber: 'Block B', sqm: 648, status: 'available', tier: 'Premium', price: 26500000, feature: 'Central • Near Amenities', path: 'M 124 152 L 124 218 L 208 218 L 208 152 Z', labelX: 166, labelY: 185, width: 27, length: 24, facing: 'South', beacons: ['BN-B05', 'BN-B06', 'BN-B07', 'BN-B08'], coordinates: 'N 6°27\'10" E 7°30\'47"' },
  { id: 'B3', number: 'B-03', blockNumber: 'Block B', sqm: 580, status: 'sold', tier: 'Standard', price: 21200000, path: 'M 214 152 L 214 218 L 292 218 L 292 152 Z', labelX: 253, labelY: 185, width: 24, length: 24, facing: 'South', beacons: ['BN-B09', 'BN-B10', 'BN-B11', 'BN-B12'], coordinates: 'N 6°27\'10" E 7°30\'49"' },
  { id: 'B4', number: 'B-04', blockNumber: 'Block B', sqm: 610, status: 'available', tier: 'Premium', price: 25800000, feature: 'Wide Frontage', path: 'M 298 152 L 298 218 L 382 218 L 382 152 Z', labelX: 340, labelY: 185, width: 25, length: 24, facing: 'South', beacons: ['BN-B13', 'BN-B14', 'BN-B15', 'BN-B16'], coordinates: 'N 6°27\'10" E 7°30\'51"' },
  { id: 'B5', number: 'B-05', blockNumber: 'Block B', sqm: 545, status: 'available', tier: 'Standard', price: 19500000, path: 'M 388 152 L 388 218 L 458 218 L 458 152 Z', labelX: 423, labelY: 185, width: 23, length: 24, facing: 'West', beacons: ['BN-B17', 'BN-B18', 'BN-B19', 'BN-B20'], coordinates: 'N 6°27\'10" E 7°30\'53"' },
  // BLOCK C
  { id: 'C1', number: 'C-01', blockNumber: 'Block C', sqm: 635, status: 'reserved', tier: 'Premium', price: 27200000, feature: 'Park View', path: 'M 42 232 L 42 302 L 128 302 L 128 232 Z', labelX: 85, labelY: 267, width: 26, length: 24, facing: 'East', beacons: ['BN-C01', 'BN-C02', 'BN-C03', 'BN-C04'], coordinates: 'N 6°27\'08" E 7°30\'45"' },
  { id: 'C2', number: 'C-02', blockNumber: 'Block C', sqm: 550, status: 'available', tier: 'Standard', price: 20100000, path: 'M 134 232 L 134 302 L 212 302 L 212 232 Z', labelX: 173, labelY: 267, width: 23, length: 24, facing: 'South', beacons: ['BN-C05', 'BN-C06', 'BN-C07', 'BN-C08'], coordinates: 'N 6°27\'08" E 7°30\'47"' },
  { id: 'C3', number: 'C-03', blockNumber: 'Block C', sqm: 675, status: 'available', tier: 'Signature', price: 31500000, feature: 'Premium Central Plot', path: 'M 218 232 L 218 302 L 302 302 L 302 232 Z', labelX: 260, labelY: 267, width: 28, length: 24, facing: 'South', beacons: ['BN-C09', 'BN-C10', 'BN-C11', 'BN-C12'], coordinates: 'N 6°27\'08" E 7°30\'49"' },
  { id: 'C4', number: 'C-04', blockNumber: 'Block C', sqm: 530, status: 'available', tier: 'Standard', price: 19200000, path: 'M 308 232 L 308 302 L 384 302 L 384 232 Z', labelX: 346, labelY: 267, width: 22, length: 24, facing: 'South', beacons: ['BN-C13', 'BN-C14', 'BN-C15', 'BN-C16'], coordinates: 'N 6°27\'08" E 7°30\'51"' },
  { id: 'C5', number: 'C-05', blockNumber: 'Block C', sqm: 588, status: 'sold', tier: 'Standard', price: 21500000, path: 'M 390 232 L 390 302 L 458 302 L 458 232 Z', labelX: 424, labelY: 267, width: 24, length: 24, facing: 'West', beacons: ['BN-C17', 'BN-C18', 'BN-C19', 'BN-C20'], coordinates: 'N 6°27\'08" E 7°30\'53"' },
  // BLOCK D
  { id: 'D1', number: 'D-01', blockNumber: 'Block D', sqm: 780, status: 'available', tier: 'Signature', price: 38500000, feature: 'Estate Entrance • Premium', path: 'M 42 316 L 42 398 L 52 408 L 138 408 L 138 316 Z', labelX: 90, labelY: 360, width: 32, length: 24, facing: 'South-East', beacons: ['BN-D01', 'BN-D02', 'BN-D03', 'BN-D04', 'BN-D05'], coordinates: 'N 6°27\'05" E 7°30\'45"' },
  { id: 'D2', number: 'D-02', blockNumber: 'Block D', sqm: 625, status: 'available', tier: 'Premium', price: 27800000, feature: 'Boulevard View', path: 'M 144 316 L 144 408 L 228 408 L 228 316 Z', labelX: 186, labelY: 362, width: 26, length: 24, facing: 'South', beacons: ['BN-D06', 'BN-D07', 'BN-D08', 'BN-D09'], coordinates: 'N 6°27\'05" E 7°30\'47"' },
  { id: 'D3', number: 'D-03', blockNumber: 'Block D', sqm: 565, status: 'reserved', tier: 'Standard', price: 20800000, path: 'M 234 316 L 234 408 L 312 408 L 312 316 Z', labelX: 273, labelY: 362, width: 24, length: 24, facing: 'South', beacons: ['BN-D10', 'BN-D11', 'BN-D12', 'BN-D13'], coordinates: 'N 6°27\'05" E 7°30\'49"' },
  { id: 'D4', number: 'D-04', blockNumber: 'Block D', sqm: 602, status: 'available', tier: 'Premium', price: 26200000, feature: 'Near Club House', path: 'M 318 316 L 318 408 L 398 408 L 398 316 Z', labelX: 358, labelY: 362, width: 25, length: 24, facing: 'South', beacons: ['BN-D14', 'BN-D15', 'BN-D16', 'BN-D17'], coordinates: 'N 6°27\'05" E 7°30\'51"' },
  { id: 'D5', number: 'D-05', blockNumber: 'Block D', sqm: 825, status: 'available', tier: 'Signature', price: 42000000, feature: 'Largest • Panoramic Views', path: 'M 404 316 L 404 408 L 448 412 L 458 398 L 458 316 Z', labelX: 430, labelY: 362, width: 34, length: 24, facing: 'South-West', beacons: ['BN-D18', 'BN-D19', 'BN-D20', 'BN-D21', 'BN-D22'], coordinates: 'N 6°27\'05" E 7°30\'53"' },
];

const EstateDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [estate, setEstate] = useState<typeof DEMO_ESTATES[0] | null>(null);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, showAbove: true });
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLegend, setShowLegend] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = DEMO_ESTATES.find(e => e.slug === slug);
    if (found) { setEstate(found); setPlots(generatePlots()); }
    setLoading(false);
  }, [slug]);

  const formatPrice = (amount: number) => amount >= 1000000 ? `₦${(amount / 1000000).toFixed(1)}M` : `₦${(amount / 1000).toFixed(0)}K`;

  const handlePlotHover = (plot: Plot | null, e?: React.MouseEvent) => {
    setHoveredPlot(plot);
    if (e && plot && mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTooltipPos({ x: Math.min(Math.max(x, 110), rect.width - 110), y: y > 150 ? y - 10 : y + 20, showAbove: y > 150 });
    }
  };

  const handleSelectPlot = (plot: Plot) => {
    if (plot.status === 'available') setSelectedPlot(plot);
    else if (plot.status === 'sold') toast.error('This plot has been sold');
    else toast('This plot is reserved', { icon: '⏳' });
  };

  const handleProceedToPayment = () => {
    if (selectedPlot && estate) {
      localStorage.setItem('selectedPlot', JSON.stringify(selectedPlot));
      localStorage.setItem('selectedEstate', JSON.stringify(estate));
      navigate('/land-payment-summary', { state: { plot: selectedPlot, estate } });
    }
  };

  const filteredPlots = plots.filter(p => {
    const matchesSearch = !searchQuery || p.number.toLowerCase().includes(searchQuery.toLowerCase()) || p.blockNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || p.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = { total: plots.length, available: plots.filter(p => p.status === 'available').length, reserved: plots.filter(p => p.status === 'reserved').length, sold: plots.filter(p => p.status === 'sold').length };
  const isActive = (path: string) => location.pathname === path;

  if (loading) return <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-4 border-[#c9a961] border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-[#8b6947] font-serif">Loading...</p></div></div>;
  if (!estate) return <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6"><Crown className="w-16 h-16 text-[#c9a961] mb-4" /><p className="text-[#1a1a2e] font-bold text-xl mb-2">Estate Not Found</p><button onClick={() => navigate('/search')} className="px-8 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white rounded-xl">Browse</button></div>;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-5 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#c9a961]/10 rounded-full blur-[100px]" />
        <div className="relative max-w-7xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl"><ArrowLeft className="w-5 h-5 text-white" /></button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1"><Crown className="w-5 h-5 text-[#c9a961]" /><h1 className="text-white font-serif text-lg lg:text-xl font-bold">{estate.name}</h1></div>
            <p className="text-white/50 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {estate.location}</p>
          </div>
          <button onClick={() => setShowLegend(!showLegend)} className="p-2.5 bg-white/10 rounded-xl lg:hidden"><Layers className="w-5 h-5 text-white" /></button>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-4 lg:py-6 max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr,340px] lg:gap-6">
          <div className="space-y-4 lg:space-y-6">
            {/* Search & Legend */}
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search plot (e.g., A-01)" className="w-full pl-10 pr-4 py-2.5 bg-[#faf8f5] rounded-xl text-sm border border-[#c9a961]/20 focus:outline-none focus:border-[#c9a961]" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                  {(['all', 'available', 'reserved', 'sold'] as const).map((f) => (
                    <button key={f} onClick={() => setActiveFilter(f)} className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${activeFilter === f ? 'bg-[#1a1a2e] text-white' : 'bg-[#faf8f5] text-[#8b6947]'}`}>{f.charAt(0).toUpperCase() + f.slice(1)}{f !== 'all' && ` (${stats[f]})`}</button>
                  ))}
                </div>
              </div>
              <div className={`mt-4 pt-4 border-t border-[#c9a961]/10 ${showLegend ? 'block' : 'hidden lg:block'}`}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                  <div className="flex items-center gap-2"><div className="w-5 h-4 rounded bg-gradient-to-br from-[#bbf7d0] to-[#86efac] border-2 border-[#16a34a]" /><span>Available</span></div>
                  <div className="flex items-center gap-2"><div className="w-5 h-4 rounded bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border-2 border-[#d97706]" /><span>Reserved</span></div>
                  <div className="flex items-center gap-2"><div className="w-5 h-4 rounded bg-gradient-to-br from-[#e2e8f0] to-[#cbd5e1] border-2 border-[#64748b]" /><span>Sold</span></div>
                  <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c9a961] to-[#8b6947] flex items-center justify-center"><span className="text-white text-[8px]">★</span></div><span>Signature</span></div>
                  <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-[#0d6e5d] flex items-center justify-center"><span className="text-white text-[8px] font-bold">P</span></div><span>Premium</span></div>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="bg-white rounded-2xl lg:rounded-3xl border border-[#c9a961]/30 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-[#c9a961] rounded-xl flex items-center justify-center bg-[#c9a961]/10"><Navigation className="w-5 h-5 lg:w-6 lg:h-6 text-[#c9a961]" /></div>
                  <div><p className="text-[#c9a961] font-serif text-sm lg:text-base font-bold tracking-wide">{estate.name.toUpperCase()}</p><p className="text-white/40 text-[10px] lg:text-xs tracking-widest">SURVEY LAYOUT</p></div>
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                  <button onClick={() => setZoomLevel(Math.max(0.6, zoomLevel - 0.15))} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><ZoomOut className="w-4 h-4 text-white" /></button>
                  <span className="text-white text-xs w-12 text-center hidden sm:block">{Math.round(zoomLevel * 100)}%</span>
                  <button onClick={() => setZoomLevel(Math.min(1.8, zoomLevel + 0.15))} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><ZoomIn className="w-4 h-4 text-white" /></button>
                  <button onClick={() => setZoomLevel(1)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 hidden sm:block"><RotateCcw className="w-4 h-4 text-white" /></button>
                </div>
              </div>

              <div ref={mapRef} className="relative overflow-auto touch-pan-x touch-pan-y" style={{ background: 'linear-gradient(145deg, #f8f6f0 0%, #f0ebe3 50%, #e8e2d9 100%)', minHeight: '420px', maxHeight: '75vh' }}>
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center top', transition: 'transform 0.3s ease-out', padding: '10px' }}>
                  <svg viewBox="0 0 500 470" className="w-full" style={{ minWidth: '500px', minHeight: '450px' }}>
                    <defs>
                      <pattern id="surveyGrid" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M 12 0 L 0 0 0 12" fill="none" stroke="#9a8570" strokeWidth="0.3" opacity="0.5" /></pattern>
                      <pattern id="hatchSold" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="#78716c" strokeWidth="1.5" /></pattern>
                      <linearGradient id="gradAvailable" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d1fae5" /><stop offset="50%" stopColor="#a7f3d0" /><stop offset="100%" stopColor="#6ee7b7" /></linearGradient>
                      <linearGradient id="gradReserved" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fef9c3" /><stop offset="50%" stopColor="#fde68a" /><stop offset="100%" stopColor="#fcd34d" /></linearGradient>
                      <linearGradient id="gradSold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f1f5f9" /><stop offset="50%" stopColor="#e2e8f0" /><stop offset="100%" stopColor="#cbd5e1" /></linearGradient>
                      <linearGradient id="gradSignature" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fef3c7" /><stop offset="50%" stopColor="#fde68a" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient>
                      <linearGradient id="roadSurface" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#a8a29e" /><stop offset="50%" stopColor="#78716c" /><stop offset="100%" stopColor="#a8a29e" /></linearGradient>
                      <filter id="plotDropShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1a1a2e" floodOpacity="0.12" /></filter>
                      <filter id="hoverGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feFlood floodColor="#c9a961" result="color" /><feComposite in="color" in2="blur" operator="in" result="glow" /><feMerge><feMergeNode in="glow" /><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                    <rect width="100%" height="100%" fill="#f5f3ef" />
                    <rect x="8" y="45" width="484" height="418" fill="none" stroke="#c9a961" strokeWidth="3" rx="6" />
                    <rect x="14" y="51" width="472" height="406" fill="none" stroke="#1a1a2e" strokeWidth="0.8" rx="4" opacity="0.4" />
                    <rect x="20" y="57" width="460" height="394" fill="url(#surveyGrid)" rx="2" />
                    {/* Roads */}
                    <path d="M 8 58 Q 100 52, 250 55 T 492 60" fill="none" stroke="url(#roadSurface)" strokeWidth="28" strokeLinecap="round" />
                    <path d="M 8 58 Q 100 52, 250 55 T 492 60" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeDasharray="15,10" />
                    <text x="250" y="38" fontFamily="Georgia, serif" fontSize="9" fill="#57534e" fontWeight="600" textAnchor="middle" letterSpacing="5">ROYAL BOULEVARD</text>
                    <path d="M 8 430 Q 120 438, 250 434 T 492 428" fill="none" stroke="url(#roadSurface)" strokeWidth="24" strokeLinecap="round" />
                    <path d="M 8 430 Q 120 438, 250 434 T 492 428" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeDasharray="15,10" />
                    <text x="250" y="458" fontFamily="Georgia, serif" fontSize="9" fill="#57534e" fontWeight="600" textAnchor="middle" letterSpacing="5">CRESCENT AVENUE</text>
                    <path d="M 28 72 L 25 418" fill="none" stroke="url(#roadSurface)" strokeWidth="20" strokeLinecap="round" />
                    <text x="12" y="245" fontFamily="Georgia, serif" fontSize="8" fill="#57534e" fontWeight="600" transform="rotate(-90, 12, 245)" letterSpacing="4">STREET A</text>
                    <path d="M 472 72 L 475 418" fill="none" stroke="url(#roadSurface)" strokeWidth="20" strokeLinecap="round" />
                    <text x="490" y="245" fontFamily="Georgia, serif" fontSize="8" fill="#57534e" fontWeight="600" transform="rotate(90, 490, 245)" letterSpacing="4">STREET B</text>
                    <path d="M 42 147 L 458 147" fill="none" stroke="#d6d3d1" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
                    <path d="M 42 225 L 458 225" fill="none" stroke="#d6d3d1" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
                    <path d="M 42 308 L 458 308" fill="none" stroke="#d6d3d1" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
                    <text x="250" y="95" fontFamily="Georgia, serif" fontSize="8" fill="#8b6947" fontWeight="600" textAnchor="middle" opacity="0.7" letterSpacing="8">BLOCK A</text>
                    <text x="250" y="172" fontFamily="Georgia, serif" fontSize="8" fill="#8b6947" fontWeight="600" textAnchor="middle" opacity="0.7" letterSpacing="8">BLOCK B</text>
                    <text x="250" y="252" fontFamily="Georgia, serif" fontSize="8" fill="#8b6947" fontWeight="600" textAnchor="middle" opacity="0.7" letterSpacing="8">BLOCK C</text>
                    <text x="250" y="335" fontFamily="Georgia, serif" fontSize="8" fill="#8b6947" fontWeight="600" textAnchor="middle" opacity="0.7" letterSpacing="8">BLOCK D</text>
                    {/* Plots */}
                    {filteredPlots.map((plot) => {
                      const isHovered = hoveredPlot?.id === plot.id;
                      const isSelected = selectedPlot?.id === plot.id;
                      const isSearchMatch = searchQuery && (plot.number.toLowerCase().includes(searchQuery.toLowerCase()) || plot.blockNumber.toLowerCase().includes(searchQuery.toLowerCase()));
                      let fillGradient = 'url(#gradAvailable)', strokeColor = '#16a34a', strokeWidth = 1.8;
                      if (plot.status === 'sold') { fillGradient = 'url(#gradSold)'; strokeColor = '#64748b'; }
                      else if (plot.status === 'reserved') { fillGradient = 'url(#gradReserved)'; strokeColor = '#d97706'; }
                      else if (plot.tier === 'Signature') { fillGradient = 'url(#gradSignature)'; strokeColor = '#b45309'; strokeWidth = 2.5; }
                      else if (plot.tier === 'Premium') { strokeColor = '#0d6e5d'; strokeWidth = 2.2; }
                      const isHighlighted = isHovered || isSelected || isSearchMatch;
                      if (isHighlighted) strokeWidth = 3.5;
                      return (
                        <g key={plot.id} onClick={() => handleSelectPlot(plot)} onMouseEnter={(e) => handlePlotHover(plot, e)} onMouseMove={(e) => handlePlotHover(plot, e)} onMouseLeave={() => handlePlotHover(null)} style={{ cursor: plot.status === 'available' ? 'pointer' : 'default' }} filter={isHighlighted ? 'url(#hoverGlow)' : 'url(#plotDropShadow)'}>
                          <path d={plot.path} fill={fillGradient} stroke={isSelected ? '#c9a961' : strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                          {plot.status === 'sold' && <path d={plot.path} fill="url(#hatchSold)" opacity="0.25" />}
                          {isHighlighted && plot.status === 'available' && (<><circle cx={plot.labelX - 32} cy={plot.labelY - 22} r="4" fill="#c9a961" stroke="#8b6947" strokeWidth="1.5"><animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" /></circle><circle cx={plot.labelX + 32} cy={plot.labelY - 22} r="4" fill="#c9a961" stroke="#8b6947" strokeWidth="1.5"><animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" /></circle><circle cx={plot.labelX - 32} cy={plot.labelY + 28} r="4" fill="#c9a961" stroke="#8b6947" strokeWidth="1.5"><animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" /></circle><circle cx={plot.labelX + 32} cy={plot.labelY + 28} r="4" fill="#c9a961" stroke="#8b6947" strokeWidth="1.5"><animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" /></circle></>)}
                          <text x={plot.labelX} y={plot.labelY - 8} fontFamily="Georgia, serif" fontSize="10" fill="#1a1a2e" fontWeight="700" textAnchor="middle">{plot.number}</text>
                          <text x={plot.labelX} y={plot.labelY + 6} fontFamily="system-ui" fontSize="8" fill="#57534e" textAnchor="middle">{plot.sqm} m²</text>
                          {plot.status === 'sold' && <text x={plot.labelX} y={plot.labelY + 18} fontSize="7" fill="#64748b" fontWeight="600" textAnchor="middle">SOLD</text>}
                          {plot.status === 'reserved' && <text x={plot.labelX} y={plot.labelY + 18} fontSize="7" fill="#d97706" fontWeight="600" textAnchor="middle">RESERVED</text>}
                          {plot.tier === 'Signature' && plot.status === 'available' && <g transform={`translate(${plot.labelX + 30}, ${plot.labelY - 28})`}><circle r="9" fill="url(#gradSignature)" stroke="#b45309" strokeWidth="1.5" /><text y="4" fontSize="10" fill="#78350f" textAnchor="middle" fontWeight="bold">★</text></g>}
                          {plot.tier === 'Premium' && plot.status === 'available' && <g transform={`translate(${plot.labelX + 30}, ${plot.labelY - 28})`}><circle r="8" fill="#0d6e5d" stroke="#064e3b" strokeWidth="1.5" /><text y="3" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">P</text></g>}
                        </g>
                      );
                    })}
                    {/* Compass */}
                    <g transform="translate(455, 435)"><circle r="26" fill="#f8f6f0" stroke="#1a1a2e" strokeWidth="2" /><circle r="22" fill="none" stroke="#c9a961" strokeWidth="1.5" /><circle r="4" fill="#c9a961" /><polygon points="0,-18 5,8 0,2 -5,8" fill="#1a1a2e" /><polygon points="0,18 5,-8 0,-2 -5,-8" fill="#c9a961" opacity="0.5" /><text y="-30" fontSize="11" fill="#1a1a2e" fontWeight="bold" textAnchor="middle" fontFamily="Georgia, serif">N</text></g>
                    {/* Scale */}
                    <g transform="translate(45, 438)"><rect x="0" y="0" width="25" height="8" fill="#1a1a2e" /><rect x="25" y="0" width="25" height="8" fill="none" stroke="#1a1a2e" strokeWidth="1" /><rect x="50" y="0" width="25" height="8" fill="#1a1a2e" /><rect x="75" y="0" width="25" height="8" fill="none" stroke="#1a1a2e" strokeWidth="1" /><text x="0" y="18" fontSize="8" fill="#1a1a2e">0</text><text x="50" y="18" fontSize="8" fill="#1a1a2e">50m</text><text x="100" y="18" fontSize="8" fill="#1a1a2e">100m</text></g>
                    {/* Title */}
                    <g transform="translate(250, 442)"><rect x="-85" y="-14" width="170" height="28" fill="#1a1a2e" rx="6" /><rect x="-82" y="-11" width="164" height="22" fill="none" stroke="#c9a961" strokeWidth="1" rx="4" /><text y="5" fontSize="11" fill="#c9a961" fontWeight="700" textAnchor="middle" fontFamily="Georgia, serif" letterSpacing="3">{estate.name.toUpperCase()}</text></g>
                    <text x="250" y="468" fontSize="7" fill="#8b6947" textAnchor="middle" opacity="0.7">Survey No: EN/2024/LP/00{estate.id}42 • J.O. Eze & Associates</text>
                  </svg>
                </div>
                {/* Tooltip */}
                {hoveredPlot && (
                  <div className="absolute z-30 pointer-events-none transition-all duration-150" style={{ left: tooltipPos.x, top: tooltipPos.showAbove ? tooltipPos.y - 190 : tooltipPos.y, transform: 'translateX(-50%)' }}>
                    <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#c9a961]/40 p-4 min-w-[220px]">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#c9a961]/20">
                        <div><p className="font-serif font-bold text-[#1a1a2e] text-lg">{hoveredPlot.number}</p><p className="text-[10px] text-[#8b6947]">{hoveredPlot.blockNumber}</p></div>
                        <span className={`text-[9px] px-2.5 py-1 rounded-full font-semibold ${hoveredPlot.status === 'sold' ? 'bg-gray-100 text-gray-600' : hoveredPlot.status === 'reserved' ? 'bg-amber-100 text-amber-700' : hoveredPlot.tier === 'Signature' ? 'bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white' : hoveredPlot.tier === 'Premium' ? 'bg-[#0d6e5d] text-white' : 'bg-emerald-100 text-emerald-700'}`}>{hoveredPlot.status === 'available' ? hoveredPlot.tier : hoveredPlot.status.toUpperCase()}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                        <div className="bg-[#faf8f5] rounded-lg p-2"><p className="text-[#8b6947] text-[9px] mb-0.5">Size</p><p className="text-[#1a1a2e] font-bold">{hoveredPlot.sqm} m²</p></div>
                        <div className="bg-[#faf8f5] rounded-lg p-2"><p className="text-[#8b6947] text-[9px] mb-0.5">Dimensions</p><p className="text-[#1a1a2e] font-bold">{hoveredPlot.width}m × {hoveredPlot.length}m</p></div>
                        <div className="bg-[#faf8f5] rounded-lg p-2"><p className="text-[#8b6947] text-[9px] mb-0.5">Facing</p><p className="text-[#1a1a2e] font-bold">{hoveredPlot.facing}</p></div>
                        <div className="bg-[#faf8f5] rounded-lg p-2"><p className="text-[#8b6947] text-[9px] mb-0.5">Beacons</p><p className="text-[#1a1a2e] font-bold">{hoveredPlot.beacons.length} pts</p></div>
                      </div>
                      {hoveredPlot.feature && <div className="flex items-center gap-2 mb-3 p-2 bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-lg border border-[#c9a961]/20"><Sparkles className="w-3.5 h-3.5 text-[#c9a961]" /><span className="text-[#1a1a2e] text-[10px] font-medium">{hoveredPlot.feature}</span></div>}
                      <p className="text-[9px] text-[#8b6947] mb-3 flex items-center gap-1"><Compass className="w-3 h-3" /> {hoveredPlot.coordinates}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#c9a961]/20">
                        <div><p className="text-[9px] text-[#8b6947]">Investment Value</p><p className={`font-bold text-xl font-serif ${hoveredPlot.status === 'available' ? 'text-[#0d6e5d]' : 'text-[#64748b]'}`}>{formatPrice(hoveredPlot.price)}</p></div>
                        {hoveredPlot.status === 'available' && <div className="text-right"><p className="text-[9px] text-[#c9a961] font-medium">TAP TO SELECT</p><div className="w-8 h-8 bg-[#c9a961] rounded-full flex items-center justify-center mt-1"><ChevronRight className="w-4 h-4 text-white" /></div></div>}
                      </div>
                    </div>
                    <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-[#c9a961]/40 rotate-45 ${tooltipPos.showAbove ? 'bottom-[-8px] border-r border-b' : 'top-[-8px] border-l border-t'}`} />
                  </div>
                )}
              </div>
              {/* Stats */}
              <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] px-4 lg:px-6 py-3 lg:py-4 grid grid-cols-4 gap-2 lg:gap-4">
                <div className="text-center"><p className="text-[#c9a961] text-[9px] lg:text-xs font-medium mb-1">Total</p><p className="text-white font-bold text-lg lg:text-xl">{stats.total}</p></div>
                <div className="text-center"><p className="text-[#c9a961] text-[9px] lg:text-xs font-medium mb-1">Available</p><p className="text-emerald-400 font-bold text-lg lg:text-xl">{stats.available}</p></div>
                <div className="text-center"><p className="text-[#c9a961] text-[9px] lg:text-xs font-medium mb-1">Reserved</p><p className="text-amber-400 font-bold text-lg lg:text-xl">{stats.reserved}</p></div>
                <div className="text-center"><p className="text-[#c9a961] text-[9px] lg:text-xs font-medium mb-1">Sold</p><p className="text-white/50 font-bold text-lg lg:text-xl">{stats.sold}</p></div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center"><Crown className="w-6 h-6 text-white" /></div><div><h3 className="text-[#1a1a2e] font-serif font-bold">{estate.name}</h3><p className="text-[#8b6947] text-xs">{estate.location}</p></div></div>
              <p className="text-[#57534e] text-sm leading-relaxed mb-4">{estate.description}</p>
              <div className="flex flex-wrap gap-2">{estate.amenities.map((a, i) => <span key={i} className="px-2.5 py-1 bg-[#faf8f5] rounded-lg text-[10px] text-[#1a1a2e] border border-[#c9a961]/10">{a}</span>)}</div>
            </div>
            <div className="bg-gradient-to-br from-[#0d6e5d] to-[#064e3b] rounded-2xl p-5 text-white"><h4 className="text-white/80 text-xs mb-2">Price Range</h4><p className="font-serif text-2xl font-bold mb-1">₦18.9M - ₦42M</p><p className="text-white/60 text-xs">Based on plot size & location</p></div>
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20"><h4 className="text-[#1a1a2e] font-serif font-bold mb-4">Investment Desk</h4><a href="tel:+2348012345678" className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10"><div className="w-10 h-10 bg-[#c9a961] rounded-lg flex items-center justify-center"><Phone className="w-5 h-5 text-white" /></div><div><p className="text-[#1a1a2e] font-medium text-sm">+234 801 234 5678</p><p className="text-[#8b6947] text-xs">Call anytime</p></div></a></div>
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20"><h4 className="text-[#1a1a2e] font-serif font-bold mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-[#c9a961]" /> Quick Info</h4><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-[#8b6947]">Survey Plan</span><span className="text-[#1a1a2e] font-medium">EN/2024/LP/00{estate.id}42</span></div><div className="flex justify-between"><span className="text-[#8b6947]">Blocks</span><span className="text-[#1a1a2e] font-medium">4 (A-D)</span></div><div className="flex justify-between"><span className="text-[#8b6947]">Plot Sizes</span><span className="text-[#1a1a2e] font-medium">520 - 825 m²</span></div><div className="flex justify-between"><span className="text-[#8b6947]">Title</span><span className="text-[#1a1a2e] font-medium">C of O</span></div></div></div>
          </div>
        </div>
        {/* Mobile Info */}
        <div className="lg:hidden space-y-4 mt-4">
          <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/20"><h3 className="text-[#1a1a2e] font-serif font-bold text-sm mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#c9a961]" /> Features</h3><div className="flex flex-wrap gap-2">{estate.amenities.map((a, i) => <span key={i} className="px-3 py-1.5 bg-[#faf8f5] rounded-lg text-[10px] text-[#1a1a2e] border border-[#c9a961]/10">{a}</span>)}</div></div>
          <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/20"><div className="flex items-center gap-3"><div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center"><Phone className="w-6 h-6 text-white" /></div><div className="flex-1"><p className="text-[#1a1a2e] font-serif font-bold">Investment Desk</p><p className="text-[#8b6947] text-sm">+234 801 234 5678</p></div><ChevronRight className="w-5 h-5 text-[#c9a961]" /></div></div>
        </div>
      </div>
      {/* Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 backdrop-blur-sm p-0 lg:p-6" onClick={() => setSelectedPlot(null)}>
          <div className="w-full max-w-lg bg-white rounded-t-3xl lg:rounded-3xl overflow-hidden animate-slide-up shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] p-5 lg:p-6 relative">
              <button onClick={() => setSelectedPlot(null)} className="absolute top-4 right-4 p-2.5 bg-white/10 rounded-full hover:bg-white/20"><X className="w-5 h-5 text-white" /></button>
              <div className="flex items-center gap-4"><div className="w-16 h-16 bg-[#c9a961]/20 rounded-2xl flex items-center justify-center"><Crown className="w-8 h-8 text-[#c9a961]" /></div><div><p className="text-[#c9a961] text-xs font-medium uppercase tracking-widest mb-1">{selectedPlot.tier} Plot</p><h3 className="text-white font-serif text-2xl lg:text-3xl font-bold">{selectedPlot.number}</h3><p className="text-white/50 text-xs">{selectedPlot.blockNumber} • {estate.name}</p></div></div>
            </div>
            <div className="p-5 lg:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#faf8f5] rounded-xl p-3 text-center"><Ruler className="w-5 h-5 text-[#c9a961] mx-auto mb-2" /><p className="text-[#1a1a2e] font-bold">{selectedPlot.sqm} m²</p><p className="text-[#8b6947] text-[9px]">Size</p></div>
                <div className="bg-[#faf8f5] rounded-xl p-3 text-center"><Compass className="w-5 h-5 text-[#c9a961] mx-auto mb-2" /><p className="text-[#1a1a2e] font-bold text-sm">{selectedPlot.facing}</p><p className="text-[#8b6947] text-[9px]">Facing</p></div>
                <div className="bg-[#faf8f5] rounded-xl p-3 text-center"><MapPin className="w-5 h-5 text-[#c9a961] mx-auto mb-2" /><p className="text-[#1a1a2e] font-bold text-sm">{selectedPlot.width}×{selectedPlot.length}m</p><p className="text-[#8b6947] text-[9px]">Dimensions</p></div>
              </div>
              {selectedPlot.feature && <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-xl border border-[#c9a961]/20"><Sparkles className="w-5 h-5 text-[#c9a961]" /><span className="text-[#1a1a2e] font-medium">{selectedPlot.feature}</span></div>}
              <div className="bg-[#faf8f5] rounded-xl p-4"><h4 className="text-[#1a1a2e] font-serif font-bold text-sm mb-3">Survey Information</h4><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-[#8b6947]">Coordinates</span><span className="text-[#1a1a2e] font-mono text-xs">{selectedPlot.coordinates}</span></div><div className="flex justify-between"><span className="text-[#8b6947]">Beacons</span><span className="text-[#1a1a2e]">{selectedPlot.beacons.slice(0, 3).join(', ')}...</span></div></div></div>
              <div className="text-center py-5 bg-gradient-to-r from-[#0d6e5d]/10 via-[#0d6e5d]/5 to-[#0f3d5c]/10 rounded-xl border border-[#0d6e5d]/20"><p className="text-[#8b6947] text-sm mb-1">Investment Value</p><p className="text-[#0d6e5d] font-serif text-4xl font-bold">{formatPrice(selectedPlot.price)}</p></div>
              <div className="flex gap-3"><button onClick={handleProceedToPayment} className="flex-1 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg"><Shield className="w-5 h-5" /> Proceed to Payment</button><button className="py-4 px-5 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl"><Eye className="w-5 h-5 text-[#8b6947]" /></button></div>
            </div>
          </div>
        </div>
      )}
      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30 lg:hidden">
        <div className="flex items-center justify-around">
          {[{ icon: Home, label: 'Home', path: '/dashboard' }, { icon: Search, label: 'Search', path: '/search' }, { icon: Building2, label: 'Services', path: '/services/document-verification' }, { icon: Heart, label: 'Portfolio', path: '/portfolio' }, { icon: User, label: 'Profile', path: '/settings' }].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${isActive(item.path) ? 'bg-gradient-to-r from-[#1a1a2e] to-[#0f3d5c]' : ''}`}><item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} /></div>
              <span className={`text-[10px] ${isActive(item.path) ? 'text-[#1a1a2e] font-medium' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      <style>{`@keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .animate-slide-up { animation: slide-up 0.3s ease-out; } @media (min-width: 1024px) { .animate-slide-up { animation: none; } }`}</style>
    </div>
  );
};

export default EstateDetails;