import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, Share2, Heart,
  Grid, List, ChevronRight, ChevronLeft, MessageCircle,
  Home, Trees, Zap, Droplets, Car, X,
  Map, Lock, CreditCard, Info, ZoomIn, ZoomOut,
  Building2, FileText, Clock, Users, Award
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

export default function EstateDetails() {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Fetch estate on mount
  useEffect(() => {
    fetchEstate();
  }, [slug]);

  // Check if returning from successful payment
  useEffect(() => {
    if (location.state?.paymentSuccess && estate) {
      const paidEstates = JSON.parse(localStorage.getItem('paidSearchFees') || '[]');
      if (paidEstates.includes(estate.name)) {
        setSearchFeePaid(true);
        setActiveTab('survey-plan');
        toast.success('Payment successful! You now have full access.');
      }
      // Clear the state to prevent repeated toasts
      window.history.replaceState({}, document.title);
    }
  }, [location.state, estate]);

  const fetchEstate = async () => {
    try {
      setLoading(true);
      const allEstates = await api.getEstates();
      
      if (Array.isArray(allEstates) && allEstates.length > 0) {
        const foundEstate = allEstates.find((e: Estate) => 
          e.slug === slug || 
          e.id.toString() === slug ||
          e.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (foundEstate) {
          setEstate(foundEstate);
          generatePlots(foundEstate);
          
          // Check if search fee was already paid for this estate
          const paidEstates = JSON.parse(localStorage.getItem('paidSearchFees') || '[]');
          if (paidEstates.includes(foundEstate.name)) {
            setSearchFeePaid(true);
          }
        } else {
          toast.error('Estate not found');
        }
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
    
    for (let i = 0; i < estateData.total_plots; i++) {
      const plotNum = i + 1;
      const isAvailable = plotNum <= estateData.available_plots;
      const basePrice = parseInt(estateData.min_price);
      const maxPrice = parseInt(estateData.max_price);
      const randomPrice = basePrice + Math.random() * (maxPrice - basePrice);
      
      let status: 'available' | 'sold' | 'reserved' | 'commercial' = 'sold';
      if (isAvailable) {
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
      });
    }
    setPlots(generatedPlots);
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

  const estateFeatures = [
    { icon: FileText, label: 'C of O', desc: 'Certificate of Occupancy' },
    { icon: Shield, label: 'Registered', desc: 'Government Approved' },
    { icon: Award, label: 'Premium', desc: 'High Value Location' },
    { icon: Users, label: 'Community', desc: 'Gated Community' },
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

  const handleTabClick = (tabId: string) => {
    if ((tabId === 'survey-plan' || tabId === 'plots') && !searchFeePaid) {
      setShowSearchFeeModal(true);
    } else {
      setActiveTab(tabId as any);
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
      case 'available': return '#22c55e';
      case 'sold': return '#ef4444';
      case 'reserved': return '#f97316';
      case 'commercial': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const getPlotFill = (status: string, isHovered: boolean) => {
    const baseOpacity = isHovered ? 0.9 : 0.7;
    switch (status) {
      case 'available': return `rgba(34, 197, 94, ${baseOpacity})`;
      case 'sold': return `rgba(239, 68, 68, ${baseOpacity})`;
      case 'reserved': return `rgba(249, 115, 22, ${baseOpacity})`;
      case 'commercial': return `rgba(245, 158, 11, ${baseOpacity})`;
      default: return `rgba(148, 163, 184, ${baseOpacity})`;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading estate details...</p>
        </div>
      </div>
    );
  }

  // Estate not found
  if (!estate) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <Home className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Estate Not Found</h2>
        <p className="text-gray-600 mb-4 text-center">The estate you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-900 truncate mx-4">{estate.name}</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={() => setLiked(!liked)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <Heart className={`w-5 h-5 transition-all ${liked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-60 sm:h-72 lg:h-96">
        <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                {estate.available_plots} Plots Available
              </span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" /> Government Verified
              </span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">{estate.name}</h1>
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="w-4 h-4" />
              <span>{estate.location}, Enugu State</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Price Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 lg:p-6 mb-6 -mt-12 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price Range (Per Plot)</p>
              <p className="text-2xl lg:text-3xl font-bold text-blue-900">
                {formatCurrency(estate.min_price)} - {formatCurrency(estate.max_price)}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500">{estate.total_plots} Total Plots</span>
                <span className="text-sm text-emerald-600 font-semibold">{estate.available_plots} Available</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5" />
                Enquire Now
              </button>
              <button
                onClick={() => {
                  if (!searchFeePaid) {
                    setShowSearchFeeModal(true);
                  } else {
                    setActiveTab('survey-plan');
                  }
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
              >
                {searchFeePaid ? <Map className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                {searchFeePaid ? 'View Survey Plan' : 'Access Plots'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', locked: false },
              { id: 'survey-plan', label: 'Survey Plan', locked: !searchFeePaid },
              { id: 'plots', label: 'Available Plots', locked: !searchFeePaid },
              { id: 'amenities', label: 'Amenities', locked: false },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap px-4 flex items-center justify-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.locked && <Lock className="w-3.5 h-3.5 text-amber-500" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 lg:p-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About This Estate</h3>
                  <p className="text-gray-600 leading-relaxed">{estate.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Estate Features</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {estateFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{feature.label}</p>
                          <p className="text-xs text-gray-500">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center shadow-lg">
                    <Building2 className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{estate.total_plots}</p>
                    <p className="text-sm text-blue-100">Total Plots</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white text-center shadow-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">{estate.available_plots}</p>
                    <p className="text-sm text-emerald-100">Available</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white text-center shadow-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">Instant</p>
                    <p className="text-sm text-amber-100">Allocation</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center shadow-lg">
                    <Shield className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm text-purple-100">Verified</p>
                  </div>
                </div>

                {/* CTA to Unlock - Only show if not paid */}
                {!searchFeePaid && (
                  <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock className="w-5 h-5 text-amber-400" />
                          <span className="text-amber-400 font-medium text-sm">Premium Access Required</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">View Available Plots & Survey Plan</h3>
                        <p className="text-blue-200 text-sm">
                          Pay a one-time search fee of <span className="text-amber-400 font-bold">{formatCurrency(SEARCH_FEE)}</span> to access the detailed survey plan and all plot information.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mt-4 text-sm">
                          <span className="flex items-center gap-1.5 text-blue-200">
                            <CheckCircle className="w-4 h-4 text-emerald-400" /> View Survey Plan
                          </span>
                          <span className="flex items-center gap-1.5 text-blue-200">
                            <CheckCircle className="w-4 h-4 text-emerald-400" /> See All Plots
                          </span>
                          <span className="flex items-center gap-1.5 text-blue-200">
                            <CheckCircle className="w-4 h-4 text-emerald-400" /> Select & Purchase
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setShowSearchFeeModal(true)}
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-blue-900 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
                      >
                        <CreditCard className="w-5 h-5" />
                        Pay {formatCurrency(SEARCH_FEE)}
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-800">Government Verified Property</h4>
                      <p className="text-sm text-emerald-700 mt-1">
                        This estate has been verified by the Enugu State Ministry of Lands. All documents are authentic and transactions are 100% secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SURVEY PLAN TAB */}
            {activeTab === 'survey-plan' && (
              <>
                {!searchFeePaid ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lock className="w-12 h-12 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Survey Plan Locked</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Pay a one-time fee of {formatCurrency(SEARCH_FEE)} to view the detailed survey plan with all plot positions and boundaries.
                    </p>
                    <button
                      onClick={() => setShowSearchFeeModal(true)}
                      className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 inline-flex items-center gap-2 shadow-lg"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay {formatCurrency(SEARCH_FEE)} to Unlock
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Survey Plan Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl text-white">
                      <div>
                        <h3 className="font-bold text-lg">{estate.name} - Survey Plan</h3>
                        <p className="text-blue-200 text-sm">File No: EN/SURV/{estate.id}/2024 | Sheet 1 of 1</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setMapZoom(z => Math.max(0.5, z - 0.25))} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all">
                          <ZoomOut className="w-5 h-5" />
                        </button>
                        <span className="text-sm px-3 bg-white/10 rounded-lg py-1">{Math.round(mapZoom * 100)}%</span>
                        <button onClick={() => setMapZoom(z => Math.min(2, z + 0.25))} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all">
                          <ZoomIn className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <span className="text-sm font-semibold text-gray-700">Legend:</span>
                      <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-emerald-500"></div><span className="text-sm font-medium">Available</span></div>
                      <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-red-500"></div><span className="text-sm font-medium">Sold</span></div>
                      <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-orange-500"></div><span className="text-sm font-medium">Reserved</span></div>
                      <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-amber-500"></div><span className="text-sm font-medium">Commercial</span></div>
                    </div>

                    {/* Survey Plan SVG */}
                    <div className="relative bg-amber-50 rounded-xl border-4 border-amber-300 overflow-auto shadow-inner" style={{ maxHeight: '650px' }}>
                      <div style={{ transform: `scale(${mapZoom})`, transformOrigin: 'top left', transition: 'transform 0.3s ease-out' }}>
                        <svg viewBox="0 0 900 700" className="w-full" style={{ minWidth: '900px', minHeight: '700px' }}>
                          <defs>
                            <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#c9a66b" strokeWidth="0.3" opacity="0.5"/>
                            </pattern>
                            <pattern id="hatch-sold" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                              <line x1="0" y1="0" x2="0" y2="6" stroke="#991b1b" strokeWidth="1" opacity="0.4"/>
                            </pattern>
                          </defs>
                          
                          {/* Background */}
                          <rect x="0" y="0" width="900" height="700" fill="#fef3e2" />
                          <rect x="0" y="0" width="900" height="700" fill="url(#grid)" />
                          
                          {/* Border */}
                          <rect x="15" y="15" width="870" height="670" fill="none" stroke="#8B4513" strokeWidth="4" />
                          <rect x="22" y="22" width="856" height="656" fill="none" stroke="#8B4513" strokeWidth="1.5" />
                          
                          {/* Title */}
                          <rect x="30" y="30" width="840" height="55" fill="#1e3a5f" rx="3" />
                          <text x="450" y="55" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">SURVEY PLAN OF {estate.name.toUpperCase()}</text>
                          <text x="450" y="73" textAnchor="middle" fill="#fbbf24" fontSize="10">{estate.location}, Enugu State | File: EN/SURV/{estate.id}/2024</text>
                          
                          {/* Main Road */}
                          <rect x="30" y="90" width="840" height="35" fill="#374151" rx="2" />
                          <line x1="30" y1="107" x2="870" y2="107" stroke="#fbbf24" strokeWidth="2" strokeDasharray="15,8" />
                          <text x="450" y="112" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MAIN ACCESS ROAD (12M WIDE)</text>
                          
                          {/* Internal Roads */}
                          <rect x="430" y="130" width="25" height="450" fill="#4b5563" opacity="0.7" />
                          <rect x="30" y="350" width="840" height="20" fill="#4b5563" opacity="0.7" />
                          
                          {/* Plots */}
                          {plots.slice(0, 24).map((plot, index) => {
                            const cols = 6;
                            const row = Math.floor(index / cols);
                            const col = index % cols;
                            const roadX = col >= 3 ? 35 : 0;
                            const roadY = row >= 2 ? 30 : 0;
                            const pw = 125, ph = 100;
                            const sx = 40 + col * (pw + 8) + roadX;
                            const sy = 135 + row * (ph + 8) + roadY;
                            
                            // Create irregular shapes
                            const r1 = ((index * 7) % 10) - 5;
                            const r2 = ((index * 11) % 10) - 5;
                            const r3 = ((index * 13) % 8) - 4;
                            const r4 = ((index * 17) % 8) - 4;
                            
                            const pathD = `M ${sx + r1} ${sy + r3} L ${sx + pw + r2} ${sy - r3} L ${sx + pw - r1} ${sy + ph + r4} L ${sx - r2} ${sy + ph - r4} Z`;
                            const cx = sx + pw / 2, cy = sy + ph / 2;
                            const isHov = hoveredPlot?.id === plot.id;
                            
                            return (
                              <g 
                                key={plot.id} 
                                onClick={() => handleSelectPlot(plot)} 
                                onMouseEnter={() => setHoveredPlot(plot)} 
                                onMouseLeave={() => setHoveredPlot(null)} 
                                style={{ cursor: plot.status === 'sold' ? 'not-allowed' : 'pointer' }}
                                className="transition-all"
                              >
                                {/* Plot Shape */}
                                <path d={pathD} fill={getPlotFill(plot.status, isHov)} stroke={getPlotColor(plot.status)} strokeWidth={isHov ? 3 : 2} />
                                {plot.status === 'sold' && <path d={pathD} fill="url(#hatch-sold)" />}
                                
                                {/* Plot Number Background */}
                                <rect x={cx - 28} y={cy - 22} width="56" height="16" fill="white" opacity="0.95" rx="2" />
                                
                                {/* Plot Number */}
                                <text x={cx} y={cy - 10} textAnchor="middle" fill="#1e3a5f" fontSize="10" fontWeight="bold">{plot.plot_number}</text>
                                
                                {/* Size */}
                                <text x={cx} y={cy + 5} textAnchor="middle" fill="#374151" fontSize="9">{plot.size_sqm}m²</text>
                                
                                {/* Status Badge */}
                                <rect x={cx - 24} y={cy + 12} width="48" height="14" fill={getPlotColor(plot.status)} rx="7" />
                                <text x={cx} y={cy + 22} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{plot.status.toUpperCase()}</text>
                                
                                {/* Corner Markers */}
                                <circle cx={sx + r1} cy={sy + r3} r="3" fill="#8B4513" />
                                <circle cx={sx + pw + r2} cy={sy - r3} r="3" fill="#8B4513" />
                                <circle cx={sx + pw - r1} cy={sy + ph + r4} r="3" fill="#8B4513" />
                                <circle cx={sx - r2} cy={sy + ph - r4} r="3" fill="#8B4513" />
                              </g>
                            );
                          })}
                          
                          {/* Compass */}
                          <g transform="translate(810, 550)">
                            <circle cx="0" cy="0" r="40" fill="#fef3e2" stroke="#8B4513" strokeWidth="2" />
                            <polygon points="0,-32 6,-8 -6,-8" fill="#1e3a5f" />
                            <polygon points="0,32 6,8 -6,8" fill="#8B4513" />
                            <text x="0" y="-42" textAnchor="middle" fill="#1e3a5f" fontSize="12" fontWeight="bold">N</text>
                            <circle cx="0" cy="0" r="6" fill="#fbbf24" />
                          </g>
                          
                          {/* Scale */}
                          <g transform="translate(50, 630)">
                            <text x="0" y="0" fill="#1e3a5f" fontSize="10" fontWeight="bold">SCALE: 1:500</text>
                            <rect x="0" y="8" width="50" height="6" fill="#1e3a5f" />
                            <rect x="50" y="8" width="50" height="6" fill="white" stroke="#1e3a5f" />
                            <rect x="100" y="8" width="50" height="6" fill="#1e3a5f" />
                            <text x="0" y="26" fill="#374151" fontSize="8">0</text>
                            <text x="50" y="26" fill="#374151" fontSize="8">25m</text>
                            <text x="100" y="26" fill="#374151" fontSize="8">50m</text>
                          </g>
                          
                          {/* Footer */}
                          <text x="450" y="650" textAnchor="middle" fill="#1e3a5f" fontSize="9" fontWeight="bold">ENUGU STATE MINISTRY OF LANDS & SURVEY</text>
                          <text x="450" y="665" textAnchor="middle" fill="#374151" fontSize="8">Surveyor: Surv. Emmanuel Okonkwo (FNIS) | Date: {new Date().toLocaleDateString('en-GB')}</text>
                          
                          {/* Seal */}
                          <g transform="translate(810, 640)">
                            <circle cx="0" cy="0" r="25" fill="none" stroke="#1e3a5f" strokeWidth="2" />
                            <text x="0" y="-5" textAnchor="middle" fill="#1e3a5f" fontSize="6" fontWeight="bold">ENUGU STATE</text>
                            <text x="0" y="5" textAnchor="middle" fill="#22c55e" fontSize="6" fontWeight="bold">VERIFIED ✓</text>
                          </g>
                        </svg>
                      </div>
                    </div>

                    {/* Hovered Plot Info */}
                    {hoveredPlot && (
                      <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 z-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-lg">{hoveredPlot.plot_number}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            hoveredPlot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 
                            hoveredPlot.status === 'sold' ? 'bg-red-100 text-red-700' : 
                            hoveredPlot.status === 'reserved' ? 'bg-orange-100 text-orange-700' : 
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {hoveredPlot.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-500">{hoveredPlot.plot_type} • {hoveredPlot.size_sqm} sqm</p>
                          <p className="font-bold text-blue-900 text-xl mt-2">{formatCurrency(hoveredPlot.price)}</p>
                        </div>
                        {(hoveredPlot.status === 'available' || hoveredPlot.status === 'commercial') && (
                          <button onClick={() => handleSelectPlot(hoveredPlot)} className="w-full mt-3 py-3 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-all">
                            Select This Plot
                          </button>
                        )}
                      </div>
                    )}

                    {/* Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">
                          Click on any <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white rounded text-xs font-bold">GREEN</span> plot to select and purchase. 
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white rounded text-xs font-bold ml-1">RED</span> = Sold
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white rounded text-xs font-bold ml-1">ORANGE</span> = Reserved
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500 text-white rounded text-xs font-bold ml-1">AMBER</span> = Commercial
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* PLOTS TAB */}
            {activeTab === 'plots' && (
              <>
                {!searchFeePaid ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Lock className="w-12 h-12 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Plot Details Locked</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Pay a one-time fee of {formatCurrency(SEARCH_FEE)} to view all available plots with their sizes and prices.
                    </p>
                    <button onClick={() => setShowSearchFeeModal(true)} className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 inline-flex items-center gap-2 shadow-lg">
                      <CreditCard className="w-5 h-5" />Pay {formatCurrency(SEARCH_FEE)} to Unlock
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {['all', 'available', 'sold', 'reserved', 'commercial'].map((s) => (
                          <button 
                            key={s} 
                            onClick={() => { setFilterStatus(s as any); setCurrentPage(1); }} 
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              filterStatus === s 
                                ? (s === 'available' ? 'bg-emerald-600 text-white shadow-md' : 
                                   s === 'sold' ? 'bg-red-600 text-white shadow-md' : 
                                   s === 'reserved' ? 'bg-orange-600 text-white shadow-md' : 
                                   s === 'commercial' ? 'bg-amber-600 text-white shadow-md' : 
                                   'bg-blue-900 text-white shadow-md') 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {s.charAt(0).toUpperCase() + s.slice(1)} ({s === 'all' ? plots.length : plots.filter(p => p.status === s).length})
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}>
                          <Grid className="w-4 h-4" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}>
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Plots Grid */}
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {paginatedPlots.map((plot) => (
                          <div 
                            key={plot.id} 
                            onClick={() => handleSelectPlot(plot)} 
                            className={`bg-white border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
                              plot.status === 'available' ? 'border-emerald-300 hover:border-emerald-500 cursor-pointer' : 
                              plot.status === 'reserved' ? 'border-orange-300 hover:border-orange-500 cursor-pointer' : 
                              plot.status === 'commercial' ? 'border-amber-300 hover:border-amber-500 cursor-pointer' : 
                              'border-red-200 opacity-60 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-gray-900">{plot.plot_number}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 
                                plot.status === 'sold' ? 'bg-red-100 text-red-700' : 
                                plot.status === 'reserved' ? 'bg-orange-100 text-orange-700' : 
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {plot.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{plot.plot_type}</p>
                            <p className="text-sm text-gray-500 mb-2">{plot.size_sqm} sqm</p>
                            <p className="font-bold text-blue-900 text-lg">{formatCurrency(plot.price)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {paginatedPlots.map((plot) => (
                          <div 
                            key={plot.id} 
                            onClick={() => handleSelectPlot(plot)} 
                            className={`flex items-center justify-between bg-white border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
                              plot.status === 'available' ? 'border-emerald-300 hover:border-emerald-500 cursor-pointer' : 
                              plot.status === 'reserved' ? 'border-orange-300 hover:border-orange-500 cursor-pointer' : 
                              plot.status === 'commercial' ? 'border-amber-300 hover:border-amber-500 cursor-pointer' : 
                              'border-red-200 opacity-60 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                plot.status === 'available' ? 'bg-emerald-100' : 
                                plot.status === 'reserved' ? 'bg-orange-100' : 
                                plot.status === 'commercial' ? 'bg-amber-100' : 
                                'bg-red-100'
                              }`}>
                                <Home className={`w-7 h-7 ${
                                  plot.status === 'available' ? 'text-emerald-600' : 
                                  plot.status === 'reserved' ? 'text-orange-600' : 
                                  plot.status === 'commercial' ? 'text-amber-600' : 
                                  'text-red-400'
                                }`} />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-lg">{plot.plot_number}</p>
                                <p className="text-sm text-gray-500">{plot.plot_type} • {plot.size_sqm} sqm</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-900 text-lg">{formatCurrency(plot.price)}</p>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${
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
                      <div className="flex items-center justify-center gap-3 pt-4 border-t">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* AMENITIES TAB */}
            {activeTab === 'amenities' && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <a.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{a.label}</p>
                      <p className="text-sm text-gray-500">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30 shadow-lg">
        <div className="flex gap-3">
          <button onClick={handleWhatsApp} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-emerald-500 text-white rounded-xl font-bold shadow-md">
            <MessageCircle className="w-5 h-5" />
            Enquire
          </button>
          <button 
            onClick={() => !searchFeePaid ? setShowSearchFeeModal(true) : setActiveTab('survey-plan')} 
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-900 text-white rounded-xl font-bold shadow-md"
          >
            {searchFeePaid ? <Map className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            {searchFeePaid ? 'Survey Plan' : 'Access Plots'}
          </button>
        </div>
      </div>

      {/* SEARCH FEE MODAL */}
      {showSearchFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-lg">Plot Search Fee</h3>
              <button onClick={() => setShowSearchFeeModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Map className="w-10 h-10 text-amber-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Unlock Full Access</h4>
                <p className="text-gray-600 text-sm">
                  Get complete access to survey plan and plots for <span className="font-bold">{estate.name}</span>
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                  <span className="text-gray-600">One-time Search Fee</span>
                  <span className="font-bold text-blue-900 text-2xl">{formatCurrency(SEARCH_FEE)}</span>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /><span>View detailed survey plan layout</span></p>
                  <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /><span>See all plot positions & boundaries</span></p>
                  <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /><span>Check real-time availability status</span></p>
                  <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /><span>View plot sizes, types & prices</span></p>
                  <p className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /><span>Select & proceed to purchase</span></p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowSearchFeeModal(false)} className="flex-1 py-3.5 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button onClick={handlePaySearchFee} className="flex-1 py-3.5 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 flex items-center justify-center gap-2 transition-all shadow-lg">
                  <CreditCard className="w-5 h-5" />
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PURCHASE MODAL */}
      {showPurchaseModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-5 flex justify-between items-center sm:rounded-t-2xl">
              <h3 className="font-bold text-lg">Confirm Purchase</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${selectedPlot.status === 'commercial' ? 'bg-amber-100' : 'bg-emerald-100'}`}>
                    <Home className={`w-8 h-8 ${selectedPlot.status === 'commercial' ? 'text-amber-600' : 'text-emerald-600'}`} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xl">{selectedPlot.plot_number}</p>
                    <p className="text-gray-600">{estate.name}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
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
                  <hr className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Price</span>
                    <span className="font-bold text-blue-900 text-2xl">{formatCurrency(selectedPlot.price)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowPurchaseModal(false)} className="flex-1 py-3.5 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button onClick={handleProceedToPayment} className="flex-1 py-3.5 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg">
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