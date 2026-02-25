import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockBusinesses';
import { Search, Star, Clock, Navigation, MapPin, Heart, Sun, Moon } from 'lucide-react';
import BusinessList from './BusinessList';
import DirectionsPanel from './DirectionsPanel';
import FavoritesList from './FavoritesList';

const Sidebar = () => {
  const { filters, setFilters, isDarkMode, toggleDarkMode, routing } = useStore();
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'favorites' | 'directions'

  // Auto-switch to directions tab when routing starts
  React.useEffect(() => {
    if (routing.active) setActiveTab('directions');
  }, [routing.active]);

  return (
    <aside className="w-full md:w-[420px] h-full bg-white dark:bg-slate-900 shadow-[4px_0_24px_rgba(0,0,0,0.05)] dark:shadow-none z-20 flex flex-col transition-colors duration-300 relative border-r border-slate-200 dark:border-slate-800 flex-shrink-0">
      
      {/* Header */}
      <header className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            LocalBizMap
          </h1>
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          title="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Tabs Navigation */}
      <nav className="flex px-5 pt-4 gap-6 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('explore')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'explore' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
        >
          Explore
          {activeTab === 'explore' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-1.5 ${activeTab === 'favorites' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
        >
          Favorites
          {activeTab === 'favorites' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('directions')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-1.5 ${activeTab === 'directions' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
        >
          Directions
          {activeTab === 'directions' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>}
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 custom-scrollbar">
        {activeTab === 'explore' && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search places, restaurants, cafes..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ searchQuery: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800/50 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 transition-all outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters({ category: cat.id })}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      filters.category === cat.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFilters({ minRating: filters.minRating === 4 ? 0 : 4 })}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium border transition-all ${
                  filters.minRating === 4
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                <Star className={`w-4 h-4 ${filters.minRating === 4 ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                4+ Stars
              </button>

              <button
                onClick={() => setFilters({ openNow: !filters.openNow })}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium border transition-all ${
                  filters.openNow
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900'
                }`}
              >
                <Clock className={`w-4 h-4 ${filters.openNow ? 'text-emerald-500' : 'text-slate-400'}`} />
                Open Now
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-800 w-full" />

            {/* Results List */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nearby Places</h3>
              </div>
              <BusinessList />
            </div>
          </div>
        )}

        {/* Favorites Tab Content */}
        {activeTab === 'favorites' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <FavoritesList setActiveTab={setActiveTab} />
          </div>
        )}

        {/* Directions Tab Content */}
        {activeTab === 'directions' && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            <DirectionsPanel />
          </div>
        )}

      </div>
    </aside>
  );
};

export default Sidebar;
