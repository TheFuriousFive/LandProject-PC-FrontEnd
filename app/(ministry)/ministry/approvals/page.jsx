"use client";
import { useEffect, useState } from "react";
import { Check, X, FileText, AlertCircle, ChevronDown, ChevronUp, Download } from "lucide-react";

export default function PendingApprovals() {
  const [listings, setListings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [documentStatuses, setDocumentStatuses] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});

  useEffect(() => {
    let allListings = JSON.parse(
      localStorage.getItem("land_listings") || "[]",
    );

    const pendingListings = allListings.filter((l) => l.status === "pending");
    setListings(pendingListings);

    // Initialize document statuses
    const statuses = {};
    pendingListings.forEach((listing) => {
      statuses[listing.id] = listing.documents?.map(() => "pending") || [];
    });
    setDocumentStatuses(statuses);
  }, []);

  const getLocationText = (location) => {
    if (!location) return null;
    if (typeof location === "string") return location;
    if (typeof location === "object" && location.city && location.state) {
      return `${location.city}, ${location.state}`;
    }
    return null;
  };

  const getSizeText = (size) => {
    if (!size) return null;
    if (typeof size === "string") return size;
    if (typeof size === "object" && size.value && size.unit) {
      return `${size.value} ${size.unit}`;
    }
    return null;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDocumentAction = (listingId, docIndex, action) => {
    const newStatuses = { ...documentStatuses };
    if (!newStatuses[listingId]) {
      newStatuses[listingId] = [];
    }
    newStatuses[listingId][docIndex] = action;
    setDocumentStatuses(newStatuses);
  };

  const handleApproveAllDocuments = (listingId) => {
    if (confirm("Approve all documents for this listing?")) {
      const allListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );
      const updated = allListings.map((l) =>
        l.id === listingId ? { ...l, status: "approved" } : l,
      );

      localStorage.setItem("land_listings", JSON.stringify(updated));
      setListings(listings.filter((l) => l.id !== listingId));

      // Add to owner logs
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      const targetListing = allListings.find((l) => l.id === listingId);
      logs.unshift({
        id: Date.now(),
        action: "All documents approved by Ministry",
        target: targetListing.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));
    }
  };

  const handleRejectAllDocuments = (listingId) => {
    const reason = rejectionReasons[listingId] || "Documents did not meet requirements";
    if (confirm(`Reject all documents for this listing?\n\nReason: ${reason}`)) {
      const allListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );
      const updated = allListings.map((l) =>
        l.id === listingId ? { ...l, status: "rejected" } : l,
      );

      localStorage.setItem("land_listings", JSON.stringify(updated));
      setListings(listings.filter((l) => l.id !== listingId));

      // Add to owner logs
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      const targetListing = allListings.find((l) => l.id === listingId);
      logs.unshift({
        id: Date.now(),
        action: `Documents rejected by Ministry: ${reason}`,
        target: targetListing.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));
    }
  };

  const handleDownloadDocument = (fileName) => {
    alert(`Download initiated for: ${fileName}`);
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200";
      case "rejected":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Document Approval Management
        </h1>
        <p className="text-gray-500 font-medium">
          Review and approve/reject documents submitted by property owners
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500 text-sm font-semibold mb-2">Pending Review</p>
          <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500 text-sm font-semibold mb-2">Total Documents</p>
          <p className="text-3xl font-bold text-gray-900">
            {listings.reduce((sum, l) => sum + (l.documents?.length || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-gray-500 text-sm font-semibold mb-2">Average Documents</p>
          <p className="text-3xl font-bold text-gray-900">
            {listings.length > 0
              ? Math.round(
                  (listings.reduce((sum, l) => sum + (l.documents?.length || 0), 0) /
                    listings.length) *
                    10,
                ) / 10
              : 0}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {listings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <Check className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No pending documents
            </h3>
            <p className="text-gray-500">All documents have been reviewed and approved.</p>
          </div>
        ) : (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Header Section */}
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => toggleExpand(listing.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0 mt-1">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {listing.title}
                        </h3>
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getStatusBadgeColor(
                            "pending",
                          )}`}
                        >
                          PENDING REVIEW
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        Owner ID: <span className="font-semibold">{listing.ownerId}</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        {getLocationText(listing.location) && (
                          <span className="text-gray-600">
                            <span className="font-semibold">Location:</span> {getLocationText(listing.location)}
                          </span>
                        )}
                        {getSizeText(listing.size) && (
                          <span className="text-gray-600">
                            <span className="font-semibold">Size:</span> {getSizeText(listing.size)}
                          </span>
                        )}
                        {listing.documents && (
                          <span className="text-gray-600">
                            <span className="font-semibold">Documents:</span>{" "}
                            {listing.documents.length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors shrink-0">
                    {expandedId === listing.id ? (
                      <ChevronUp size={24} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={24} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === listing.id && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  {/* Property Details */}
                  {listing.description && (
                    <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                      <p className="text-sm font-bold text-gray-700 mb-2">Description</p>
                      <p className="text-gray-600 text-sm">{listing.description}</p>
                    </div>
                  )}

                  {/* Documents Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Documents for Review
                    </h4>
                    {listing.documents && listing.documents.length > 0 ? (
                      <div className="space-y-3">
                        {listing.documents.map((doc, idx) => {
                          const docStatus = documentStatuses[listing.id]?.[idx] || "pending";
                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border-2 transition-all ${getDocumentStatusColor(
                                docStatus,
                              )}`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-1">
                                    <FileText
                                      size={20}
                                      className={
                                        docStatus === "approved"
                                          ? "text-green-600"
                                          : docStatus === "rejected"
                                            ? "text-red-600"
                                            : "text-gray-600"
                                      }
                                    />
                                    <span className="font-semibold text-gray-900">
                                      {doc.fileName || `Document ${idx + 1}`}
                                    </span>
                                    {doc.fileSize && (
                                      <span className="text-xs text-gray-500">
                                        ({(doc.fileSize / 1024).toFixed(2)} KB)
                                      </span>
                                    )}
                                  </div>
                                  {doc.description && (
                                    <p className="text-sm text-gray-600 ml-7">
                                      {doc.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={() =>
                                      handleDownloadDocument(doc.fileName || `Document ${idx + 1}`)
                                    }
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                    title="Download document"
                                  >
                                    <Download size={18} className="text-gray-600" />
                                  </button>
                                  {docStatus === "approved" ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                                      Approved
                                    </span>
                                  ) : docStatus === "rejected" ? (
                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg">
                                      Rejected
                                    </span>
                                  ) : (
                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg">
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-4 bg-white rounded-xl border border-gray-200 text-center text-gray-500">
                        No documents uploaded
                      </div>
                    )}
                  </div>

                  {/* Rejection Reason Input */}
                  <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Rejection Reason (if applicable)
                    </label>
                    <textarea
                      value={rejectionReasons[listing.id] || ""}
                      onChange={(e) =>
                        setRejectionReasons({
                          ...rejectionReasons,
                          [listing.id]: e.target.value,
                        })
                      }
                      placeholder="Specify reason for rejection (optional)"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg px-4 py-2 focus:ring-[#9afb21] focus:border-[#9afb21] outline-none transition-colors"
                      rows="3"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleRejectAllDocuments(listing.id)}
                      className="px-6 py-3 bg-white border-2 border-red-500 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <X size={18} /> Reject All
                    </button>
                    <button
                      onClick={() => handleApproveAllDocuments(listing.id)}
                      className="px-6 py-3 bg-[#9afb21] text-[#0f0f11] font-bold rounded-xl hover:bg-[#8bed1c] transition-colors flex items-center gap-2"
                    >
                      <Check size={18} /> Approve All
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
