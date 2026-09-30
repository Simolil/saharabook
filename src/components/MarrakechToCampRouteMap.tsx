import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCcw,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { cn } from '../lib/utils';
import { FOUM_ZGUID_STAYS } from '../data/foumZguidData';

// Free high-contrast map tiles
const TILES = {
  topo: {
    name: 'Terrain',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar'
  }
};

const FOUM_ZGUID_DEPOT: [number, number] = [30.0784, -6.8727];

export interface MarrakechToCampRouteMapProps {
  campName?: string;
  campSlug?: string;
  meetingPointName?: string;
  className?: string;
}

export const MarrakechToCampRouteMap: React.FC<MarrakechToCampRouteMapProps> = ({
  campName = 'Bivouac Les Nomades',
  campSlug = 'bivouac-les-nomades',
  meetingPointName = 'Foum Zguid Village Depot',
  className = ''
}) => {
  const [mapStyle, setMapStyle] = useState<'topo' | 'satellite'>('topo');
  const [copiedCoords, setCopiedCoords] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Look up coordinates from verified stays or fallback
  const stayData = FOUM_ZGUID_STAYS.find(s => s.slug === campSlug);
  const campCoords: [number, number] = stayData 
    ? [stayData.latitude, stayData.longitude] 
    : [29.8600, -6.1700];

  // 4x4 desert track between Foum Zguid Depot and Camp
  const trackCoords: [number, number][] = [
    FOUM_ZGUID_DEPOT,
    [29.9540, -6.7410],
    [29.8450, -6.5300], // Lake Iriki
    [29.8242, -6.2558], // Dune border
    campCoords
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const bounds = L.latLngBounds([FOUM_ZGUID_DEPOT, campCoords]);

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    });

    map.fitBounds(bounds, { padding: [40, 40] });

    const tileLayer = L.tileLayer(TILES.topo.url, {
      attribution: TILES.topo.attribution,
      maxZoom: 18
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // Draw 4x4 off-road track line
    L.polyline(trackCoords, {
      color: '#EA580C',
      weight: 3.5,
      opacity: 0.9,
      dashArray: '8, 8'
    }).addTo(map).bindTooltip('4x4 Desert Track (~67 km)', {
      sticky: true,
      className: 'bg-[#0B132B] text-white text-xs px-2 py-1 rounded shadow-md'
    });

    // 1. Meeting Depot Marker
    const depotIcon = L.divIcon({
      className: 'custom-depot-pin',
      html: `
        <div style="
          background: #0B132B;
          color: white;
          border: 2px solid white;
          border-radius: 999px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>🅿️</span>
          <span>Foum Zguid</span>
        </div>
      `,
      iconSize: [95, 26],
      iconAnchor: [47, 13]
    });

    L.marker(FOUM_ZGUID_DEPOT, { icon: depotIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 3px; min-width: 170px;">
          <b style="color: #0B132B; font-size: 13px;">${meetingPointName}</b>
          <p style="margin: 4px 0 0; color: #555; font-size: 11px;">
            Paved road ends here. Guarded 24/7 parking for your rental car &amp; 4x4 departure.
          </p>
        </div>
      `);

    // 2. Camp Destination Marker
    const campIcon = L.divIcon({
      className: 'custom-camp-pin',
      html: `
        <div style="
          background: #BA7517;
          color: white;
          border: 2px solid white;
          border-radius: 999px;
          padding: 3px 9px;
          font-size: 11px;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>⛺</span>
          <span>${campName}</span>
        </div>
      `,
      iconSize: [110, 26],
      iconAnchor: [55, 13]
    });

    const campMarker = L.marker(campCoords, { icon: campIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 3px; min-width: 170px;">
          <b style="color: #0B132B; font-size: 13px;">${campName}</b>
          <p style="margin: 4px 0 0; color: #555; font-size: 11px;">
            Erg Chigaga Sand Dunes. Deep Sahara bivouac location.
          </p>
        </div>
      `);

    // Open camp popup by default after map renders
    setTimeout(() => {
      campMarker.openPopup();
    }, 500);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [campSlug]);

  // Switch Tile Style
  const handleToggleStyle = (style: 'topo' | 'satellite') => {
    if (!mapInstanceRef.current || style === mapStyle) return;
    setMapStyle(style);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(TILES[style].url, {
      attribution: TILES[style].attribution,
      maxZoom: 18
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  };

  // Reset view to show both points
  const handleReset = () => {
    if (!mapInstanceRef.current) return;
    const bounds = L.latLngBounds([FOUM_ZGUID_DEPOT, campCoords]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  // Copy GPS
  const handleCopyGPS = () => {
    const text = `${campCoords[0].toFixed(5)}, ${campCoords[1].toFixed(5)}`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=30.0784,-6.8727&destination=${campCoords[0]},${campCoords[1]}&travelmode=driving`;

  return (
    <div className={cn("bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden", className)}>
      {/* Clean Top Bar */}
      <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <MapPin size={15} className="text-[#BA7517]" />
          <span className="font-serif font-bold text-[#0B132B]">Camp Location &amp; 4x4 Access</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Layer switcher */}
          <div className="bg-stone-200/80 p-0.5 rounded-lg flex items-center text-[11px] font-semibold">
            <button
              onClick={() => handleToggleStyle('topo')}
              className={cn(
                "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                mapStyle === 'topo' ? "bg-white text-[#0B132B] shadow-2xs" : "text-stone-600 hover:text-black"
              )}
            >
              Terrain
            </button>
            <button
              onClick={() => handleToggleStyle('satellite')}
              className={cn(
                "px-2 py-0.5 rounded-md transition-all cursor-pointer",
                mapStyle === 'satellite' ? "bg-white text-[#0B132B] shadow-2xs" : "text-stone-600 hover:text-black"
              )}
            >
              Satellite
            </button>
          </div>

          {/* Reset view */}
          <button
            onClick={handleReset}
            title="Reset map view"
            className="p-1 rounded-md text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
          </button>

          {/* Google Maps link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-[#0B132B] font-semibold text-[11px] flex items-center space-x-1 transition-all"
          >
            <span>Google Maps</span>
            <ExternalLink size={11} className="text-[#BA7517]" />
          </a>
        </div>
      </div>

      {/* Map Canvas - Compact & Lightweight */}
      <div className="relative h-[280px] sm:h-[320px] w-full bg-stone-100">
        <div ref={mapContainerRef} className="h-full w-full z-0" />
      </div>

      {/* Simple Information Strip */}
      <div className="px-4 py-3 bg-[#FAF7F2] border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-base">🅿️</span>
          <div>
            <span className="font-bold text-[#0B132B] block text-[11px]">Meeting Point</span>
            <span className="text-stone-600 text-[11px]">{meetingPointName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-base">🚙</span>
          <div>
            <span className="font-bold text-[#0B132B] block text-[11px]">Desert Access</span>
            <span className="text-stone-600 text-[11px]">~67 km guided 4x4 dune track</span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-2">
          <div className="text-left sm:text-right">
            <span className="font-bold text-[#0B132B] block text-[11px]">GPS Coordinates</span>
            <span className="text-stone-600 text-[11px] font-mono">
              {campCoords[0].toFixed(4)}° N, {Math.abs(campCoords[1]).toFixed(4)}° W
            </span>
          </div>
          <button
            onClick={handleCopyGPS}
            className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700 cursor-pointer"
            title="Copy coordinates"
          >
            {copiedCoords ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarrakechToCampRouteMap;
