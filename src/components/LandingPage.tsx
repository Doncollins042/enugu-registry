import { useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  FileCheck,
  ChevronRight,
  CheckCircle2,
  Building2,
  Phone,
  Star,
  ArrowRight,
  Lock,
  Landmark,
  FileText,
  Wallet,
  Map,
  Users,
  Award
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: FileCheck,
      title: 'Document Verification',
      description: 'Verify land documents instantly',
      gradient: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/30',
    },
    {
      icon: FileText,
      title: "Governor's Consent",
      description: 'Apply for transfer approval',
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/30',
    },
    {
      icon: Map,
      title: 'Survey Plans',
      description: 'Request official surveys',
      gradient: 'from-purple-500 to-violet-600',
      shadow: 'shadow-purple-500/30',
    },
    {
      icon: Wallet,
      title: 'Ground Rent',
      description: 'Pay annual ground rent',
      gradient: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/30',
    },
    {
      icon: Building2,
      title: 'Land Registration',
      description: 'Register your property',
      gradient: 'from-rose-500 to-pink-600',
      shadow: 'shadow-rose-500/30',
    },
    {
      icon: MapPin,
      title: 'Property Search',
      description: 'Find available plots',
      gradient: 'from-cyan-500 to-sky-600',
      shadow: 'shadow-cyan-500/30',
    },
  ];

  const stats = [
    { value: '15,000+', label: 'Properties', icon: Building2 },
    { value: '25,000+', label: 'Documents', icon: FileCheck },
    { value: '10,000+', label: 'Users', icon: Users },
    { value: '5+ Years', label: 'Service', icon: Award },
  ];

  const testimonials = [
    {
      name: 'Chief Emmanuel Nwankwo',
      role: 'Real Estate Developer',
      text: 'The digital registry has transformed how we do business.',
      rating: 5,
    },
    {
      name: 'Mrs. Adaeze Okafor',
      role: 'Property Investor',
      text: 'Finally, a transparent system for land transactions.',
      rating: 5,
    },
    {
      name: 'Barr. Chukwudi Eze',
      role: 'Property Lawyer',
      text: 'Document verification is now seamless and reliable.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section with House Background */}
      <header className="relative min-h-[100vh] overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          {/* Real Estate House Images - Faded Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')`,
            }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d5c]/95 via-[#0a4d5c]/90 to-[#0d6e5d]/95" />
          {/* Additional Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          {/* Gold accent glows */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#c9a961]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#c9a961]/15 rounded-full blur-[80px]" />
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c9a961]/40">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-white font-bold text-xl leading-tight tracking-tight">Enugu State</h1>
              <p className="text-[#c9a961] text-[10px] font-semibold uppercase tracking-widest">Digital Land Registry</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 text-white/90 text-sm font-medium hover:text-white transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white text-sm font-semibold shadow-lg shadow-[#c9a961]/40 hover:shadow-xl hover:scale-105 transition-all"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-[#c9a961]/40">
            <div className="w-2 h-2 bg-[#c9a961] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Official Government Platform</span>
            <CheckCircle2 className="w-4 h-4 text-[#c9a961]" />
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-white text-4xl md:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
            Secure Your Land
            <br />
            <span className="bg-gradient-to-r from-[#c9a961] via-[#d4b976] to-[#c9a961] bg-clip-text text-transparent">
              Investment Today
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            The official digital platform for land registration, verification, and management in Enugu State.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/40 flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105 transition-all group"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white font-semibold border border-white/30 flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
            >
              <Lock className="w-5 h-5" />
              Sign In
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-12">
            {['256-bit Encryption', 'Government Verified', 'Secure Platform'].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-white/50 text-sm">
                <Shield className="w-4 h-4 text-[#c9a961]" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center py-2">
                    <div className="w-10 h-10 mx-auto mb-2 bg-[#c9a961]/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-white/50 text-xs">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Services Section - Unique Button Design */}
      <section className="px-6 py-20 md:py-28 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a961] text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="font-serif text-[#0a2540] text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-[#8b6947] max-w-xl mx-auto">
              Comprehensive land services all in one secure platform.
            </p>
          </div>

          {/* Unique Service Buttons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate('/login')}
                  className="group relative bg-white rounded-2xl p-6 border border-[#c9a961]/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${service.shadow} group-hover:bg-white/20 group-hover:shadow-none transition-all`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Text */}
                    <h3 className="font-semibold text-[#0a2540] group-hover:text-white transition-colors mb-1 text-left">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#8b6947] group-hover:text-white/80 transition-colors text-left">
                      {service.description}
                    </p>
                    
                    {/* Arrow */}
                    <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#faf8f5] group-hover:bg-white/20 flex items-center justify-center transition-all">
                      <ChevronRight className="w-4 h-4 text-[#8b6947] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlight with Background Image */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d5c]/95 to-[#0d6e5d]/95" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a961] text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Modern Land Registry for a Digital Age
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed">
                Experience seamless land registration with our secure, government-approved digital platform. 
                From document verification to property transfer, we've got you covered.
              </p>
              <div className="space-y-4">
                {[
                  'Bank-level security encryption',
                  'Real-time application tracking',
                  '24/7 customer support',
                  'Government verified documents',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#c9a961] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center shadow-xl">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">100% Secure</h3>
                  <p className="text-white/60 text-sm">All transactions are protected with military-grade encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 md:py-28 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a961] text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="font-serif text-[#0a2540] text-3xl md:text-4xl font-bold">
              Trusted by Thousands
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#c9a961]/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#c9a961] fill-current" />
                  ))}
                </div>
                <p className="text-[#8b6947] mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a2540]">{testimonial.name}</p>
                    <p className="text-xs text-[#8b6947]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl p-10 md:p-14 text-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d5c]/95 to-[#0d6e5d]/95" />
            </div>

            <div className="relative z-10">
              <h2 className="font-serif text-white text-2xl md:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of Enugu State residents managing their land records digitally.
              </p>
              <button
                onClick={() => navigate('/register')}
                className="px-10 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/40 inline-flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a2540] px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-white font-bold">Enugu State</h3>
                <p className="text-[#c9a961] text-xs">Digital Land Registry</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+2348012345678" className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +234 801 234 5678
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
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