import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  Edit3,
  Lock,
  Globe,
  CreditCard,
  FileText,
  Sparkles,
  ChevronRight,
  LogOut,
  Trash2,
  Home,
  Search,
  Building2,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: 'James Okonkwo',
    email: 'james.okonkwo@email.com',
    phone: '+234 801 234 5678',
    nin: '12345678901',
    address: 'No. 15, Independence Layout, Enugu',
    state: 'Enugu',
    lga: 'Enugu North',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    paymentAlerts: true,
    documentUpdates: true,
    promotionalEmails: false,
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    currency: 'NGN',
    theme: 'light',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }, 1500);
  };

  const handleChangePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (security.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSecurity({ ...security, currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password changed successfully!');
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const sections = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'preferences', name: 'Preferences', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white text-xl font-bold">Account Settings</h1>
              <p className="text-white/70 text-xs">Manage your account preferences</p>
            </div>
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30">
                <span className="text-3xl font-serif font-bold text-white">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{profile.name}</h2>
              <p className="text-white/70 text-sm">{profile.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section Tabs */}
      <div className="px-4 -mt-10 relative z-10 mb-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 border border-[#c9a961]/20 shadow-xl flex gap-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as typeof activeSection)}
                className={`flex-1 min-w-[80px] py-2.5 px-3 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white shadow-lg'
                    : 'text-[#8b6947] hover:bg-[#faf8f5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-6">
        {activeSection === 'profile' && (
          <>
            {/* Profile Form */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c9a961]" />
                  Personal Information
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-2 rounded-xl transition-all ${
                    isEditing
                      ? 'bg-[#0d6e5d]/10 text-[#0d6e5d]'
                      : 'bg-[#faf8f5] text-[#8b6947]'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm disabled:opacity-60 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm disabled:opacity-60 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm disabled:opacity-60 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">NIN</label>
                  <input
                    type="text"
                    name="nin"
                    value={profile.nin}
                    disabled
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm disabled:opacity-60 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        )}

        {activeSection === 'security' && (
          <>
            {/* Change Password */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <h3 className="font-serif text-[#0a2540] font-bold mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#c9a961]" />
                Change Password
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Current Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-8 text-[#8b6947]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">New Password</label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  disabled={isSaving}
                  className="w-full py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white font-semibold shadow-lg disabled:opacity-70"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#0d6e5d]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0a2540]">Two-Factor Authentication</p>
                    <p className="text-xs text-[#8b6947]">Extra security for your account</p>
                  </div>
                </div>
                <button
                  onClick={() => setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })}
                  className={`w-12 h-6 rounded-full transition-all ${
                    security.twoFactorEnabled ? 'bg-[#0d6e5d]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </>
        )}

        {activeSection === 'notifications' && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
            <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#c9a961]" />
              Notification Preferences
            </h3>
            {[
              { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive SMS alerts' },
              { key: 'paymentAlerts', label: 'Payment Alerts', desc: 'Notifications for payments' },
              { key: 'documentUpdates', label: 'Document Updates', desc: 'Updates on document status' },
              { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Marketing and offers' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#c9a961]/10 last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#0a2540]">{item.label}</p>
                  <p className="text-xs text-[#8b6947]">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !notifications[item.key as keyof typeof notifications],
                    })
                  }
                  className={`w-12 h-6 rounded-full transition-all ${
                    notifications[item.key as keyof typeof notifications] ? 'bg-[#0d6e5d]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'preferences' && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
            <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#c9a961]" />
              App Preferences
            </h3>
            <div>
              <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
              >
                <option value="English">English</option>
                <option value="Igbo">Igbo</option>
                <option value="Hausa">Hausa</option>
                <option value="Yoruba">Yoruba</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Currency</label>
              <select
                value={preferences.currency}
                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
              >
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-white border border-[#c9a961]/20 rounded-2xl text-[#8b6947] font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#faf8f5] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
          <button className="w-full py-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 font-semibold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
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
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive(item.path) ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default UserSettings;