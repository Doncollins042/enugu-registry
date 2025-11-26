import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Building2, FileCheck, Lock, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "Registered Properties", value: "50,000+", icon: Building2 },
    { label: "Verified Owners", value: "15,000+", icon: Users },
    { label: "Total Transactions", value: "₦25B+", icon: TrendingUp },
    { label: "Success Rate", value: "99.9%", icon: CheckCircle }
  ];

  const features = [
    { icon: Shield, title: "Government Verified", desc: "Official Enugu State platform with full legal backing" },
    { icon: Lock, title: "Bank-Level Security", desc: "256-bit encryption protects all your sensitive data" },
    { icon: FileCheck, title: "Instant Verification", desc: "Real-time document authentication and validation" },
    { icon: Building2, title: "Transparent Process", desc: "Track every step of your property transaction" }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Blurred Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/98 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" 
          alt="Luxury Property" 
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Enugu State</h1>
                  <p className="text-xs text-gray-600">Land Registry Portal</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all font-medium text-sm shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-full shadow-sm">
              <span className="text-sm font-medium text-amber-800">Official Government Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Digital Land Registry<br/>
              <span className="text-blue-900">For Enugu State</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium">
              Secure, transparent, and efficient property registration system backed by blockchain technology
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all font-semibold text-lg inline-flex items-center gap-2 shadow-xl hover:shadow-2xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                  <stat.icon className="w-8 h-8 text-blue-900 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-lg text-gray-700 font-medium">Professional land registry services you can trust</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue-900/95 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">Join thousands of satisfied property owners</p>
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl"
            >
              Create Account Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-gray-900 text-center">
          <p className="text-gray-400 text-sm">© 2025 Enugu State Government. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}