import { useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  FileCheck,
  Users,
  ChevronRight,
  CheckCircle2,
  Building2,
  Sparkles,
  Phone,
  Mail,
  Globe,
  Star,
  ArrowRight,
  Play
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'All land records are digitally verified and secured with blockchain technology.',
    },
    {
      icon: MapPin,
      title: 'Easy Land Search',
      description: 'Find available plots across Enugu State with our advanced search system.',
    },
    {
      icon: FileCheck,
      title: 'Digital Documentation',
      description: 'Process all land documents online - from C of O to Governor\'s Consent.',
    },
    {
      icon: Users,
      title: 'Transparent Process',
      description: 'Track your applications in real-time with full visibility into each step.',
    },
  ];

  const services = [
    { name: 'Land Registration', count: '15,000+' },
    { name: 'Survey Plans Issued', count: '8,500+' },
    { name: 'C of O Processed', count: '5,200+' },
    { name: 'Active Users', count: '25,000+' },
  ];

  const testimonials = [
    {
      name: 'Chief Emmanuel Nwankwo',
      role: 'Real Estate Developer',
      text: 'The digital registry has transformed how we do business. What used to take months now takes weeks.',
      rating: 5,
    },
    {
      name: 'Mrs. Adaeze Okafor',
      role: 'Property Investor',
      text: 'Finally, a transparent system for land transactions in Enugu. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Barr. Chukwudi Eze',
      role: 'Property Lawyer',
      text: 'This platform has made document verification seamless. A game-changer for the industry.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d5c] via-[#0d6e5d] to-[#0f3d5c]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a961]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a961]/5 rounded-full blur-3xl" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
              <Building2 className="w-6 h-6 text-[#c9a961]" />
            </div>
            <div>
              <h1 className="font-serif text-white font-bold text-lg leading-tight">Enugu</h1>
              <p className="text-white/70 text-[10px] -mt-0.5">Land Registry</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white text-sm font-medium shadow-lg shadow-[#c9a961]/30"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-4 py-16 md:py-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#c9a961]" />
            <span className="text-white/90 text-sm">Official Government Platform</span>
          </div>

          <h1 className="font-serif text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Digital Land Registry
            <br />
            <span className="bg-gradient-to-r from-[#c9a961] to-[#d4b976] bg-clip-text text-transparent">
              Enugu State
            </span>
          </h1>

          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Secure, transparent, and efficient land registration and management platform for Enugu State residents.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 hover:shadow-2xl transition-all"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur rounded-2xl text-white font-semibold border border-white/20 flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 px-4 pb-8">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center border border-white/10"
              >
                <p className="text-2xl md:text-3xl font-bold text-white mb-1">{service.count}</p>
                <p className="text-white/70 text-xs">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[#0a2540] text-3xl font-bold mb-3">
              Why Choose Our Platform?
            </h2>
            <p className="text-[#8b6947] max-w-xl mx-auto">
              Experience the future of land registration with our comprehensive digital solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-[#c9a961]/20 shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-[#0d6e5d]" />
                  </div>
                  <h3 className="font-serif text-[#0a2540] font-bold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#8b6947] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-2xl" />

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-white text-3xl font-bold mb-3">
              Our Services
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Comprehensive land services all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Document Verification', desc: 'Verify authenticity of land documents' },
              { name: 'Governor\'s Consent', desc: 'Apply for land transfer approval' },
              { name: 'Survey Plans', desc: 'Request official survey plans' },
              { name: 'Ground Rent', desc: 'Pay annual ground rent online' },
              { name: 'C of O Application', desc: 'Certificate of Occupancy processing' },
              { name: 'Property Search', desc: 'Search for available land plots' },
            ].map((service, index) => (
              <button
                key={index}
                onClick={() => navigate('/login')}
                className="bg-white/10 backdrop-blur rounded-2xl p-5 text-left border border-white/10 hover:bg-white/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{service.name}</h3>
                  <ChevronRight className="w-5 h-5 text-[#c9a961] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-white/60 text-sm">{service.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[#0a2540] text-3xl font-bold mb-3">
              What People Say
            </h2>
            <p className="text-[#8b6947]">
              Trusted by thousands of Enugu State residents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-[#c9a961]/20 shadow-xl"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#c9a961] fill-current" />
                  ))}
                </div>
                <p className="text-[#8b6947] text-sm mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-[#0a2540]">{testimonial.name}</p>
                  <p className="text-xs text-[#8b6947]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />

          <div className="relative">
            <h2 className="font-serif text-white text-2xl md:text-3xl font-bold mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 mb-6">
              Join thousands of users managing their land records digitally.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 inline-flex items-center gap-2"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a2540] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#c9a961]" />
                </div>
                <div>
                  <h3 className="font-serif text-white font-bold">Enugu Land Registry</h3>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Official digital land registration platform for Enugu State Government.
              </p>
              <div className="flex gap-4">
                <a href="tel:+2348012345678" className="flex items-center gap-2 text-white/60 text-sm hover:text-white">
                  <Phone className="w-4 h-4" />
                  +234 801 234 5678
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 text-sm hover:text-white">About Us</a>
                <a href="#" className="block text-white/60 text-sm hover:text-white">Services</a>
                <a href="#" className="block text-white/60 text-sm hover:text-white">FAQs</a>
                <a href="#" className="block text-white/60 text-sm hover:text-white">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 text-sm hover:text-white">Privacy Policy</a>
                <a href="#" className="block text-white/60 text-sm hover:text-white">Terms of Service</a>
                <a href="#" className="block text-white/60 text-sm hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2024 Enugu State Land Registry. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;