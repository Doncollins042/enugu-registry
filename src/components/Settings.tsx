import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, Mail, Phone, Shield, Bell, Lock, 
  ChevronRight, LogOut, Camera, Crown, Edit2, Check,
  Globe, Moon, HelpCircle, FileText, Star, Heart
} from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getProfile();
        setUser(userData);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    api.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', path: '/user-settings', color: 'from-[#0f3d5c] to-[#0d6e5d]' },
        { icon: Shield, label: 'Verification Status', path: '/user-settings', badge: 'Verified', badgeColor: 'bg-[#0d6e5d]', color: 'from-[#0d6e5d] to-[#15a88a]' },
        { icon: Lock, label: 'Security & Password', path: '/user-settings', color: 'from-[#8b6947] to-[#c9a961]' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', path: '/user-settings', color: 'from-[#0f3d5c] to-[#0d6e5d]' },
        { icon: Globe, label: 'Language', value: 'English', color: 'from-[#0d6e5d] to-[#15a88a]' },
        { icon: Moon, label: 'Dark Mode', toggle: true, color: 'from-[#8b6947] to-[#c9a961]' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', path: '/help', color: 'from-[#0f3d5c] to-[#0d6e5d]' },
        { icon: FileText, label: 'Terms & Privacy', path: '/help', color: 'from-[#0d6e5d] to-[#15a88a]' },
        { icon: Star, label: 'Rate App', color: 'from-[#c9a961] to-[#8b6947]' },
      ]
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-[#c9a961]/30 border-t-[#0d6e5d] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="font-serif text-white font-bold">Settings</h1>
        </div>
      </header>

      <main className="px-4 -mt-16 relative z-10">
        {/* Profile Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 mb-4 border border-[#c9a961]/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-serif font-bold text-2xl">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0d6e5d] rounded-full flex items-center justify-center border-2 border-white">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-[#0a2540] font-bold text-lg">{user?.name || 'User'}</h2>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-[#0d6e5d]/10 rounded-full">
                  <Shield className="w-3 h-3 text-[#0d6e5d]" />
                  <span className="text-[10px] text-[#0d6e5d] font-semibold">Verified</span>
                </div>
              </div>
              <p className="text-[#8b6947] text-xs">{user?.email}</p>
              <p className="text-[#8b6947] text-xs">{user?.phone || '+234 800 000 0000'}</p>
            </div>
            <button onClick={() => navigate('/user-settings')} className="p-2 bg-[#faf8f5] rounded-xl border border-[#c9a961]/20">
              <Edit2 className="w-4 h-4 text-[#8b6947]" />
            </button>
          </div>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl p-4 mb-4 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Premium Member</p>
                <p className="text-white/70 text-[10px]">Enjoy exclusive benefits</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70" />
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            <h3 className="text-[#8b6947] text-xs font-semibold mb-2 px-1">{section.title}</h3>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[#c9a961]/20 overflow-hidden shadow-lg">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => item.path && navigate(item.path)}
                  className="w-full flex items-center gap-3 p-3.5 hover:bg-[#faf8f5] transition-colors border-b border-[#c9a961]/10 last:border-0"
                >
                  <div className={`w-9 h-9 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="flex-1 text-left text-[#0a2540] text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 ${item.badgeColor} text-white text-[10px] font-bold rounded-full`}>{item.badge}</span>
                  )}
                  {item.value && (
                    <span className="text-[#8b6947] text-xs">{item.value}</span>
                  )}
                  {item.toggle ? (
                    <div className="w-10 h-6 bg-[#c9a961]/20 rounded-full p-0.5">
                      <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#8b6947]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-semibold text-sm mb-4">
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        {/* Version */}
        <p className="text-center text-[#8b6947]/50 text-[10px]">Version 1.0.0 • Built with ❤️ for Enugu</p>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: User, label: 'Home', path: '/dashboard', active: false },
            { icon: Heart, label: 'Portfolio', path: '/portfolio', active: false },
            { icon: User, label: 'Profile', path: '/settings', active: true },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${item.active ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${item.active ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}