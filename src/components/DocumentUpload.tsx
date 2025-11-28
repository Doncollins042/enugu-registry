import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Upload, FileText, Image, File, X, CheckCircle, 
  Clock, AlertCircle, Eye, Download, Trash2, Plus, Shield,
  MapPin, FileCheck, Stamp, ScrollText, ClipboardList, Building2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  category: string;
  size: number;
  uploadDate: string;
  status: 'pending' | 'verified' | 'rejected';
  previewUrl?: string;
}

const documentCategories = [
  { 
    id: 'survey_plan', 
    name: 'Survey Plan', 
    icon: MapPin,
    description: 'Registered survey plan showing plot boundaries',
    required: true
  },
  { 
    id: 'c_of_o', 
    name: 'Certificate of Occupancy (C of O)', 
    icon: Stamp,
    description: 'Government-issued certificate of land ownership',
    required: true
  },
  { 
    id: 'deed_of_assignment', 
    name: 'Deed of Assignment', 
    icon: ScrollText,
    description: 'Legal document transferring property rights',
    required: true
  },
  { 
    id: 'governors_consent', 
    name: "Governor's Consent", 
    icon: Shield,
    description: 'Approval for transfer of property ownership',
    required: false
  },
  { 
    id: 'plan_approval', 
    name: 'Plan Approval Document', 
    icon: ClipboardList,
    description: 'Building plan approval from relevant authority',
    required: false
  },
  { 
    id: 'receipt_of_purchase', 
    name: 'Receipt of Purchase', 
    icon: FileCheck,
    description: 'Payment receipt for property purchase',
    required: true
  },
  { 
    id: 'tax_clearance', 
    name: 'Tax Clearance Certificate', 
    icon: FileText,
    description: 'Evidence of tax payment',
    required: false
  },
  { 
    id: 'building_permit', 
    name: 'Building Permit', 
    icon: Building2,
    description: 'Permission to construct on the land',
    required: false
  },
  { 
    id: 'other', 
    name: 'Other Documents', 
    icon: File,
    description: 'Any other supporting documents',
    required: false
  },
];

