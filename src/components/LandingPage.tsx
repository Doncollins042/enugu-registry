import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Shield, CheckCircle, ArrowRight, Menu, X, MapPin,
  FileCheck, CreditCard, Users, Star, ChevronRight, Phone,
  Mail, Clock, Building2, Sparkles, Lock, Globe, Award
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      icon: Shield, 
      title: 'Government Verified', 
      desc: 'All properties verified by Enugu State Government',
      color: 'blue'
    },
    { 
      icon: Lock, 
      title: 'Blockchain Secured', 
      desc: 'Tamper-proof records with blockchain technology',
      color: 'emerald'
    },
    { 
      icon: FileCheck, 
      title: 'Instant Verification', 
      desc: 'Verify any document in seconds with QR codes',
      color: 'purple'
    },
    { 
      icon: CreditCard, 
      title: 'Secure Payments', 
      desc: 'Multiple payment options including crypto',
      color: 'amber'
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Verified Properties' },
    { value: '5,000+', label: 'Happy Clients' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    { icon: Building2, title: 'Property Purchase', desc: 'Buy verified land & properties' },
    { icon: FileCheck, title: 'Document Verification', desc: 'Verify certificates instantly' },
    { icon: Shield, title: "Governor's Consent", desc: 'Apply for transfer approval' },
    { icon: CreditCard, title: 'Ground Rent Payment', desc: 'Pay annual ground rent online' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              scrolled ? 'bg-blue-900' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Home className={`w-5 h-5 ${scrolled ? 'text-amber-400' : 'text-amber-400'}`} />
            </div>
            <div>
              <h1 className={`font-bold text-sm ${scrolled ? 'text-gray-900' : 'text-white'}`}>ES-DLRTH</h1>
              <p className={`text-xs ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>Land Registry</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className={`text-sm font-medium ${scrolled ? 'text-gray-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>Features</a>
            <a href="#services" className={`text-sm font-medium ${scrolled ? 'text-gray-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>Services</a>
            <a href="#contact" className={`text-sm font-medium ${scrolled ? 'text-gray-600 hover:text-blue-900' : 'text-white/90 hover:text-white'}`}>Contact</a>
            <button
              onClick={() => navigate('/auth')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-blue-900 rounded-xl font-semibold text-sm transition-all"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="p-4 space-y-3">
              <a href="#features" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Features</a>
              <a href="#services" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Services</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Contact</a>
              <button
                onClick={() => navigate('/auth')}
                className="w-full py-3 bg-blue-900 text-white rounded-xl font-semibold"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" 
            alt="Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-900/85 to-blue-800/90"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white/90 text-sm font-medium">Official Government Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Enugu State Digital
            <span className="block text-amber-400">Land Registry</span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Secure, transparent, and efficient property verification and transactions powered by blockchain technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-blue-900 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/verify')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-base transition-all border border-white/30"
            >
              Verify Document
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 px-4">
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">Government Verified</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Lock className="w-5 h-5 text-amber-400" />
              <span className="text-sm">Blockchain Secured</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Certified Platform</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-900 rounded-full text-sm font-medium mb-4">Features</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose ES-DLRTH?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of land registry with our cutting-edge platform designed for security and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">Services</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive land registry services at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <div 
                key={i} 
                onClick={() => navigate('/auth')}
                className="flex items-center gap-4 p-5 bg-gray-50 hover:bg-blue-50 rounded-2xl cursor-pointer transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                  <service.icon className="w-7 h-7 text-blue-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied users who trust ES-DLRTH for their property needs.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-blue-900 rounded-xl font-bold text-lg transition-all shadow-xl"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">Contact</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a href="tel:+2348012345678" className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Call Us</h3>
              <p className="text-gray-600 text-sm">+234 801 234 5678</p>
            </a>

            <a href="mailto:support@enugu.gov.ng" className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900">Email Us</h3>
              <p className="text-gray-600 text-sm">support@enugu.gov.ng</p>
            </a>

            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900">Working Hours</h3>
              <p className="text-gray-600 text-sm">24/7 Online Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold">ES-DLRTH</h3>
                <p className="text-sm text-blue-300">Enugu State Digital Land Registry</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-blue-300">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">FAQ</a>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-400">
            <p>© 2024 Enugu State Government. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}