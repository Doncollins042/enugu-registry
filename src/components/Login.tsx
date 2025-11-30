import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ChevronRight, Loader2, Crown } from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const response = await api.login(email, password);
      if (response.token) {
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230a2540" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Header */}
      <header className="relative pt-12 pb-8 px-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0f3d5c]/20">
          <Crown className="w-8 h-8 text-[#c9a961]" />
        </div>
        <h1 className="font-serif text-[#0a2540] text-2xl font-bold">Enugu Land Registry</h1>
        <p className="text-[#8b6947] text-xs mt-1">Legacy Begins Here</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-[#c9a961]/20 shadow-xl shadow-[#0a2540]/5 max-w-md mx-auto">
          <h2 className="font-serif text-[#0a2540] text-xl font-bold mb-1">Welcome Back</h2>
          <p className="text-[#8b6947] text-xs mb-6">Sign in to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[#0a2540] text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20 transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6947]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-[#faf8f5] border-[#c9a961]/30 text-[#0d6e5d] focus:ring-[#0d6e5d]" />
                <span className="text-[#8b6947] text-xs">Remember me</span>
              </label>
              <button type="button" className="text-[#0d6e5d] text-xs font-medium hover:text-[#0f3d5c]">Forgot Password?</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#0f3d5c]/30 hover:shadow-[#0f3d5c]/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Signing in...</> : <>Sign In<ChevronRight className="w-4 h-4" /></>}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-4 p-3 bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/10 rounded-xl border border-[#c9a961]/20">
            <p className="text-[#8b6947] text-xs text-center">
              <span className="font-semibold text-[#c9a961]">Demo Mode:</span> Use any email & password
            </p>
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center text-[#8b6947] text-xs mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#0d6e5d] font-semibold hover:text-[#0f3d5c]">Create Account</Link>
        </p>
      </main>

      {/* Footer */}
      <footer className="relative py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a961]"></div>
          <span className="text-[#8b6947] text-[10px] tracking-wider uppercase">Est. 2024</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a961]"></div>
        </div>
        <p className="text-[#8b6947]/50 text-[10px]">© Enugu State Government</p>
      </footer>
    </div>
  );
}