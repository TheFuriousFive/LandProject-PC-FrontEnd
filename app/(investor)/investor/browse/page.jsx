import Link from "next/link";
import { Search, MapPin, Ruler, DollarSign } from "lucide-react";

export default function InvestorDashboard() {
  const availableLands = [
    {
      id: 1,
      title: "Premium Agricultural Land",
      location: "Iowa",
      acres: 320,
      price: "$1.2M",
      zoning: "Agricultural",
      status: "Verified",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Development Ready Plot",
      location: "Texas",
      acres: 85,
      price: "$850K",
      zoning: "Mixed Use",
      status: "Verified",
      imageUrl:
        "https://images.unsplash.com/photo-1492617519907-e0f71f7c76fc?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Find Your Investment
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Browse verified land listings from verified sellers across the
          country.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="md:col-span-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search location, property type..."
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
            />
          </div>
        </div>

        <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors">
          <option>All Zoning Types</option>
          <option>Agricultural</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Mixed Use</option>
        </select>

        <select className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-3 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors">
          <option>Price: Any</option>
          <option>Under $500K</option>
          <option>$500K - $1M</option>
          <option>$1M - $5M</option>
          <option>$5M+</option>
        </select>
      </div>

      {/* Listing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {availableLands.map((land) => (
          <Link
            key={land.id}
            href={`/property/${land.id}`}
            className="group block"
          >
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src={land.imageUrl}
                  alt={land.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Status */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#9afb21] transition-colors">
                      {land.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm gap-1">
                      <MapPin size={16} />
                      {land.location}
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {land.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Ruler size={14} />
                      Acres
                    </div>
                    <p className="font-bold text-gray-900">{land.acres}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <DollarSign size={14} />
                      Price
                    </div>
                    <p className="font-bold text-gray-900">{land.price}</p>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs mb-1">Zoning</div>
                    <p className="font-bold text-gray-900 text-sm">
                      {land.zoning}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#9afb21] text-black hover:bg-[#8aec1b] font-bold py-2.5 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-[#9afb21] text-[#9afb21] hover:bg-[#9afb21]/5 font-bold py-2.5 rounded-lg transition-colors">
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