export default function DocumentUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState<UploadedDocument[]>([
    // Demo documents
    {
      id: '1',
      name: 'Survey_Plan_Plot45.pdf',
      type: 'application/pdf',
      category: 'survey_plan',
      size: 2450000,
      uploadDate: '2024-01-15',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Certificate_of_Occupancy.pdf',
      type: 'application/pdf',
      category: 'c_of_o',
      size: 1890000,
      uploadDate: '2024-01-16',
      status: 'pending'
    }
  ]);
  const [previewDocument, setPreviewDocument] = useState<UploadedDocument | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyAddress: '',
    plotNumber: '',
    estateName: '',
    ownerName: ''
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryModal(false);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, JPG, and PNG files are allowed');
      return;
    }

    uploadDocument(file);
  };

  const uploadDocument = (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      const newDocument: UploadedDocument = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        category: selectedCategory,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
      };

      setDocuments(prev => [...prev, newDocument]);
      setUploading(false);
      setUploadProgress(0);
      setSelectedCategory('');
      toast.success('Document uploaded successfully!');
    }, 2500);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast.success('Document removed');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getCategoryName = (categoryId: string) => {
    return documentCategories.find(c => c.id === categoryId)?.name || categoryId;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
        );
    }
  };

  const getUploadedCount = (categoryId: string) => {
    return documents.filter(doc => doc.category === categoryId).length;
  };

  const requiredDocsComplete = documentCategories
    .filter(cat => cat.required)
    .every(cat => getUploadedCount(cat.id) > 0);

  const handleSubmitForVerification = () => {
    if (!requiredDocsComplete) {
      toast.error('Please upload all required documents');
      return;
    }
    if (!propertyDetails.propertyAddress || !propertyDetails.plotNumber) {
      toast.error('Please fill in property details');
      return;
    }
    toast.success('Documents submitted for verification!');
    navigate('/portfolio');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-8">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Upload Documents</h1>
            <p className="text-sm text-gray-600">Submit documents for land verification</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Document Verification</h2>
              <p className="text-blue-200 text-sm">
                Upload all required documents for your property to be verified by the Enugu State Land Registry. 
                Verified properties receive a digital certificate with QR code.
              </p>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Property Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Address *</label>
              <input
                type="text"
                placeholder="e.g., Plot 45, Independence Layout"
                value={propertyDetails.propertyAddress}
                onChange={(e) => setPropertyDetails({...propertyDetails, propertyAddress: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plot Number *</label>
              <input
                type="text"
                placeholder="e.g., EN-2024-0045"
                value={propertyDetails.plotNumber}
                onChange={(e) => setPropertyDetails({...propertyDetails, plotNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estate Name</label>
              <input
                type="text"
                placeholder="e.g., Legacy Estate"
                value={propertyDetails.estateName}
                onChange={(e) => setPropertyDetails({...propertyDetails, estateName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registered Owner Name</label>
              <input
                type="text"
                placeholder="Full name as on documents"
                value={propertyDetails.ownerName}
                onChange={(e) => setPropertyDetails({...propertyDetails, ownerName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Document Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Required Documents</h3>
            <span className="text-sm text-gray-500">
              {documents.length} uploaded
            </span>
          </div>

          <div className="space-y-3">
            {documentCategories.map((category) => {
              const uploadedDocs = documents.filter(doc => doc.category === category.id);
              const hasDocument = uploadedDocs.length > 0;
              
              return (
                <div 
                  key={category.id}
                  className={`border rounded-xl p-4 transition-all ${
                    hasDocument ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        hasDocument ? 'bg-emerald-100' : 'bg-gray-100'
                      }`}>
                        <category.icon className={`w-5 h-5 ${hasDocument ? 'text-emerald-600' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">{category.name}</p>
                          {category.required && (
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded">Required</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                        
                        {/* Uploaded documents for this category */}
                        {uploadedDocs.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {uploadedDocs.map((doc) => (
                              <div key={doc.id} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-gray-200">
                                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="text-sm text-gray-700 truncate flex-1">{doc.name}</span>
                                <span className="text-xs text-gray-400">{formatFileSize(doc.size)}</span>
                                {getStatusBadge(doc.status)}
                                <button 
                                  onClick={() => handleDeleteDocument(doc.id)}
                                  className="p-1 hover:bg-red-100 rounded text-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleCategorySelect(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 flex-shrink-0 ${
                        hasDocument 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-blue-900 text-white hover:bg-blue-800'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      {hasDocument ? 'Add More' : 'Upload'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600 animate-bounce" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Uploading document...</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{uploadProgress}% complete</p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Upload Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Accepted formats: PDF, JPG, PNG (max 10MB per file)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Ensure all documents are clear and legible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>All required documents must be uploaded before submission</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Verification typically takes 3-5 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>You will receive an email notification once verification is complete</span>
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">Ready to submit?</p>
              <p className="text-sm text-gray-500">
                {requiredDocsComplete 
                  ? 'All required documents uploaded' 
                  : 'Please upload all required documents'}
              </p>
            </div>
            <button
              onClick={handleSubmitForVerification}
              disabled={!requiredDocsComplete}
              className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                requiredDocsComplete
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Shield className="w-5 h-5" />
              Submit for Verification
            </button>
          </div>
        </div>

        {/* Verification Process */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Verification Process</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-900 font-bold">1</span>
              </div>
              <p className="font-medium text-gray-900">Upload Documents</p>
              <p className="text-sm text-gray-500 mt-1">Submit all required documents</p>
            </div>
            <div className="flex-1 text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-amber-900 font-bold">2</span>
              </div>
              <p className="font-medium text-gray-900">Review</p>
              <p className="text-sm text-gray-500 mt-1">Our team reviews your documents</p>
            </div>
            <div className="flex-1 text-center p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-900 font-bold">3</span>
              </div>
              <p className="font-medium text-gray-900">Certificate</p>
              <p className="text-sm text-gray-500 mt-1">Receive digital certificate with QR</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}