import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Crown, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!formData.phone || formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({
        id: Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: 'user'
      }));
      
      setLoading(false);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }, 1500);
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a961]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0d6e5d]/15 rounded-full blur-[100px]" />
        
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

          <h2 className="text-white font-serif text-4xl font-bold leading-tight mb-6">
            Join <span className="text-[#c9a961]">10,000+</span><br />
            Property Owners
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-md">
            Create your account and start managing your land assets with Nigeria's most trusted registry platform.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              'Instant document verification',
              'Secure land transactions',
              'Government-backed registry',
              '24/7 access to your portfolio'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#c9a961]" />
                <span className="text-white/80">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-12">
            <p className="text-white/30 text-sm">
              © 2024 Enugu State Government. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
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

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-[#c9a961] text-white' : 'bg-[#c9a961]/20 text-[#8b6947]'}`}>1</div>
            <div className={`w-16 h-1 rounded ${step >= 2 ? 'bg-[#c9a961]' : 'bg-[#c9a961]/20'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-[#c9a961] text-white' : 'bg-[#c9a961]/20 text-[#8b6947]'}`}>2</div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-[#1a1a2e] font-serif text-3xl font-bold mb-2">
              {step === 1 ? 'Create Account' : 'Secure Your Account'}
            </h2>
            <p className="text-[#8b6947]">
              {step === 1 ? 'Enter your personal information' : 'Set up your password'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1a1a2e] text-sm font-medium mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                  </div>
                </div>

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
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 801 234 5678"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#c9a961]/20 transition-all"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
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
                      className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b6947]">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div key={level} className={`h-1 flex-1 rounded ${passwordStrength() >= level ? (passwordStrength() >= 3 ? 'bg-[#0d6e5d]' : 'bg-[#c9a961]') : 'bg-[#c9a961]/20'}`} />
                        ))}
                      </div>
                      <p className="text-xs mt-1 text-[#8b6947]">
                        {passwordStrength() < 2 ? 'Weak' : passwordStrength() < 3 ? 'Fair' : passwordStrength() < 4 ? 'Good' : 'Strong'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#c9a961]/30 rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#c9a961] focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b6947]">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs mt-1 text-red-500">Passwords do not match</p>
                  )}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-[#c9a961]/30 text-[#c9a961] focus:ring-[#c9a961]/20"
                  />
                  <span className="text-sm text-[#8b6947]">
                    I agree to the <Link to="/terms" className="text-[#c9a961] font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-[#c9a961] font-medium">Privacy Policy</Link>
                  </span>
                </label>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-[#c9a961]/30 text-[#8b6947] font-semibold rounded-xl hover:bg-[#faf8f5] transition-all">
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-[#8b6947]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#c9a961] font-semibold hover:text-[#8b6947]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;