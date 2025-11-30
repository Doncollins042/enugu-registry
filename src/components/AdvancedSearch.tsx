import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowLeft, MapPin, Filter, X, ChevronRight, 
  SlidersHorizontal, Heart, Home, Building2, Crown, Check
} from 'lucide-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface Estate {
  id: number; name: string; slug: string; location: string; description: string;
  total_plots: number; available_plots: number; min_price: string; max_price: string;
  image_url: string; status: string;
}

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'available'>('available');

  const locations = ['Independence Layout', 'Trans-Ekulu', 'New Haven', 'GRA', 'Abakpa Nike', 'Achara Layout'];
  const propertyTypes = ['Residential', 'Commercial', 'Mixed Use', 'Premium'];

  useEffect(() => { fetchEstates(); }, []);

  const fetchEstates = async () => {
    try {
      setLoading(true);
      const data = await api.getEstates();
      setEstates(data || []);
    } catch (error) { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price);
    if (num >= 1000000) return '₦' + (num / 1000000).toFixed(1) + 'M';
    return '₦' + (num / 1000).toFixed(0) + 'K';
  };

  const filteredEstates = estates
    .filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = parseInt(e.min_price) >= priceRange[0] && parseInt(e.min_price) <= priceRange[1];
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(loc => e.location.includes(loc));
      return matchesSearch && matchesPrice && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return parseInt(a.min_price) - parseInt(b.min_price);
        case 'price-desc': return parseInt(b.min_price) - parseInt(a.min_price);
        case 'name': return a.name.localeCompare(b.name);
        case 'available': return b.available_plots - a.available_plots;
        default: return 0;
      }
    });

  const clearFilters = () => {
    setPriceRange([0, 50000000]);
    setSelectedLocations([]);
    setSelectedTypes([]);
    setSortBy('available');
  };

  const activeFiltersCount = (selectedLocations.length > 0 ? 1 : 0) + (selectedTypes.length > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 50000000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#c9a961]/20 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#faf8f5] rounded-xl">
              <ArrowLeft className="w-5 h-5 text-[#0a2540]" />
            </button>
            <div className="flex-1">
              <h1 className="font-serif text-[#0a2540] font-bold text-sm">Find Properties</h1>
              <p className="text-[10px] text-[#8b6947]">{filteredEstates.length} estates available</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6947]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search estates, locations..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#0a2540] text-sm placeholder-[#8b6947]/50 focus:outline-none focus:border-[#0d6e5d]"
              />
            </div>
            <button onClick={() => setShowFilters(true)} className="relative px-3 py-2.5 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] rounded-xl">
              <SlidersHorizontal className="w-5 h-5 text-white" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a961] rounded-full text-[10px] text-white font-bold flex items-center justify-center">{activeFiltersCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: 'available', label: 'Most Available' },
            { id: 'price-asc', label: 'Price: Low' },
            { id: 'price-desc', label: 'Price: High' },
            { id: 'name', label: 'Name' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-all ${
                sortBy === option.id 
                  ? 'bg-[#0d6e5d]/10 text-[#0d6e5d] border-[#0d6e5d]/30' 
                  : 'bg-white text-[#8b6947] border-[#c9a961]/20'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      {/* Results */}
      <main className="px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-[#c9a961]/30 border-t-[#0d6e5d] rounded-full animate-spin"></div>
          </div>
        ) : filteredEstates.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#c9a961]" />
            </div>
            <h3 className="font-serif text-[#0a2540] font-bold mb-2">No Results Found</h3>
            <p className="text-[#8b6947] text-sm mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="px-4 py-2 bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] text-white rounded-xl text-sm font-semibold">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEstates.map((estate) => (
              <div
                key={estate.id}
                onClick={() => navigate(`/estate/${estate.slug}`)}
                className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#c9a961]/10 shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="relative h-40">
                  <img src={estate.image_url} alt={estate.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/80 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-gradient-to-r from-[#0d6e5d] to-[#15a88a] rounded-lg text-white text-[10px] font-bold">
                      {estate.available_plots} Available
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-white font-bold text-lg">{estate.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{estate.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#8b6947] text-[10px]">Starting from</p>
                    <p className="text-[#0f3d5c] font-serif font-bold text-xl">{formatPrice(estate.min_price)}</p>
                  </div>
                  <button className="px-4 py-2.5 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
                    View <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0a2540]/60 backdrop-blur-sm">
          <div className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl max-h-[85vh] overflow-hidden border border-[#c9a961]/20">
            <div className="bg-gradient-to-r from-[#0f3d5c] to-[#0d6e5d] p-4 flex justify-between items-center">
              <h3 className="text-white font-serif font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-white/80"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-5">
              {/* Price Range */}
              <div>
                <h4 className="font-serif text-[#0a2540] font-bold text-sm mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8b6947] text-[10px] mb-1 block">Min Price</label>
                    <select value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#0a2540] text-sm">
                      <option value={0}>Any</option>
                      <option value={3000000}>₦3M</option>
                      <option value={5000000}>₦5M</option>
                      <option value={10000000}>₦10M</option>
                      <option value={15000000}>₦15M</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#8b6947] text-[10px] mb-1 block">Max Price</label>
                    <select value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#0a2540] text-sm">
                      <option value={10000000}>₦10M</option>
                      <option value={20000000}>₦20M</option>
                      <option value={30000000}>₦30M</option>
                      <option value={50000000}>₦50M+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div>
                <h4 className="font-serif text-[#0a2540] font-bold text-sm mb-3">Location</h4>
                <div className="flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSelectedLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc])}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                        selectedLocations.includes(loc)
                          ? 'bg-[#0d6e5d] text-white border-[#0d6e5d]'
                          : 'bg-white text-[#8b6947] border-[#c9a961]/20'
                      }`}
                    >
                      {selectedLocations.includes(loc) && <Check className="w-3 h-3" />}
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h4 className="font-serif text-[#0a2540] font-bold text-sm mb-3">Property Type</h4>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                        selectedTypes.includes(type)
                          ? 'bg-[#0d6e5d] text-white border-[#0d6e5d]'
                          : 'bg-white text-[#8b6947] border-[#c9a961]/20'
                      }`}
                    >
                      {selectedTypes.includes(type) && <Check className="w-3 h-3" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[#c9a961]/10 flex gap-3">
              <button onClick={clearFilters} className="flex-1 py-3 bg-[#faf8f5] border border-[#c9a961]/20 rounded-xl text-[#8b6947] text-sm font-semibold">
                Clear All
              </button>
              <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-gradient-to-r from-[#c9a961] to-[#8b6947] rounded-xl text-white text-sm font-bold shadow-lg">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#c9a961]/20 px-4 py-2 z-30">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { icon: Home, label: 'Home', path: '/dashboard', active: false },
            { icon: Search, label: 'Search', path: '/search', active: true },
            { icon: Building2, label: 'Services', path: '/services/document-verification', active: false },
            { icon: Heart, label: 'Saved', path: '/portfolio', active: false },
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