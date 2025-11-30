import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, ChevronRight, ChevronDown, Phone, Mail, 
  MessageCircle, MapPin, Clock, HelpCircle, FileText, Shield,
  CreditCard, Home, Building2, Crown, ExternalLink
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs: FAQ[] = [
    { question: 'How do I purchase a plot?', answer: 'Browse estates, select a plot, pay the search fee to view all plots, then proceed to purchase by completing the payment with all legal fees included.', category: 'purchase' },
    { question: 'What documents will I receive?', answer: 'You will receive: Certificate of Occupancy (C of O), Deed of Assignment, Survey Plan, Registered Title Document, Payment Receipt, and Legal Clearance Certificate.', category: 'documents' },
    { question: 'How long does title processing take?', answer: 'Title documents are typically processed within 90 working days after payment completion. You\'ll receive regular updates via email and SMS.', category: 'documents' },
    { question: 'What payment methods are accepted?', answer: 'We accept card payments (Visa, Mastercard), bank transfers, USSD payments, and cryptocurrency (Bitcoin, USDT).', category: 'payment' },
    { question: 'Is my payment secure?', answer: 'Yes, all payments are processed through secure, encrypted channels with 256-bit SSL protection. We are PCI-DSS compliant.', category: 'payment' },
    { question: 'Can I visit the property before purchase?', answer: 'Yes, we encourage site visits. Contact us via WhatsApp to schedule a guided tour of any estate.', category: 'purchase' },
    { question: 'What is the search fee for?', answer: 'The search fee (₦30,000) grants you access to view all plots in an estate, including the survey plan, prices, and availability status.', category: 'purchase' },
    { question: 'Are the properties government approved?', answer: 'Yes, all our estates are fully approved by the Enugu State Government with proper documentation and legal backing.', category: 'verification' },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: HelpCircle },
    { id: 'purchase', label: 'Purchase', icon: Home },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'verification', label: 'Verification', icon: Shield },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const contactMethods = [
    { icon: Phone, label: 'Call Us', value: '+234 801 234 5678', action: 'tel:+2348012345678', color: 'from-[#0f3d5c] to-[#0d6e5d]' },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', action: 'https://wa.me/2348012345678', color: 'from-[#0d6e5d] to-[#15a88a]' },
    { icon: Mail, label: 'Email', value: 'support@enugu.gov.ng', action: 'mailto:support@enugu.gov.ng', color: 'from-[#c9a961] to-[#8b6947]' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-8">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white font-bold">Help Center</h1>
              <p className="text-white/70 text-xs">We're here to help</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a961] shadow-lg"
            />
          </div>
        </div>
      </header>

      <main className="px-4 -mt-10 relative z-10">
        {/* Contact Cards */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {contactMethods.map((method, i) => (
            <a key={i} href={method.action} target="_blank" rel="noopener noreferrer" className="bg-white/95 backdrop-blur-xl rounded-2xl p-3 text-center border border-[#c9a961]/20 shadow-lg">
              <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <method.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#0a2540] font-semibold text-xs">{method.label}</p>
              <p className="text-[#8b6947] text-[10px] truncate">{method.value}</p>
            </a>
          ))}
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white border-transparent shadow-lg'
                  : 'bg-white text-[#8b6947] border-[#c9a961]/20'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-6">
          <h2 className="font-serif text-[#0a2540] font-bold text-sm mb-3">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-xl rounded-xl border border-[#c9a961]/20 overflow-hidden shadow-sm">
                <button onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left">
                  <span className="text-[#0a2540] font-medium text-sm pr-4">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#8b6947] flex-shrink-0 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4">
                    <p className="text-[#8b6947] text-xs leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Office Info */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[#c9a961]/20 p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-[#c9a961]" />
            <h2 className="font-serif text-[#0a2540] font-bold text-sm">Visit Our Office</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-[#8b6947]">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Block A, Secretariat Complex, Independence Layout, Enugu State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2 text-[#8b6947]">
              <Clock className="w-4 h-4" />
              <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}