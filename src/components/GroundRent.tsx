import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Receipt, Search, Calendar, CheckCircle, Clock,
  AlertCircle, CreditCard, Building2, FileText, ChevronRight,
  Plus, History
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function GroundRent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  // Empty for new users - would come from API
  const [paymentHistory] = useState<any[]>([]);
  const [pendingPayments] = useState<any[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a property ID or file number');
      return;
    }
    setSearching(true);
    // Simulate search
    setTimeout(() => {
      setSearching(false);
      // For demo - no result found for new users
      toast.error('No property found with this ID. Please check and try again.');
      setSearchResult(null);
    }, 1500);
  };

  const handlePayment = () => {
    if (searchResult) {
      navigate('/payment', { 
        state: { 
          type: 'Ground Rent',
          amount: searchResult.amount,
          description: `Ground Rent - ${searchResult.propertyId}`,
          reference: 'GR' + Date.now()
        }
      });
    }
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
            <h1 className="text-xl font-bold text-gray-900">Ground Rent</h1>
            <p className="text-sm text-gray-600">Pay your annual ground rent</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                Ground rent is an annual fee payable to the government for land ownership. 
                Search for your property to view and pay any outstanding ground rent.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pay')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'pay'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pay Ground Rent
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === 'history'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment History
            </button>
          </div>

          <div className="p-6">
            {/* Pay Tab */}
            {activeTab === 'pay' && (
              <div className="space-y-6">
                {/* Search Box */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Property
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter Property ID or File Number"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      disabled={searching}
                      className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50"
                    >
                      {searching ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>

                {/* Pending Payments for User */}
                {pendingPayments.length > 0 ? (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Your Pending Payments</h3>
                    <div className="space-y-3">
                      {pendingPayments.map((payment: any) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{payment.propertyId}</p>
                            <p className="text-sm text-gray-600">{payment.year} Ground Rent</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-gray-900">{payment.amount}</p>
                            <button 
                              onClick={() => navigate('/payment')}
                              className="px-4 py-2 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800"
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Receipt className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Ground Rent</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">
                      You don't have any pending ground rent payments. Search for a property to check its status.
                    </p>
                  </div>
                )}

                {/* Search Result */}
                {searchResult && (
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Property Found</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property ID</span>
                        <span className="font-medium">{searchResult.propertyId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium">{searchResult.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year</span>
                        <span className="font-medium">{searchResult.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          searchResult.status === 'paid' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {searchResult.status}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Amount Due</span>
                        <span className="font-bold text-blue-900">{searchResult.amount}</span>
                      </div>
                    </div>
                    {searchResult.status !== 'paid' && (
                      <button
                        onClick={handlePayment}
                        className="w-full mt-4 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <>
                {paymentHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <History className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      You haven't made any ground rent payments yet. Your payment history will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {paymentHistory.map((payment: any) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{payment.propertyId}</p>
                            <p className="text-sm text-gray-500">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{payment.amount}</p>
                          <p className="text-xs text-gray-500">{payment.reference}</p>
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