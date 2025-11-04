import { MapPin } from "lucide-react";

interface MapSectionProps {
  address: string;
}

export default function MapSection({ address }: MapSectionProps) {
  // Encode address for Google Maps embed URL
  const encodedAddress = encodeURIComponent(address);

  // For a simpler approach without API key, we can use a regular Google Maps link
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Our Location</h3>
            <p className="text-gray-600">{address}</p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-96 bg-gray-200">
        {/* Using iframe for Google Maps - requires API key */}
        {/* Uncomment and add your API key to use embedded map */}
        {/* <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title="Business location map"
        /> */}

        {/* Fallback: Static image with link to open in Google Maps */}
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-700 mb-4 px-4">
              Click below to view our location on Google Maps
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-2"
        >
          <span>Get Directions</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
