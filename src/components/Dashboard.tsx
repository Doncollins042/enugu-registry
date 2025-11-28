import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, User, MapPin, ChevronRight, Shield, Home,
  FileText, Building2, TrendingUp, Menu, X, LogOut,
  Settings, HelpCircle, Wallet, Clock, CheckCircle, Star
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [estatesData, userData] = await Promise.all([
        api.getEstates(),
        api.getProfile()
      ]);
      setEstates(estatesData || []);
      setUser(userData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) return '₦' + (num / 1000000).toFixed(1) + 'M';
    return '₦' + (num / 1000).toFixed(0) + 'K';
  };

  const handleLogout = () => {
    api.logout();
    toast.success('Logged out');
    navigate('/login');
  };

  const quickServices = [
    { icon: Shield, label: 'Verify Title', path: '/services/document-verification', color: 'bg-blue-500' },
    { icon: FileText, label: 'Documents', path: '/services/document-upload', color: 'bg-emerald-500' },
    { icon: Building2, label: 'Survey Plan', path: '/services/survey-plan', color: 'bg-purple-500' },
    { icon: Wallet, label: 'Ground Rent', path: '/services/ground-rent', color: 'bg-amber-500' },
  ];

  const filteredEstates = estates.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-40">
        <div className="px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowMenu(true)} className="p-1.5 hover:bg-white/10 rounded-lg lg:hidden">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <p className="text-blue-200 text-[10px] sm:text-xs">Welcome back</p>
                <h1 className="font-bold text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">{user?.name || 'User'}</h1>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button className="p-1.5 sm:p-2 bg-white/10 rounded-lg relative">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button onClick={() => navigate('/settings')} className="p-1.5 sm:p-2 bg-white/10 rounded-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search estates, locations..."
              className="w-full pl-9 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMenu(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Enugu Land Registry</span>
                </div>
                <button onClick={() => setShowMenu(false)} className="p-1 hover:bg-white/10 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user?.name || 'User'}</p>
                  <p className="text-blue-200 text-xs truncate max-w-[140px]">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-3">
              {[
                { icon: Home, label: 'Dashboard', path: '/dashboard' },
                { icon: Building2, label: 'My Properties', path: '/portfolio' },
                { icon: FileText, label: 'Documents', path: '/services/document-upload' },
                { icon: Shield, label: 'Verify Title', path: '/services/document-verification' },
                { icon: Settings, label: 'Settings', path: '/settings' },
                { icon: HelpCircle, label: 'Help Center', path: '/help' },
              ].map((item) => (
                <button key={item.path} onClick={() => { navigate(item.path); setShowMenu(false); }} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-100 text-gray-700 text-sm">
                  <item.icon className="w-4 h-4 text-gray-500" />
                  {item.label}
                </button>
              ))}
              <hr className="my-2" />
              <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-50 text-red-600 text-sm">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      <main className="px-3 py-4 sm:px-4 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white">
            <Building2 className="w-5 h-5 mb-1 opacity-80" />
            <p className="text-lg sm:text-xl font-bold">{estates.length}</p>
            <p className="text-[10px] sm:text-xs text-blue-100">Total Estates</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white">
            <CheckCircle className="w-5 h-5 mb-1 opacity-80" />
            <p className="text-lg sm:text-xl font-bold">{estates.reduce((a, e) => a + e.available_plots, 0)}</p>
            <p className="text-[10px] sm:text-xs text-emerald-100">Available Plots</p>
          </div>
        </div>

        {/* Quick Services */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-900 text-sm">Quick Services</h2>
            <button className="text-blue-600 text-xs font-medium">See All</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {quickServices.map((service) => (
              <button key={service.path} onClick={() => navigate(service.path)} className="flex flex-col items-center p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${service.color} rounded-lg flex items-center justify-center mb-1`}>
                  <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-600 text-center leading-tight">{service.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Estates */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-gray-900 text-sm">Featured Estates</h2>
            <button onClick={() => navigate('/search')} className="text-blue-600 text-xs font-medium flex items-center gap-0.5">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEstates.map((estate) => (
                <div key={estate.id} onClick={() => navigate(`/estate/${estate.slug}`)} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform cursor-pointer">
                  <div className="flex">
                    <div className="w-24 sm:w-32 h-24 sm:h-28 flex-shrink-0">
                      <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-2.5 sm:p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{estate.name}</h3>
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded">
                          {estate.available_plots} left
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-[10px] sm:text-xs mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{estate.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-gray-400">From</p>
                          <p className="font-bold text-blue-900 text-sm">{formatPrice(estate.min_price)}</p>
                        </div>
                        <button className="px-2.5 py-1.5 bg-blue-900 text-white rounded-lg text-[10px] sm:text-xs font-semibold flex items-center gap-1">
                          View <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1.5 sm:py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard', active: true },
            { icon: Search, label: 'Search', path: '/search', active: false },
            { icon: Building2, label: 'Portfolio', path: '/portfolio', active: false },
            { icon: FileText, label: 'Services', path: '/services/document-verification', active: false },
            { icon: User, label: 'Profile', path: '/settings', active: false },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center py-1 px-2 rounded-lg ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] sm:text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}