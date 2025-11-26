import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Upload, CheckCircle, Clock, Shield, ArrowLeft, X, File } from 'lucide-react';
import toast from 'react-hot-toast';

interface DocumentVerificationProps {
  user: any;
  onLogout: () => void;
  addNotification: (notification: { type: 'payment' | 'document' | 'system'; title: string; message: string }) => void;
}

export default function DocumentVerification({ user, onLogout, addNotification }: DocumentVerificationProps) {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const tiers = [
    {
      id: 'standard',
      name: 'Standard Verification',
      price: 15000,
      duration: '5-7 business days',
      features: ['Document Authentication', 'Government Seal Verification', 'Digital Certificate', 'Email Notification']
    },
    {
      id: 'express',
      name: 'Express Verification',
      price: 25000,
      duration: '24-48 hours',
      features: ['Priority Processing', 'All Standard Features', 'SMS + Email Alerts', 'Dedicated Support Line']
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF, JPG, or PNG file');
        return;
      }
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      });
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    toast.success('File removed');
  };

  const handleVerify = () => {
    if (!selectedTier) {
      toast.error('Please select a verification tier');
      return;
    }
    if (!uploadedFile) {
      toast.error('Please upload a document to verify');
      return;
    }

    setVerifying(true);
    toast.loading('Processing your verification request...', { id: 'verifying' });

    // Simulate verification process
    setTimeout(() => {
      toast.dismiss('verifying');
      setVerifying(false);
      setVerified(true);
      
      const result = {
        verificationId: `VER-${Date.now()}`,
        documentName: uploadedFile.name,
        tier: selectedTier,
        status: 'Verified',
        date: new Date().toLocaleDateString(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };
      setVerificationResult(result);
      
      toast.success('Document verified successfully!');
      
      addNotification({
        type: 'document',
        title: 'Document Verified Successfully',
        message: `Your document "${uploadedFile.name}" has been verified. Verification ID: ${result.verificationId}`
      });
    }, 3000);
  };

  const handleNewVerification = () => {
    setSelectedTier('');
    setUploadedFile(null);
    setVerified(false);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80" alt="Documents" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Document Verification</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <LogOut className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Verification Service</h1>
            <p className="text-sm text-gray-600">Verify the authenticity of your property documents with government-backed verification</p>
          </div>

          {!verified ? (
            <>
              {/* Verification Tiers */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {tiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    disabled={verifying}
                    className={`text-left bg-white/90 backdrop-blur-sm border-2 rounded-lg p-6 transition-all ${
                      selectedTier === tier.id ? 'border-blue-900 shadow-lg ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
                    } ${verifying ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{tier.name}</h3>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Processing: {tier.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">₦{tier.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {selectedTier === tier.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="text-xs font-medium text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                          ✓ Selected
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Upload Section */}
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Document</h2>
                
                {!uploadedFile ? (
                  <label className={`border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all block ${verifying ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                      disabled={verifying}
                    />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-600">PDF, JPG, PNG (Max 10MB)</p>
                  </label>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-600">{uploadedFile.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleRemoveFile}
                      disabled={verifying}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleVerify}
                  disabled={!selectedTier || !uploadedFile || verifying}
                  className="w-full mt-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Verification...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Submit for Verification (₦{selectedTier ? tiers.find(t => t.id === selectedTier)?.price.toLocaleString() : '0'})
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-8 sm:p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Document Verified Successfully!</h2>
              <p className="text-sm text-gray-600 mb-8">
                Your document has been verified and authenticated by Enugu State Government
              </p>

              {verificationResult && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Verification ID:</span>
                      <span className="text-sm font-mono font-bold text-gray-900">{verificationResult.verificationId}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Document:</span>
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{verificationResult.documentName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="text-sm font-bold text-emerald-600">{verificationResult.status}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Verified On:</span>
                      <span className="text-sm text-gray-900">{verificationResult.date}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Valid Until:</span>
                      <span className="text-sm text-gray-900">{verificationResult.validUntil}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleNewVerification}
                  className="px-6 py-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
                >
                  Verify Another Document
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}