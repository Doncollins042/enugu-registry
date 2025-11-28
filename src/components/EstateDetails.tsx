import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, Star, Share2, Heart,
  Grid, List, ChevronRight, ChevronLeft, Phone, MessageCircle,
  Ruler, Home, Trees, Zap, Droplets, Car, Filter, Search, X,
  Map, Eye, Lock, CreditCard, Compass, Info, ZoomIn, ZoomOut
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
  // SVG path coordinates for irregular shapes
  path: string;
  labelX: number;
  labelY: number;
}

const SEARCH_FEE = 30000; // ₦30,000 search fee

export default function EstateDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [estate, setEstate] = useState<Estate | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'survey-plan' | 'plots' | 'amenities'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold' | 'reserved' | 'commercial'>('all');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSearchFeeModal, setShowSearchFeeModal] = useState(false);
  const [searchFeePaid, setSearchFeePaid] = useState(false);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const plotsPerPage = 8;

  const [plots, setPlots] = useState<Plot[]>([]);

  useEffect(() => {
    fetchEstate();
  }, [slug]);

  const fetchEstate = async () => {
    try {
      const data = await api.getEstate(slug || '');
      if (data && !data.error) {
        setEstate(data);
        generatePlots(data);
      }
    } catch (error) {
      console.error('Error fetching estate:', error);
      toast.error('Failed to load estate details');
    } finally {
      setLoading(false);
    }
  };

  const generatePlots = (estateData: Estate) => {
    const generatedPlots: Plot[] = [];
    const plotTypes = ['Residential', 'Commercial', 'Corner Piece', 'Standard'];
    const sizes = [450, 500, 600, 900, 1000, 1200];
    
    // Generate irregular plot shapes for survey plan
    const plotPaths = generateSurveyPlanPaths(estateData.total_plots);
    
    for (let i = 0; i < estateData.total_plots; i++) {
      const plotNum = i + 1;
      const isAvailable = plotNum <= estateData.available_plots;
      const basePrice = parseInt(estateData.min_price);
      const maxPrice = parseInt(estateData.max_price);
      const randomPrice = basePrice + Math.random() * (maxPrice - basePrice);
      
      // Determine status
      let status: 'available' | 'sold' | 'reserved' | 'commercial' = 'sold';
      if (isAvailable) {
        // Randomly assign some as reserved or commercial
        const rand = Math.random();
        if (rand < 0.7) status = 'available';
        else if (rand < 0.85) status = 'reserved';
        else status = 'commercial';
      }
      
      generatedPlots.push({
        id: plotNum,
        plot_number: `${estateData.name.substring(0, 2).toUpperCase()}-${String(plotNum).padStart(3, '0')}`,
        size_sqm: sizes[Math.floor(Math.random() * sizes.length)],
        price: Math.round(randomPrice / 100000) * 100000,
        status,
        plot_type: status === 'commercial' ? 'Commercial' : plotTypes[Math.floor(Math.random() * 3)],
        path: plotPaths[i]?.path || '',
        labelX: plotPaths[i]?.labelX || 0,
        labelY: plotPaths[i]?.labelY || 0,
      });
    }
    setPlots(generatedPlots);
  };

  // Generate realistic survey plan paths
  const generateSurveyPlanPaths = (totalPlots: number) => {
    const paths: { path: string; labelX: number; labelY: number }[] = [];
    
    // Create a grid-like layout with irregular shapes
    const cols = Math.ceil(Math.sqrt(totalPlots * 1.5));
    const rows = Math.ceil(totalPlots / cols);
    
    const baseWidth = 800;
    const baseHeight = 600;
    const marginX = 60;
    const marginY = 80;
    const roadWidth = 25;
    
    const availableWidth = baseWidth - (marginX * 2);
    const availableHeight = baseHeight - (marginY * 2) - roadWidth;
    
    const cellWidth = availableWidth / cols;
    const cellHeight = availableHeight / rows;
    
    let plotIndex = 0;
    
    for (let row = 0; row < rows && plotIndex < totalPlots; row++) {
      for (let col = 0; col < cols && plotIndex < totalPlots; col++) {
        // Add slight randomness to create irregular shapes
        const randX1 = (Math.random() - 0.5) * 8;
        const randX2 = (Math.random() - 0.5) * 8;
        const randY1 = (Math.random() - 0.5) * 8;
        const randY2 = (Math.random() - 0.5) * 8;
        
        const x = marginX + col * cellWidth;
        const y = marginY + roadWidth + row * cellHeight;
        
        // Create irregular polygon path
        const x1 = x + 3 + randX1;
        const y1 = y + 3 + randY1;
        const x2 = x + cellWidth - 3 + randX2;
        const y2 = y + 3 - randY1;
        const x3 = x + cellWidth - 3 - randX1;
        const y3 = y + cellHeight - 3 + randY2;
        const x4 = x + 3 - randX2;
        const y4 = y + cellHeight - 3 - randY2;
        
        const path = `M ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} Z`;
        
        paths.push({
          path,
          labelX: x + cellWidth / 2,
          labelY: y + cellHeight / 2,
        });
        
        plotIndex++;
      }
    }
    
    return paths;
  };

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    return '₦' + num.toLocaleString();
  };

  const filteredPlots = plots.filter(plot => {
    if (filterStatus === 'all') return true;
    return plot.status === filterStatus;
  });

  const paginatedPlots = filteredPlots.slice(
    (currentPage - 1) * plotsPerPage,
    currentPage * plotsPerPage
  );

  const totalPages = Math.ceil(filteredPlots.length / plotsPerPage);

  const amenities = [
    { icon: Zap, label: 'Electricity', desc: '24/7 Power Supply' },
    { icon: Droplets, label: 'Water', desc: 'Borehole Water' },
    { icon: Car, label: 'Roads', desc: 'Tarred Roads' },
    { icon: Shield, label: 'Security', desc: 'Gated & Secured' },
    { icon: Trees, label: 'Green Areas', desc: 'Parks & Gardens' },
    { icon: Home, label: 'Drainage', desc: 'Proper Drainage' },
  ];

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in ${estate?.name} at ${estate?.location}. Please provide more information.`;
    window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: estate?.name,
        text: `Check out ${estate?.name} at ${estate?.location}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleViewSurveyPlan = () => {
    if (!searchFeePaid) {
      setShowSearchFeeModal(true);
    } else {
      setActiveTab('survey-plan');
    }
  };

  const handlePaySearchFee = () => {
    setShowSearchFeeModal(false);
    navigate('/payment', {
      state: {
        type: 'Plot Search Fee',
        amount: SEARCH_FEE,
        description: `Survey Plan Access - ${estate?.name}`,
        reference: 'PSF' + Date.now(),
        returnUrl: `/estate/${slug}`,
        onSuccess: () => {
          setSearchFeePaid(true);
          setActiveTab('survey-plan');
        }
      }
    });
  };

  const handleSelectPlot = (plot: Plot) => {
    if (plot.status === 'available') {
      setSelectedPlot(plot);
      setShowPurchaseModal(true);
    } else if (plot.status === 'reserved') {
      toast('This plot is reserved. Contact us for availability.', { icon: '⏳' });
    } else if (plot.status === 'commercial') {
      toast('Commercial plot. Special pricing applies.', { icon: '🏢' });
      setSelectedPlot(plot);
      setShowPurchaseModal(true);
    } else {
      toast.error('This plot has been sold');
    }
  };

  const handleProceedToPayment = () => {
    if (selectedPlot && estate) {
      setShowPurchaseModal(false);
      navigate('/payment', {
        state: {
          type: 'Property Purchase',
          amount: selectedPlot.price,
          description: `${selectedPlot.plot_number} - ${estate.name}, ${estate.location}`,
          reference: 'PP' + Date.now(),
          plotDetails: {
            plot_number: selectedPlot.plot_number,
            size: selectedPlot.size_sqm,
            type: selectedPlot.plot_type,
            estate: estate.name,
            location: estate.location
          }
        }
      });
    }
  };

  const getPlotColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e'; // Green
      case 'sold': return '#ef4444'; // Red
      case 'reserved': return '#f97316'; // Orange
      case 'commercial': return '#f59e0b'; // Amber
      default: return '#94a3b8';
    }
  };

  const getPlotFill = (status: string, isHovered: boolean) => {
    const baseOpacity = isHovered ? 0.9 : 0.7;
    switch (status) {
      case 'available': return `rgba(34, 197, 94, ${baseOpacity})`; // Green
      case 'sold': return `rgba(239, 68, 68, ${baseOpacity})`; // Red
      case 'reserved': return `rgba(249, 115, 22, ${baseOpacity})`; // Orange
      case 'commercial': return `rgba(245, 158, 11, ${baseOpacity})`; // Amber
      default: return `rgba(148, 163, 184, ${baseOpacity})`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!estate) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Estate Not Found</h2>
        <p className="text-gray-600 mb-4">The estate you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-blue-900 text-white rounded-xl">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-900 truncate mx-4">{estate.name}</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-xl">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={() => setLiked(!liked)} className="p-2 hover:bg-gray-100 rounded-xl">
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-56 sm:h-72 lg:h-80">
        <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                {plots.filter(p => p.status === 'available').length} Available
              </span>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                {plots.filter(p => p.status === 'sold').length} Sold
              </span>
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                {plots.filter(p => p.status === 'reserved').length} Reserved
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> Verified
              </span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-1">{estate.name}</h1>
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="w-4 h-4" />
              <span>{estate.location}, Enugu State</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Price & CTA */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 mb-6 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price Range</p>
              <p className="text-2xl lg:text-3xl font-bold text-blue-900">
                {formatCurrency(estate.min_price)} - {formatCurrency(estate.max_price)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {estate.total_plots} total plots • {estate.available_plots} available
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={handleViewSurveyPlan}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all"
              >
                <Map className="w-5 h-5" />
                View Survey Plan
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'survey-plan', label: 'Survey Plan', locked: !searchFeePaid },
              { id: 'plots', label: `Plots (${estate.available_plots})` },
              { id: 'amenities', label: 'Amenities' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'survey-plan' && !searchFeePaid) {
                    setShowSearchFeeModal(true);
                  } else {
                    setActiveTab(tab.id as any);
                  }
                }}
                className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap px-4 flex items-center justify-center gap-1 ${
                  activeTab === tab.id
                    ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.locked && <Lock className="w-3 h-3" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 lg:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About This Estate</h3>
                  <p className="text-gray-600 leading-relaxed">{estate.description}</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-900">{estate.total_plots}</p>
                    <p className="text-sm text-gray-500">Total Plots</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">{plots.filter(p => p.status === 'available').length}</p>
                    <p className="text-sm text-gray-500">Available</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{plots.filter(p => p.status === 'sold').length}</p>
                    <p className="text-sm text-gray-500">Sold</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">{plots.filter(p => p.status === 'reserved' || p.status === 'commercial').length}</p>
                    <p className="text-sm text-gray-500">Reserved/Commercial</p>
                  </div>
                </div>

                {/* Survey Plan Preview - Locked */}
                <div className="relative bg-gray-100 rounded-xl p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-transparent"></div>
                  {!searchFeePaid && (
                    <div className="absolute inset-0 backdrop-blur-sm bg-white/60 flex flex-col items-center justify-center z-10">
                      <Lock className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="font-bold text-gray-900 mb-1">Survey Plan Locked</p>
                      <p className="text-sm text-gray-600 mb-4 text-center px-4">Pay a one-time fee of {formatCurrency(SEARCH_FEE)} to view the detailed survey plan</p>
                      <button
                        onClick={() => setShowSearchFeeModal(true)}
                        className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all flex items-center gap-2"
                      >
                        <Eye className="w-5 h-5" />
                        Unlock Survey Plan
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <Map className="w-5 h-5 text-blue-600" />
                      Survey Plan Preview
                    </h4>
                  </div>
                  <div className="bg-white rounded-lg p-4 h-48 flex items-center justify-center border border-gray-200">
                    <p className="text-gray-400">Survey plan preview</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Government Verified</h4>
                      <p className="text-sm text-blue-700">This property has been verified by the Enugu State Government. All documents are authentic and transactions are secure.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Survey Plan Tab */}
            {activeTab === 'survey-plan' && searchFeePaid && (
              <div className="space-y-4">
                {/* Survey Plan Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl text-white">
                  <div>
                    <h3 className="font-bold text-lg">{estate.name} - Survey Plan</h3>
                    <p className="text-blue-200 text-sm">File No: EN/SURV/{estate.id}/2024 | Sheet 1 of 1</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMapZoom(z => Math.max(0.5, z - 0.25))}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-sm px-2">{Math.round(mapZoom * 100)}%</span>
                    <button
                      onClick={() => setMapZoom(z => Math.min(2, z + 0.25))}
                      className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">Legend:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-500"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-500"></div>
                    <span className="text-sm text-gray-600">Sold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-orange-500"></div>
                    <span className="text-sm text-gray-600">Reserved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-500"></div>
                    <span className="text-sm text-gray-600">Commercial</span>
                  </div>
                </div>

                {/* Survey Plan Map */}
                <div className="relative bg-amber-50 rounded-xl border-4 border-amber-200 overflow-auto" style={{ maxHeight: '600px' }}>
                  <div style={{ transform: `scale(${mapZoom})`, transformOrigin: 'top left', transition: 'transform 0.3s' }}>
                    <svg 
                      viewBox="0 0 800 700" 
                      className="w-full"
                      style={{ minWidth: '800px', minHeight: '700px' }}
                    >
                      {/* Background Pattern */}
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d4a574" strokeWidth="0.3" opacity="0.5"/>
                        </pattern>
                        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="4" stroke="#8B4513" strokeWidth="0.5" opacity="0.3"/>
                        </pattern>
                      </defs>
                      
                      {/* Paper Background */}
                      <rect x="0" y="0" width="800" height="700" fill="#fef3c7" />
                      <rect x="0" y="0" width="800" height="700" fill="url(#grid)" />
                      
                      {/* Border Frame */}
                      <rect x="15" y="15" width="770" height="670" fill="none" stroke="#8B4513" strokeWidth="3" />
                      <rect x="20" y="20" width="760" height="660" fill="none" stroke="#8B4513" strokeWidth="1" />
                      
                      {/* Title Block */}
                      <rect x="25" y="25" width="750" height="50" fill="#1e3a5f" />
                      <text x="400" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="serif">
                        SURVEY PLAN OF {estate.name.toUpperCase()}
                      </text>
                      <text x="400" y="62" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="serif">
                        Located at {estate.location}, Enugu State, Nigeria
                      </text>
                      
                      {/* Main Road */}
                      <rect x="60" y="80" width="680" height="25" fill="#4a5568" rx="2" />
                      <text x="400" y="97" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                        MAIN ACCESS ROAD (12M WIDE)
                      </text>
                      <line x1="60" y1="80" x2="740" y2="80" stroke="#fbbf24" strokeWidth="2" strokeDasharray="10,5" />
                      
                      {/* Estate Boundary */}
                      <path 
                        d="M 55 105 L 745 105 L 750 600 L 50 605 Z" 
                        fill="none" 
                        stroke="#8B4513" 
                        strokeWidth="3"
                        strokeDasharray="15,5"
                      />
                      
                      {/* Internal Roads */}
                      <rect x="390" y="110" width="20" height="490" fill="#6b7280" opacity="0.6" />
                      <rect x="60" y="310" width="680" height="15" fill="#6b7280" opacity="0.6" />
                      
                      {/* Plots */}
                      {plots.map((plot, index) => {
                        // Calculate position based on index
                        const cols = 6;
                        const row = Math.floor(index / cols);
                        const col = index % cols;
                        
                        // Adjust for internal roads
                        const roadOffset = col >= 3 ? 25 : 0;
                        const rowOffset = row >= 3 ? 20 : 0;
                        
                        const plotWidth = 100;
                        const plotHeight = 90;
                        const startX = 65 + col * (plotWidth + 8) + roadOffset;
                        const startY = 115 + row * (plotHeight + 8) + rowOffset;
                        
                        // Create irregular shape variations
                        const rand1 = ((index * 7) % 10) - 5;
                        const rand2 = ((index * 11) % 10) - 5;
                        const rand3 = ((index * 13) % 8) - 4;
                        const rand4 = ((index * 17) % 8) - 4;
                        
                        const pathD = `
                          M ${startX + rand1} ${startY + rand3}
                          L ${startX + plotWidth + rand2} ${startY - rand3}
                          L ${startX + plotWidth - rand1} ${startY + plotHeight + rand4}
                          L ${startX - rand2} ${startY + plotHeight - rand4}
                          Z
                        `;
                        
                        const centerX = startX + plotWidth / 2;
                        const centerY = startY + plotHeight / 2;
                        
                        const isHovered = hoveredPlot?.id === plot.id;
                        
                        return (
                          <g 
                            key={plot.id}
                            onClick={() => handleSelectPlot(plot)}
                            onMouseEnter={() => setHoveredPlot(plot)}
                            onMouseLeave={() => setHoveredPlot(null)}
                            style={{ cursor: plot.status === 'sold' ? 'not-allowed' : 'pointer' }}
                          >
                            {/* Plot Shape */}
                            <path
                              d={pathD}
                              fill={getPlotFill(plot.status, isHovered)}
                              stroke={getPlotColor(plot.status)}
                              strokeWidth={isHovered ? 3 : 1.5}
                              className="transition-all duration-200"
                            />
                            
                            {/* Plot hatching for sold plots */}
                            {plot.status === 'sold' && (
                              <path
                                d={pathD}
                                fill="url(#hatch)"
                                stroke="none"
                              />
                            )}
                            
                            {/* Plot Number */}
                            <text
                              x={centerX}
                              y={centerY - 8}
                              textAnchor="middle"
                              fill={plot.status === 'sold' ? '#991b1b' : '#1e3a5f'}
                              fontSize="9"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              {plot.plot_number}
                            </text>
                            
                            {/* Plot Size */}
                            <text
                              x={centerX}
                              y={centerY + 6}
                              textAnchor="middle"
                              fill={plot.status === 'sold' ? '#991b1b' : '#374151'}
                              fontSize="7"
                              fontFamily="sans-serif"
                            >
                              {plot.size_sqm}m²
                            </text>
                            
                            {/* Status indicator */}
                            <text
                              x={centerX}
                              y={centerY + 18}
                              textAnchor="middle"
                              fill={getPlotColor(plot.status)}
                              fontSize="6"
                              fontWeight="bold"
                              textTransform="uppercase"
                            >
                              {plot.status}
                            </text>
                            
                            {/* Corner markers */}
                            <circle cx={startX + rand1} cy={startY + rand3} r="2" fill="#8B4513" />
                            <circle cx={startX + plotWidth + rand2} cy={startY - rand3} r="2" fill="#8B4513" />
                            <circle cx={startX + plotWidth - rand1} cy={startY + plotHeight + rand4} r="2" fill="#8B4513" />
                            <circle cx={startX - rand2} cy={startY + plotHeight - rand4} r="2" fill="#8B4513" />
                          </g>
                        );
                      })}
                      
                      {/* Compass Rose */}
                      <g transform="translate(700, 550)">
                        <circle cx="0" cy="0" r="35" fill="#fef3c7" stroke="#8B4513" strokeWidth="2" />
                        <polygon points="0,-30 5,-5 -5,-5" fill="#1e3a5f" />
                        <polygon points="0,30 5,5 -5,5" fill="#8B4513" />
                        <polygon points="-30,0 -5,5 -5,-5" fill="#6b7280" />
                        <polygon points="30,0 5,5 5,-5" fill="#6b7280" />
                        <text x="0" y="-38" textAnchor="middle" fill="#1e3a5f" fontSize="10" fontWeight="bold">N</text>
                        <text x="0" y="48" textAnchor="middle" fill="#8B4513" fontSize="8">S</text>
                        <text x="-42" y="4" textAnchor="middle" fill="#6b7280" fontSize="8">W</text>
                        <text x="42" y="4" textAnchor="middle" fill="#6b7280" fontSize="8">E</text>
                        <circle cx="0" cy="0" r="5" fill="#fbbf24" />
                      </g>
                      
                      {/* Scale Bar */}
                      <g transform="translate(60, 630)">
                        <text x="0" y="0" fill="#1e3a5f" fontSize="9" fontWeight="bold">SCALE: 1:500</text>
                        <rect x="0" y="8" width="50" height="6" fill="#1e3a5f" />
                        <rect x="50" y="8" width="50" height="6" fill="white" stroke="#1e3a5f" />
                        <rect x="100" y="8" width="50" height="6" fill="#1e3a5f" />
                        <text x="0" y="28" fill="#374151" fontSize="7">0</text>
                        <text x="50" y="28" fill="#374151" fontSize="7">25m</text>
                        <text x="100" y="28" fill="#374151" fontSize="7">50m</text>
                        <text x="150" y="28" fill="#374151" fontSize="7">75m</text>
                      </g>
                      
                      {/* Surveyor Info */}
                      <g transform="translate(400, 620)">
                        <text x="0" y="0" textAnchor="middle" fill="#1e3a5f" fontSize="8" fontWeight="bold">
                          PREPARED BY: ENUGU STATE SURVEY DEPARTMENT
                        </text>
                        <text x="0" y="14" textAnchor="middle" fill="#374151" fontSize="7">
                          Licensed Surveyor: Surv. Emmanuel Okonkwo | Reg. No: EN/SVR/2024/0456
                        </text>
                        <text x="0" y="26" textAnchor="middle" fill="#374151" fontSize="7">
                          Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </text>
                      </g>
                      
                      {/* Government Seal */}
                      <g transform="translate(700, 640)">
                        <circle cx="0" cy="0" r="25" fill="none" stroke="#1e3a5f" strokeWidth="2" />
                        <circle cx="0" cy="0" r="20" fill="none" stroke="#1e3a5f" strokeWidth="1" />
                        <text x="0" y="-5" textAnchor="middle" fill="#1e3a5f" fontSize="6" fontWeight="bold">ENUGU STATE</text>
                        <text x="0" y="5" textAnchor="middle" fill="#1e3a5f" fontSize="5">GOVT SEAL</text>
                        <text x="0" y="13" textAnchor="middle" fill="#1e3a5f" fontSize="4">VERIFIED</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Hovered Plot Info */}
                {hoveredPlot && (
                  <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{hoveredPlot.plot_number}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        hoveredPlot.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                        hoveredPlot.status === 'sold' ? 'bg-red-100 text-red-700' :
                        hoveredPlot.status === 'reserved' ? 'bg-orange-100 text-orange-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {hoveredPlot.status.charAt(0).toUpperCase() + hoveredPlot.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">Type: <span className="font-medium">{hoveredPlot.plot_type}</span></p>
                      <p className="text-gray-600">Size: <span className="font-medium">{hoveredPlot.size_sqm} sqm</span></p>
                      <p className="text-gray-600">Price: <span className="font-bold text-blue-900">{formatCurrency(hoveredPlot.price)}</span></p>
                    </div>
                    {hoveredPlot.status === 'available' && (
                      <button
                        onClick={() => handleSelectPlot(hoveredPlot)}
                        className="w-full mt-3 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800"
                      >
                        Select This Plot
                      </button>
                    )}
                  </div>
                )}

                {/* Plot Selection Info */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">How to Select a Plot</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Click on any <span className="text-emerald-600 font-medium">green plot</span> to select it for purchase. 
                        Red plots are sold, orange plots are reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plots Tab - List View */}
            {activeTab === 'plots' && (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <button
                      onClick={() => { setFilterStatus('all'); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        filterStatus === 'all' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All ({plots.length})
                    </button>
                    <button
                      onClick={() => { setFilterStatus('available'); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        filterStatus === 'available' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Available ({plots.filter(p => p.status === 'available').length})
                    </button>
                    <button
                      onClick={() => { setFilterStatus('sold'); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        filterStatus === 'sold' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Sold ({plots.filter(p => p.status === 'sold').length})
                    </button>
                    <button
                      onClick={() => { setFilterStatus('reserved'); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        filterStatus === 'reserved' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Reserved ({plots.filter(p => p.status === 'reserved').length})
                    </button>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Plots Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {paginatedPlots.map((plot) => (
                      <div
                        key={plot.id}
                        onClick={() => handleSelectPlot(plot)}
                        className={`bg-white border rounded-xl p-4 transition-all ${
                          plot.status === 'available' 
                            ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-lg cursor-pointer bg-emerald-50/30' 
                            : plot.status === 'reserved'
                            ? 'border-orange-200 hover:border-orange-400 hover:shadow-lg cursor-pointer bg-orange-50/30'
                            : plot.status === 'commercial'
                            ? 'border-amber-200 hover:border-amber-400 hover:shadow-lg cursor-pointer bg-amber-50/30'
                            : 'border-red-100 opacity-60 cursor-not-allowed bg-red-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900 text-sm">{plot.plot_number}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                            plot.status === 'sold' ? 'bg-red-100 text-red-700' :
                            plot.status === 'reserved' ? 'bg-orange-100 text-orange-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {plot.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{plot.plot_type}</p>
                        <p className="text-xs text-gray-500 mb-2">{plot.size_sqm} sqm</p>
                        <p className="font-bold text-blue-900">{formatCurrency(plot.price)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {paginatedPlots.map((plot) => (
                      <div
                        key={plot.id}
                        onClick={() => handleSelectPlot(plot)}
                        className={`flex items-center justify-between bg-white border rounded-xl p-4 transition-all ${
                          plot.status === 'available' 
                            ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-lg cursor-pointer' 
                            : plot.status === 'reserved'
                            ? 'border-orange-200 hover:border-orange-400 hover:shadow-lg cursor-pointer'
                            : plot.status === 'commercial'
                            ? 'border-amber-200 hover:border-amber-400 hover:shadow-lg cursor-pointer'
                            : 'border-red-100 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            plot.status === 'available' ? 'bg-emerald-100' :
                            plot.status === 'reserved' ? 'bg-orange-100' :
                            plot.status === 'commercial' ? 'bg-amber-100' :
                            'bg-red-100'
                          }`}>
                            <Home className={`w-6 h-6 ${
                              plot.status === 'available' ? 'text-emerald-600' :
                              plot.status === 'reserved' ? 'text-orange-600' :
                              plot.status === 'commercial' ? 'text-amber-600' :
                              'text-red-400'
                            }`} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{plot.plot_number}</p>
                            <p className="text-sm text-gray-500">{plot.plot_type} • {plot.size_sqm} sqm</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-900">{formatCurrency(plot.price)}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                            plot.status === 'sold' ? 'bg-red-100 text-red-700' :
                            plot.status === 'reserved' ? 'bg-orange-100 text-orange-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {plot.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === 'amenities' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <amenity.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{amenity.label}</p>
                      <p className="text-sm text-gray-500">{amenity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating CTA - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <div className="flex gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Chat
          </button>
          <button
            onClick={handleViewSurveyPlan}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-900 text-white rounded-xl font-semibold"
          >
            <Map className="w-5 h-5" />
            Survey Plan
          </button>
        </div>
      </div>

      {/* Search Fee Modal */}
      {showSearchFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Plot Search Fee</h3>
                <button onClick={() => setShowSearchFeeModal(false)} className="p-1 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-amber-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Access Survey Plan</h4>
                <p className="text-gray-600 text-sm">
                  Pay a one-time fee to view the detailed survey plan with all plot positions, sizes, and availability status.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Survey Plan Access</span>
                  <span className="font-bold text-gray-900">{formatCurrency(SEARCH_FEE)}</span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>✓ View complete survey plan layout</p>
                  <p>✓ See all plot positions and boundaries</p>
                  <p>✓ Check real-time availability status</p>
                  <p>✓ Access plot sizes and dimensions</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSearchFeeModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaySearchFee}
                  className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay {formatCurrency(SEARCH_FEE)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">Confirm Purchase</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="p-1 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedPlot.status === 'commercial' ? 'bg-amber-100' : 'bg-emerald-100'
                  }`}>
                    <Home className={`w-6 h-6 ${selectedPlot.status === 'commercial' ? 'text-amber-600' : 'text-emerald-600'}`} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{selectedPlot.plot_number}</p>
                    <p className="text-sm text-gray-600">{estate.name}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Plot Type</span>
                    <span className="font-medium">{selectedPlot.plot_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size</span>
                    <span className="font-medium">{selectedPlot.size_sqm} sqm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium">{estate.location}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Price</span>
                    <span className="font-bold text-blue-900">{formatCurrency(selectedPlot.price)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}