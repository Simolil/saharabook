import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Navigation, 
  MapPin, 
  Car, 
  Compass, 
  Mountain, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertTriangle, 
  Info, 
  Clock, 
  Gauge, 
  ChevronRight, 
  Maximize2, 
  RotateCcw,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface Waypoint {
  id: string;
  name: string;
  subname: string;
  lat: number;
  lng: number;
  elevation: number;
  distanceFromStartKm: number;
  segmentType: 'paved' | 'offroad';
  estimatedTime: string;
  roadDescription: string;
  vehicleRequirement: string;
  highlights: string[];
  insiderTip: string;
  fuelOrAtm: string;
  photoUrl: string;
}

export const ROUTE_WAYPOINTS: Waypoint[] = [
  {
    id: 'marrakech',
    name: 'Marrakech',
    subname: 'The Ochre City (Starting Point)',
    lat: 31.6295,
    lng: -7.9811,
    elevation: 466,
    distanceFromStartKm: 0,
    segmentType: 'paved',
    estimatedTime: '00:00 (Depart 07:30 - 08:30)',
    roadDescription: 'Smooth multi-lane boulevard exiting south onto Route Nationale N9 toward the Atlas foothills.',
    vehicleRequirement: 'Any standard sedan, compact rental, or 2WD car.',
    highlights: ['Medina / Riad door-to-door pickup', 'Direct access to N9', 'Grocery stocking for road snacks'],
    insiderTip: 'Start before 08:30 AM to beat mountain truck convoys through the lower Ourika valleys and enjoy morning light on the Atlas crests.',
    fuelOrAtm: 'Full urban amenities, countless petrol stations, international ATMs.',
    photoUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tichka',
    name: "Tizi n'Tichka Pass",
    subname: 'High Atlas Mountain Summit',
    lat: 31.2863,
    lng: -7.3813,
    elevation: 2260,
    distanceFromStartKm: 105,
    segmentType: 'paved',
    estimatedTime: '+2h 15m from Marrakech',
    roadDescription: 'Fully paved wide engineering pass with guardrails, dramatic switchbacks, and modern dual-lane climbing sections.',
    vehicleRequirement: '2WD rental car is completely fine on smooth asphalt.',
    highlights: ['Highest major mountain pass in North Africa (2,260m)', 'Snow-dusted peaks in winter', 'Authentic roadside argan oil cooperatives'],
    insiderTip: 'Stop at the summit panoramic lookout for a fresh spiced Berber mint tea and fresh walnut honey cakes from local mountain vendors.',
    fuelOrAtm: 'Roadside mountain cafes with restrooms; keep your fuel tank at least half-full.',
    photoUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ouarzazate',
    name: 'Ouarzazate',
    subname: 'The Gateway Oasis & Film Capital',
    lat: 30.9189,
    lng: -6.8934,
    elevation: 1160,
    distanceFromStartKm: 200,
    segmentType: 'paved',
    estimatedTime: '+4h 00m from Marrakech',
    roadDescription: 'Modern straight highway (N9 to N10). Wide, clean desert asphalt with 100 km/h speed limits.',
    vehicleRequirement: 'Standard 2WD rental car.',
    highlights: ['Atlas Film Studios', 'Kasbah Taourirt historic landmark', 'Ideal midpoint sit-down lunch stop'],
    insiderTip: 'Take your main lunch break here. Great outdoor cafes along Avenue Mohammed V serving hot chicken tagines with preserved lemons.',
    fuelOrAtm: 'Major regional hub: Total, Afriquia, Shell, and major bank ATMs (BMCE, Attijariwafa).',
    photoUrl: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'taznakht',
    name: 'Taznakht',
    subname: 'Saffron & Berber Carpet Heartland',
    lat: 30.5786,
    lng: -7.2039,
    elevation: 1400,
    distanceFromStartKm: 285,
    segmentType: 'paved',
    estimatedTime: '+5h 15m from Marrakech',
    roadDescription: 'Winding scenic asphalt through black volcanic rock formations (R111). Smooth pavement throughout.',
    vehicleRequirement: 'Standard 2WD rental car.',
    highlights: ['Women carpet cooperatives', 'Fresh Taliouine organic saffron', 'Turnoff point south toward the true desert'],
    insiderTip: 'This is the LAST town with reliable bank ATMs and full pharmacy services before you reach the Sahara. Withdraw enough Moroccan Dirhams for souvenirs and driver tips.',
    fuelOrAtm: 'Afriquia petrol station & ATM in town center. Top off your tank!',
    photoUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'foumzguid',
    name: 'Foum Zguid',
    subname: 'The Gateway Oasis & 4x4 Meeting Depot',
    lat: 30.0784,
    lng: -6.8727,
    elevation: 640,
    distanceFromStartKm: 360,
    segmentType: 'paved',
    estimatedTime: '+6h 30m from Marrakech (Paved terminus)',
    roadDescription: 'Asphalt N12 road ends here. This is the official boundary where tarmac stops and the wild Sahara begins.',
    vehicleRequirement: 'Leave your standard 2WD rental car here in secure shaded garage parking.',
    highlights: ['Designated DuneCamps & Bivouac Les Nomades meeting point', 'Secure gated parking depot included', 'Meet your Berber 4x4 desert driver & deflated tires check'],
    insiderTip: 'Relax at Café Restaurant La Palmeraie or Restaurant Iriki. Mustapha or your certified driver will greet you, load your luggage into the high-clearance Land Cruiser, and handle your parking securely.',
    fuelOrAtm: 'Local Afriquia station & local village ATM (may run dry occasionally, so Taznakht is safer for cash).',
    photoUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'iriki',
    name: 'Lake Iriki Flatlands',
    subname: 'The Prehistoric Dried Salt Lakebed',
    lat: 29.8450,
    lng: -6.5300,
    elevation: 505,
    distanceFromStartKm: 400,
    segmentType: 'offroad',
    estimatedTime: '+7h 45m (1h into 4x4 crossing)',
    roadDescription: 'Paris-Dakar off-road piste. Hard-packed clay and dried lakebed, framed by acacia trees and shimmering heat mirages.',
    vehicleRequirement: 'STRICTLY 4x4 with low-range gearbox, tire pressure reduced to 1.2 bar, driven by experienced desert tracker.',
    highlights: ['Iriki National Park biosphere', 'Historic Paris-Dakar rally route', '360° horizon mirages and desert fossils'],
    insiderTip: 'Keep your camera ready! The vast flatness allows the 4x4 to accelerate smoothly across the cracked clay, creating stunning cinematic dust plumes against the blue sky.',
    fuelOrAtm: 'Zero infrastructure. Pure desert wilderness under satellite navigation.',
    photoUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'destination',
    name: 'Bivouac Les Nomades',
    subname: 'Erg Chigaga High Dunes Sanctuary',
    lat: 29.8242,
    lng: -6.2558,
    elevation: 520,
    distanceFromStartKm: 427,
    segmentType: 'offroad',
    estimatedTime: '+8h 45m Total Journey (Arrival ~16:30 - 17:00)',
    roadDescription: 'Deep golden sand dunes navigation. Pure soft sand crests accessible only through local nomad pathways.',
    vehicleRequirement: 'Exclusive 4x4 transfer included with booking.',
    highlights: ['Towering 300-meter golden sand dunes', 'Warm Berber mint tea & nomadic welcome', 'Sunset camel trek into the golden ridge', 'Profound silence and unpolluted Milky Way night sky'],
    insiderTip: 'You will arrive just in time for sunset! Slip off your shoes, feel the cooling sand between your toes, and let the camp hosts carry your luggage to your private suite tent.',
    fuelOrAtm: 'Eco-solar sanctuary: 24/7 solar electricity, USB charging, hot running water showers, private en-suite flush toilets.',
    photoUrl: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=600&q=80'
  }
];

