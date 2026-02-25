import React, { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import { Navigation, MapPin, X, ArrowDown, Clock, Move } from 'lucide-react';

const DirectionsPanel = () => {
  const { routing, clearRouting, selectedBusiness } = useStore();
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    // Simulate calculating a route
    if (routing.active && routing.origin && routing.destination) {
      setIsCalculating(true);
      
      // Artificial delay to simulate API call
      const timer = setTimeout(() => {
        // Mock route calculation (as we don't have a real Directions API)
        // In a real app we'd call Google Directions or OSRM here
        
        // Very basic mock distance calc based on coordinates
        const calcMockDist = () => {
          return (Math.random() * 8 + 1).toFixed(1); // 1-9 km
        };
        const dist = calcMockDist();
        const time = Math.round(dist * 12); // rough estimate logic: 1km = 12 mins driving/traffic
        
        setRouteInfo({
          distance: `${dist} km`,
          duration: `${time} min`,
          mode: 'Driving (Simulated)',
          steps: [
            { instruction: 'Head north on current street', distance: '200 m' },
            { instruction: 'Turn right onto Main Blvd', distance: '1.2 km' },
            { instruction: 'Continue straight for 3 km', distance: '3.0 km' },
            { instruction: 'Turn left at the next interaction', distance: '400 m' },
            { instruction: `Arrive at destination`, distance: '0 m' }
          ]
        });
        setIsCalculating(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setRouteInfo(null);
    }
  }, [routing.active, routing.origin, routing.destination]);

  if (!routing.active || !selectedBusiness) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center h-full">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Navigation className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No active route</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[250px]">
          Select a place from the Explore or Favorites tab and click "Get Directions" to start routing.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Route Header Cards */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 relative">
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_0_2px_rgba(37,99,235,0.2)]"></div>
            </div>
            <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 shadow-sm truncate">
              Your Current Location
            </div>
          </div>

          <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-slate-300 dark:bg-slate-600 border-l-2 border-dotted border-transparent z-0"></div>

          <div className="flex items-center gap-3 z-10">
            <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 dark:text-white shadow-sm truncate">
              {selectedBusiness.name}
            </div>
          </div>

        </div>

        <button 
          onClick={clearRouting}
          className="absolute top-2 -right-2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isCalculating ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Calculating best route...</p>
        </div>
      ) : routeInfo ? (
        <div className="flex flex-col flex-1 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Route Summary Stats */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/20 mb-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black">{routeInfo.duration}</span>
              <span className="text-blue-100 text-sm font-medium flex items-center gap-1">
                <Move className="w-3.5 h-3.5" />
                {routeInfo.distance}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              Fastest route
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3 px-1">Turn-by-turn Instructions (Mock)</h3>
          
          <div className="flex flex-col gap-0 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
            {routeInfo.steps.map((step, idx) => (
              <div key={idx} className="relative pl-6 pb-6 last:pb-0">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500"></div>
                
                <div className="bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 ml-2 shadow-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-[15px] leading-tight mb-1">
                    {step.instruction}
                  </p>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase flex flex-row items-center gap-1">
                    <ArrowDown className="w-3 h-3" />
                    continue for {step.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

    </div>
  );
};

export default DirectionsPanel;
