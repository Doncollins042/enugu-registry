import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Home, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Shield, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthPageProps {
  onLogin: (user: any, token: string) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [tempUserData, setTempUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const passwordsMatch = formData.password === formData.confirmPassword;
  const passwordStrong = formData.password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill all required fields');
        return;
      }
      if (!passwordsMatch) {
        toast.error('Passwords do not match');
        return;
      }
      if (!passwordStrong) {
        toast.error('Password must be at least 8 characters');
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.login(formData.email, formData.password);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
        } else {
          setTempUserData({ user: response.user, token: response.token });
          setStep('otp');
          toast.success('OTP sent to your phone!');
          setLoading(false);
        }
      } else {
        const response = await api.register(formData.name, formData.email, formData.phone, formData.password);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
        } else {
          setTempUserData({ user: response.user, token: response.token });
          setStep('otp');
          toast.success('OTP sent to your phone!');
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error('Connection error. Please try again.');
      setLoading(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      toast.success('Verification successful!');
      localStorage.setItem('token', tempUserData.token);
      localStorage.setItem('user', JSON.stringify(tempUserData.user));
      onLogin(tempUserData.user, tempUserData.token);
      navigate('/dashboard');
    } else {
      toast.error('Invalid OTP. Use 123456 for testing.');
    }
  };

  const handleResendOTP = () => {
    toast.success('OTP resent! Use 123456 for testing.');
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="fixed inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Property" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-blue-900/60"></div>
        </div>

        <div className="relative z-10 w-full max-w-md p-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/50">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-amber-400" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Verify Your Identity</h2>
              <p className="text-sm text-gray-600">Enter the 6-digit code sent to your phone</p>
              <p className="text-xs text-blue-600 mt-2">For testing, use: 123456</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(''));
                      if (e.target.value && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Verify OTP
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center">
                <button onClick={handleResendOTP} className="text-sm text-blue-600 hover:text-blue-800">
                  Didn't receive code? Resend OTP
                </button>
              </div>

              <div className="text-center">
                <button onClick={() => setStep('form')} className="text-sm text-gray-600 hover:text-gray-800">
                  ← Back to {isLogin ? 'Login' : 'Register'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative">
      <div className="fixed inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Property" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/80 to-blue-900/60"></div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <Home className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Enugu State</h1>
            <p className="text-sm text-blue-200">Digital Land Registry</p>
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Secure Property Verification & Registration</h2>
        <p className="text-lg text-blue-100 mb-8">Access verified land records, purchase properties, and manage your real estate portfolio with blockchain-backed security.</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-white text-sm">Government Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <Lock className="w-5 h-5 text-amber-400" />
            <span className="text-white text-sm">Blockchain Secured</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-6">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/50">
            <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
                <Home className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Enugu State</h1>
                <p className="text-xs text-gray-600">Land Registry</p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-sm text-gray-600">{isLogin ? 'Sign in to access your account' : 'Register to get started'}</p>
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600'}`}>
                Sign In
              </button>
              <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-600'}`}>
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {!isLogin && (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {!isLogin && (
                <>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        formData.confirmPassword
                          ? passwordsMatch
                            ? 'border-emerald-500'
                            : 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {formData.confirmPassword && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {passwordsMatch ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        {passwordStrong ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={passwordStrong ? 'text-emerald-600' : 'text-red-600'}>
                          At least 8 characters
                        </span>
                      </div>
                      {formData.confirmPassword && (
                        <div className="flex items-center gap-2 text-xs">
                          {passwordsMatch ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={passwordsMatch ? 'text-emerald-600' : 'text-red-600'}>
                            Passwords match
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-800 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}