import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MapPin, FileText, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, Search, Filter, ChevronRight, Crown, Shield, BarChart3, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', icon: Users, color: 'from-[#0d6e5d] to-[#064e3b]' },
    { label: 'Properties Listed', value: '3,247', change: '+8%', icon: MapPin, color: 'from-[#c9a961] to-[#8b6947]' },
    { label: 'Pending Approvals', value: '156', change: '-5%', icon: Clock, color: 'from-[#d97706] to-[#b45309]' },
    { label: 'Revenue (MTD)', value: '₦847M', change: '+23%', icon: DollarSign, color: 'from-[#1a1a2e] to-[#0f3d5c]' },
  ];

  const recentApplications = [
    { id: 'APP001', type: "Governor's Consent", applicant: 'John Okonkwo', status: 'pending', date: '2024-01-15' },
    { id: 'APP002', type: 'C of O Application', applicant: 'Mary Eze', status: 'approved', date: '2024-01-14' },
    { id: 'APP003', type: 'Survey Plan', applicant: 'Peter Nnamdi', status: 'pending', date: '2024-01-14' },
    { id: 'APP004', type: 'Ground Rent', applicant: 'Grace Okoro', status: 'rejected', date: '2024-01-13' },
    { id: 'APP005', type: "Governor's Consent", applicant: 'David Ani', status: 'approved', date: '2024-01-13' },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-6 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/dashboard')} className="p-2.5 hover:bg-white/10 rounded-xl">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#c9a961]" />
                  <h1 className="text-white font-serif text-xl font-bold">Admin Dashboard</h1>
                </div>
                <p className="text-white/50 text-sm">Enugu State Land Registry Management</p>
              </div>
            </div>
            <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-6 h-6 text-white/50" />
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-white font-bold text-xl lg:text-2xl">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'applications', label: 'Applications', icon: FileText },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'properties', label: 'Properties', icon: MapPin },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1a1a2e] text-white'
                  : 'bg-white text-[#8b6947] border border-[#c9a961]/20'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr,380px] lg:gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-lg overflow-hidden">
              <div className="p-4 border-b border-[#c9a961]/10 flex items-center justify-between">
                <h2 className="text-[#1a1a2e] font-serif font-bold">Recent Applications</h2>
                <button className="text-[#c9a961] text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-[#c9a961]/10">
                {recentApplications.map((app) => (
                  <div key={app.id} className="p-4 flex items-center justify-between hover:bg-[#faf8f5] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#faf8f5] rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#8b6947]" />
                      </div>
                      <div>
                        <p className="text-[#1a1a2e] font-medium">{app.type}</p>
                        <p className="text-[#8b6947] text-sm">{app.applicant} • {app.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <p className="text-[#8b6947] text-xs mt-1">{formatDate(app.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Add Property', icon: MapPin, color: 'bg-[#0d6e5d]' },
                { label: 'New User', icon: Users, color: 'bg-[#c9a961]' },
                { label: 'Generate Report', icon: BarChart3, color: 'bg-[#1a1a2e]' },
                { label: 'System Settings', icon: Settings, color: 'bg-[#8b6947]' },
              ].map((action, idx) => (
                <button key={idx} className={`${action.color} p-4 rounded-xl text-white text-left hover:opacity-90 transition-opacity`}>
                  <action.icon className="w-6 h-6 mb-2" />
                  <p className="font-medium text-sm">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-6 lg:mt-0 space-y-4">
            {/* Activity Chart Placeholder */}
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20 shadow-lg">
              <h3 className="text-[#1a1a2e] font-serif font-bold mb-4">Transaction Activity</h3>
              <div className="h-48 bg-[#faf8f5] rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-[#c9a961] mx-auto mb-2" />
                  <p className="text-[#8b6947] text-sm">Chart visualization</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 bg-[#faf8f5] rounded-lg">
                  <p className="text-[#0d6e5d] font-bold">₦234M</p>
                  <p className="text-[#8b6947] text-[10px]">Today</p>
                </div>
                <div className="text-center p-2 bg-[#faf8f5] rounded-lg">
                  <p className="text-[#c9a961] font-bold">₦1.2B</p>
                  <p className="text-[#8b6947] text-[10px]">This Week</p>
                </div>
                <div className="text-center p-2 bg-[#faf8f5] rounded-lg">
                  <p className="text-[#1a1a2e] font-bold">₦4.8B</p>
                  <p className="text-[#8b6947] text-[10px]">This Month</p>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20 shadow-lg">
              <h3 className="text-[#1a1a2e] font-serif font-bold mb-4">System Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'Server Status', status: 'Online', color: 'bg-green-500' },
                  { label: 'Payment Gateway', status: 'Active', color: 'bg-green-500' },
                  { label: 'Database', status: 'Healthy', color: 'bg-green-500' },
                  { label: 'API Services', status: 'Running', color: 'bg-green-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-[#8b6947] text-sm">{item.label}</span>
                    <span className="flex items-center gap-2 text-sm">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-[#1a1a2e] font-medium">{item.status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3d5c] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#c9a961] rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold">System Administrator</p>
                  <p className="text-white/50 text-sm">admin@enuguland.gov.ng</p>
                </div>
              </div>
              <p className="text-white/60 text-xs">Last login: Today at 9:42 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;