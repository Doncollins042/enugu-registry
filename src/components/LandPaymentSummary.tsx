import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Shield, CheckCircle, FileText, Scale,
  Home, AlertCircle, ChevronDown, ChevronUp, Stamp, Building2,
  Lock, Receipt, FileCheck, Calculator
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

export default function LandPaymentSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { plotDetails: PlotDetails } | null;
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!state?.plotDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Home className="w-12 h-12 text-gray-300 mb-3" />
        <h2 className="text-lg font-bold text-gray-900 mb-1">No Property Selected</h2>
        <p className="text-gray-600 text-sm mb-4">Please select a property first.</p>
        <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-blue-900 text-white rounded-lg font-semibold text-sm">Dashboard</button>
      </div>
    );
  }

  const plot = state.plotDetails;
  const propertyPrice = plot.price;
  const legalFee = Math.round(propertyPrice * 0.05);
  const surveyFee = 75000;
  const deedFee = 50000;
  const devLevy = Math.round(propertyPrice * 0.01);
  const agencyFee = Math.round(propertyPrice * 0.025);
  const stampDuty = Math.round(propertyPrice * 0.015);
  const regFee = 25000;
  const totalFees = legalFee + surveyFee + deedFee + devLevy + agencyFee + stampDuty + regFee;
  const grandTotal = propertyPrice + totalFees;

  const formatCurrency = (n: number) => '₦' + n.toLocaleString();

  const handleProceed = () => {
    if (!agreedToTerms) { toast.error('Please agree to the terms'); return; }
    navigate('/payment', {
      state: {
        type: 'Property Purchase',
        amount: grandTotal,
        description: `${plot.plot_number} - ${plot.estate}`,
        reference: 'LP' + Date.now(),
        plotDetails: { ...plot },
        feeBreakdown: { propertyPrice, legalFee, surveyFee, deedOfAssignmentFee: deedFee, developmentLevy: devLevy, agencyFee, stampDuty, registrationFee: regFee, totalFees, grandTotal }
      }
    });
  };

  const fees = [
    { label: 'Legal (5%)', amount: legalFee, icon: Scale },
    { label: 'Survey', amount: surveyFee, icon: MapPin },
    { label: 'Deed', amount: deedFee, icon: FileText },
    { label: 'Dev Levy (1%)', amount: devLevy, icon: Building2 },
    { label: 'Agency (2.5%)', amount: agencyFee, icon: Receipt },
    { label: 'Stamp Duty', amount: stampDuty, icon: Stamp },
    { label: 'Registration', amount: regFee, icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b">
        <div className="px-3 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex-1"><h1 className="font-bold text-gray-900 text-sm">Payment Summary</h1><p className="text-[10px] text-gray-500">Review before payment</p></div>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><Shield className="w-3 h-3" /><span className="text-[10px] font-medium">Secure</span></div>
        </div>
      </header>

      <main className="px-3 py-4">
        {/* Property Card */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-4 mb-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"><Home className="w-5 h-5 text-amber-400" /></div>
              <div><p className="text-blue-200 text-[10px]">Property</p><p className="font-bold text-base">{plot.plot_number}</p></div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-blue-200">Estate</span><span className="font-medium">{plot.estate}</span></div>
              <div className="flex justify-between"><span className="text-blue-200">Location</span><span className="font-medium">{plot.location}</span></div>
              <div className="flex justify-between"><span className="text-blue-200">Type</span><span className="font-medium">{plot.type}</span></div>
              <div className="flex justify-between"><span className="text-blue-200">Size</span><span className="font-medium">{plot.size} sqm</span></div>
              <div className="border-t border-white/20 pt-2 mt-2">
                <div className="flex justify-between items-center"><span className="text-blue-200">Price</span><span className="font-bold text-lg text-amber-400">{formatCurrency(propertyPrice)}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Fees */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-4">
          <button onClick={() => setShowBreakdown(!showBreakdown)} className="w-full p-3 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center"><Calculator className="w-5 h-5 text-amber-600" /></div>
              <div className="text-left"><h3 className="font-bold text-gray-900 text-sm">Legal & Admin Fees</h3><p className="text-[10px] text-gray-500">7 items • {formatCurrency(totalFees)}</p></div>
            </div>
            {showBreakdown ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {showBreakdown && (
            <div className="border-t p-3 space-y-2">
              {fees.map((f, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center"><f.icon className="w-3.5 h-3.5 text-gray-500" /></div>
                    <span className="text-xs text-gray-700">{f.label}</span>
                  </div>
                  <span className="font-semibold text-xs">{formatCurrency(f.amount)}</span>
                </div>
              ))}
              <div className="bg-amber-50 rounded-lg p-3 mt-2">
                <div className="flex justify-between items-center"><span className="font-semibold text-amber-800 text-xs">Total Fees</span><span className="font-bold text-amber-800">{formatCurrency(totalFees)}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4">
          <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-1.5"><Receipt className="w-4 h-4 text-blue-600" /> Summary</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-600">Property Price</span><span className="font-semibold">{formatCurrency(propertyPrice)}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Legal & Admin</span><span className="font-semibold">{formatCurrency(totalFees)}</span></div>
            <div className="border-t-2 border-dashed pt-3 mt-3">
              <div className="flex justify-between items-center"><span className="font-bold text-gray-900">Grand Total</span><span className="font-bold text-blue-900 text-xl">{formatCurrency(grandTotal)}</span></div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-emerald-50 rounded-xl p-3 mb-4 border border-emerald-200">
          <h3 className="font-bold text-emerald-900 text-xs mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-600" /> What You Get</h3>
          <div className="grid grid-cols-2 gap-2">
            {['C of O', 'Deed', 'Survey Plan', 'Title', 'Receipt', 'Clearance'].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white rounded p-2"><CheckCircle className="w-3 h-3 text-emerald-500" /><span className="text-[10px] text-gray-700">{item}</span></div>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-[10px]">Important</p>
              <p className="text-[10px] text-amber-700 mt-0.5">Non-refundable once allocated. Title in 90 days.</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-xl shadow-sm border p-3 mb-4">
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600" />
            <p className="text-[10px] text-gray-700">I agree to the <span className="text-blue-600 font-medium">Terms</span> and <span className="text-blue-600 font-medium">Purchase Agreement</span>.</p>
          </label>
        </div>
      </main>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div><p className="text-[10px] text-gray-500">Total</p><p className="font-bold text-blue-900 text-lg">{formatCurrency(grandTotal)}</p></div>
          <div className="text-right"><p className="text-emerald-600 text-[10px] font-medium flex items-center gap-0.5 justify-end"><Shield className="w-3 h-3" /> Secure</p></div>
        </div>
        <button onClick={handleProceed} disabled={!agreedToTerms} className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 ${agreedToTerms ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white' : 'bg-gray-300 text-gray-500'}`}>
          <Lock className="w-4 h-4" /> Proceed to Payment
        </button>
      </div>
    </div>
  );
}