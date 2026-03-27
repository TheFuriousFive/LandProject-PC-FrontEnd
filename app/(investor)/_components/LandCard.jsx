import Link from "next/link";
import { MapPin, Ruler, CheckCircle, Trees } from "lucide-react";

export default function LandCard({ land }) {
  // Format price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(land.price || 0);

  // Extract first image, fallback if none
  const primaryImage =
    land.imageUrls?.length > 0
      ? land.imageUrls[0]
      : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop";

  const isVerified =
    land.verificationStatus === "VERIFIED" ||
    land.verification_status === "verified";

  let displayLandType = land.landType || land.land_type || "Land";
  if (displayLandType === "Error fetching data") {
    displayLandType = "Land";
  }

  return (
    <Link href={`/property/${land.id}`} className="block group h-full">
      <div className="bg-white border text-left border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={primaryImage}
            alt={land.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className="bg-white/95 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {displayLandType}
            </span>
            {isVerified && (
              <span className="bg-[#9afb21] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 w-fit">
                <CheckCircle size={14} /> Verified
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-3">
            <h3
              className="font-bold text-lg text-gray-900 line-clamp-1 flex-1"
              title={land.title}
            >
              {land.title}
            </h3>
            <span className="font-extrabold text-[#9afb21] bg-[#0f0f11] px-3 py-1.5 rounded-lg text-sm shrink-0 shadow-sm">
              {formattedPrice}
            </span>
          </div>

          <div className="text-gray-500 text-sm flex items-center gap-1.5 mb-4 line-clamp-1">
            <MapPin size={16} className="shrink-0 text-gray-400" />
            <span className="truncate">{land.location}</span>
          </div>

          {/* Bottom Meta Data */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Ruler size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-900">
                {land.area}
              </span>{" "}
              Acres
            </div>
            {land.osmLandUse && (
              <div className="flex items-center gap-1.5">
                <Trees size={16} className="text-gray-400" />
                <span
                  className="font-semibold text-gray-900 truncate"
                  title={land.osmLandUse}
                >
                  {land.osmLandUse}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
