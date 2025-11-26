import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Calendar, CreditCard, Download, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface GroundRentProps {
  user: any;
  onLogout: () => void;
  properties: any[];
  addNotification: (notification: { type: 'payment' | 'document' | 'system'; title: string; message: string }) => void;
}

export default function GroundRent({ user, onLogout, properties, addNotification }: GroundRentProps) {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [receipt, setReceipt] = useState<any>(null);

  // Sample properties for ground rent (combine with user properties)
  const rentProperties = [
    { id: '1', plotNumber: 'LP-001', estate: 'Legacy Estate', annualRent: 50000, lastPaid: '2024-01-15', status: 'due', dueDate: '2025-12-31' },
    { id: '2', plotNumber: 'LP-045', estate: 'Liberty Estate', annualRent: 65000, lastPaid: '2024-11-20', status: 'paid', dueDate: '2025-11-20' },
    { id: '3', plotNumber: 'LP-078', estate: 'Fidelity Estate', annualRent: 55000, lastPaid: '2023-12-10', status: 'overdue', dueDate: '2024-12-10' },
    ...properties.map((p, i) => ({
      id: `user-${i}`,
      plotNumber: p.plotNumber,
      estate: p.estateName,
      annualRent: 50000 + Math.floor(Math.random() * 20000),
      lastPaid: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: Math.random() > 0.5 ? 'due' : 'paid',
      dueDate: '2025-12-31'
    }))
  ];

  const handlePayment = () => {
    if (!selectedProperty) {
      toast.error('Please select a property to pay ground rent');
      return;
    }

    const prop = rentProperties.find(p => p.id === selectedProperty);
    if (!prop) return;

    if (prop.status === 'paid') {
      toast.error('Ground rent for this property is already paid');
      return;
    }

    setProcessing(true);
    toast.loading('Processing your payment...', { id: 'payment' });

    setTimeout(() => {
      toast.dismiss('payment');
      setProcessing(false);
      setPaymentComplete(true);

      const receiptData = {
        receiptNumber: `GR-${Date.now()}`,
        property: prop.plotNumber,
        estate: prop.estate,
        amount: prop.annualRent + 500,
        paymentDate: new Date().toLocaleDateString(),
        paymentTime: new Date().toLocaleTimeString(),
        validUntil: '31st December 2025',
        transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };
      setReceipt(receiptData);

      toast.success('Ground rent payment successful!');

      addNotification({
        type: 'payment',
        title: 'Ground Rent Paid Successfully',
        message: `Payment of ₦${(prop.annualRent + 500).toLocaleString()} for ${prop.plotNumber} (${prop.estate}) has been processed. Receipt: ${receiptData.receiptNumber}`
      });
    }, 3000);
  };

  const handleDownloadReceipt = () => {
    toast.success('Downloading receipt as PDF...');
    // In production, this would generate and download a PDF
  };

  const handleNewPayment = () => {
    setSelectedProperty('');
    setPaymentComplete(false);
    setReceipt(null);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-emerald-50 text-emerald-700 border-emerald-300',
      due: 'bg-yellow-50 text-yellow-700 border-yellow-300',
      overdue: 'bg-red-50 text-red-700 border-red-300',
    };
    return styles[status as keyof typeof styles] || styles.due;
  };

  const getStatusText = (status: string) => {
    const texts = {
      paid: 'PAID',
      due: 'DUE',
      overdue: 'OVERDUE',
    };
    return texts[status as keyof typeof texts] || 'DUE';
  };

  const selectedProp = rentProperties.find(p => p.id === selectedProperty);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
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
                  <p className="text-xs text-gray-600">Ground Rent Payment</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ground Rent Payment</h1>
            <p className="text-sm text-gray-600">Pay your annual property ground rent to Enugu State Government</p>
          </div>

          {!paymentComplete ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Properties List */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Your Properties</h2>
                  
                  {rentProperties.length === 0 ? (
                    <div className="text-center py-12">
                      <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-4">You don't have any properties yet</p>
                      <button
                        onClick={() => navigate('/search')}
                        className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all text-sm"
                      >
                        Browse Properties
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rentProperties.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => setSelectedProperty(property.id)}
                          disabled={processing}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedProperty === property.id
                              ? 'border-blue-900 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="text-base font-bold text-gray-900 mb-1">{property.plotNumber}</h3>
                              <p className="text-xs text-gray-600">{property.estate}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusBadge(property.status)}`}>
                              {getStatusText(property.status)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Annual Rent</p>
                              <p className="text-base font-bold text-gray-900">₦{property.annualRent.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Last Payment</p>
                              <p className="text-sm text-gray-900">{new Date(property.lastPaid).toLocaleDateString()}</p>
                            </div>
                          </div>

                          {property.status === 'overdue' && (
                            <div className="mt-3 flex items-center gap-2 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">Payment overdue - please pay immediately</span>
                            </div>
                          )}

                          {selectedProperty === property.id && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <span className="text-xs font-medium text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
                                ✓ Selected for Payment
                              </span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Payment Summary</h3>

                  {selectedProperty && selectedProp ? (
                    <>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Property</span>
                          <span className="text-sm font-bold text-gray-900">{selectedProp.plotNumber}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Estate</span>
                          <span className="text-sm text-gray-900">{selectedProp.estate}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Ground Rent</span>
                          <span className="text-sm font-bold text-gray-900">₦{selectedProp.annualRent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-sm text-gray-600">Processing Fee</span>
                          <span className="text-sm text-gray-900">₦500</span>
                        </div>
                        <div className="flex justify-between py-3 border-t-2 border-gray-300">
                          <span className="text-sm font-bold text-gray-900">Total Amount</span>
                          <span className="text-xl font-bold text-emerald-600">
                            ₦{(selectedProp.annualRent + 500).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {selectedProp.status === 'paid' ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 text-emerald-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Already paid for this year</span>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handlePayment}
                          disabled={processing}
                          className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                          {processing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              Pay Now
                            </>
                          )}
                        </button>
                      )}

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-blue-900 font-medium mb-1">Payment Due Date</p>
                            <p className="text-xs text-gray-700">{selectedProp.dueDate}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">Select a property from the list to proceed with payment</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-8 sm:p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
                <p className="text-sm text-gray-600 mb-8">
                  Your ground rent payment has been processed successfully. A receipt has been generated for your records.
                </p>

                {receipt && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 text-center">Payment Receipt</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Receipt Number</span>
                        <span className="text-sm font-mono font-bold text-gray-900">{receipt.receiptNumber}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Transaction ID</span>
                        <span className="text-sm font-mono text-gray-900">{receipt.transactionId}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Property</span>
                        <span className="text-sm text-gray-900">{receipt.property} ({receipt.estate})</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Amount Paid</span>
                        <span className="text-sm font-bold text-emerald-600">₦{receipt.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Payment Date</span>
                        <span className="text-sm text-gray-900">{receipt.paymentDate} at {receipt.paymentTime}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-600">Valid Until</span>
                        <span className="text-sm font-medium text-gray-900">{receipt.validUntil}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleDownloadReceipt}
                    className="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                  <button
                    onClick={handleNewPayment}
                    className="px-6 py-3 bg-blue-50 border border-blue-300 text-blue-900 rounded-lg hover:bg-blue-100 transition-all text-sm font-medium"
                  >
                    Pay Another Property
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
                  >
                    Back to Dashboard
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