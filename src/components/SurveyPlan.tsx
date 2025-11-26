import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, Bell, Search, ZoomIn, ZoomOut, MapPin } from 'lucide-react';

interface SurveyPlanProps {
  user: any;
  onLogout: () => void;
  estate: any;
  onPlotSelect: (plot: any) => void;
}

export default function SurveyPlan({ user, onLogout, estate, onPlotSelect }: SurveyPlanProps) {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Realistic survey plan data with varying sizes and positions
  const plots = [
    // Block A - Left side along Main Road
    { id: 'LP-001', x: 50, y: 50, width: 80, height: 100, status: 'available', block: 'A', price: 5200000 },
    { id: 'LP-002', x: 50, y: 160, width: 80, height: 90, status: 'sold', block: 'A', price: 5000000 },
    { id: 'LP-003', x: 50, y: 260, width: 80, height: 95, status: 'available', block: 'A', price: 5100000 },
    { id: 'LP-004', x: 50, y: 365, width: 80, height: 85, status: 'reserved', block: 'A', price: 4900000 },
    
    // Block B - Center plots (irregular)
    { id: 'LP-005', x: 160, y: 50, width: 90, height: 110, status: 'available', block: 'B', price: 5500000 },
    { id: 'LP-006', x: 260, y: 50, width: 85, height: 110, status: 'available', block: 'B', price: 5400000 },
    { id: 'LP-007', x: 355, y: 50, width: 95, height: 110, status: 'sold', block: 'B', price: 5600000 },
    { id: 'LP-008', x: 160, y: 170, width: 85, height: 95, status: 'available', block: 'B', price: 5200000 },
    { id: 'LP-009', x: 255, y: 170, width: 90, height: 95, status: 'available', block: 'B', price: 5300000 },
    { id: 'LP-010', x: 355, y: 170, width: 95, height: 95, status: 'sold', block: 'B', price: 5400000 },
    
    // Block C - Right side plots
    { id: 'LP-011', x: 480, y: 50, width: 70, height: 85, status: 'available', block: 'C', price: 4800000 },
    { id: 'LP-012', x: 560, y: 50, width: 75, height: 85, status: 'available', block: 'C', price: 4900000 },
    { id: 'LP-013', x: 645, y: 50, width: 80, height: 85, status: 'reserved', block: 'C', price: 5000000 },
    { id: 'LP-014', x: 480, y: 145, width: 70, height: 90, status: 'sold', block: 'C', price: 4850000 },
    { id: 'LP-015', x: 560, y: 145, width: 75, height: 90, status: 'available', block: 'C', price: 4950000 },
    { id: 'LP-016', x: 645, y: 145, width: 80, height: 90, status: 'available', block: 'C', price: 5050000 },
    
    // Block D - Bottom left corner plots
    { id: 'LP-017', x: 160, y: 290, width: 85, height: 80, status: 'available', block: 'D', price: 5100000 },
    { id: 'LP-018', x: 255, y: 290, width: 90, height: 80, status: 'available', block: 'D', price: 5200000 },
    { id: 'LP-019', x: 355, y: 290, width: 95, height: 80, status: 'sold', block: 'D', price: 5300000 },
    { id: 'LP-020', x: 160, y: 380, width: 85, height: 85, status: 'available', block: 'D', price: 5150000 },
    { id: 'LP-021', x: 255, y: 380, width: 90, height: 85, status: 'reserved', block: 'D', price: 5250000 },
    { id: 'LP-022', x: 355, y: 380, width: 95, height: 85, status: 'available', block: 'D', price: 5350000 },
    
    // Block E - Bottom right plots (smaller corner plots)
    { id: 'LP-023', x: 480, y: 265, width: 70, height: 75, status: 'available', block: 'E', price: 4700000 },
    { id: 'LP-024', x: 560, y: 265, width: 75, height: 75, status: 'available', block: 'E', price: 4800000 },
    { id: 'LP-025', x: 645, y: 265, width: 80, height: 75, status: 'sold', block: 'E', price: 4900000 },
    { id: 'LP-026', x: 480, y: 350, width: 70, height: 80, status: 'available', block: 'E', price: 4750000 },
    { id: 'LP-027', x: 560, y: 350, width: 75, height: 80, status: 'available', block: 'E', price: 4850000 },
    { id: 'LP-028', x: 645, y: 350, width: 80, height: 80, status: 'reserved', block: 'E', price: 4950000 },
  ];

  const filteredPlots = plots.filter(plot => {
    const matchesSearch = plot.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || plot.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getPlotColor = (status: string) => {
    switch(status) {
      case 'available': return '#059669';
      case 'sold': return '#dc2626';
      case 'reserved': return '#d97706';
      default: return '#6b7280';
    }
  };

  const handlePlotClick = (plot: any) => {
    if (plot.status === 'available') {
      onPlotSelect(plot);
      navigate('/plot-details');
    }
  };

  const statusCounts = {
    available: plots.filter(p => p.status === 'available').length,
    sold: plots.filter(p => p.status === 'sold').length,
    reserved: plots.filter(p => p.status === 'reserved').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">Enugu State Land Registry</h1>
                <p className="text-xs text-gray-600">{estate?.name || 'Estate Survey Plan'}</p>
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

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search plot number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Plots</option>
                <option value="available">Available Only</option>
                <option value="sold">Sold</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <ZoomOut className="w-4 h-4 text-gray-700" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-600"></div>
              <span className="text-sm text-gray-700">Available ({statusCounts.available})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-600"></div>
              <span className="text-sm text-gray-700">Sold ({statusCounts.sold})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-600"></div>
              <span className="text-sm text-gray-700">Reserved ({statusCounts.reserved})</span>
            </div>
          </div>
        </div>

        {/* Survey Map */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Survey Plan Layout</h2>
              <p className="text-sm text-gray-600">Click on available plots to view details</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Independence Layout, Enugu</span>
            </div>
          </div>

          <div className="overflow-auto bg-gray-50 rounded-lg border-2 border-gray-300 p-8">
            <svg
              width={800 * zoom}
              height={500 * zoom}
              viewBox="0 0 800 500"
              className="bg-white"
              style={{ minWidth: '800px', minHeight: '500px' }}
            >
              {/* Roads */}
              <g id="roads">
                {/* Main Road (Vertical - Left) */}
                <rect x="20" y="20" width="20" height="460" fill="#9ca3af" />
                <text x="30" y="250" fontSize="10" fill="white" textAnchor="middle" transform="rotate(-90, 30, 250)" fontWeight="bold">
                  MAIN ROAD
                </text>

                {/* Cross Road 1 (Horizontal - Top) */}
                <rect x="40" y="20" width="750" height="20" fill="#9ca3af" />
                <text x="400" y="32" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
                  INDEPENDENCE AVENUE
                </text>

                {/* Internal Road (Vertical - Center) */}
                <rect x="140" y="40" width="12" height="440" fill="#d1d5db" />
                
                {/* Internal Road (Horizontal - Middle) */}
                <rect x="152" y="275" width="318" height="10" fill="#d1d5db" />

                {/* Internal Road (Vertical - Right side) */}
                <rect x="460" y="40" width="12" height="440" fill="#d1d5db" />
              </g>

              {/* Plot Blocks */}
              <g id="plots">
                {filteredPlots.map((plot) => {
                  const isClickable = plot.status === 'available';
                  return (
                    <g
                      key={plot.id}
                      onClick={() => handlePlotClick(plot)}
                      style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}
                      className={isClickable ? 'hover-plot' : ''}
                    >
                      <rect
                        x={plot.x}
                        y={plot.y}
                        width={plot.width}
                        height={plot.height}
                        fill={getPlotColor(plot.status)}
                        stroke="#374151"
                        strokeWidth="1.5"
                        opacity={isClickable ? "0.85" : "0.5"}
                        className={isClickable ? 'transition-all duration-200' : ''}
                      />
                      <text
                        x={plot.x + plot.width / 2}
                        y={plot.y + plot.height / 2 - 8}
                        fontSize="9"
                        fontWeight="bold"
                        fill="white"
                        textAnchor="middle"
                      >
                        {plot.id}
                      </text>
                      <text
                        x={plot.x + plot.width / 2}
                        y={plot.y + plot.height / 2 + 3}
                        fontSize="7"
                        fill="white"
                        textAnchor="middle"
                      >
                        {plot.width * 5}sqm
                      </text>
                      <text
                        x={plot.x + plot.width / 2}
                        y={plot.y + plot.height / 2 + 12}
                        fontSize="7"
                        fill="white"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        ₦{(plot.price / 1000000).toFixed(1)}M
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Compass */}
              <g id="compass" transform="translate(730, 450)">
                <circle cx="0" cy="0" r="25" fill="white" stroke="#374151" strokeWidth="2" />
                <polygon points="0,-18 -5,8 0,5 5,8" fill="#dc2626" />
                <text x="0" y="-22" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#374151">N</text>
              </g>

              {/* Title Block */}
              <g id="title-block">
                <rect x="560" y="380" width="220" height="100" fill="white" stroke="#374151" strokeWidth="2" />
                <text x="670" y="400" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1f2937">
                  ENUGU STATE
                </text>
                <text x="670" y="415" fontSize="10" textAnchor="middle" fill="#4b5563">
                  Ministry of Lands
                </text>
                <text x="670" y="435" fontSize="9" textAnchor="middle" fill="#6b7280">
                  Estate: {estate?.name || 'Legacy Estate'}
                </text>
                <text x="670" y="450" fontSize="9" textAnchor="middle" fill="#6b7280">
                  Total Plots: {plots.length}
                </text>
                <text x="670" y="465" fontSize="8" textAnchor="middle" fill="#9ca3af">
                  Scale: 1:500
                </text>
              </g>
            </svg>
          </div>

          <style>{`
            .hover-plot:hover rect {
              opacity: 1 !important;
              filter: brightness(1.2);
              transform: scale(1.02);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}