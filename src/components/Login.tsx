import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Crown, Shield, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // Store user session
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: 'John Doe',
        email: formData.email,
        role: 'user'
      }));
      
      setLoading(false);
      toast.success('Welcome back!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a961]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0d6e5d]/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#c9a961]/5 rounded-full blur-[80px]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%23c9a961' stroke-width='0.5'/%3E%3C/svg%3E")`
        }} />
        
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white font-serif text-2xl font-bold tracking-wide">ENUGU STATE</h1>
              <p className="text-[#c9a961] text-sm tracking-widest">DIGITAL LAND REGISTRY</p>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-white font-serif text-4xl font-bold leading-tight mb-6">
            Secure Your<br />
            <span className="text-[#c9a961]">Land Legacy</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-md">
            Nigeria's most trusted digital platform for land registration, verification, and property management.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#c9a961]" />
              </div>
              <div>
                <p className="text-white font-medium">Government Verified</p>
                <p className="text-white/50 text-sm">Official Enugu State Land Registry</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#c9a961]" />
              </div>
              <div>
                <p className="text-white font-medium">10,000+ Properties</p>
                <p className="text-white/50 text-sm">Registered and verified lands</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-12">
            <p className="text-white/30 text-sm">
              © 2024 Enugu State Government. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#1a1a2e] font-serif text-xl font-bold">ENUGU STATE</h1>
              <p className="text-[#8b6947] text-xs tracking-widest">DIGITAL LAND REGISTRY</p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-[#1a1a2e] font-serif text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-[#8b6947]">Sign in to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b6947] hover:text-[#c9a961]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-[#c9a961]/30 text-[#c9a961] focus:ring-[#c9a961]/20"
                />
                <span className="text-sm text-[#8b6947]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#c9a961] hover:text-[#8b6947] font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#c9a961]/20 transition-all disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#c9a961]/20" />
            <span className="text-[#8b6947] text-sm">or continue with</span>
            <div className="flex-1 h-px bg-[#c9a961]/20" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-4 bg-white border border-[#c9a961]/20 rounded-xl flex items-center justify-center gap-2 text-[#1a1a2e] hover:bg-[#faf8f5] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="py-3 px-4 bg-white border border-[#c9a961]/20 rounded-xl flex items-center justify-center gap-2 text-[#1a1a2e] hover:bg-[#faf8f5] transition-colors">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-8 text-[#8b6947]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#c9a961] font-semibold hover:text-[#8b6947]">
              Create Account
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-[#0d6e5d]/10 rounded-xl border border-[#0d6e5d]/20">
            <p className="text-[#0d6e5d] text-sm font-medium mb-1">Demo Credentials</p>
            <p className="text-[#0d6e5d]/70 text-xs">Email: demo@enugu.gov.ng | Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;