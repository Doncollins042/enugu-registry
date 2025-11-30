import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Mail, HelpCircle, Send, Sparkles } from 'lucide-react';

const FloatingSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    // Show button after a short delay for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Stop pulse animation after 10 seconds
    const pulseTimer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(pulseTimer);
  }, []);

  const handleWhatsApp = () => {
    const phoneNumber = '2348012345678'; // Replace with actual number
    const text = encodeURIComponent(message || 'Hello! I need assistance with the Enugu Land Registry.');
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+2348012345678';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@enugu.gov.ng?subject=Land Registry Support Request';
  };

  const quickMessages = [
    'I need help with land registration',
    'How do I verify my documents?',
    'What are the payment options?',
    'Track my application status',
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay when panel is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Support Panel */}
      <div
        className={`fixed bottom-24 right-4 w-[calc(100%-2rem)] max-w-sm z-50 transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-[#c9a961]/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#0f3d5c] via-[#0d6e5d] to-[#0f3d5c] p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961]/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-[#c9a961]" />
                </div>
                <div>
                  <h3 className="font-serif text-white font-bold text-lg">Premium Support</h3>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Available 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-700">WhatsApp</span>
              </button>

              <button
                onClick={handleCall}
                className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#0f3d5c]/5 to-[#0d6e5d]/10 rounded-2xl border border-[#0d6e5d]/20 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-xl flex items-center justify-center shadow-lg shadow-[#0d6e5d]/30 group-hover:shadow-[#0d6e5d]/50 transition-shadow">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-[#0f3d5c]">Call Us</span>
              </button>

              <button
                onClick={handleEmail}
                className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#c9a961]/10 to-[#8b6947]/10 rounded-2xl border border-[#c9a961]/20 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center shadow-lg shadow-[#c9a961]/30 group-hover:shadow-[#c9a961]/50 transition-shadow">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-[#8b6947]">Email</span>
              </button>
            </div>

            {/* Quick Messages */}
            <div>
              <p className="text-xs text-[#8b6947] font-medium mb-2">Quick Messages</p>
              <div className="flex flex-wrap gap-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(msg)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${
                      message === msg
                        ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white border-transparent'
                        : 'bg-[#faf8f5] text-[#8b6947] border-[#c9a961]/30 hover:border-[#c9a961]'
                    }`}
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20 transition-all"
              />
              <button
                onClick={handleWhatsApp}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-lg hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Help Link */}
            <a
              href="/help"
              className="flex items-center justify-center gap-2 py-3 text-sm text-[#0d6e5d] hover:text-[#0f3d5c] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Visit Help Center for FAQs
            </a>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        {/* Pulse rings */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a961] to-[#8b6947] animate-ping opacity-30" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a961] to-[#8b6947] animate-pulse opacity-20" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {/* Main button */}
        <div
          className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-white border-2 border-[#c9a961]/30 rotate-90'
              : 'bg-gradient-to-br from-[#c9a961] via-[#d4b976] to-[#8b6947] hover:shadow-[#c9a961]/50 hover:scale-110'
          }`}
          style={{
            boxShadow: isOpen 
              ? '0 4px 20px rgba(201, 169, 97, 0.3)' 
              : '0 8px 32px rgba(201, 169, 97, 0.4), 0 4px 12px rgba(139, 105, 71, 0.3)'
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#8b6947]" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg border border-[#c9a961]/20 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="text-xs font-medium text-[#0a2540]">Need Help?</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#c9a961]/20 rotate-[-45deg]" />
          </div>
        )}
      </button>
    </>
  );
};

export default FloatingSupport;