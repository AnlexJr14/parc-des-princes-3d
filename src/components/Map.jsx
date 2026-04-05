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
    // Coordonnées GPS exactes du Parc des Princes
    const position = [48.8414, 2.2530];

    return (
        <div className="w-full h-[600px] rounded-3xl overflow-hidden border-4 border-[#ceab5d] shadow-2xl relative">

            <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%', zIndex: 10 }}
            >
                {/* Utilisation d'un style de carte clair et épuré (Positron) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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

            {/* Badge flottant avec les nouvelles couleurs PSG */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
                <span className="bg-white text-[#004170] px-8 py-3 border-2 border-[#ceab5d] font-bold tracking-[0.2em] text-xs shadow-2xl whitespace-nowrap uppercase">
                    Cliquez sur le marqueur
                </span>
            </div>
            
            {/* Liseré décoratif rouge en bas */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#DA291C] z-[1000]"></div>
        </div>
    );
}