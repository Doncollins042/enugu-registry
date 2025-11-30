import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, Share2, Heart,
  ChevronRight, ChevronLeft, MessageCircle, Home, Trees, 
  Zap, Droplets, Car, X, Map, Lock, CreditCard, Info, 
  ZoomIn, ZoomOut, Building2, Grid, List
} from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface Estate {
  id: number; name: string; slug: string; location: string; description: string;
  total_plots: number; available_plots: number; min_price: string; max_price: string;
  image_url: string; status: string;
}

interface Plot {
  id: number; plot_number: string; size_sqm: number; price: number;
  status: 'available' | 'sold' | 'reserved' | 'commercial'; plot_type: string;
}

const SEARCH_FEE = 30000;
const EXTRA_PLOTS = 70;

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
    } catch (e) { return false; }
  };

  useEffect(() => { fetchEstate(); }, [slug]);

  useEffect(() => {
    if (location.state?.paymentSuccess && estate) {
      const isPaid = checkPaymentStatus(estate.name);
      if (isPaid) { setSearchFeePaid(true); setActiveTab('plots'); toast.success('Access granted!'); }
      window.history.replaceState({}, document.title);
    }
  }, [location.state, estate]);

  const fetchEstate = async () => {
    try {
      setLoading(true);
      const allEstates = await api.getEstates();
      if (Array.isArray(allEstates) && allEstates.length > 0) {
        const foundEstate = allEstates.find((e: Estate) => e.slug === slug || e.id.toString() === slug || e.name.toLowerCase().replace(/\s+/g, '-') === slug);
        if (foundEstate) {
          const enhancedEstate = { ...foundEstate, total_plots: foundEstate.total_plots + EXTRA_PLOTS, available_plots: foundEstate.available_plots + Math.floor(EXTRA_PLOTS * 0.7) };
          setEstate(enhancedEstate);
          generatePlots(enhancedEstate);
          const isPaid = checkPaymentStatus(foundEstate.name);
          setSearchFeePaid(isPaid);
          if (location.state?.paymentSuccess && isPaid) setActiveTab('plots');
        } else toast.error('Estate not found');
      }
    } catch (error) { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const generatePlots = (estateData: Estate) => {
    const generatedPlots: Plot[] = [];
    const plotTypes = ['Residential', 'Commercial', 'Corner Piece', 'Standard'];
    const sizes = [250, 300, 350, 400, 450, 500];
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
      generatedPlots.push({ id: plotNum, plot_number: `${estateData.name.substring(0, 2).toUpperCase()}-${String(plotNum).padStart(3, '0')}`, size_sqm: sizes[Math.floor(Math.random() * sizes.length)], price: Math.round(randomPrice / 100000) * 100000, status, plot_type: status === 'commercial' ? 'Commercial' : plotTypes[Math.floor(Math.random() * 3)] });
    }
    setPlots(generatedPlots);
  };

  const formatCurrency = (amount: number | string) => { const num = typeof amount === 'string' ? parseInt(amount) : amount; return '₦' + num.toLocaleString(); };
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

  const handleWhatsApp = () => { window.open(`https://wa.me/2348012345678?text=${encodeURIComponent(`Hi, I'm interested in ${estate?.name}`)}`, '_blank'); };
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); };
  const handleTabClick = (tabId: string) => { if (tabId === 'plots' && !searchFeePaid) setShowSearchFeeModal(true); else setActiveTab(tabId as any); };
  const handlePaySearchFee = () => { if (!estate) return; setShowSearchFeeModal(false); navigate('/payment', { state: { type: 'Plot Search Fee', amount: SEARCH_FEE, description: `Survey Plan Access - ${estate.name}`, estateName: estate.name, reference: 'PSF' + Date.now(), returnUrl: `/estate/${slug}` } }); };
  const handleSelectPlot = (plot: Plot) => { if (plot.status === 'available' || plot.status === 'commercial') { setSelectedPlot(plot); setShowPurchaseModal(true); } else if (plot.status === 'reserved') toast('Reserved', { icon: '⏳' }); else toast.error('Sold'); };
  const handleProceedToPayment = () => { if (selectedPlot && estate) { setShowPurchaseModal(false); navigate('/land-payment-summary', { state: { plotDetails: { plot_number: selectedPlot.plot_number, size: selectedPlot.size_sqm, type: selectedPlot.plot_type, estate: estate.name, location: estate.location, price: selectedPlot.price } } }); } };

  const getPlotColor = (status: string) => { switch (status) { case 'available': return '#4ECDC4'; case 'sold': return '#ef4444'; case 'reserved': return '#f97316'; case 'commercial': return '#f59e0b'; default: return '#778DA9'; } };

  if (loading) return <div className="min-h-screen bg-[#0D1B2A] flex items-center justify-center"><div className="w-10 h-10 border-3 border-[#1B263B] border-t-[#4ECDC4] rounded-full animate-spin"></div></div>;
  if (!estate) return <div className="min-h-screen bg-[#0D1B2A] flex flex-col items-center justify-center p-4"><Home className="w-12 h-12 text-[#778DA9] mb-3" /><h2 className="text-white font-bold mb-3">Estate Not Found</h2><button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-[#4ECDC4] text-white rounded-xl text-sm font-semibold">Dashboard</button></div>;

  const availableCount = plots.filter(p => p.status === 'available').length;
  const soldCount = plots.filter(p => p.status === 'sold').length;

  return (
    <div className="min-h-screen bg-[#0D1B2A] pb-24">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#0D1B2A]/60 backdrop-blur-sm rounded-xl flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-white" /></button>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="w-10 h-10 bg-[#0D1B2A]/60 backdrop-blur-sm rounded-xl flex items-center justify-center"><Share2 className="w-5 h-5 text-white" /></button>
          <button onClick={() => setLiked(!liked)} className="w-10 h-10 bg-[#0D1B2A]/60 backdrop-blur-sm rounded-xl flex items-center justify-center"><Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} /></button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64">
        <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-1 bg-[#4ECDC4] rounded-lg text-white text-[10px] font-bold">{availableCount} Available</span>
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-[10px] font-bold flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</span>
          </div>
          <h1 className="text-white font-bold text-xl">{estate.name}</h1>
          <div className="flex items-center gap-1 text-[#778DA9] text-xs"><MapPin className="w-3 h-3" />{estate.location}</div>
        </div>
      </div>

      <main className="px-4 -mt-2 relative z-10">
        {/* Price Card */}
        <div className="bg-[#1B263B] rounded-2xl p-4 mb-4 border border-[#778DA9]/10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[#778DA9] text-[10px]">Price Range</p>
              <p className="text-[#4ECDC4] font-bold text-xl">{formatCurrency(estate.min_price)} - {formatCurrency(estate.max_price)}</p>
            </div>
            <button onClick={() => searchFeePaid ? setActiveTab('plots') : setShowSearchFeeModal(true)} className="px-4 py-2.5 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl text-white text-xs font-semibold flex items-center gap-1">
              {searchFeePaid ? <><Map className="w-4 h-4" /> View Plots</> : <><Lock className="w-4 h-4" /> Unlock</>}
            </button>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="text-[#778DA9]">{estate.total_plots} Total</span>
            <span className="text-[#4ECDC4] font-semibold">{availableCount} Available</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#1B263B] rounded-2xl overflow-hidden border border-[#778DA9]/10">
          <div className="flex border-b border-[#778DA9]/10">
            {[{ id: 'overview', label: 'Overview' }, { id: 'plots', label: 'PLOTS', locked: !searchFeePaid }, { id: 'amenities', label: 'Amenities' }].map((tab) => (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-1 ${activeTab === tab.id ? 'text-[#4ECDC4] border-b-2 border-[#4ECDC4] bg-[#4ECDC4]/5' : 'text-[#778DA9]'}`}>
                {tab.locked && <Lock className="w-3 h-3 text-amber-400" />}{tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-bold text-sm mb-2">About</h3>
                  <p className="text-[#778DA9] text-xs leading-relaxed">{estate.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#0D1B2A] rounded-xl p-3 text-center"><Building2 className="w-5 h-5 mx-auto mb-1 text-[#4ECDC4]" /><p className="text-white font-bold">{estate.total_plots}</p><p className="text-[#778DA9] text-[10px]">Total</p></div>
                  <div className="bg-[#0D1B2A] rounded-xl p-3 text-center"><CheckCircle className="w-5 h-5 mx-auto mb-1 text-[#4ECDC4]" /><p className="text-white font-bold">{availableCount}</p><p className="text-[#778DA9] text-[10px]">Available</p></div>
                </div>
                {!searchFeePaid && (
                  <div className="bg-gradient-to-r from-[#4ECDC4]/20 to-[#44A08D]/20 rounded-xl p-4 border border-[#4ECDC4]/30">
                    <div className="flex items-center gap-2 mb-2"><Lock className="w-4 h-4 text-[#4ECDC4]" /><span className="text-[#4ECDC4] font-medium text-xs">Premium Access</span></div>
                    <p className="text-white text-sm font-bold mb-1">View All {estate.total_plots} Plots</p>
                    <p className="text-[#778DA9] text-xs mb-3">Pay {formatCurrency(SEARCH_FEE)} to unlock</p>
                    <button onClick={() => setShowSearchFeeModal(true)} className="w-full py-2.5 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1"><CreditCard className="w-4 h-4" /> Pay Now</button>
                  </div>
                )}
              </div>
            )}

            {/* PLOTS TAB */}
            {activeTab === 'plots' && (
              <>
                {!searchFeePaid ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-[#4ECDC4]" /></div>
                    <h3 className="text-white font-bold mb-2">Plots Locked</h3>
                    <p className="text-[#778DA9] text-xs mb-4">Pay {formatCurrency(SEARCH_FEE)} to view</p>
                    <button onClick={() => setShowSearchFeeModal(true)} className="px-6 py-2.5 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl text-white text-xs font-bold">Unlock Now</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Legend */}
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[#4ECDC4]"></div><span className="text-[#778DA9]">Available</span></div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500"></div><span className="text-[#778DA9]">Sold</span></div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-orange-500"></div><span className="text-[#778DA9]">Reserved</span></div>
                      <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500"></div><span className="text-[#778DA9]">Commercial</span></div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {['all', 'available', 'sold', 'reserved', 'commercial'].map((s) => (
                        <button key={s} onClick={() => { setFilterStatus(s as any); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap ${filterStatus === s ? 'bg-[#4ECDC4] text-white' : 'bg-[#0D1B2A] text-[#778DA9]'}`}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>

                    {/* Plots Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {paginatedPlots.map((plot) => (
                        <div key={plot.id} onClick={() => handleSelectPlot(plot)} className={`bg-[#0D1B2A] border rounded-xl p-3 cursor-pointer transition-all ${plot.status === 'available' ? 'border-[#4ECDC4]/50 hover:border-[#4ECDC4]' : plot.status === 'sold' ? 'border-red-500/30 opacity-60' : 'border-[#778DA9]/20'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-white font-bold text-xs">{plot.plot_number}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${plot.status === 'available' ? 'bg-[#4ECDC4]/20 text-[#4ECDC4]' : plot.status === 'sold' ? 'bg-red-500/20 text-red-400' : plot.status === 'reserved' ? 'bg-orange-500/20 text-orange-400' : 'bg-amber-500/20 text-amber-400'}`}>{plot.status}</span>
                          </div>
                          <p className="text-[#778DA9] text-[10px]">{plot.size_sqm} sqm</p>
                          <p className="text-[#4ECDC4] font-bold text-sm mt-1">{formatCurrency(plot.price)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 bg-[#0D1B2A] rounded-lg disabled:opacity-30"><ChevronLeft className="w-4 h-4 text-[#778DA9]" /></button>
                        <span className="text-[#778DA9] text-xs">{currentPage}/{totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 bg-[#0D1B2A] rounded-lg disabled:opacity-30"><ChevronRight className="w-4 h-4 text-[#778DA9]" /></button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* AMENITIES TAB */}
            {activeTab === 'amenities' && (
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-[#0D1B2A] rounded-xl">
                    <div className="w-8 h-8 bg-[#4ECDC4]/10 rounded-lg flex items-center justify-center"><a.icon className="w-4 h-4 text-[#4ECDC4]" /></div>
                    <div><p className="text-white font-medium text-xs">{a.label}</p><p className="text-[#778DA9] text-[10px]">{a.desc}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1B263B]/95 backdrop-blur-xl border-t border-[#778DA9]/10 p-4 z-30">
        <div className="flex gap-3">
          <button onClick={handleWhatsApp} className="flex-1 py-3 bg-[#0D1B2A] border border-[#778DA9]/20 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1.5"><MessageCircle className="w-4 h-4" /> Enquire</button>
          <button onClick={() => searchFeePaid ? setActiveTab('plots') : setShowSearchFeeModal(true)} className="flex-1 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1.5">
            {searchFeePaid ? <><Map className="w-4 h-4" /> View Plots</> : <><Lock className="w-4 h-4" /> Unlock</>}
          </button>
        </div>
      </div>

      {/* Search Fee Modal */}
      {showSearchFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1B263B] w-full max-w-sm rounded-3xl overflow-hidden border border-[#778DA9]/10">
            <div className="bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">Unlock Plots</h3>
              <button onClick={() => setShowSearchFeeModal(false)} className="text-white/80"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <div className="text-center mb-5">
                <div className="w-16 h-16 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center mx-auto mb-3"><Map className="w-8 h-8 text-[#4ECDC4]" /></div>
                <h4 className="text-white font-bold mb-1">Access {estate.total_plots} Plots</h4>
                <p className="text-[#778DA9] text-xs">View survey plan & all plots</p>
              </div>
              <div className="bg-[#0D1B2A] rounded-xl p-4 mb-5">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#778DA9]/10"><span className="text-[#778DA9] text-xs">One-time Fee</span><span className="text-[#4ECDC4] font-bold text-xl">{formatCurrency(SEARCH_FEE)}</span></div>
                <div className="space-y-2 text-xs">
                  {['View survey plan', 'See all plots', 'Check availability', 'Select & purchase'].map((item, i) => (
                    <p key={i} className="flex items-center gap-2 text-[#778DA9]"><CheckCircle className="w-3.5 h-3.5 text-[#4ECDC4]" />{item}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSearchFeeModal(false)} className="flex-1 py-3 bg-[#0D1B2A] rounded-xl text-[#778DA9] text-xs font-semibold">Cancel</button>
                <button onClick={handlePaySearchFee} className="flex-1 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1"><CreditCard className="w-4 h-4" /> Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-[#1B263B] w-full sm:max-w-sm sm:rounded-3xl rounded-t-3xl border border-[#778DA9]/10">
            <div className="bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] p-4 flex justify-between items-center sm:rounded-t-3xl">
              <h3 className="text-white font-bold">Confirm Selection</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="text-white/80"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <div className="bg-[#0D1B2A] rounded-xl p-4 mb-5">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#778DA9]/10">
                  <div className="w-12 h-12 bg-[#4ECDC4]/10 rounded-xl flex items-center justify-center"><Home className="w-6 h-6 text-[#4ECDC4]" /></div>
                  <div><p className="text-white font-bold">{selectedPlot.plot_number}</p><p className="text-[#778DA9] text-xs">{estate.name}</p></div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-[#778DA9]">Type</span><span className="text-white">{selectedPlot.plot_type}</span></div>
                  <div className="flex justify-between"><span className="text-[#778DA9]">Size</span><span className="text-white">{selectedPlot.size_sqm} sqm</span></div>
                  <div className="flex justify-between"><span className="text-[#778DA9]">Location</span><span className="text-white">{estate.location}</span></div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-[#778DA9]/10"><span className="text-[#778DA9] font-semibold">Price</span><span className="text-[#4ECDC4] font-bold text-lg">{formatCurrency(selectedPlot.price)}</span></div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowPurchaseModal(false)} className="flex-1 py-3 bg-[#0D1B2A] rounded-xl text-[#778DA9] text-xs font-semibold">Cancel</button>
                <button onClick={handleProceedToPayment} className="flex-1 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] rounded-xl text-white text-xs font-bold">Proceed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}