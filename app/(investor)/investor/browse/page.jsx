"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Loader2, X } from "lucide-react";
import LandCard from "../../_components/LandCard";

export default function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Fitler states
  const [filters, setFilters] = useState({
    keyword: "",
    landType: "All",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    osmLandUse: "All",
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL;
        let token = "";
        if (typeof window !== "undefined") {
          const rawToken = localStorage.getItem("token") || "";
          token = rawToken.replace(/^"|"$/g, "").trim();
        }

        // According to instructions, use the endpoint mapping: /land-listings or /landapp/investors/search
        // This targets the specific Spring Boot @GetMapping("/search") from instructions
        // We will default hit this endpoint and parse JSON.
        const response = await fetch(`${API_BASE}/landapp/investors/search`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch listings from network.");
        }

        const data = await response.json();
        setListings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "Fetch failed, potentially backend isn't ready. Falling back to structured mock data for UI:",
          error,
        );

        // Fallback data strictly following the Entity shape so UI can be tested currently
        const mockData = [
          {
            id: 1,
            title: "Premium Agricultural Land",
            description: "Fertile soil, great for crops and farming.",
            price: 1200000,
            area: 320,
            location: "Iowa, IA",
            landType: "Agricultural",
            verificationStatus: "VERIFIED",
            status: "active",
            osmLandUse: "Farmland",
            imageUrls: [
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
            ],
          },
          {
            id: 2,
            title: "Development Ready Plot",
            description: "Prime location for residential development.",
            price: 850000,
            area: 85,
            location: "Texas, TX",
            landType: "Mixed Use",
            verificationStatus: "VERIFIED",
            status: "active",
            osmLandUse: "Meadow",
            imageUrls: [
              "https://images.unsplash.com/photo-1492617519907-e0f71f7c76fc?q=80&w=800&auto=format&fit=crop",
            ],
          },
          {
            id: 3,
            title: "Pine Forest Retreat",
            description: "Beautiful timber property with road access.",
            price: 450000,
            area: 120,
            location: "Oregon, OR",
            landType: "Residential",
            verificationStatus: "UNVERIFIED",
            status: "active",
            osmLandUse: "Forest",
            imageUrls: [
              "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
            ],
          },
        ];
        setListings(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Client-Side Filtration Logic
  // (Provides instant filtering while backend API sorting gets wired up)
  useEffect(() => {
    let result = listings;

    if (filters.keyword.trim() !== "") {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (l) =>
          l.title?.toLowerCase().includes(kw) ||
          l.location?.toLowerCase().includes(kw),
      );
    }

    if (filters.landType !== "All") {
      result = result.filter(
        (l) => (l.landType || l.land_type) === filters.landType,
      );
    }

    if (filters.minPrice !== "") {
      result = result.filter((l) => l.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice !== "") {
      result = result.filter((l) => l.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minArea !== "") {
      result = result.filter((l) => l.area >= parseFloat(filters.minArea));
    }

    if (filters.maxArea !== "") {
      result = result.filter((l) => l.area <= parseFloat(filters.maxArea));
    }

    if (filters.osmLandUse !== "All") {
      result = result.filter(
        (l) => l.osmLandUse?.toLowerCase() === filters.osmLandUse.toLowerCase(),
      );
    }

    setFilteredListings(result);
  }, [filters, listings]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      keyword: "",
      landType: "All",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
      osmLandUse: "All",
    });
  };

  return (
    <main className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Find Your Investment
        </h1>
        <p className="text-gray-500 font-medium text-lg text-balance">
          Browse and filter vetted land listings aligned with your investment
          goals.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            placeholder="Search by title or location..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-[#9afb21] focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm border ${
            showFilters
              ? "bg-[#0f0f11] text-[#9afb21] border-[#0f0f11]"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Expandable Filters Overlay */}
      {showFilters && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-900">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <X size={14} /> Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Land Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Zoning / Type
              </label>
              <select
                name="landType"
                value={filters.landType}
                onChange={handleFilterChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#9afb21]"
              >
                <option value="All">All Types</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Mixed Use">Mixed Use</option>
              </select>
            </div>

            {/* Sub-Environment / OSM */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Environment (OSM)
              </label>
              <select
                name="osmLandUse"
                value={filters.osmLandUse}
                onChange={handleFilterChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#9afb21]"
              >
                <option value="All">Any Environment</option>
                <option value="Farmland">Farmland</option>
                <option value="Forest">Forest</option>
                <option value="Meadow">Meadow / Grass</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Price Range ($)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#9afb21]"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#9afb21]"
                />
              </div>
            </div>

            {/* Area Range */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Area (Acres)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minArea"
                  value={filters.minArea}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#9afb21]"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  name="maxArea"
                  value={filters.maxArea}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#9afb21]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Results */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#9afb21]" size={48} />
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search className="text-gray-300" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-500 max-w-md">
            We couldn&apos;t find any land listings matching your exact filters.
            Try adjusting your search keywords, price, or area limits.
          </p>
          {showFilters && (
            <button
              onClick={clearFilters}
              className="mt-6 font-bold text-black border-2 border-black px-6 py-2.5 rounded-xl hover:bg-black hover:text-[#9afb21] transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredListings.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      )}
    </main>
  );
}
