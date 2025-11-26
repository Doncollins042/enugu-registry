import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Users, FileText, DollarSign, TrendingUp, Check, X, Eye, Search, Filter, Shield, ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: "Total Users", value: "15,234", change: "+12%", trend: "up", icon: Users, color: "text-blue-900" },
    { label: "Properties Listed", value: "950", change: "+8%", trend: "up", icon: Home, color: "text-emerald-600" },
    { label: "Transactions", value: "₦25B", change: "+15%", trend: "up", icon: DollarSign, color: "text-purple-600" },
    { label: "Verifications", value: "8,456", change: "+20%", trend: "up", icon: FileText, color: "text-amber-600" },
  ];

  const recentTransactions = [
    { id: 'TXN-001', user: 'John Doe', property: 'LP-045', amount: 5500000, status: 'completed', date: '2025-11-20' },
    { id: 'TXN-002', user: 'Jane Smith', property: 'LP-078', amount: 6200000, status: 'pending', date: '2025-11-21' },
    { id: 'TXN-003', user: 'Mike Johnson', property: 'LP-123', amount: 4800000, status: 'completed', date: '2025-11-22' },
    { id: 'TXN-004', user: 'Sarah Williams', property: 'LP-089', amount: 7100000, status: 'processing', date: '2025-11-23' },
    { id: 'TXN-005', user: 'David Brown', property: 'LP-156', amount: 5900000, status: 'completed', date: '2025-11-24' },
  ];

  const verificationRequests = [
    { id: 'VER-001', user: 'David Brown', document: 'Certificate of Occupancy', submitted: '2025-11-20', status: 'pending' },
    { id: 'VER-002', user: 'Emma Davis', document: 'Survey Plan', submitted: '2025-11-21', status: 'pending' },
    { id: 'VER-003', user: 'Oliver Wilson', document: 'Deed of Assignment', submitted: '2025-11-22', status: 'pending' },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 2100000000 },
    { month: 'Feb', revenue: 2300000000 },
    { month: 'Mar', revenue: 2500000000 },
    { month: 'Apr', revenue: 2400000000 },
    { month: 'May', revenue: 2800000000 },
    { month: 'Jun', revenue: 3200000000 },
  ];

  const userGrowth = [
    { month: 'Jan', users: 12000 },
    { month: 'Feb', users: 12500 },
    { month: 'Mar', users: 13200 },
    { month: 'Apr', users: 13800 },
    { month: 'May', users: 14500 },
    { month: 'Jun', users: 15234 },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-300',
      processing: 'bg-blue-50 text-blue-700 border-blue-300',
      rejected: 'bg-red-50 text-red-700 border-red-300',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
  const maxUsers = Math.max(...userGrowth.map(m => m.users));

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="Office" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Admin Portal</h1>
                  <p className="text-xs text-gray-600">Enugu Land Registry</p>
                </div>
              </div>
              <button onClick={onLogout} className="px-4 py-2 bg-red-50 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-all flex items-center gap-2 text-sm font-medium">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-sm text-gray-600">Monitor and manage land registry operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4 text-emerald-600" /> : <ArrowDown className="w-4 h-4 text-red-600" />}
                    <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-full font-medium">{stat.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['overview', 'analytics', 'transactions', 'verifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                  activeTab === tab
                    ? 'bg-blue-900 text-white'
                    : 'bg-white/90 border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Monthly Revenue</h3>
                    <p className="text-xs text-gray-600">Last 6 months performance</p>
                  </div>
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="space-y-4">
                  {monthlyRevenue.map((data, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-full rounded-full flex items-center justify-end px-3 transition-all"
                          style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-white">₦{(data.revenue / 1000000000).toFixed(1)}B</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
                    <p className="text-xs text-gray-600">Total registered users</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-4">
                  {userGrowth.map((data, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-12">{data.month}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-blue-700 h-full rounded-full flex items-center justify-end px-3 transition-all"
                          style={{ width: `${(data.users / maxUsers) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-white">{data.users.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full sm:w-auto pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Filter className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Transaction ID</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">User</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Property</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        <td className="py-3 px-4 text-sm text-gray-900 font-mono">{txn.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{txn.user}</td>
                        <td className="py-3 px-4 text-sm text-emerald-600 font-medium">{txn.property}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">₦{txn.amount.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full border text-xs font-medium ${getStatusBadge(txn.status)}`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                            <Eye className="w-4 h-4 text-gray-700" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Verifications Tab */}
          {activeTab === 'verifications' && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Pending Verifications</h3>
              <div className="space-y-3">
                {verificationRequests.map((req) => (
                  <div key={req.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-base font-bold text-gray-900">{req.user}</h4>
                          <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusBadge(req.status)}`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-1">Document: {req.document}</p>
                        <p className="text-xs text-gray-600">Submitted: {req.submitted}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button className="flex-1 sm:flex-initial px-4 py-2 bg-red-50 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New property listed', time: '5 mins ago', icon: Home },
                    { action: 'Verification approved', time: '12 mins ago', icon: Check },
                    { action: 'Transaction completed', time: '1 hour ago', icon: DollarSign },
                    { action: 'New user registered', time: '2 hours ago', icon: Users },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-blue-900" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">{item.action}</p>
                        <p className="text-xs text-gray-600">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Pending Verifications', value: '23', color: 'bg-yellow-500' },
                    { label: 'Active Transactions', value: '45', color: 'bg-blue-500' },
                    { label: 'New Registrations Today', value: '12', color: 'bg-emerald-500' },
                    { label: 'Support Tickets', value: '8', color: 'bg-purple-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}