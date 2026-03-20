"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import BackButton from "@/_components/BackButton";
import ConfirmModal from "../../_components/ConfirmModal";
import EditModal from "../../_components/EditModal";

export default function MyAds() {
  const [listings, setListings] = useState([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [listingToEdit, setListingToEdit] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      // Fetching from localStorage (Backend integration pending)
      const storedListings = JSON.parse(
        localStorage.getItem("land_listings") || "[]",
      );
      setListings(storedListings);
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const initiateDelete = (id) => {
    setListingToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!listingToDelete) return;

    try {
      // Deleting from localStorage (Backend integration pending)
      const updatedListings = listings.filter((l) => l.id !== listingToDelete);
      localStorage.setItem(
        "land_listings",
        JSON.stringify(updatedListings),
      );
      setListings(updatedListings);

      // Add to logs
      const logs = JSON.parse(localStorage.getItem("owner_logs") || "[]");
      logs.unshift({
        id: Date.now(),
        action: "Deleted listing",
        target: listings.find((l) => l.id === listingToDelete)?.title,
        date: new Date().toISOString(),
      });
      localStorage.setItem("owner_logs", JSON.stringify(logs));

      setDeleteModalOpen(false);
      setListingToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete listing. Please try again.");
    }
  };

  const initiateEdit = (land) => {
    setListingToEdit(land);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setListingToEdit(null);
    fetchListings(); // Refetch data
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">
            Pending
          </span>
        );
    }
  };

  return (
    <>
      <div className="p-8 md:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              My Ads
            </h1>
            <p className="text-gray-500 font-medium">
              Manage your land listings and track their approval status.
            </p>
          </div>
          <Link
            href="/owner/add-land"
            className="bg-[#0f0f11] text-[#9afb21] px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-colors"
          >
            <Plus size={20} />
            Add New Land
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {listings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>You haven&apos;t listed any properties yet.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                    Listing
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                    Location
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                    Price
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-gray-700 text-sm text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listings.map((land) => (
                  <tr
                    key={land.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{land.title}</p>
                      <p className="text-sm text-gray-500">{land.area} Acres</p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{typeof land.location === 'object' && land.location !== null ? `${land.location.city || ''}, ${land.location.state || ''}` : land.location}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {land.price}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(land.status || "pending")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link
                          href={`/property/${land.id}`}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => initiateEdit(land)}
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => initiateDelete(land.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Land Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setListingToDelete(null);
        }}
      />

      <EditModal
        isOpen={editModalOpen}
        initialData={listingToEdit}
        onClose={() => {
          setEditModalOpen(false);
          setListingToEdit(null);
        }}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
