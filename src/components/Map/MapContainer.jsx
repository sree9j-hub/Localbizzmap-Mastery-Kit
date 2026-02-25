import React, { useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStore from '../../store/useStore';
import { mockBusinesses } from '../../data/mockBusinesses';
import L from 'leaflet';
import { Navigation, Star, Clock, Phone } from 'lucide-react';

// Fix for default Leaflet marker icons not showing in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom component to handle map centering dynamically
const CenterControl = () => {
  const mapCenter = useStore((state) => state.mapCenter);
  const map = useMap();
  
  useEffect(() => {
    if (mapCenter) {
      map.flyTo(mapCenter, 13, { duration: 1.5 });
    }
  }, [mapCenter, map]);
  
  return null;
};

const MapContainer = () => {
  const { 
    userLocation, 
    mapCenter, 
    filters,
    selectedBusiness,
    setSelectedBusiness,
    setRouting
  } = useStore();

  // Filter businesses based on global state
  const filteredBusinesses = mockBusinesses.filter((business) => {
    if (filters.category !== 'all' && business.category !== filters.category) return false;
    if (business.rating < filters.minRating) return false;
    if (filters.openNow && !business.isOpen) return false;
    if (filters.searchQuery && !business.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    // Note: Distance filter is omitted for mock data simplicity unless geometry math is implemented
    return true;
  });

  const handleGetDirections = (business) => {
    setRouting({
      active: true,
      origin: userLocation,
      destination: business.coordinates,
    });
    setSelectedBusiness(business);
  };

  return (
    <div className="w-full h-full relative z-0">
      <LeafletMap 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        zoomControl={false} // Will add custom positioned one if needed
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <CenterControl />

        {/* User Location Marker (Blue circle style) */}
        {userLocation && (
          <Marker 
            position={userLocation}
            icon={L.divIcon({
              className: 'custom-user-marker',
              html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(59,130,246,0.5)] animate-pulse"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })}
          >
            <Popup>
              <div className="text-sm font-semibold">Your Location</div>
            </Popup>
          </Marker>
        )}

        {/* Business Markers */}
        {filteredBusinesses.map((business) => (
          <Marker 
            key={business.id} 
            position={business.coordinates}
            eventHandlers={{
              click: () => {
                setSelectedBusiness(business);
                useStore.getState().setMapCenter(business.coordinates);
              },
            }}
          >
            <Popup className="custom-popup" closeButton={true} maxWidth={320} minWidth={280}>
              <div className="flex flex-col gap-3 -m-3 p-3">
                <img 
                  src={business.imageUrl} 
                  alt={business.name} 
                  className="w-full h-32 object-cover rounded-t-lg -mt-3 -mx-3 !max-w-none"
                  style={{ width: 'calc(100% + 24px)' }}
                />
                
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{business.name}</h3>
                  <p className="text-slate-500 text-sm mt-1">{business.address}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{business.rating} ({business.reviews})</span>
                  </div>
                  
                  <div className={`flex items-center gap-1 ${business.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                    <Clock className="w-4 h-4" />
                    <span>{business.isOpen ? 'Open Now' : 'Closed'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>{business.phone}</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections(business);
                  }}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
      
      {/* Map overlay elements (like a recenter button) can go here */}
      <button 
        onClick={() => useStore.getState().setMapCenter(userLocation)}
        className="absolute bottom-6 right-6 z-[1000] bg-white p-3 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors group"
        title="Center on my location"
      >
        <Navigation className="w-5 h-5 text-slate-700 group-hover:text-blue-600" />
      </button>
    </div>
  );
};

export default MapContainer;
