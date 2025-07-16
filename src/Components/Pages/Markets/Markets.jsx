import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

const markets = [
  { name: 'Gulshan Market', lat: 23.7925, lng: 90.4072 },
  { name: 'New Market', lat: 23.7355, lng: 90.3892 },
  { name: 'Karwan Bazar', lat: 23.7570, lng: 90.3926 },
  { name: 'Mirpur 1', lat: 23.8198, lng: 90.3655 },
  { name: 'Uttara Sector 7', lat: 23.8698, lng: 90.3992 },
  { name: 'Banani Super Market', lat: 23.7913, lng: 90.4153 },
  { name: 'Shantinagar Bazar', lat: 23.7387, lng: 90.4002 },
  { name: 'Mohakhali Kitchen Market', lat: 23.7764, lng: 90.4041 },
];

const MarketsMap = () => {
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <div className="w-full max-w-3xl mx-auto h-[400px] rounded overflow-hidden shadow-lg">
      <Map
        initialViewState={{
          longitude: 90.4,
          latitude: 23.78,
          zoom: 11.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onClick={() => setPopupInfo(null)}
      >
        {markets.map((market, idx) => (
          <Marker
            key={idx}
            longitude={market.lng}
            latitude={market.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(market);
            }}
          >
            <span
              role="img"
              aria-label={market.name}
              className="text-red-600 text-3xl cursor-pointer drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]"
            >
              📍
            </span>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            anchor="top"
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            className="!p-0 !bg-transparent !border-none"
          >
            {/* Popup body bg updated */}
            <div className="bg-[#C8FACC] border border-yellow-300 rounded-md px-3 py-2 shadow-md max-w-[180px] text-center">
              <h4 className="text-sm font-semibold text-gray-900">{popupInfo.name}</h4>
            </div>

            {/*
              👉 অন্য রঙ চাইলে নিচেরগুলোর যেকোনো একটা ব্যবহার করো:
              <div className="bg-[#C8FACC] border border-green-300 ...">  // Pastel Green
              <div className="bg-[#AEE4FF] border border-blue-300 ...">   // Pastel Blue
            */}
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MarketsMap;
