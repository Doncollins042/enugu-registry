import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Shield,
  Upload,
  Download,
  Eye,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  User,
  Hash,
  Home,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

interface VerificationResult {
  documentId: string;
  documentType: string;
  ownerName: string;
  propertyAddress: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'invalid' | 'expired' | 'pending';
  registrationNumber: string;
}

const DocumentVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<VerificationResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Demo verification results
  const demoResults: Record<string, VerificationResult> = {
    'COO-2024-001234': {
      documentId: 'COO-2024-001234',
      documentType: 'Certificate of Occupancy',
      ownerName: 'James Okonkwo',
      propertyAddress: 'Plot 15, Block A, Legacy Estate, Independence Layout, Enugu',
      issueDate: '2024-01-15',
      expiryDate: '2099-01-15',
      status: 'valid',
      registrationNumber: 'EN/IL/LE/015/2024',
    },
    'DOA-2023-005678': {
      documentId: 'DOA-2023-005678',
      documentType: 'Deed of Assignment',
      ownerName: 'Chioma Eze',
      propertyAddress: 'Plot 7, Royal Gardens, Trans-Ekulu, Enugu',
      issueDate: '2023-06-20',
      expiryDate: '2098-06-20',
      status: 'valid',
      registrationNumber: 'EN/TE/RG/007/2023',
    },
    'GC-2022-009999': {
      documentId: 'GC-2022-009999',
      documentType: "Governor's Consent",
      ownerName: 'Emmanuel Nwankwo',
      propertyAddress: 'Plot 32, Diamond Heights, New Haven, Enugu',
      issueDate: '2022-03-10',
      expiryDate: '2097-03-10',
      status: 'expired',
      registrationNumber: 'EN/NH/DH/032/2022',
    },
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a document number');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const result = demoResults[searchQuery.toUpperCase()];
      setSearchResult(result || null);
      setIsSearching(false);

      if (result) {
        toast.success('Document found!');
      } else {
        toast.error('Document not found');
      }
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'invalid':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'expired':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return CheckCircle2;
      case 'invalid':
        return XCircle;
      case 'expired':
        return AlertCircle;
      case 'pending':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const services = [
    {
      name: 'Document Upload',
      description: 'Upload documents for verification',
      icon: Upload,
      path: '/services/document-upload',
      color: 'from-[#0f3d5c] to-[#0d6e5d]',
    },
    {
      name: "Governor's Consent",
      description: 'Apply for land transfer approval',
      icon: FileText,
      path: '/services/governors-consent',
      color: 'from-[#c9a961] to-[#8b6947]',
    },
    {
      name: 'Ground Rent',
      description: 'Pay your annual ground rent',
      icon: Building2,
      path: '/services/ground-rent',
      color: 'from-[#0f3d5c] to-[#0d6e5d]',
    },
    {
      name: 'Survey Plan',
      description: 'Request official survey plans',
      icon: MapPin,
      path: '/services/survey-plan',
      color: 'from-[#c9a961] to-[#8b6947]',
    },
  ];

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
              <h1 className="font-serif text-white text-xl font-bold">Document Verification</h1>
              <p className="text-white/70 text-xs">Verify authenticity of land documents</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter document number (e.g., COO-2024-001234)"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-6 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold shadow-lg disabled:opacity-70 flex items-center gap-2"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-white/50 text-xs mt-2">
              Try: COO-2024-001234, DOA-2023-005678, or GC-2022-009999
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Pulled up */}
      <div className="px-4 -mt-8 relative z-10 space-y-6">
        {/* Search Result */}
        {hasSearched && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-[#c9a961]/20 shadow-xl overflow-hidden">
            {isSearching ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#c9a961] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#8b6947]">Verifying document...</p>
              </div>
            ) : searchResult ? (
              <>
                {/* Status Banner */}
                <div
                  className={`px-4 py-3 flex items-center gap-3 ${
                    searchResult.status === 'valid'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                      : searchResult.status === 'expired'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-rose-500 to-rose-600'
                  }`}
                >
                  {(() => {
                    const StatusIcon = getStatusIcon(searchResult.status);
                    return <StatusIcon className="w-6 h-6 text-white" />;
                  })()}
                  <div>
                    <p className="text-white font-bold">
                      Document {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                    </p>
                    <p className="text-white/80 text-xs">
                      {searchResult.status === 'valid'
                        ? 'This document is authentic and valid'
                        : searchResult.status === 'expired'
                        ? 'This document has expired'
                        : 'This document could not be verified'}
                    </p>
                  </div>
                </div>

                {/* Document Details */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-[#c9a961]/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#0d6e5d]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0a2540]">{searchResult.documentType}</p>
                      <p className="text-xs text-[#8b6947]">{searchResult.documentId}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-[#c9a961] mt-0.5" />
                      <div>
                        <p className="text-xs text-[#8b6947]">Owner Name</p>
                        <p className="text-sm font-medium text-[#0a2540]">{searchResult.ownerName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#c9a961] mt-0.5" />
                      <div>
                        <p className="text-xs text-[#8b6947]">Property Address</p>
                        <p className="text-sm font-medium text-[#0a2540]">{searchResult.propertyAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Hash className="w-4 h-4 text-[#c9a961] mt-0.5" />
                      <div>
                        <p className="text-xs text-[#8b6947]">Registration Number</p>
                        <p className="text-sm font-medium text-[#0a2540]">{searchResult.registrationNumber}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-[#c9a961] mt-0.5" />
                        <div>
                          <p className="text-xs text-[#8b6947]">Issue Date</p>
                          <p className="text-sm font-medium text-[#0a2540]">
                            {new Date(searchResult.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#c9a961] mt-0.5" />
                        <div>
                          <p className="text-xs text-[#8b6947]">Expiry Date</p>
                          <p className="text-sm font-medium text-[#0a2540]">
                            {new Date(searchResult.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-[#c9a961]/20">
                    <button className="flex-1 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                    <button className="flex-1 py-3 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947] font-medium text-sm flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-2xl flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="font-serif text-[#0a2540] font-bold mb-2">Document Not Found</h3>
                <p className="text-sm text-[#8b6947]">
                  No document matches the number "{searchQuery}". Please check and try again.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Services */}
        <div>
          <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c9a961]" />
            Government Services
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.path}
                  onClick={() => navigate(service.path)}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-lg hover:shadow-xl transition-all text-left group"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-[#0a2540] text-sm mb-1">{service.name}</h4>
                  <p className="text-xs text-[#8b6947]">{service.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-2xl p-4 border border-[#c9a961]/20 flex gap-3">
          <Shield className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-[#0a2540]">Secure Verification</p>
            <p className="text-xs text-[#8b6947]">
              All document verifications are processed securely and logged for audit purposes.
              Only authorized documents are recognized by this system.
            </p>
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
          <h3 className="font-serif text-[#0a2540] font-bold mb-3">Recent Verifications</h3>
          <div className="space-y-3">
            {[
              { id: 'COO-2024-001234', type: 'Certificate of Occupancy', status: 'valid', date: 'Today' },
              { id: 'DOA-2023-005678', type: 'Deed of Assignment', status: 'valid', date: 'Yesterday' },
              { id: 'GC-2022-009999', type: "Governor's Consent", status: 'expired', date: '2 days ago' },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(item.id);
                  handleSearch();
                }}
                className="w-full flex items-center justify-between p-3 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#0d6e5d]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-[#0a2540]">{item.id}</p>
                    <p className="text-xs text-[#8b6947]">{item.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8b6947]" />
                </div>
              </button>
            ))}
          </div>
        </div>
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

export default DocumentVerification;