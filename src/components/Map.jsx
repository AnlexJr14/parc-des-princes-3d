import { useImperativeHandle, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const position = [48.8414, 2.2530];

const bounds = [
    [-90, -180],
    [90, 180]
];

const repere = L.divIcon({
    className: 'repere',
    html: '<span class="repere__onde"></span><span class="repere__onde"></span><span class="repere__point"></span>',
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -16],
});

export default function Map({ onMarkerClick, ref }) {
    const mapRef = useRef(null);

    useImperativeHandle(ref, () => ({
        recenter: () => mapRef.current?.flyTo(position, 14, { duration: 1.5 }),
    }));

    const enableWheel = () => mapRef.current?.scrollWheelZoom.enable();
    const disableWheel = () => mapRef.current?.scrollWheelZoom.disable();

    return (
        <div className="relative z-0 h-full w-full" onClick={enableWheel} onMouseLeave={disableWheel}>
            <MapContainer
                center={position}
                zoom={14}
                minZoom={3}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={false}
                ref={mapRef}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    noWrap={true}
                />

                <Marker position={position} icon={repere} title="Parc des Princes" alt="Parc des Princes">
                    <Popup className="bulle" closeButton={false}>
                        <div className="min-w-52 p-5 text-center">
                            <h3 className="t-display text-3xl text-bleu">Parc des Princes</h3>
                            <p className="t-label mt-2 mb-4 text-[0.625rem] leading-relaxed text-encre/60">
                                24 Rue du Commandant Guilbaud<br />75016 Paris
                            </p>
                            <button onClick={onMarkerClick} className="btn w-full" style={{ '--btn-bg-hover': 'var(--color-bleu)', '--btn-fg-hover': '#fff' }}>
                                Explorer en 3D <span className="fleche" aria-hidden="true">→</span>
                            </button>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
