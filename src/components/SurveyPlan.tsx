import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  MapPin,
  Calendar,
  Download,
  Compass,
  Phone,
  Mail,
  Home,
  Search,
  Building2,
  Heart,
  User,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SurveyRequest {
  id: string;
  estateName: string;
  location: string;
  requestDate: string;
  status: 'pending' | 'surveying' | 'completed';
  trackingNumber: string;
  surveyorName?: string;
  totalArea?: string;
  totalPlots?: number;
}

const SurveyPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'request' | 'plans'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<SurveyRequest | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
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
      estateName: 'Legacy Estate Phase 1',
      location: 'Independence Layout, Enugu',
      requestDate: '2024-01-10',
      status: 'completed',
      trackingNumber: 'SP-2024-001234',
      surveyorName: 'Surv. Emmanuel Okoro (SURCON)',
      totalArea: '12.5 Hectares',
      totalPlots: 48,
    },
    {
      id: '2',
      estateName: 'Royal Gardens Estate',
      location: 'Trans-Ekulu, Enugu',
      requestDate: '2024-01-20',
      status: 'completed',
      trackingNumber: 'SP-2024-001567',
      surveyorName: 'Surv. Chioma Nwosu (SURCON)',
      totalArea: '8.2 Hectares',
      totalPlots: 32,
    },
    {
      id: '3',
      estateName: 'Diamond Heights',
      location: 'New Haven, Enugu',
      requestDate: '2024-01-28',
      status: 'surveying',
      trackingNumber: 'SP-2024-001890',
      totalArea: '15.0 Hectares',
      totalPlots: 56,
    },
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50', label: 'Completed' };
      case 'surveying':
        return { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', label: 'In Progress' };
      default:
        return { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', label: 'Pending' };
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Survey request submitted!');
      setActiveTab('plans');
    }, 1500);
  };

  const isActive = (path: string) => location.pathname === path;

  // Professional Subdivision Survey Map Component
  const SubdivisionMap = ({ plan }: { plan: SurveyRequest }) => (
    <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-xl overflow-hidden">
      {/* Map Header - Like real survey documents */}
      <div className="bg-[#1a1a2e] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#c9a961] rounded flex items-center justify-center">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-xs">{plan.trackingNumber}</p>
            <p className="text-gray-400 text-[9px]">Survey Plan</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
            className="p-1.5 bg-white/10 rounded text-white hover:bg-white/20"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-white text-[10px] px-2">{Math.round(zoomLevel * 100)}%</span>
          <button 
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
            className="p-1.5 bg-white/10 rounded text-white hover:bg-white/20"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Survey Map - Professional Subdivision Layout */}
      <div className="relative bg-[#f5f5f0] overflow-auto" style={{ height: '400px' }}>
        <div 
          className="min-w-[500px] min-h-[400px] p-4 origin-top-left transition-transform"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg viewBox="0 0 500 380" className="w-full h-full">
            {/* Background Grid */}
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ccc" strokeWidth="0.3"/>
              </pattern>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="url(#smallGrid)"/>
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#999" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Main Road - Curved */}
            <path 
              d="M 0 320 Q 100 300, 200 280 T 400 250 T 500 240" 
              fill="none" 
              stroke="#888" 
              strokeWidth="25"
              strokeLinecap="round"
            />
            <path 
              d="M 0 320 Q 100 300, 200 280 T 400 250 T 500 240" 
              fill="none" 
              stroke="#f5f5f0" 
              strokeWidth="1"
              strokeDasharray="10,10"
            />
            <text x="250" y="268" className="text-[8px] fill-gray-600 font-medium" textAnchor="middle">ESTATE ROAD (12m)</text>

            {/* Internal Road - Vertical */}
            <rect x="235" y="50" width="20" height="200" fill="#888" />
            <line x1="245" y1="50" x2="245" y2="250" stroke="#f5f5f0" strokeWidth="1" strokeDasharray="8,8" />
            <text x="245" y="150" className="text-[7px] fill-gray-600" textAnchor="middle" transform="rotate(-90, 245, 150)">ACCESS ROAD (9m)</text>

            {/* Estate Boundary */}
            <path 
              d="M 30 30 L 470 30 L 480 100 L 485 200 L 470 270 L 400 250 L 200 280 L 100 300 L 30 280 Z" 
              fill="none" 
              stroke="#0d6e5d" 
              strokeWidth="2"
              strokeDasharray="8,4"
            />

            {/* LEFT SIDE PLOTS */}
            {/* Plot 1 */}
            <path d="M 40 40 L 120 40 L 120 90 L 40 90 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="80" y="60" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">01</text>
            <text x="80" y="72" className="text-[6px] fill-gray-600" textAnchor="middle">648 sqm</text>

            {/* Plot 2 */}
            <path d="M 125 40 L 225 40 L 225 90 L 125 90 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="175" y="60" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">02</text>
            <text x="175" y="72" className="text-[6px] fill-gray-600" textAnchor="middle">700 sqm</text>

            {/* Plot 3 */}
            <path d="M 40 95 L 120 95 L 120 145 L 40 145 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="80" y="115" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">03</text>
            <text x="80" y="127" className="text-[6px] fill-gray-600" textAnchor="middle">648 sqm</text>

            {/* Plot 4 */}
            <path d="M 125 95 L 225 95 L 225 145 L 125 145 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="175" y="115" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">04</text>
            <text x="175" y="127" className="text-[6px] fill-gray-600" textAnchor="middle">700 sqm</text>

            {/* Plot 5 */}
            <path d="M 40 150 L 120 150 L 120 200 L 40 200 Z" fill="#fff3e0" stroke="#e65100" strokeWidth="1.5"/>
            <text x="80" y="170" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">05</text>
            <text x="80" y="182" className="text-[6px] fill-gray-600" textAnchor="middle">648 sqm</text>

            {/* Plot 6 */}
            <path d="M 125 150 L 225 150 L 225 200 L 125 200 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="175" y="170" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">06</text>
            <text x="175" y="182" className="text-[6px] fill-gray-600" textAnchor="middle">700 sqm</text>

            {/* Plot 7 */}
            <path d="M 40 205 L 120 205 L 115 255 L 35 265 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="77" y="228" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">07</text>
            <text x="77" y="240" className="text-[6px] fill-gray-600" textAnchor="middle">720 sqm</text>

            {/* Plot 8 */}
            <path d="M 125 205 L 225 205 L 225 245 L 120 260 Z" fill="#ffebee" stroke="#c62828" strokeWidth="1.5"/>
            <text x="172" y="225" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">08</text>
            <text x="172" y="237" className="text-[6px] fill-gray-600" textAnchor="middle">SOLD</text>

            {/* RIGHT SIDE PLOTS */}
            {/* Plot 9 */}
            <path d="M 265 40 L 350 40 L 350 90 L 265 90 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="307" y="60" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">09</text>
            <text x="307" y="72" className="text-[6px] fill-gray-600" textAnchor="middle">595 sqm</text>

            {/* Plot 10 */}
            <path d="M 355 40 L 460 40 L 465 90 L 355 90 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="407" y="60" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">10</text>
            <text x="407" y="72" className="text-[6px] fill-gray-600" textAnchor="middle">750 sqm</text>

            {/* Plot 11 */}
            <path d="M 265 95 L 350 95 L 350 145 L 265 145 Z" fill="#ffebee" stroke="#c62828" strokeWidth="1.5"/>
            <text x="307" y="115" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">11</text>
            <text x="307" y="127" className="text-[6px] fill-gray-600" textAnchor="middle">SOLD</text>

            {/* Plot 12 */}
            <path d="M 355 95 L 468 100 L 472 145 L 355 145 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="410" y="118" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">12</text>
            <text x="410" y="130" className="text-[6px] fill-gray-600" textAnchor="middle">780 sqm</text>

            {/* Plot 13 */}
            <path d="M 265 150 L 350 150 L 350 200 L 265 200 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="307" y="170" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">13</text>
            <text x="307" y="182" className="text-[6px] fill-gray-600" textAnchor="middle">595 sqm</text>

            {/* Plot 14 */}
            <path d="M 355 150 L 475 155 L 478 205 L 355 200 Z" fill="#fff3e0" stroke="#e65100" strokeWidth="1.5"/>
            <text x="415" y="173" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">14</text>
            <text x="415" y="185" className="text-[6px] fill-gray-600" textAnchor="middle">820 sqm</text>

            {/* Plot 15 - Corner */}
            <path d="M 265 205 L 350 205 L 350 240 L 280 245 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="307" y="222" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">15</text>
            <text x="307" y="234" className="text-[6px] fill-gray-600" textAnchor="middle">550 sqm</text>

            {/* Plot 16 - Corner */}
            <path d="M 355 205 L 480 210 L 470 250 L 360 245 Z" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5"/>
            <text x="415" y="225" className="text-[9px] fill-[#1a1a2e] font-bold" textAnchor="middle">16</text>
            <text x="415" y="237" className="text-[6px] fill-gray-600" textAnchor="middle">680 sqm</text>

            {/* Beacon Points */}
            {[[40,40], [225,40], [265,40], [460,40], [35,265], [225,245], [280,245], [470,250]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill="#c9a961" stroke="#8b6947" strokeWidth="1.5"/>
                <text x={x} y={y-8} className="text-[6px] fill-[#8b6947] font-bold" textAnchor="middle">PCB{i+1}</text>
              </g>
            ))}

            {/* North Arrow */}
            <g transform="translate(450, 320)">
              <circle cx="0" cy="0" r="18" fill="white" stroke="#1a1a2e" strokeWidth="1"/>
              <polygon points="0,-14 4,6 0,2 -4,6" fill="#1a1a2e"/>
              <text x="0" y="-18" className="text-[8px] fill-[#1a1a2e] font-bold" textAnchor="middle">N</text>
            </g>

            {/* Scale Bar */}
            <g transform="translate(30, 340)">
              <rect x="0" y="0" width="30" height="6" fill="#1a1a2e"/>
              <rect x="30" y="0" width="30" height="6" fill="white" stroke="#1a1a2e" strokeWidth="0.5"/>
              <rect x="60" y="0" width="30" height="6" fill="#1a1a2e"/>
              <text x="0" y="15" className="text-[7px] fill-[#1a1a2e]">0</text>
              <text x="45" y="15" className="text-[7px] fill-[#1a1a2e]">50m</text>
              <text x="90" y="15" className="text-[7px] fill-[#1a1a2e]">100m</text>
            </g>

            {/* Legend */}
            <g transform="translate(320, 310)">
              <text x="0" y="0" className="text-[7px] fill-[#1a1a2e] font-bold">LEGEND:</text>
              <rect x="0" y="8" width="12" height="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1"/>
              <text x="16" y="15" className="text-[6px] fill-gray-600">Available</text>
              <rect x="55" y="8" width="12" height="8" fill="#ffebee" stroke="#c62828" strokeWidth="1"/>
              <text x="71" y="15" className="text-[6px] fill-gray-600">Sold</text>
              <rect x="100" y="8" width="12" height="8" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
              <text x="116" y="15" className="text-[6px] fill-gray-600">Reserved</text>
            </g>

            {/* Title Block */}
            <g transform="translate(140, 345)">
              <rect x="0" y="0" width="160" height="30" fill="white" stroke="#1a1a2e" strokeWidth="1"/>
              <line x1="0" y1="15" x2="160" y2="15" stroke="#1a1a2e" strokeWidth="0.5"/>
              <text x="80" y="10" className="text-[7px] fill-[#1a1a2e] font-bold" textAnchor="middle">{plan.estateName.toUpperCase()}</text>
              <text x="80" y="24" className="text-[6px] fill-gray-600" textAnchor="middle">{plan.location}</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Survey Info Bar */}
      <div className="bg-[#1a1a2e] px-4 py-3">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-[#c9a961] text-[10px]">Total Area</p>
            <p className="text-white text-xs font-bold">{plan.totalArea}</p>
          </div>
          <div>
            <p className="text-[#c9a961] text-[10px]">Total Plots</p>
            <p className="text-white text-xs font-bold">{plan.totalPlots}</p>
          </div>
          <div>
            <p className="text-[#c9a961] text-[10px]">Available</p>
            <p className="text-emerald-400 text-xs font-bold">12</p>
          </div>
          <div>
            <p className="text-[#c9a961] text-[10px]">Sold</p>
            <p className="text-rose-400 text-xs font-bold">4</p>
          </div>
        </div>
      </div>

      {/* Surveyor Details */}
      <div className="p-4 space-y-3">
        {plan.surveyorName && (
          <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-xl">
            <div className="w-10 h-10 bg-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#0d6e5d]" />
            </div>
            <div>
              <p className="text-[10px] text-[#8b6947]">Certified Surveyor</p>
              <p className="text-xs font-bold text-[#0a2540]">{plan.surveyorName}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button className="py-3 px-4 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947]">
            <Printer className="w-4 h-4" />
          </button>
          <button className="py-3 px-4 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947]">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-6 px-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white text-lg font-bold">Survey Plans</h1>
            <p className="text-white/60 text-xs">Estate subdivision maps</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
          <button
            onClick={() => { setActiveTab('request'); setSelectedPlan(null); }}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 ${
              activeTab === 'request' ? 'bg-white text-[#0f3d5c]' : 'text-white/70'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Request
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 ${
              activeTab === 'plans' ? 'bg-white text-[#0f3d5c]' : 'text-white/70'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            View Plans
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {activeTab === 'request' ? (
          <>
            {/* Request Form */}
            <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm space-y-3">
              <h3 className="text-[#0a2540] font-bold text-sm">Request Survey Plan</h3>
              
              <div>
                <label className="block text-[10px] text-[#8b6947] mb-1">Property Address</label>
                <input
                  type="text"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  placeholder="Enter property address"
                  className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-[#8b6947] mb-1">Plot Size</label>
                  <input
                    type="text"
                    value={formData.plotSize}
                    onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                    placeholder="e.g., 500 sqm"
                    className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#8b6947] mb-1">Land Use</label>
                  <select
                    value={formData.landUse}
                    onChange={(e) => setFormData({ ...formData, landUse: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[#8b6947] mb-1">Owner's Name</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] text-[#8b6947] mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                  placeholder="+234..."
                  className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-sm"
                />
              </div>
            </div>

            {/* Fees */}
            <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#8b6947]">Survey Fee</span>
                <span className="text-sm font-bold text-[#0a2540]">₦240,000</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Processing...' : 'Submit Request'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            {selectedPlan ? (
              <>
                <button onClick={() => setSelectedPlan(null)} className="flex items-center gap-2 text-[#0d6e5d] text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <SubdivisionMap plan={selectedPlan} />
              </>
            ) : (
              <div className="space-y-3">
                {surveyPlans.map((plan) => {
                  const status = getStatusConfig(plan.status);
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm text-left"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[#0a2540] font-bold text-sm">{plan.estateName}</p>
                          <p className="text-[#8b6947] text-xs">{plan.location}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${status.light} ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#c9a961]/10">
                        <div className="flex items-center gap-4 text-[10px] text-[#8b6947]">
                          <span>{plan.totalPlots} Plots</span>
                          <span>{plan.totalArea}</span>
                        </div>
                        <span className="text-[#0d6e5d] text-xs font-medium flex items-center gap-1">
                          View Map <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Contact */}
            {!selectedPlan && (
              <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/10 shadow-sm">
                <h3 className="text-[#0a2540] font-bold text-sm mb-3">Survey Office</h3>
                <div className="space-y-2">
                  <a href="tel:+2348012345678" className="flex items-center gap-3 p-2.5 bg-[#faf8f5] rounded-xl text-xs text-[#8b6947]">
                    <Phone className="w-4 h-4 text-[#0d6e5d]" /> +234 801 234 5678
                  </a>
                  <a href="mailto:survey@enugu.gov.ng" className="flex items-center gap-3 p-2.5 bg-[#faf8f5] rounded-xl text-xs text-[#8b6947]">
                    <Mail className="w-4 h-4 text-[#0d6e5d]" /> survey@enugu.gov.ng
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
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
              <span className={`text-[10px] ${isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SurveyPlan;