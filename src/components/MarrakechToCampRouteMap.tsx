import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  RotateCcw,
  Navigation,
  Compass,
  Car
} from 'lucide-react';
import { cn } from '../lib/utils';
import { FOUM_ZGUID_STAYS } from '../data/foumZguidData';

// Authentic Google Maps Terrain cartography matching reference
const TILES = {
  topo: {
    name: 'Terrain',
    url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps'
  }
};

const MARRAKECH_COORDS: [number, number] = [31.6295, -7.9811];
const FOUM_ZGUID_DEPOT: [number, number] = [30.0784, -6.8727];

// Full Paved Highway Route: Marrakech -> Col du Tichka (N9) -> Ouarzazate -> Taznakht (N10) -> Foum Zguid (R111)
const HIGHWAY_ROUTE: [number, number][] = [
  [31.6295, -7.9811], // Marrakech Medina
  [31.5644, -7.6628], // Ait Ourir
  [31.4500, -7.4900], // Toufliht
  [31.3789, -7.4230], // Taddert
  [31.2867, -7.3811], // Tizi n'Tichka Pass (2,260m)
  [31.2001, -7.2600], // Agouim
  [31.0478, -7.2144], // Amerzgane
  [30.9189, -6.8934], // Ouarzazate (N9/N10 junction)
  [30.7830, -7.0500], // Anzel
  [30.5786, -7.2053], // Taznakht (R111 junction)
  [30.4120, -7.1100], // Desert approach
  [30.2980, -7.0210], // Allougoum Oasis
  [30.0784, -6.8727]  // Foum Zguid Depot
];

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
  const [activeView, setActiveView] = useState<'full' | 'desert' | 'camp'>('full');
  const [copiedCoords, setCopiedCoords] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Look up coordinates from verified stays or fallback
  const stayData = FOUM_ZGUID_STAYS.find(s => s.slug === campSlug);
  const campCoords: [number, number] = stayData 
    ? [stayData.latitude, stayData.longitude] 
    : [29.8600, -6.1700];

  const offroadKm = stayData?.distanceKm || 67;

  // 4x4 desert track between Foum Zguid Depot and Camp across Lake Iriki
  const trackCoords: [number, number][] = [
    FOUM_ZGUID_DEPOT,
    [29.9540, -6.7410],
    [29.8450, -6.5300], // Lake Iriki Dry Basin
    [29.8242, -6.2558], // Dune border
    campCoords
  ];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Bounds covering Marrakech down to Erg Chigaga dunes
    const fullBounds = L.latLngBounds([
      [31.75, -8.10], // Marrakech area
      [29.70, -6.05]  // Erg Chigaga dunes
    ]);

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    });

    map.fitBounds(fullBounds, { padding: [30, 30] });

    const tileLayer = L.tileLayer(TILES[mapStyle].url, {
      subdomains: TILES[mapStyle].subdomains,
      attribution: TILES[mapStyle].attribution,
      maxZoom: 19
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // 1. Clean Paved Highway Line (Marrakech -> Foum Zguid)
    // Outer crisp casing
    L.polyline(HIGHWAY_ROUTE, {
      color: '#0D47A1',
      weight: 6.5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Inner bright Google navigation blue road
    const highwayLine = L.polyline(HIGHWAY_ROUTE, {
      color: '#1A73E8',
      weight: 4.5,
      opacity: 1,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    highwayLine.bindTooltip('🚗 Paved Highway: Marrakech → Foum Zguid (395 km)', {
      sticky: true,
      className: 'bg-white text-stone-900 border border-stone-300 text-xs px-2.5 py-1 rounded-md shadow-sm font-sans font-medium'
    });

    // 2. Clean 4x4 Desert Track (Foum Zguid -> Camp)
    L.polyline(trackCoords, {
      color: '#0D47A1',
      weight: 5.5,
      opacity: 0.85,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    const trackLine = L.polyline(trackCoords, {
      color: '#4285F4',
      weight: 3.5,
      opacity: 1,
      dashArray: '7, 7',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    trackLine.bindTooltip(`🏜️ 4x4 Desert Route to ${campName} (~${offroadKm} km)`, {
      sticky: true,
      className: 'bg-white text-stone-900 border border-stone-300 text-xs px-2.5 py-1 rounded-md shadow-sm font-sans font-medium'
    });

    // 3. Clean Departure Marker: Marrakech
    const startPointIcon = L.divIcon({
      className: 'clean-start-marker',
      html: `
        <div style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <div style="
            width: 14px;
            height: 14px;
            background: #ffffff;
            border: 3.5px solid #1F2937;
            border-radius: 50%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          "></div>
          <span style="
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: #1F2937;
            background: rgba(255, 255, 255, 0.95);
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid rgba(0,0,0,0.12);
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            white-space: nowrap;
          ">Marrakech</span>
        </div>
      `,
      iconSize: [85, 22],
      iconAnchor: [7, 11]
    });

    L.marker(MARRAKECH_COORDS, { icon: startPointIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 2px; min-width: 170px;">
          <b style="color: #111827;">Marrakech (Departure)</b>
          <p style="margin: 4px 0 0; color: #555; font-size: 11px;">
            Paved highway crossing High Atlas via Tizi n'Tichka.
          </p>
        </div>
      `);

    // 4. Clean Meeting Point Marker: Foum Zguid Depot
    const depotIcon = L.divIcon({
      className: 'clean-depot-marker',
      html: `
        <div style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
          <div style="
            width: 14px;
            height: 14px;
            background: #ffffff;
            border: 3.5px solid #1A73E8;
            border-radius: 50%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          "></div>
          <span style="
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: #1A73E8;
            background: rgba(255, 255, 255, 0.95);
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid rgba(26,115,232,0.25);
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            white-space: nowrap;
          ">Foum Zguid Depot</span>
        </div>
      `,
      iconSize: [120, 22],
      iconAnchor: [7, 11]
    });

    L.marker(FOUM_ZGUID_DEPOT, { icon: depotIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 2px; min-width: 180px;">
          <b style="color: #0B132B;">${meetingPointName}</b>
          <p style="margin: 4px 0 0; color: #555; font-size: 11px;">
            Guarded parking &amp; 4x4 boarding point into the dunes.
          </p>
        </div>
      `);

    // 5. Clean Destination Camp Pin
    const campGooglePin = L.divIcon({
      className: 'clean-destination-pin',
      html: `
        <div style="display: flex; align-items: center; gap: 6px; cursor: pointer; transform: translate(-12px, -30px); filter: drop-shadow(0 3px 5px rgba(0,0,0,0.35));">
          <svg viewBox="0 0 24 32" width="24" height="32" fill="none">
            <path d="M12 0C5.373 0 0 5.373 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.373 18.627 0 12 0Z" fill="#EA4335" stroke="#B31412" stroke-width="0.8"/>
            <circle cx="12" cy="11" r="4" fill="#ffffff"/>
          </svg>
          <span style="
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: #111827;
            background: rgba(255, 255, 255, 0.96);
            padding: 2px 7px;
            border-radius: 4px;
            border: 1px solid rgba(0,0,0,0.12);
            white-space: nowrap;
            box-shadow: 0 1px 4px rgba(0,0,0,0.18);
          ">${campName}</span>
        </div>
      `,
      iconSize: [24, 32],
      iconAnchor: [12, 32]
    });

    L.marker(campCoords, { icon: campGooglePin })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 3px; min-width: 180px;">
          <b style="color: #EA4335; font-size: 13px;">${campName}</b>
          <p style="margin: 4px 0 0; color: #444; font-size: 11px;">
            Erg Chigaga Sand Dunes. Reached via Lake Iriki 4x4 expedition transfer.
          </p>
          <div style="margin-top: 5px; font-weight: bold; color: #1A73E8; font-size: 11px;">
            GPS: ${campCoords[0].toFixed(5)}° N, ${Math.abs(campCoords[1]).toFixed(5)}° W
          </div>
        </div>
      `);

    // ResizeObserver ensures Leaflet updates viewport instantly when container extends to right
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [campSlug, mapStyle]);

  // Switch Tile Style
  const handleToggleStyle = (style: 'topo' | 'satellite') => {
    if (!mapInstanceRef.current || style === mapStyle) return;
    setMapStyle(style);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(TILES[style].url, {
      subdomains: TILES[style].subdomains,
      attribution: TILES[style].attribution,
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  };

  // View Mode Presets
  const handleSetView = (view: 'full' | 'desert' | 'camp') => {
    if (!mapInstanceRef.current) return;
    setActiveView(view);

    if (view === 'full') {
      const fullBounds = L.latLngBounds([
        [31.75, -8.10],
        [29.70, -6.05]
      ]);
      mapInstanceRef.current.fitBounds(fullBounds, { padding: [30, 30] });
    } else if (view === 'desert') {
      const desertBounds = L.latLngBounds([FOUM_ZGUID_DEPOT, campCoords]);
      mapInstanceRef.current.fitBounds(desertBounds, { padding: [40, 40] });
    } else if (view === 'camp') {
      mapInstanceRef.current.flyTo(campCoords, 14, { duration: 1.2 });
    }
  };

  // Copy GPS
  const handleCopyGPS = () => {
    const text = `${campCoords[0].toFixed(5)}, ${campCoords[1].toFixed(5)}`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=31.6295,-7.9811&destination=${campCoords[0]},${campCoords[1]}&waypoints=30.0784,-6.8727&travelmode=driving`;

  return (
    <div className={cn("bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden", className)}>
      {/* Google Maps Style Clean Header Controls Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#FAF7F2] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Route Overview Title */}
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold shrink-0">
            <Car size={15} />
          </div>
          <div>
            <span className="font-bold text-[#0B132B] text-xs sm:text-sm block">
              Marrakech → Foum Zguid Depot → {campName}
            </span>
            <span className="text-stone-500 text-[11px] block">
              Paved N9 &amp; R111 Highway (395 km) + Lake Iriki 4x4 Track ({offroadKm} km)
            </span>
          </div>
        </div>

        {/* Action & View Toggles */}
        <div className="flex items-center space-x-2 flex-wrap">
          {/* Quick Zoom Presets */}
          <div className="bg-stone-200/90 p-0.5 rounded-lg flex items-center text-[11px] font-semibold">
            <button
              onClick={() => handleSetView('full')}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                activeView === 'full' ? "bg-white text-[#0B132B] shadow-2xs font-bold" : "text-stone-600 hover:text-black"
              )}
            >
              Full Route
            </button>
            <button
              onClick={() => handleSetView('desert')}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                activeView === 'desert' ? "bg-white text-[#0B132B] shadow-2xs font-bold" : "text-stone-600 hover:text-black"
              )}
            >
              Desert Track
            </button>
            <button
              onClick={() => handleSetView('camp')}
              className={cn(
                "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                activeView === 'camp' ? "bg-white text-[#0B132B] shadow-2xs font-bold" : "text-stone-600 hover:text-black"
              )}
            >
              Camp Pin
            </button>
          </div>

          {/* Map Layer Style */}
          <div className="bg-stone-200/90 p-0.5 rounded-lg flex items-center text-[11px] font-semibold">
            <button
              onClick={() => handleToggleStyle('topo')}
              className={cn(
                "px-2 py-1 rounded-md transition-all cursor-pointer",
                mapStyle === 'topo' ? "bg-white text-[#0B132B] shadow-2xs font-bold" : "text-stone-600 hover:text-black"
              )}
            >
              Terrain
            </button>
            <button
              onClick={() => handleToggleStyle('satellite')}
              className={cn(
                "px-2 py-1 rounded-md transition-all cursor-pointer",
                mapStyle === 'satellite' ? "bg-white text-[#0B132B] shadow-2xs font-bold" : "text-stone-600 hover:text-black"
              )}
            >
              Satellite
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => handleSetView('full')}
            title="Reset to full route overview"
            className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>

          {/* Open in Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-[#0B132B] font-bold text-[11px] flex items-center space-x-1.5 transition-all shadow-2xs"
            title="Open exact route in Google Maps app"
          >
            <span>Google Maps</span>
            <ExternalLink size={11} className="text-blue-600" />
          </a>
        </div>
      </div>

      {/* Map Canvas - Generous High-Definition Height */}
      <div className="relative h-[420px] sm:h-[480px] md:h-[540px] lg:h-[580px] w-full bg-[#f8f4f0]">
        <div ref={mapContainerRef} className="h-full w-full z-0" />
      </div>

      {/* Detailed Logistics & Coordinates Summary Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#FAF7F2] border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <span className="text-lg">🅿️</span>
          <div>
            <span className="font-bold text-[#0B132B] block text-[11px]">Guarded Meeting Point</span>
            <span className="text-stone-600 text-[11px]">{meetingPointName} (Paved access)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <span className="text-lg">🚙</span>
          <div>
            <span className="font-bold text-[#0B132B] block text-[11px]">4x4 Dakar Track</span>
            <span className="text-stone-600 text-[11px]">~{offroadKm} km across Lake Iriki (2h 30m)</span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <div className="text-left sm:text-right">
            <span className="font-bold text-[#0B132B] block text-[11px]">Exact Dunes GPS</span>
            <span className="text-stone-700 text-[11px] font-mono font-bold">
              {campCoords[0].toFixed(5)}° N, {Math.abs(campCoords[1]).toFixed(5)}° W
            </span>
          </div>
          <button
            onClick={handleCopyGPS}
            className="p-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 transition-colors text-stone-700 cursor-pointer flex items-center space-x-1"
            title="Copy coordinates"
          >
            {copiedCoords ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span className="text-[10px] font-bold">{copiedCoords ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarrakechToCampRouteMap;
