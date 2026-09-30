import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { 
  MapPin, 
  RotateCcw, 
  ExternalLink, 
  Copy, 
  Check, 
  Navigation, 
  Car, 
  Sparkles, 
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FOUM_ZGUID_STAYS, FoumZguidStay } from '../data/foumZguidData';
import { cn } from '../lib/utils';

// Tile providers
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

// Paved Highway Route: Marrakech to Foum Zguid (via Tizi n'Tichka pass & Taznakht)
export const MARRAKECH_TO_FOUM_ZGUID_HIGHWAY: [number, number][] = [
  [31.6295, -7.9811], // Marrakech
  [31.5644, -7.6628], // Ait Ourir (Start of N9 mountain pass)
  [31.4500, -7.4900], // Toufliht
  [31.3789, -7.4230], // Taddert
  [31.2867, -7.3811], // Tizi n'Tichka Pass (Col du Tichka, 2,260m)
  [31.2001, -7.2600], // Agouim
  [31.0478, -7.2144], // Amerzgane (Ait Ben Haddou junction)
  [30.9189, -6.8934], // Ouarzazate / Tabounte
  [30.7830, -7.0500], // Anzel (R108 highway)
  [30.5786, -7.2053], // Taznakht (Carpet oasis & N10/R111 junction)
  [30.4120, -7.1100], // Approach south
  [30.2980, -7.0210], // Allougoum Oasis
  [30.0784, -6.8727]  // Foum Zguid Town Depot (Paved road ends)
];

// Off-road desert track: Foum Zguid across Lake Iriki to Erg Chigaga Great Dunes
export const DESERT_4X4_TRACK: [number, number][] = [
  [30.0784, -6.8727], // Foum Zguid Depot
  [29.9540, -6.7410], // Oued Mhasser desert gateway
  [29.8450, -6.5300], // Lake Iriki dried clay basin & fossil plateau
  [29.8242, -6.2558], // Erg Chigaga Great Dunes border
  [29.8600, -6.1700]  // Erg Chigaga heart / Bivouac Les Nomades
];

// Key Highway Stops
interface HighwayStop {
  id: string;
  name: string;
  role: string;
  coords: [number, number];
  icon: string;
  distance: string;
  badge: string;
  description: string;
}

const HIGHWAY_STOPS: HighwayStop[] = [
  {
    id: 'marrakech',
    name: 'Marrakech',
    role: 'Trip Departure Point',
    coords: [31.6295, -7.9811],
    icon: '🚩',
    distance: '0 km',
    badge: 'Start Point',
    description: 'Depart Marrakech Medina or RAK Airport on paved N9 national highway.'
  },
  {
    id: 'tichka',
    name: "Tizi n'Tichka Pass",
    role: 'High Atlas Summit (2,260m)',
    coords: [31.2867, -7.3811],
    icon: '🏔️',
    distance: '100 km',
    badge: 'Scenic Pass',
    description: 'Morocco’s highest paved mountain pass with sweeping views and cafes.'
  },
  {
    id: 'ouarzazate',
    name: 'Ouarzazate',
    role: 'Southern Gateway City',
    coords: [30.9189, -6.8934],
    icon: '🎬',
    distance: '200 km',
    badge: 'Midpoint Stop',
    description: 'Great lunch and refueling break. Gateway to desert valleys.'
  },
  {
    id: 'taznakht',
    name: 'Taznakht',
    role: 'Berber Carpet Capital',
    coords: [30.5786, -7.2053],
    icon: '🧵',
    distance: '290 km',
    badge: 'Fuel & ATMs',
    description: 'Renowned carpet weaving oasis and final major town with ATMs.'
  },
  {
    id: 'foumzguid-depot',
    name: 'Foum Zguid Town Depot',
    role: 'Paved Road Ends • 4x4 Staging Point',
    coords: [30.0784, -6.8727],
    icon: '🅿️',
    distance: '395 km',
    badge: 'Staging Depot',
    description: 'Park your rental car safely in 24/7 guarded garages. Transfer to 4x4 for dunes.'
  }
];

