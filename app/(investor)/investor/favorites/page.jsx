import Link from "next/link";
import { Heart, Trash2, MapPin } from "lucide-react";

export const metadata = {
  title: "Favorites | Investor Portal",
};

export default function InvestorFavorites() {
  const favorites = [
    {
      id: 1,
      title: "Premium Agricultural Land",
      location: "Iowa",
      acres: 320,
      price: "$1.2M",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Development Ready Plot",
      location: "Texas",
      acres: 85,
      price: "$850K",
      imageUrl:
        "https://images.unsplash.com/photo-1492617519907-e0f71f7c76fc?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Your Favorites
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Keep track of properties you&apos;re interested in.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((land) => (
          <div
            key={land.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group group/card relative"
          >
            {/* Image */}
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img
                src={land.imageUrl}
                alt={land.title}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {land.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={16} className="mr-1" />
                  {land.location}
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    {land.acres} Acres
                  </p>
                  <p className="text-xl font-extrabold text-gray-900">
                    {land.price}
                  </p>
                </div>
                <Link
                  href={`/property/${land.id}`}
                  className="bg-[#0f0f11] text-[#9afb21] px-4 py-2 rounded-xl text-sm font-bold hover:bg-black transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start browsing to find your next investment.
          </p>
          <Link
            href="/investor/browse"
            className="bg-[#9afb21] text-[#0f0f11] px-6 py-3 rounded-xl font-bold hover:bg-[#8bed1c] transition-colors inline-block"
          >
            Browse Listings
          </Link>
        </div>
      )}
    </main>
  );
}
