import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Building2, MapPin, FileText, Download, Eye,
  Wallet, TrendingUp, Clock, CheckCircle, Search, Filter,
  ChevronRight, Plus, FolderOpen
} from 'lucide-react';

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'properties' | 'transactions' | 'documents'>('properties');
  
  // Empty arrays for new users - these would come from API
  const [properties] = useState<any[]>([]);
  const [transactions] = useState<any[]>([]);
  const [documents] = useState<any[]>([]);

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: Building2, color: 'blue' },
    { label: 'Total Value', value: '₦0', icon: TrendingUp, color: 'emerald' },
    { label: 'Pending', value: 0, icon: Clock, color: 'amber' },
    { label: 'Completed', value: 0, icon: CheckCircle, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Portfolio</h1>
            <p className="text-sm text-gray-600">Manage your properties and transactions</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'properties'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Properties
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'transactions'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'documents'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Documents
            </button>
          </div>

          <div className="p-6">
            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <>
                {properties.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Start building your real estate portfolio by purchasing your first property.
                    </p>
                    <button
                      onClick={() => navigate('/search')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800"
                    >
                      <Plus className="w-5 h-5" />
                      Browse Properties
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {properties.map((property: any) => (
                      <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex gap-4">
                          <img src={property.image} alt="" className="w-24 h-24 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{property.name}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {property.location}
                            </p>
                            <p className="text-blue-900 font-bold mt-2">{property.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <>
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Your transaction history will appear here once you make your first purchase or payment.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((tx: any) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{tx.type}</p>
                          <p className="text-sm text-gray-500">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{tx.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <>
                {documents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Your property documents, certificates, and receipts will be stored here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">{doc.date}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Download className="w-5 h-5 text-gray-600" />
                        </button>
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