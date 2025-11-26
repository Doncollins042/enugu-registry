import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Upload, FileText, CheckCircle, AlertCircle, Send, ArrowLeft, X, File } from 'lucide-react';
import toast from 'react-hot-toast';

interface GovernorsConsentProps {
  user: any;
  onLogout: () => void;
  properties: any[];
  addNotification: (notification: { type: 'payment' | 'document' | 'system'; title: string; message: string }) => void;
}

export default function GovernorsConsent({ user, onLogout, properties, addNotification }: GovernorsConsentProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    propertyId: '',
    transactionType: 'sale',
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    amount: '',
  });
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: { name: string; size: string } | null }>({
    deedOfAssignment: null,
    surveyPlan: null,
    taxClearance: null,
    purchaseReceipt: null,
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState<any>(null);

  // Sample properties
  const availableProperties = [
    { id: '1', plotNumber: 'LP-001', estate: 'Legacy Estate', titleNumber: 'TN-12345' },
    { id: '2', plotNumber: 'LP-045', estate: 'Liberty Estate', titleNumber: 'TN-67890' },
    ...properties.map((p, i) => ({
      id: `user-${i}`,
      plotNumber: p.plotNumber,
      estate: p.estateName,
      titleNumber: p.titleNumber
    }))
  ];

  const requiredDocs = [
    { key: 'deedOfAssignment', label: 'Deed of Assignment', required: true },
    { key: 'surveyPlan', label: 'Survey Plan', required: true },
    { key: 'taxClearance', label: 'Tax Clearance Certificate', required: true },
    { key: 'purchaseReceipt', label: 'Purchase Receipt', required: true },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setUploadedDocs(prev => ({
        ...prev,
        [docKey]: { name: file.name, size: (file.size / 1024 / 1024).toFixed(2) + ' MB' }
      }));
      toast.success(`${requiredDocs.find(d => d.key === docKey)?.label} uploaded successfully`);
    }
  };

  const handleRemoveDoc = (docKey: string) => {
    setUploadedDocs(prev => ({ ...prev, [docKey]: null }));
    toast.success('Document removed');
  };

  const validateStep1 = () => {
    if (!formData.propertyId) {
      toast.error('Please select a property');
      return false;
    }
    if (!formData.buyerName.trim()) {
      toast.error('Please enter buyer\'s name');
      return false;
    }
    if (!formData.buyerPhone.trim()) {
      toast.error('Please enter buyer\'s phone number');
      return false;
    }
    if (!formData.buyerEmail.trim()) {
      toast.error('Please enter buyer\'s email');
      return false;
    }
    if (!formData.amount || parseInt(formData.amount) <= 0) {
      toast.error('Please enter a valid transaction amount');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const missingDocs = requiredDocs.filter(doc => doc.required && !uploadedDocs[doc.key]);
    if (missingDocs.length > 0) {
      toast.error(`Please upload: ${missingDocs.map(d => d.label).join(', ')}`);
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      toast.success('Transaction details saved. Please upload required documents.');
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      toast.success('Documents uploaded. Please review and submit.');
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    setProcessing(true);
    toast.loading('Submitting your application...', { id: 'submit' });

    setTimeout(() => {
      toast.dismiss('submit');
      setProcessing(false);
      setApplicationSubmitted(true);

      const details = {
        applicationId: `GC-${Date.now()}`,
        property: availableProperties.find(p => p.id === formData.propertyId),
        transactionType: formData.transactionType,
        buyerName: formData.buyerName,
        amount: parseInt(formData.amount),
        submissionDate: new Date().toLocaleDateString(),
        estimatedCompletion: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: 'Under Review',
        processingFee: 150000
      };
      setApplicationDetails(details);

      toast.success('Application submitted successfully!');

      addNotification({
        type: 'document',
        title: 'Governor\'s Consent Application Submitted',
        message: `Your application (${details.applicationId}) for ${details.property?.plotNumber} has been submitted. Estimated processing time: 14-21 business days.`
      });
    }, 3000);
  };

  const selectedProperty = availableProperties.find(p => p.id === formData.propertyId);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80" alt="Documents" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Governor's Consent Application</p>
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate('/portfolio')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Governor's Consent Application</h1>
            <p className="text-sm text-gray-600">Apply for government approval on property transactions</p>
          </div>

          {!applicationSubmitted ? (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
                {[
                  { num: 1, label: 'Details' },
                  { num: 2, label: 'Documents' },
                  { num: 3, label: 'Review' }
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        step >= s.num ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                      </div>
                      <span className="text-xs mt-1 text-gray-600 hidden sm:block">{s.label}</span>
                    </div>
                    {i < 2 && <div className={`w-8 sm:w-16 h-1 mx-2 rounded ${step > s.num ? 'bg-blue-900' : 'bg-gray-200'}`}></div>}
                  </div>
                ))}
              </div>

              {/* Step 1: Transaction Details */}
              {step === 1 && (
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Transaction Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Property *</label>
                      <select 
                        name="propertyId" 
                        value={formData.propertyId} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">-- Select a property --</option>
                        {availableProperties.map((prop) => (
                          <option key={prop.id} value={prop.id}>
                            {prop.plotNumber} - {prop.estate} ({prop.titleNumber})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type *</label>
                      <select 
                        name="transactionType" 
                        value={formData.transactionType} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="sale">Sale/Transfer</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="lease">Lease</option>
                        <option value="gift">Gift/Donation</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Buyer's Full Name *</label>
                        <input 
                          type="text" 
                          name="buyerName" 
                          value={formData.buyerName} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                          placeholder="Enter full legal name" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Buyer's Phone *</label>
                        <input 
                          type="tel" 
                          name="buyerPhone" 
                          value={formData.buyerPhone} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                          placeholder="+234 XXX XXX XXXX" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Buyer's Email *</label>
                        <input 
                          type="email" 
                          name="buyerEmail" 
                          value={formData.buyerEmail} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                          placeholder="buyer@example.com" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Amount (₦) *</label>
                        <input 
                          type="number" 
                          name="amount" 
                          value={formData.amount} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                          placeholder="e.g. 5000000" 
                        />
                      </div>
                    </div>

                    <button 
                      onClick={handleNextStep} 
                      className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
                    >
                      Continue to Documents
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Document Upload */}
              {step === 2 && (
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Upload Required Documents</h2>
                  
                  <div className="space-y-4 mb-6">
                    {requiredDocs.map((doc) => (
                      <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              uploadedDocs[doc.key] ? 'bg-emerald-100' : 'bg-gray-100'
                            }`}>
                              {uploadedDocs[doc.key] ? (
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                              ) : (
                                <FileText className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{doc.label} {doc.required && '*'}</p>
                              {uploadedDocs[doc.key] ? (
                                <p className="text-xs text-emerald-600">{uploadedDocs[doc.key]?.name} ({uploadedDocs[doc.key]?.size})</p>
                              ) : (
                                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                              )}
                            </div>
                          </div>
                          
                          {uploadedDocs[doc.key] ? (
                            <button
                              onClick={() => handleRemoveDoc(doc.key)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                            >
                              <X className="w-5 h-5 text-gray-600" />
                            </button>
                          ) : (
                            <label className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-800 transition-all">
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleDocUpload(doc.key, e)}
                              />
                              Upload
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={handlePrevStep} 
                      className="flex-1 py-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleNextStep} 
                      className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Review & Submit Application</h2>
                  
                  <div className="space-y-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">Transaction Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Property:</span>
                          <span className="text-gray-900 font-medium">{selectedProperty?.plotNumber} - {selectedProperty?.estate}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Transaction Type:</span>
                          <span className="text-gray-900 font-medium capitalize">{formData.transactionType}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Buyer:</span>
                          <span className="text-gray-900 font-medium">{formData.buyerName}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Amount:</span>
                          <span className="text-gray-900 font-medium">₦{parseInt(formData.amount).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">Uploaded Documents</h3>
                      <div className="space-y-2">
                        {requiredDocs.map(doc => (
                          <div key={doc.key} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-gray-700">{doc.label}</span>
                            <span className="text-gray-500">({uploadedDocs[doc.key]?.name})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-900 font-medium mb-1">Processing Fee: ₦150,000</p>
                          <p className="text-xs text-gray-700">This fee will be charged upon submission. Processing time is 14-21 business days.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={handlePrevStep} 
                      disabled={processing}
                      className="flex-1 py-3 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={processing}
                      className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                      {processing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-8 sm:p-12 text-center shadow-sm">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted Successfully!</h2>
              <p className="text-sm text-gray-600 mb-8">
                Your Governor's Consent application has been submitted and is now under review.
              </p>

              {applicationDetails && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-lg mx-auto text-left">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Application ID:</span>
                      <span className="text-sm font-mono font-bold text-gray-900">{applicationDetails.applicationId}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Property:</span>
                      <span className="text-sm text-gray-900">{applicationDetails.property?.plotNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="text-sm font-medium text-yellow-600">{applicationDetails.status}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Submission Date:</span>
                      <span className="text-sm text-gray-900">{applicationDetails.submissionDate}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-600">Est. Completion:</span>
                      <span className="text-sm text-gray-900">{applicationDetails.estimatedCompletion}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}