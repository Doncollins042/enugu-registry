import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Shield, CheckCircle, XCircle, Clock,
  FileText, QrCode, Camera, Upload, AlertCircle, Sparkles,
  Download, Share2, Printer, User, MapPin, Calendar, Award
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DocumentVerification() {
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState<'manual' | 'qr'>('manual');
  const [documentNumber, setDocumentNumber] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = () => {
    if (!documentNumber.trim()) {
      toast.error('Please enter a document number');
      return;
    }

    setSearching(true);
    setResult(null);

    setTimeout(() => {
      setSearching(false);
      
      if (documentNumber.toLowerCase().includes('en') || documentNumber.length > 5) {
        setResult({
          status: 'verified',
          documentNumber: documentNumber.toUpperCase(),
          propertyId: 'PROP-2024-' + Math.floor(Math.random() * 10000),
          owner: 'Chief Emmanuel Okonkwo',
          location: 'Plot 45, Legacy Estate, Independence Layout, Enugu',
          registrationDate: '15th January, 2024',
          expiryDate: '14th January, 2074',
          type: 'Certificate of Occupancy (C of O)',
          size: '900 sqm',
          lga: 'Enugu North',
          commissioner: 'Hon. Barr. Peter Mbah',
          commissionerTitle: 'Commissioner for Lands & Urban Development',
          fileNumber: 'EN/LANDS/COO/2024/00456',
          qrCode: `ESDLRTH-${documentNumber.toUpperCase()}-${Date.now()}`
        });
        toast.success('Document verified successfully!');
      } else {
        setResult({
          status: 'not_found'
        });
        toast.error('Document not found');
      }
    }, 2000);
  };

  const handleQRScan = () => {
    toast('QR Scanner opening...', { icon: '📷' });
  };

  const handleDownloadCertificate = () => {
    toast.success('Certificate downloaded!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Land Document Verification',
        text: `Document ${result.documentNumber} has been verified by Enugu State Land Registry`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Verification link copied!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Verify Document</h1>
            <p className="text-sm text-gray-600">Check document authenticity</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Government Verified Security</h2>
              <p className="text-blue-200 text-sm">
                All property documents are verified against the Enugu State Land Registry. 
                Enter your document number or scan the QR code to verify authenticity instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Method Toggle */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setSearchMethod('manual')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all flex items-center justify-center gap-2 ${
                searchMethod === 'manual'
                  ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <Search className="w-4 h-4" />
              Enter Document Number
            </button>
            <button
              onClick={() => setSearchMethod('qr')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all flex items-center justify-center gap-2 ${
                searchMethod === 'qr'
                  ? 'border-blue-900 text-blue-900 bg-blue-50/50'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <QrCode className="w-4 h-4" />
              Scan QR Code
            </button>
          </div>

          <div className="p-6">
            {searchMethod === 'manual' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document / Certificate Number
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., EN/2024/COO/12345"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  disabled={searching}
                  className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {searching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Verify Document
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Camera preview</p>
                  </div>
                </div>
                <button
                  onClick={handleQRScan}
                  className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-600 transition-all"
                >
                  Start Scanning
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Position the QR code within the frame to scan
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {result && (
          <>
            {result.status === 'verified' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:shadow-none">
                {/* Verified Header */}
                <div className="bg-emerald-500 text-white p-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Document Verified ✓</p>
                    <p className="text-emerald-100 text-sm">This document is authentic and registered with Enugu State</p>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  {/* QR Code Section */}
                  <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200">
                        <div className="text-center">
                          <QrCode className="w-16 h-16 text-gray-800 mx-auto" />
                          <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center mt-2 font-mono">{result.qrCode.substring(0, 20)}...</p>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-medium text-amber-600">VERIFIED DOCUMENT</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{result.type}</h3>
                      <p className="text-gray-600 text-sm">File No: {result.fileNumber}</p>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Document Number</p>
                        <p className="font-semibold text-gray-900">{result.documentNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Property Owner</p>
                        <p className="font-semibold text-gray-900">{result.owner}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Property Location</p>
                        <p className="font-semibold text-gray-900">{result.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Registration Date</p>
                        <p className="font-semibold text-gray-900">{result.registrationDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Valid Until</p>
                        <p className="font-semibold text-gray-900">{result.expiryDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Plot Size</p>
                        <p className="font-semibold text-gray-900">{result.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Commissioner Signature */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Authorized By</p>
                        <p className="font-bold text-gray-900">{result.commissioner}</p>
                        <p className="text-sm text-gray-600">{result.commissionerTitle}</p>
                        <p className="text-xs text-gray-500 mt-1">Enugu State Government</p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-16 border-b-2 border-gray-400 flex items-end justify-center mb-1">
                          <span className="text-gray-400 italic text-sm">Signature</span>
                        </div>
                        <div className="w-16 h-16 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-xs text-blue-900 font-bold">SEAL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span>Verified on {new Date().toLocaleString()}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 print:hidden">
                    <button
                      onClick={handleDownloadCertificate}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl overflow-hidden">
                <div className="bg-red-500 text-white p-4 flex items-center gap-3">
                  <XCircle className="w-6 h-6" />
                  <div>
                    <p className="font-bold">Document Not Found</p>
                    <p className="text-red-100 text-sm">This document could not be verified</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-700">
                        The document number you entered was not found in our registry. This could mean:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>The document number was entered incorrectly</li>
                        <li>The document is not registered with Enugu State</li>
                        <li>The document may be fraudulent</li>
                      </ul>
                      <p className="text-sm text-gray-700 mt-3">
                        Please double-check the number or contact support for assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Verification Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-900 text-xs font-bold">1</span>
              </div>
              <p className="text-sm text-gray-600">Enter the exact document number as shown on your certificate</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-900 text-xs font-bold">2</span>
              </div>
              <p className="text-sm text-gray-600">For faster verification, use the QR code scanner if your document has one</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-900 text-xs font-bold">3</span>
              </div>
              <p className="text-sm text-gray-600">Contact support if you have issues verifying a legitimate document</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}