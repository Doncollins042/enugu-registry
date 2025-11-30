import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ChevronRight, Loader2, ArrowLeft, Crown } from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await api.register({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password });
      if (response.token) {
        toast.success('Account created!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20 transition-all";

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-xl text-[#0a2540] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-lg flex items-center justify-center">
            <Crown className="w-4 h-4 text-[#c9a961]" />
          </div>
          <span className="font-serif text-[#0a2540] text-sm font-bold">Enugu Registry</span>
        </div>
        <div className="w-9"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pb-6">
        <div className="text-center mb-5">
          <h1 className="font-serif text-[#0a2540] text-xl font-bold">Create Account</h1>
          <p className="text-[#8b6947] text-xs mt-1">Join the legacy platform</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-[#c9a961]/20 shadow-xl shadow-[#0a2540]/5 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6947]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className={inputClass} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#0f3d5c]/30 flex items-center justify-center gap-2 disabled:opacity-70 mt-4">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating...</> : <>Create Account<ChevronRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-[#8b6947] text-xs mt-5">
          Already have an account? <Link to="/login" className="text-[#0d6e5d] font-semibold">Sign In</Link>
        </p>
      </main>
    </div>
  );
}