import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Map,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Upload,
  CreditCard,
  MapPin,
  Calendar,
  Download,
  Eye,
  Sparkles,
  Compass,
  Ruler,
  Phone,
  Mail,
  Home,
  Search,
  Building2,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SurveyRequest {
  id: string;
  propertyAddress: string;
  requestDate: string;
  status: 'pending' | 'surveying' | 'completed' | 'rejected';
  trackingNumber: string;
  surveyorName?: string;
  completionDate?: string;
}

const SurveyPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'request' | 'status'>('request');
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    propertyAddress: '',
    plotSize: '',
    landUse: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    additionalInfo: '',
  });

  // Demo survey requests
  const [surveyRequests] = useState<SurveyRequest[]>([
    {
      id: '1',
      propertyAddress: 'Plot 15, Legacy Estate, Independence Layout',
      requestDate: '2024-01-10',
      status: 'completed',
      trackingNumber: 'SP-2024-001234',
      surveyorName: 'Surv. Emmanuel Okoro',
      completionDate: '2024-01-25',
    },
    {
      id: '2',
      propertyAddress: 'Block C, Plot 22, Royal Gardens',
      requestDate: '2024-01-20',
      status: 'surveying',
      trackingNumber: 'SP-2024-001567',
      surveyorName: 'Surv. Chioma Nwosu',
    },
    {
      id: '3',
      propertyAddress: 'Plot 8, Diamond Heights',
      requestDate: '2024-01-28',
      status: 'pending',
      trackingNumber: 'SP-2024-001890',
    },
  ]);

  const landUseOptions = [
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'agricultural', name: 'Agricultural' },
    { id: 'mixed', name: 'Mixed Use' },
  ];

  const fees = [
    { name: 'Survey Fee', amount: 150000 },
    { name: 'Processing Fee', amount: 25000 },
    { name: 'Pillar Installation', amount: 50000 },
    { name: 'Documentation Fee', amount: 15000 },
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
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'surveying':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'surveying':
        return Compass;
      case 'pending':
        return Clock;
      case 'rejected':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (formStep < 2) {
      setFormStep(formStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Survey request submitted successfully!');
      setActiveTab('status');
      setFormStep(1);
      setFormData({
        propertyAddress: '',
        plotSize: '',
        landUse: '',
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        additionalInfo: '',
      });
    }, 2000);
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
              <h1 className="font-serif text-white text-xl font-bold">Survey Plan</h1>
              <p className="text-white/70 text-xs">Request official land survey</p>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
            <button
              onClick={() => setActiveTab('request')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'request'
                  ? 'bg-white text-[#0f3d5c] shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Map className="w-4 h-4" />
              New Request
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'status'
                  ? 'bg-white text-[#0f3d5c] shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              My Requests
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Pulled up */}
      <div className="px-4 -mt-8 relative z-10 space-y-6">
        {activeTab === 'request' ? (
          <>
            {/* Progress Steps */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <div className="flex items-center justify-center gap-4">
                {[1, 2].map((step) => (
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
                    {step < 2 && (
                      <div
                        className={`w-20 h-1 mx-2 rounded-full transition-all ${
                          formStep > step
                            ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]'
                            : 'bg-[#c9a961]/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-around mt-2 text-xs text-[#8b6947]">
                <span>Property Details</span>
                <span>Review & Pay</span>
              </div>
            </div>

            {formStep === 1 && (
              <>
                {/* Property Information */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
                  <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c9a961]" />
                    Property Information
                  </h3>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                      Property Address
                    </label>
                    <input
                      type="text"
                      name="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={handleInputChange}
                      placeholder="Full property address"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                        Plot Size
                      </label>
                      <input
                        type="text"
                        name="plotSize"
                        value={formData.plotSize}
                        onChange={handleInputChange}
                        placeholder="e.g., 500 sqm"
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                        Land Use
                      </label>
                      <select
                        name="landUse"
                        value={formData.landUse}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                      >
                        <option value="">Select</option>
                        {landUseOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Owner Information */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl space-y-4">
                  <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                    <User className="w-4 h-4 text-[#c9a961]" />
                    Owner Information
                  </h3>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Legal full name"
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleInputChange}
                        placeholder="+234..."
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#8b6947] mb-1.5 font-medium">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Any additional details..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20 resize-none"
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#c9a961]" />
                    Supporting Documents
                  </h3>
                  <button
                    onClick={() => navigate('/services/document-upload')}
                    className="w-full py-4 border-2 border-dashed border-[#c9a961]/40 rounded-xl text-[#8b6947] font-medium flex items-center justify-center gap-2 hover:border-[#c9a961] transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Documents
                  </button>
                  <p className="text-xs text-[#8b6947] mt-2 text-center">
                    Upload deed of assignment, previous survey plans, or any relevant documents
                  </p>
                </div>
              </>
            )}

            {formStep === 2 && (
              <>
                {/* Summary */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c9a961]" />
                    Request Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-[#c9a961]/10">
                      <span className="text-sm text-[#8b6947]">Property</span>
                      <span className="text-sm font-medium text-[#0a2540]">
                        {formData.propertyAddress || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#c9a961]/10">
                      <span className="text-sm text-[#8b6947]">Plot Size</span>
                      <span className="text-sm font-medium text-[#0a2540]">
                        {formData.plotSize || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#c9a961]/10">
                      <span className="text-sm text-[#8b6947]">Land Use</span>
                      <span className="text-sm font-medium text-[#0a2540] capitalize">
                        {formData.landUse || 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-[#8b6947]">Owner</span>
                      <span className="text-sm font-medium text-[#0a2540]">
                        {formData.ownerName || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                  <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#c9a961]" />
                    Fee Breakdown
                  </h3>
                  <div className="space-y-3">
                    {fees.map((fee, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b border-[#c9a961]/10 last:border-0"
                      >
                        <span className="text-sm text-[#8b6947]">{fee.name}</span>
                        <span className="text-sm font-medium text-[#0a2540]">
                          {formatPrice(fee.amount)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t-2 border-[#c9a961]/20">
                      <span className="font-bold text-[#0a2540]">Total</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] bg-clip-text text-transparent">
                        {formatPrice(totalFee)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-2xl p-4 border border-[#c9a961]/20 flex gap-3">
                  <Ruler className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#0a2540]">Estimated Timeline</p>
                    <p className="text-xs text-[#8b6947]">
                      Survey work typically takes 7-14 working days from payment confirmation.
                      You'll be assigned a licensed surveyor within 48 hours.
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
                disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : formStep === 2 ? (
                  <>
                    Submit & Pay
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Survey Requests List */}
            <div className="space-y-4">
              {surveyRequests.length > 0 ? (
                surveyRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div
                      key={request.id}
                      className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                            <Map className="w-5 h-5 text-[#0d6e5d]" />
                          </div>
                          <div>
                            <p className="text-xs text-[#8b6947]">Tracking</p>
                            <p className="text-sm font-bold text-[#0a2540]">
                              {request.trackingNumber}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                            request.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      <div className="bg-[#faf8f5] rounded-xl p-3 mb-3">
                        <p className="text-xs text-[#8b6947] mb-1">Property</p>
                        <p className="text-sm text-[#0a2540]">{request.propertyAddress}</p>
                      </div>
                      {request.surveyorName && (
                        <div className="flex items-center gap-2 mb-3 text-sm text-[#8b6947]">
                          <Compass className="w-4 h-4 text-[#0d6e5d]" />
                          <span>{request.surveyorName}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#8b6947]">
                          <Calendar className="w-3 h-3" />
                          Requested: {new Date(request.requestDate).toLocaleDateString()}
                        </div>
                        {request.status === 'completed' && (
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-lg text-white text-xs font-medium">
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 border border-[#c9a961]/20 shadow-xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10 rounded-2xl flex items-center justify-center">
                    <Map className="w-8 h-8 text-[#c9a961]" />
                  </div>
                  <h3 className="font-serif text-[#0a2540] font-bold mb-2">No Survey Requests</h3>
                  <p className="text-sm text-[#8b6947] mb-4">
                    You haven't submitted any survey plan requests yet.
                  </p>
                  <button
                    onClick={() => setActiveTab('request')}
                    className="px-6 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white font-medium"
                  >
                    Request Survey
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <h3 className="font-serif text-[#0a2540] font-bold mb-3">Survey Department</h3>
              <div className="space-y-2">
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#0d6e5d]" />
                  <span className="text-sm text-[#8b6947]">+234 801 234 5678</span>
                </a>
                <a
                  href="mailto:survey@enugu.gov.ng"
                  className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#0d6e5d]" />
                  <span className="text-sm text-[#8b6947]">survey@enugu.gov.ng</span>
                </a>
              </div>
            </div>
          </>
        )}
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

export default SurveyPlan;