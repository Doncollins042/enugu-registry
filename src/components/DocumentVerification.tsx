import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Shield, CheckCircle, XCircle, Clock,
  FileText, Upload, AlertCircle, Crown, Loader2, Home
} from 'lucide-react';
import toast from 'react-hot-toast';

interface VerificationResult {
  status: 'valid' | 'invalid' | 'pending';
  documentType: string;
  ownerName: string;
  plotNumber: string;
  location: string;
  registrationDate: string;
  expiryDate?: string;
}

export default function DocumentVerification() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a document number');
      return;
    }
    setLoading(true);
    setResult(null);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo result
    if (searchQuery.toLowerCase().includes('valid') || searchQuery.length > 5) {
      setResult({
        status: 'valid',
        documentType: 'Certificate of Occupancy',
        ownerName: 'James Okonkwo',
        plotNumber: 'LE-015',
        location: 'Legacy Estate, Independence Layout',
        registrationDate: '2024-01-15',
        expiryDate: '2099-01-15'
      });
    } else {
      setResult({
        status: 'invalid',
        documentType: 'Unknown',
        ownerName: '-',
        plotNumber: '-',
        location: '-',
        registrationDate: '-'
      });
    }
    setLoading(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'valid':
        return { icon: CheckCircle, color: 'text-[#0d6e5d]', bg: 'bg-[#0d6e5d]/10', border: 'border-[#0d6e5d]/30', label: 'Verified & Valid' };
      case 'invalid':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', label: 'Invalid Document' };
      default:
        return { icon: Clock, color: 'text-[#c9a961]', bg: 'bg-[#c9a961]/10', border: 'border-[#c9a961]/30', label: 'Pending Verification' };
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-8">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-xl">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white font-bold">Document Verification</h1>
              <p className="text-white/70 text-xs">Verify land documents authenticity</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter document number or title ID"
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:ring-2 focus:ring-[#c9a961] shadow-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
              />
            </div>
            <button onClick={handleVerify} disabled={loading} className="px-4 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white font-semibold shadow-lg disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 -mt-10 relative z-10">
        {/* Info Card */}
        {!result && !loading && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#c9a961]/20 shadow-xl mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#c9a961]" />
              </div>
              <div>
                <h2 className="font-serif text-[#0a2540] font-bold">Verify Any Document</h2>
                <p className="text-[#8b6947] text-xs">Check the authenticity of land documents</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-[#8b6947] text-xs">You can verify:</p>
              <div className="grid grid-cols-2 gap-2">
                {['Certificate of Occupancy', 'Deed of Assignment', 'Survey Plan', 'Governor\'s Consent', 'Right of Occupancy', 'Building Permit'].map((doc, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-[#faf8f5] rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0d6e5d]" />
                    <span className="text-[10px] text-[#0a2540]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 border border-[#c9a961]/20 shadow-xl text-center">
            <div className="w-16 h-16 border-4 border-[#c9a961]/30 border-t-[#0d6e5d] rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="font-serif text-[#0a2540] font-bold mb-1">Verifying Document</h3>
            <p className="text-[#8b6947] text-xs">Please wait while we check the database...</p>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="space-y-4">
            {/* Status Card */}
            <div className={`${getStatusConfig(result.status).bg} rounded-2xl p-4 border ${getStatusConfig(result.status).border}`}>
              <div className="flex items-center gap-3">
                {React.createElement(getStatusConfig(result.status).icon, { className: `w-8 h-8 ${getStatusConfig(result.status).color}` })}
                <div>
                  <h3 className={`font-serif font-bold ${getStatusConfig(result.status).color}`}>{getStatusConfig(result.status).label}</h3>
                  <p className="text-[#8b6947] text-xs">Document Number: {searchQuery}</p>
                </div>
              </div>
            </div>

            {/* Details Card */}
            {result.status === 'valid' && (
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-[#c9a961]/20 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] p-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#c9a961]" />
                    <h3 className="text-white font-serif font-bold">Document Details</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { label: 'Document Type', value: result.documentType },
                    { label: 'Owner Name', value: result.ownerName },
                    { label: 'Plot Number', value: result.plotNumber },
                    { label: 'Location', value: result.location },
                    { label: 'Registration Date', value: new Date(result.registrationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
                    { label: 'Valid Until', value: result.expiryDate ? new Date(result.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Perpetuity' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-[#c9a961]/10 last:border-0">
                      <span className="text-[#8b6947] text-xs">{item.label}</span>
                      <span className="text-[#0a2540] font-semibold text-xs text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invalid Result */}
            {result.status === 'invalid' && (
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-[#0a2540] font-bold text-sm mb-1">Document Not Found</h3>
                    <p className="text-[#8b6947] text-xs">The document number you entered does not exist in our database. Please check the number and try again, or contact support for assistance.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button onClick={() => { setResult(null); setSearchQuery(''); }} className="flex-1 py-3 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947] text-sm font-semibold">
                New Search
              </button>
              <button onClick={() => navigate('/dashboard')} className="flex-1 py-3 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white text-sm font-bold shadow-lg">
                <Home className="w-4 h-4 inline mr-1" /> Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}