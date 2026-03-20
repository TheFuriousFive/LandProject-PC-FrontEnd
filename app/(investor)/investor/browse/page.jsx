import Link from "next/link";
import { Search, MapPin, Ruler, DollarSign } from "lucide-react";
import BackButton from "@/_components/BackButton";

export default function InvestorDashboard() {

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-6">
        <BackButton />
      </div>
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
        {false && (
          <></>
        )}
        {true && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg font-medium">No listings available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
