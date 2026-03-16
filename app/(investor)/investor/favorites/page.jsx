import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Ruler, DollarSign, Trash2 } from "lucide-react";

export default function InvestorFavorites() {
  const favorites = [
    {
      id: 2,
      title: "Development Ready Plot",
      location: "Texas",
      acres: 85,
      price: "$850K",
      zoning: "Mixed Use",
      imageUrl:
        "https://images.unsplash.com/photo-1492617519907-e0f71f7c76fc?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Saved Favorites
        </h1>
        <p className="text-gray-500 font-medium">
          Listings you have bookmarked for later.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center">
          <Heart className="mx-auto text-gray-300 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-500 mb-6">
            You haven&apos;t saved any listings to your favorites.
          </p>
          <Link
            href="/investor/browse"
            className="bg-[#0f0f11] text-[#9afb21] px-6 py-3 rounded-xl font-semibold hover:bg-black transition-colors"
          >
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((land) => (
            <div
              key={land.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow relative group"
            >
              <button className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm">
                <Trash2 size={18} />
              </button>

              <Link href={`/property/${land.id}`} className="block">
                <div className="h-52 relative bg-gray-200 overflow-hidden">
                  <Image
                    src={land.imageUrl}
                    alt={land.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#9afb21] transition-colors line-clamp-1">
                    {land.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm gap-1 mb-4">
                    <MapPin size={16} />
                    {land.location}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-gray-500 text-xs flex items-center gap-1 mb-1">
                        <Ruler size={12} /> Acres
                      </div>
                      <div className="font-bold">{land.acres}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs flex items-center gap-1 mb-1">
                        <DollarSign size={12} /> Price
                      </div>
                      <div className="font-bold">{land.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
