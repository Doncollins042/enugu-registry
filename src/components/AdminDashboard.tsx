import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Users, Building2, FileText, DollarSign, Settings, LogOut, 
  Plus, Edit, Trash2, Eye, Search, Filter, Download, BarChart3,
  CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp, MapPin,
  Mail, Phone, Calendar, Shield, Menu, X, ChevronDown, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_verified: boolean;
  created_at: string;
}

interface Estate {
  id: number;
  name: string;
  slug: string;
  location: string;
  total_plots: number;
  available_plots: number;
  min_price: string;
  max_price: string;
  status: string;
}

interface Transaction {
  id: number;
  user_name: string;
  type: string;
  amount: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data - Replace with API calls
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@test.com', phone: '08012345678', role: 'user', is_verified: true, created_at: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@test.com', phone: '08087654321', role: 'user', is_verified: true, created_at: '2024-01-20' },
    { id: 3, name: 'Admin User', email: 'admin@enugu.gov.ng', phone: '08011111111', role: 'admin', is_verified: true, created_at: '2024-01-01' },
    { id: 4, name: 'Test User', email: 'test@test.com', phone: '08099999999', role: 'user', is_verified: false, created_at: '2024-02-01' },
  ]);

  const [estates, setEstates] = useState<Estate[]>([
    { id: 1, name: 'Legacy Estate', slug: 'legacy-estate', location: 'Independence Layout', total_plots: 87, available_plots: 45, min_price: '5000000', max_price: '12000000', status: 'active' },
    { id: 2, name: 'Liberty Estate', slug: 'liberty-estate', location: 'Trans Ekulu', total_plots: 45, available_plots: 28, min_price: '8000000', max_price: '15000000', status: 'active' },
    { id: 3, name: 'Fidelity Estate', slug: 'fidelity-estate', location: 'New Haven', total_plots: 156, available_plots: 98, min_price: '6000000', max_price: '10000000', status: 'active' },
    { id: 4, name: 'Royal Gardens', slug: 'royal-gardens', location: 'GRA', total_plots: 64, available_plots: 32, min_price: '10000000', max_price: '18000000', status: 'active' },
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 1, user_name: 'John Doe', type: 'Property Purchase', amount: '8500000', status: 'completed', created_at: '2024-02-15' },
    { id: 2, user_name: 'Jane Smith', type: 'Ground Rent', amount: '50000', status: 'completed', created_at: '2024-02-14' },
    { id: 3, user_name: 'Test User', type: 'Document Verification', amount: '25000', status: 'pending', created_at: '2024-02-13' },
    { id: 4, user_name: 'John Doe', type: 'Governor Consent', amount: '150000', status: 'processing', created_at: '2024-02-12' },
  ]);

  const [pendingApprovals] = useState([
    { id: 1, type: 'Document Verification', user: 'Jane Smith', submitted: '2024-02-15', status: 'pending' },
    { id: 2, type: 'Governor Consent', user: 'John Doe', submitted: '2024-02-14', status: 'pending' },
    { id: 3, type: 'Property Transfer', user: 'Test User', submitted: '2024-02-13', status: 'pending' },
  ]);

  // Modal States
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEstateModal, setShowEstateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingEstate, setEditingEstate] = useState<Estate | null>(null);

  // Form States
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '', role: 'user' });
  const [estateForm, setEstateForm] = useState({ 
    name: '', slug: '', location: '', total_plots: '', available_plots: '', 
    min_price: '', max_price: '', status: 'active' 
  });

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'blue', change: '+12%' },
    { label: 'Total Estates', value: estates.length, icon: Building2, color: 'emerald', change: '+3%' },
    { label: 'Total Revenue', value: '₦45.2M', icon: DollarSign, color: 'amber', change: '+18%' },
    { label: 'Pending Approvals', value: pendingApprovals.length, icon: Clock, color: 'purple', change: '-5%' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'estates', label: 'Estates', icon: Building2 },
    { id: 'transactions', label: 'Transactions', icon: DollarSign },
    { id: 'approvals', label: 'Approvals', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // User CRUD
  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({ name: '', email: '', phone: '', role: 'user' });
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      toast.error('Please fill required fields');
      return;
    }
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
      toast.success('User updated successfully');
    } else {
      const newUser: User = {
        id: users.length + 1,
        ...userForm,
        is_verified: false,
        created_at: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      toast.success('User added successfully');
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    }
  };

  const handleToggleUserVerification = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, is_verified: !u.is_verified } : u));
    toast.success('User verification status updated');
  };

  // Estate CRUD
  const handleAddEstate = () => {
    setEditingEstate(null);
    setEstateForm({ name: '', slug: '', location: '', total_plots: '', available_plots: '', min_price: '', max_price: '', status: 'active' });
    setShowEstateModal(true);
  };

  const handleEditEstate = (estate: Estate) => {
    setEditingEstate(estate);
    setEstateForm({
      name: estate.name,
      slug: estate.slug,
      location: estate.location,
      total_plots: estate.total_plots.toString(),
      available_plots: estate.available_plots.toString(),
      min_price: estate.min_price,
      max_price: estate.max_price,
      status: estate.status
    });
    setShowEstateModal(true);
  };

  const handleSaveEstate = () => {
    if (!estateForm.name || !estateForm.location) {
      toast.error('Please fill required fields');
      return;
    }
    if (editingEstate) {
      setEstates(estates.map(e => e.id === editingEstate.id ? { 
        ...e, 
        ...estateForm,
        total_plots: parseInt(estateForm.total_plots),
        available_plots: parseInt(estateForm.available_plots)
      } : e));
      toast.success('Estate updated successfully');
    } else {
      const newEstate: Estate = {
        id: estates.length + 1,
        name: estateForm.name,
        slug: estateForm.name.toLowerCase().replace(/\s+/g, '-'),
        location: estateForm.location,
        total_plots: parseInt(estateForm.total_plots) || 0,
        available_plots: parseInt(estateForm.available_plots) || 0,
        min_price: estateForm.min_price,
        max_price: estateForm.max_price,
        status: estateForm.status
      };
      setEstates([...estates, newEstate]);
      toast.success('Estate added successfully');
    }
    setShowEstateModal(false);
  };

  const handleDeleteEstate = (id: number) => {
    if (confirm('Are you sure you want to delete this estate?')) {
      setEstates(estates.filter(e => e.id !== id));
      toast.success('Estate deleted successfully');
    }
  };

  // Approval Actions
  const handleApprove = (id: number) => {
    toast.success('Application approved successfully');
  };

  const handleReject = (id: number) => {
    toast.error('Application rejected');
  };

  const formatCurrency = (amount: string) => {
    return '₦' + parseInt(amount).toLocaleString();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 transform transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 p-4 border-b border-blue-800">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-white font-bold">Admin Panel</h1>
            <p className="text-blue-300 text-xs">Enugu Land Registry</p>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden ml-auto text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/20 rounded-lg transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button onClick={() => window.location.reload()} className="p-2 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {transactions.slice(0, 4).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{tx.user_name}</p>
                          <p className="text-sm text-gray-600">{tx.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(tx.amount)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Approvals</h3>
                  <div className="space-y-3">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{item.type}</p>
                          <p className="text-sm text-gray-600">{item.user}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleApprove(item.id)} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleReject(item.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">All Users ({users.length})</h3>
                <button onClick={handleAddUser} className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">{user.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-600">{user.phone}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button onClick={() => handleToggleUserVerification(user.id)}>
                            {user.is_verified ? (
                              <span className="flex items-center gap-1 text-emerald-600 text-sm">
                                <CheckCircle className="w-4 h-4" /> Verified
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-yellow-600 text-sm">
                                <Clock className="w-4 h-4" /> Pending
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditUser(user)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteUser(user.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Estates Tab */}
          {activeTab === 'estates' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">All Estates ({estates.length})</h3>
                <button onClick={handleAddEstate} className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                  <Plus className="w-4 h-4" />
                  Add Estate
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plots</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Range</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {estates.map((estate) => (
                      <tr key={estate.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900">{estate.name}</p>
                          <p className="text-sm text-gray-500">{estate.slug}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {estate.location}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm">
                            <span className="text-emerald-600 font-medium">{estate.available_plots}</span>
                            <span className="text-gray-500"> / {estate.total_plots}</span>
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-600">
                            {formatCurrency(estate.min_price)} - {formatCurrency(estate.max_price)}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            estate.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {estate.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => navigate(`/estate/${estate.slug}`)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleEditEstate(estate)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteEstate(estate.id)} className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">All Transactions</h3>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-500">#{tx.id.toString().padStart(5, '0')}</td>
                        <td className="px-4 py-4 font-medium text-gray-900">{tx.user_name}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{tx.type}</td>
                        <td className="px-4 py-4 font-medium text-gray-900">{formatCurrency(tx.amount)}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            tx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">{tx.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Approvals Tab */}
          {activeTab === 'approvals' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Pending Approvals ({pendingApprovals.length})</h3>
              </div>
              <div className="p-4 space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.type}</p>
                        <p className="text-sm text-gray-500">Submitted by {item.user} on {item.submitted}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toast('Opening document...')} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        View Details
                      </button>
                      <button onClick={() => handleApprove(item.id)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm">
                        Approve
                      </button>
                      <button onClick={() => handleReject(item.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">System Settings</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input type="text" defaultValue="Enugu State Land Registry" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input type="email" defaultValue="admin@enugu.gov.ng" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input type="tel" defaultValue="+234 801 234 5678" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Fee (₦)</label>
                    <input type="number" defaultValue="25000" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <button onClick={() => toast.success('Settings saved!')} className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setShowUserModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveUser} className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Estate Modal */}
      {showEstateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{editingEstate ? 'Edit Estate' : 'Add New Estate'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estate Name</label>
                <input type="text" value={estateForm.name} onChange={(e) => setEstateForm({ ...estateForm, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" value={estateForm.location} onChange={(e) => setEstateForm({ ...estateForm, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Plots</label>
                  <input type="number" value={estateForm.total_plots} onChange={(e) => setEstateForm({ ...estateForm, total_plots: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Plots</label>
                  <input type="number" value={estateForm.available_plots} onChange={(e) => setEstateForm({ ...estateForm, available_plots: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₦)</label>
                  <input type="number" value={estateForm.min_price} onChange={(e) => setEstateForm({ ...estateForm, min_price: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₦)</label>
                  <input type="number" value={estateForm.max_price} onChange={(e) => setEstateForm({ ...estateForm, max_price: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={estateForm.status} onChange={(e) => setEstateForm({ ...estateForm, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setShowEstateModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSaveEstate} className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}