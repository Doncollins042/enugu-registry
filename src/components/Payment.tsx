import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, Building2, CheckCircle, Shield, Lock,
  Smartphone, Wallet, Copy, Clock, AlertCircle, QrCode,
  ChevronRight, Loader2, Home, Receipt
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FeeBreakdown {
  propertyPrice: number;
  legalFee: number;
  surveyFee: number;
  deedOfAssignmentFee: number;
  developmentLevy: number;
  agencyFee: number;
  stampDuty: number;
  registrationFee: number;
  totalFees: number;
  grandTotal: number;
}

interface PaymentState {
  type: string;
  amount: number;
  description: string;
  reference: string;
  returnUrl?: string;
  estateName?: string;
  plotDetails?: {
    plot_number: string;
    size: number;
    type: string;
    estate: string;
    location: string;
    price?: number;
  };
  feeBreakdown?: FeeBreakdown;
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state as PaymentState;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd' | 'crypto'>('card');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    if (!paymentData) {
      toast.error('No payment information found');
      navigate('/dashboard');
    }
  }, [paymentData, navigate]);

  const formatCurrency = (amount: number) => {
    return '₦' + amount.toLocaleString();
  };

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

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (paymentData.type === 'Plot Search Fee') {
      try {
        let estateName = paymentData.estateName || '';
        if (!estateName && paymentData.description) {
          estateName = paymentData.description.replace('Survey Plan Access - ', '');
        }
        if (estateName) {
          const paidEstates = JSON.parse(localStorage.getItem('paidSearchFees') || '[]');
          if (!paidEstates.includes(estateName)) {
            paidEstates.push(estateName);
            localStorage.setItem('paidSearchFees', JSON.stringify(paidEstates));
          }
        }
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    }

    setProcessing(false);
    setShowSuccess(true);
  };

  const handleSuccessContinue = () => {
    if (paymentData.type === 'Plot Search Fee' && paymentData.returnUrl) {
      navigate(paymentData.returnUrl, { state: { paymentSuccess: true }, replace: true });
    } else if (paymentData.returnUrl) {
      navigate(paymentData.returnUrl);
    } else {
      navigate('/dashboard');
    }
  };

  const bankDetails = {
    bankName: 'First Bank of Nigeria',
    accountNumber: '3124567890',
    accountName: 'Enugu State Land Registry',
  };

  if (!paymentData) return null;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-gray-100">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">{paymentData.description}</p>
          
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-emerald-600 text-xl">{formatCurrency(paymentData.amount)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500">Reference</span>
              <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{paymentData.reference}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Date</span>
              <span className="text-sm">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {paymentData.type === 'Plot Search Fee' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Access Granted!</p>
                  <p className="text-sm text-blue-700 mt-1">You now have full access to all plots.</p>
                </div>
              </div>
            </div>
          )}

          {paymentData.type === 'Property Purchase' && paymentData.plotDetails && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900">Property Reserved!</p>
                  <p className="text-sm text-emerald-700 mt-1">Plot <span className="font-bold">{paymentData.plotDetails.plot_number}</span> has been reserved.</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-200">
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Allocation letter within 48 hours</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Title documents in 90 days</li>
                </ul>
              </div>
            </div>
          )}
          
          <button onClick={handleSuccessContinue} className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
            {paymentData.type === 'Plot Search Fee' ? 'View Plots' : 'Go to Dashboard'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-gray-500">{paymentData.type}</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Secure</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-36">
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 mb-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <p className="text-blue-200 text-sm mb-1">Total Amount</p>
            <p className="text-4xl font-bold mb-4">{formatCurrency(paymentData.amount)}</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-sm text-blue-100 mb-1">Description</p>
              <p className="font-semibold">{paymentData.description}</p>
              
              {paymentData.plotDetails && (
                <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-blue-200">Plot</p><p className="font-semibold">{paymentData.plotDetails.plot_number}</p></div>
                  <div><p className="text-blue-200">Size</p><p className="font-semibold">{paymentData.plotDetails.size} sqm</p></div>
                  <div><p className="text-blue-200">Type</p><p className="font-semibold">{paymentData.plotDetails.type}</p></div>
                  <div><p className="text-blue-200">Location</p><p className="font-semibold">{paymentData.plotDetails.location}</p></div>
                </div>
              )}

              {paymentData.type === 'Property Purchase' && paymentData.feeBreakdown && (
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Receipt className="w-4 h-4 text-amber-400" />
                    <p className="text-amber-400 text-sm font-semibold">Breakdown</p>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-blue-200">Property Price</span><span>{formatCurrency(paymentData.feeBreakdown.propertyPrice)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Legal Fee (5%)</span><span>{formatCurrency(paymentData.feeBreakdown.legalFee)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Survey Fee</span><span>{formatCurrency(paymentData.feeBreakdown.surveyFee)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Deed of Assignment</span><span>{formatCurrency(paymentData.feeBreakdown.deedOfAssignmentFee)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Development Levy</span><span>{formatCurrency(paymentData.feeBreakdown.developmentLevy)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Agency Fee</span><span>{formatCurrency(paymentData.feeBreakdown.agencyFee)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Stamp Duty</span><span>{formatCurrency(paymentData.feeBreakdown.stampDuty)}</span></div>
                    <div className="flex justify-between"><span className="text-blue-200">Registration</span><span>{formatCurrency(paymentData.feeBreakdown.registrationFee)}</span></div>
                    <div className="flex justify-between pt-2 mt-2 border-t border-white/20">
                      <span className="font-bold">Grand Total</span>
                      <span className="font-bold text-amber-400">{formatCurrency(paymentData.feeBreakdown.grandTotal)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-blue-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Ref: {paymentData.reference}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'card', label: 'Card', icon: CreditCard, desc: 'Debit/Credit' },
              { id: 'bank', label: 'Transfer', icon: Building2, desc: 'Bank Transfer' },
              { id: 'ussd', label: 'USSD', icon: Smartphone, desc: 'Bank USSD' },
              { id: 'crypto', label: 'Crypto', icon: Wallet, desc: 'BTC, USDT' },
            ].map((m) => (
              <button key={m.id} onClick={() => setPaymentMethod(m.id as any)} className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === m.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${paymentMethod === m.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <m.icon className={`w-5 h-5 ${paymentMethod === m.id ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
                <p className={`font-semibold text-sm ${paymentMethod === m.id ? 'text-blue-900' : 'text-gray-900'}`}>{m.label}</p>
                <p className="text-xs text-gray-500">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 mb-4">Card Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <div className="relative">
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12 text-lg tracking-wider" />
                  <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} placeholder="JOHN DOE" className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                  <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" maxLength={4} className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Your card details are encrypted and secure</span>
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 mb-4">Bank Transfer</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-amber-800">Transfer exactly {formatCurrency(paymentData.amount)}</p>
                    <p className="text-amber-700 mt-1">Confirmed within 5 minutes.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div><p className="text-sm text-gray-500">Bank</p><p className="font-bold text-lg">{bankDetails.bankName}</p></div>
                  <button onClick={() => copyToClipboard(bankDetails.bankName)} className="p-2 hover:bg-gray-200 rounded-lg"><Copy className="w-5 h-5 text-gray-500" /></button>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div><p className="text-sm text-gray-500">Account Number</p><p className="font-bold text-2xl font-mono">{bankDetails.accountNumber}</p></div>
                  <button onClick={() => copyToClipboard(bankDetails.accountNumber)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Copy</button>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div><p className="text-sm text-gray-500">Account Name</p><p className="font-bold">{bankDetails.accountName}</p></div>
                </div>
                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-4">
                  <div><p className="text-sm text-blue-600">Amount</p><p className="font-bold text-blue-900 text-2xl">{formatCurrency(paymentData.amount)}</p></div>
                  <button onClick={() => copyToClipboard(paymentData.amount.toString())} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">Copy</button>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'ussd' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 mb-4">USSD Payment</h3>
              <div className="space-y-3">
                {[
                  { bank: 'GTBank', code: `*737*2*${paymentData.amount}#` },
                  { bank: 'First Bank', code: `*894*${paymentData.amount}#` },
                  { bank: 'UBA', code: `*919*4*${paymentData.amount}#` },
                  { bank: 'Access Bank', code: `*901*${paymentData.amount}#` },
                  { bank: 'Zenith Bank', code: `*966*${paymentData.amount}#` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div><p className="font-semibold">{item.bank}</p><p className="text-sm text-gray-600 font-mono">{item.code}</p></div>
                    <button onClick={() => copyToClipboard(item.code)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Copy</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === 'crypto' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 mb-4">Crypto Payment</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="p-4 border-2 border-amber-400 bg-amber-50 rounded-xl text-center"><p className="font-bold text-amber-700">Bitcoin</p></button>
                <button className="p-4 border-2 border-gray-200 rounded-xl text-center"><p className="font-bold text-gray-700">USDT</p></button>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center border-2 border-gray-200">
                    <QrCode className="w-24 h-24 text-gray-300" />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">BTC Address</p>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border">
                    <code className="text-xs flex-1 break-all">3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5</code>
                    <button onClick={() => copyToClipboard('3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5')} className="p-2 bg-blue-100 rounded-lg"><Copy className="w-4 h-4 text-blue-600" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button onClick={handlePayment} disabled={processing} className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-bold disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg">
            {processing ? (<><Loader2 className="w-5 h-5 animate-spin" />Processing...</>) : (<><Lock className="w-5 h-5" />{paymentMethod === 'card' ? `Pay ${formatCurrency(paymentData.amount)}` : 'I Have Made This Payment'}</>)}
          </button>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}