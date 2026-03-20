import Link from "next/link";
import { Heart, Trash2, MapPin } from "lucide-react";
import BackButton from "@/_components/BackButton";

export const metadata = {
  title: "Favorites | Investor Portal",
};

export default function InvestorFavorites() {
  const favorites = [];

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Your Favorites
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Keep track of properties you&apos;re interested in.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="mx-auto text-gray-300 mb-4" size={64} />
          <p className="text-gray-500 text-lg font-medium">No favorites yet.</p>
          <p className="text-gray-400 text-sm mt-2">Start adding properties to your favorites!</p>
        </div>
      ) : (
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
                  {typeof land.location === 'object' && land.location !== null ? `${land.location.city || ''}, ${land.location.state || ''}` : land.location}
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
      )}
    </main>
  );
}
