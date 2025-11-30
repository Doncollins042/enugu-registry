import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Receipt,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  CreditCard,
  Building2,
  MapPin,
  Clock,
  Download,
  FileText,
  Sparkles,
  History,
  Wallet,
  Search as SearchIcon,
  Home,
  Search,
  Heart,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Property {
  id: string;
  address: string;
  plotNumber: string;
  annualRent: number;
  lastPayment: string;
  status: 'paid' | 'due' | 'overdue';
  yearsOwed: number;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  year: string;
  receiptNumber: string;
}

const GroundRent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Demo properties
  const [properties] = useState<Property[]>([
    {
      id: '1',
      address: 'Plot 15, Block A, Legacy Estate, Independence Layout',
      plotNumber: 'EN/IL/LE/015',
      annualRent: 25000,
      lastPayment: '2023-12-15',
      status: 'paid',
      yearsOwed: 0,
    },
    {
      id: '2',
      address: 'Plot 7, Royal Gardens, Trans-Ekulu',
      plotNumber: 'EN/TE/RG/007',
      annualRent: 20000,
      lastPayment: '2022-06-20',
      status: 'due',
      yearsOwed: 2,
    },
    {
      id: '3',
      address: 'Plot 32, Diamond Heights, New Haven',
      plotNumber: 'EN/NH/DH/032',
      annualRent: 35000,
      lastPayment: '2020-11-10',
      status: 'overdue',
      yearsOwed: 4,
    },
  ]);

  // Demo payment history
  const [paymentHistory] = useState<PaymentHistory[]>([
    {
      id: '1',
      date: '2023-12-15',
      amount: 25000,
      year: '2024',
      receiptNumber: 'GR-2023-001234',
    },
    {
      id: '2',
      date: '2022-12-20',
      amount: 25000,
      year: '2023',
      receiptNumber: 'GR-2022-009876',
    },
    {
      id: '3',
      date: '2021-12-18',
      amount: 20000,
      year: '2022',
      receiptNumber: 'GR-2021-005432',
    },
  ]);

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'due':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'overdue':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return CheckCircle2;
      case 'due':
        return Clock;
      case 'overdue':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const handleYearToggle = (year: number) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year].sort());
    }
  };

  const totalAmount = selectedProperty
    ? selectedYears.length * selectedProperty.annualRent
    : 0;

  const handlePayment = () => {
    if (!selectedProperty || selectedYears.length === 0) {
      toast.error('Please select a property and years to pay');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Ground rent payment successful!');
      setSelectedProperty(null);
      setSelectedYears([]);
    }, 2000);
  };

  const filteredProperties = properties.filter(
    (p) =>
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.plotNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#0f3d5c] to-[#0d6e5d] pt-4 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="font-serif text-white text-xl font-bold">Ground Rent</h1>
              <p className="text-white/70 text-xs">Pay your annual ground rent</p>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
            <button
              onClick={() => setActiveTab('pay')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'pay'
                  ? 'bg-white text-[#0f3d5c] shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4" />
              Pay Rent
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-white text-[#0f3d5c] shadow-lg'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              History
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Pulled up */}
      <div className="px-4 -mt-8 relative z-10 space-y-6">
        {activeTab === 'pay' ? (
          <>
            {/* Search */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6947]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by address or plot number..."
                  className="w-full pl-12 pr-4 py-3 bg-[#faf8f5] border border-[#c9a961]/30 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d] focus:ring-2 focus:ring-[#0d6e5d]/20"
                />
              </div>
            </div>

            {/* Properties List */}
            <div className="space-y-3">
              <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#c9a961]" />
                Your Properties
              </h3>
              {filteredProperties.map((property) => {
                const StatusIcon = getStatusIcon(property.status);
                const isSelected = selectedProperty?.id === property.id;
                return (
                  <button
                    key={property.id}
                    onClick={() => {
                      setSelectedProperty(property);
                      setSelectedYears([]);
                    }}
                    className={`w-full bg-white/95 backdrop-blur-xl rounded-2xl p-4 border transition-all text-left ${
                      isSelected
                        ? 'border-[#0d6e5d] ring-2 ring-[#0d6e5d]/20 shadow-xl'
                        : 'border-[#c9a961]/20 shadow-lg hover:border-[#c9a961]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#0f3d5c]/10 to-[#0d6e5d]/10 rounded-xl flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#0d6e5d]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#8b6947]">{property.plotNumber}</p>
                          <p className="text-sm font-medium text-[#0a2540]">
                            {formatPrice(property.annualRent)}/year
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                          property.status
                        )}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-[#8b6947] mb-2">{property.address}</p>
                    {property.yearsOwed > 0 && (
                      <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{property.yearsOwed} year(s) outstanding</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Year Selection */}
            {selectedProperty && (
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
                <h3 className="font-serif text-[#0a2540] font-bold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c9a961]" />
                  Select Years to Pay
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => handleYearToggle(year)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedYears.includes(year)
                          ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white shadow-lg'
                          : 'bg-[#faf8f5] text-[#8b6947] border border-[#c9a961]/20 hover:border-[#c9a961]'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                {selectedYears.length > 0 && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-[#0f3d5c]/5 to-[#0d6e5d]/5 rounded-xl border border-[#0d6e5d]/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#8b6947]">
                        {selectedYears.length} year(s) × {formatPrice(selectedProperty.annualRent)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0a2540]">Total Amount</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] bg-clip-text text-transparent">
                        {formatPrice(totalAmount)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Info Card */}
            <div className="bg-gradient-to-r from-[#c9a961]/10 to-[#8b6947]/5 rounded-2xl p-4 border border-[#c9a961]/20 flex gap-3">
              <Sparkles className="w-5 h-5 text-[#c9a961] flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#0a2540]">Annual Ground Rent</p>
                <p className="text-xs text-[#8b6947]">
                  Ground rent is payable annually to the Enugu State Government. Timely payment
                  ensures your land rights remain valid and up-to-date.
                </p>
              </div>
            </div>

            {/* Pay Button */}
            {selectedProperty && selectedYears.length > 0 && (
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-2xl text-white font-semibold shadow-xl shadow-[#c9a961]/30 flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-2xl transition-all"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay {formatPrice(totalAmount)}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </>
        ) : (
          <>
            {/* Payment History */}
            <div className="space-y-4">
              <h3 className="font-serif text-[#0a2540] font-bold flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#c9a961]" />
                Payment History
              </h3>
              {paymentHistory.length > 0 ? (
                paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0a2540]">
                            {formatPrice(payment.amount)}
                          </p>
                          <p className="text-xs text-[#8b6947]">For Year {payment.year}</p>
                        </div>
                      </div>
                      <button className="p-2 bg-[#faf8f5] rounded-xl hover:bg-[#c9a961]/10 transition-colors">
                        <Download className="w-4 h-4 text-[#8b6947]" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#8b6947] bg-[#faf8f5] rounded-xl px-3 py-2">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {payment.receiptNumber}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 border border-[#c9a961]/20 shadow-xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#c9a961]/20 to-[#8b6947]/10 rounded-2xl flex items-center justify-center">
                    <Receipt className="w-8 h-8 text-[#c9a961]" />
                  </div>
                  <h3 className="font-serif text-[#0a2540] font-bold mb-2">No Payment History</h3>
                  <p className="text-sm text-[#8b6947]">
                    You haven't made any ground rent payments yet.
                  </p>
                </div>
              )}
            </div>

            {/* Summary Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#c9a961]/20 shadow-xl">
              <h3 className="font-serif text-[#0a2540] font-bold mb-3">Payment Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#faf8f5] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#0d6e5d]">{paymentHistory.length}</p>
                  <p className="text-xs text-[#8b6947]">Total Payments</p>
                </div>
                <div className="bg-[#faf8f5] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#0a2540]">
                    {formatPrice(paymentHistory.reduce((sum, p) => sum + p.amount, 0))}
                  </p>
                  <p className="text-xs text-[#8b6947]">Total Paid</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard' },
            { icon: Search, label: 'Search', path: '/search' },
            { icon: Building2, label: 'Services', path: '/services/document-verification' },
            { icon: Heart, label: 'Portfolio', path: '/portfolio' },
            { icon: User, label: 'Profile', path: '/settings' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center py-1"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d]'
                    : ''
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive(item.path) ? 'text-white' : 'text-[#8b6947]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive(item.path) ? 'text-[#0f3d5c]' : 'text-[#8b6947]'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default GroundRent;