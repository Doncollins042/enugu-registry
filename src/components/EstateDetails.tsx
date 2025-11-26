import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, Star, Share2, Heart,
  Grid, List, ChevronRight, ChevronLeft, Phone, MessageCircle,
  Ruler, Home, Trees, Zap, Droplets, Car, Filter, Search, X
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
  status: string;
  plot_type: string;
}

export default function EstateDetails() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [estate, setEstate] = useState<Estate | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'plots' | 'amenities'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold'>('all');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
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
    
    for (let i = 1; i <= estateData.total_plots; i++) {
      const isAvailable = i <= estateData.available_plots;
      const basePrice = parseInt(estateData.min_price);
      const maxPrice = parseInt(estateData.max_price);
      const randomPrice = basePrice + Math.random() * (maxPrice - basePrice);
      
      generatedPlots.push({
        id: i,
        plot_number: `${estateData.name.substring(0, 2).toUpperCase()}-${String(i).padStart(3, '0')}`,
        size_sqm: sizes[Math.floor(Math.random() * sizes.length)],
        price: Math.round(randomPrice / 100000) * 100000,
        status: isAvailable ? 'available' : 'sold',
        plot_type: plotTypes[Math.floor(Math.random() * plotTypes.length)]
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

  const handleSelectPlot = (plot: Plot) => {
    if (plot.status === 'available') {
      setSelectedPlot(plot);
      setShowPurchaseModal(true);
    } else {
      toast.error('This plot is already sold');
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
      <div className="relative h-56 sm:h-72 lg:h-96">
        <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                {estate.available_plots} plots available
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
            <div className="flex gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={() => setActiveTab('plots')}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-all"
              >
                View Plots
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'plots', label: `Plots (${estate.available_plots})` },
              { id: 'amenities', label: 'Amenities' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
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
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-600">{estate.available_plots}</p>
                    <p className="text-sm text-gray-500">Available</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">{estate.total_plots - estate.available_plots}</p>
                    <p className="text-sm text-gray-500">Sold</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">450-1200</p>
                    <p className="text-sm text-gray-500">Sqm Range</p>
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

            {/* Plots Tab */}
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
                            ? 'border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer' 
                            : 'border-gray-100 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900 text-sm">{plot.plot_number}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
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
                            ? 'border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer' 
                            : 'border-gray-100 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            plot.status === 'available' ? 'bg-emerald-100' : 'bg-gray-100'
                          }`}>
                            <Home className={`w-6 h-6 ${plot.status === 'available' ? 'text-emerald-600' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{plot.plot_number}</p>
                            <p className="text-sm text-gray-500">{plot.plot_type} • {plot.size_sqm} sqm</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-900">{formatCurrency(plot.price)}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            plot.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
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
            onClick={() => setActiveTab('plots')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-900 text-white rounded-xl font-semibold"
          >
            Select Plot
          </button>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden">
            <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-lg">Confirm Purchase</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="p-1 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-emerald-600" />
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