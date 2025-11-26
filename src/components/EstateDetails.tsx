import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, LogOut, Bell, MapPin, Shield, Zap, Droplets, Sun, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface EstateDetailsProps {
  user: any;
  onLogout: () => void;
  onSelect: (estate: any) => void;
}

export default function EstateDetails({ user, onLogout, onSelect }: EstateDetailsProps) {
  const navigate = useNavigate();
  const { name } = useParams();
  const [processing, setProcessing] = useState(false);

  const estate = {
    name: 'Legacy Estate',
    location: 'Independence Layout, Enugu',
    description: 'Premium residential estate with modern infrastructure and 24/7 security',
    totalPlots: 87,
    availablePlots: 45,
    priceRange: '₦5,000,000 - ₦12,000,000',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  };

  const features = [
    { icon: Shield, label: '24/7 Security' },
    { icon: Sun, label: 'Street Lights' },
    { icon: Zap, label: 'Electricity' },
    { icon: Droplets, label: 'Water Supply' },
    { icon: MapPin, label: 'Paved Roads' },
    { icon: Home, label: 'Drainage System' },
  ];

  const handlePayment = () => {
    setProcessing(true);
    toast.success('Processing payment...');
    setTimeout(() => {
      onSelect(estate);
      toast.success('Payment successful! Viewing survey plan...');
      navigate(`/survey/${name}`);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Property" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Estate Details</p>
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

        <div className="max-w-6xl mx-auto px-6 py-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                <img src={estate.image} alt={estate.name} className="w-full h-64 object-cover" />
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{estate.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{estate.location}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{estate.description}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Estate Features</h2>
                <div className="grid grid-cols-3 gap-4">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-blue-900" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="text-base font-bold text-gray-900 mb-4">Property Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Price Range</p>
                    <p className="text-lg font-bold text-emerald-600">{estate.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Plots</p>
                    <p className="text-base font-bold text-gray-900">{estate.totalPlots} plots</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Available</p>
                    <p className="text-base font-bold text-gray-900">{estate.availablePlots} plots</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-xs font-medium text-amber-800 mb-1">Search Fee Required</p>
                  <p className="text-xl font-bold text-amber-900">₦30,000</p>
                  <p className="text-xs text-amber-700 mt-2">One-time payment to view survey plan</p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    'Pay & View Survey Plan'
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center mt-3">Instant access after payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}