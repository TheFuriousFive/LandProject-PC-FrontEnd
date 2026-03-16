"use client";
import { CheckCircle, Search, Eye } from "lucide-react";
import { useMinistry } from "../../_components/MinistryProvider";
import { useState } from "react";

export default function ApprovedListings() {
  const { listings } = useMinistry();
  const approvedListings = listings.filter((l) => l.status === "approved");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredListings = approvedListings.filter(
    (l) =>
      l.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ownerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Approved Listings
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Manage and view all actively approved land listings.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9afb21] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-2xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Approved Listings Found
            </h3>
            <p className="text-gray-500">
              Either no listings have been approved yet, or your search didn't
              match any properties.
            </p>
          </div>
        ) : (
          filteredListings.map((approval) => (
            <div
              key={approval.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-40 bg-gray-100 flex items-center justify-center p-4 relative">
                <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle size={14} /> Approved
                </div>
                {/* Placeholder for an image */}
                <span className="text-gray-400 font-medium">
                  Property Image
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {approval.propertyTitle}
                </h3>
                <div className="space-y-2 text-sm text-gray-500 flex-1 mb-4 mt-2">
                  <p>
                    <span className="font-semibold text-gray-700">Owner:</span>{" "}
                    {approval.ownerName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>{" "}
                    {approval.location}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Size:</span>{" "}
                    {approval.acres} acres
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Verified on:
                    </span>{" "}
                    {approval.submittedDate}
                  </p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 hover:bg-gray-100 font-semibold px-4 py-2 rounded-lg transition-colors text-sm border border-gray-200">
                  <Eye size={16} />
                  View Original Filing
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
