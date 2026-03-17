import Link from "next/link";
import ListingCard from "../_components/ListComponent";
import { Plus } from "lucide-react";

export default function MyListingsPage() {
  // Dummy data to populate the cards
  const listings = [
    {
      id: 1,
      title: "Texas Farmland",
      location: "Austin, TX",
      acres: 50,
      status: "Pending",
      imageUrl:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Oregon Development Site",
      location: "Portland, OR",
      acres: 12,
      status: "Rejected",
      imageUrl:
        "https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <main className="p-8 md:p-12 max-w-5xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            My Listings
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Manage your land advertisements and track approval status.
          </p>
        </div>

        {/* Add New Land Button */}
        <button className="bg-[#0f0f11] text-[#9afb21] hover:bg-black transition-colors px-5 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 text-sm shadow-md flex-shrink-0">
          <Plus size={18} />
          <span>Add New Land</span>
        </button>
      </header>

      {/* Cards List */}
      <div className="space-y-5">
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/property/${listing.id}`}
            className="block hover:opacity-90 transition-opacity"
          >
            <ListingCard
              title={listing.title}
              location={listing.location}
              acres={listing.acres}
              status={listing.status}
              imageUrl={listing.imageUrl}
            />
          </Link>
        ))}

        {/* Empty state fallback (optional, for when listings array is empty) */}
        {listings.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
            <p className="text-gray-500 font-medium">
              You don&apos;t have any listings yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
