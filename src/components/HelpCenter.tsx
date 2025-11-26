import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, HelpCircle, Mail, Phone, MessageCircle, Send, ChevronDown, ChevronUp, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface HelpCenterProps {
  user: any;
  onLogout: () => void;
}

export default function HelpCenter({ user, onLogout }: HelpCenterProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: 'general',
    message: '',
  });

  const faqs = [
    {
      question: 'How do I purchase a property?',
      answer: 'To purchase a property: 1) Browse available estates from your dashboard, 2) Select an estate and pay the ₦30,000 search fee, 3) View the survey plan and select your preferred plot, 4) Proceed to payment. All transactions are secured with blockchain technology and you\'ll receive digital ownership documents upon completion.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards (Visa, Mastercard, Verve) and cryptocurrency (Bitcoin, USDT). All payments are processed through our encrypted payment gateway with PCI DSS compliance. You\'ll receive instant confirmation upon successful payment.'
    },
    {
      question: 'How long does document verification take?',
      answer: 'Standard verification takes 5-7 business days and costs ₦15,000. Express verification is completed within 24-48 hours for ₦25,000. You will receive email and SMS notifications once your document is verified, along with a digital certificate.'
    },
    {
      question: 'What is Governor\'s Consent and why do I need it?',
      answer: 'Governor\'s Consent is a legal requirement in Nigeria for property transfers, mortgages, or assignments. It\'s the state government\'s approval of your property transaction. Without it, your ownership may not be legally recognized. The processing fee is ₦150,000 and takes 14-21 business days.'
    },
    {
      question: 'How do I pay ground rent?',
      answer: 'Navigate to "Ground Rent Payment" from your dashboard, select your property from the list, and complete the payment. Ground rent is an annual fee paid to the state government. Failure to pay may result in penalties or forfeiture of land rights.'
    },
    {
      question: 'Can I download my property documents?',
      answer: 'Yes! All your property documents including Survey Plans, Certificate of Occupancy, Title Deeds, and payment receipts are available in your Portfolio. You can download them in PDF format at any time for your records.'
    },
    {
      question: 'Is my property ownership secured on blockchain?',
      answer: 'Yes, every property purchase is recorded on the blockchain, creating an immutable record of ownership. This prevents fraud, double-selling, and provides permanent proof of your ownership that cannot be altered or disputed.'
    },
    {
      question: 'What happens if I forget my password?',
      answer: 'Click on "Forgot Password" on the login page and enter your registered email address. You\'ll receive a password reset link within minutes. For security, the link expires after 24 hours.'
    },
  ];

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!contactForm.message.trim()) {
      toast.error('Please enter your message');
      return;
    }
    if (contactForm.message.length < 20) {
      toast.error('Please provide more details (at least 20 characters)');
      return;
    }

    setSending(true);
    toast.loading('Sending your message...', { id: 'contact' });

    setTimeout(() => {
      toast.dismiss('contact');
      setSending(false);
      setMessageSent(true);
      toast.success('Message sent successfully!');
    }, 2000);
  };

  const handleNewMessage = () => {
    setContactForm({ subject: '', category: 'general', message: '' });
    setMessageSent(false);
  };

  const handleStartLiveChat = () => {
    toast.success('Connecting to live support...');
    setTimeout(() => {
      toast('💬 A support agent will be with you shortly', { duration: 5000 });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80" alt="Support" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Help & Support</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <LogOut className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h1>
            <p className="text-sm text-gray-600">Find answers to common questions or contact our support team</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'contact', label: 'Contact Us', icon: Mail },
              { id: 'live-chat', label: 'Live Chat', icon: MessageCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-900 text-white' 
                    : 'bg-white/90 border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all text-left"
                    >
                      <span className="text-sm font-medium text-gray-900 pr-4">{faq.question}</span>
                      {expandedFaq === i ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === i && (
                      <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed bg-gray-50 border-t border-gray-200">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                {!messageSent ? (
                  <>
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                          disabled={sending}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="payment">Payment Issues</option>
                          <option value="documents">Document Verification</option>
                          <option value="complaint">Complaint</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          disabled={sending}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          disabled={sending}
                          rows={6}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50 resize-none"
                          placeholder="Describe your issue or question in detail..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">{contactForm.message.length}/500 characters</p>
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {sending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Thank you for contacting us. Our support team will respond within 24 hours.
                    </p>
                    <button
                      onClick={handleNewMessage}
                      className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">Email Support</h3>
                      <p className="text-sm text-gray-600 mb-2">We'll respond within 24 hours</p>
                      <a href="mailto:support@enugu-lands.gov.ng" className="text-sm text-blue-900 font-medium hover:text-blue-800">
                        support@enugu-lands.gov.ng
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">Phone Support</h3>
                      <p className="text-sm text-gray-600 mb-2">Mon-Fri: 8AM - 5PM WAT</p>
                      <a href="tel:+2348012345678" className="text-sm text-blue-900 font-medium hover:text-blue-800">
                        +234 801 234 5678
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">Office Address</h3>
                      <p className="text-sm text-gray-600">
                        Ministry of Lands & Urban Development<br />
                        Independence Layout<br />
                        Enugu State, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Chat Tab */}
          {activeTab === 'live-chat' && (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-blue-900" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat Support</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                Connect with our support team in real-time for immediate assistance with your queries.
              </p>
              <button 
                onClick={handleStartLiveChat}
                className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
              >
                Start Live Chat
              </button>
              <p className="text-xs text-gray-500 mt-4">Available Mon-Fri: 8AM - 5PM WAT</p>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">Can't wait? Try these alternatives:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={() => setActiveTab('faq')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    Browse FAQs
                  </button>
                  <button 
                    onClick={() => setActiveTab('contact')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}