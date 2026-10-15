import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, Image as ImageIcon, ArrowRight, Sparkles, Folder, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const DESTINATIONS = [
  { id: 'foum-zguid', name: 'Foum Zguid & Erg Chigaga Gateway' },
  { id: 'zagora', name: 'Zagora & Draa Valley' },
  { id: 'mhamid', name: 'M’Hamid El Ghizlane' },
  { id: 'agafay', name: 'Agafay Desert Marrakech' },
  { id: 'ouarzazate', name: 'Ouarzazate & Kasbahs' },
  { id: 'merzouga', name: 'Merzouga & Erg Chebbi' }
];

const PRESET_SLOTS: Record<string, { id: string; label: string; desc: string }[]> = {
  'bivouac-les-nomades': [
    { id: 'bln-hero.jpg', label: 'Main Hero Cover (bln-hero.jpg)', desc: 'Primary landscape photo showing camp panorama & golden dunes' },
    { id: 'bln-tent-luxury.jpg', label: 'Luxury Canvas Suite (bln-tent-luxury.jpg)', desc: 'Spacious glamping tent interior with en-suite bath' },
    { id: 'bln-gallery-night.jpg', label: 'Night & Stargazing (bln-gallery-night.jpg)', desc: 'Camp illuminated under the Milky Way' },
    { id: 'bln-lake-iriki.jpg', label: 'Lake Iriki Crossing (bln-lake-iriki.jpg)', desc: '4x4 transit across the ancient dry salt flats' },
    { id: 'bln-gallery-01.jpg', label: 'Camp Overview (bln-gallery-01.jpg)', desc: 'General camp landscape from surrounding dune' },
    { id: 'bln-gallery-02.jpg', label: 'Tent Bedding & Rugs (bln-gallery-02.jpg)', desc: 'Close-up of cozy nomadic decor' },
    { id: 'bln-activity-camel.jpg', label: 'Sunset Camel Trek (bln-activity-camel.jpg)', desc: 'Caravan traversing the Erg Chegaga crest' },
    { id: 'bln-food-tagine.jpg', label: 'Campfire Tagine Dinner (bln-food-tagine.jpg)', desc: 'Evening candlelit Moroccan dining' },
    { id: 'bln-host-mustapha.jpg', label: 'Founder Mustapha Portrait (bln-host-mustapha.jpg)', desc: 'Master guide & host in traditional cheche' }
  ]
};

