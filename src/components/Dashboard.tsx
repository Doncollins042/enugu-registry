import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, MapPin, ChevronRight, Shield, Home,
  FileText, Building2, Menu, X, LogOut, Settings,
  HelpCircle, Wallet, User, Heart, Crown, TrendingUp
} from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface Estate {
  id: number; name: string; slug: string; location: string; description: string;
  total_plots: number; available_plots: number; min_price: string; max_price: string;
  image_url: string; status: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [estatesData, userData] = await Promise.all([api.getEstates(), api.getProfile()]);
      setEstates(estatesData || []);
      setUser(userData);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) return '₦' + (num / 1000000).toFixed(1) + 'M';
    return '₦' + (num / 1000).toFixed(0) + 'K';
  };

  const handleLogout = () => { api.logout(); toast.success('Logged out'); navigate('/login'); };

  const categories = [
    { id: 'all', label: 'All Estates' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'premium', label: 'Premium' },
  ];

  const quickServices = [
    { icon: Shield, label: 'Verify Title', color: 'from-[#0f3d5c] to-[#1a5780]', path: '/services/document-verification' },
    { icon: FileText, label: 'Documents', color: 'from-[#0d6e5d] to-[#15a88a]', path: '/services/document-upload' },
    { icon: Building2, label: 'Survey Plan', color: 'from-[#8b6947] to-[#c9a961]', path: '/services/survey-plan' },
    { icon: Wallet, label: 'Ground Rent', color: 'from-[#0f3d5c] to-[#0d6e5d]', path: '/services/ground-rent' },
  ];

  const stats = [
    { value: estates.length.toString(), label: 'Total Estates', icon: Building2 },
    { value: estates.reduce((a, e) => a + e.available_plots, 0).toString(), label: 'Available Plots', icon: TrendingUp },
  ];

  const filteredEstates = estates.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#c9a961]/20 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMenu(true)} className="lg:hidden">
                <Menu className="w-5 h-5 text-[#0a2540]" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#c9a961]" />
                </div>
                <div>
                  <p className="text-[#8b6947] text-[10px]">Welcome back</p>
                  <h1 className="text-[#0a2540] font-serif font-bold text-sm">{user?.name || 'User'}</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl flex items-center justify-center relative">
                <Bell className="w-4 h-4 text-[#8b6947]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#0d6e5d] rounded-full"></span>
              </button>
              <button onClick={() => navigate('/settings')} className="w-9 h-9 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xs">{user?.name?.charAt(0) || 'U'}</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties, locations..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/10"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm" onClick={() => setShowMenu(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-[#c9a961]/20 shadow-2xl">
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-xl flex items-center justify-center">
                    <Crown className="w-5 h-5 text-[#c9a961]" />
                  </div>
                  <span className="font-serif text-[#0a2540] font-bold text-sm">Enugu Registry</span>
                </div>
                <button onClick={() => setShowMenu(false)} className="text-[#8b6947]"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-2xl mb-6 border border-[#c9a961]/10">
                <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">{user?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <p className="text-[#0a2540] font-semibold text-sm">{user?.name || 'User'}</p>
                  <p className="text-[#8b6947] text-xs truncate w-36">{user?.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {[
                  { icon: Home, label: 'Dashboard', path: '/dashboard' },
                  { icon: Building2, label: 'My Properties', path: '/portfolio' },
                  { icon: FileText, label: 'Documents', path: '/services/document-upload' },
                  { icon: Shield, label: 'Verification', path: '/services/document-verification' },
                  { icon: Settings, label: 'Settings', path: '/settings' },
                  { icon: HelpCircle, label: 'Help Center', path: '/help' },
                ].map((item) => (
                  <button key={item.path} onClick={() => { navigate(item.path); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#8b6947] hover:bg-[#faf8f5] hover:text-[#0a2540] transition-colors">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="absolute bottom-6 left-5 right-5">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 rounded-xl text-red-600 text-sm font-medium border border-red-100">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="px-4 py-4 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-2xl p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#c9a961]/10 rounded-full blur-2xl"></div>
              <stat.icon className="w-5 h-5 text-[#c9a961] mb-2" />
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
              <p className="text-white/70 text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Services */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-[#0a2540] font-bold text-sm">Quick Services</h2>
            <button className="text-[#0d6e5d] text-xs font-medium">See All</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quickServices.map((service) => (
              <button key={service.path} onClick={() => navigate(service.path)} className="flex flex-col items-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-1.5 shadow-lg`}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#8b6947] text-[9px] font-medium text-center leading-tight">{service.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white border-transparent shadow-lg'
                  : 'bg-white text-[#8b6947] border-[#c9a961]/20 hover:border-[#c9a961]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Estates */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif text-[#0a2540] font-bold text-sm">Featured Estates</h2>
            <button onClick={() => navigate('/search')} className="text-[#0d6e5d] text-xs font-medium flex items-center gap-0.5">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-10 h-10 border-3 border-[#c9a961]/30 border-t-[#0d6e5d] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEstates.map((estate) => (
                <div
                  key={estate.id}
                  onClick={() => navigate(`/estate/${estate.slug}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-[#c9a961]/10 shadow-lg shadow-[#0a2540]/5 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="relative h-40">
                    <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-[#0a2540]/20 to-transparent"></div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 bg-gradient-to-r from-[#0d6e5d] to-[#15a88a] rounded-lg text-white text-[10px] font-bold shadow-lg">{estate.available_plots} Available</span>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-serif text-white font-bold text-lg">{estate.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{estate.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between bg-gradient-to-r from-white to-[#faf8f5]">
                    <div>
                      <p className="text-[#8b6947] text-[10px]">Starting from</p>
                      <p className="text-[#0f3d5c] font-serif font-bold text-xl">{formatPrice(estate.min_price)}</p>
                    </div>
                    <button className="px-4 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white text-xs font-semibold flex items-center gap-1 shadow-lg shadow-[#c9a961]/30">
                      Explore <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard', active: true },
            { icon: Search, label: 'Search', path: '/search', active: false },
            { icon: Building2, label: 'Services', path: '/services/document-verification', active: false },
            { icon: Heart, label: 'Saved', path: '/portfolio', active: false },
            { icon: User, label: 'Profile', path: '/settings', active: false },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${item.active ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${item.active ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}