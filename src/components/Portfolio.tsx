import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Search, Building2, Heart, User, MapPin, Crown, FileText, Calendar, TrendingUp, Eye, Download, Plus, Filter } from 'lucide-react';

const Portfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'owned' | 'pending' | 'watchlist'>('owned');
  const [showFilters, setShowFilters] = useState(false);

  const ownedProperties = [
    { id: 1, name: 'Plot A-01', estate: 'Diamond Heights', location: 'New Haven, Enugu', size: 685, price: 28500000, purchaseDate: '2024-03-15', status: 'registered', appreciation: 12.5, image: '/api/placeholder/400/300' },
    { id: 2, name: 'Plot C-03', estate: 'Legacy Estate', location: 'Independence Layout', size: 550, price: 22000000, purchaseDate: '2024-01-20', status: 'processing', appreciation: 8.2, image: '/api/placeholder/400/300' },
  ];

  const pendingProperties = [
    { id: 3, name: 'Plot B-02', estate: 'Royal Gardens', location: 'Trans-Ekulu', size: 620, price: 26500000, paymentProgress: 65, nextPayment: '2024-12-15', image: '/api/placeholder/400/300' },
  ];

  const watchlist = [
    { id: 4, name: 'Plot D-05', estate: 'Diamond Heights', location: 'New Haven', size: 825, price: 42000000, priceChange: 5.2, image: '/api/placeholder/400/300' },
    { id: 5, name: 'Plot A-03', estate: 'Green Valley', location: 'Abakpa Nike', size: 560, price: 20500000, priceChange: -1.5, image: '/api/placeholder/400/300' },
  ];

  const totalValue = ownedProperties.reduce((sum, p) => sum + p.price, 0);
  const totalAppreciation = ownedProperties.reduce((sum, p) => sum + (p.price * p.appreciation / 100), 0);
  const formatPrice = (amount: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-6 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#c9a961]/10 rounded-full blur-[100px]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl lg:hidden">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-white font-serif text-xl lg:text-2xl font-bold">My Portfolio</h1>
                <p className="text-white/50 text-sm">Manage your property investments</p>
              </div>
            </div>
            <button onClick={() => navigate('/search')} className="p-3 bg-[#c9a961] rounded-xl hover:bg-[#8b6947] transition-colors">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/60 text-xs mb-1">Total Properties</p>
              <p className="text-white font-bold text-2xl">{ownedProperties.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/60 text-xs mb-1">Portfolio Value</p>
              <p className="text-white font-bold text-lg lg:text-2xl">{formatPrice(totalValue)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/60 text-xs mb-1">Total Appreciation</p>
              <p className="text-emerald-400 font-bold text-2xl">+{formatPrice(totalAppreciation)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white/60 text-xs mb-1">Avg. ROI</p>
              <p className="text-[#c9a961] font-bold text-2xl">+10.3%</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'owned', label: 'Owned', count: ownedProperties.length },
            { id: 'pending', label: 'Pending', count: pendingProperties.length },
            { id: 'watchlist', label: 'Watchlist', count: watchlist.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'bg-[#1a1a2e] text-white' : 'bg-white text-[#8b6947] border border-[#c9a961]/20'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-[#c9a961] text-white' : 'bg-[#c9a961]/10 text-[#c9a961]'}`}>
                {tab.count}
              </span>
            </button>
          ))}
          <button onClick={() => setShowFilters(!showFilters)} className="ml-auto p-2.5 bg-white border border-[#c9a961]/20 rounded-xl">
            <Filter className="w-5 h-5 text-[#8b6947]" />
          </button>
        </div>

        {/* Owned Properties */}
        {activeTab === 'owned' && (
          <div className="space-y-4">
            {ownedProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-[#c9a961]/20 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="lg:flex">
                  <div className="lg:w-48 h-40 lg:h-auto bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10 flex items-center justify-center">
                    <Crown className="w-16 h-16 text-[#c9a961]/40" />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#1a1a2e] font-serif font-bold text-lg">{property.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${property.status === 'registered' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {property.status === 'registered' ? 'Registered' : 'Processing'}
                          </span>
                        </div>
                        <p className="text-[#8b6947] text-sm">{property.estate}</p>
                        <p className="text-[#8b6947]/70 text-xs flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {property.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#0d6e5d] font-bold text-xl">{formatPrice(property.price)}</p>
                        <p className="text-emerald-500 text-sm flex items-center justify-end gap-1">
                          <TrendingUp className="w-3 h-3" /> +{property.appreciation}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#8b6947] mb-4">
                      <span>{property.size} m²</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(property.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm font-medium text-[#8b6947] flex items-center justify-center gap-2 hover:bg-[#c9a961]/10">
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                      <button className="flex-1 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm font-medium text-[#8b6947] flex items-center justify-center gap-2 hover:bg-[#c9a961]/10">
                        <FileText className="w-4 h-4" /> Documents
                      </button>
                      <button className="py-2.5 px-3 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl hover:bg-[#c9a961]/10">
                        <Download className="w-4 h-4 text-[#8b6947]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {ownedProperties.length === 0 && (
              <div className="text-center py-16">
                <Crown className="w-16 h-16 text-[#c9a961]/30 mx-auto mb-4" />
                <p className="text-[#1a1a2e] font-bold text-lg mb-2">No Properties Yet</p>
                <p className="text-[#8b6947] text-sm mb-6">Start building your land portfolio today</p>
                <button onClick={() => navigate('/search')} className="px-6 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white rounded-xl font-medium">
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pending Properties */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-[#c9a961]/20 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[#1a1a2e] font-serif font-bold text-lg">{property.name}</h3>
                    <p className="text-[#8b6947] text-sm">{property.estate}</p>
                  </div>
                  <p className="text-[#1a1a2e] font-bold">{formatPrice(property.price)}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#8b6947]">Payment Progress</span>
                    <span className="text-[#1a1a2e] font-medium">{property.paymentProgress}%</span>
                  </div>
                  <div className="h-3 bg-[#faf8f5] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-full" style={{ width: `${property.paymentProgress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[#8b6947] text-sm">Next payment: {new Date(property.nextPayment).toLocaleDateString()}</p>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white rounded-xl text-sm font-medium">
                    Make Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Watchlist */}
        {activeTab === 'watchlist' && (
          <div className="space-y-4">
            {watchlist.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-[#c9a961]/20 p-5 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#c9a961]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#1a1a2e] font-bold">{property.name}</h3>
                  <p className="text-[#8b6947] text-sm">{property.estate} • {property.size} m²</p>
                </div>
                <div className="text-right">
                  <p className="text-[#1a1a2e] font-bold">{formatPrice(property.price)}</p>
                  <p className={`text-sm ${property.priceChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {property.priceChange >= 0 ? '+' : ''}{property.priceChange}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30 lg:hidden">
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
              <span className={`text-[10px] ${isActive(item.path) ? 'text-[#1a1a2e] font-medium' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Portfolio;