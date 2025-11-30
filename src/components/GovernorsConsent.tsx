import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Upload,
  CreditCard,
  Building,
  User as UserIcon,
  MapPin,
  Calendar,
  FileText,
  Shield,
  Sparkles,
  Phone,
  Mail,
  Home,
  Search,
  Building2,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Application {
  id: string;
  propertyAddress: string;
  applicationDate: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  trackingNumber: string;
  estimatedCompletion: string;
}

const GovernorsConsent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [formStep, setFormStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Demo applications
  const [applications] = useState<Application[]>([
    {
      id: '1',
      propertyAddress: 'Plot 15, Legacy Estate, Independence Layout',
      applicationDate: '2024-01-15',
      status: 'processing',
      trackingNumber: 'GC-2024-001234',
      estimatedCompletion: '2024-02-28',
    },
    {
      id: '2',
      propertyAddress: 'Block A, Plot 7, Royal Gardens',
      applicationDate: '2023-12-01',
      status: 'approved',
      trackingNumber: 'GC-2023-009876',
      estimatedCompletion: '2024-01-15',
    },
  ]);

  const [formData, setFormData] = useState({
    propertyId: '',
    propertyAddress: '',
    transactionType: '',
    sellerName: '',
    sellerPhone: '',
    buyerName: '',
    buyerPhone: '',
    transactionValue: '',
    additionalNotes: '',
  });

  const transactionTypes = [
    { id: 'sale', name: 'Sale/Purchase', icon: CreditCard },
    { id: 'gift', name: 'Gift/Donation', icon: Heart },
    { id: 'mortgage', name: 'Mortgage', icon: Building },
    { id: 'sublease', name: 'Sublease', icon: FileText },
  ];

  const requiredDocuments = [
    'Survey Plan (Certified True Copy)',
    'Deed of Assignment / Conveyance',
    'Tax Clearance Certificate',
    'Evidence of Payment of Ground Rent',
    'Passport Photographs (4 copies each party)',
    'Means of Identification',
  ];

  const fees = [
    { name: 'Application Fee', amount: 50000 },
    { name: 'Processing Fee', amount: 75000 },
    { name: 'Consent Fee (3% of Transaction)', amount: 450000 },
    { name: 'Administrative Charges', amount: 25000 },
  ];

  const totalFee = fees.reduce((sum, fee) => sum + fee.amount, 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'processing':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle2;
      case 'processing':
        return Clock;
      case 'rejected':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleSubmit = () => {
    toast.success('Application submitted successfully!');
    setShowConfirmation(false);
    setActiveTab('track');
    setFormStep(1);
    setFormData({
      propertyId: '',
      propertyAddress: '',
      transactionType: '',
      sellerName: '',
      sellerPhone: '',
      buyerName: '',
      buyerPhone: '',
      transactionValue: '',
      additionalNotes: '',
    });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white text-xl font-bold">Governor's Consent</h1>
              <p className="text-white/70 text-xs">Apply for land transaction approval</p>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
            <button
              onClick={() => setActiveTab('apply')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'apply'
                  ? 'bg-white text-[#0f3d5c] shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              New Application
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'track'
                  ? 'bg-white text-[#0f3d5c] shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Track Status
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Pulled up */}
      <div className="px-4 -mt-8 relative z-10 space-y-6">
        {activeTab === 'apply' ? (
          <>
            {/* Progress Steps */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        formStep >= step
                          ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white shadow-lg'
                          : 'bg-[#faf8f5] text-[#8b6947] border border-[#c9a961]/30'
                      }`}
                    >
                      {formStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                          formStep > step
                            ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]'
                            : 'bg-[#c9a961]/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#8b6947]">
                <span>Property</span>
                <span>Parties</span>
                <span>Review</span>
              </div>
            </div>

            {/* Form Steps */}
            {formStep === 1 && (
              <>
                {/* Transaction Type */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c9a961]" />
                    Transaction Type
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {transactionTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, transactionType: type.id })}
                          className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                            formData.transactionType === type.id
                              ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white border-transparent shadow-lg'
                              : 'bg-[#faf8f5] text-[#8b6947] border-[#c9a961]/20 hover:border-[#c9a961]'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-medium">{type.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
                  <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c9a961]" />
                    Property Details
                  </h3>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Property ID</label>
                    <input
                      type="text"
                      name="propertyId"
                      value={formData.propertyId}
                      onChange={handleInputChange}
                      placeholder="e.g., PLT-001-LEGACY"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Property Address</label>
                    <input
                      type="text"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="Full property address"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Transaction Value (₦)</label>
                    <input
                      type="text"
                      name="transactionValue"
                      value={formData.transactionValue}
                      onChange={handleInputChange}
                      placeholder="e.g., 15,000,000"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                </div>
              </>
            )}

            {formStep === 2 && (
              <>
                {/* Seller Details */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
                  <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-[#c9a961]" />
                    Seller/Transferor Details
                  </h3>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="sellerName"
                      value={formData.sellerName}
                      onChange={handleInputChange}
                      placeholder="Legal full name"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="sellerPhone"
                      value={formData.sellerPhone}
                      onChange={handleInputChange}
                      placeholder="+234 XXX XXX XXXX"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                </div>

                {/* Buyer Details */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
                  <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-[#0d6e5d]" />
                    Buyer/Transferee Details
                  </h3>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleInputChange}
                      placeholder="Legal full name"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="buyerPhone"
                      value={formData.buyerPhone}
                      onChange={handleInputChange}
                      placeholder="+234 XXX XXX XXXX"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">Additional Notes (Optional)</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Any additional information..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20 resize-none"
                  />
                </div>
              </>
            )}

            {formStep === 3 && (
              <>
                {/* Required Documents */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#c9a961]" />
                    Required Documents
                  </h3>
                  <div className="space-y-2">
                    {requiredDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl border border-[#c9a961]/10"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-[#0d6e5d]">{index + 1}</span>
                        </div>
                        <span className="text-sm text-[#8b6947]">{doc}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/services/document-upload')}
                    className="mt-4 w-full py-3 border-2 border-dashed border-[#c9a961]/40 rounded-xl text-[#8b6947] font-medium flex items-center justify-center gap-2 hover:border-[#c9a961] transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Documents
                  </button>
                </div>

                {/* Fee Breakdown */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#c9a961]" />
                    Fee Breakdown
                  </h3>
                  <div className="space-y-3">
                    {fees.map((fee, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-[#c9a961]/10 last:border-0">
                        <span className="text-sm text-[#8b6947]">{fee.name}</span>
                        <span className="text-sm font-medium text-[#0a2540]">{formatPrice(fee.amount)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t-2 border-[#c9a961]/20">
                      <span className="font-bold text-[#0a2540]">Total</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] bg-clip-text text-transparent">
                        {formatPrice(totalFee)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Processing Time */}
                <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-2xl p-4 border border-[#c9a961]/20 flex gap-3">
                  <Clock className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#0a2540]">Processing Time</p>
                    <p className="text-xs text-[#8b6947]">
                      Governor's Consent applications typically take 4-8 weeks for processing and approval.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {formStep > 1 && (
                <button
                  onClick={() => setFormStep(formStep - 1)}
                  className="flex-1 py-4 bg-[#faf8f5] border border-[#c9a961]/20 rounded-2xl text-[#8b6947] font-semibold"
                >
                  Previous
                </button>
              )}
              <button
                onClick={handleNextStep}
                className="flex-1 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2"
              >
                {formStep === 3 ? 'Submit Application' : 'Continue'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Track Tab Content */}
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => {
                  const StatusIcon = getStatusIcon(app.status);
                  return (
                    <div
                      key={app.id}
                      className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-[#0d6e5d]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#8b6947]">Tracking Number</p>
                            <p className="text-sm font-bold text-[#0a2540]">{app.trackingNumber}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <div className="bg-[#faf8f5] rounded-xl p-3 mb-3">
                        <p className="text-xs text-[#8b6947] mb-1">Property</p>
                        <p className="text-sm text-[#0a2540]">{app.propertyAddress}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#8b6947]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Applied: {new Date(app.applicationDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Est: {new Date(app.estimatedCompletion).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 border border-[#c9a961]/20 shadow-xl text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10 rounded-2xl flex items-center justify-center">
                  <FileCheck className="w-8 h-8 text-[#c9a961]" />
                </div>
                <h3 className="font-serif text-[#0a2540] font-bold mb-2">No Applications Yet</h3>
                <p className="text-sm text-[#8b6947] mb-4">
                  You haven't submitted any Governor's Consent applications.
                </p>
                <button
                  onClick={() => setActiveTab('apply')}
                  className="px-6 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white font-medium"
                >
                  Start Application
                </button>
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <h3 className="font-serif text-[#0a2540] font-bold mb-3">Need Help?</h3>
              <div className="space-y-2">
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#0d6e5d]" />
                  <span className="text-sm text-[#8b6947]">+234 801 234 5678</span>
                </a>
                <a
                  href="mailto:consent@enugu.gov.ng"
                  className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#0d6e5d]" />
                  <span className="text-sm text-[#8b6947]">consent@enugu.gov.ng</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-[#c9a961]" />
              </div>
              <h2 className="font-serif text-white text-xl font-bold">Confirm Submission</h2>
              <p className="text-white/70 text-sm mt-1">Please review before submitting</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#c9a961]/20">
                <p className="text-xs text-[#8b6947] mb-1">Total Fee</p>
                <p className="text-2xl font-bold text-[#0a2540]">{formatPrice(totalFee)}</p>
              </div>
              <p className="text-sm text-[#8b6947] text-center">
                By submitting, you confirm all information is accurate and agree to the terms of service.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947] font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-medium shadow-lg"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-1"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]'
                    : ''
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive(item.path) ? 'text-white' : 'text-[#8b6947]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default GovernorsConsent;