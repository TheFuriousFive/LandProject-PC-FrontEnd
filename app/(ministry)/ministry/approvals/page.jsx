"use client";
//worked with local storage
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, X, FileText, Info, FileSearch, ExternalLink } from "lucide-react";

export default function PendingApprovals() {
  const [listings, setListings] = useState([]);
  const [activeTabs, setActiveTabs] = useState({});

  useEffect(() => {
    const allListings = JSON.parse(
      localStorage.getItem("land_listings") || "[]",
    );
    const pendingListings = allListings.filter((l) => l.status === "pending");
    setListings(pendingListings);

    const tabDefaults = pendingListings.reduce((acc, listing) => {
      // Default each card to documents view for verification-first workflow.
      acc[listing.id] = "documents";
      return acc;
    }, {});
    setActiveTabs(tabDefaults);
  }, []);

  const handleAction = (id, action) => {
    if (confirm(`Are you sure you want to ${action} this listing?`)) {
      const allListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );
      const updated = allListings.map((l) =>
        l.id === id ? { ...l, status: action } : l,
      );

      localStorage.setItem("land_listings", JSON.stringify(updated));
      setListings(listings.filter((l) => l.id !== id));

      // We could add to owner logs here, mocking a backend trigger
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      const targetListing = allListings.find((l) => l.id === id);
      const logAction =
        action === "approved" ? "Approved by Ministry" : "Rejected by Ministry";
      logs.unshift({
        // eslint-disable-next-line react-hooks/purity
        id: Date.now(),
        action: logAction,
        target: targetListing.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));
    }
  };

  const getLocationLabel = (land) => {
    if (typeof land.location === "object") {
      return land.location.address || land.location.city || "N/A";
    }
    return land.location || "N/A";
  };

  const getAreaLabel = (land) => {
    if (land.acres) return `${land.acres} Acres`;
    if (land.area) return `${land.area} Acres`;
    return "N/A";
  };

  const getPriceLabel = (land) => {
    if (typeof land.price === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(land.price);
    }
    return land.price || "N/A";
  };

  const getDocuments = (land) => {
    if (Array.isArray(land.land_listing_documents)) return land.land_listing_documents;
    if (Array.isArray(land.documents)) return land.documents;
    return [];
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Pending Approvals
        </h1>
        <p className="text-gray-500 font-medium">
          Review and verify new land listing submissions.
        </p>
      </div>

      <div className="space-y-6">
        {listings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <Check className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No pending approvals
            </h3>
            <p className="text-gray-500">
              The review queue is currently empty.
            </p>
          </div>
        ) : (
          listings.map((land) => (
            <div
              key={land.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row justify-between gap-6"
            >
              <div className="flex gap-6 flex-1">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {land.title}
                    </h3>
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      AWAITING REVIEW
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    Submitted by:{" "}
                    <span className="font-semibold text-gray-700">
                      {land.ownerId}
                    </span>
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">
                        Location
                      </p>
                      <p className="font-bold text-gray-900">{getLocationLabel(land)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">Size</p>
                      <p className="font-bold text-gray-900">{getAreaLabel(land)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">Price</p>
                      <p className="font-bold text-gray-900">{getPriceLabel(land)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold mb-1">Zoning</p>
                      <p className="font-bold text-gray-900">
                        {land.zoning || land.land_type || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex border-b border-gray-200 bg-gray-50">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTabs((prev) => ({
                            ...prev,
                            [land.id]: "documents",
                          }))
                        }
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                          activeTabs[land.id] === "documents"
                            ? "bg-white text-gray-900"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <FileSearch size={16} /> Submitted Documents
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTabs((prev) => ({
                            ...prev,
                            [land.id]: "details",
                          }))
                        }
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors ${
                          activeTabs[land.id] === "details"
                            ? "bg-white text-gray-900"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <Info size={16} /> Listing Details
                      </button>
                    </div>

                    <div className="p-4 bg-white">
                      {activeTabs[land.id] === "details" ? (
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-500 mb-1">
                              Description
                            </p>
                            <p className="text-sm text-gray-800">
                              {land.description || "No description provided."}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                              <p className="text-gray-500 font-semibold mb-1">
                                Verification Status
                              </p>
                              <p className="font-bold text-gray-900 capitalize">
                                {land.verification_status || "unverified"}
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                              <p className="text-gray-500 font-semibold mb-1">
                                Submitted On
                              </p>
                              <p className="font-bold text-gray-900">
                                {land.posted_date
                                  ? new Date(land.posted_date).toLocaleDateString()
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {getDocuments(land).length === 0 ? (
                            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
                              No submitted documents found for this listing.
                            </div>
                          ) : (
                            getDocuments(land).map((doc, index) => {
                              const fileName =
                                doc.file_name || doc.name || `Document ${index + 1}`;
                              const fileUrl =
                                doc.file_url || doc.url || doc.document_url || doc.path;
                              const isPdf =
                                /\.pdf($|\?)/i.test(fileName) ||
                                /\.pdf($|\?)/i.test(fileUrl || "");

                              return (
                                <div
                                  key={`${land.id}-doc-${index}`}
                                  className="p-3 rounded-lg bg-gray-50 border border-gray-100"
                                >
                                  <p className="font-semibold text-gray-900 text-sm">
                                    {fileName}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {doc.description ||
                                      "No document description provided."}
                                  </p>

                                  {isPdf && fileUrl ? (
                                    <a
                                      href={fileUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex mt-3 items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 transition-colors"
                                    >
                                      Open PDF
                                    </a>
                                  ) : fileUrl ? (
                                    <a
                                      href={fileUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex mt-3 items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold px-3 py-2 transition-colors"
                                    >
                                      Open File
                                    </a>
                                  ) : (
                                    <button
                                      type="button"
                                      disabled
                                      className="inline-flex mt-3 items-center justify-center rounded-lg bg-gray-200 text-gray-500 text-sm font-semibold px-3 py-2 cursor-not-allowed"
                                    >
                                      PDF unavailable
                                    </button>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center lg:w-48 lg:border-l lg:border-gray-100 lg:pl-6 shrink-0">
                <Link
                  href={`/property/${land.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} /> Open Listing
                </Link>
                <button
                  onClick={() => handleAction(land.id, "approved")}
                  className="w-full bg-[#9afb21] text-[#0f0f11] font-bold px-4 py-3 rounded-xl hover:bg-[#8bed1c] transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Approve
                </button>
                <button
                  onClick={() => handleAction(land.id, "rejected")}
                  className="w-full bg-white border-2 border-red-500 text-red-600 font-bold px-4 py-3 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