// Realistic detailed intermediate road polyline coordinates
const PAVED_COORDINATES: [number, number][] = [
  [31.6295, -7.9811], // Marrakech
  [31.5540, -7.8820],
  [31.4820, -7.7410],
  [31.4110, -7.5890],
  [31.3320, -7.4520],
  [31.2863, -7.3813], // Tizi n'Tichka
  [31.2210, -7.2650],
  [31.1450, -7.1320],
  [31.0210, -6.9950],
  [30.9189, -6.8934], // Ouarzazate
  [30.8240, -6.9820],
  [30.7120, -7.0940],
  [30.5786, -7.2039], // Taznakht
  [30.4320, -7.1120],
  [30.2850, -6.9850],
  [30.1650, -6.9120],
  [30.0784, -6.8727]  // Foum Zguid
];

const OFFROAD_COORDINATES: [number, number][] = [
  [30.0784, -6.8727], // Foum Zguid Oasis
  [30.0120, -6.8120],
  [29.9540, -6.7410],
  [29.8920, -6.6320],
  [29.8450, -6.5300], // Lake Iriki
  [29.8310, -6.4420],
  [29.8260, -6.3540],
  [29.8242, -6.2558]  // Bivouac Les Nomades (Erg Chigaga)
];

interface MarrakechToCampRouteMapProps {
  campName?: string;
  campSlug?: string;
  destinationCoords?: [number, number];
  meetingPointName?: string;
  className?: string;
}

