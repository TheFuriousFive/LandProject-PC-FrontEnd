import Image from "next/image";
import { Clock, X, Edit2, Trash2 } from "lucide-react";

export default function ListingCard({
  title,
  location,
  acres,
  status,
  imageUrl,
}) {
  // Helpers to determine badge colors and icons based on status
  const isPending = status === "Pending";
  const badgeClasses = isPending
    ? "text-orange-500 border-orange-200 bg-orange-50/50"
    : "text-red-500 border-red-200 bg-red-50/50";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
      {/* Property Image */}
      <div className="shrink-0">
        <Image
          width={100}
          height={100}
          src={imageUrl}
          alt={title}
          className="w-full md:w-[220px] h-36 object-cover rounded-xl"
        />
      </div>

      {/* Property Details */}
      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between flex-1 py-1">
        {/* Top section: Title, Subtitle, and Badge */}
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-[22px] font-bold text-gray-900 tracking-tight">
              {title}
            </h3>

            {/* Status Badge */}
            <div
              className={`flex items-center space-x-1.5 border px-3 py-1.5 rounded-full text-xs font-bold ${badgeClasses}`}
            >
              {isPending ? <Clock size={14} /> : <X size={14} />}
              <span>{status}</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">
            {location} • {acres} Acres
          </p>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-100" />

        {/* Bottom Actions */}
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold text-sm">
            <Edit2 size={16} />
            <span>Edit Details</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors font-semibold text-sm">
            <Trash2 size={16} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
