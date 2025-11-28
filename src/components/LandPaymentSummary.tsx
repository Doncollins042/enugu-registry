import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, FileText, Scale,
  Home, AlertCircle, ChevronDown, ChevronUp, Stamp, Building2,
  CreditCard, Clock, Users, Phone, Mail, Printer, Download,
  Info, Lock, Banknote, Receipt, FileCheck, Calculator
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PlotDetails {
  plot_number: string;
  size: number;
  type: string;
  estate: string;
  location: string;
  price: number;
}

interface LocationState {
  plotDetails: PlotDetails;
}

export default function LandPaymentSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [showBreakdown, setShowBreakdown] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Redirect if no plot details
  if (!state?.plotDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Home className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Property Selected</h2>
        <p className="text-gray-600 mb-4">Please select a property to purchase.</p>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold">
          Go to Dashboard
        </button>
      </div>
    );
  }

  const plot = state.plotDetails;

  // Calculate fees
  const propertyPrice = plot.price;
  const legalFee = Math.round(propertyPrice * 0.05); // 5% legal fee
  const surveyFee = 75000; // Fixed survey fee
  const deedOfAssignmentFee = 50000; // Fixed deed fee
  const developmentLevy = Math.round(propertyPrice * 0.01); // 1% development levy
  const agencyFee = Math.round(propertyPrice * 0.025); // 2.5% agency fee
  const stampDuty = Math.round(propertyPrice * 0.015); // 1.5% stamp duty
  const registrationFee = 25000; // Fixed registration fee

  const totalFees = legalFee + surveyFee + deedOfAssignmentFee + developmentLevy + agencyFee + stampDuty + registrationFee;
  const grandTotal = propertyPrice + totalFees;

  const formatCurrency = (amount: number) => {
    return '₦' + amount.toLocaleString();
  };

  const handleProceedToPayment = () => {
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setProcessing(true);

    // Navigate to payment page with all details
    navigate('/payment', {
      state: {
        type: 'Property Purchase',
        amount: grandTotal,
        description: `${plot.plot_number} - ${plot.estate}, ${plot.location}`,
        reference: 'LP' + Date.now(),
        plotDetails: {
          ...plot,
          price: propertyPrice,
        },
        feeBreakdown: {
          propertyPrice,
          legalFee,
          surveyFee,
          deedOfAssignmentFee,
          developmentLevy,
          agencyFee,
          stampDuty,
          registrationFee,
          totalFees,
          grandTotal,
        }
      }
    });
  };

  const fees = [
    { label: 'Legal Fee (5%)', amount: legalFee, icon: Scale, desc: 'Legal documentation & verification' },
    { label: 'Survey Fee', amount: surveyFee, icon: MapPin, desc: 'Land survey & demarcation' },
    { label: 'Deed of Assignment', amount: deedOfAssignmentFee, icon: FileText, desc: 'Transfer of ownership document' },
    { label: 'Development Levy (1%)', amount: developmentLevy, icon: Building2, desc: 'Estate infrastructure' },
    { label: 'Agency Fee (2.5%)', amount: agencyFee, icon: Users, desc: 'Transaction facilitation' },
    { label: 'Stamp Duty (1.5%)', amount: stampDuty, icon: Stamp, desc: 'Government stamp duty' },
    { label: 'Registration Fee', amount: registrationFee, icon: FileCheck, desc: 'Land registry registration' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Payment Summary</h1>
            <p className="text-sm text-gray-500">Review before payment</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Secure</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Property Card */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-6 mb-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="text-blue-200 text-sm">Property Purchase</p>
                <p className="font-bold text-xl">{plot.plot_number}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">Estate</span>
                <span className="font-semibold">{plot.estate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Location</span>
                <span className="font-semibold flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {plot.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Plot Type</span>
                <span className="font-semibold">{plot.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Plot Size</span>
                <span className="font-semibold">{plot.size} sqm</span>
              </div>
              <div className="border-t border-white/20 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Property Price</span>
                  <span className="font-bold text-2xl text-amber-400">{formatCurrency(propertyPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Administrative Fees */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900">Legal & Administrative Fees</h3>
                <p className="text-sm text-gray-500">7 items • {formatCurrency(totalFees)}</p>
              </div>
            </div>
            {showBreakdown ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {showBreakdown && (
            <div className="border-t border-gray-100 p-5 space-y-4">
              {fees.map((fee, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <fee.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{fee.label}</p>
                      <p className="text-xs text-gray-500">{fee.desc}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">{formatCurrency(fee.amount)}</span>
                </div>
              ))}

              <div className="bg-amber-50 rounded-xl p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-800">Total Fees</span>
                  <span className="font-bold text-amber-800 text-lg">{formatCurrency(totalFees)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" />
            Payment Summary
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Property Price</span>
              <span className="font-semibold">{formatCurrency(propertyPrice)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Legal & Admin Fees</span>
              <span className="font-semibold">{formatCurrency(totalFees)}</span>
            </div>
            <div className="border-t-2 border-dashed border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-gray-900 text-lg">Grand Total</span>
                  <p className="text-xs text-gray-500">All fees inclusive</p>
                </div>
                <span className="font-bold text-blue-900 text-2xl">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 mb-6 border border-emerald-200">
          <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            What You Get
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FileText, label: 'Certificate of Occupancy' },
              { icon: FileCheck, label: 'Deed of Assignment' },
              { icon: MapPin, label: 'Survey Plan' },
              { icon: Stamp, label: 'Registered Title' },
              { icon: Receipt, label: 'Payment Receipt' },
              { icon: Shield, label: 'Legal Clearance' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3">
                <item.icon className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-gray-900">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Important Notice</p>
              <ul className="text-sm text-amber-700 mt-2 space-y-1 list-disc list-inside">
                <li>All payments are non-refundable once property is allocated</li>
                <li>Title documents will be processed within 90 working days</li>
                <li>You'll receive an allocation letter within 48 hours</li>
                <li>Physical inspection can be scheduled after payment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="text-sm">
              <p className="text-gray-900">
                I have read and agree to the{' '}
                <button className="text-blue-600 font-medium hover:underline">Terms & Conditions</button>,{' '}
                <button className="text-blue-600 font-medium hover:underline">Privacy Policy</button>, and{' '}
                <button className="text-blue-600 font-medium hover:underline">Land Purchase Agreement</button>.
              </p>
              <p className="text-gray-500 mt-1">
                I confirm that the information provided is accurate and I understand the payment terms.
              </p>
            </div>
          </label>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 text-sm">Need Help?</p>
              <p className="text-sm text-blue-700 mt-1">Contact our support team for any questions about your purchase.</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <a href="tel:+2348012345678" className="flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900">
                  <Phone className="w-4 h-4" /> +234 801 234 5678
                </a>
                <a href="mailto:support@enugu-lands.gov.ng" className="flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900">
                  <Mail className="w-4 h-4" /> support@enugu-lands.gov.ng
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-bold text-blue-900 text-2xl">{formatCurrency(grandTotal)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Property + Fees</p>
              <p className="text-sm text-emerald-600 font-medium flex items-center gap-1 justify-end">
                <Shield className="w-3.5 h-3.5" /> Secure Payment
              </p>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={!agreedToTerms || processing}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              agreedToTerms
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:from-blue-800 hover:to-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Lock className="w-5 h-5" />
            Proceed to Payment
          </button>

          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL Encryption • Verified by Enugu State Government</span>
          </div>
        </div>
      </div>
    </div>
  );
}