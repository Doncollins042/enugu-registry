import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Download, FileText, Printer, Calendar, ArrowLeft, CheckCircle, File, Table, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportsProps {
  user: any;
  onLogout: () => void;
  properties: any[];
}

export default function Reports({ user, onLogout, properties }: ReportsProps) {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('');
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  const reportTypes = [
    { 
      id: 'portfolio', 
      name: 'Property Portfolio Report', 
      desc: 'Complete overview of all your properties with valuations',
      icon: Home,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: 'transactions', 
      name: 'Transaction History', 
      desc: 'Detailed payment and purchase records',
      icon: Table,
      color: 'bg-emerald-50 text-emerald-600'
    },
    { 
      id: 'certificates', 
      name: 'Property Certificates', 
      desc: 'Download all ownership documents and certificates',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600'
    },
    { 
      id: 'tax', 
      name: 'Tax Summary Report', 
      desc: 'Ground rent and tax payment history',
      icon: BarChart3,
      color: 'bg-amber-50 text-amber-600'
    },
  ];

  const handleGenerateReport = () => {
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }

    setGenerating(true);
    toast.loading('Generating your report...', { id: 'report' });

    setTimeout(() => {
      toast.dismiss('report');
      setGenerating(false);
      setReportGenerated(true);

      const selectedReport = reportTypes.find(r => r.id === reportType);
      setGeneratedReport({
        id: `RPT-${Date.now()}`,
        type: selectedReport?.name,
        generatedAt: new Date().toLocaleString(),
        recordCount: reportType === 'portfolio' ? properties.length : Math.floor(Math.random() * 20) + 5,
        fileSize: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
        dateRange: dateRange.from && dateRange.to 
          ? `${new Date(dateRange.from).toLocaleDateString()} - ${new Date(dateRange.to).toLocaleDateString()}`
          : 'All Time'
      });

      toast.success('Report generated successfully!');
    }, 2500);
  };

  const handleDownload = (format: string) => {
    if (!reportGenerated) {
      toast.error('Please generate a report first');
      return;
    }

    toast.loading(`Preparing ${format.toUpperCase()} download...`, { id: 'download' });

    setTimeout(() => {
      toast.dismiss('download');
      toast.success(`Report downloaded as ${format.toUpperCase()}`);
    }, 1500);
  };

  const handlePrint = () => {
    if (!reportGenerated) {
      toast.error('Please generate a report first');
      return;
    }

    toast.success('Opening print dialog...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleNewReport = () => {
    setReportType('');
    setReportGenerated(false);
    setGeneratedReport(null);
    setDateRange({ from: '', to: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Blurred Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/98 to-white/95 z-10"></div>
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80" alt="Reports" className="w-full h-full object-cover opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                  <p className="text-xs text-gray-600">Reports & Export</p>
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

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Export</h1>
            <p className="text-sm text-gray-600">Generate and download property reports and documents</p>
          </div>

          {!reportGenerated ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Report Configuration */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Generate Report</h2>

                  <div className="space-y-6">
                    {/* Report Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Report Type *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {reportTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setReportType(type.id)}
                            disabled={generating}
                            className={`p-4 border-2 rounded-lg transition-all text-left ${
                              reportType === type.id 
                                ? 'border-blue-900 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            } ${generating ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${type.color}`}>
                              <type.icon className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-gray-900 mb-1">{type.name}</p>
                            <p className="text-xs text-gray-600">{type.desc}</p>
                            {reportType === type.id && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <span className="text-xs font-medium text-blue-900 bg-blue-100 px-2 py-1 rounded-full">
                                  ✓ Selected
                                </span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Range (Optional)</label>
                      <p className="text-xs text-gray-500 mb-3">Leave empty to include all records</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">From</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              value={dateRange.from}
                              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                              disabled={generating}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">To</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              value={dateRange.to}
                              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                              disabled={generating}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateReport}
                      disabled={!reportType || generating}
                      className="w-full py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {generating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <FileText className="w-5 h-5" />
                          Generate Report
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Your Data Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Home className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-700">Properties Owned</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{properties.length}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-700">Documents</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{properties.length * 3}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Table className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm text-gray-700">Transactions</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{properties.length + 5}</span>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-700 mb-2">Total Portfolio Value</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        ₦{properties.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Generated Report */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Report Generated Successfully!</h2>
                      <p className="text-sm text-gray-600">Your report is ready for download</p>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Report Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Report ID:</span>
                        <span className="text-sm font-mono font-bold text-gray-900">{generatedReport?.id}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Report Type:</span>
                        <span className="text-sm text-gray-900">{generatedReport?.type}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Generated At:</span>
                        <span className="text-sm text-gray-900">{generatedReport?.generatedAt}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Date Range:</span>
                        <span className="text-sm text-gray-900">{generatedReport?.dateRange}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-sm text-gray-600">Records Included:</span>
                        <span className="text-sm text-gray-900">{generatedReport?.recordCount}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-gray-600">File Size:</span>
                        <span className="text-sm text-gray-900">{generatedReport?.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Preview */}
                  <div className="bg-gray-100 rounded-lg p-8 mb-6 border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <File className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm font-medium text-gray-900 mb-1">{generatedReport?.type}</p>
                      <p className="text-xs text-gray-500">Preview not available - Download to view full report</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNewReport}
                    className="w-full py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
                  >
                    Generate Another Report
                  </button>
                </div>
              </div>

              {/* Export Options */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Export Options</h3>
                  
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handleDownload('pdf')}
                      className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-red-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">Download PDF</p>
                          <p className="text-xs text-gray-600">Best for printing</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleDownload('excel')}
                      className="w-full flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-emerald-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">Download Excel</p>
                          <p className="text-xs text-gray-600">Editable spreadsheet</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleDownload('csv')}
                      className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">Download CSV</p>
                          <p className="text-xs text-gray-600">Raw data format</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="w-full flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Printer className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">Print Report</p>
                          <p className="text-xs text-gray-600">Physical copy</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-900">
                      <strong>Note:</strong> Downloaded reports contain official government seals and can be used for legal purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}