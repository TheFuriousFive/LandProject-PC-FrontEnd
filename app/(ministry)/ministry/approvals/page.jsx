"use client";
import { Eye, Check, X } from "lucide-react";
import { useMinistry } from "../../_components/MinistryProvider";

export default function PendingApprovals() {
  const { listings, approveListing, rejectListing } = useMinistry();
  const pendingApprovals = listings.filter((l) => l.status === "pending");

  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Pending Approvals
        </h1>
        <p className="text-gray-500 font-medium text-lg">
          Review and process new land listings submitted by owners.
        </p>
      </div>

      <div className="space-y-4">
        {pendingApprovals.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-500">
              There are no pending listings to approve at this time.
            </p>
          </div>
        ) : (
          pendingApprovals.map((approval) => (
            <div
              key={approval.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {approval.propertyTitle}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>
                      <span className="font-semibold text-gray-700">
                        Owner:
                      </span>{" "}
                      {approval.ownerName}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Location:
                      </span>{" "}
                      {approval.location} • {approval.acres} acres
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Documents:
                      </span>{" "}
                      {approval.documents} files uploaded
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Submitted:
                      </span>{" "}
                      {approval.submittedDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 flex-shrink-0">
                  <button className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                    <Eye size={16} />
                    View Details
                  </button>
                  <button
                    onClick={() => approveListing(approval.id)}
                    className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => rejectListing(approval.id)}
                    className="flex items-center gap-2 bg-red-600 text-white hover:bg-red-700 font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <X size={16} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