export const MarrakechToCampRouteMap: React.FC<MarrakechToCampRouteMapProps> = ({
  campName = 'Bivouac Les Nomades',
  campSlug = 'bivouac-les-nomades',
  meetingPointName = 'Foum Zguid Village Depot',
  className = ''
}) => {
  const [activeWaypointId, setActiveWaypointId] = useState<string>('foumzguid');
  const [viewMode, setViewMode] = useState<'map' | 'profile'>('map');
  const [copiedCoords, setCopiedCoords] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const activeWaypoint = ROUTE_WAYPOINTS.find(w => w.id === activeWaypointId) || ROUTE_WAYPOINTS[4];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map instance centered across southern Morocco route
    const map = L.map(mapContainerRef.current, {
      center: [30.75, -7.10],
      zoom: 7,
      zoomControl: false,
      scrollWheelZoom: false
    });

    // Elegant CartoDB Voyager tiles (clean, soft-toned, excellent topographic and road contrast)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // 1. Draw Paved Asphalt Segment (Golden Terracotta Solid Line)
    const pavedPolyline = L.polyline(PAVED_COORDINATES, {
      color: '#BA7517',
      weight: 5,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    pavedPolyline.bindTooltip('<b>Paved Asphalt (N9 & R111)</b><br/>360 km • 6.5 hrs • 2WD Rental Car OK', {
      sticky: true,
      className: 'bg-stone-900 text-white text-xs px-2 py-1 rounded shadow-lg'
    });

    // 2. Draw Dakar Off-Road Dune Segment (Crimson Dashed Line)
    const offroadPolyline = L.polyline(OFFROAD_COORDINATES, {
      color: '#C2410C',
      weight: 5,
      opacity: 0.95,
      dashArray: '8, 10',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    offroadPolyline.bindTooltip('<b>Off-Road 4x4 Paris-Dakar Track</b><br/>67 km • 2h 15m • Guided 4x4 Dune Transfer Only', {
      sticky: true,
      className: 'bg-amber-900 text-white text-xs px-2 py-1 rounded shadow-lg'
    });

    // Fit map bounds to encompass all coordinates
    const allCoords = [...PAVED_COORDINATES, ...OFFROAD_COORDINATES];
    const bounds = L.latLngBounds(allCoords);
    map.fitBounds(bounds, { padding: [40, 40] });

    // Custom Waypoint Markers
    ROUTE_WAYPOINTS.forEach((wp) => {
      const isStart = wp.id === 'marrakech';
      const isMeeting = wp.id === 'foumzguid';
      const isEnd = wp.id === 'destination';

      let bgClass = 'bg-[#BA7517] text-white';
      let iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/></svg>`;

      if (isStart) {
        bgClass = 'bg-stone-900 text-white ring-2 ring-stone-400';
        iconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
      } else if (isMeeting) {
        bgClass = 'bg-amber-600 text-white ring-4 ring-amber-300 animate-pulse';
        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
      } else if (isEnd) {
        bgClass = 'bg-emerald-700 text-white ring-4 ring-emerald-300';
        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21v-4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"/><path d="M2 21h20"/><path d="M12 3 2 12h3v7h14v-7h3z"/></svg>`;
      } else if (wp.segmentType === 'offroad') {
        bgClass = 'bg-orange-600 text-white';
      }

      const markerHtml = `
        <div class="relative group cursor-pointer">
          <div class="w-8 h-8 rounded-full ${bgClass} shadow-xl flex items-center justify-center transition-transform transform hover:scale-125">
            ${iconSvg}
          </div>
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0B132B] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
            ${wp.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([wp.lat, wp.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div class="p-2 text-stone-900 text-xs font-sans max-w-xs">
          <div class="font-bold text-sm text-[#0B132B] mb-0.5">${wp.name}</div>
          <div class="text-[11px] text-[#BA7517] font-semibold mb-1">${wp.subname}</div>
          <div class="text-[11px] text-stone-600 mb-2">Elevation: <b>${wp.elevation}m</b> | Dist: <b>${wp.distanceFromStartKm} km</b></div>
          <p class="text-stone-700 text-[11px] leading-relaxed">${wp.insiderTip}</p>
        </div>
      `);

      marker.on('click', () => {
        setActiveWaypointId(wp.id);
      });

      markersRef.current[wp.id] = marker;
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // When active waypoint changes, smooth fly to it
  const handleSelectWaypoint = (id: string) => {
    setActiveWaypointId(id);
    const target = ROUTE_WAYPOINTS.find(w => w.id === id);
    if (target && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], target.segmentType === 'offroad' ? 10 : 9, {
        duration: 1.2
      });
      const marker = markersRef.current[id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const handleResetZoom = () => {
    if (!mapInstanceRef.current) return;
    const allCoords = [...PAVED_COORDINATES, ...OFFROAD_COORDINATES];
    const bounds = L.latLngBounds(allCoords);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText('29.8242, -6.2558');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  return (
    <div className={cn("bg-white rounded-3xl border border-[#BA7517]/25 shadow-md overflow-hidden", className)}>
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0B132B] via-[#1A264F] to-[#0B132B] text-white p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_right,_rgba(186,117,23,0.25),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#EF9F27] text-xs font-bold uppercase tracking-wider mb-2">
              <Compass size={15} />
              <span>Full Journey Route & Elevation Guide</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              The Road from Marrakech to Foum Zguid &amp; {campName}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl">
              From the High Atlas passes to the gateway oasis, ending 67 km deep inside Erg Chigaga dunes via Lake Iriki.
            </p>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-[#EF9F27] block">Total Distance</span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono">427 km</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-[#EF9F27] block">Drive Time</span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono">6.5h Road + 2h 4x4</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Rental 2WD Car</span>
              <span className="text-xs sm:text-sm font-bold text-white">Safe to Foum Zguid</span>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer",
                viewMode === 'map'
                  ? "bg-[#BA7517] text-white shadow-md"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              )}
            >
              <Navigation size={13} />
              <span>Interactive Route Map</span>
            </button>
            <button
              onClick={() => setViewMode('profile')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer",
                viewMode === 'profile'
                  ? "bg-[#BA7517] text-white shadow-md"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              )}
            >
              <Mountain size={13} />
              <span>Elevation Cross-Section</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 text-xs text-white/70">
            <span className="hidden sm:inline-flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BA7517] inline-block" />
              <span>Paved Road (360km)</span>
            </span>
            <span className="hidden sm:inline-flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" />
              <span>4x4 Off-Road (67km)</span>
            </span>
            {viewMode === 'map' && (
              <button 
                onClick={handleResetZoom}
                title="Reset Map Bounds"
                className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Map / Elevation Canvas */}
      <div className="relative">
        {viewMode === 'map' ? (
          <div className="relative h-[340px] sm:h-[420px] w-full bg-stone-100">
            {/* The actual Leaflet container */}
            <div ref={mapContainerRef} className="h-full w-full z-0" />

            {/* Floating Quick Legend Badge */}
            <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-stone-200 shadow-lg text-[11px] text-[#0B132B]">
              <div className="font-bold text-xs mb-1.5 text-[#0B132B] flex items-center space-x-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Road Surface Status</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-1 bg-[#BA7517] rounded-full inline-block" />
                  <span>Marrakech &rarr; Foum Zguid: <b>Smooth Paved Asphalt</b></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-1 bg-orange-600 border-t border-dashed border-white inline-block" />
                  <span>Foum Zguid &rarr; {campName}: <b>Dakar Off-Road 4x4</b></span>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Floating */}
            <div className="absolute top-4 left-4 z-[400]">
              <a
                href="https://www.google.com/maps/dir/?api=1&origin=Marrakech,+Morocco&destination=Foum+Zguid,+Morocco&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 hover:bg-white text-[#0B132B] px-3.5 py-2 rounded-xl text-xs font-bold shadow-lg border border-stone-200 transition-all flex items-center space-x-1.5 group"
              >
                <ExternalLink size={13} className="text-[#BA7517] group-hover:scale-110 transition-transform" />
                <span>Navigate in Google Maps</span>
              </a>
            </div>
          </div>
        ) : (
          /* Elevation Cross-Section Profile */
          <div className="p-6 sm:p-8 bg-[#FAF7F2] relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-[#0B132B] uppercase tracking-wider">
                  Topographic Profile: 466m &rarr; 2,260m &rarr; 520m
                </h4>
                <p className="text-xs text-[#0B132B]/70">
                  Explains the 6.5 hour drive time: ascending the High Atlas crest before dropping into the desert plateau.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#BA7517] bg-[#BA7517]/10 px-2.5 py-1 rounded-lg">
                High Atlas &rarr; Sahara
              </span>
            </div>

            {/* SVG Elevation Profile */}
            <div className="w-full overflow-x-auto pb-2">
              <div className="min-w-[640px]">
                <svg viewBox="0 0 640 180" className="w-full h-44 drop-shadow-sm">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="600" y2="20" stroke="#E2D9CC" strokeDasharray="3,3" />
                  <text x="35" y="24" textAnchor="end" className="text-[9px] fill-stone-400 font-mono">2500m</text>

                  <line x1="40" y1="70" x2="600" y2="70" stroke="#E2D9CC" strokeDasharray="3,3" />
                  <text x="35" y="74" textAnchor="end" className="text-[9px] fill-stone-400 font-mono">1500m</text>

                  <line x1="40" y1="120" x2="600" y2="120" stroke="#E2D9CC" strokeDasharray="3,3" />
                  <text x="35" y="124" textAnchor="end" className="text-[9px] fill-stone-400 font-mono">500m</text>

                  {/* Gradient Area Fill under elevation line */}
                  <defs>
                    <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#BA7517" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#BA7517" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#BA7517" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Filled Poly Path */}
                  <path
                    d="M 50 125 L 140 28 L 260 92 L 360 76 L 460 118 L 530 126 L 590 124 L 590 150 L 50 150 Z"
                    fill="url(#elevationGrad)"
                  />

                  {/* Elevation Curve Line */}
                  <path
                    d="M 50 125 L 140 28 L 260 92 L 360 76 L 460 118 L 530 126 L 590 124"
                    fill="none"
                    stroke="#BA7517"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Off-road section indicator */}
                  <line x1="460" y1="118" x2="590" y2="124" stroke="#C2410C" strokeWidth="4" strokeDasharray="6,6" />

                  {/* Data Points */}
                  {/* 1. Marrakech */}
                  <circle cx="50" cy="125" r="5" fill="#0B132B" stroke="#FFF" strokeWidth="2" />
                  <text x="50" y="145" textAnchor="middle" className="text-[10px] font-bold fill-[#0B132B]">Marrakech</text>
                  <text x="50" y="160" textAnchor="middle" className="text-[9px] fill-stone-500 font-mono">466m (km 0)</text>

                  {/* 2. Tizi n'Tichka */}
                  <circle cx="140" cy="28" r="6" fill="#BA7517" stroke="#FFF" strokeWidth="2" />
                  <text x="140" y="16" textAnchor="middle" className="text-[10px] font-bold fill-[#BA7517]">Tizi n'Tichka</text>
                  <text x="140" y="45" textAnchor="middle" className="text-[9px] fill-stone-600 font-mono font-bold">2,260m (km 105)</text>

                  {/* 3. Ouarzazate */}
                  <circle cx="260" cy="92" r="5" fill="#BA7517" stroke="#FFF" strokeWidth="2" />
                  <text x="260" y="110" textAnchor="middle" className="text-[10px] font-bold fill-[#0B132B]">Ouarzazate</text>
                  <text x="260" y="122" textAnchor="middle" className="text-[9px] fill-stone-500 font-mono">1,160m (km 200)</text>

                  {/* 4. Taznakht */}
                  <circle cx="360" cy="76" r="5" fill="#BA7517" stroke="#FFF" strokeWidth="2" />
                  <text x="360" y="94" textAnchor="middle" className="text-[10px] font-bold fill-[#0B132B]">Taznakht</text>
                  <text x="360" y="106" textAnchor="middle" className="text-[9px] fill-stone-500 font-mono">1,400m (km 285)</text>

                  {/* 5. Foum Zguid */}
                  <circle cx="460" cy="118" r="6" fill="#C2410C" stroke="#FFF" strokeWidth="2" className="animate-pulse" />
                  <text x="460" y="136" textAnchor="middle" className="text-[10px] font-bold fill-[#C2410C]">Foum Zguid</text>
                  <text x="460" y="148" textAnchor="middle" className="text-[9px] fill-[#C2410C] font-mono font-bold">640m (Meeting Depot)</text>

                  {/* 6. Lake Iriki */}
                  <circle cx="530" cy="126" r="4" fill="#C2410C" stroke="#FFF" strokeWidth="1.5" />
                  <text x="530" y="142" textAnchor="middle" className="text-[9px] font-medium fill-stone-600">Lake Iriki</text>
                  <text x="530" y="154" textAnchor="middle" className="text-[8px] fill-stone-500 font-mono">505m</text>

                  {/* 7. Erg Chigaga Destination */}
                  <circle cx="590" cy="124" r="6" fill="#047857" stroke="#FFF" strokeWidth="2" />
                  <text x="580" y="112" textAnchor="middle" className="text-[10px] font-bold fill-[#047857]">Erg Chigaga</text>
                  <text x="580" y="140" textAnchor="middle" className="text-[9px] fill-[#047857] font-mono font-bold">520m ({campName})</text>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Horizontal Interactive Waypoint Stepper Bar */}
      <div className="bg-[#FAF7F2] p-4 sm:p-5 border-y border-[#BA7517]/20">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B132B]/60 block mb-2">
          Click any stage to view logistics &amp; driving advice:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {ROUTE_WAYPOINTS.map((wp, idx) => {
            const isActive = activeWaypointId === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => handleSelectWaypoint(wp.id)}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                  isActive
                    ? "bg-[#0B132B] text-white border-[#0B132B] shadow-md ring-2 ring-[#BA7517]"
                    : "bg-white text-[#0B132B] border-stone-200/80 hover:border-[#BA7517]/40 hover:bg-stone-50"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "text-[10px] font-mono font-bold px-1.5 py-0.2 rounded",
                    isActive ? "bg-[#BA7517] text-white" : "bg-stone-100 text-stone-600"
                  )}>
                    0{idx + 1}
                  </span>
                  <span className={cn(
                    "text-[8px] font-bold uppercase px-1 rounded",
                    wp.segmentType === 'paved' 
                      ? (isActive ? "text-emerald-300" : "text-emerald-700 bg-emerald-50")
                      : (isActive ? "text-orange-300" : "text-orange-700 bg-orange-50")
                  )}>
                    {wp.segmentType === 'paved' ? 'Paved' : '4x4'}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-xs truncate">{wp.name}</div>
                  <div className={cn("text-[10px] font-mono", isActive ? "text-white/70" : "text-stone-500")}>
                    {wp.distanceFromStartKm} km • {wp.elevation}m
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Waypoint Detailed Drawer Card */}
      <div className="p-6 sm:p-7 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Waypoint Photo & Core Metrics */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm aspect-video sm:aspect-auto sm:h-48 group">
            <img 
              src={activeWaypoint.photoUrl} 
              alt={activeWaypoint.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] uppercase font-bold text-[#EF9F27] tracking-wider block">
                Stage Detail
              </span>
              <h4 className="text-base font-serif font-bold text-white">{activeWaypoint.name}</h4>
              <p className="text-[11px] text-white/80 line-clamp-1">{activeWaypoint.subname}</p>
            </div>
          </div>

          {/* Logistics Data & Suitability */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/70 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA7517] block">
                  Road Condition &amp; Vehicle
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="font-bold text-sm text-[#0B132B]">{activeWaypoint.roadDescription}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={cn(
                  "px-3 py-1 rounded-xl text-xs font-bold",
                  activeWaypoint.segmentType === 'paved'
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    : "bg-orange-100 text-orange-950 border border-orange-300"
                )}>
                  {activeWaypoint.vehicleRequirement}
                </span>
              </div>
            </div>

            {/* Highlights & Insider Tip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#BA7517]/15">
                <span className="font-bold text-[#0B132B] flex items-center space-x-1.5 mb-1.5">
                  <Sparkles size={14} className="text-[#BA7517]" />
                  <span>Key Waypoint Highlights:</span>
                </span>
                <ul className="space-y-1 text-[#0B132B]/80">
                  {activeWaypoint.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#BA7517] font-bold">&bull;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60">
                <span className="font-bold text-amber-900 flex items-center space-x-1.5 mb-1.5">
                  <Info size={14} className="text-amber-700" />
                  <span>Verified Nomad Insider Tip:</span>
                </span>
                <p className="text-amber-950/85 leading-relaxed">
                  {activeWaypoint.insiderTip}
                </p>
                <div className="mt-2 pt-2 border-t border-amber-200/60 text-[11px] text-amber-800">
                  <strong>Fuel &amp; Cash:</strong> {activeWaypoint.fuelOrAtm}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Bottom Actionable Bar (Google Maps, GPS, WhatsApp) */}
        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-stone-600">
            <MapPin size={15} className="text-[#BA7517]" />
            <span>Erg Chigaga Camp Coordinates: <code className="bg-stone-100 px-2 py-0.5 rounded font-mono font-bold text-[#0B132B]">29.8242° N, 6.2558° W</code></span>
            <button
              onClick={handleCopyCoords}
              className="p-1 text-stone-500 hover:text-[#BA7517] transition-colors cursor-pointer"
              title="Copy GPS coordinates"
            >
              {copiedCoords ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {/* Direct Google Maps Route */}
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=Marrakech,+Morocco&destination=Foum+Zguid,+Morocco&travelmode=driving"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none bg-[#0B132B] hover:bg-stone-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
            >
              <Navigation size={13} className="text-[#EF9F27]" />
              <span>Marrakech &rarr; Foum Zguid in Google Maps</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>

            {/* Direct WhatsApp Host Coordination */}
            <a
              href={`https://wa.me/212661845878?text=${encodeURIComponent(`Hello Mustapha, I am preparing my trip from Marrakech to Foum Zguid for ${campName}. Can you confirm the exact meeting point & arrival schedule?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5"
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">Coordinate with Host</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MarrakechToCampRouteMap;
