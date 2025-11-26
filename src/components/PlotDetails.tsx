import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Download, FileText, ArrowLeft } from 'lucide-react';

interface PlotDetailsProps {
  user: any;
  onLogout: () => void;
  plot: any;
}

export default function PlotDetails({ user, onLogout, plot }: PlotDetailsProps) {
  const navigate = useNavigate();

  const plotInfo = {
    id: plot?.id || 'LP-001',
    size: '500sqm',
    dimensions: '25m × 20m',
    block: 'A',
    price: 5000000,
  };

  const breakdown = [
    { label: 'Plot Price', amount: 5000000 },
    { label: 'Legal Fee', amount: 150000 },
    { label: 'Survey Fee', amount: 80000 },
    { label: 'Registration Fee', amount: 50000 },
    { label: 'Documentation', amount: 30000 },
  ];

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  const documents = [
    { name: 'Survey Plan', type: 'PDF' },
    { name: 'Certificate of Occupancy', type: 'PDF' },
    { name: 'Approved Layout', type: 'PDF' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Plot Details</p>
                </div>
              </div>
              <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <LogOut className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Survey Plan
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Plot {plotInfo.id}</h1>
                
                <div className="bg-gray-100 rounded-lg p-8 mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 border-4 border-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <span className="text-lg font-bold text-gray-900">{plotInfo.size}</span>
                    </div>
                    <p className="text-sm text-gray-600">Dimensions: {plotInfo.dimensions}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-900">Payment Breakdown</h2>
                  {breakdown.map((item, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span className="text-sm font-bold text-gray-900">₦{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-4 border-t-2 border-gray-300">
                    <span className="text-base font-bold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-emerald-600">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Available Documents</h2>
                <div className="space-y-3">
                  {documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-900" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-600">{doc.type} Document</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all text-xs font-medium flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="text-base font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Plot Number</p>
                    <p className="text-base font-bold text-gray-900">{plotInfo.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Plot Size</p>
                    <p className="text-base font-bold text-gray-900">{plotInfo.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Block</p>
                    <p className="text-base font-bold text-gray-900">Block {plotInfo.block}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-emerald-600">₦{total.toLocaleString()}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/payment')}
                  className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}