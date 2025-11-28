import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, Share2, Heart,
  ChevronRight, ChevronLeft, MessageCircle,
  Home, Trees, Zap, Droplets, Car, X,
  Map, Lock, CreditCard, Info, ZoomIn, ZoomOut,
  Building2, FileText, Clock, Users, Award, Grid, List
} from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface Estate {
  id: number;
  name: string;
  slug: string;
  location: string;
  description: string;
  total_plots: number;
  available_plots: number;
  min_price: string;
  max_price: string;
  image_url: string;
  status: string;
}

interface Plot {
  id: number;
  plot_number: string;
  size_sqm: number;
  price: number;
  status: 'available' | 'sold' | 'reserved' | 'commercial';
  plot_type: string;
}

const SEARCH_FEE = 30000;
const EXTRA_PLOTS = 70; // Add 70 more plots to each estate

export default function EstateDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  
  const [estate, setEstate] = useState<Estate | null>(null);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plots' | 'amenities'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold' | 'reserved' | 'commercial'>('all');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSearchFeeModal, setShowSearchFeeModal] = useState(false);
  const [searchFeePaid, setSearchFeePaid] = useState(false);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const plotsPerPage = 12;

  const checkPaymentStatus = (estateName: string) => {
    try {
      const paidEstates = JSON.parse(localStorage.getItem('paidSearchFees') || '[]');
      return paidEstates.includes(estateName);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    fetchEstate();
  }, [slug]);

  useEffect(() => {
    if (location.state?.paymentSuccess && estate) {
      const isPaid = checkPaymentStatus(estate.name);
      if (isPaid) {
        setSearchFeePaid(true);
        setActiveTab('plots');
        toast.success('Access granted! View all plots below.');
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state, estate]);

  const fetchEstate = async () => {
    try {
      setLoading(true);
      const allEstates = await api.getEstates();
      
      if (Array.isArray(allEstates) && allEstates.length > 0) {
        const foundEstate = allEstates.find((e: Estate) => 
          e.slug === slug || e.id.toString() === slug || e.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (foundEstate) {
          // Add 70 more plots to total and available
          const enhancedEstate = {
            ...foundEstate,
            total_plots: foundEstate.total_plots + EXTRA_PLOTS,
            available_plots: foundEstate.available_plots + Math.floor(EXTRA_PLOTS * 0.7)
          };
          setEstate(enhancedEstate);
          generatePlots(enhancedEstate);
          
          const isPaid = checkPaymentStatus(foundEstate.name);
          setSearchFeePaid(isPaid);
          
          if (location.state?.paymentSuccess && isPaid) {
            setActiveTab('plots');
          }
        } else {
          toast.error('Estate not found');
        }
      }
    } catch (error) {
      toast.error('Failed to load estate');
    } finally {
      setLoading(false);
    }
  };

  const generatePlots = (estateData: Estate) => {
    const generatedPlots: Plot[] = [];
    const plotTypes = ['Residential', 'Commercial', 'Corner Piece', 'Standard'];
    const sizes = [250, 300, 350, 400, 450, 500]; // Smaller sizes
    
    for (let i = 0; i < estateData.total_plots; i++) {
      const plotNum = i + 1;
      const isAvailable = plotNum <= estateData.available_plots;
      const basePrice = parseInt(estateData.min_price);
      const maxPrice = parseInt(estateData.max_price);
      const randomPrice = basePrice + Math.random() * (maxPrice - basePrice);
      
      let status: 'available' | 'sold' | 'reserved' | 'commercial' = 'sold';
      if (isAvailable) {
        const rand = Math.random();
        if (rand < 0.65) status = 'available';
        else if (rand < 0.80) status = 'reserved';
        else status = 'commercial';
      }
      
      generatedPlots.push({
        id: plotNum,
        plot_number: `${estateData.name.substring(0, 2).toUpperCase()}-${String(plotNum).padStart(3, '0')}`,
        size_sqm: sizes[Math.floor(Math.random() * sizes.length)],
        price: Math.round(randomPrice / 100000) * 100000,
        status,
        plot_type: status === 'commercial' ? 'Commercial' : plotTypes[Math.floor(Math.random() * 3)],
      });
    }
    setPlots(generatedPlots);
  };

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    return '₦' + num.toLocaleString();
  };

  const filteredPlots = plots.filter(plot => filterStatus === 'all' || plot.status === filterStatus);
  const paginatedPlots = filteredPlots.slice((currentPage - 1) * plotsPerPage, currentPage * plotsPerPage);
  const totalPages = Math.ceil(filteredPlots.length / plotsPerPage);

  const amenities = [
    { icon: Zap, label: 'Electricity', desc: '24/7 Power' },
    { icon: Droplets, label: 'Water', desc: 'Borehole' },
    { icon: Car, label: 'Roads', desc: 'Tarred' },
    { icon: Shield, label: 'Security', desc: 'Gated' },
    { icon: Trees, label: 'Green Areas', desc: 'Parks' },
    { icon: Home, label: 'Drainage', desc: 'Proper' },
  ];

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in ${estate?.name} at ${estate?.location}.`;
    window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: estate?.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  const handleTabClick = (tabId: string) => {
    if (tabId === 'plots' && !searchFeePaid) {
      setShowSearchFeeModal(true);
    } else {
      setActiveTab(tabId as any);
    }
  };

  const handlePaySearchFee = () => {
    if (!estate) return;
    setShowSearchFeeModal(false);
    navigate('/payment', {
      state: {
        type: 'Plot Search Fee',
        amount: SEARCH_FEE,
        description: `Survey Plan Access - ${estate.name}`,
        estateName: estate.name,
        reference: 'PSF' + Date.now(),
        returnUrl: `/estate/${slug}`,
      }
    });
  };

  const handleSelectPlot = (plot: Plot) => {
    if (plot.status === 'available' || plot.status === 'commercial') {
      setSelectedPlot(plot);
      setShowPurchaseModal(true);
    } else if (plot.status === 'reserved') {
      toast('Reserved. Contact us.', { icon: '⏳' });
    } else {
      toast.error('Sold');
    }
  };

  const handleProceedToPayment = () => {
    if (selectedPlot && estate) {
      setShowPurchaseModal(false);
      navigate('/land-payment-summary', {
        state: {
          plotDetails: {
            plot_number: selectedPlot.plot_number,
            size: selectedPlot.size_sqm,
            type: selectedPlot.plot_type,
            estate: estate.name,
            location: estate.location,
            price: selectedPlot.price
          }
        }
      });
    }
  };

  const getPlotColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'sold': return '#ef4444';
      case 'reserved': return '#f97316';
      case 'commercial': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const getPlotFill = (status: string, isHovered: boolean) => {
    const opacity = isHovered ? 0.95 : 0.75;
    switch (status) {
      case 'available': return `rgba(34, 197, 94, ${opacity})`;
      case 'sold': return `rgba(239, 68, 68, ${opacity})`;
      case 'reserved': return `rgba(249, 115, 22, ${opacity})`;
      case 'commercial': return `rgba(245, 158, 11, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!estate) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Home className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Estate Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="mt-4 px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold">Dashboard</button>
      </div>
    );
  }

  // Calculate stats
  const availableCount = plots.filter(p => p.status === 'available').length;
  const soldCount = plots.filter(p => p.status === 'sold').length;
  const reservedCount = plots.filter(p => p.status === 'reserved').length;
  const commercialCount = plots.filter(p => p.status === 'commercial').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="font-bold text-gray-900 truncate mx-4">{estate.name}</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-xl"><Share2 className="w-5 h-5 text-gray-600" /></button>
            <button onClick={() => setLiked(!liked)} className="p-2 hover:bg-gray-100 rounded-xl"><Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} /></button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative h-52 sm:h-64 lg:h-80">
        <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">{availableCount} Available</span>
              <span className="px-2.5 py-1 bg-red-500/80 text-white text-xs font-bold rounded-full">{soldCount} Sold</span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">{estate.name}</h1>
            <div className="flex items-center gap-1 text-white/90 text-sm"><MapPin className="w-4 h-4" /><span>{estate.location}, Enugu</span></div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Price Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5 mb-6 -mt-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price Range</p>
              <p className="text-2xl lg:text-3xl font-bold text-blue-900">{formatCurrency(estate.min_price)} - {formatCurrency(estate.max_price)}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span className="text-gray-500">{estate.total_plots} Total</span>
                <span className="text-emerald-600 font-semibold">{availableCount} Available</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleWhatsApp} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600">
                <MessageCircle className="w-5 h-5" /> Enquire
              </button>
              <button onClick={() => searchFeePaid ? setActiveTab('plots') : setShowSearchFeeModal(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800">
                {searchFeePaid ? <Map className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                {searchFeePaid ? 'View Plots' : 'Access Plots'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', locked: false },
              { id: 'plots', label: 'PLOTS', locked: !searchFeePaid },
              { id: 'amenities', label: 'Amenities', locked: false },
            ].map((tab) => (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`flex-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap px-4 flex items-center justify-center gap-1.5 ${activeTab === tab.id ? 'border-blue-900 text-blue-900 bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {tab.locked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 lg:p-6">
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">About This Estate</h3>
                  <p className="text-gray-600">{estate.description}</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center">
                    <Building2 className="w-7 h-7 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{estate.total_plots}</p>
                    <p className="text-sm text-blue-100">Total Plots</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white text-center">
                    <CheckCircle className="w-7 h-7 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{availableCount}</p>
                    <p className="text-sm text-emerald-100">Available</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white text-center">
                    <X className="w-7 h-7 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{soldCount}</p>
                    <p className="text-sm text-red-100">Sold</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white text-center">
                    <Shield className="w-7 h-7 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm text-amber-100">Verified</p>
                  </div>
                </div>

                {!searchFeePaid && (
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2"><Lock className="w-5 h-5 text-amber-400" /><span className="text-amber-400 font-medium text-sm">Premium Access</span></div>
                        <h3 className="text-xl font-bold mb-2">View All {estate.total_plots} Plots</h3>
                        <p className="text-blue-200 text-sm">Pay {formatCurrency(SEARCH_FEE)} one-time to access survey plan and all plots.</p>
                      </div>
                      <button onClick={() => setShowSearchFeeModal(true)} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-blue-900 rounded-xl font-bold flex items-center gap-2">
                        <CreditCard className="w-5 h-5" /> Pay {formatCurrency(SEARCH_FEE)}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PLOTS TAB */}
            {activeTab === 'plots' && (
              <>
                {!searchFeePaid ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"><Lock className="w-12 h-12 text-amber-600" /></div>
                    <h3 className="text-2xl font-bold mb-3">Plots Locked</h3>
                    <p className="text-gray-600 mb-6">Pay {formatCurrency(SEARCH_FEE)} to view all {estate.total_plots} plots.</p>
                    <button onClick={() => setShowSearchFeeModal(true)} className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold inline-flex items-center gap-2">
                      <CreditCard className="w-5 h-5" /> Pay to Unlock
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Survey Plan Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl text-white">
                      <div>
                        <h3 className="font-bold text-lg">{estate.name} - Survey Plan</h3>
                        <p className="text-blue-200 text-sm">{estate.total_plots} Plots | File: EN/SURV/{estate.id}/2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setMapZoom(z => Math.max(0.5, z - 0.2))} className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><ZoomOut className="w-5 h-5" /></button>
                        <span className="text-sm px-3">{Math.round(mapZoom * 100)}%</span>
                        <button onClick={() => setMapZoom(z => Math.min(2.5, z + 0.2))} className="p-2 bg-white/20 rounded-lg hover:bg-white/30"><ZoomIn className="w-5 h-5" /></button>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-xl text-sm">
                      <span className="font-semibold">Legend:</span>
                      <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-emerald-500"></div><span>Available ({availableCount})</span></div>
                      <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-red-500"></div><span>Sold ({soldCount})</span></div>
                      <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-orange-500"></div><span>Reserved ({reservedCount})</span></div>
                      <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-amber-500"></div><span>Commercial ({commercialCount})</span></div>
                    </div>

                    {/* Survey Plan SVG - Smaller Plots */}
                    <div className="relative bg-amber-50 rounded-xl border-4 border-amber-300 overflow-auto" style={{ maxHeight: '550px' }}>
                      <div style={{ transform: `scale(${mapZoom})`, transformOrigin: 'top left', transition: 'transform 0.3s' }}>
                        <svg viewBox="0 0 1200 900" className="w-full" style={{ minWidth: '1200px', minHeight: '900px' }}>
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c9a66b" strokeWidth="0.2" opacity="0.4"/>
                            </pattern>
                            <pattern id="hatch-sold" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                              <line x1="0" y1="0" x2="0" y2="4" stroke="#991b1b" strokeWidth="0.8" opacity="0.3"/>
                            </pattern>
                          </defs>
                          
                          <rect x="0" y="0" width="1200" height="900" fill="#fef3e2" />
                          <rect x="0" y="0" width="1200" height="900" fill="url(#grid)" />
                          <rect x="10" y="10" width="1180" height="880" fill="none" stroke="#8B4513" strokeWidth="3" />
                          
                          {/* Title */}
                          <rect x="20" y="20" width="1160" height="45" fill="#1e3a5f" rx="3" />
                          <text x="600" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SURVEY PLAN - {estate.name.toUpperCase()} ({estate.total_plots} PLOTS)</text>
                          
                          {/* Main Road */}
                          <rect x="20" y="70" width="1160" height="25" fill="#374151" rx="2" />
                          <line x1="20" y1="82" x2="1180" y2="82" stroke="#fbbf24" strokeWidth="2" strokeDasharray="10,6" />
                          <text x="600" y="87" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">MAIN ACCESS ROAD (12M)</text>
                          
                          {/* Internal Roads */}
                          <rect x="395" y="100" width="15" height="700" fill="#4b5563" opacity="0.6" />
                          <rect x="790" y="100" width="15" height="700" fill="#4b5563" opacity="0.6" />
                          <rect x="20" y="295" width="1160" height="12" fill="#4b5563" opacity="0.6" />
                          <rect x="20" y="495" width="1160" height="12" fill="#4b5563" opacity="0.6" />
                          <rect x="20" y="695" width="1160" height="12" fill="#4b5563" opacity="0.6" />
                          
                          {/* Plots - Smaller Size */}
                          {plots.slice(0, 72).map((plot, index) => {
                            const cols = 12;
                            const row = Math.floor(index / cols);
                            const col = index % cols;
                            
                            // Account for internal roads
                            const roadOffsetX = col >= 4 ? (col >= 8 ? 30 : 15) : 0;
                            const roadOffsetY = row >= 2 ? (row >= 4 ? (row >= 6 ? 36 : 24) : 12) : 0;
                            
                            const pw = 88; // Smaller width
                            const ph = 60; // Smaller height
                            const gap = 5;
                            const sx = 25 + col * (pw + gap) + roadOffsetX;
                            const sy = 105 + row * (ph + gap) + roadOffsetY;
                            
                            // Irregular shape offsets
                            const r1 = ((index * 3) % 6) - 3;
                            const r2 = ((index * 5) % 6) - 3;
                            const r3 = ((index * 7) % 4) - 2;
                            const r4 = ((index * 11) % 4) - 2;
                            
                            const pathD = `M ${sx + r1} ${sy + r3} L ${sx + pw + r2} ${sy - r3} L ${sx + pw - r1} ${sy + ph + r4} L ${sx - r2} ${sy + ph - r4} Z`;
                            const cx = sx + pw / 2;
                            const cy = sy + ph / 2;
                            const isHov = hoveredPlot?.id === plot.id;
                            
                            return (
                              <g key={plot.id} onClick={() => handleSelectPlot(plot)} onMouseEnter={() => setHoveredPlot(plot)} onMouseLeave={() => setHoveredPlot(null)} style={{ cursor: plot.status === 'sold' ? 'not-allowed' : 'pointer' }}>
                                <path d={pathD} fill={getPlotFill(plot.status, isHov)} stroke={getPlotColor(plot.status)} strokeWidth={isHov ? 2.5 : 1.5} />
                                {plot.status === 'sold' && <path d={pathD} fill="url(#hatch-sold)" />}
                                
                                {/* Plot Number */}
                                <rect x={cx - 22} y={cy - 14} width="44" height="12" fill="white" opacity="0.95" rx="2" />
                                <text x={cx} y={cy - 5} textAnchor="middle" fill="#1e3a5f" fontSize="7" fontWeight="bold">{plot.plot_number}</text>
                                
                                {/* Size */}
                                <text x={cx} y={cy + 5} textAnchor="middle" fill="#374151" fontSize="6">{plot.size_sqm}m²</text>
                                
                                {/* Status Badge */}
                                <rect x={cx - 18} y={cy + 10} width="36" height="10" fill={getPlotColor(plot.status)} rx="5" />
                                <text x={cx} y={cy + 17} textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">{plot.status.toUpperCase()}</text>
                                
                                {/* Corner Markers */}
                                <circle cx={sx + r1} cy={sy + r3} r="2" fill="#8B4513" />
                                <circle cx={sx + pw + r2} cy={sy - r3} r="2" fill="#8B4513" />
                              </g>
                            );
                          })}
                          
                          {/* Compass */}
                          <g transform="translate(1120, 820)">
                            <circle cx="0" cy="0" r="30" fill="#fef3e2" stroke="#8B4513" strokeWidth="2" />
                            <polygon points="0,-24 4,-6 -4,-6" fill="#1e3a5f" />
                            <text x="0" y="-32" textAnchor="middle" fill="#1e3a5f" fontSize="10" fontWeight="bold">N</text>
                            <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                          </g>
                          
                          {/* Footer */}
                          <text x="600" y="840" textAnchor="middle" fill="#1e3a5f" fontSize="8" fontWeight="bold">ENUGU STATE MINISTRY OF LANDS | Scale 1:500</text>
                          <text x="600" y="855" textAnchor="middle" fill="#374151" fontSize="7">Surveyor: Surv. Emmanuel Okonkwo (FNIS) | {new Date().toLocaleDateString('en-GB')}</text>
                        </svg>
                      </div>
                    </div>

                    {/* Hovered Plot Info */}
                    {hoveredPlot && (
                      <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 bg-white rounded-xl shadow-2xl border-2 p-4 z-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold">{hoveredPlot.plot_number}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${hoveredPlot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : hoveredPlot.status === 'sold' ? 'bg-red-100 text-red-700' : hoveredPlot.status === 'reserved' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>{hoveredPlot.status.toUpperCase()}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{hoveredPlot.plot_type} • {hoveredPlot.size_sqm} sqm</p>
                        <p className="font-bold text-blue-900 text-lg mt-1">{formatCurrency(hoveredPlot.price)}</p>
                        {(hoveredPlot.status === 'available' || hoveredPlot.status === 'commercial') && (
                          <button onClick={() => handleSelectPlot(hoveredPlot)} className="w-full mt-2 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-bold">Select Plot</button>
                        )}
                      </div>
                    )}

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {['all', 'available', 'sold', 'reserved', 'commercial'].map((s) => (
                          <button key={s} onClick={() => { setFilterStatus(s as any); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filterStatus === s ? (s === 'available' ? 'bg-emerald-600 text-white' : s === 'sold' ? 'bg-red-600 text-white' : s === 'reserved' ? 'bg-orange-600 text-white' : s === 'commercial' ? 'bg-amber-600 text-white' : 'bg-blue-900 text-white') : 'bg-gray-100'}`}>
                            {s.charAt(0).toUpperCase() + s.slice(1)} ({s === 'all' ? plots.length : plots.filter(p => p.status === s).length})
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}><Grid className="w-4 h-4" /></button>
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}><List className="w-4 h-4" /></button>
                      </div>
                    </div>

                    {/* Plots Grid/List */}
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {paginatedPlots.map((plot) => (
                          <div key={plot.id} onClick={() => handleSelectPlot(plot)} className={`bg-white border-2 rounded-xl p-3 cursor-pointer transition-all hover:shadow-md ${plot.status === 'available' ? 'border-emerald-300 hover:border-emerald-500' : plot.status === 'reserved' ? 'border-orange-300' : plot.status === 'commercial' ? 'border-amber-300' : 'border-red-200 opacity-60'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-sm">{plot.plot_number}</span>
                              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : plot.status === 'sold' ? 'bg-red-100 text-red-700' : plot.status === 'reserved' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>{plot.status}</span>
                            </div>
                            <p className="text-xs text-gray-500">{plot.size_sqm} sqm</p>
                            <p className="font-bold text-blue-900 mt-1">{formatCurrency(plot.price)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {paginatedPlots.map((plot) => (
                          <div key={plot.id} onClick={() => handleSelectPlot(plot)} className={`flex items-center justify-between bg-white border-2 rounded-xl p-3 cursor-pointer transition-all hover:shadow-md ${plot.status === 'available' ? 'border-emerald-300' : plot.status === 'reserved' ? 'border-orange-300' : plot.status === 'commercial' ? 'border-amber-300' : 'border-red-200 opacity-60'}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plot.status === 'available' ? 'bg-emerald-100' : plot.status === 'reserved' ? 'bg-orange-100' : plot.status === 'commercial' ? 'bg-amber-100' : 'bg-red-100'}`}>
                                <Home className={`w-5 h-5 ${plot.status === 'available' ? 'text-emerald-600' : plot.status === 'reserved' ? 'text-orange-600' : plot.status === 'commercial' ? 'text-amber-600' : 'text-red-400'}`} />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{plot.plot_number}</p>
                                <p className="text-xs text-gray-500">{plot.plot_type} • {plot.size_sqm} sqm</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-900">{formatCurrency(plot.price)}</p>
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-1 ${plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : plot.status === 'sold' ? 'bg-red-100 text-red-700' : plot.status === 'reserved' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'}`}>{plot.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-3 pt-4">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="text-sm">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
                      </div>
                    )}

                    {/* Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-sm text-blue-700">Click any <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded text-xs font-bold">GREEN</span> plot to select and purchase.</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* AMENITIES */}
            {activeTab === 'amenities' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><a.icon className="w-5 h-5 text-blue-600" /></div>
                    <div><p className="font-semibold text-sm">{a.label}</p><p className="text-xs text-gray-500">{a.desc}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30">
        <div className="flex gap-3">
          <button onClick={handleWhatsApp} className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-bold"><MessageCircle className="w-5 h-5" /> Enquire</button>
          <button onClick={() => searchFeePaid ? setActiveTab('plots') : setShowSearchFeeModal(true)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-900 text-white rounded-xl font-bold">
            {searchFeePaid ? <Map className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            {searchFeePaid ? 'View Plots' : 'Access Plots'}
          </button>
        </div>
      </div>

      {/* SEARCH FEE MODAL */}
      {showSearchFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-lg">Unlock All Plots</h3>
              <button onClick={() => setShowSearchFeeModal(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><Map className="w-10 h-10 text-amber-600" /></div>
                <h4 className="text-xl font-bold mb-2">Access {estate.total_plots} Plots</h4>
                <p className="text-gray-600 text-sm">Get full access to survey plan and all plots for <span className="font-bold">{estate.name}</span></p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b"><span className="text-gray-600">One-time Fee</span><span className="font-bold text-blue-900 text-2xl">{formatCurrency(SEARCH_FEE)}</span></div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />View detailed survey plan</p>
                  <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />See all {estate.total_plots} plots</p>
                  <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />Check availability</p>
                  <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />Select & purchase</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSearchFeeModal(false)} className="flex-1 py-3.5 border-2 rounded-xl font-semibold">Cancel</button>
                <button onClick={handlePaySearchFee} className="flex-1 py-3.5 bg-blue-900 text-white rounded-xl font-bold flex items-center justify-center gap-2"><CreditCard className="w-5 h-5" /> Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PURCHASE MODAL */}
      {showPurchaseModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 flex justify-between items-center sm:rounded-t-2xl">
              <h3 className="font-bold text-lg">Confirm Selection</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="p-2 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${selectedPlot.status === 'commercial' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                    <Home className={`w-7 h-7 ${selectedPlot.status === 'commercial' ? 'text-amber-600' : 'text-emerald-600'}`} />
                  </div>
                  <div><p className="font-bold text-xl">{selectedPlot.plot_number}</p><p className="text-gray-600">{estate.name}</p></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium">{selectedPlot.plot_type}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Size</span><span className="font-medium">{selectedPlot.size_sqm} sqm</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-medium">{estate.location}</span></div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center"><span className="font-bold">Price</span><span className="font-bold text-blue-900 text-xl">{formatCurrency(selectedPlot.price)}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowPurchaseModal(false)} className="flex-1 py-3.5 border-2 rounded-xl font-semibold">Cancel</button>
                <button onClick={handleProceedToPayment} className="flex-1 py-3.5 bg-blue-900 text-white rounded-xl font-bold">Proceed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}