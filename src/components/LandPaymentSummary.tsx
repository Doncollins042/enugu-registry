import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Ruler,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  Shield,
  FileText,
  Calculator,
  Sparkles,
  Building2,
  AlertCircle,
  Home,
  Search,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PlotData {
  id: number;
  plot_number: string;
  size: string;
  price: number;
  status: string;
  location: string;
}

interface EstateData {
  id: number;
  name: string;
  slug: string;
  location: string;
  plot_size: string;
}

const LandPaymentSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [plot, setPlot] = useState<PlotData | null>(null);
  const [estate, setEstate] = useState<EstateData | null>(null);

  useEffect(() => {
    // Get data from navigation state
    const state = location.state as { plot?: PlotData; estate?: EstateData } | null;
    
    if (state?.plot && state?.estate) {
      setPlot(state.plot);
      setEstate(state.estate);
    } else {
      // Check localStorage for any saved selection
      const savedPlot = localStorage.getItem('selectedPlot');
      const savedEstate = localStorage.getItem('selectedEstate');
      
      if (savedPlot && savedEstate) {
        setPlot(JSON.parse(savedPlot));
        setEstate(JSON.parse(savedEstate));
      }
    }
  }, [location.state]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate fees based on plot price
  const plotPrice = plot?.price || 0;
  const legalFee = plotPrice * 0.05; // 5%
  const surveyFee = 75000;
  const deedOfAssignment = 50000;
  const developmentLevy = plotPrice * 0.01; // 1%
  const agencyFee = plotPrice * 0.025; // 2.5%
  const stampDuty = plotPrice * 0.015; // 1.5%
  const registrationFee = 25000;

  const totalFees = legalFee + surveyFee + deedOfAssignment + developmentLevy + agencyFee + stampDuty + registrationFee;
  const grandTotal = plotPrice + totalFees;

  const fees = [
    { name: 'Plot Price', amount: plotPrice, highlight: true },
    { name: 'Legal Fee (5%)', amount: legalFee },
    { name: 'Survey Fee', amount: surveyFee },
    { name: 'Deed of Assignment', amount: deedOfAssignment },
    { name: 'Development Levy (1%)', amount: developmentLevy },
    { name: 'Agency Fee (2.5%)', amount: agencyFee },
    { name: 'Stamp Duty (1.5%)', amount: stampDuty },
    { name: 'Registration Fee', amount: registrationFee },
  ];

  const handleProceedToPayment = () => {
    if (!plot || !estate) {
      toast.error('Please select a property first');
      return;
    }

    setIsProcessing(true);

    // Save to localStorage for payment page
    localStorage.setItem('selectedPlot', JSON.stringify(plot));
    localStorage.setItem('selectedEstate', JSON.stringify(estate));
    localStorage.setItem('paymentAmount', grandTotal.toString());

    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment', {
        state: {
          plot,
          estate,
          totalAmount: grandTotal,
          fees: fees,
        }
      });
    }, 500);
  };

  const isActive = (path: string) => location.pathname === path;

  // Show error state if no property selected
  if (!plot || !estate) {
    return (
      <div className="min-h-screen bg-[#faf8f5] pb-24">
        {/* Header */}
        <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="font-serif text-white text-xl font-bold">Payment Summary</h1>
                <p className="text-white/70 text-xs">Review your purchase</p>
              </div>
            </div>
          </div>
        </header>

        {/* Error Content */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 border border-[#c9a961]/20 shadow-xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="font-serif text-[#0a2540] text-xl font-bold mb-2">No Property Selected</h2>
            <p className="text-[#8b6947] text-sm mb-6">
              Please select a property first to view the payment summary.
            </p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white font-semibold shadow-lg"
            >
              Browse Properties
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {[
              { icon: Home, label: 'Home', path: '/dashboard' },
              { icon: Search, label: 'Search', path: '/search' },
              { icon: Building2, label: 'Services', path: '/services/document-verification' },
              { icon: Heart, label: 'Portfolio', path: '/portfolio' },
              { icon: User, label: 'Profile', path: '/settings' },
            ].map((item) => (
              <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
                <div className={`p-2 rounded-xl ${isActive(item.path) ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                  <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
                </div>
                <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white text-xl font-bold">Payment Summary</h1>
              <p className="text-white/70 text-xs">Review fees and proceed to payment</p>
            </div>
          </div>

          {/* Selected Plot Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c9a961] to-[#8b6947] rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">{plot.plot_number}</p>
                <p className="text-white/70 text-sm">{estate.name}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/70">
                <Ruler className="w-4 h-4" />
                <span>{plot.size}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                <span>{plot.location}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 -mt-8 relative z-10 space-y-6">
        {/* Fee Breakdown */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#c9a961]/20 shadow-xl">
          <h3 className="font-serif text-[#0a2540] font-bold mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#c9a961]" />
            Fee Breakdown
          </h3>
          <div className="space-y-3">
            {fees.map((fee, index) => (
              <div
                key={index}
                className={`flex items-center justify-between py-3 ${
                  fee.highlight
                    ? 'bg-gradient-to-r from-[#0f3d5c]/5 to-[#0d6e5d]/5 rounded-xl px-3 -mx-3'
                    : 'border-b border-[#c9a961]/10 last:border-0'
                }`}
              >
                <span className={`text-sm ${fee.highlight ? 'font-semibold text-[#0a2540]' : 'text-[#8b6947]'}`}>
                  {fee.name}
                </span>
                <span className={`text-sm font-medium ${fee.highlight ? 'text-[#0d6e5d] font-bold' : 'text-[#0a2540]'}`}>
                  {formatPrice(fee.amount)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t-2 border-[#c9a961]/20">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0a2540]">Total Amount</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#c9a961] to-[#8b6947] bg-clip-text text-transparent">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#c9a961]/20 shadow-xl">
          <h3 className="font-serif text-[#0a2540] font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c9a961]" />
            What's Included
          </h3>
          <div className="space-y-3">
            {[
              'Official Deed of Assignment',
              'Survey Plan with Beacon Numbers',
              'Registered Land Title',
              'Development Permit',
              'Government Approved Documentation',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0d6e5d]" />
                <span className="text-sm text-[#8b6947]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-2xl p-4 border border-[#c9a961]/20 flex gap-3">
          <Shield className="w-5 h-5 text-[#c9a961] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#0a2540]">Secure Transaction</p>
            <p className="text-xs text-[#8b6947]">
              Your payment is protected by bank-level encryption. All transactions are verified and documented.
            </p>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceedToPayment}
          disabled={isProcessing}
          className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-2xl transition-all"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Proceed to Payment
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Terms */}
        <p className="text-xs text-center text-[#8b6947]">
          By proceeding, you agree to our{' '}
          <a href="#" className="text-[#0d6e5d] underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#0d6e5d] underline">Privacy Policy</a>
        </p>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${isActive(item.path) ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default LandPaymentSummary;