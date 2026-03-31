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
        // On force une hauteur stricte de 600px pour éviter que la carte ne s'écrase
        <div className="w-full h-[600px] rounded-3xl overflow-hidden border-4 border-[#D4AF37] shadow-2xl relative">

            <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom={true} // Activé pour pouvoir zoomer avec la molette
                style={{ height: '100%', width: '100%', zIndex: 10 }} // zIndex géré ici
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <Marker position={position}>
                    <Popup className="custom-popup">
                        <div className="text-center p-2 min-w-[150px]">
                            <h3 className="font-bold text-[#001C3F] text-lg mb-1">PARC DES PRINCES</h3>
                            <p className="text-sm text-gray-600 mb-3 leading-tight">
                                24 Rue du Commandant Guilbaud<br />75016 Paris
                            </p>
                            <button
                                onClick={onMarkerClick}
                                className="w-full bg-[#E30613] text-white px-4 py-2 rounded font-bold uppercase text-xs hover:bg-[#001C3F] transition-colors shadow-md cursor-pointer"
                            >
                                Explorer en 3D
                            </button>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
                <span className="bg-[#001C3F]/90 text-white px-6 py-2 rounded-full border border-[#D4AF37] font-bold tracking-widest text-sm shadow-xl whitespace-nowrap">
                    CLIQUEZ SUR LE MARQUEUR
                </span>
            </div>
        </div>
    );
}