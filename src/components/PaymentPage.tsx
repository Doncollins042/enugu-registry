import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, CreditCard, Bitcoin, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentPageProps {
  user: any;
  onLogout: () => void;
  plot: any;
  estate: any;
  onPurchase: (property: any) => void;
}

export default function PaymentPage({ user, onLogout, plot, estate, onPurchase }: PaymentPageProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolder: ''
  });

  const plotPrice = plot?.price || 5000000;
  const fees = {
    legal: 150000,
    survey: 80000,
    registration: 50000,
    documentation: 30000
  };
  const totalAmount = plotPrice + fees.legal + fees.survey + fees.registration + fees.documentation;

  const validateCard = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      toast.error('Please enter a valid card number');
      return false;
    }
    if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    if (!cardDetails.cardHolder.trim()) {
      toast.error('Please enter the cardholder name');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (paymentMethod === 'card' && !validateCard()) {
      return;
    }

    setProcessing(true);
    toast.loading('Processing your payment...', { id: 'payment' });

    // Simulate payment processing
    setTimeout(() => {
      toast.dismiss('payment');
      
      const property = {
        id: Math.random().toString(36).substr(2, 9),
        plotNumber: plot?.id || 'LP-001',
        estateName: estate?.name || 'Legacy Estate',
        size: plot?.size || '500sqm',
        price: plotPrice,
        titleNumber: `EN/TN/${Date.now()}`,
        blockchainTxId: `0x${Math.random().toString(36).substr(2, 16)}${Math.random().toString(36).substr(2, 16)}`,
        purchaseDate: new Date().toISOString()
      };

      setPurchaseDetails({
        ...property,
        transactionId: `TXN-${Date.now()}`,
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cryptocurrency',
        totalPaid: totalAmount,
        receiptNumber: `RCP-${Date.now()}`
      });
      
      onPurchase(property);
      setPaymentSuccess(true);
      setProcessing(false);
      
      toast.success('🎉 Congratulations! Payment successful!');
    }, 3000);
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

  if (paymentSuccess && purchaseDetails) {
    return (
      <div className="min-h-screen bg-gray-50 relative">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
        </div>

        <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-8 sm:p-12 shadow-xl max-w-2xl w-full text-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-16 h-16 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">🎉 Congratulations!</h1>
            <p className="text-lg text-gray-600 mb-8">
              You are now the proud owner of <span className="font-bold text-blue-900">{purchaseDetails.plotNumber}</span> in {purchaseDetails.estateName}!
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-sm font-bold text-gray-900 mb-4 text-center">Purchase Receipt</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Receipt Number:</span>
                  <span className="text-sm font-mono font-bold text-gray-900">{purchaseDetails.receiptNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Transaction ID:</span>
                  <span className="text-sm font-mono text-gray-900">{purchaseDetails.transactionId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Property:</span>
                  <span className="text-sm text-gray-900">{purchaseDetails.plotNumber} ({purchaseDetails.size})</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Estate:</span>
                  <span className="text-sm text-gray-900">{purchaseDetails.estateName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Title Number:</span>
                  <span className="text-sm font-mono text-gray-900">{purchaseDetails.titleNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Payment Method:</span>
                  <span className="text-sm text-gray-900">{purchaseDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Amount Paid:</span>
                  <span className="text-lg font-bold text-emerald-600">₦{purchaseDetails.totalPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Blockchain TX:</span>
                  <span className="text-xs font-mono text-blue-600 truncate max-w-[200px]">{purchaseDetails.blockchainTxId}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-900">
                <strong>What's Next?</strong> Your property documents will be processed within 5-7 business days. 
                You can track your property and download documents from your Portfolio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/portfolio')}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
              >
                View My Portfolio
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Secure Payment Gateway</p>
                </div>
              </div>
              <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <LogOut className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Plot Details
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                {/* Method Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    disabled={processing}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === 'card' ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <CreditCard className="w-6 h-6 text-blue-900 mb-2" />
                    <p className="text-sm font-bold text-gray-900">Card Payment</p>
                    <p className="text-xs text-gray-600">Visa, Mastercard, Verve</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('crypto')}
                    disabled={processing}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === 'crypto' ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Bitcoin className="w-6 h-6 text-blue-900 mb-2" />
                    <p className="text-sm font-bold text-gray-900">Cryptocurrency</p>
                    <p className="text-xs text-gray-600">Bitcoin, USDT</p>
                  </button>
                </div>

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                      <input 
                        type="text" 
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
                        maxLength={19}
                        placeholder="1234 5678 9012 3456" 
                        disabled={processing}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                        <input 
                          type="text" 
                          value={cardDetails.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            setCardDetails({ ...cardDetails, expiry: val });
                          }}
                          maxLength={5}
                          placeholder="MM/YY" 
                          disabled={processing}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                        <input 
                          type="password" 
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          maxLength={4}
                          placeholder="123" 
                          disabled={processing}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                      <input 
                        type="text" 
                        value={cardDetails.cardHolder}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                        placeholder="JOHN DOE" 
                        disabled={processing}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm uppercase disabled:opacity-50" 
                      />
                    </div>
                  </div>
                )}

                {/* Crypto Form */}
                {paymentMethod === 'crypto' && (
                  <div className="text-center py-6">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Bitcoin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">QR Code</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Send exact amount to:</p>
                    <p className="text-xs font-mono bg-gray-100 p-2 rounded select-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">≈ 0.0524 BTC</p>
                    <p className="text-xs text-gray-500 mt-1">Rate expires in 15:00 minutes</p>
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full mt-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>Pay ₦{totalAmount.toLocaleString()}</>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Secured by 256-bit SSL encryption • PCI DSS Compliant</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="text-base font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plot Number</span>
                    <span className="font-medium text-gray-900">{plot?.id || 'LP-001'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium text-gray-900">{plot?.size || '500sqm'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estate</span>
                    <span className="font-medium text-gray-900">{estate?.name || 'Legacy Estate'}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plot Price</span>
                    <span className="text-gray-900">₦{plotPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Legal Fee</span>
                    <span className="text-gray-900">₦{fees.legal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Survey Fee</span>
                    <span className="text-gray-900">₦{fees.survey.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Registration</span>
                    <span className="text-gray-900">₦{fees.registration.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Documentation</span>
                    <span className="text-gray-900">₦{fees.documentation.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-bold text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-emerald-600">₦{totalAmount.toLocaleString()}</span>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">
                      This transaction is secured with blockchain technology. Your ownership will be permanently recorded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}