import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Home, Building2, MapPin, Calendar, FileText,
  Download, Eye, ChevronRight, Crown, Wallet, TrendingUp,
  Clock, CheckCircle, Heart, Search, User
} from 'lucide-react';

interface Property {
  id: number; plotNumber: string; estate: string; location: string; size: number;
  type: string; purchaseDate: string; amount: number; status: 'completed' | 'processing' | 'pending';
  documents: string[];
}

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'properties' | 'saved'>('properties');

  const properties: Property[] = [
    { id: 1, plotNumber: 'LE-015', estate: 'Legacy Estate', location: 'Independence Layout', size: 650, type: 'Residential', purchaseDate: '2024-01-15', amount: 12500000, status: 'completed', documents: ['C of O', 'Deed', 'Survey Plan'] },
    { id: 2, plotNumber: 'RG-008', estate: 'Royal Gardens', location: 'Trans-Ekulu', size: 500, type: 'Residential', purchaseDate: '2024-02-20', amount: 9800000, status: 'processing', documents: ['Receipt'] },
  ];

  const savedEstates = [
    { id: 1, name: 'Diamond Heights', location: 'GRA', price: '₦18M - ₦35M', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400' },
    { id: 2, name: 'Green Valley Estate', location: 'New Haven', price: '₦5.5M - ₦9.5M', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400' },
  ];

  const formatCurrency = (amount: number) => '₦' + amount.toLocaleString();
  const totalValue = properties.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#c9a961]/20 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#faf8f5] rounded-xl">
            <ArrowLeft className="w-5 h-5 text-[#0a2540]" />
          </button>
          <div className="flex-1">
            <h1 className="font-serif text-[#0a2540] font-bold text-sm">My Portfolio</h1>
            <p className="text-[10px] text-[#8b6947]">{properties.length} properties owned</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        {/* Stats Card */}
        <div className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-2xl p-4 mb-4 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961]/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-[#c9a961]" />
              <span className="text-white/70 text-xs">Total Portfolio Value</span>
            </div>
            <p className="font-serif text-3xl font-bold mb-4">{formatCurrency(totalValue)}</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 rounded-xl p-2 text-center backdrop-blur-sm">
                <p className="font-bold text-lg">{properties.length}</p>
                <p className="text-[10px] text-white/70">Properties</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center backdrop-blur-sm">
                <p className="font-bold text-lg">{properties.filter(p => p.status === 'completed').length}</p>
                <p className="text-[10px] text-white/70">Completed</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center backdrop-blur-sm">
                <p className="font-bold text-lg">{savedEstates.length}</p>
                <p className="text-[10px] text-white/70">Saved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-1 mb-4 flex border border-[#c9a961]/20">
          <button onClick={() => setActiveTab('properties')} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'properties' ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white shadow-lg' : 'text-[#8b6947]'}`}>
            <Building2 className="w-4 h-4 inline mr-1" /> My Properties
          </button>
          <button onClick={() => setActiveTab('saved')} className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${activeTab === 'saved' ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white shadow-lg' : 'text-[#8b6947]'}`}>
            <Heart className="w-4 h-4 inline mr-1" /> Saved
          </button>
        </div>

        {activeTab === 'properties' ? (
          properties.length > 0 ? (
            <div className="space-y-3">
              {properties.map((property) => (
                <div key={property.id} className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[#c9a961]/20 overflow-hidden shadow-lg">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] rounded-xl flex items-center justify-center">
                          <Home className="w-6 h-6 text-[#c9a961]" />
                        </div>
                        <div>
                          <h3 className="font-serif text-[#0a2540] font-bold">{property.plotNumber}</h3>
                          <p className="text-[#8b6947] text-xs">{property.estate}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                        property.status === 'completed' ? 'bg-[#0d6e5d]/10 text-[#0d6e5d]' :
                        property.status === 'processing' ? 'bg-[#c9a961]/10 text-[#c9a961]' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {property.status === 'completed' ? '✓ Completed' : property.status === 'processing' ? '⏳ Processing' : '⏳ Pending'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1.5 text-[#8b6947]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#8b6947]">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{property.size} sqm</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#8b6947]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(property.purchaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#0f3d5c] font-bold">
                        <Wallet className="w-3.5 h-3.5" />
                        <span>{formatCurrency(property.amount)}</span>
                      </div>
                    </div>

                    {property.documents.length > 0 && (
                      <div className="flex items-center gap-2 pt-3 border-t border-[#c9a961]/10">
                        <FileText className="w-3.5 h-3.5 text-[#8b6947]" />
                        <span className="text-[10px] text-[#8b6947]">Documents:</span>
                        <div className="flex gap-1">
                          {property.documents.map((doc, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#faf8f5] rounded text-[10px] text-[#0a2540] font-medium">{doc}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-[#faf8f5] px-4 py-3 flex gap-2">
                    <button className="flex-1 py-2 bg-white border border-[#c9a961]/20 rounded-xl text-[#0a2540] text-xs font-semibold flex items-center justify-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                    <button className="flex-1 py-2 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1">
                      <Download className="w-3.5 h-3.5" /> Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-[#c9a961]" />
              </div>
              <h3 className="font-serif text-[#0a2540] font-bold mb-2">No Properties Yet</h3>
              <p className="text-[#8b6947] text-sm mb-4">Start building your portfolio today</p>
              <button onClick={() => navigate('/dashboard')} className="px-6 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white rounded-xl text-sm font-bold shadow-lg">
                Browse Estates
              </button>
            </div>
          )
        ) : (
          savedEstates.length > 0 ? (
            <div className="space-y-3">
              {savedEstates.map((estate) => (
                <div key={estate.id} onClick={() => navigate(`/estate/${estate.name.toLowerCase().replace(/\s+/g, '-')}`)} className="bg-white/90 backdrop-blur-xl rounded-2xl border border-[#c9a961]/20 overflow-hidden shadow-lg flex cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="w-24 h-24">
                    <img src={estate.image} alt={estate.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-[#0a2540] font-bold text-sm">{estate.name}</h3>
                      <div className="flex items-center gap-1 text-[#8b6947] text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{estate.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#0f3d5c] font-bold text-sm">{estate.price}</span>
                      <button className="p-1.5 bg-red-50 rounded-lg">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#c9a961]" />
              </div>
              <h3 className="font-serif text-[#0a2540] font-bold mb-2">No Saved Estates</h3>
              <p className="text-[#8b6947] text-sm mb-4">Save estates you're interested in</p>
              <button onClick={() => navigate('/search')} className="px-6 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] text-white rounded-xl text-sm font-bold shadow-lg">
                Explore Estates
              </button>
            </div>
          )
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard', active: false },
            { icon: Search, label: 'Search', path: '/search', active: false },
            { icon: Building2, label: 'Services', path: '/services/document-verification', active: false },
            { icon: Heart, label: 'Portfolio', path: '/portfolio', active: true },
            { icon: User, label: 'Profile', path: '/settings', active: false },
          ].map((item) => (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center py-1">
              <div className={`p-2 rounded-xl ${item.active ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]' : ''}`}>
                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-[#8b6947]'}`} />
              </div>
              <span className={`text-[10px] font-medium ${item.active ? 'text-[#0f3d5c]' : 'text-[#8b6947]'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}