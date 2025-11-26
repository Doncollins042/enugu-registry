import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Home, LogOut, Bell, Building2, FileCheck, DollarSign, FileText, MapPin, ArrowRight, Menu, X, Settings, Search, HelpCircle, CheckCheck } from 'lucide-react';

interface Notification {
  id: string;
  type: 'payment' | 'document' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
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

interface DashboardProps {
  user: any;
  onLogout: () => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export default function Dashboard({ user, onLogout, notifications, onMarkRead, onMarkAllRead }: DashboardProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEstates();
  }, []);

  const loadEstates = async () => {
    try {
      const data = await api.getEstates();
      setEstates(data);
    } catch (error) {
      console.error('Error loading estates:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (min: string, max: string) => {
    const minM = (parseInt(min) / 1000000).toFixed(0);
    const maxM = (parseInt(max) / 1000000).toFixed(0);
    return `₦${minM}M - ₦${maxM}M`;
  };

  const quickActions = [
    { icon: Building2, title: "Buy Property", desc: "Browse estates", action: () => navigate('/search'), color: "from-emerald-600 to-emerald-700" },
    { icon: FileCheck, title: "Verify Document", desc: "Check authenticity", action: () => navigate('/verify'), color: "from-blue-600 to-blue-700" },
    { icon: FileText, title: "My Portfolio", desc: "View properties", action: () => navigate('/portfolio'), color: "from-purple-600 to-purple-700" },
    { icon: DollarSign, title: "Ground Rent", desc: "Pay taxes", action: () => navigate('/ground-rent'), color: "from-amber-600 to-amber-700" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'payment': return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case 'document': return <FileCheck className="w-5 h-5 text-blue-600" />;
      case 'system': return <Bell className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const totalPlots = estates.reduce((sum, e) => sum + e.total_plots, 0);
  const availablePlots = estates.reduce((sum, e) => sum + e.available_plots, 0);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {notificationsOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)}></div>
      )}

      <div className="relative z-20">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-base font-bold text-gray-900">Enugu State</h1>
                  <p className="text-xs text-gray-600">Land Registry Portal</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => navigate('/search')} className="p-2 hover:bg-gray-100 rounded-lg transition-all" title="Search">
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={() => navigate('/help')} className="p-2 hover:bg-gray-100 rounded-lg transition-all" title="Help">
                  <HelpCircle className="w-5 h-5 text-gray-700" />
                </button>
                
                <div className="relative">
                  <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-all relative">
                    <Bell className="w-5 h-5 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden z-50">
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button onClick={onMarkAllRead} className="text-xs text-blue-900 hover:text-blue-800 font-medium flex items-center gap-1">
                            <CheckCheck className="w-4 h-4" />
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <p className="text-sm text-gray-500">No notifications</p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <button key={notif.id} onClick={() => onMarkRead(notif.id)} className={`w-full p-4 text-left hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}>
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg">{getNotificationIcon(notif.type)}</div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                                  <p className="text-xs text-gray-600">{notif.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => navigate('/settings')} className="p-2 hover:bg-gray-100 rounded-lg transition-all" title="Settings">
                  <Settings className="w-5 h-5 text-gray-700" />
                </button>
                
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg ml-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  </div>
                </div>
                
                <button onClick={onLogout} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              <div className="flex md:hidden items-center gap-2">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md p-4">
              <div className="space-y-2">
                <button onClick={() => { navigate('/search'); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
                  <Search className="w-5 h-5" /><span>Search</span>
                </button>
                <button onClick={() => { navigate('/portfolio'); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
                  <Building2 className="w-5 h-5" /><span>Portfolio</span>
                </button>
                <button onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg">
                  <Settings className="w-5 h-5" /><span>Settings</span>
                </button>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg">
                  <LogOut className="w-5 h-5" /><span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back, {user?.name || 'User'}!</h2>
            <p className="text-sm text-gray-600">Explore verified properties across Enugu State</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <Building2 className="w-6 h-6 text-blue-900 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Total Estates</p>
              <h3 className="text-xl font-bold text-gray-900">{estates.length}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <MapPin className="w-6 h-6 text-emerald-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Total Plots</p>
              <h3 className="text-xl font-bold text-gray-900">{totalPlots}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <Building2 className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Available</p>
              <h3 className="text-xl font-bold text-gray-900">{availablePlots}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <FileCheck className="w-6 h-6 text-amber-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Verified</p>
              <h3 className="text-xl font-bold text-gray-900">100%</h3>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {quickActions.map((action, i) => (
                <button key={i} onClick={action.action} className="group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all text-left">
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm text-gray-900 font-bold mb-1">{action.title}</h4>
                  <p className="text-xs text-gray-600">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Featured Estates</h3>
            <button onClick={() => navigate('/search')} className="text-sm text-blue-900 hover:text-blue-800 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading estates...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {estates.map((estate) => (
                <div key={estate.id} className="group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate(`/estate/${estate.slug}`)}>
                  <div className="aspect-video relative overflow-hidden">
                    <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-600 text-white rounded-full text-xs font-medium">
                      {estate.available_plots} plots
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{estate.name}</h4>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{estate.location}</span>
                    </div>
                    <p className="text-xs text-emerald-600 font-semibold mb-2">{formatPrice(estate.min_price, estate.max_price)}</p>
                    <button className="w-full py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all flex items-center justify-center gap-1 text-xs">
                      View Estate <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}