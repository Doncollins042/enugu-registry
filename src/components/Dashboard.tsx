import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Building2, FileText, CreditCard, Users, Settings as SettingsIcon,
  Menu, X, ChevronDown, ChevronRight, Bell, Search, LogOut, Shield,
  MapPin, Wallet, HelpCircle, FileSearch, Scale, Receipt, Upload, Sparkles
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

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const estatesPerPage = 6;

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

  const displayedEstates = showAll 
    ? estates.slice((currentPage - 1) * estatesPerPage, currentPage * estatesPerPage)
    : estates.slice(0, 4);

  const totalPages = Math.ceil(estates.length / estatesPerPage);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard', active: true },
    { name: 'Browse Properties', icon: Building2, path: '/search' },
    { name: 'My Portfolio', icon: Wallet, path: '/portfolio' },
    { 
      name: 'Services', 
      icon: FileText, 
      submenu: true,
      items: [
        { name: 'Verify Document', icon: FileSearch, path: '/verify' },
        { name: 'Upload Documents', icon: Upload, path: '/upload-documents' },
        { name: "Governor's Consent", icon: Scale, path: '/governors-consent' },
        { name: 'Ground Rent', icon: Receipt, path: '/ground-rent' },
      ]
    },
    { name: 'Help Center', icon: HelpCircle, path: '/help' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  const quickActions = [
    { name: 'Buy Property', icon: Building2, path: '/search', color: 'from-blue-600 to-blue-700' },
    { name: 'Verify Doc', icon: FileSearch, path: '/verify', color: 'from-emerald-500 to-emerald-600' },
    { name: 'Upload Docs', icon: Upload, path: '/upload-documents', color: 'from-purple-500 to-purple-600' },
    { name: 'Get Help', icon: HelpCircle, path: '/help', color: 'from-amber-500 to-amber-600' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-xl">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-amber-400" />
            </div>
            <span className="font-bold text-gray-900">ES-DLRTH</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-amber-400" />
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
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg ring-2 ring-blue-100">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{user?.full_name || 'User'}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-200px)]">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.items?.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            navigate(subItem.path);
                            setSidebarOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="text-sm">{subItem.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.active 
                      ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/30' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? '' : 'group-hover:scale-110'} transition-transform`} />
                  <span className="font-medium">{item.name}</span>
                </button>
              )}
            </div>
          ))}

          {/* Admin Panel Link */}
          {user?.role === 'admin' && (
            <button
              onClick={() => {
                navigate('/admin');
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all mt-4"
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium">Admin Panel</span>
            </button>
          )}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Welcome Banner - Mobile */}
          <div className="lg:hidden bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-4 mb-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-blue-200 text-sm">Welcome back</span>
              </div>
              <h2 className="text-xl font-bold">{user?.full_name?.split(' ')[0] || 'User'}</h2>
              <p className="text-blue-200 text-sm mt-1">Explore verified properties</p>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.full_name?.split(' ')[0] || 'User'}!</h1>
              <p className="text-gray-600">Explore government-verified properties in Enugu State</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-xl relative">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={() => navigate(action.path)}
                className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-4 text-left hover:shadow-lg hover:scale-105 transition-all active:scale-95`}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                  <action.icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm">{action.name}</p>
              </button>
            ))}
          </div>

          {/* Featured Estates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Featured Estates</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {estates.length} available
                </span>
              </div>
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showAll ? 'Show Less' : 'View All'}
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : estates.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No estates available yet</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedEstates.map((estate) => (
                    <div
                      key={estate.id}
                      onClick={() => navigate(`/estate/${estate.slug}`)}
                      className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer bg-white"
                    >
                      <div className="relative h-36 sm:h-40 overflow-hidden">
                        <img
                          src={estate.image_url}
                          alt={estate.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                            {estate.available_plots} plots
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <h3 className="text-white font-bold truncate">{estate.name}</h3>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{estate.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-blue-900 font-bold text-sm">{formatCurrency(estate.min_price)}</p>
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {showAll && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* CTA Banner */}
          <div className="mt-6 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">100% Government Verified</p>
                  <p className="text-blue-200 text-sm">All properties verified by Enugu State Government</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/upload-documents')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-blue-900 rounded-xl font-semibold transition-all whitespace-nowrap"
              >
                Upload Your Documents
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}