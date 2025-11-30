import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Map,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  MapPin,
  Calendar,
  Download,
  Compass,
  Ruler,
  Phone,
  Mail,
  Home,
  Search,
  Building2,
  Heart,
  User,
  Eye,
  Layers,
  Navigation,
  Target,
  Grid3X3,
  Maximize2,
  ZoomIn,
  LocateFixed
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SurveyRequest {
  id: string;
  propertyAddress: string;
  requestDate: string;
  status: 'pending' | 'surveying' | 'completed';
  trackingNumber: string;
  surveyorName?: string;
  plotSize?: string;
  coordinates?: { lat: string; lng: string };
}

const SurveyPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'request' | 'plans'>('request');
  const [selectedPlan, setSelectedPlan] = useState<SurveyRequest | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    propertyAddress: '',
    plotSize: '',
    landUse: 'residential',
    ownerName: '',
    ownerPhone: '',
  });

  const [surveyPlans] = useState<SurveyRequest[]>([
    {
      id: '1',
      propertyAddress: 'Plot 15, Legacy Estate, Independence Layout',
      requestDate: '2024-01-10',
      status: 'completed',
      trackingNumber: 'SP-2024-001234',
      surveyorName: 'Surv. Emmanuel Okoro',
      plotSize: '648.5 sqm',
      coordinates: { lat: '6.4541° N', lng: '7.5134° E' },
    },
    {
      id: '2',
      propertyAddress: 'Block C, Plot 22, Royal Gardens, Trans-Ekulu',
      requestDate: '2024-01-20',
      status: 'surveying',
      trackingNumber: 'SP-2024-001567',
      surveyorName: 'Surv. Chioma Nwosu',
      plotSize: '500 sqm',
      coordinates: { lat: '6.4623° N', lng: '7.5089° E' },
    },
    {
      id: '3',
      propertyAddress: 'Plot 8, Diamond Heights, New Haven',
      requestDate: '2024-01-28',
      status: 'pending',
      trackingNumber: 'SP-2024-001890',
      plotSize: '750 sqm',
    },
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-emerald-500', text: 'text-emerald-500', light: 'bg-emerald-50', label: 'Completed' };
      case 'surveying':
        return { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50', label: 'In Progress' };
      default:
        return { bg: 'bg-amber-500', text: 'text-amber-500', light: 'bg-amber-50', label: 'Pending' };
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Survey request submitted!');
      setActiveTab('plans');
      setFormStep(1);
    }, 1500);
  };

  const isActive = (path: string) => location.pathname === path;

  // Beautiful Survey Plan Visualization Component
  const SurveyPlanVisualization = ({ plan }: { plan: SurveyRequest }) => (
    <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-xl overflow-hidden">
      {/* Plan Header */}
      <div className="bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Map className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">{plan.trackingNumber}</p>
              <p className="text-white/60 text-[10px]">Survey Plan</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${getStatusConfig(plan.status).light} ${getStatusConfig(plan.status).text}`}>
            {getStatusConfig(plan.status).label}
          </div>
        </div>
      </div>

      {/* Beautiful Map/Survey Visualization */}
      <div className="relative bg-[#f0f4f3] p-4">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0d6e5d" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Survey Plot Visualization */}
        <div className="relative z-10">
          {/* Compass */}
          <div className="absolute top-2 right-2 w-12 h-12">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-white rounded-full shadow-lg border-2 border-[#0d6e5d]/20" />
              <div className="absolute inset-2 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-[#0d6e5d] -rotate-45" />
              </div>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#0d6e5d]">N</span>
            </div>
          </div>

          {/* Scale Bar */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            <div className="flex">
              <div className="w-6 h-1.5 bg-[#0a2540]" />
              <div className="w-6 h-1.5 bg-white border border-[#0a2540]" />
              <div className="w-6 h-1.5 bg-[#0a2540]" />
            </div>
            <span className="text-[8px] text-[#0a2540] font-medium">30m</span>
          </div>

          {/* Plot Shape */}
          <div className="mx-auto my-4 relative" style={{ width: '200px', height: '160px' }}>
            {/* Main Plot */}
            <svg viewBox="0 0 200 160" className="w-full h-full">
              {/* Plot Fill */}
              <polygon
                points="20,20 180,20 180,140 20,140"
                fill="#0d6e5d"
                fillOpacity="0.15"
                stroke="#0d6e5d"
                strokeWidth="2"
              />
              
              {/* Corner Beacons */}
              <circle cx="20" cy="20" r="6" fill="#c9a961" stroke="#8b6947" strokeWidth="2" />
              <circle cx="180" cy="20" r="6" fill="#c9a961" stroke="#8b6947" strokeWidth="2" />
              <circle cx="180" cy="140" r="6" fill="#c9a961" stroke="#8b6947" strokeWidth="2" />
              <circle cx="20" cy="140" r="6" fill="#c9a961" stroke="#8b6947" strokeWidth="2" />

              {/* Beacon Labels */}
              <text x="20" y="10" textAnchor="middle" className="text-[8px] fill-[#0a2540] font-bold">B1</text>
              <text x="180" y="10" textAnchor="middle" className="text-[8px] fill-[#0a2540] font-bold">B2</text>
              <text x="180" y="155" textAnchor="middle" className="text-[8px] fill-[#0a2540] font-bold">B3</text>
              <text x="20" y="155" textAnchor="middle" className="text-[8px] fill-[#0a2540] font-bold">B4</text>

              {/* Dimensions */}
              <text x="100" y="14" textAnchor="middle" className="text-[9px] fill-[#0f3d5c] font-semibold">32.4m</text>
              <text x="100" y="152" textAnchor="middle" className="text-[9px] fill-[#0f3d5c] font-semibold">32.4m</text>
              <text x="8" y="85" textAnchor="middle" className="text-[9px] fill-[#0f3d5c] font-semibold" transform="rotate(-90, 8, 85)">20.0m</text>
              <text x="192" y="85" textAnchor="middle" className="text-[9px] fill-[#0f3d5c] font-semibold" transform="rotate(90, 192, 85)">20.0m</text>

              {/* Center Mark */}
              <circle cx="100" cy="80" r="3" fill="none" stroke="#c9a961" strokeWidth="1" />
              <line x1="95" y1="80" x2="105" y2="80" stroke="#c9a961" strokeWidth="1" />
              <line x1="100" y1="75" x2="100" y2="85" stroke="#c9a961" strokeWidth="1" />

              {/* Area Text */}
              <text x="100" y="95" textAnchor="middle" className="text-[10px] fill-[#0d6e5d] font-bold">{plan.plotSize}</text>
            </svg>

            {/* Direction Labels */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-[#8b6947] font-medium">NORTH</div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-[#8b6947] font-medium">SOUTH</div>
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 text-[8px] text-[#8b6947] font-medium rotate-[-90deg]">WEST</div>
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-[8px] text-[#8b6947] font-medium rotate-90">EAST</div>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      <div className="p-4 space-y-3">
        {/* Coordinates */}
        {plan.coordinates && (
          <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl">
            <div className="w-8 h-8 bg-[#0d6e5d]/10 rounded-lg flex items-center justify-center">
              <LocateFixed className="w-4 h-4 text-[#0d6e5d]" />
            </div>
            <div>
              <p className="text-[10px] text-[#8b6947]">GPS Coordinates</p>
              <p className="text-xs font-medium text-[#0a2540]">{plan.coordinates.lat}, {plan.coordinates.lng}</p>
            </div>
          </div>
        )}

        {/* Property Info */}
        <div className="flex items-start gap-3 p-3 bg-[#faf8f5] rounded-xl">
          <div className="w-8 h-8 bg-[#c9a961]/10 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-[#c9a961]" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-[#8b6947]">Property Address</p>
            <p className="text-xs font-medium text-[#0a2540]">{plan.propertyAddress}</p>
          </div>
        </div>

        {/* Surveyor */}
        {plan.surveyorName && (
          <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl">
            <div className="w-8 h-8 bg-[#0f3d5c]/10 rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#0f3d5c]" />
            </div>
            <div>
              <p className="text-[10px] text-[#8b6947]">Licensed Surveyor</p>
              <p className="text-xs font-medium text-[#0a2540]">{plan.surveyorName}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {plan.status === 'completed' && (
          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex-1 py-3 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947] text-xs font-medium flex items-center justify-center gap-2">
              <Maximize2 className="w-4 h-4" />
              Full View
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-6 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-white text-lg font-bold">Survey Plans</h1>
              <p className="text-white/60 text-xs">Request & view survey plans</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
            <button
              onClick={() => { setActiveTab('request'); setSelectedPlan(null); }}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'request' ? 'bg-white text-[#0f3d5c]' : 'text-white/70'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              New Request
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'plans' ? 'bg-white text-[#0f3d5c]' : 'text-white/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              My Plans
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {activeTab === 'request' ? (
          <>
            {/* Request Form */}
            <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm space-y-4">
              <h3 className="text-[#0a2540] font-bold text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-[#c9a961]" />
                Property Details
              </h3>
              
              <div>
                <label className="block text-[10px] text-[#8b6947] mb-1 font-medium">Property Address</label>
                <input
                  type="text"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  placeholder="Enter full property address"
                  className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm text-[#0a2540] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#8b6947] mb-1 font-medium">Plot Size (sqm)</label>
                  <input
                    type="text"
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm text-[#0a2540] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#8b6947] mb-1 font-medium">Land Use</label>
                  <select
                    value={formData.landUse}
                    onChange={(e) => setFormData({ ...formData, landUse: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm text-[#0a2540] focus:outline-none focus:border-[#0d6e5d]"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="agricultural">Agricultural</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#8b6947] mb-1 font-medium">Owner's Name</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="Full legal name"
                  className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm text-[#0a2540] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8b6947] mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  placeholder="+234..."
                  className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm text-[#0a2540] placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d]"
                />
              </div>
            </div>

            {/* Fee Summary */}
            <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm">
              <h3 className="text-[#0a2540] font-bold text-sm mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#c9a961]" />
                Survey Fees
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Survey Fee', amount: '₦150,000' },
                  { name: 'Processing', amount: '₦25,000' },
                  { name: 'Pillar Installation', amount: '₦50,000' },
                  { name: 'Documentation', amount: '₦15,000' },
                ].map((fee, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-[#8b6947]">{fee.name}</span>
                    <span className="text-[#0a2540] font-medium">{fee.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-[#c9a961]/10">
                  <span className="text-[#0a2540] font-bold text-sm">Total</span>
                  <span className="text-[#0d6e5d] font-bold">₦240,000</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-r from-[#0f3d5c]/5 to-[#0d6e5d]/5 rounded-2xl p-4 border border-[#0d6e5d]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#0d6e5d]" />
                </div>
                <div>
                  <p className="text-[#0a2540] font-medium text-sm">7-14 Working Days</p>
                  <p className="text-[#8b6947] text-xs">Surveyor assigned within 48 hours</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {isSubmitting ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
              ) : (
                <>Submit Request <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </>
        ) : (
          <>
            {/* Survey Plans List */}
            {selectedPlan ? (
              <>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="flex items-center gap-2 text-[#0d6e5d] text-sm font-medium mb-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Plans
                </button>
                <SurveyPlanVisualization plan={selectedPlan} />
              </>
            ) : (
              <div className="space-y-3">
                {surveyPlans.map((plan) => {
                  const statusConfig = getStatusConfig(plan.status);
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm text-left"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                            <Map className="w-5 h-5 text-[#0d6e5d]" />
                          </div>
                          <div>
                            <p className="text-[#0a2540] font-bold text-xs">{plan.trackingNumber}</p>
                            <p className="text-[#8b6947] text-[10px]">{plan.plotSize}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${statusConfig.light} ${statusConfig.text}`}>
                          {statusConfig.label}
                        </div>
                      </div>
                      <p className="text-[#8b6947] text-xs mb-2 line-clamp-1">{plan.propertyAddress}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] text-[#8b6947]">
                          <Calendar className="w-3 h-3" />
                          {new Date(plan.requestDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-[#0d6e5d] text-xs font-medium">
                          View Plan <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Contact */}
            <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm">
              <h3 className="text-[#0a2540] font-bold text-sm mb-3">Survey Office</h3>
              <div className="space-y-2">
                <a href="tel:+2348012345678" className="flex items-center gap-3 p-2.5 bg-[#faf8f5] rounded-xl">
                  <Phone className="w-4 h-4 text-[#0d6e5d]" />
                  <span className="text-xs text-[#8b6947]">+234 801 234 5678</span>
                </a>
                <a href="mailto:survey@enugu.gov.ng" className="flex items-center gap-3 p-2.5 bg-[#faf8f5] rounded-xl">
                  <Mail className="w-4 h-4 text-[#0d6e5d]" />
                  <span className="text-xs text-[#8b6947]">survey@enugu.gov.ng</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30">
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

export default SurveyPlan;