interface FoumZguidRegionalMapProps {
  initialSelectedSlug?: string;
  className?: string;
}

export const FoumZguidRegionalMap: React.FC<FoumZguidRegionalMapProps> = ({
  initialSelectedSlug = 'bivouac-les-nomades',
  className = ''
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSelectedSlug);
  const [mapStyle, setMapStyle] = useState<'topo' | 'satellite'>('topo');
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [viewMode, setViewMode] = useState<'route' | 'lodges' | 'single'>('route');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const lodgeMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const activeLodgeLineRef = useRef<L.Polyline | null>(null);

  // Active selected lodge data
  const activeStay: FoumZguidStay | undefined = useMemo(() => {
    return FOUM_ZGUID_STAYS.find(s => s.slug === selectedSlug) || FOUM_ZGUID_STAYS[0];
  }, [selectedSlug]);

  // Sync external selection from parent (e.g. clicking a lodge card on the page)
  useEffect(() => {
    if (initialSelectedSlug && initialSelectedSlug !== selectedSlug) {
      handleSelectLodge(initialSelectedSlug);
    }
  }, [initialSelectedSlug]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Bounds covering Marrakech to Erg Chigaga dunes
    const bounds = L.latLngBounds([
      [31.75, -8.10], // Northwest (Marrakech area)
      [29.70, -6.05]  // Southeast (Erg Chigaga dunes)
    ]);

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    });

    map.fitBounds(bounds, { padding: [25, 25] });

    const tileLayer = L.tileLayer(TILES.topo.url, {
      attribution: TILES.topo.attribution,
      maxZoom: 18
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // 1. Draw Paved Highway Line (Marrakech -> Foum Zguid)
    const highwayLine = L.polyline(MARRAKECH_TO_FOUM_ZGUID_HIGHWAY, {
      color: '#1E3A8A',
      weight: 4.5,
      opacity: 0.95
    }).addTo(map);

    highwayLine.bindTooltip('🚗 Paved Highway: Marrakech → Foum Zguid (395 km • ~6 hrs)', {
      sticky: true,
      className: 'bg-[#0B132B] text-white text-xs px-2.5 py-1 rounded shadow-lg'
    });

    // 2. Draw 4x4 Desert Track (Foum Zguid -> Lake Iriki -> Dunes)
    const desertTrackLine = L.polyline(DESERT_4X4_TRACK, {
      color: '#EA580C',
      weight: 3.5,
      opacity: 0.85,
      dashArray: '7, 7'
    }).addTo(map);

    desertTrackLine.bindTooltip('🏜️ 4x4 Off-Road Track via Lake Iriki to Erg Chigaga', {
      sticky: true,
      className: 'bg-[#BA7517] text-white text-xs px-2.5 py-1 rounded shadow-lg'
    });

    // 3. Lake Iriki Milestone Marker
    const lakeIrikiIcon = L.divIcon({
      className: 'custom-lake-marker',
      html: `
        <div style="
          background: #0284C7;
          color: white;
          border: 1.5px solid white;
          border-radius: 999px;
          padding: 2px 7px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 3px;
        ">
          <span>🌊</span>
          <span>Lake Iriki Basin</span>
        </div>
      `,
      iconSize: [95, 22],
      iconAnchor: [47, 11]
    });

    L.marker([29.8450, -6.5300], { icon: lakeIrikiIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; padding: 4px; min-width: 180px;">
          <b style="color: #0284C7; font-size: 13px;">Lake Iriki (Dry Clay Basin)</b>
          <p style="margin: 4px 0 0; color: #444; font-size: 11px;">
            Ancient dry salt bed and marine fossil fields. Reached only by 4x4 on the way into Erg Chigaga dunes.
          </p>
        </div>
      `);

    // 4. Highway Stop Markers
    HIGHWAY_STOPS.forEach((stop) => {
      const isDepot = stop.id === 'foumzguid-depot';
      const isMarrakech = stop.id === 'marrakech';

      const stopIcon = L.divIcon({
        className: `stop-marker-${stop.id}`,
        html: `
          <div style="
            background: ${isDepot ? '#0B132B' : isMarrakech ? '#DC2626' : '#1E293B'};
            color: white;
            border: 2px solid ${isDepot ? '#EF9F27' : 'white'};
            border-radius: 999px;
            padding: ${isDepot ? '4px 9px' : '3px 7px'};
            font-size: 11px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 3px 8px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            gap: 4px;
            transform: ${isDepot ? 'scale(1.08)' : 'scale(1)'};
          ">
            <span>${stop.icon}</span>
            <span>${stop.name}</span>
          </div>
        `,
        iconSize: [isDepot ? 115 : 95, 26],
        iconAnchor: [isDepot ? 57 : 47, 13]
      });

      L.marker(stop.coords, { icon: stopIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; padding: 4px; min-width: 190px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <b style="color: #0B132B; font-size: 13px;">${stop.name}</b>
              <span style="background: #E2E8F0; color: #334155; font-size: 10px; font-weight: bold; padding: 1px 6px; border-radius: 4px;">
                ${stop.distance}
              </span>
            </div>
            <div style="color: #BA7517; font-size: 11px; font-weight: 600; margin-bottom: 4px;">${stop.role}</div>
            <p style="margin: 0; color: #555; font-size: 11px; line-height: 1.35;">${stop.description}</p>
          </div>
        `);
    });

    // 5. Lodge & Camp Markers (All 14 Stays)
    FOUM_ZGUID_STAYS.forEach((stay) => {
      const isLesNomades = stay.slug === 'bivouac-les-nomades';
      const isEdgeLodge = stay.category === 'desert-edge-lodge';
      const isOasis = stay.category === 'oasis-auberge';

      let bg = '#BA7517';
      let icon = '⛺';
      if (isLesNomades) {
        bg = '#EF9F27';
        icon = '⭐';
      } else if (isEdgeLodge) {
        bg = '#047857';
        icon = '🏨';
      } else if (isOasis) {
        bg = '#0D9488';
        icon = '🌴';
      }

      const campIcon = L.divIcon({
        className: `camp-marker-${stay.slug}`,
        html: `
          <div style="
            background: ${bg};
            color: ${isLesNomades ? '#0B132B' : '#ffffff'};
            border: 2px solid white;
            border-radius: 999px;
            padding: 3px 8px;
            font-size: 11px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 3px;
            cursor: pointer;
            transform: ${isLesNomades ? 'scale(1.08)' : 'scale(1)'};
          ">
            <span>${icon}</span>
            <span style="max-width: 95px; overflow: hidden; text-overflow: ellipsis;">${stay.name.split(' ')[0]}</span>
            <span style="opacity: 0.85; font-size: 10px;">€${stay.price_per_night}</span>
          </div>
        `,
        iconSize: [95, 24],
        iconAnchor: [47, 12]
      });

      const marker = L.marker([stay.latitude, stay.longitude], { icon: campIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; padding: 3px; width: 220px;">
            <b style="color: #0B132B; font-size: 13px; display: block; margin-bottom: 2px; line-height: 1.3;">
              ${stay.name}
            </b>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="color: #BA7517; font-size: 12px; font-weight: bold;">
                €${stay.price_per_night} / night
              </span>
              <span style="color: #4B5563; font-size: 11px;">
                ★ ${stay.rating} (${stay.reviewCount})
              </span>
            </div>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 4px 6px; border-radius: 6px; font-size: 11px; color: #475569; margin-bottom: 6px;">
              📍 GPS: <b>${stay.latitude.toFixed(4)}, ${stay.longitude.toFixed(4)}</b><br/>
              🚗 ${stay.distanceKm > 0 ? `${stay.distanceKm} km off-road 4x4` : 'Paved road in town'}
            </div>
            <a href="/camps/${stay.slug}" style="
              display: block;
              text-align: center;
              background: #0B132B;
              color: white;
              padding: 6px 10px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              font-size: 11px;
            ">
              View Lodge &amp; Availability &rarr;
            </a>
          </div>
        `);

      marker.on('click', () => {
        handleSelectLodge(stay.slug);
      });

      lodgeMarkersRef.current[stay.slug] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

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

  // Select Lodge and Zoom to its Exact Location
  const handleSelectLodge = (slug: string) => {
    setSelectedSlug(slug);
    setViewMode('single');

    const stay = FOUM_ZGUID_STAYS.find(s => s.slug === slug);
    if (!stay || !mapInstanceRef.current) return;

    // Smooth flyTo to the exact lodge coordinates
    mapInstanceRef.current.flyTo([stay.latitude, stay.longitude], 12.5, {
      duration: 1.2
    });

    // Open popup
    const marker = lodgeMarkersRef.current[slug];
    if (marker) {
      setTimeout(() => marker.openPopup(), 800);
    }

    // Draw dedicated connector line from Foum Zguid Depot to this lodge
    if (activeLodgeLineRef.current) {
      mapInstanceRef.current.removeLayer(activeLodgeLineRef.current);
      activeLodgeLineRef.current = null;
    }

    // Connect from Foum Zguid Depot [30.0784, -6.8727] to lodge
    const depotCoords: [number, number] = [30.0784, -6.8727];
    const lodgeLineCoords: [number, number][] = stay.distanceKm > 10
      ? [depotCoords, [29.9540, -6.7410], [29.8450, -6.5300], [stay.latitude, stay.longitude]]
      : [depotCoords, [stay.latitude, stay.longitude]];

    const activeLine = L.polyline(lodgeLineCoords, {
      color: '#EF9F27',
      weight: 4,
      opacity: 0.95,
      dashArray: '5, 5'
    }).addTo(mapInstanceRef.current);

    activeLodgeLineRef.current = activeLine;
  };

  // View Mode: Full Marrakech -> Foum Zguid Route
  const handleViewFullRoute = () => {
    if (!mapInstanceRef.current) return;
    setViewMode('route');

    if (activeLodgeLineRef.current) {
      mapInstanceRef.current.removeLayer(activeLodgeLineRef.current);
      activeLodgeLineRef.current = null;
    }

    const bounds = L.latLngBounds([
      [31.75, -8.10], // Marrakech
      [29.70, -6.05]  // Erg Chigaga
    ]);

    mapInstanceRef.current.fitBounds(bounds, { padding: [25, 25] });
  };

  // View Mode: Focus on Foum Zguid and all Erg Chigaga Lodges
  const handleViewLodges = () => {
    if (!mapInstanceRef.current) return;
    setViewMode('lodges');

    if (activeLodgeLineRef.current) {
      mapInstanceRef.current.removeLayer(activeLodgeLineRef.current);
      activeLodgeLineRef.current = null;
    }

    const bounds = L.latLngBounds([
      [30.12, -6.95], // Foum Zguid town
      [29.75, -6.05]  // Dunes
    ]);

    mapInstanceRef.current.fitBounds(bounds, { padding: [35, 35] });
  };

  // Copy GPS Coordinates
  const handleCopyGPS = (lat: number, lng: number) => {
    const text = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className={cn("bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden", className)}>
      {/* Route & Journey Header Bar */}
      <div className="px-4 py-3 bg-[#FAF7F2] border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Title & Path Badge */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0B132B] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Navigation size={16} className="text-[#EF9F27]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-[#0B132B] text-sm sm:text-base">
                  Marrakech to Foum Zguid Highway &amp; Lodge Map
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                Paved N9/R111 route (~395 km) • Click any lodge to view its exact desert location
              </p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* View Switchers */}
            <div className="bg-stone-200/90 p-0.5 rounded-lg flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={handleViewFullRoute}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center space-x-1",
                  viewMode === 'route'
                    ? "bg-[#0B132B] text-white shadow-xs"
                    : "text-stone-700 hover:text-black"
                )}
                title="View entire highway from Marrakech to Foum Zguid"
              >
                <Car size={12} />
                <span>Marrakech Route</span>
              </button>

              <button
                type="button"
                onClick={handleViewLodges}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center space-x-1",
                  viewMode === 'lodges'
                    ? "bg-[#0B132B] text-white shadow-xs"
                    : "text-stone-700 hover:text-black"
                )}
                title="View all desert camps & lodges in Foum Zguid"
              >
                <Compass size={12} />
                <span>All Lodges &amp; Dunes</span>
              </button>
            </div>

            {/* Tile Layer Toggle */}
            <div className="bg-stone-200/90 p-0.5 rounded-lg flex items-center text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => handleToggleStyle('topo')}
                className={cn(
                  "px-2 py-1 rounded-md transition-all cursor-pointer",
                  mapStyle === 'topo' ? "bg-white text-[#0B132B] shadow-2xs" : "text-stone-600 hover:text-black"
                )}
              >
                Terrain
              </button>
              <button
                type="button"
                onClick={() => handleToggleStyle('satellite')}
                className={cn(
                  "px-2 py-1 rounded-md transition-all cursor-pointer",
                  mapStyle === 'satellite' ? "bg-white text-[#0B132B] shadow-2xs" : "text-stone-600 hover:text-black"
                )}
              >
                Satellite
              </button>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={handleViewFullRoute}
              title="Reset to full map"
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Milestone Quick Taps */}
        <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-[10px] font-bold text-stone-500 uppercase shrink-0 mr-1">Highway Stops:</span>
          {HIGHWAY_STOPS.map((stop) => (
            <div
              key={stop.id}
              className={cn(
                "px-2 py-0.5 rounded-md shrink-0 flex items-center space-x-1 border font-medium text-stone-700 bg-white border-stone-200 shadow-2xs"
              )}
            >
              <span>{stop.icon}</span>
              <span className="font-semibold text-[#0B132B]">{stop.name}</span>
              <span className="text-stone-400 text-[10px]">({stop.distance})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[340px] sm:h-[400px] md:h-[450px] w-full bg-stone-100">
        <div ref={mapContainerRef} className="h-full w-full z-0" />

        {/* Floating Legend Badge */}
        <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-stone-200 shadow-md text-[11px] max-w-[220px] pointer-events-auto">
          <div className="font-bold text-[#0B132B] mb-1.5 flex items-center space-x-1.5">
            <Layers size={12} className="text-[#BA7517]" />
            <span>Map Legend</span>
          </div>
          <div className="space-y-1 text-stone-700">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-1 bg-[#1E3A8A] rounded-full inline-block" />
              <span>Paved Highway (2WD safe)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-4 h-1 border-t-2 border-dashed border-[#EA580C] inline-block" />
              <span>4x4 Off-Road Dunes Track</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF9F27] border border-white inline-block" />
              <span>Sahara Lodges &amp; Camps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lodge Fast-Picker: Horizontal Scroll Row */}
      <div className="px-3 py-2.5 bg-stone-50 border-t border-stone-200">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-1.5">
            <MapPin size={13} className="text-[#BA7517]" />
            <span className="text-xs font-bold text-[#0B132B]">
              Click any lodge to locate it on the map:
            </span>
          </div>
          <span className="text-[10px] text-stone-500 font-medium hidden sm:inline">
            14 verified desert stays
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {FOUM_ZGUID_STAYS.map((stay) => {
            const isSelected = selectedSlug === stay.slug;
            const isLesNomades = stay.slug === 'bivouac-les-nomades';
            const isEdge = stay.category === 'desert-edge-lodge';
            const isOasis = stay.category === 'oasis-auberge';

            return (
              <button
                key={stay.id}
                type="button"
                onClick={() => handleSelectLodge(stay.slug)}
                className={cn(
                  "px-3 py-1.5 rounded-xl shrink-0 transition-all font-medium flex items-center space-x-1.5 cursor-pointer text-xs border",
                  isSelected
                    ? "bg-[#0B132B] text-white border-[#0B132B] shadow-md ring-2 ring-[#EF9F27]/50"
                    : isLesNomades
                    ? "bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100"
                    : "bg-white hover:bg-stone-100 text-stone-800 border-stone-200 shadow-2xs"
                )}
              >
                <span>{isLesNomades ? '⭐' : isEdge ? '🏨' : isOasis ? '🌴' : '⛺'}</span>
                <span className="font-semibold">{stay.name}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-md",
                  isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                )}>
                  €{stay.price_per_night}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Lodge Details Card ("Finds exact location there") */}
      {activeStay && (
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Lodge Identity & Exact Location */}
            <div className="flex items-start space-x-4">
              <img 
                src={activeStay.image || activeStay.fallbackImage} 
                alt={activeStay.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-stone-200 shadow-xs"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#BA7517]/10 text-[#BA7517] border border-[#BA7517]/20">
                    {activeStay.categoryLabel}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 flex items-center space-x-1">
                    <span>★</span>
                    <span>{activeStay.rating}</span>
                    <span className="text-stone-400">({activeStay.reviewCount} reviews)</span>
                  </span>
                  {activeStay.slug === 'bivouac-les-nomades' && (
                    <span className="text-[10px] font-bold bg-[#EF9F27] text-[#0B132B] px-2 py-0.5 rounded-md">
                      Featured Camp
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-serif font-bold text-[#0B132B] leading-tight">
                  {activeStay.name}
                </h4>

                {/* Exact GPS Coordinates with 1-click Copy */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-stone-600">
                  <div className="flex items-center space-x-1 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200">
                    <MapPin size={12} className="text-[#BA7517]" />
                    <span className="font-mono font-bold text-stone-800">
                      {activeStay.latitude.toFixed(5)}° N, {Math.abs(activeStay.longitude).toFixed(5)}° W
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyGPS(activeStay.latitude, activeStay.longitude)}
                      className="ml-1 text-[#BA7517] hover:text-[#0B132B] p-0.5 transition-colors cursor-pointer"
                      title="Copy GPS coordinates"
                    >
                      {copiedCoords ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                    </button>
                  </div>

                  <span className="text-stone-400">•</span>
                  <span className="font-semibold text-stone-700">
                    {activeStay.distanceKm > 0 ? `${activeStay.distanceKm} km off-road transfer` : 'Direct paved access'}
                  </span>
                </div>

                <p className="text-xs text-stone-500 mt-1.5 line-clamp-1 max-w-xl">
                  {activeStay.transferDetails}
                </p>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-xl font-serif font-bold text-[#0B132B]">
                  €{activeStay.price_per_night}
                  <span className="text-xs font-sans text-stone-500 font-normal"> / night</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center sm:justify-end space-x-1">
                  <Check size={12} />
                  <span>Guarded parking included</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Google Maps link */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${activeStay.latitude},${activeStay.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-[#0B132B] font-bold text-xs flex items-center space-x-1.5 transition-all shadow-2xs"
                  title="Open exact pin in Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink size={12} className="text-[#BA7517]" />
                </a>

                {/* View Lodge Details Page */}
                <Link
                  to={`/camps/${activeStay.slug}`}
                  className="px-4 py-2 bg-[#0B132B] hover:bg-[#1E293B] text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <span>View Lodge</span>
                  <ArrowRight size={13} className="text-[#EF9F27]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default FoumZguidRegionalMap;
