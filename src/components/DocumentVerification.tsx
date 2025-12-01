import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, Shield, CheckCircle, XCircle, AlertCircle, FileText, Clock, Crown, Home, Building2, Heart, User, Upload, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

interface VerificationResult {
  status: 'valid' | 'invalid' | 'pending';
  documentType: string;
  owner: string;
  location: string;
  issueDate: string;
  expiryDate?: string;
  registrationNumber: string;
}

const DocumentVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [documentNumber, setDocumentNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentNumber.trim()) {
      toast.error('Please enter a document number');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo verification results
    const demoResults: Record<string, VerificationResult> = {
      'COO-2024-001': {
        status: 'valid',
        documentType: 'Certificate of Occupancy',
        owner: 'John Okonkwo Chukwuemeka',
        location: 'Plot 15, Independence Layout, Enugu',
        issueDate: '2024-01-15',
        registrationNumber: 'EN/COO/2024/00156'
      },
      'GC-2023-045': {
        status: 'valid',
        documentType: "Governor's Consent",
        owner: 'Mary Eze Adaeze',
        location: 'Block A, Plot 7, Trans-Ekulu, Enugu',
        issueDate: '2023-11-20',
        registrationNumber: 'EN/GC/2023/00789'
      },
      'SP-2024-012': {
        status: 'pending',
        documentType: 'Survey Plan',
        owner: 'Processing...',
        location: 'New Haven Extension, Enugu',
        issueDate: '2024-02-01',
        registrationNumber: 'EN/SP/2024/PENDING'
      },
    };

    const normalizedInput = documentNumber.toUpperCase().trim();
    
    if (demoResults[normalizedInput]) {
      setResult(demoResults[normalizedInput]);
    } else {
      setError('Document not found. Please check the number and try again.');
    }

    setLoading(false);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'valid':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Verified & Valid' };
      case 'invalid':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Invalid Document' };
      case 'pending':
        return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', label: 'Pending Verification' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' };
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20 lg:pb-6">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3d5c] pt-4 pb-8 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#c9a961]/10 rounded-full blur-[100px]" />
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2.5 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-[#c9a961]" />
                <h1 className="text-white font-serif text-xl font-bold">Document Verification</h1>
              </div>
              <p className="text-white/50 text-sm">Verify authenticity of land documents</p>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleVerify} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder="Enter document number (e.g., COO-2024-001)"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#c9a961]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </form>
        </div>
      </header>

      <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto -mt-4">
        {/* Demo Documents */}
        <div className="bg-white rounded-2xl p-4 border border-[#c9a961]/20 shadow-lg mb-6">
          <p className="text-[#8b6947] text-sm mb-3">Try these demo document numbers:</p>
          <div className="flex flex-wrap gap-2">
            {['COO-2024-001', 'GC-2023-045', 'SP-2024-012'].map((num) => (
              <button
                key={num}
                onClick={() => setDocumentNumber(num)}
                className="px-3 py-1.5 bg-[#faf8f5] rounded-lg text-[#1a1a2e] text-sm font-mono hover:bg-[#c9a961]/10 transition-colors"
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl border border-[#c9a961]/20 shadow-lg overflow-hidden animate-fade-in">
            {/* Status Banner */}
            <div className={`p-4 ${getStatusDisplay(result.status).bg} flex items-center gap-3`}>
              {(() => {
                const StatusIcon = getStatusDisplay(result.status).icon;
                return <StatusIcon className={`w-8 h-8 ${getStatusDisplay(result.status).color}`} />;
              })()}
              <div>
                <p className={`font-bold ${getStatusDisplay(result.status).color}`}>
                  {getStatusDisplay(result.status).label}
                </p>
                <p className="text-sm opacity-70">{result.documentType}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#8b6947] text-sm">Registration Number</p>
                  <p className="text-[#1a1a2e] font-mono font-medium">{result.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-[#8b6947] text-sm">Issue Date</p>
                  <p className="text-[#1a1a2e] font-medium">{new Date(result.issueDate).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#c9a961]/10">
                <p className="text-[#8b6947] text-sm mb-1">Property Owner</p>
                <p className="text-[#1a1a2e] font-semibold text-lg">{result.owner}</p>
              </div>

              <div>
                <p className="text-[#8b6947] text-sm mb-1">Property Location</p>
                <p className="text-[#1a1a2e] font-medium">{result.location}</p>
              </div>

              {result.status === 'valid' && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                  <Shield className="w-5 h-5 text-green-600" />
                  <p className="text-green-700 text-sm">This document is authentic and registered with the Enugu State Land Registry.</p>
                </div>
              )}

              {result.status === 'pending' && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <p className="text-amber-700 text-sm">This document is currently being processed. Please check back later.</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#faf8f5] border-t border-[#c9a961]/10 flex gap-3">
              <button className="flex-1 py-3 bg-white border border-[#c9a961]/20 rounded-xl text-[#1a1a2e] font-medium flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" /> Download Report
              </button>
              <button className="py-3 px-4 bg-[#1a1a2e] rounded-xl text-white">
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Info Cards */}
        {!result && !error && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#c9a961]/20 shadow-lg">
              <h3 className="text-[#1a1a2e] font-serif font-bold mb-3">What can you verify?</h3>
              <div className="space-y-3">
                {[
                  { icon: FileText, label: 'Certificate of Occupancy (C of O)' },
                  { icon: Shield, label: "Governor's Consent" },
                  { icon: Crown, label: 'Survey Plans' },
                  { icon: Upload, label: 'Deed of Assignment' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#faf8f5] rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#c9a961]" />
                    </div>
                    <span className="text-[#1a1a2e]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0d6e5d] to-[#064e3b] rounded-2xl p-5 text-white">
              <h3 className="font-serif font-bold mb-2">Protect Yourself</h3>
              <p className="text-white/70 text-sm">Always verify land documents before making any purchase to avoid fraud and ensure legitimate ownership.</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#c9a961]/10 px-4 py-2 z-30 lg:hidden">
        <div className="flex items-center justify-around">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${isActive(item.path) ? 'bg-gradient-to-r from-[#1a1a2e] to-[#0f3d5c]' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] ${isActive(item.path) ? 'text-[#1a1a2e] font-medium' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default DocumentVerification;