export default function PhotoUploader() {
  const [destination, setDestination] = useState('foum-zguid');
  const [lodge, setLodge] = useState('bivouac-les-nomades');
  const [filename, setFilename] = useState('bln-hero.jpg');
  const [customFilename, setCustomFilename] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState<string>('');
  const [savedUrl, setSavedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setResultMessage('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      setBase64Data(result);
      setStatus('idle');
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!base64Data) {
      setStatus('error');
      setResultMessage('Please choose an image file first.');
      return;
    }

    const finalFilename = filename === 'custom' ? customFilename.trim() : filename;
    if (!finalFilename) {
      setStatus('error');
      setResultMessage('Please specify a filename.');
      return;
    }

    setStatus('uploading');
    setResultMessage('');

    try {
      const res = await fetch('/api/upload-lodge-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          lodge,
          filename: finalFilename.endsWith('.jpg') || finalFilename.endsWith('.png') || finalFilename.endsWith('.webp') 
            ? finalFilename 
            : `${finalFilename}.jpg`,
          base64Data
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setSavedUrl(`${data.url}?t=${Date.now()}`);
        setResultMessage(`Image saved successfully to ${data.url}`);
      } else {
        setStatus('error');
        setResultMessage(data.error || 'Failed to save image.');
      }
    } catch (err: any) {
      setStatus('error');
      setResultMessage(err.message || 'Network error occurred while uploading.');
    }
  };

  const currentSlots = PRESET_SLOTS[lodge] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#BA7517]/20 pb-5">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B132B] text-[#EF9F27] border border-[#BA7517]/40 mb-3">
          <Folder size={14} className="text-[#EF9F27]" />
          <span>Lodge Asset Management</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#0B132B]">
          Direct Lodge Photo Uploader
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          Instantly upload or replace high-resolution photographs into the organized public directory (<code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs text-stone-800">/public/images/destinations/[destination]/[lodge]/</code>).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upload Form */}
        <form onSubmit={handleUpload} className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#BA7517]/25 shadow-sm space-y-6">
          {/* Destination & Lodge Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-2">
                1. Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#0B132B] font-medium focus:outline-none focus:border-[#BA7517]"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-2">
                2. Lodge Folder
              </label>
              <select
                value={lodge}
                onChange={(e) => setLodge(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-[#0B132B] font-medium focus:outline-none focus:border-[#BA7517]"
              >
                <option value="bivouac-les-nomades">Bivouac Les Nomades (bln-)</option>
                <option value="azalai-desert-bivouac-chigaga">Azalaï Desert Bivouac</option>
                <option value="erg-chigaga-luxury-sanctuary">Erg Chigaga Luxury Sanctuary</option>
                <option value="sands-of-iriki-luxury-bivouac">Sands of Iriki</option>
                <option value="custom">Other / Custom Lodge</option>
              </select>
            </div>
          </div>

          {/* Slot Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-2">
              3. Target Photo Slot
            </label>
            <div className="space-y-2">
              {currentSlots.map((slot) => (
                <label
                  key={slot.id}
                  className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${
                    filename === slot.id 
                      ? 'bg-[#FAF7F2] border-[#BA7517] ring-1 ring-[#BA7517]' 
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={slot.id}
                    checked={filename === slot.id}
                    onChange={() => setFilename(slot.id)}
                    className="mt-1 text-[#BA7517] focus:ring-[#BA7517]"
                  />
                  <div className="ml-3">
                    <span className="block text-xs font-bold text-[#0B132B]">{slot.label}</span>
                    <span className="block text-[11px] text-stone-500">{slot.desc}</span>
                  </div>
                </label>
              ))}

              <label
                className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                  filename === 'custom' 
                    ? 'bg-[#FAF7F2] border-[#BA7517] ring-1 ring-[#BA7517]' 
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="slot"
                  value="custom"
                  checked={filename === 'custom'}
                  onChange={() => setFilename('custom')}
                  className="text-[#BA7517] focus:ring-[#BA7517]"
                />
                <span className="ml-3 text-xs font-bold text-[#0B132B]">Custom Filename</span>
              </label>

              {filename === 'custom' && (
                <div className="pl-6 pt-1">
                  <input
                    type="text"
                    value={customFilename}
                    onChange={(e) => setCustomFilename(e.target.value)}
                    placeholder="e.g. bln-new-panoramic.jpg"
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-mono text-[#0B132B] focus:outline-none focus:border-[#BA7517]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* File Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B132B] mb-2">
              4. Choose Image File from Device
            </label>
            <div className="relative border-2 border-dashed border-stone-300 hover:border-[#BA7517] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-[#FAF7F2]/40">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-stone-200 flex items-center justify-center text-[#BA7517]">
                  <Upload size={22} />
                </div>
                <p className="text-xs font-bold text-[#0B132B]">
                  Click or drag your photo here
                </p>
                <p className="text-[11px] text-stone-500">
                  Select <code className="font-semibold text-stone-700">bln-hero.jpg.jpg</code> or any high-res camp image
                </p>
              </div>
            </div>
          </div>

          {/* Status Alert */}
          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center space-x-2">
              <AlertCircle size={16} className="text-red-600 shrink-0" />
              <span>{resultMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-semibold">{resultMessage}</span>
              </div>
              <Link
                to="/destinations/foum-zguid/bivouac-les-nomades"
                className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shrink-0"
              >
                <span>View Live Camp</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'uploading' || !base64Data}
            className={`w-full py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              status === 'uploading' || !base64Data
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-[#BA7517] hover:bg-[#9E6010] text-white'
            }`}
          >
            {status === 'uploading' ? (
              <span>Saving image to server...</span>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Replace / Save Photo to Portfolio</span>
              </>
            )}
          </button>
        </form>

        {/* Live Preview Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#BA7517]/25 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B132B]">
                Selected Image Preview
              </h3>
              <span className="text-[10px] text-stone-500 font-mono">
                {filename === 'custom' ? customFilename : filename}
              </span>
            </div>

            {previewUrl ? (
              <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-video bg-stone-900 relative group">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-200 aspect-video flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <span className="text-xs font-medium">No photo selected yet</span>
              </div>
            )}

            <div className="text-[11px] text-stone-500 space-y-1 pt-2 border-t border-stone-100">
              <p>• Destination: <strong className="text-stone-700">{destination}</strong></p>
              <p>• Lodge: <strong className="text-stone-700">{lodge}</strong></p>
              <p>• Target Path: <code className="text-stone-800 bg-stone-100 px-1 rounded">/public/images/destinations/{destination}/{lodge}/{filename}</code></p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-stone-200/80 space-y-3">
            <span className="text-xs font-bold text-[#0B132B] block">Quick Navigation</span>
            <Link
              to="/destinations/foum-zguid/bivouac-les-nomades"
              className="flex items-center justify-between text-xs font-semibold text-[#BA7517] hover:underline"
            >
              <span>Open Bivouac Les Nomades Camp Page</span>
              <Eye size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
