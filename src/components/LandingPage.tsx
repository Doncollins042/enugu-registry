import { useNavigate } from 'react-router-dom';
import {
  Shield,
  MapPin,
  FileCheck,
  ChevronRight,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  Lock,
  Landmark,
  FileText,
  Wallet,
  Map,
  Compass
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const services = [
    { icon: FileCheck, title: 'Document Verification', color: '#0d6e5d' },
    { icon: FileText, title: "Governor's Consent", color: '#0f3d5c' },
    { icon: Map, title: 'Survey Plans', color: '#8b6947' },
    { icon: Wallet, title: 'Ground Rent', color: '#c9a961' },
    { icon: Building2, title: 'Land Registration', color: '#0d6e5d' },
    { icon: MapPin, title: 'Property Search', color: '#0f3d5c' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <header className="relative h-screen max-h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f3d5c]/90 via-[#0f3d5c]/85 to-[#0d6e5d]/90" />
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">ENUGU STATE</p>
              <p className="text-[#c9a961] text-[9px] font-medium tracking-wider">LAND REGISTRY</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white text-sm font-medium"
          >
            Sign In
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-5 -mt-16">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full mb-4 border border-[#c9a961]/30">
              <div className="w-1.5 h-1.5 bg-[#c9a961] rounded-full" />
              <span className="text-white/80 text-xs">Official Government Platform</span>
            </div>

            <h1 className="text-white text-3xl font-bold mb-3 leading-tight">
              Secure Your Land
              <br />
              <span className="text-[#c9a961]">Investment Today</span>
            </h1>

            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              The official digital platform for land registration and verification in Enugu State.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/register')}
                className="flex-1 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white font-medium text-sm flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10 grid grid-cols-3 gap-4">
            {[
              { value: '15K+', label: 'Properties' },
              { value: '25K+', label: 'Documents' },
              { value: '10K+', label: 'Users' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-bold text-lg">{stat.value}</p>
                <p className="text-white/50 text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Services Section - Compact Grid */}
      <section className="px-5 py-10 bg-[#faf8f5]">
        <div className="text-center mb-6">
          <p className="text-[#c9a961] text-xs font-semibold uppercase tracking-widest mb-1">Services</p>
          <h2 className="text-[#0a2540] text-xl font-bold">What We Offer</h2>
        </div>

        {/* Compact Service Grid */}
        <div className="grid grid-cols-3 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={index}
                onClick={() => navigate('/login')}
                className="bg-white rounded-xl p-4 border border-[#c9a961]/10 shadow-sm hover:shadow-md transition-all text-center group"
              >
                <div
                  className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: service.color }} />
                </div>
                <p className="text-[#0a2540] text-[10px] font-medium leading-tight">{service.title}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us - Compact */}
      <section className="px-5 py-10 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d]">
        <div className="text-center mb-6">
          <p className="text-[#c9a961] text-xs font-semibold uppercase tracking-widest mb-1">Why Us</p>
          <h2 className="text-white text-xl font-bold">Trusted Platform</h2>
        </div>

        <div className="space-y-3">
          {[
            { icon: Shield, text: 'Bank-level security' },
            { icon: Compass, text: 'Real-time tracking' },
            { icon: CheckCircle2, text: 'Government verified' },
            { icon: Phone, text: '24/7 support' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                <div className="w-8 h-8 bg-[#c9a961]/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#c9a961]" />
                </div>
                <span className="text-white text-sm">{item.text}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 py-10 bg-[#faf8f5]">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            alt="Property"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3d5c]/95 to-[#0d6e5d]/90 flex flex-col justify-center px-5">
            <h3 className="text-white font-bold text-lg mb-2">Ready to Start?</h3>
            <p className="text-white/60 text-xs mb-4">Join thousands managing land records digitally.</p>
            <button
              onClick={() => navigate('/register')}
              className="w-fit px-5 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-lg text-white text-sm font-medium flex items-center gap-2"
            >
              Create Account
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a2540] px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-lg flex items-center justify-center">
              <Landmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-xs">ENUGU STATE</p>
              <p className="text-[#c9a961] text-[8px]">LAND REGISTRY</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <a href="tel:+2348012345678" className="flex items-center gap-2 text-white/50 text-xs">
            <Phone className="w-3 h-3" />
            +234 801 234 5678
          </a>
          <a href="mailto:info@enugu.gov.ng" className="flex items-center gap-2 text-white/50 text-xs">
            <Mail className="w-3 h-3" />
            info@enugu.gov.ng
          </a>
        </div>
        <div className="border-t border-white/10 pt-4">
          <p className="text-white/30 text-[10px] text-center">
            © 2024 Enugu State Land Registry
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;