import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building2, Smartphone, Shield, CheckCircle, Lock, Crown, Home, Search, Heart, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [plot, setPlot] = useState<any>(null);
  const [estate, setEstate] = useState<any>(null);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  useEffect(() => {
    const storedPlot = localStorage.getItem('selectedPlot');
    const storedEstate = localStorage.getItem('selectedEstate');
    if (storedPlot) setPlot(JSON.parse(storedPlot));
    if (storedEstate) setEstate(JSON.parse(storedEstate));
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'number') formattedValue = formatCardNumber(value);
    if (name === 'expiry') formattedValue = formatExpiry(value);
    if (name === 'cvv') formattedValue = value.slice(0, 3);
    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        toast.error('Please fill in all card details');
        return;
      }
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      toast.success('Payment successful!');
      
      // Clear stored data
      localStorage.removeItem('selectedPlot');
      localStorage.removeItem('selectedEstate');
    }, 3000);
  };

  const totalAmount = plot?.price || 25000000;
  const formatPrice = (amount: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

  const isActive = (path: string) => location.pathname === path;

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-[#0d6e5d] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-[#1a1a2e] font-serif text-3xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-[#8b6947] mb-8">Your land purchase has been confirmed. You will receive a confirmation email shortly.</p>
          
          <div className="bg-white rounded-2xl p-6 border border-[#c9a961]/20 mb-6">
            <p className="text-[#8b6947] text-sm mb-2">Transaction Reference</p>
            <p className="text-[#1a1a2e] font-mono text-lg font-bold">TXN-{Date.now().toString().slice(-10)}</p>
          </div>

          <div className="space-y-3">
            <button onClick={() => navigate('/portfolio')} className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white font-semibold rounded-xl">
              View My Properties
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full py-4 border border-[#c9a961]/30 text-[#8b6947] font-semibold rounded-xl">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-6 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-white font-serif text-xl font-bold">Complete Payment</h1>
              <p className="text-white/50 text-sm">Secure checkout</p>
            </div>
          </div>
          
          {/* Amount */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Amount</p>
              <p className="text-white font-serif text-2xl font-bold">{formatPrice(totalAmount)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#c9a961]" />
              <span className="text-[#c9a961] text-sm">SSL Secured</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr,320px] lg:gap-6">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20">
              <h2 className="text-[#1a1a2e] font-serif font-bold mb-4">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', icon: CreditCard, label: 'Card' },
                  { id: 'bank', icon: Building2, label: 'Bank Transfer' },
                  { id: 'ussd', icon: Smartphone, label: 'USSD' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? 'border-[#c9a961] bg-[#c9a961]/5'
                        : 'border-[#c9a961]/20 hover:border-[#c9a961]/40'
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === method.id ? 'text-[#c9a961]' : 'text-[#8b6947]'}`} />
                    <p className={`text-xs font-medium ${paymentMethod === method.id ? 'text-[#1a1a2e]' : 'text-[#8b6947]'}`}>{method.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20">
                <h2 className="text-[#1a1a2e] font-serif font-bold mb-4">Card Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      value={cardData.number}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl focus:outline-none focus:border-[#c9a961]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="name"
                      value={cardData.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl focus:outline-none focus:border-[#c9a961]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1a1a2e] text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl focus:outline-none focus:border-[#c9a961]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1a1a2e] text-sm font-medium mb-2">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="•••"
                        maxLength={3}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl focus:outline-none focus:border-[#c9a961]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Transfer */}
            {paymentMethod === 'bank' && (
              <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20">
                <h2 className="text-[#1a1a2e] font-serif font-bold mb-4">Bank Transfer Details</h2>
                <div className="bg-[#faf8f5] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#8b6947]">Bank Name</span>
                    <span className="text-[#1a1a2e] font-medium">First Bank of Nigeria</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b6947]">Account Number</span>
                    <span className="text-[#1a1a2e] font-mono font-bold">3124567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b6947]">Account Name</span>
                    <span className="text-[#1a1a2e] font-medium">Enugu State Land Registry</span>
                  </div>
                </div>
                <p className="text-[#8b6947] text-sm mt-4">Transfer the exact amount and use your email as the payment reference.</p>
              </div>
            )}

            {/* USSD */}
            {paymentMethod === 'ussd' && (
              <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20">
                <h2 className="text-[#1a1a2e] font-serif font-bold mb-4">USSD Payment</h2>
                <p className="text-[#8b6947] mb-4">Dial the code below on your registered phone to complete payment:</p>
                <div className="bg-[#1a1a2e] rounded-xl p-4 text-center">
                  <p className="text-[#c9a961] font-mono text-2xl font-bold">*901*000*{Date.now().toString().slice(-6)}#</p>
                </div>
                <p className="text-[#8b6947] text-sm mt-4">The code will expire in 10 minutes.</p>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Pay {formatPrice(totalAmount)}
                </>
              )}
            </button>
          </div>

          {/* Order Summary */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20 sticky top-6">
              <h2 className="text-[#1a1a2e] font-serif font-bold mb-4">Order Summary</h2>
              
              {plot && estate && (
                <div className="bg-[#faf8f5] rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#c9a961]/20 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-[#c9a961]" />
                    </div>
                    <div>
                      <p className="text-[#1a1a2e] font-bold">{plot.number}</p>
                      <p className="text-[#8b6947] text-sm">{estate.name}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8b6947]">Plot Size</span>
                      <span className="text-[#1a1a2e]">{plot.sqm} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8b6947]">Tier</span>
                      <span className="text-[#1a1a2e]">{plot.tier}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 border-t border-[#c9a961]/10 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8b6947]">Land Price</span>
                  <span className="text-[#1a1a2e]">{formatPrice(totalAmount * 0.95)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8b6947]">Processing Fee</span>
                  <span className="text-[#1a1a2e]">{formatPrice(totalAmount * 0.03)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8b6947]">Documentation</span>
                  <span className="text-[#1a1a2e]">{formatPrice(totalAmount * 0.02)}</span>
                </div>
                <div className="flex justify-between font-bold pt-3 border-t border-[#c9a961]/10">
                  <span className="text-[#1a1a2e]">Total</span>
                  <span className="text-[#0d6e5d] text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
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

export default Payment;