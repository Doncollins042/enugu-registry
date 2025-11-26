import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, MessageCircle, Phone, Mail, FileText,
  ChevronDown, ChevronRight, HelpCircle, Book, Shield, CreditCard,
  Building2, Scale, ExternalLink, Send, X, Headphones
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{type: 'user' | 'agent', text: string}[]>([
    { type: 'agent', text: 'Hello! Welcome to Enugu Land Registry support. How can I help you today?' }
  ]);

  const faqs = [
    {
      category: 'Getting Started',
      icon: Book,
      questions: [
        { q: 'How do I create an account?', a: 'Click on "Get Started" from the homepage, then select "Register" to create a new account with your email, phone number, and password.' },
        { q: 'How do I verify my account?', a: 'After registration, you will receive a 6-digit OTP on your phone. Enter this code to verify your account.' },
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

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatMessages([...chatMessages, { type: 'user', text: chatMessage }]);
    setChatMessage('');
    
    // Simulate agent response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'agent', 
        text: 'Thank you for your message. Our support team will respond shortly. For urgent matters, please call +234 801 234 5678.' 
      }]);
    }, 1500);
  };

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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-lg">
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
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-4 flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-emerald-100">Chat with us</p>
            </div>
          </button>

          <a 
            href="tel:+2348012345678"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Call Us</p>
              <p className="text-sm text-blue-100">+234 801 234 5678</p>
            </div>
          </a>

          <a 
            href="mailto:support@enugu.gov.ng"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-4 flex items-center gap-3 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
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
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
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
                        <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
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
          <p className="text-blue-200 mb-4">Our support team is available 24/7 to assist you</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => setShowLiveChat(true)}
              className="px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Start Live Chat
            </button>
            <button 
              onClick={handleWhatsApp}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </main>

      {/* Floating Support Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>

        {/* Live Chat Button */}
        <button
          onClick={() => setShowLiveChat(true)}
          className="w-14 h-14 bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>

      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Live Support</p>
                  <p className="text-xs text-blue-200">Online • Typically replies instantly</p>
                </div>
              </div>
              <button onClick={() => setShowLiveChat(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-blue-900 text-white rounded-br-none' 
                      : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}