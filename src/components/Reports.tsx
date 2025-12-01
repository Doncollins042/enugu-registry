import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Calendar, TrendingUp, DollarSign, MapPin, Filter, ChevronDown, Home, Search, Building2, Heart, User, Crown, Printer } from 'lucide-react';

const Reports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('transactions');
  const [dateRange, setDateRange] = useState('all');

  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const totalInvestment = portfolio.reduce((sum: number, p: any) => sum + (p.price || 0), 0);
  const totalPlots = portfolio.length;

  const stats = [
    { label: 'Total Investment', value: formatPrice(totalInvestment), icon: DollarSign, color: 'from-[#0d6e5d] to-[#064e3b]' },
    { label: 'Properties Owned', value: totalPlots.toString(), icon: MapPin, color: 'from-[#c9a961] to-[#8b6947]' },
    { label: 'Transactions', value: transactions.length.toString(), icon: TrendingUp, color: 'from-[#1a1a2e] to-[#0f3d5c]' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-6 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-white font-serif text-xl font-bold">Reports & Analytics</h1>
                <p className="text-white/50 text-sm">View your investment reports</p>
              </div>
            </div>
            <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20">
              <Printer className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4`}>
                <stat.icon className="w-6 h-6 text-white/50 mb-2" />
                <p className="text-white font-bold text-lg lg:text-xl">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'transactions', label: 'Transactions' },
            { id: 'properties', label: 'Properties' },
            { id: 'documents', label: 'Documents' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1a1a2e] text-white'
                  : 'bg-white text-[#8b6947] border border-[#c9a961]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#8b6947]" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-[#c9a961]/20 rounded-lg px-3 py-2 text-sm text-[#1a1a2e] focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a961] text-white rounded-lg text-sm font-medium">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>

        {/* Content */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-lg overflow-hidden">
            {transactions.length > 0 ? (
              <div className="divide-y divide-[#c9a961]/10">
                {transactions.map((txn: any, idx: number) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#0d6e5d]" />
                      </div>
                      <div>
                        <p className="text-[#1a1a2e] font-medium">{txn.plotNumber} - {txn.estateName}</p>
                        <p className="text-[#8b6947] text-sm">ID: {txn.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#0d6e5d] font-bold">{formatPrice(txn.amount)}</p>
                      <p className="text-[#8b6947] text-sm">{formatDate(txn.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 text-[#c9a961]/30 mx-auto mb-4" />
                <p className="text-[#8b6947]">No transactions yet</p>
                <button onClick={() => navigate('/search')} className="mt-4 px-6 py-2 bg-[#c9a961] text-white rounded-lg text-sm">
                  Browse Properties
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-lg overflow-hidden">
            {portfolio.length > 0 ? (
              <div className="divide-y divide-[#c9a961]/10">
                {portfolio.map((prop: any, idx: number) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[#1a1a2e] font-medium">{prop.number}</p>
                        <p className="text-[#8b6947] text-sm">{prop.estateName} • {prop.sqm} m²</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#0d6e5d] font-bold">{formatPrice(prop.price)}</p>
                      <p className="text-[#8b6947] text-sm">{prop.tier}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <MapPin className="w-12 h-12 text-[#c9a961]/30 mx-auto mb-4" />
                <p className="text-[#8b6947]">No properties yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-lg p-12 text-center">
            <FileText className="w-12 h-12 text-[#c9a961]/30 mx-auto mb-4" />
            <p className="text-[#8b6947]">Documents will appear here after purchase</p>
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

export default Reports;