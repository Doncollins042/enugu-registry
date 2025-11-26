import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Search, Bell, User, LogOut, Menu, X, Building2, FileText, 
  CreditCard, HelpCircle, ChevronRight, MapPin, Shield, Clock,
  ChevronDown, Wallet, Receipt, FileCheck, Scale, Settings,
  Grid, List, ChevronLeft, Filter, Sparkles, Star, ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

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

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllEstates, setShowAllEstates] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchEstates();
  }, []);

  const fetchEstates = async () => {
    try {
      const data = await api.getEstates();
      if (Array.isArray(data)) {
        setEstates(data);
      }
    } catch (error) {
      console.error('Error fetching estates:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: string) => {
    return '₦' + parseInt(amount).toLocaleString();
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const displayedEstates = showAllEstates 
    ? estates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : estates.slice(0, 4);
  const totalPages = Math.ceil(estates.length / itemsPerPage);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'properties', label: 'Buy Properties', icon: Building2, path: '/search' },
    { id: 'portfolio', label: 'My Portfolio', icon: Wallet, path: '/portfolio' },
    { id: 'verify', label: 'Verify Document', icon: FileCheck, path: '/verify' },
  ];

  const serviceItems = [
    { id: 'ground-rent', label: 'Ground Rent', icon: Receipt, path: '/ground-rent' },
    { id: 'governors-consent', label: "Governor's Consent", icon: Scale, path: '/governors-consent' },
    { id: 'payment', label: 'Make Payment', icon: CreditCard, path: '/payment' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-bold text-gray-900">ES-DLRTH</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl relative">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30">
                <Home className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">ES-DLRTH</h1>
                <p className="text-xs text-gray-500">Land Registry</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center ring-2 ring-blue-900/10">
                <span className="text-blue-900 font-bold text-lg">{user?.name?.[0] || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email || ''}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-all group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* Services Dropdown */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Services</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-4">
                  {serviceItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-900 transition-all text-sm"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { navigate('/settings'); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-all group"
            >
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="font-medium">Settings</span>
            </button>

            <button
              onClick={() => { navigate('/help'); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-all group"
            >
              <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Help Center</span>
            </button>

            {/* Admin Link */}
            {user?.role === 'admin' && (
              <button
                onClick={() => { navigate('/admin'); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="lg:ml-72">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-6 py-5 bg-white/60 backdrop-blur-lg border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}! ✨</h1>
            <p className="text-gray-600">Explore verified properties and manage your portfolio</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-gray-100 rounded-xl relative">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center ring-2 ring-blue-900/10">
                <span className="text-blue-900 font-bold">{user?.name?.[0] || 'U'}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">Member</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Welcome Banner - Mobile */}
          <div className="lg:hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-blue-200 text-sm">Welcome back</span>
              </div>
              <h2 className="text-xl font-bold mb-1">{user?.name?.split(' ')[0] || 'User'}!</h2>
              <p className="text-blue-200 text-sm">Explore verified properties today</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/search')}
              className="bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-2xl p-4 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-blue-900" />
              </div>
              <p className="font-medium text-gray-900 text-sm">Buy Property</p>
            </button>

            <button
              onClick={() => navigate('/verify')}
              className="bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-2xl p-4 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <p className="font-medium text-gray-900 text-sm">Verify Doc</p>
            </button>

            <button
              onClick={() => navigate('/portfolio')}
              className="bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-200 rounded-2xl p-4 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-amber-700" />
              </div>
              <p className="font-medium text-gray-900 text-sm">Portfolio</p>
            </button>

            <button
              onClick={() => navigate('/help')}
              className="bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-2xl p-4 text-center transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6 text-purple-700" />
              </div>
              <p className="font-medium text-gray-900 text-sm">Get Help</p>
            </button>
          </div>

          {/* Featured Estates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 lg:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900">Featured Estates</h2>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {estates.length} available
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">Government verified properties</p>
                </div>
                {!showAllEstates && estates.length > 4 && (
                  <button
                    onClick={() => setShowAllEstates(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl text-sm font-medium hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg shadow-blue-900/20"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Estates Grid */}
            <div className="p-4 lg:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedEstates.map((estate) => (
                    <div
                      key={estate.id}
                      onClick={() => navigate(`/estate/${estate.slug}`)}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer group hover:-translate-y-1"
                    >
                      <div className="relative h-36 lg:h-40 overflow-hidden">
                        <img
                          src={estate.image_url}
                          alt={estate.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                            {estate.available_plots} plots
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-bold text-white text-sm lg:text-base truncate">{estate.name}</h3>
                        </div>
                      </div>
                      <div className="p-3 lg:p-4">
                        <div className="flex items-center gap-1 text-gray-500 text-xs lg:text-sm mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate">{estate.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-blue-900 font-bold text-sm lg:text-base">
                            {formatCurrency(estate.min_price)}
                          </p>
                          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {showAllEstates && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/30'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {showAllEstates && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => { setShowAllEstates(false); setCurrentPage(1); }}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    ← Back to preview
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 text-sm font-medium">100% Government Verified</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Start Your Property Journey</h3>
                <p className="text-blue-200 text-sm lg:text-base">Browse verified properties, make secure payments, and build your real estate portfolio.</p>
              </div>
              <button
                onClick={() => navigate('/search')}
                className="px-6 py-3.5 bg-white text-blue-900 rounded-xl font-semibold hover:bg-amber-400 hover:text-blue-900 transition-all whitespace-nowrap shadow-xl"
              >
                Explore Properties
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}