import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, Building2, Smartphone, Bitcoin, 
  Copy, CheckCircle, Clock, Shield, AlertCircle, X
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get payment details from navigation state or use defaults
  const paymentDetails = location.state || {
    type: 'Property Purchase',
    amount: 8500000,
    description: 'Plot A-15, Legacy Estate',
    reference: 'TXN' + Date.now()
  };

  const bankDetails = {
    bankName: 'First Bank of Nigeria',
    accountName: 'Enugu State Land Registry',
    accountNumber: '2034567890',
    sortCode: '011151234'
  };

  const cryptoDetails = {
    bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    usdt: 'TXqHLkJ9VbMRwK8fYz2nP3xUQmVy5GdZc1',
    ethereum: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD58'
  };

  const formatCurrency = (amount: number) => {
    return '₦' + amount.toLocaleString();
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Building2, description: 'Direct bank transfer' },
    { id: 'card', name: 'Card Payment', icon: CreditCard, description: 'Debit/Credit card' },
    { id: 'ussd', name: 'USSD', icon: Smartphone, description: 'Pay with USSD code' },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, description: 'BTC, USDT, ETH' },
  ];

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Submitted!</h2>
          <p className="text-gray-600 mb-6">Your payment is being processed. You will receive a confirmation once verified.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Reference:</span>
              <span className="font-medium">{paymentDetails.reference}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">{formatCurrency(paymentDetails.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-yellow-600 font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" /> Pending Verification
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
              Go to Dashboard
            </button>
            <button onClick={() => navigate('/portfolio')} className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Payment</h1>
            <p className="text-sm text-gray-600">Complete your transaction</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Type</span>
                  <span className="font-medium">{paymentDetails.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description</span>
                  <span className="font-medium">{paymentDetails.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference</span>
                  <span className="font-mono text-sm">{paymentDetails.reference}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="font-bold text-blue-900">{formatCurrency(paymentDetails.amount)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-900 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <method.icon className={`w-6 h-6 mb-2 ${paymentMethod === method.id ? 'text-blue-900' : 'text-gray-600'}`} />
                    <p className="font-medium text-gray-900">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Transfer Details */}
            {paymentMethod === 'bank' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Bank Transfer Details</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Transfer the exact amount to the account below. Use the reference number as your transfer narration.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Bank Name</p>
                      <p className="font-medium">{bankDetails.bankName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Name</p>
                      <p className="font-medium">{bankDetails.accountName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Account Number</p>
                      <p className="font-bold text-xl text-blue-900">{bankDetails.accountNumber}</p>
                    </div>
                    <button onClick={() => handleCopy(bankDetails.accountNumber, 'Account number')} className="p-2 hover:bg-gray-200 rounded-lg">
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Amount to Pay</p>
                      <p className="font-bold text-xl text-emerald-600">{formatCurrency(paymentDetails.amount)}</p>
                    </div>
                    <button onClick={() => handleCopy(paymentDetails.amount.toString(), 'Amount')} className="p-2 hover:bg-gray-200 rounded-lg">
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card Payment */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Card Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" placeholder="123" maxLength={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}

            {/* USSD Payment */}
            {paymentMethod === 'ussd' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">USSD Payment</h2>
                <p className="text-gray-600 mb-4">Dial the code below on your phone to complete payment:</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">GTBank</p>
                      <p className="font-mono text-lg font-bold">*737*50*{paymentDetails.amount}*2034567890#</p>
                    </div>
                    <button onClick={() => handleCopy(`*737*50*${paymentDetails.amount}*2034567890#`, 'USSD code')} className="p-2 hover:bg-gray-200 rounded-lg">
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">First Bank</p>
                      <p className="font-mono text-lg font-bold">*894*{paymentDetails.amount}#</p>
                    </div>
                    <button onClick={() => handleCopy(`*894*${paymentDetails.amount}#`, 'USSD code')} className="p-2 hover:bg-gray-200 rounded-lg">
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">UBA</p>
                      <p className="font-mono text-lg font-bold">*919*4*2034567890*{paymentDetails.amount}#</p>
                    </div>
                    <button onClick={() => handleCopy(`*919*4*2034567890*${paymentDetails.amount}#`, 'USSD code')} className="p-2 hover:bg-gray-200 rounded-lg">
                      <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Crypto Payment */}
            {paymentMethod === 'crypto' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Cryptocurrency Payment</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      Send the equivalent amount in crypto. Transaction will be confirmed after 3 network confirmations.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bitcoin className="w-5 h-5 text-orange-500" />
                      <span className="font-medium">Bitcoin (BTC)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs break-all">{cryptoDetails.bitcoin}</p>
                      <button onClick={() => handleCopy(cryptoDetails.bitcoin, 'BTC address')} className="p-2 hover:bg-orange-100 rounded-lg">
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">₮</span>
                      <span className="font-medium">USDT (TRC20)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs break-all">{cryptoDetails.usdt}</p>
                      <button onClick={() => handleCopy(cryptoDetails.usdt, 'USDT address')} className="p-2 hover:bg-green-100 rounded-lg">
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">Ξ</span>
                      <span className="font-medium">Ethereum (ETH)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs break-all">{cryptoDetails.ethereum}</p>
                      <button onClick={() => handleCopy(cryptoDetails.ethereum, 'ETH address')} className="p-2 hover:bg-purple-100 rounded-lg">
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Security Badge */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-500">256-bit encryption</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePaymentSubmit}
              disabled={!paymentMethod || processing}
              className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Confirm Payment
                </>
              )}
            </button>

            {/* Help */}
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Need help with payment?</p>
              <button onClick={() => navigate('/help')} className="text-blue-600 font-medium text-sm hover:text-blue-800">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}