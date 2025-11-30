import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  ChevronRight,
  MapPin,
  FileCheck,
  FileText,
  Wallet,
  Map,
  Building2,
  TrendingUp,
  Clock,
  Home,
  Heart,
  User,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  });

  const quickServices = [
    { icon: FileCheck, title: 'Verify Docs', path: '/services/document-verification', color: '#0d6e5d' },
    { icon: FileText, title: 'Consent', path: '/services/governors-consent', color: '#0f3d5c' },
    { icon: Map, title: 'Survey', path: '/services/survey-plan', color: '#8b6947' },
    { icon: Wallet, title: 'Ground Rent', path: '/services/ground-rent', color: '#c9a961' },
  ];

  const recentActivities = [
    { title: 'Document Verified', desc: 'COO-2024-001234', time: '2 hours ago', status: 'success' },
    { title: 'Payment Received', desc: '₦250,000', time: '1 day ago', status: 'success' },
    { title: 'Survey Pending', desc: 'SP-2024-001567', time: '3 days ago', status: 'pending' },
  ];

  const featuredEstates = [
    {
      id: 1,
      name: 'Legacy Estate',
      location: 'Independence Layout',
      price: 15000000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
      plots: 24,
    },
    {
      id: 2,
      name: 'Royal Gardens',
      location: 'Trans-Ekulu',
      price: 12000000,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      plots: 18,
    },
    {
      id: 3,
      name: 'Diamond Heights',
      location: 'New Haven',
      price: 18000000,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
      plots: 30,
    },
  ];

  const formatPrice = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(0)}M`;
    return `₦${(amount / 1000).toFixed(0)}K`;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs">{greeting}</p>
            <h1 className="text-white font-bold text-lg">James Okonkwo</h1>
          </div>
          <button className="relative p-2 bg-white/10 rounded-xl">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#c9a961] rounded-full" />
          </button>
        </div>

        {/* Search */}
        <button
          onClick={() => navigate('/search')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur rounded-xl border border-white/10"
        >
          <Search className="w-4 h-4 text-white/50" />
          <span className="text-white/50 text-sm">Search properties...</span>
        </button>
      </header>

      {/* Quick Stats */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#c9a961]/10 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-[#0d6e5d]/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#0d6e5d]" />
            </div>
            <p className="text-[#0a2540] font-bold text-sm">2</p>
            <p className="text-[#8b6947] text-[10px]">Properties</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-[#c9a961]/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#c9a961]" />
            </div>
            <p className="text-[#0a2540] font-bold text-sm">5</p>
            <p className="text-[#8b6947] text-[10px]">Documents</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-[#0f3d5c]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#0f3d5c]" />
            </div>
            <p className="text-[#0a2540] font-bold text-sm">₦32M</p>
            <p className="text-[#8b6947] text-[10px]">Value</p>
          </div>
        </div>
      </div>

      {/* Quick Services */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#0a2540] font-bold text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c9a961]" />
            Quick Services
          </h2>
          <button onClick={() => navigate('/services/document-verification')} className="text-[#0d6e5d] text-xs font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(service.path)}
                className="bg-white rounded-xl p-3 border border-[#c9a961]/10 shadow-sm text-center"
              >
                <div
                  className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: service.color }} />
                </div>
                <p className="text-[#0a2540] text-[10px] font-medium">{service.title}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Estates */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#0a2540] font-bold text-sm">Featured Estates</h2>
          <button onClick={() => navigate('/search')} className="text-[#0d6e5d] text-xs font-medium flex items-center gap-1">
            See All
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {featuredEstates.map((estate) => (
            <button
              key={estate.id}
              onClick={() => navigate(`/estate/${estate.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="flex-shrink-0 w-40 bg-white rounded-2xl overflow-hidden border border-[#c9a961]/10 shadow-sm"
            >
              <div className="relative h-24">
                <img src={estate.image} alt={estate.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-full">
                  <span className="text-[#0d6e5d] text-[10px] font-medium">{estate.plots} plots</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-[#0a2540] font-semibold text-xs mb-1 truncate">{estate.name}</h3>
                <div className="flex items-center gap-1 text-[#8b6947] text-[10px] mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{estate.location}</span>
                </div>
                <p className="text-[#0d6e5d] font-bold text-sm">{formatPrice(estate.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#0a2540] font-bold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8b6947]" />
            Recent Activity
          </h2>
        </div>
        <div className="space-y-2">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-xl p-3 border border-[#c9a961]/10 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div>
                  <p className="text-[#0a2540] font-medium text-xs">{activity.title}</p>
                  <p className="text-[#8b6947] text-[10px]">{activity.desc}</p>
                </div>
              </div>
              <span className="text-[#8b6947] text-[10px]">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Government Services Banner */}
      <section className="px-4 mt-6">
        <div className="bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a961]/10 rounded-full blur-2xl" />
          <div className="relative">
            <h3 className="text-white font-bold text-sm mb-1">Government Services</h3>
            <p className="text-white/60 text-xs mb-3">Access all land registry services</p>
            <button
              onClick={() => navigate('/services/document-verification')}
              className="px-4 py-2 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-lg text-white text-xs font-medium flex items-center gap-2"
            >
              Explore Services
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-1"
            >
              <div className={`p-2 rounded-xl transition-all ${isActive(item.path) ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;