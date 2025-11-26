import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Search, Bell, User, LogOut, Menu, X, Building2, FileText, 
  CreditCard, HelpCircle, ChevronRight, MapPin, Shield, Clock,
  ChevronDown, Wallet, Receipt, FileCheck, Scale, TrendingUp,
  Grid, List, ChevronLeft, Filter
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  // Pagination logic
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
    { id: 'ground-rent', label: 'Ground Rent', icon: Receipt, path: '/ground-rent', description: 'Pay annual ground rent' },
    { id: 'governors-consent', label: "Governor's Consent", icon: Scale, path: '/governors-consent', description: 'Apply for consent' },
    { id: 'payment', label: 'Make Payment', icon: CreditCard, path: '/payment', description: 'Process payments' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-bold text-gray-900">ES-DLRTH</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">ES-DLRTH</h1>
                <p className="text-xs text-gray-500">Land Registry</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-lg">{user?.name?.[0] || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}

            {/* Services Dropdown */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Services</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {servicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                  {serviceItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all text-sm"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { navigate('/help'); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help Center</span>
            </button>

            {/* Admin Link - Only show if admin */}
            {user?.role === 'admin' && (
              <button
                onClick={() => { navigate('/admin'); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all"
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </button>
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="lg:ml-72">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
            <p className="text-gray-600">Explore available properties and manage your portfolio</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold">{user?.name?.[0] || 'U'}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">Member</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{estates.length}</p>
                  <p className="text-sm text-gray-500">Estates</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{estates.reduce((acc, e) => acc + e.available_plots, 0)}</p>
                  <p className="text-sm text-gray-500">Available Plots</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-500">My Properties</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Available Properties Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Available Estates</h2>
                  <p className="text-sm text-gray-500">{estates.length} estates available for purchase</p>
                </div>
                <div className="flex items-center gap-3">
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
                  {!showAllEstates && estates.length > 4 && (
                    <button
                      onClick={() => setShowAllEstates(true)}
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800"
                    >
                      View All ({estates.length})
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            <div className="p-4 lg:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedEstates.map((estate) => (
                    <div
                      key={estate.id}
                      onClick={() => navigate(`/estate/${estate.slug}`)}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="relative h-40">
                        <img
                          src={estate.image_url}
                          alt={estate.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                            {estate.available_plots} plots
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{estate.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{estate.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-blue-900 font-bold">
                            {formatCurrency(estate.min_price)}
                          </p>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {displayedEstates.map((estate) => (
                    <div
                      key={estate.id}
                      onClick={() => navigate(`/estate/${estate.slug}`)}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all cursor-pointer"
                    >
                      <img
                        src={estate.image_url}
                        alt={estate.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900">{estate.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{estate.location}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{estate.available_plots} of {estate.total_plots} plots available</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-900 font-bold">{formatCurrency(estate.min_price)}</p>
                        <p className="text-xs text-gray-500">Starting price</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {showAllEstates && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-blue-900 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Back to Preview */}
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

          {/* Empty State for New Users */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Start Your Property Journey</h3>
                <p className="text-blue-100">Browse verified properties, make secure payments, and build your real estate portfolio.</p>
              </div>
              <button
                onClick={() => navigate('/search')}
                className="px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all whitespace-nowrap"
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