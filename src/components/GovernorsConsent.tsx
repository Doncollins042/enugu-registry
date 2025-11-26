import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Scale, FileText, Upload, CheckCircle, Clock,
  AlertCircle, ChevronRight, Plus, FolderOpen, Eye, Download
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function GovernorsConsent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'apply' | 'applications'>('apply');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyId: '',
    propertyAddress: '',
    applicantName: '',
    applicantPhone: '',
    applicantEmail: '',
    purpose: '',
  });

  // Empty for new users - would come from API
  const [applications] = useState<any[]>([]);

  const handleSubmit = () => {
    if (!formData.propertyId || !formData.applicantName || !formData.purpose) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('Application submitted successfully!');
    navigate('/payment', {
      state: {
        type: "Governor's Consent",
        amount: 150000,
        description: `Governor's Consent - ${formData.propertyId}`,
        reference: 'GC' + Date.now()
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Governor's Consent</h1>
            <p className="text-sm text-gray-600">Apply for property transfer consent</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                Governor's Consent is required for the transfer of property ownership in Nigeria. 
                This process validates the legal transfer of landed property from one party to another.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('apply')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'apply'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              New Application
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'applications'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Applications
            </button>
          </div>

          <div className="p-6">
            {/* Apply Tab */}
            {activeTab === 'apply' && (
              <div className="space-y-6">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                        step >= s ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                      </div>
                      {s < 3 && (
                        <div className={`w-20 lg:w-32 h-1 mx-2 ${step > s ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Property Details */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Property Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property ID / File Number *</label>
                      <input
                        type="text"
                        value={formData.propertyId}
                        onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                        placeholder="Enter property ID"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
                      <textarea
                        value={formData.propertyAddress}
                        onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                        placeholder="Enter full property address"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Step 2: Applicant Details */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Applicant Information</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.applicantPhone}
                        onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.applicantEmail}
                        onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Purpose & Documents */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Purpose & Documents</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Application *</label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select purpose</option>
                        <option value="transfer">Property Transfer</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="sublease">Sublease</option>
                        <option value="assignment">Assignment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                        <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                        <input type="file" className="hidden" multiple />
                        <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                          Select Files
                        </button>
                      </div>
                    </div>
                    
                    {/* Fee Summary */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Fee Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Fee</span>
                          <span>₦100,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Administrative Fee</span>
                          <span>₦50,000</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-blue-900">₦150,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800"
                      >
                        Submit & Pay
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      You haven't submitted any Governor's Consent applications. Start a new application to get property transfer approval.
                    </p>
                    <button
                      onClick={() => setActiveTab('apply')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800"
                    >
                      <Plus className="w-5 h-5" />
                      New Application
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.map((app: any) => (
                      <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            app.status === 'approved' ? 'bg-emerald-100' :
                            app.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                          }`}>
                            {app.status === 'approved' ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{app.propertyId}</p>
                            <p className="text-sm text-gray-500">Submitted: {app.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {app.status}
                          </span>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Eye className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}