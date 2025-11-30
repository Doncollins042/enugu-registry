import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Ruler, 
  Shield, 
  CheckCircle2, 
  Lock, 
  XCircle,
  Eye,
  FileText,
  Building2,
  Sparkles,
  ChevronRight,
  Info,
  CreditCard,
  Home,
  Search,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

// Demo estates data
const DEMO_ESTATES = [
  {
    id: 1,
    name: 'Legacy Estate',
    slug: 'legacy-estate',
    location: 'Independence Layout, Enugu',
    description: 'Premium residential estate with modern infrastructure and 24/7 security. Located in the heart of Independence Layout with easy access to major roads and amenities.',
    total_plots: 150,
    available_plots: 45,
    min_price: 8500000,
    max_price: 15000000,
    plot_size: '500 sqm',
    amenities: ['24/7 Security', 'Paved Roads', 'Drainage System', 'Street Lights', 'Green Areas'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  },
  {
    id: 2,
    name: 'Royal Gardens',
    slug: 'royal-gardens',
    location: 'Trans-Ekulu, Enugu',
    description: 'Serene garden estate with beautiful landscaping and family-friendly environment. Perfect for those seeking tranquility within the city.',
    total_plots: 200,
    available_plots: 78,
    min_price: 6500000,
    max_price: 12000000,
    plot_size: '450 sqm',
    amenities: ['Gated Community', 'Central Park', 'Playground', 'Water Supply', 'Power Supply'],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    id: 3,
    name: 'Diamond Heights',
    slug: 'diamond-heights',
    location: 'New Haven, Enugu',
    description: 'Exclusive hilltop estate offering panoramic views of Enugu city. Premium plots for discerning investors.',
    total_plots: 100,
    available_plots: 32,
    min_price: 12000000,
    max_price: 25000000,
    plot_size: '600 sqm',
    amenities: ['Hilltop Location', 'Private Roads', 'Club House', 'Tennis Court', 'Swimming Pool'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  },
  {
    id: 4,
    name: 'Green Valley Estate',
    slug: 'green-valley-estate',
    location: 'Abakpa Nike, Enugu',
    description: 'Affordable housing estate with modern amenities. Ideal for first-time buyers and young families.',
    total_plots: 300,
    available_plots: 156,
    min_price: 4500000,
    max_price: 8000000,
    plot_size: '400 sqm',
    amenities: ['Affordable Pricing', 'Flexible Payment', 'Good Roads', 'Schools Nearby', 'Markets Nearby'],
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
  },
  {
    id: 5,
    name: 'Centenary City',
    slug: 'centenary-city',
    location: 'Enugu East, Enugu',
    description: 'Mixed-use development with residential and commercial plots. Strategic location for business and living.',
    total_plots: 500,
    available_plots: 234,
    min_price: 5000000,
    max_price: 20000000,
    plot_size: '350-1000 sqm',
    amenities: ['Commercial Zones', 'Residential Zones', 'Shopping Mall', 'Hotels', 'Office Spaces'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    id: 6,
    name: 'Paradise Gardens',
    slug: 'paradise-gardens',
    location: 'GRA, Enugu',
    description: 'Ultra-luxury estate in the prestigious Government Reserved Area. The pinnacle of refined living in Enugu.',
    total_plots: 80,
    available_plots: 18,
    min_price: 25000000,
    max_price: 50000000,
    plot_size: '800 sqm',
    amenities: ['Ultra Luxury', 'Private Security', 'Helipad Access', 'Golf Course', 'Spa & Wellness'],
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
  },
];

// Generate demo plots for an estate
const generateDemoPlots = (estateId: number, totalPlots: number, availablePlots: number, minPrice: number, maxPrice: number) => {
  const plots = [];
  const soldCount = totalPlots - availablePlots;
  const reservedCount = Math.floor(availablePlots * 0.2);
  
  for (let i = 1; i <= totalPlots; i++) {
    let status: 'available' | 'sold' | 'reserved';
    if (i <= soldCount) {
      status = 'sold';
    } else if (i <= soldCount + reservedCount) {
      status = 'reserved';
    } else {
      status = 'available';
    }
    
    const priceRange = maxPrice - minPrice;
    const price = minPrice + Math.floor(Math.random() * priceRange);
    
    plots.push({
      id: i,
      plot_number: `PLT-${String(i).padStart(3, '0')}`,
      size: ['400 sqm', '450 sqm', '500 sqm', '600 sqm'][Math.floor(Math.random() * 4)],
      price: price,
      status: status,
      location: `Block ${String.fromCharCode(65 + Math.floor((i - 1) / 20))}, Plot ${((i - 1) % 20) + 1}`,
    });
  }
  
  return plots;
};

const EstateDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [estate, setEstate] = useState<typeof DEMO_ESTATES[0] | null>(null);
  const [plots, setPlots] = useState<ReturnType<typeof generateDemoPlots>>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'plots'>('overview');
  const [selectedPlot, setSelectedPlot] = useState<typeof plots[0] | null>(null);
  const [hasSearchAccess, setHasSearchAccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'reserved' | 'sold'>('all');

  useEffect(() => {
    // Find estate by slug
    const foundEstate = DEMO_ESTATES.find(e => e.slug === slug);
    if (foundEstate) {
      setEstate(foundEstate);
      const generatedPlots = generateDemoPlots(
        foundEstate.id,
        foundEstate.total_plots,
        foundEstate.available_plots,
        foundEstate.min_price,
        foundEstate.max_price
      );
      setPlots(generatedPlots);
      checkPaymentStatus(foundEstate.name);
    }
  }, [slug]);

  const checkPaymentStatus = (estateName: string) => {
    try {
      const paidEstates = JSON.parse(localStorage.getItem('paidSearchFees') || '[]');
      const isPaid = paidEstates.includes(estateName);
      setHasSearchAccess(isPaid);
    } catch {
      setHasSearchAccess(false);
    }
  };

  const handleTabClick = (tab: 'overview' | 'plots') => {
    if (tab === 'plots' && !hasSearchAccess) {
      setShowPaymentModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handlePaySearchFee = () => {
    if (!estate) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      try {
        const paidEstates = JSON.parse(localStorage.getItem('paidSearchFees') || '[]');
        if (!paidEstates.includes(estate.name)) {
          paidEstates.push(estate.name);
          localStorage.setItem('paidSearchFees', JSON.stringify(paidEstates));
        }
        setHasSearchAccess(true);
        setShowPaymentModal(false);
        setActiveTab('plots');
        toast.success('Search fee payment successful!');
      } catch (error) {
        toast.error('Payment failed. Please try again.');
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handlePlotSelect = (plot: typeof plots[0]) => {
    if (plot.status === 'available') {
      setSelectedPlot(plot);
    } else if (plot.status === 'sold') {
      toast.error('This plot has already been sold');
    } else {
      toast.error('This plot is currently reserved');
    }
  };

  const handleProceedToPayment = () => {
    if (selectedPlot && estate) {
      navigate('/land-payment-summary', {
        state: {
          plot: selectedPlot,
          estate: estate,
        }
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredPlots = plots.filter(plot => {
    if (filterStatus === 'all') return true;
    return plot.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300';
      case 'reserved':
        return 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300';
      case 'sold':
        return 'bg-gradient-to-br from-rose-400 to-rose-600 border-rose-300';
      default:
        return 'bg-gray-200 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle2 className="w-3 h-3 text-white" />;
      case 'reserved':
        return <Lock className="w-3 h-3 text-white" />;
      case 'sold':
        return <XCircle className="w-3 h-3 text-white" />;
      default:
        return null;
    }
  };

  if (!estate) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c9a961] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8b6947]">Loading estate details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Hero Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={estate.image}
          alt={estate.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 hover:bg-white/30 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Estate Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-full text-white text-xs font-semibold">
              Premium Estate
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs">
              {estate.available_plots} plots available
            </span>
          </div>
          <h1 className="font-serif text-white text-2xl font-bold mb-1">{estate.name}</h1>
          <p className="text-white/80 text-sm flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {estate.location}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-[#c9a961]/20 z-20">
        <div className="flex">
          <button
            onClick={() => handleTabClick('overview')}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              activeTab === 'overview'
                ? 'text-[#0f3d5c]'
                : 'text-[#8b6947]'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Info className="w-4 h-4" />
              Overview
            </span>
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]" />
            )}
          </button>
          <button
            onClick={() => handleTabClick('plots')}
            className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
              activeTab === 'plots'
                ? 'text-[#0f3d5c]'
                : 'text-[#8b6947]'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              View Plots
              {!hasSearchAccess && (
                <Lock className="w-3 h-3 text-[#c9a961]" />
              )}
            </span>
            {activeTab === 'plots' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {activeTab === 'overview' ? (
          <>
            {/* Price Range Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#c9a961]/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-[#0a2540] font-bold">Price Range</h2>
                <Sparkles className="w-5 h-5 text-[#c9a961]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] bg-clip-text text-transparent">
                  {formatPrice(estate.min_price)}
                </span>
                <span className="text-[#8b6947]">—</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#c9a961] to-[#8b6947] bg-clip-text text-transparent">
                  {formatPrice(estate.max_price)}
                </span>
              </div>
              <p className="text-[#8b6947] text-sm mt-2">Per plot • {estate.plot_size}</p>
            </div>

            {/* Description */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#c9a961]/20 shadow-xl">
              <h2 className="font-serif text-[#0a2540] font-bold mb-3">About This Estate</h2>
              <p className="text-[#8b6947] text-sm leading-relaxed">{estate.description}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-[#0d6e5d]" />
                </div>
                <p className="text-lg font-bold text-[#0a2540]">{estate.plot_size}</p>
                <p className="text-xs text-[#8b6947]">Plot Size</p>
              </div>
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-[#c9a961]/10 to-[#8b6947]/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#c9a961]" />
                </div>
                <p className="text-lg font-bold text-[#0a2540]">{estate.total_plots}</p>
                <p className="text-xs text-[#8b6947]">Total Plots</p>
              </div>
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-lg font-bold text-emerald-600">{estate.available_plots}</p>
                <p className="text-xs text-[#8b6947]">Available</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#c9a961]/20 shadow-xl">
              <h2 className="font-serif text-[#0a2540] font-bold mb-4">Estate Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {estate.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-br from-[#faf8f5] to-white rounded-xl text-sm text-[#8b6947] border border-[#c9a961]/20 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-[#0d6e5d]" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleTabClick('plots')}
              className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
            >
              <Eye className="w-5 h-5" />
              View Available Plots
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        ) : (
          <>
            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(['all', 'available', 'reserved', 'sold'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white shadow-lg'
                      : 'bg-white border border-[#c9a961]/20 text-[#8b6947]'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-1 text-xs opacity-70">
                      ({plots.filter(p => p.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-400 to-emerald-600" />
                <span className="text-xs text-[#8b6947]">Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-amber-400 to-amber-600" />
                <span className="text-xs text-[#8b6947]">Reserved</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-rose-400 to-rose-600" />
                <span className="text-xs text-[#8b6947]">Sold</span>
              </div>
            </div>

            {/* Plot Grid */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <div className="grid grid-cols-5 gap-2">
                {filteredPlots.map((plot) => (
                  <button
                    key={plot.id}
                    onClick={() => handlePlotSelect(plot)}
                    className={`aspect-square rounded-lg ${getStatusColor(plot.status)} border-2 flex items-center justify-center transition-all hover:scale-105 ${
                      selectedPlot?.id === plot.id ? 'ring-2 ring-[#0f3d5c] ring-offset-2' : ''
                    } ${plot.status !== 'available' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                  >
                    {getStatusIcon(plot.status)}
                  </button>
                ))}
              </div>
              
              {filteredPlots.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-[#8b6947]">No plots match the selected filter</p>
                </div>
              )}
            </div>

            {/* Selected Plot Details */}
            {selectedPlot && (
              <div className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-2xl p-5 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold">{selectedPlot.plot_number}</h3>
                    <p className="text-white/70 text-sm">{selectedPlot.location}</p>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full">
                    <span className="text-sm font-semibold">{selectedPlot.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80">Plot Price</span>
                  <span className="text-2xl font-bold">{formatPrice(selectedPlot.price)}</span>
                </div>
                
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl font-semibold shadow-lg shadow-[#c9a961]/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Search Fee Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden animate-slide-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961]/20 rounded-full blur-2xl" />
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <XCircle className="w-5 h-5 text-white" />
              </button>
              <div className="relative">
                <div className="w-16 h-16 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                  <FileText className="w-8 h-8 text-[#c9a961]" />
                </div>
                <h2 className="font-serif text-white text-xl font-bold">Search Fee Required</h2>
                <p className="text-white/70 text-sm mt-1">Unlock detailed plot information</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div className="bg-[#faf8f5] rounded-2xl p-4 border border-[#c9a961]/20">
                <p className="text-sm text-[#8b6947] mb-3">
                  To view and select plots in <span className="font-semibold text-[#0a2540]">{estate.name}</span>, a one-time search fee is required.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-[#c9a961]/20">
                  <span className="text-[#8b6947]">Search Fee</span>
                  <span className="text-xl font-bold text-[#0a2540]">₦30,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#8b6947]">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6e5d]" />
                  <span>View all plot details and pricing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8b6947]">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6e5d]" />
                  <span>Select and reserve your preferred plot</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8b6947]">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6e5d]" />
                  <span>Access valid for 30 days</span>
                </div>
              </div>

              <button
                onClick={handlePaySearchFee}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₦30,000
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-3 text-[#8b6947] font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => {
            const isActive = false; // Estate details is not in nav
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center py-1"
              >
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#8b6947]'}`} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* CSS for slide-up animation */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EstateDetails;