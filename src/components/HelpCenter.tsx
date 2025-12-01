import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Search, Building2, Heart, User, HelpCircle, MessageCircle, Phone, Mail, ChevronRight, ChevronDown, FileText, Shield, CreditCard, MapPin, Clock } from 'lucide-react';

const HelpCenter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { icon: FileText, label: 'Documentation', description: 'C of O, Survey Plans, Deeds', color: 'from-[#0d6e5d] to-[#064e3b]' },
    { icon: CreditCard, label: 'Payments', description: 'Transactions & Receipts', color: 'from-[#c9a961] to-[#8b6947]' },
    { icon: Shield, label: 'Verification', description: 'Land & Document Checks', color: 'from-[#0f3d5c] to-[#1a1a2e]' },
    { icon: MapPin, label: 'Properties', description: 'Estates & Plots', color: 'from-[#7c3aed] to-[#5b21b6]' },
  ];

  const faqs = [
    { q: 'How do I verify a land document?', a: 'Navigate to Services > Document Verification, enter the document number (C of O, Survey Plan, or Deed of Assignment), and our system will check against the government database. Results are typically returned within seconds.' },
    { q: 'What payment methods are accepted?', a: 'We accept all major Nigerian bank cards (Verve, Mastercard, Visa), bank transfers to designated government accounts, and USSD payments. All transactions are secured with bank-grade encryption.' },
    { q: 'How long does C of O processing take?', a: 'Certificate of Occupancy processing typically takes 6-12 months depending on the complexity of the application and document verification. You can track your application status in real-time through the platform.' },
    { q: 'Can I transfer ownership of my land?', a: 'Yes, ownership transfer can be initiated through the platform. Both parties must be registered users, and the transfer requires Governor\'s Consent for registered lands. Processing fees apply.' },
    { q: 'How do I pay my ground rent?', a: 'Go to Services > Ground Rent, enter your property details or C of O number, view any outstanding payments, and pay directly through the platform. Payment receipts are generated instantly.' },
    { q: 'What is Governor\'s Consent?', a: 'Governor\'s Consent is a statutory approval required for any transaction involving land with a Certificate of Occupancy (C of O). It validates the transfer and updates the government land registry.' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-8 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#c9a961]/10 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl lg:hidden">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-white font-serif text-xl lg:text-2xl font-bold">Help Center</h1>
              <p className="text-white/50 text-sm">How can we help you today?</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-[#1a1a2e] placeholder-[#8b6947]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
            />
          </div>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto -mt-4">
        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {categories.map((cat, i) => (
            <button key={i} className="bg-white rounded-xl p-4 border border-[#c9a961]/20 hover:shadow-lg transition-shadow text-left">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}>
                <cat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#1a1a2e] font-bold text-sm">{cat.label}</p>
              <p className="text-[#8b6947] text-xs">{cat.description}</p>
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-[#c9a961]/20 overflow-hidden mb-6">
          <div className="p-5 border-b border-[#c9a961]/10">
            <h2 className="text-[#1a1a2e] font-serif font-bold text-lg">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-[#c9a961]/10">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="text-[#1a1a2e] font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8b6947] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="text-[#8b6947] text-sm mt-3 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-2xl border border-[#c9a961]/20 p-5">
          <h2 className="text-[#1a1a2e] font-serif font-bold text-lg mb-4">Still Need Help?</h2>
          <div className="space-y-3">
            <a href="tel:+2348012345678" className="flex items-center gap-4 p-4 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0d6e5d] to-[#064e3b] rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#1a1a2e] font-medium">Call Support</p>
                <p className="text-[#8b6947] text-sm">+234 801 234 5678</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8b6947]" />
            </a>
            
            <a href="mailto:support@enugu.gov.ng" className="flex items-center gap-4 p-4 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#1a1a2e] font-medium">Email Us</p>
                <p className="text-[#8b6947] text-sm">support@enugu.gov.ng</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8b6947]" />
            </a>

            <button className="flex items-center gap-4 p-4 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors w-full">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0f3d5c] to-[#1a1a2e] rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[#1a1a2e] font-medium">Live Chat</p>
                <p className="text-[#8b6947] text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Mon-Fri 9AM-5PM
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8b6947]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30 lg:hidden">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${isActive(item.path) ? 'bg-gradient-to-r from-[#1a1a2e] to-[#0f3d5c]' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] ${isActive(item.path) ? 'text-[#1a1a2e] font-medium' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HelpCenter;