import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, MessageCircle, Phone, Mail, FileText,
  ChevronDown, ChevronRight, HelpCircle, Book, Shield, CreditCard,
  Building2, Scale, ExternalLink, Headphones
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Getting Started',
      icon: Book,
      questions: [
        { q: 'How do I create an account?', a: 'Click on "Get Started" from the homepage, then select "Register" to create a new account with your email, phone number, and password.' },
        { q: 'How do I verify my account?', a: 'After registration, you will receive a 6-digit OTP on your phone. Enter this code to verify your account. For testing, use code: 123456' },
        { q: 'Is my information secure?', a: 'Yes, we use bank-level encryption and blockchain technology to secure all your data and transactions.' },
      ]
    },
    {
      category: 'Property Purchase',
      icon: Building2,
      questions: [
        { q: 'How do I buy a property?', a: 'Browse available estates from the dashboard, select a plot, review details, and proceed to payment. All properties are government-verified.' },
        { q: 'What payment methods are accepted?', a: 'We accept bank transfers, debit/credit cards, USSD payments, and cryptocurrency (BTC, USDT, ETH).' },
        { q: 'How long does verification take?', a: 'Property verification typically takes 24-48 hours after payment confirmation.' },
      ]
    },
    {
      category: 'Documents & Verification',
      icon: FileText,
      questions: [
        { q: 'How do I verify a land document?', a: 'Go to "Verify Document" from the menu, enter the document number or scan the QR code to verify authenticity.' },
        { q: "What is Governor's Consent?", a: "Governor's Consent is a mandatory approval required for the transfer of property ownership in Nigeria. It validates legal transfer of land." },
        { q: 'What is Ground Rent?', a: 'Ground Rent is an annual fee payable to the government for land ownership. You can pay this through our platform.' },
      ]
    },
    {
      category: 'Payments & Fees',
      icon: CreditCard,
      questions: [
        { q: 'Are there any hidden fees?', a: 'No, all fees are transparently displayed before you make any payment. What you see is what you pay.' },
        { q: 'Can I get a refund?', a: 'Refunds are processed on a case-by-case basis. Contact support within 24 hours of payment for assistance.' },
        { q: 'How do I download my receipt?', a: 'Go to your Portfolio, click on the transaction, and select "Download Receipt" to get your payment receipt.' },
      ]
    },
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/2348012345678?text=Hello, I need help with Enugu Land Registry', '_blank');
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Help Center</h1>
            <p className="text-sm text-blue-200">We're here to help you</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="max-w-4xl mx-auto px-4 pb-8 pt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-blue-300"
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button 
            onClick={handleWhatsApp}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-4 flex items-center gap-3 transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-emerald-100">Chat with us</p>
            </div>
          </button>

          <a 
            href="tel:+2348012345678"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 flex items-center gap-3 transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Call Us</p>
              <p className="text-sm text-blue-100">+234 801 234 5678</p>
            </div>
          </a>

          <a 
            href="mailto:support@enugu.gov.ng"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-4 flex items-center gap-3 transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Email</p>
              <p className="text-sm text-purple-100">support@enugu.gov.ng</p>
            </div>
          </a>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          {(searchQuery ? filteredFaqs : faqs).map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <category.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.category}</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {category.questions.map((faq, faqIndex) => {
                  const index = catIndex * 10 + faqIndex;
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-all"
                      >
                        <span className="font-medium text-gray-900 pr-4 text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`} />
                      </button>
                      {openFaq === index && (
                        <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed bg-blue-50/50">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white text-center">
          <Headphones className="w-12 h-12 mx-auto mb-4 text-amber-400" />
          <h3 className="text-xl font-bold mb-2">Still Need Help?</h3>
          <p className="text-blue-200 mb-6">Our support team is available 24/7 to assist you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleWhatsApp}
              className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all active:scale-95"
            >
              Chat on WhatsApp
            </button>
            <a 
              href="tel:+2348012345678"
              className="px-6 py-3 bg-white text-blue-900 rounded-xl font-semibold hover:bg-gray-100 transition-all active:scale-95"
            >
              Call Support
            </a>
          </div>
        </div>

        {/* Office Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Visit Our Office</h3>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Address:</span><br />
              Ministry of Lands & Urban Development,<br />
              State Secretariat, Independence Layout,<br />
              Enugu State, Nigeria
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Office Hours:</span><br />
              Monday - Friday: 8:00 AM - 4:00 PM
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}