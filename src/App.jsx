import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MapContainer from './components/Map/MapContainer';
import useStore from './store/useStore';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  // Apply dark mode class to root HTML element to trigger Tailwind dark styles
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Request user location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          useStore.getState().setUserLocation([latitude, longitude]);
          // Optional: we don't automatically jump the map here to preserve demo UX,
          // but we could call setMapCenter([latitude, longitude])
        },
        (error) => {
          console.warn('Geolocation denied or failed:', error.message);
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300 antialiased text-slate-900 dark:text-slate-100">
      <Sidebar />
      <main className="flex-1 relative h-[50vh] md:h-full z-0">
        <MapContainer />
      </main>
    </div>
  );
}

export default App;
