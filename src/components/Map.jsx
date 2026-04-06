import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ onMarkerClick }) {
    const position = [48.8414, 2.2530];
    const mapRef = useRef(null);

    const bounds = [
        [-90, -180],
        [90, 180]
    ];

    const handleRecenter = () => {
        if (mapRef.current) {
            mapRef.current.flyTo(position, 14, {
                duration: 1.5
            });
        }
    };

    return (
        <div
            className="w-full h-[600px] rounded-3xl overflow-hidden border-4 border-[#ceab5d] shadow-2xl relative z-10"
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
        >

            <button
                onClick={handleRecenter}
                className="absolute top-6 right-6 z-1000 bg-white text-[#004170] border-2 border-[#ceab5d] px-4 py-2 font-bold tracking-[0.2em] text-[10px] uppercase shadow-xl hover:bg-[#004170] hover:text-[#ceab5d] transition-all duration-300 flex items-center gap-2 group"
            >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m0 14v1m8-8h-1M5 12H4" />
                </svg>
                Recentrer
            </button>

            <MapContainer
                center={position}
                zoom={14}
                minZoom={3}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                ref={mapRef}
                style={{ height: '100%', width: '100%', zIndex: 0, borderRadius: 'inherit' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    noWrap={true}
                />

                <Marker position={position}>
                    <Popup className="custom-popup">
                        <div className="text-center p-2 min-w-[180px]">
                            <h3 className="font-bold text-[#004170] text-lg mb-1 tracking-tight">PARC DES PRINCES</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-tight font-mono">
                                24 Rue du Commandant Guilbaud<br />75016 Paris
                            </p>
                            <button
                                onClick={onMarkerClick}
                                className="w-full bg-[#DA291C] text-white px-4 py-2 rounded-none font-bold uppercase text-[10px] tracking-widest hover:bg-[#004170] transition-all duration-300 shadow-lg cursor-pointer"
                            >
                                Explorer en 3D
                            </button>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-1000 pointer-events-none">
                <span className="bg-white text-[#004170] px-8 py-3 border-2 border-[#ceab5d] font-bold tracking-[0.2em] text-xs shadow-2xl whitespace-nowrap uppercase">
                    Cliquez sur le marqueur
                </span>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#DA291C] z-1000"></div>
        </div>
    );
}