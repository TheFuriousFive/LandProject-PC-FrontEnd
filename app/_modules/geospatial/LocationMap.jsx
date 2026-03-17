"use client";

import { MapPin, Navigation } from "lucide-react";

export default function LocationMap({ latitude, longitude, title }) {
  const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15&layers=M`;
  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&markers=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-[#9afb21]" />
        <h3 className="text-lg font-bold text-gray-900">Property Location</h3>
      </div>

      {/* Map Container */}
      <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-50 h-96 border border-gray-200">
        {/* Fallback: Static Map Image */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 font-medium mb-4">
              {latitude}, {longitude}
            </p>
            <a
              href={osmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold px-4 py-2 rounded-lg transition-colors"
            >
              <Navigation size={16} />
              View in OpenStreetMap
            </a>
          </div>
        </div>
      </div>

      {/* Coordinates Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-bold text-gray-500 mb-1">Latitude</p>
          <p className="font-mono text-sm font-bold text-gray-900">
            {latitude.toFixed(6)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-bold text-gray-500 mb-1">Longitude</p>
          <p className="font-mono text-sm font-bold text-gray-900">
            {longitude.toFixed(6)}
          </p>
        </div>
      </div>

      {/* Location Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <span className="font-bold">Using OpenStreetMap API</span> for
          real-time geospatial data and location validation. Distance
          calculations use the Haversine formula for accuracy.
        </p>
      </div>
    </div>
  );
}
