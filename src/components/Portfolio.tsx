import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Download, QrCode, Shield, MapPin, Calendar, ExternalLink, FileCheck, ArrowLeft, Eye, Copy, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface PortfolioProps {
  user: any;
  onLogout: () => void;
  properties: any[];
}

export default function Portfolio({ user, onLogout, properties }: PortfolioProps) {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);

  const handleDownloadDocument = (propertyId: string, docType: string) => {
    toast.loading(`Preparing ${docType}...`, { id: 'download' });
    setTimeout(() => {
      toast.dismiss('download');
      toast.success(`${docType} downloaded successfully!`);
    }, 1500);
  };

  const handleViewQR = (property: any) => {
    setSelectedProperty(property);
    setShowQRModal(true);
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleViewOnBlockchain = (txId: string) => {
    toast.success('Opening blockchain explorer...');
    // In production, this would open actual blockchain explorer
    window.open(`https://etherscan.io/tx/${txId}`, '_blank');
  };

  const handleApplyConsent = (property: any) => {
    toast.success('Navigating to Governor\'s Consent application...');
    navigate('/governors-consent');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Property QR Code</h3>
            <div className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center mb-4">
              Scan to verify ownership of <strong>{selectedProperty.plotNumber}</strong>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  toast.success('QR Code downloaded!');
                  setShowQRModal(false);
                }}
                className="flex-1 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-all text-sm"
              >
                Download QR
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">My Portfolio</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-all relative">
                  <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-600 truncate max-w-[120px]">{user?.email}</p>
                  </div>
                </div>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Property Portfolio</h1>
            <p className="text-sm text-gray-600">View and manage your property investments</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <Home className="w-6 h-6 text-blue-900 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Total Properties</p>
              <h3 className="text-xl font-bold text-gray-900">{properties.length}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <Shield className="w-6 h-6 text-emerald-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Verified</p>
              <h3 className="text-xl font-bold text-gray-900">{properties.length}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <Calendar className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Total Value</p>
              <h3 className="text-lg font-bold text-gray-900">₦{totalValue.toLocaleString()}</h3>
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm">
              <QrCode className="w-6 h-6 text-amber-600 mb-2" />
              <p className="text-xs text-gray-600 mb-1">Documents</p>
              <h3 className="text-xl font-bold text-gray-900">{properties.length * 3}</h3>
            </div>
          </div>

          {/* Properties List */}
          {properties.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-12 text-center shadow-sm">
              <Home className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Properties Yet</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                You haven't purchased any properties yet. Start exploring our verified estates and find your perfect investment.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="px-8 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                  {/* Property Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">Plot {property.plotNumber}</h3>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{property.estateName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">
                          Purchased: {property.purchaseDate 
                            ? new Date(property.purchaseDate).toLocaleDateString() 
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-gray-600 mb-1">Property Value</p>
                      <p className="text-2xl font-bold text-emerald-600">₦{(property.price || 0).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Title Number</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-mono text-gray-900">{property.titleNumber}</p>
                        <button 
                          onClick={() => handleCopyId(property.titleNumber)}
                          className="p-1 hover:bg-gray-200 rounded transition-all"
                          title="Copy"
                        >
                          {copiedId === property.titleNumber ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Blockchain Transaction</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-mono text-gray-900 truncate max-w-[180px]">{property.blockchainTxId}</p>
                        <button 
                          onClick={() => handleCopyId(property.blockchainTxId)}
                          className="p-1 hover:bg-gray-200 rounded transition-all"
                          title="Copy"
                        >
                          {copiedId === property.blockchainTxId ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain Verification Badge */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-emerald-700 font-medium">✓ Ownership Verified on Blockchain</span>
                    <button 
                      onClick={() => handleViewOnBlockchain(property.blockchainTxId)}
                      className="ml-auto text-xs text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1"
                    >
                      View on Explorer
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button 
                      onClick={() => handleViewQR(property)}
                      className="py-2.5 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-xs font-medium"
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </button>
                    <button 
                      onClick={() => handleDownloadDocument(property.id, 'Property Documents')}
                      className="py-2.5 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-xs font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleApplyConsent(property)}
                      className="py-2.5 bg-purple-50 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-100 transition-all flex items-center justify-center gap-2 text-xs font-medium"
                    >
                      <FileCheck className="w-4 h-4" />
                      Gov. Consent
                    </button>
                    <button 
                      onClick={() => {
                        toast.success('Opening property details...');
                      }}
                      className="py-2.5 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center gap-2 text-xs font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          {properties.length > 0 && (
            <div className="mt-8 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <button
                  onClick={() => navigate('/reports')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left"
                >
                  <Download className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Generate Reports</p>
                  <p className="text-xs text-gray-600">Download portfolio summary</p>
                </button>
                <button
                  onClick={() => navigate('/ground-rent')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left"
                >
                  <Calendar className="w-6 h-6 text-amber-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Pay Ground Rent</p>
                  <p className="text-xs text-gray-600">Manage annual payments</p>
                </button>
                <button
                  onClick={() => navigate('/verify')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left"
                >
                  <Shield className="w-6 h-6 text-emerald-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Verify Documents</p>
                  <p className="text-xs text-gray-600">Authenticate property docs</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}