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
  Star,
  ArrowRight,
  Lock,
  Award,
  TrendingUp,
  Clock,
  Landmark
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'All land records are digitally verified and secured with advanced encryption.',
    },
    {
      icon: MapPin,
      title: 'Easy Land Search',
      description: 'Find available plots across Enugu State with our advanced search system.',
    },
    {
      icon: FileCheck,
      title: 'Digital Documentation',
      description: "Process all land documents online - from C of O to Governor's Consent.",
    },
    {
      icon: Clock,
      title: 'Fast Processing',
      description: 'Track your applications in real-time with quick turnaround times.',
    },
  ];

  const stats = [
    { label: 'Registered Properties', value: '15,000+', icon: Building2 },
    { label: 'Verified Documents', value: '25,000+', icon: FileCheck },
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Years of Service', value: '5+', icon: Award },
  ];

  const services = [
    { name: 'Land Registration', desc: 'Register your property officially' },
    { name: 'Document Verification', desc: 'Verify land document authenticity' },
    { name: "Governor's Consent", desc: 'Apply for transfer approval' },
    { name: 'Survey Plans', desc: 'Request official surveys' },
    { name: 'Ground Rent', desc: 'Pay annual ground rent' },
    { name: 'C of O Processing', desc: 'Certificate of Occupancy' },
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
      <header className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3d5c] via-[#0a4d5c] to-[#0d6e5d]" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#c9a961]/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c9a961]/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
          </div>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c9a961]/30">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-white font-bold text-xl leading-tight">Enugu State</h1>
              <p className="text-[#c9a961] text-xs font-medium">Digital Land Registry</p>
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
              className="px-6 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white text-sm font-semibold shadow-lg shadow-[#c9a961]/30 hover:shadow-xl transition-all"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 px-6 py-20 md:py-32 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-[#c9a961]/30">
            <div className="w-2 h-2 bg-[#c9a961] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Official Government Platform</span>
            <CheckCircle2 className="w-4 h-4 text-[#c9a961]" />
          </div>

          <h1 className="font-serif text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Secure Your Land
            <br />
            <span className="bg-gradient-to-r from-[#c9a961] via-[#d4b976] to-[#c9a961] bg-clip-text text-transparent">
              Investment Today
            </span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            The official digital platform for land registration, verification, and management in Enugu State. 
            Secure, transparent, and efficient.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/40 flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105 transition-all"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white font-semibold border border-white/20 flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
            >
              <Lock className="w-5 h-5" />
              Sign In
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Shield className="w-4 h-4 text-[#c9a961]" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#c9a961]" />
              <span>Government Verified</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Lock className="w-4 h-4 text-[#c9a961]" />
              <span>Secure Platform</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#c9a961]" />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-white/60 text-xs md:text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a961]/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#c9a961]" />
              <span className="text-[#8b6947] text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="font-serif text-[#0a2540] text-3xl md:text-4xl font-bold mb-4">
              Modern Land Registry System
            </h2>
            <p className="text-[#8b6947] max-w-2xl mx-auto text-lg">
              Experience the future of land registration with our comprehensive digital solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[#c9a961]/20 shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-[#0a2540] font-bold text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#8b6947] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
              <Building2 className="w-4 h-4 text-[#c9a961]" />
              <span className="text-white/80 text-sm font-medium">Our Services</span>
            </div>
            <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Land Services
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Everything you need for land registration and management in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => navigate('/login')}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-left border border-white/10 hover:bg-white/20 hover:border-[#c9a961]/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{service.name}</h3>
                  <ChevronRight className="w-5 h-5 text-[#c9a961] group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-white/50 text-sm">{service.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a961]/10 rounded-full mb-4">
              <Star className="w-4 h-4 text-[#c9a961]" />
              <span className="text-[#8b6947] text-sm font-medium">Testimonials</span>
            </div>
            <h2 className="font-serif text-[#0a2540] text-3xl md:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-[#8b6947]">
              See what our users have to say about our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[#c9a961]/20 shadow-xl"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#c9a961] fill-current" />
                  ))}
                </div>
                <p className="text-[#8b6947] mb-6 italic leading-relaxed">"{testimonial.text}"</p>
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
          <div className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9a961]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center shadow-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-bold mb-4">
                Ready to Secure Your Property?
              </h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of Enugu State residents managing their land records digitally.
              </p>
              <button
                onClick={() => navigate('/register')}
                className="px-10 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/40 inline-flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a2540] px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-2xl flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-white font-bold text-lg">Enugu State</h3>
                  <p className="text-[#c9a961] text-xs">Digital Land Registry</p>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-6 max-w-sm leading-relaxed">
                Official digital land registration platform for Enugu State Government. Secure, transparent, and efficient.
              </p>
              <div className="space-y-3">
                <a href="tel:+2348012345678" className="flex items-center gap-3 text-white/60 text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#c9a961]" />
                  +234 801 234 5678
                </a>
                <a href="mailto:info@enugu.gov.ng" className="flex items-center gap-3 text-white/60 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#c9a961]" />
                  info@enugu.gov.ng
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">About Us</a>
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">Services</a>
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">FAQs</a>
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block text-white/50 text-sm hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2024 Enugu State Land Registry. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#c9a961]" />
              <span className="text-white/30 text-sm">Secured by Government of Enugu State</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;