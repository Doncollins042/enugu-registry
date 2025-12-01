import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Moon, Globe, Crown, Home, Search, Building2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const settingGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Settings', desc: 'Manage your personal information', path: '/user-settings' },
        { icon: Bell, label: 'Notifications', desc: 'Configure notification preferences', path: '/user-settings' },
        { icon: Shield, label: 'Security', desc: 'Password and authentication', path: '/user-settings' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Moon, label: 'Appearance', desc: 'Theme and display settings', action: () => toast('Coming soon!') },
        { icon: Globe, label: 'Language', desc: 'English (Nigeria)', action: () => toast('Coming soon!') },
      ]
    },
    {
      title: 'Payment',
      items: [
        { icon: CreditCard, label: 'Payment Methods', desc: 'Manage your payment options', path: '/user-settings' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', desc: 'FAQs and support', path: '/help' },
      ]
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-8 px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white font-serif text-xl font-bold">Settings</h1>
          </div>

          {/* User Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white font-bold text-lg">{user.firstName || 'User'} {user.lastName || ''}</h2>
                <p className="text-white/50 text-sm">{user.email || 'user@example.com'}</p>
                <p className="text-[#c9a961] text-xs mt-1">Premium Member</p>
              </div>
              <button onClick={() => navigate('/user-settings')} className="p-2 bg-white/10 rounded-xl">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto -mt-4">
        {settingGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-[#8b6947] text-sm font-medium mb-3 px-1">{group.title}</h3>
            <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-lg overflow-hidden">
              {group.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => item.path ? navigate(item.path) : item.action?.()}
                  className={`w-full p-4 flex items-center gap-4 hover:bg-[#faf8f5] transition-colors ${i !== group.items.length - 1 ? 'border-b border-[#c9a961]/10' : ''}`}
                >
                  <div className="w-10 h-10 bg-[#faf8f5] rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#8b6947]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[#1a1a2e] font-medium">{item.label}</p>
                    <p className="text-[#8b6947] text-sm">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#c9a961]" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 hover:bg-red-100 transition-colors"
        >
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-red-600 font-medium">Log Out</span>
        </button>

        <p className="text-center text-[#8b6947] text-xs mt-8">
          Version 1.0.0 • Enugu State Digital Land Registry
        </p>
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

export default Settings;